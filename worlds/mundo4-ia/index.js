// ============================================================================
// Mundo 4: Dimensión de la IA  ·  Insignia "Ojo Crítico"
// Contrato del núcleo: export default { id, numero, nombre, tiempoLimite, insignia, iniciar, detener }
// - Los puntos se avisan SOLO con la `api`. No se dibuja reloj ni puntaje (lo hace el núcleo).
// - Cada partida sortea 3 retos de 6 por misión, y mezcla el orden de las 4 opciones.
// - El desafío final sortea el rumor y una variante de cada etapa.
// ============================================================================
import { cargarRetos, elegir, barajar, crearEl, cargarEstilo } from "../../core/utils.js";
import { crearEscena, icono } from "./escenas.js";
import { iniciarFondo, sonar, alternarSonido, sonidoActivo } from "./efectos.js";

const PFX = "m4";
const LETRAS = ["A", "B", "C", "D"];
let detenido = false;
let raiz = null;
let escenario = null;
let riel = null;
let pararFondo = null;
let alTeclear = null;           // función de la pantalla actual para el teclado
const esperas = new Set();

const imgUrl = (n) => new URL("./img/" + n, import.meta.url).href;
function imagen(nombre, clase, alt = "") {
  return crearEl("img", { src: imgUrl(nombre), class: clase || "", alt, draggable: "false", decoding: "async" });
}
const pausa = (ms) => new Promise((res) => {
  const t = setTimeout(() => { esperas.delete(t); res(); }, ms);
  esperas.add(t);
});
const teclado = (e) => { if (!detenido && alTeclear) alTeclear(e); };

export default {
  id: "ia",
  numero: 4,
  nombre: "Dimensión de la IA",
  tiempoLimite: 300,
  insignia: "Ojo Crítico",

  async iniciar(contenedor, api) {
    detenido = false;
    raiz = contenedor;
    cargarEstilo(new URL("./estilo.css", import.meta.url));
    const [datos, final] = await Promise.all([
      cargarRetos(new URL("./retos.json", import.meta.url)),
      cargarRetos(new URL("./final.json", import.meta.url)),
    ]);
    if (detenido) return;

    construirMarco(contenedor);
    document.addEventListener("keydown", teclado);

    await bienvenida();
    if (detenido) return;
    for (const mision of [1, 2]) {
      await banner(mision);
      if (detenido) return;
      const retos = elegir(datos.retos.filter((r) => r.mision === mision), 3);
      let errores = 0, pistas = 0;
      for (let i = 0; i < retos.length; i++) {
        marcarRiel((mision - 1) * 3 + i);
        const r = await mostrarReto(retos[i], api, mision, i + 1, retos.length);
        if (detenido) return;
        if (!r.acierto) errores++;
        pistas += r.pistas;
      }
      marcarRiel(mision * 3);
      api.completarMision(mision, errores === 0 && pistas === 0);
    }

    await banner(3, final);
    if (detenido) return;
    marcarRiel(6);
    const superado = await desafioFinal(final, api);
    if (detenido) return;
    api.completarDesafioFinal(superado);
    limpiar();
    api.terminarMundo();
  },

  detener() {
    detenido = true;
    limpiar();
    if (raiz) raiz.querySelectorAll("button").forEach((b) => { b.disabled = true; });
  },
};

function limpiar() {
  for (const t of esperas) clearTimeout(t);
  esperas.clear();
  document.removeEventListener("keydown", teclado);
  alTeclear = null;
  if (pararFondo) { pararFondo(); pararFondo = null; }
}

/* ---------- marco general ---------- */
function construirMarco(contenedor) {
  contenedor.replaceChildren();
  contenedor.classList.add(PFX + "-escena");

  const botonSonido = crearEl("button", { class: PFX + "-sonido", type: "button", "aria-label": "Activar o silenciar sonidos" });
  const pintarSonido = () => botonSonido.replaceChildren(icono(sonidoActivo() ? "speaker" : "mute", 22));
  pintarSonido();
  botonSonido.addEventListener("click", () => { alternarSonido(); pintarSonido(); sonar("click"); });

  const titulo = crearEl("div", { class: PFX + "-titulo" }, [
    imagen("i_escudo.webp", PFX + "-logo"),
    crearEl("div", {}, [
      crearEl("h2", { class: PFX + "-glitch", "data-texto": "DIMENSIÓN DE LA IA", texto: "DIMENSIÓN DE LA IA" }),
      crearEl("p", { texto: "Sector 4 · Ojo Crítico · ¿Real o fabricado?" }),
    ]),
  ]);

  riel = crearEl("ol", { class: PFX + "-riel", "aria-label": "Progreso del mundo" });
  const nombres = ["Reto 1", "Reto 2", "Reto 3", "Reto 4", "Reto 5", "Reto 6", "Final"];
  nombres.forEach((n, i) => {
    riel.append(crearEl("li", { class: i === 6 ? "es-final" : "", title: n }, [
      crearEl("span", { class: PFX + "-nodo" }, [icono(i === 6 ? "flag" : "eye", 16)]),
    ]));
  });

  escenario = crearEl("div", { class: PFX + "-escenario", "aria-live": "polite" });
  const cab = crearEl("header", { class: PFX + "-cab" }, [titulo, riel, botonSonido]);
  contenedor.append(imagen("escudo_hero.jpg", PFX + "-marca"), cab, escenario);
  pararFondo = iniciarFondo(contenedor);
}

