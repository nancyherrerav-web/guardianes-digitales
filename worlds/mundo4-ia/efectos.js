// Efectos del mundo 4: lluvia de código de fondo y sonidos cortos (WebAudio, sin archivos).

let ctxAudio = null;
let sonidoOn = true;

export const sonidoActivo = () => sonidoOn;
export function alternarSonido() { sonidoOn = !sonidoOn; return sonidoOn; }

/** Tonos muy cortos y suaves: "ok", "error", "inicio", "click". */
export function sonar(tipo) {
  if (!sonidoOn) return;
  try {
    ctxAudio = ctxAudio || new (window.AudioContext || window.webkitAudioContext)();
    if (ctxAudio.state === "suspended") ctxAudio.resume();
    const notas = { ok: [660, 880], error: [210, 150], inicio: [440, 660, 880], click: [520], fin: [523, 659, 784, 1046] }[tipo] || [440];
    const t0 = ctxAudio.currentTime;
    notas.forEach((f, i) => {
      const osc = ctxAudio.createOscillator();
      const vol = ctxAudio.createGain();
      osc.type = tipo === "error" ? "sawtooth" : "sine";
      osc.frequency.value = f;
      const t = t0 + i * 0.09;
      vol.gain.setValueAtTime(0.0001, t);
      vol.gain.exponentialRampToValueAtTime(0.1, t + 0.02);
      vol.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
      osc.connect(vol).connect(ctxAudio.destination);
      osc.start(t);
      osc.stop(t + 0.19);
    });
  } catch (e) { /* sin audio: no pasa nada */ }
}

/**
 * Lluvia de código dentro de `padre`. Se detiene sola cuando el canvas sale del DOM
 * (por ejemplo, cuando el núcleo dibuja el resumen) o al llamar a la función devuelta.
 */
export function iniciarFondo(padre) {
  const canvas = document.createElement("canvas");
  canvas.className = "m4-lluvia";
  canvas.setAttribute("aria-hidden", "true");
  padre.prepend(canvas);
  const g = canvas.getContext("2d");
  const caracteres = "01<>/{}[]#$%&ABCDEF";
  const tam = 16;
  let ancho = 0, alto = 0, columnas = 0, gotas = [];
  let parar = false, ultimo = 0;

  function medir() {
    ancho = canvas.width = Math.max(padre.clientWidth, 200);
    alto = canvas.height = Math.max(padre.clientHeight, 200);
    columnas = Math.ceil(ancho / tam);
    gotas = Array.from({ length: columnas }, () => Math.random() * (alto / tam));
    g.fillStyle = "rgba(5,11,30,1)";
    g.fillRect(0, 0, ancho, alto);
  }
  medir();
  const observador = typeof ResizeObserver === "function" ? new ResizeObserver(medir) : null;
  if (observador) observador.observe(padre);

  function cuadro(t) {
    if (parar || !canvas.isConnected) { if (observador) observador.disconnect(); return; }
    requestAnimationFrame(cuadro);
    if (t - ultimo < 70) return;
    ultimo = t;
    g.fillStyle = "rgba(5,11,30,.14)";
    g.fillRect(0, 0, ancho, alto);
    g.font = tam + "px Consolas, monospace";
    for (let i = 0; i < columnas; i++) {
      g.fillStyle = Math.random() > 0.97 ? "#F472B6" : "#22D3EE";
      g.fillText(caracteres[Math.floor(Math.random() * caracteres.length)], i * tam, gotas[i] * tam);
      if (gotas[i] * tam > alto && Math.random() > 0.975) gotas[i] = 0;
      gotas[i]++;
    }
  }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let k = 0; k < 40; k++) cuadro(k * 100);
    parar = true;
  } else {
    requestAnimationFrame(cuadro);
  }
  return () => { parar = true; if (observador) observador.disconnect(); };
}
