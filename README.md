# Guardianes Digitales

Videojuego educativo de ciberseguridad para escolares: 4 mundos de 5 minutos, puntaje y ranking final.
La guía completa está en `docs/Guardianes_Digitales_Guia_Corta.docx`.

## Cómo ejecutarlo (obligatorio, léelo)
1. Instala **Visual Studio Code**, **Git** y la extensión **Live Server** de VS Code.
2. Abre la carpeta del proyecto en VS Code.
3. Clic derecho en `index.html` → **Open with Live Server**.
4. **No abras los archivos con doble clic**: los módulos de JavaScript no funcionan así.

## Cómo empiezas tú (equipo de mundo)
1. Clona el repositorio y crea **tu rama** (la primera vez):
   ```
   git clone https://github.com/USUARIO/guardianes-digitales.git
   cd guardianes-digitales
   git checkout dev && git pull
   git checkout -b mundo1-phishing      # cambia por la rama de tu mundo
   ```
2. Abre **tu `test.html`** con Live Server: `worlds/<tu-mundo>/test.html`. Ya funciona, con un ejemplo.
3. Lee el `LEEME.md` de tu carpeta (lista de lo que falta) y tu ficha en la guía (sección 7).
4. Trabaja **solo dentro de tu carpeta** `worlds/<tu-mundo>/`.
5. Guarda tus cambios al menos una vez al día:
   ```
   git add .
   git commit -m "mundo1: agrega misión 1 con bandeja de entrada"
   git push origin mundo1-phishing
   ```
6. Cuando tengas algo terminado: Pull Request a `dev` (lo revisan el Integrador y otro equipo).

| Mundo | Rama y carpeta | Equipo |
|---|---|---|
| 1. Phishing City | `mundo1-phishing` | Personas 1, 2 y 3 |
| 2. Fortaleza de las Contraseñas | `mundo2-passwords` | Personas 4 y 5 |
| 3. Network Defense | `mundo3-network` | Personas 6 y 7 |
| 4. Dimensión de la IA | `mundo4-ia` | Personas 6 y 7 |

## Estructura
```
index.html            página de pruebas (enlaces a los 4 mundos)
core/                 núcleo: config, utilidades y lista de mundos   (solo el Integrador)
dev/mock-core.js      simulador del núcleo (tiempo, puntaje y resumen)   (solo el Integrador)
styles/base.css       estilo común                                   (solo el Integrador)
worlds/_plantilla/    plantilla vacía de mundo (no se edita)
worlds/mundoN-.../    TU mundo: index.js, retos.json, estilo.css, test.html, LEEME.md
docs/                 guía del proyecto
```

## Reglas de oro
- Tu mundo usa **solo la `api`** para avisar puntos. Nunca sumes puntos por tu cuenta ni dibujes un reloj.
- Todas tus clases CSS empiezan con tu prefijo (`.m1-`, `.m2-`, `.m3-`, `.m4-`).
- Sin variables globales ni librerías externas sin avisar al Integrador.
- Todo el contenido es **ficticio y seguro**: sin enlaces reales, sin marcas reales, sin fotos de personas reales.
- Textos de los retos **cortos**: una partida normal debe durar entre 4 y 5 minutos.
- **No edites** `core/`, `dev/`, `styles/` ni `index.html`. Si necesitas un cambio, abre un Issue en GitHub.

## El contrato (lo que ya trae tu `index.js`)
```js
export default {
  id, numero, nombre, tiempoLimite: 300, insignia,
  async iniciar(contenedor, api) { /* dibuja el mundo en `contenedor` */ },
  detener() { /* frena temporizadores y bloquea botones */ }
};
```
| Función de la `api` | Puntos |
|---|---|
| `api.registrarAcierto(idReto)` | +100 |
| `api.registrarError(idReto)` | −50 |
| `api.usarPista(idReto)` | −25 |
| `api.completarMision(n, sinErrores)` | +200 (+100 si `sinErrores`) |
| `api.completarDesafioFinal(superado)` | +300 si `superado` |
| `api.terminarMundo()` | cierra el mundo y suma el bono de tiempo |