function marcarRiel(indice) {
  [...riel.children].forEach((li, i) => {
    li.classList.toggle("hecho", i < indice);
    li.classList.toggle("actual", i === indice);
  });
}

function mostrar(nodo) {
  alTeclear = null;
  escenario.replaceChildren(nodo);
  nodo.classList.add(PFX + "-entra");
}

async function bienvenida() {
  const caja = crearEl("div", { class: PFX + "-bienvenida" }, [
    crearEl("div", { class: PFX + "-bv-arte" }, [imagen("escudo_hero.jpg", PFX + "-bv-escudo"), imagen("guardian.jpg", PFX + "-bv-guardian", "Guardián digital")]),
    crearEl("div", { class: PFX + "-bv-texto" }, [
      crearEl("p", { class: PFX + "-bv-tag", texto: "GUARDIANES DIGITALES · CIUDAD NEXO" }),
      crearEl("h3", { class: PFX + "-glitch", "data-texto": "DIMENSIÓN DE LA IA", texto: "DIMENSIÓN DE LA IA" }),
      crearEl("p", { texto: "La IA puede fabricar fotos, voces y noticias casi perfectas. Tu misión: separar lo real de lo falso." }),
      crearEl("div", { class: PFX + "-carga" }, [crearEl("i")]),
      crearEl("p", { class: PFX + "-bv-sis", texto: "Iniciando sistemas de verificación…" })])]);
  mostrar(caja);
  sonar("inicio");
  await pausa(2300);
}

async function banner(n, final) {
  const datos = [
    null,
    { arte: "i_bug.webp", icono: "camera", titulo: "MISIÓN 1", sub: "Detector de imágenes falsas", txt: "Examina la evidencia: ¿foto real o generada por IA?" },
    { arte: "i_robot.webp", icono: "chip", titulo: "MISIÓN 2", sub: "Voces, mensajes y noticias", txt: "Deepfakes, chatbots y bots: decide cómo actuar." },
    { arte: "i_hacker.webp", icono: "bolt", titulo: "DESAFÍO FINAL", sub: "Rumor viral", txt: "Contén el rumor antes de que se propague." },
  ][n];
  const caja = crearEl("div", { class: PFX + "-banner" }, [
    crearEl("div", { class: PFX + "-banner-ico" }, [imagen(datos.arte, PFX + "-banner-img")]),
    crearEl("h3", { texto: datos.titulo }),
    crearEl("p", { class: PFX + "-banner-sub", texto: datos.sub }),
    crearEl("p", { texto: datos.txt }),
  ]);
  mostrar(caja);
  sonar("inicio");
  await pausa(1400);
}

