// SIMULADOR DEL NÚCLEO (solo para desarrollo).
// Imita lo que hará el núcleo real: barra de tiempo y puntaje, la `api` del contrato
// y el resumen final del mundo. Así cada equipo prueba su mundo SIN esperar al núcleo.
// Usa las mismas reglas de core/config.js, así que el puntaje que ves aquí es el real.
//
// Lo edita solo el Integrador.

import { PUNTOS, BONO_TIEMPO, PUNTOS_MUNDO_SUPERADO } from "../core/config.js";
import { formatearTiempo, crearEl } from "../core/utils.js";

export function montarSimulador(mundo, raiz, opciones = {}) {
  const limite = mundo.tiempoLimite;
  const est = { puntos: 0, aciertos: 0, errores: 0, pistas: 0, misiones: 0, final: null, terminado: false, bono: 0 };
  const inicio = performance.now();

  // --- Barra superior y zona del mundo ---
  const hTiempo = crearEl("span", { class: "gd-hud__tiempo" });
  const hPuntos = crearEl("span", { class: "gd-hud__puntos" });
  const zona = crearEl("main", { class: "gd-pantalla", id: "mundo" });
  const log = crearEl("pre", { class: "gd-log" });
  raiz.append(
    crearEl("div", { class: "gd-hud" }, [crearEl("strong", { texto: mundo.nombre + " · simulador" }), hTiempo, hPuntos]),
    zona,
    crearEl("details", {}, [crearEl("summary", { texto: "Registro de llamadas a la api" }), log]),
  );

  const restante = () => Math.max(0, limite - (performance.now() - inicio) / 1000);
  const registrar = (texto) => {
    log.textContent += texto + "  →  puntos: " + Math.max(0, est.puntos) + "\n";
    console.log("[api] " + texto + " → puntos:", Math.max(0, est.puntos));
    pintar();
  };
  function pintar() {
    const r = restante();
    hTiempo.textContent = "⏱ " + formatearTiempo(r);
    hTiempo.classList.toggle("gd-hud__tiempo--poco", r <= 30);
    hPuntos.textContent = "★ " + Math.max(0, est.puntos) + " puntos";
  }

  // --- La api que recibe el mundo (el contrato) ---
  const api = {
    jugador: { id: "GD-TEST", nombre: "Tester" },
    modo: opciones.modo || "competencia",
    registrarAcierto(id) { if (est.terminado) return; est.puntos += PUNTOS.acierto; est.aciertos++; registrar("registrarAcierto(" + id + ")  +" + PUNTOS.acierto); },
    registrarError(id)   { if (est.terminado) return; est.puntos += PUNTOS.error;   est.errores++;  registrar("registrarError(" + id + ")  " + PUNTOS.error); },
    usarPista(id)        { if (est.terminado) return; est.puntos += PUNTOS.pista;   est.pistas++;   registrar("usarPista(" + id + ")  " + PUNTOS.pista); },
    completarMision(n, sinErrores) {
      if (est.terminado) return;
      est.puntos += PUNTOS.mision + (sinErrores ? PUNTOS.misionSinErrores : 0);
      est.misiones++;
      registrar("completarMision(" + n + ", " + sinErrores + ")  +" + (PUNTOS.mision + (sinErrores ? PUNTOS.misionSinErrores : 0)));
    },
    completarDesafioFinal(superado) {
      if (est.terminado) return;
      if (superado) est.puntos += PUNTOS.desafioFinal;
      est.final = !!superado;
      registrar("completarDesafioFinal(" + superado + ")  " + (superado ? "+" + PUNTOS.desafioFinal : "+0"));
    },
    tiempoRestante: restante,
    terminarMundo() { cerrar(true); },
  };

  // --- Cierre del mundo: bono de tiempo y resumen ---
  function cerrar(completado) {
    if (est.terminado) return;
    est.terminado = true;
    clearInterval(reloj);
    if (completado) {
      const sobrante = restante() / limite;
      const tramo = BONO_TIEMPO.find((t) => sobrante >= t.minSobrante);
      est.bono = tramo ? tramo.puntos : 0;
    }
    const total = Math.max(0, est.puntos + est.bono);
    const superado = total >= PUNTOS_MUNDO_SUPERADO;
    const fila = (a, b) => crearEl("tr", {}, [crearEl("td", { texto: a }), crearEl("td", { texto: String(b) })]);
    zona.replaceChildren(crearEl("section", { class: "gd-card" }, [
      crearEl("h2", { texto: completado ? "Mundo terminado" : "¡Se acabó el tiempo!" }),
      crearEl("table", { class: "gd-tabla" }, [
        fila("Aciertos", est.aciertos), fila("Errores", est.errores), fila("Pistas usadas", est.pistas),
        fila("Misiones completadas", est.misiones),
        fila("Desafío final", est.final === null ? "no jugado" : est.final ? "superado" : "no superado"),
        fila("Bono de tiempo", "+" + est.bono),
        fila("Puntaje del mundo", total),
        fila("Mundo superado (≥ " + PUNTOS_MUNDO_SUPERADO + ")", superado ? "SÍ ✔" : "no ✖"),
      ]),
      crearEl("p", { class: "gd-aviso", texto: "Esto es el simulador. El resumen real lo dibujará el núcleo." }),
      crearEl("button", { class: "gd-btn gd-btn--sec", texto: "Jugar otra vez", onclick: () => location.reload() }),
    ]));
    registrar("FIN  total=" + total + "  superado=" + superado);
  }

  // --- Reloj: calcula con la hora real (no cuenta ticks) ---
  const reloj = setInterval(() => {
    pintar();
    if (restante() <= 0 && !est.terminado) {
      registrar("TIEMPO AGOTADO → se llama a mundo.detener()");
      mundo.detener();
      cerrar(false);
    }
  }, 250);
  pintar();

  // --- Arranque ---
  Promise.resolve(mundo.iniciar(zona, api)).catch((error) => {
    console.error(error);
    zona.replaceChildren(crearEl("section", { class: "gd-card" }, [
      crearEl("h2", { texto: "Error en el mundo" }),
      crearEl("p", { class: "gd-aviso", texto: String(error) }),
    ]));
  });
  return { api, estado: est };
}
