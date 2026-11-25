# Mundo 4 · Dimensión de la IA ("Ojo Crítico")

Cómo probarlo: Live Server → clic derecho en `test.html` → *Open with Live Server*.

## Qué contiene
- `index.js` – lógica del mundo (contrato del núcleo). 2 misiones × 3 retos + desafío final.
- `retos.json` – banco de 12 retos (6 por misión). Cada partida sortea 3 por misión y **baraja las 4 opciones**.
- `final.json` – rumores (2), decisiones (3 etapas × 2 variantes) y protocolo de 6 pasos. También se sortean.
- `escenas.js` – ilustraciones SVG e íconos (todo dibujado en código, sin imágenes externas).
- `efectos.js` – lluvia de código y sonidos (botón de silencio arriba a la derecha).
- `img/` – arte del mundo (escudo, guardián "GD" e íconos recortados de las imágenes del equipo).
- `estilo.css` – tema neón; todas las clases empiezan con `.m4-`.

## Reglas del mundo
- Acierto +100, error −50, pista −25 (la pista se pide antes de responder). Misión +200 (+100 sin errores ni pistas).
- Desafío final: cada decisión mal o fuera de tiempo (20 s) = −50; cada toque equivocado en el protocolo = −50 (máx. 3). Superado con ≤ 1 error → +300.
- Teclado: 1-4 / A-D responden, H pista, Enter continúa.

## Cómo agregar retos
Copia un reto de `retos.json` (mismos campos): `visor.tipo` puede ser `imagen`, `noticia`, `audio`, `chat`, `video` o `post`. `respuestaCorrecta` debe ser idéntica a una de las 4 `opciones`. Para una imagen nueva, agrega una función en `ESCENAS` (`escenas.js`).

## Aviso al Integrador
El mundo dibuja su marco dentro del contenedor. Al terminar, el núcleo debe limpiar el contenedor antes de dibujar el resumen final (el simulador ya lo hace). Todo el contenido es ficticio.