/* ---------- visores de evidencia ---------- */
function visor(v) {
  const marco = crearEl("figure", { class: PFX + "-visor " + PFX + "-v-" + v.tipo });
  const etiqueta = (txt, ic) => crearEl("figcaption", { class: PFX + "-etiqueta" }, [icono(ic, 16), crearEl("span", { texto: txt })]);

  if (v.tipo === "imagen") {
    marco.classList.add(PFX + "-evidencia");
    marco.append(etiqueta("EVIDENCIA · " + v.archivo, "camera"), crearEscena(v.escena),
      ...["tl", "tr", "bl", "br"].map((c) => crearEl("i", { class: PFX + "-esq " + c })),
      crearEl("div", { class: PFX + "-barrido" }));
  } else if (v.tipo === "noticia") {
    marco.append(etiqueta("Noticia en tu muro", "news"),
      crearEl("div", { class: PFX + "-papel" }, [
        crearEl("div", { class: PFX + "-medio", texto: v.medio }),
        crearEl("h4", { texto: v.titulo }),
        crearEl("p", { texto: v.cuerpo }),
        crearEl("div", { class: PFX + "-meta" }, [icono("link", 14), crearEl("span", { texto: v.fuente + " · " + v.compartidos })]),
      ]));
  } else if (v.tipo === "audio") {
    const onda = crearEl("div", { class: PFX + "-onda", "aria-hidden": "true" });
    for (let i = 0; i < 28; i++) onda.append(crearEl("i", { style: "--h:" + (20 + Math.round(Math.abs(Math.sin(i * 1.7)) * 70)) + "%;--d:" + (i % 7) * 0.12 + "s" }));
    marco.append(etiqueta("Mensaje de voz · " + v.numero, "mic"),
      crearEl("div", { class: PFX + "-papel " + PFX + "-audio" }, [
        crearEl("div", { class: PFX + "-reproductor" }, [
          crearEl("span", { class: PFX + "-play" }, [icono("mic", 20)]), onda,
          crearEl("span", { class: PFX + "-dur", texto: v.duracion })]),
        crearEl("p", { class: PFX + "-quien", texto: "De: " + v.de }),
        crearEl("p", { class: PFX + "-trans", texto: v.transcripcion })]));
  } else if (v.tipo === "chat") {
    marco.append(etiqueta(v.nombre, "chat"), imagen("i_login.webp", PFX + "-chat-ico"),
      crearEl("div", { class: PFX + "-chat" }, v.mensajes.map((m) =>
        crearEl("div", { class: PFX + "-burbuja " + m.de }, [crearEl("span", { texto: m.texto })]))));
  } else if (v.tipo === "video") {
    marco.append(etiqueta(v.nombre, "video"), crearEscena(v.escena),
      crearEl("div", { class: PFX + "-sub" }, [crearEl("span", { texto: v.dialogo })]),
      crearEl("div", { class: PFX + "-alertaVideo" }, [icono("warning", 14), crearEl("span", { texto: v.nota })]));
  } else if (v.tipo === "post") {
    const cuerpo = crearEl("div", { class: PFX + "-papel " + PFX + "-post" }, [
      crearEl("div", { class: PFX + "-autor" }, [crearEl("span", { class: PFX + "-avatar" }, [icono("user", 18)]), crearEl("b", { texto: "@" + v.autor })]),
      crearEl("p", { texto: v.texto })]);
    if (v.escena) cuerpo.append(crearEscena(v.escena));
    cuerpo.append(crearEl("div", { class: PFX + "-meta" }, [icono("heart", 14), crearEl("span", { texto: v.likes + " me gusta" })]));
    v.comentarios.forEach((c, i) => cuerpo.append(crearEl("div", { class: PFX + "-coment" }, [crearEl("b", { texto: "user" + (8841 + i * 37) }), crearEl("span", { texto: c })])));
    marco.append(etiqueta("Publicación en tendencia", "users"), cuerpo,
      crearEl("div", { class: PFX + "-alertaVideo" }, [icono("search", 14), crearEl("span", { texto: v.aviso })]));
  }
  return marco;
}

