// ============================================================================
// Mundo 1: Phishing City
//
// Este archivo ya FUNCIONA: es un ejemplo mínimo que muestra cómo se usa el contrato.
// Reemplázalo poco a poco por tu mundo. Lo que NO debes cambiar:
//   - `export default { id, numero, nombre, tiempoLimite, insignia, iniciar, detener }`
//   - Usar SOLO la `api` para avisar puntos (no sumes puntos por tu cuenta).
//   - No dibujes reloj ni puntaje: lo hace el núcleo.
//   - Todas tus clases CSS empiezan con `.m1-` y van en `estilo.css`.
// ============================================================================
import { cargarRetos, elegir, barajar, crearEl, cargarEstilo } from "../../core/utils.js";

const PFX = "m1";
let detenido = false;     // true cuando el núcleo llama a detener()
let raiz = null;          // contenedor donde se dibuja el mundo

export default {
  id: "phishing",
  numero: 1,
  nombre: "Phishing City",
  tiempoLimite: 300,      // 5 minutos (no cambiar sin avisar al Integrador)
  insignia: "Cazador de Engaños",

  // El núcleo llama a iniciar() cuando el jugador entra al mundo.
  async iniciar(contenedor, api) {
    raiz = contenedor;
    detenido = false;
    cargarEstilo(new URL("./estilo.css", import.meta.url));
    const datos = await cargarRetos(new URL("./retos.json", import.meta.url));

    // 2 misiones de 3 retos. Se sortean 3 retos de los 6 del banco de cada misión.
    for (const mision of [1, 2]) {
      const retos = elegir(datos.retos.filter((r) => r.mision === mision), 3);
      let errores = 0;
      let pistas = 0;
      for (const reto of retos) {
        const resultado = await mostrarReto(reto, api);
        if (detenido) return;
        if (!resultado.acierto) errores++;
        pistas += resultado.pistas;
      }
      // sinErrores = true solo si no hubo errores NI pistas en la misión
      api.completarMision(mision, errores === 0 && pistas === 0);
    }

    // TODO (tu equipo): construir el desafío final real.
    const superado = await desafioFinalProvisional();
    if (detenido) return;
    api.completarDesafioFinal(superado);

    api.terminarMundo();
  },

  // El núcleo llama a detener() si se acaba el tiempo o se recarga la página.
  detener() {
    detenido = true;
    if (raiz) raiz.querySelectorAll("button").forEach((b) => { b.disabled = true; });
  },
};

// Ejemplo de reto de tipo "opcion". Devuelve una promesa que se resuelve al pulsar "Continuar".
function mostrarReto(reto, api) {
  return new Promise((resolve) => {
    let pistas = 0;
    let respondido = false;

    const caja = crearEl("section", { class: "gd-card " + PFX + "-reto" });
    const lista = crearEl("div", { class: PFX + "-opciones" });
    const mensaje = crearEl("div", { class: "gd-explicacion", "aria-live": "polite" });

    const botonPista = crearEl("button", { class: "gd-btn gd-btn--sec", texto: "Pedir pista (−25)" });
    botonPista.addEventListener("click", () => {
      if (respondido || pistas > 0 || detenido) return;
      pistas++;
      api.usarPista(reto.id);                       // −25
      mensaje.textContent = "Pista: " + reto.pista;
      botonPista.disabled = true;
    });

    for (const opcion of barajar(reto.opciones)) {  // se baraja el orden de las opciones
      const boton = crearEl("button", { class: "gd-btn", texto: opcion });
      boton.addEventListener("click", () => {
        if (respondido || detenido) return;
        respondido = true;
        const acierto = opcion === reto.respuestaCorrecta;
        if (acierto) api.registrarAcierto(reto.id); // +100
        else api.registrarError(reto.id);           // −50

        lista.querySelectorAll("button").forEach((b) => {
          b.disabled = true;
          if (b.textContent === reto.respuestaCorrecta) b.classList.add("gd-ok");
        });
        if (!acierto) boton.classList.add("gd-error");
        botonPista.disabled = true;

        // Siempre se muestra la explicación (aquí está lo que el escolar aprende)
        mensaje.replaceChildren(
          crearEl("strong", { texto: acierto ? "✔ Correcto. " : "✖ Incorrecto. " }),
          reto.explicacion,
        );
        caja.append(crearEl("button", {
          class: "gd-btn gd-btn--sec", texto: "Continuar",
          onclick: () => resolve({ acierto, pistas }),
        }));
      });
      lista.append(boton);
    }

    caja.append(
      crearEl("p", { class: "gd-etiqueta", texto: "Misión " + reto.mision }),
      crearEl("h2", { texto: reto.enunciado }),
      lista, botonPista, mensaje,
    );
    raiz.replaceChildren(caja);
  });
}

// Marcador de posición: reemplázalo por el desafío final de tu mundo.
function desafioFinalProvisional() {
  return new Promise((resolve) => {
    raiz.replaceChildren(crearEl("section", { class: "gd-card" }, [
      crearEl("h2", { texto: "Desafío final (pendiente de construir)" }),
      crearEl("p", { texto: "Aquí va el desafío final de tu mundo. Mientras tanto, estos botones simulan el resultado." }),
      crearEl("button", { class: "gd-btn gd-btn--sec", texto: "Simular: superado", onclick: () => resolve(true) }),
      crearEl("button", { class: "gd-btn gd-btn--sec", texto: "Simular: no superado", onclick: () => resolve(false) }),
    ]));
  });
}
