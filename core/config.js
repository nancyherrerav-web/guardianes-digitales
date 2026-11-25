// Constantes compartidas. Solo las edita el Integrador.
// Si cambia el puntaje en la guía, se cambia AQUÍ y en ningún otro lugar.

export const TIEMPO_MUNDO = 300;          // segundos por mundo (5 minutos)
export const MODO_CIRCUITO = false;       // true = el mapa deja elegir cualquier mundo

export const PUNTOS = {
  acierto: 100,
  error: -50,
  pista: -25,
  mision: 200,
  misionSinErrores: 100,                  // bonificación (sin errores ni pistas)
  desafioFinal: 300,
};

// Bono de tiempo: se aplica el PRIMER tramo que se cumpla (de mayor a menor).
export const BONO_TIEMPO = [
  { minSobrante: 0.25, puntos: 150 },     // sobra 25 % o más
  { minSobrante: 0.10, puntos: 75 },      // sobra 10 % o más
];

export const PUNTOS_MUNDO_SUPERADO = 900; // 60 % del puntaje base (1 500)
export const PUNTAJE_MAXIMO_MUNDO = 1650;
export const PUNTAJE_MAXIMO_TOTAL = 6600; // 4 mundos