/* ---------- reto de opción múltiple (4 opciones) ---------- */
function mostrarReto(reto, api, mision, num, total) {
  return new Promise((resolve) => {
    let pistas = 0, respondido = false, huboAcierto = false;
    const botones = [];
    const mensaje = crearEl("div", { class: PFX + "-feedback", role: "status", "aria-live": "polite" });
    const pistaCaja = crearEl("div", { class: PFX + "-pista", hidden: "" });
    const botonPista = crearEl("button", { class: PFX + "-btn-pista", type: "button" }, [icono("hint", 18), crearEl("span", { texto: "Pedir pista (−25)" })]);
    const botonSigue = crearEl("button", { class: "gd-btn " + PFX + "-sigue", type: "button", hidden: "", texto: "Continuar →" });

    const pedirPista = () => {
      if (respondido || pistas > 0 || detenido) return;
      pistas++;
      api.usarPista(reto.id);
      sonar("click");
      pistaCaja.hidden = false;
      pistaCaja.replaceChildren(imagen("guardian_avatar.webp", PFX + "-avatar-g " + PFX + "-chico"), crearEl("span", { texto: reto.pista }));
      botonPista.disabled = true;
    };
    botonPista.addEventListener("click", pedirPista);

    const responder = (i) => {
      if (respondido || detenido) return;
      respondido = true;
      const acierto = botones[i].dataset.valor === reto.respuestaCorrecta;
      huboAcierto = acierto;
      if (acierto) api.registrarAcierto(reto.id); else api.registrarError(reto.id);
      sonar(acierto ? "ok" : "error");
      botones.forEach((b) => {
        b.disabled = true;
        if (b.dataset.valor === reto.respuestaCorrecta) { b.classList.add("ok"); b.querySelector(".m4-estado").replaceChildren(icono("check", 20)); }
      });
      if (!acierto) {
        botones[i].classList.add("mal");
        botones[i].querySelector(".m4-estado").replaceChildren(icono("cross", 20));
        escenario.firstElementChild.classList.add(PFX + "-sacude");
      }
      mensaje.className = PFX + "-feedback " + (acierto ? "ok" : "mal");
      mensaje.replaceChildren(imagen("guardian_avatar.webp", PFX + "-avatar-g"),
        crearEl("div", {}, [crearEl("strong", { texto: acierto ? "¡Análisis correcto!" : "Esa no era la mejor decisión." }), crearEl("p", { texto: reto.explicacion })]));
      botonPista.hidden = true;
      botonSigue.hidden = false;
      botonSigue.focus();
      alTeclear = (e) => { if (e.key === "Enter") finalizar(); };
    };
    const finalizar = () => { if (detenido) return; resolve({ acierto: huboAcierto, pistas }); };
    botonSigue.addEventListener("click", finalizar);

    const lista = crearEl("div", { class: PFX + "-opciones", role: "group", "aria-label": "Opciones de respuesta" });
    barajar(reto.opciones).forEach((txt, i) => {
      const b = crearEl("button", { class: PFX + "-opcion", type: "button", "data-valor": txt }, [
        crearEl("span", { class: PFX + "-letra", texto: LETRAS[i] }),
        crearEl("span", { class: PFX + "-texto", texto: txt }),
        crearEl("span", { class: PFX + "-estado" })]);
      b.addEventListener("click", () => responder(i));
      botones.push(b); lista.append(b);
    });

    const panel = crearEl("div", { class: PFX + "-panel" }, [
      crearEl("div", { class: PFX + "-chip" }, [icono(mision === 1 ? "camera" : "chip", 16), crearEl("span", { texto: "Misión " + mision + " · Reto " + num + " de " + total })]),
      crearEl("h3", { class: PFX + "-enun", texto: reto.enunciado }),
      lista, pistaCaja, mensaje,
      crearEl("div", { class: PFX + "-acciones" }, [botonPista, botonSigue]),
      crearEl("p", { class: PFX + "-atajos", texto: "Atajos: teclas 1-4 o A-D para responder · H para pista · Enter para continuar" })]);

    mostrar(crearEl("section", { class: PFX + "-reto" }, [visor(reto.visor), panel]));
    alTeclear = (e) => {
      const k = e.key.toLowerCase();
      const idx = ["1", "2", "3", "4"].indexOf(k) >= 0 ? Number(k) - 1 : ["a", "b", "c", "d"].indexOf(k);
      if (idx >= 0 && !respondido) responder(idx);
      else if (k === "h") pedirPista();
    };
  });
}

