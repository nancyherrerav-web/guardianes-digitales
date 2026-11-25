// Funciones comunes para todos los mundos. Solo las edita el Integrador.

/** Carga un archivo JSON (por ejemplo retos.json). */
export async function cargarRetos(ruta) {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) throw new Error("No se pudo cargar " + ruta);
  return respuesta.json();
}

/** Devuelve una copia de la lista en orden aleatorio. */
export function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Elige n elementos al azar, sin repetir. */
export function elegir(lista, n) {
  return barajar(lista).slice(0, n);
}

/** 185 -> "3:05" */
export function formatearTiempo(segundos) {
  const s = Math.max(0, Math.round(segundos));
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

/**
 * Crea un elemento HTML de forma segura (usa textContent, no innerHTML).
 * crearEl("button", { class: "gd-btn", texto: "Hola", onclick: () => {} })
 */
export function crearEl(etiqueta, props = {}, hijos = []) {
  const el = document.createElement(etiqueta);
  for (const [clave, valor] of Object.entries(props)) {
    if (clave === "class") el.className = valor;
    else if (clave === "texto") el.textContent = valor;
    else if (clave.startsWith("on")) el.addEventListener(clave.slice(2).toLowerCase(), valor);
    else el.setAttribute(clave, valor);
  }
  for (const hijo of [].concat(hijos)) el.append(hijo);
  return el;
}

/** Carga el CSS propio del mundo (una sola vez). */
export function cargarEstilo(url) {
  const href = String(url);
  if (document.querySelector('link[href="' + href + '"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = href;
  document.head.append(enlace);
}