/* ---------- desafío final: Rumor viral ---------- */
async function desafioFinal(final, api) {
  const rumor = elegir(final.rumores, 1)[0];
  let errores = 0;

  await new Promise((resolve) => {
    const contador = crearEl("strong", { class: PFX + "-contador", texto: "0" });
    const ir = crearEl("button", { class: "gd-btn", type: "button", texto: "Intervenir ahora →" });
    ir.addEventListener("click", resolve);
    const caja = crearEl("section", { class: PFX + "-rumor" }, [
      crearEl("div", { class: PFX + "-alarma" }, [imagen("i_hacker.webp", PFX + "-alarma-img"), crearEl("span", { texto: "ALERTA · RUMOR VIRAL EN EXPANSIÓN" })]),
      crearEl("div", { class: PFX + "-rumor-cuerpo" }, [
        crearEl("figure", { class: PFX + "-visor " + PFX + "-evidencia" }, [crearEscena(rumor.escena),
          ...["tl", "tr", "bl", "br"].map((c) => crearEl("i", { class: PFX + "-esq " + c })), crearEl("div", { class: PFX + "-barrido" })]),
        crearEl("div", { class: PFX + "-panel" }, [
          crearEl("h3", { class: PFX + "-enun", texto: rumor.titulo }),
          crearEl("p", { texto: rumor.texto }),
          crearEl("p", { class: PFX + "-comp" }, [icono("users", 18), crearEl("span", { texto: " Compartido por " }), contador, crearEl("span", { texto: " personas y subiendo…" })]),
          crearEl("p", { texto: "Tu misión: 3 decisiones rápidas y el protocolo de verificación. Cada decisión tiene 20 segundos." }), ir])]),
    ]);
    mostrar(caja);
    sonar("inicio");
    const t0 = performance.now();
    (function animar() {
      if (detenido || !contador.isConnected) return;
      contador.textContent = Math.round(rumor.compartidos * Math.min(1, (performance.now() - t0) / 2200)).toLocaleString("es-PE");
      const t = setTimeout(animar, 60); esperas.add(t);
    })();
    alTeclear = (e) => { if (e.key === "Enter") resolve(); };
  });
  if (detenido) return false;

  for (let i = 0; i < final.etapas.length; i++) {
    const etapa = final.etapas[i];
    const variante = elegir(etapa.variantes, 1)[0];
    const acierto = await etapaDecision(etapa, variante, rumor, api, i + 1, final.etapas.length);
    if (detenido) return false;
    if (!acierto) errores++;
  }

  const eOrden = await protocolo(final.protocolo, api);
  if (detenido) return false;
  errores += eOrden;

  const superado = errores <= 1;
  mostrar(crearEl("div", { class: PFX + "-veredicto " + (superado ? "ok" : "mal") }, [
    imagen(superado ? "i_trofeo.webp" : "i_hacker.webp", PFX + "-ver-img"),
    crearEl("h3", { texto: superado ? "RUMOR CONTENIDO" : "EL RUMOR SE ESCAPÓ" }),
    crearEl("p", { texto: superado ? "Verificaste antes de compartir. ¡Ojo Crítico activado!" : "La próxima vez: pausa, busca la fuente y verifica." })]));
  sonar(superado ? "fin" : "error");
  await pausa(1800);
  return superado;
}

function etapaDecision(etapa, v, rumor, api, num, total) {
  return new Promise((resolve) => {
    let respondido = false;
    const botones = [];
    const barra = crearEl("div", { class: PFX + "-tiempo" }, [crearEl("i")]);
    const mensaje = crearEl("div", { class: PFX + "-feedback", role: "status", "aria-live": "polite" });
    const botonSigue = crearEl("button", { class: "gd-btn " + PFX + "-sigue", type: "button", hidden: "", texto: "Continuar →" });
    const inicio = performance.now();
    const LIMITE = (etapa.tiempo || 20) * 1000;
    let acierto = false;

    const cerrar = (res, porTiempo) => {
      if (respondido || detenido) return;
      respondido = true;
      acierto = res;
      if (!res) api.registrarError("m4-final-" + etapa.id);   // en el final solo se descuentan errores
      sonar(res ? "ok" : "error");
      botones.forEach((b) => {
        b.disabled = true;
        if (b.dataset.valor === v.respuestaCorrecta) { b.classList.add("ok"); b.querySelector(".m4-estado").replaceChildren(icono("check", 20)); }
      });
      mensaje.className = PFX + "-feedback " + (res ? "ok" : "mal");
      mensaje.replaceChildren(imagen("guardian_avatar.webp", PFX + "-avatar-g"),
        crearEl("div", {}, [crearEl("strong", { texto: res ? "¡Buena decisión!" : porTiempo ? "¡Se acabó el tiempo!" : "Decisión equivocada." }), crearEl("p", { texto: v.explicacion })]));
      botonSigue.hidden = false; botonSigue.focus();
      alTeclear = (e) => { if (e.key === "Enter") resolve(acierto); };
    };
    botonSigue.addEventListener("click", () => { if (!detenido) resolve(acierto); });

    const lista = crearEl("div", { class: PFX + "-opciones", role: "group" });
    barajar(v.opciones).forEach((txt, i) => {
      const b = crearEl("button", { class: PFX + "-opcion", type: "button", "data-valor": txt }, [
        crearEl("span", { class: PFX + "-letra", texto: LETRAS[i] }), crearEl("span", { class: PFX + "-texto", texto: txt }), crearEl("span", { class: PFX + "-estado" })]);
      b.addEventListener("click", () => {
        if (respondido) return;
        const ok = txt === v.respuestaCorrecta;
        if (!ok) b.classList.add("mal");
        cerrar(ok, false);
        if (!ok) { b.querySelector(".m4-estado").replaceChildren(icono("cross", 20)); escenario.firstElementChild.classList.add(PFX + "-sacude"); }
      });
      botones.push(b); lista.append(b);
    });

    const panel = crearEl("div", { class: PFX + "-panel" }, [
      crearEl("div", { class: PFX + "-chip" }, [icono("bolt", 16), crearEl("span", { texto: "Desafío final · Decisión " + num + " de " + total + " · " + etapa.titulo })]),
      barra, crearEl("h3", { class: PFX + "-enun", texto: v.enunciado }), lista, mensaje, crearEl("div", { class: PFX + "-acciones" }, [botonSigue]),
      crearEl("p", { class: PFX + "-atajos", texto: "Teclas 1-4 o A-D para responder" })]);
    const mini = crearEl("figure", { class: PFX + "-visor " + PFX + "-evidencia " + PFX + "-mini" }, [crearEl("figcaption", { class: PFX + "-etiqueta" }, [icono("flag", 16), crearEl("span", { texto: rumor.titulo })]), crearEscena(rumor.escena),
      ...["tl", "tr", "bl", "br"].map((c) => crearEl("i", { class: PFX + "-esq " + c }))]);
    mostrar(crearEl("section", { class: PFX + "-reto" }, [mini, panel]));
    alTeclear = (e) => {
      const k = e.key.toLowerCase();
      const idx = ["1", "2", "3", "4"].indexOf(k) >= 0 ? Number(k) - 1 : ["a", "b", "c", "d"].indexOf(k);
      if (idx >= 0) botones[idx].click();
    };

    (function paso() {
      if (detenido || respondido) return;
      const frac = Math.min(1, (performance.now() - inicio) / LIMITE);
      barra.firstChild.style.width = (100 - frac * 100) + "%";
      barra.classList.toggle("urgente", frac > 0.7);
      if (frac >= 1) { cerrar(false, true); return; }
      const t = setTimeout(paso, 100); esperas.add(t);
    })();
  });
}

/* Ordenar el protocolo de verificación (cada toque equivocado = error, se penalizan máx. 3) */
function protocolo(p, api) {
  return new Promise((resolve) => {
    let siguiente = 0, errores = 0;
    const slots = crearEl("ol", { class: PFX + "-slots" });
    p.pasos.forEach((_, i) => slots.append(crearEl("li", {}, [crearEl("span", { class: PFX + "-num", texto: String(i + 1) }), crearEl("span", { class: PFX + "-hueco", texto: "—" })])));
    const mensaje = crearEl("div", { class: PFX + "-feedback", role: "status", "aria-live": "polite" });
    const cartas = crearEl("div", { class: PFX + "-cartas" });

    barajar(p.pasos.map((t, i) => ({ t, i }))).forEach((c) => {
      const b = crearEl("button", { class: PFX + "-carta", type: "button", texto: c.t });
      b.addEventListener("click", () => {
        if (detenido || b.disabled) return;
        if (c.i === siguiente) {
          sonar("ok");
          b.disabled = true; b.classList.add("usada");
          const hueco = slots.children[siguiente].querySelector("." + PFX + "-hueco");
          hueco.textContent = c.t; slots.children[siguiente].classList.add("puesto");
          siguiente++;
          mensaje.textContent = "";
          if (siguiente === p.pasos.length) { const t = setTimeout(() => resolve(errores), 900); esperas.add(t); }
        } else {
          sonar("error");
          if (errores < 3) api.registrarError("m4-final-orden");
          errores++;
          b.classList.remove("sacude"); void b.offsetWidth; b.classList.add("sacude");
          mensaje.className = PFX + "-feedback mal";
          mensaje.replaceChildren(icono("shieldx", 20), crearEl("span", { texto: "Ese no es el siguiente paso. Piensa: ¿qué se hace primero?" }));
        }
      });
      cartas.append(b);
    });
    // El conteo que se devuelve nunca pasa de 3 (tope de penalización)
    const original = resolve;
    resolve = (n) => original(Math.min(n, 3));

    mostrar(crearEl("section", { class: PFX + "-protocolo" }, [
      crearEl("div", { class: PFX + "-chip" }, [icono("lock", 16), crearEl("span", { texto: "Desafío final · " + p.titulo })]), imagen("i_firewall.webp", PFX + "-prot-img"),
      crearEl("h3", { class: PFX + "-enun", texto: p.instruccion }),
      crearEl("div", { class: PFX + "-protocolo-cuerpo" }, [slots, cartas]), mensaje]));
  });
}
