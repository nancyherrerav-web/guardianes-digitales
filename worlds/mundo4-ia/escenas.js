// Ilustraciones (SVG) e íconos del mundo 4. Todo está dibujado en código: no hay imágenes externas.
// Son contenido PROPIO y ficticio (sin personas reales ni marcas reales).

const PIE = "</svg>";
const CAB = (etiqueta) =>
  `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${etiqueta}">`;

export const ESCENAS = {
  // 1) Selfie con una mano de 6 dedos
  mano: () => {
    const dedos = [-62, -38, -14, 10, 34, 58].map((a) =>
      `<rect x="-10" y="-96" width="20" height="80" rx="10" transform="translate(200 168) rotate(${a})"/>`).join("");
    return CAB("Selfie de una fiesta: una mano saluda") + `
<defs>
  <linearGradient id="sc-mano-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b1055"/><stop offset="1" stop-color="#d4508a"/></linearGradient>
  <radialGradient id="sc-mano-luz" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="400" height="260" fill="url(#sc-mano-bg)"/>
<g opacity=".6"><circle cx="50" cy="50" r="22" fill="#fbbf24"/><circle cx="120" cy="28" r="14" fill="#22d3ee"/><circle cx="345" cy="48" r="26" fill="#f472b6"/><circle cx="305" cy="118" r="12" fill="#a78bfa"/><circle cx="68" cy="150" r="16" fill="#34d399"/><circle cx="360" cy="190" r="18" fill="#fbbf24"/></g>
<rect width="400" height="260" fill="url(#sc-mano-luz)"/>
<path d="M140 262 L160 205 H240 L260 262Z" fill="#1f2a5a"/>
<g fill="#f1c9a5" stroke="#c9966f" stroke-width="2">${dedos}</g>
<ellipse cx="200" cy="180" rx="48" ry="42" fill="#f1c9a5" stroke="#c9966f" stroke-width="2"/>
<g fill="none" stroke="#e0b08a" stroke-width="2" stroke-linecap="round" opacity=".8"><path d="M182 172q18 10 36 0"/><path d="M186 190q14 8 28 0"/></g>
<text x="200" y="24" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="700" fill="#fff" opacity=".9">¡PROMO 2026!</text>` + PIE;
  },

  // 2) Edificio con cartel de letras deformadas
  cartel: () => CAB("Fachada de una biblioteca con un cartel ilegible") + `
<defs><linearGradient id="sc-car-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6db8f5"/><stop offset="1" stop-color="#e2f2ff"/></linearGradient></defs>
<rect width="400" height="260" fill="url(#sc-car-cielo)"/>
<circle cx="340" cy="44" r="20" fill="#fde68a"/>
<rect x="36" y="74" width="328" height="170" fill="#cbb89a"/>
<rect x="30" y="66" width="340" height="14" fill="#a8916f"/>
<g fill="#7aa7d9" stroke="#8b7355" stroke-width="3">
  <rect x="56" y="150" width="40" height="50"/><rect x="110" y="150" width="40" height="50"/>
  <rect x="250" y="150" width="40" height="50"/><rect x="304" y="150" width="40" height="50"/></g>
<rect x="170" y="158" width="60" height="86" rx="3" fill="#5b4636"/>
<circle cx="220" cy="204" r="3" fill="#fbbf24"/>
<rect x="86" y="86" width="228" height="52" rx="6" fill="#14532d" stroke="#f8fafc" stroke-width="3"/>
<text x="200" y="121" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="#f8fafc" letter-spacing="1"
  rotate="0 0 5 -7 0 9 0 -5 0 6 -8 4">BIBLIOTHECAE</text>
<rect x="268" y="206" width="84" height="30" rx="3" fill="#e5e7eb" stroke="#6b7280"/>
<text x="310" y="219" text-anchor="middle" font-family="Arial,sans-serif" font-size="7" fill="#374151" rotate="0 3 0 -3 0 4 0 -4 0 2 0">INAVGURAC1ÖN</text>
<path d="M276 227q6-5 12 0t12 0t12 0t12 0" fill="none" stroke="#6b7280" stroke-width="1.5"/>
<rect y="244" width="400" height="16" fill="#9ca3af"/>` + PIE,

  // 3) Sombras en direcciones opuestas
  sombras: () => CAB("Parque con postes cuyas sombras caen en direcciones opuestas") + `
<defs><linearGradient id="sc-som-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#56a8f0"/><stop offset="1" stop-color="#cfe8ff"/></linearGradient></defs>
<rect width="400" height="260" fill="url(#sc-som-cielo)"/>
<g stroke="#fde047" stroke-width="3" stroke-linecap="round">
  <line x1="60" y1="18" x2="60" y2="8"/><line x1="86" y1="30" x2="94" y2="22"/><line x1="92" y1="56" x2="102" y2="56"/><line x1="34" y1="30" x2="26" y2="22"/><line x1="86" y1="82" x2="94" y2="90"/></g>
<circle cx="60" cy="56" r="24" fill="#fde047"/>
<rect y="190" width="400" height="70" fill="#4d9a52"/>
<rect y="190" width="400" height="6" fill="#3f8244"/>
<!-- sombras -->
<g fill="#0b3d1c" opacity=".5">
  <polygon points="108,194 114,194 214,204 208,209 108,199"/>
  <polygon points="298,194 304,194 206,209 212,214 298,199"/>
  <polygon points="344,196 352,196 400,214 392,220 344,202"/></g>
<!-- poste A -->
<rect x="108" y="108" width="6" height="86" fill="#334155"/><circle cx="111" cy="102" r="10" fill="#fde68a" stroke="#334155" stroke-width="3"/>
<!-- poste B -->
<rect x="298" y="108" width="6" height="86" fill="#334155"/><circle cx="301" cy="102" r="10" fill="#fde68a" stroke="#334155" stroke-width="3"/>
<!-- árbol -->
<rect x="344" y="136" width="9" height="60" fill="#6b4423"/><circle cx="348" cy="126" r="30" fill="#2f7d3a"/><circle cx="332" cy="140" r="18" fill="#3a9147"/>` + PIE,

  // 4) Lago con reflejo que no coincide
  reflejo: () => CAB("Lago al amanecer cuyo reflejo no coincide con la montaña") + `
<defs>
  <linearGradient id="sc-ref-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a8b"/><stop offset=".6" stop-color="#ffd6a5"/><stop offset="1" stop-color="#ffe9c7"/></linearGradient>
  <linearGradient id="sc-ref-agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46618f"/><stop offset="1" stop-color="#1c2f57"/></linearGradient>
</defs>
<rect width="400" height="150" fill="url(#sc-ref-cielo)"/>
<circle cx="300" cy="82" r="26" fill="#fff3b0" opacity=".95"/>
<polygon points="0,150 70,82 130,125 210,40 300,130 350,96 400,150" fill="#3b3a6b"/>
<polygon points="196,56 210,40 224,58 212,52" fill="#f1f5f9"/>
<rect y="150" width="400" height="110" fill="url(#sc-ref-agua)"/>
<polygon points="0,150 70,218 130,175 188,248 212,232 234,262 300,170 350,204 400,150" fill="#2d2c58" opacity=".9"/>
<rect x="316" y="176" width="28" height="19" fill="#c0392b"/><polygon points="311,176 330,160 349,176" fill="#7f1d1d"/>
<g stroke="#fff" stroke-width="1.5" opacity=".35" stroke-linecap="round"><line x1="40" y1="190" x2="90" y2="190"/><line x1="240" y1="205" x2="300" y2="205"/><line x1="110" y1="232" x2="170" y2="232"/><line x1="290" y1="238" x2="350" y2="238"/></g>` + PIE,

  // 5) Reloj con números repetidos y manecillas imposibles
  reloj: () => {
    const etiquetas = ["12", "1", "2", "3", "3", "5", "6", "6", "8", "9", "11", "11"];
    const nums = etiquetas.map((t, k) => {
      const a = (k * Math.PI) / 6;
      const x = (200 + 72 * Math.sin(a)).toFixed(1);
      const y = (141 - 72 * Math.cos(a)).toFixed(1);
      return `<text x="${x}" y="${y}" text-anchor="middle" font-size="17" font-weight="700" fill="#1e293b" font-family="Georgia,serif">${t}</text>`;
    }).join("");
    return CAB("Reloj público con números repetidos y manecillas extrañas") + `
<defs><linearGradient id="sc-rel-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e293b"/><stop offset="1" stop-color="#0f172a"/></linearGradient></defs>
<rect width="400" height="260" fill="url(#sc-rel-bg)"/>
<rect x="150" y="226" width="100" height="34" fill="#475569"/>
<circle cx="200" cy="130" r="100" fill="#92400e"/>
<circle cx="200" cy="130" r="92" fill="#f8fafc"/>
${nums}
<g stroke="#111827" stroke-linecap="round">
  <line x1="200" y1="130" x2="200" y2="68" stroke-width="8"/>
  <line x1="200" y1="130" x2="256" y2="104" stroke-width="8"/>
  <line x1="200" y1="130" x2="142" y2="166" stroke-width="5"/>
  <line x1="200" y1="130" x2="262" y2="178" stroke-width="2" stroke="#dc2626"/></g>
<path d="M142 166 l-8 6 l6 -12 l6 8z" fill="#111827"/>
<circle cx="200" cy="130" r="6" fill="#111827"/>
<text x="200" y="248" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f8fafc" letter-spacing="1" rotate="0 2 0 -3 0 3 0 -2 0 2 0 0 0">MUNlCIPAL RELOI</text>` + PIE;
  },

  // 6) Ciclista con desenfoque de movimiento (foto REAL: caso ambiguo)
  ciclista: () => CAB("Ciclista en la calle con el fondo desenfocado") + `
<defs>
  <linearGradient id="sc-cic-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec5ff"/><stop offset="1" stop-color="#e8f4ff"/></linearGradient>
  <filter id="sc-cic-blur"><feGaussianBlur stdDeviation="5"/></filter>
</defs>
<rect width="400" height="260" fill="url(#sc-cic-cielo)"/>
<g filter="url(#sc-cic-blur)">
  <rect x="0" y="70" width="70" height="130" fill="#a98467"/><rect x="80" y="40" width="60" height="160" fill="#6c757d"/>
  <rect x="150" y="90" width="90" height="110" fill="#b08968"/><rect x="250" y="55" width="60" height="145" fill="#8d99ae"/>
  <rect x="320" y="80" width="80" height="120" fill="#c9ada7"/><circle cx="40" cy="60" r="18" fill="#2d6a4f"/><circle cx="240" cy="75" r="22" fill="#40916c"/></g>
<rect y="195" width="400" height="65" fill="#475569"/>
<line x1="0" y1="236" x2="400" y2="236" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="26 22"/>
<rect x="326" y="128" width="8" height="70" fill="#64748b"/>
<polygon points="321,92 339,92 352,105 352,121 339,134 321,134 308,121 308,105" fill="#dc2626" stroke="#fff" stroke-width="3"/>
<text x="330" y="118" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="13" font-weight="900" fill="#fff">STOP</text>
<ellipse cx="170" cy="240" rx="72" ry="7" fill="#0f172a" opacity=".35"/>
<polygon points="330,198 336,198 380,208 374,212 330,203" fill="#0f172a" opacity=".3"/>
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"><line x1="30" y1="170" x2="92" y2="170"/><line x1="46" y1="190" x2="96" y2="190"/><line x1="24" y1="210" x2="88" y2="210"/></g>
<g stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="120" cy="214" r="24"/><circle cx="212" cy="214" r="24"/>
  <path d="M120 214 L156 182 L192 214 M156 182 L206 178 M206 178 L212 214 M206 178 L216 170"/></g>
<line x1="160" y1="178" x2="190" y2="138" stroke="#e11d48" stroke-width="14" stroke-linecap="round"/>
<line x1="190" y1="140" x2="215" y2="170" stroke="#f1c9a5" stroke-width="6" stroke-linecap="round"/>
<line x1="160" y1="178" x2="166" y2="208" stroke="#1e3a8a" stroke-width="9" stroke-linecap="round"/>
<circle cx="197" cy="122" r="11" fill="#f1c9a5"/><path d="M185 120a12 12 0 0 1 24 0z" fill="#fbbf24"/>` + PIE,

  // 7) Inundación (foto antigua usada fuera de contexto)
  inundacion: () => CAB("Calle inundada") + `
<defs>
  <linearGradient id="sc-inu-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b5563"/><stop offset="1" stop-color="#9ca3af"/></linearGradient>
  <linearGradient id="sc-inu-agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b8fb3"/><stop offset="1" stop-color="#37546f"/></linearGradient>
</defs>
<rect width="400" height="260" fill="url(#sc-inu-cielo)"/>
<polygon points="0,40 120,90 120,170 0,200" fill="#374151"/><polygon points="400,30 280,90 280,170 400,210" fill="#3b4252"/>
<g fill="#fde68a" opacity=".7"><rect x="20" y="86" width="14" height="18"/><rect x="50" y="94" width="14" height="18"/><rect x="340" y="82" width="14" height="18"/><rect x="310" y="92" width="14" height="18"/></g>
<rect y="150" width="400" height="110" fill="url(#sc-inu-agua)"/>
<rect x="150" y="150" width="104" height="40" rx="12" fill="#b91c1c"/><rect x="164" y="138" width="74" height="22" rx="8" fill="#991b1b"/>
<rect y="176" width="400" height="84" fill="#37546f" opacity=".75"/>
<g fill="none" stroke="#e5e7eb" stroke-width="1.5" opacity=".6"><ellipse cx="90" cy="205" rx="40" ry="5"/><ellipse cx="300" cy="215" rx="46" ry="6"/><ellipse cx="200" cy="238" rx="60" ry="6"/></g>
<g stroke="#e5e7eb" stroke-width="1.2" opacity=".5"><line x1="30" y1="0" x2="20" y2="30"/><line x1="90" y1="10" x2="80" y2="40"/><line x1="160" y1="0" x2="150" y2="30"/><line x1="230" y1="14" x2="220" y2="44"/><line x1="300" y1="0" x2="290" y2="30"/><line x1="360" y1="12" x2="350" y2="42"/></g>` + PIE,

  // 8) Comunicado falso
  comunicado: () => CAB("Comunicado con errores y un sello desalineado") + `
<rect width="400" height="260" fill="#0b1730"/>
<rect x="90" y="8" width="220" height="246" rx="4" fill="#f8fafc"/>
<circle cx="126" cy="44" r="17" fill="#1d4ed8"/><text x="126" y="49" text-anchor="middle" font-family="Arial" font-size="12" font-weight="700" fill="#fff" rotate="0 4 -3">E5C</text>
<text x="212" y="38" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#111827">COMUNICAD0 OFICAL</text>
<text x="212" y="52" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#4b5563">Direcc1ón General</text>
<rect x="108" y="72" width="184" height="5" fill="#cbd5e1"/><rect x="108" y="84" width="150" height="5" fill="#cbd5e1"/>
<text x="200" y="118" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="13" font-weight="900" fill="#b91c1c">MAÑANA SE SUSPENDEN</text>
<text x="200" y="136" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="13" font-weight="900" fill="#b91c1c">LAS CLACES</text>
<rect x="108" y="154" width="184" height="5" fill="#cbd5e1"/><rect x="108" y="166" width="168" height="5" fill="#cbd5e1"/><rect x="108" y="178" width="120" height="5" fill="#cbd5e1"/>
<g transform="rotate(-16 250 214)"><circle cx="250" cy="214" r="24" fill="none" stroke="#dc2626" stroke-width="3" opacity=".75"/><text x="250" y="218" text-anchor="middle" font-family="Arial" font-size="9" font-weight="700" fill="#dc2626" opacity=".85">SELO</text></g>
<path d="M112 224q10-16 18 0t18 0t16-6" fill="none" stroke="#1e3a8a" stroke-width="2"/>
<text x="132" y="242" text-anchor="middle" font-family="Arial" font-size="7" fill="#4b5563">Dirección escolar</text>` + PIE,

  // 9) Captura de pantalla alarmista
  captura: () => CAB("Captura de una supuesta filtración de datos") + `
<rect width="400" height="260" fill="#0a0f1e"/>
<rect x="14" y="12" width="372" height="236" rx="8" fill="#111a30" stroke="#334155"/>
<rect x="14" y="12" width="372" height="26" rx="8" fill="#1e293b"/>
<circle cx="32" cy="25" r="4" fill="#f87171"/><circle cx="46" cy="25" r="4" fill="#fbbf24"/><circle cx="60" cy="25" r="4" fill="#34d399"/>
<rect x="78" y="17" width="290" height="16" rx="8" fill="#0f172a"/>
<text x="90" y="29" font-family="Consolas,monospace" font-size="9" fill="#94a3b8">http://colegio-datos-alerta.example/ver</text>
<polygon points="200,58 232,112 168,112" fill="none" stroke="#f87171" stroke-width="5" stroke-linejoin="round"/>
<line x1="200" y1="74" x2="200" y2="94" stroke="#f87171" stroke-width="5" stroke-linecap="round"/><circle cx="200" cy="103" r="3" fill="#f87171"/>
<text x="200" y="136" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="15" font-weight="900" fill="#f87171">ACCESO NO AUTORIZADO</text>
<text x="200" y="154" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#e2e8f0">FILTRADOS: 12 480 REGISTROS</text>
<g fill="#334155"><rect x="40" y="170" width="150" height="8" rx="2"/><rect x="40" y="186" width="120" height="8" rx="2"/><rect x="40" y="202" width="170" height="8" rx="2"/>
<rect x="250" y="170" width="100" height="8" rx="2"/><rect x="250" y="186" width="80" height="8" rx="2"/><rect x="250" y="202" width="110" height="8" rx="2"/></g>
<rect x="150" y="222" width="100" height="18" rx="9" fill="#dc2626"/><text x="200" y="235" text-anchor="middle" font-family="Arial" font-size="10" font-weight="700" fill="#fff">DESCARGAR LISTA</text>` + PIE,

  // 10) Rostro de videollamada con fallas (deepfake)
  rostro: () => CAB("Videollamada con una imagen que parpadea y se desfasa") + `
<defs><linearGradient id="sc-ros-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f3a4a"/><stop offset="1" stop-color="#1b1f4a"/></linearGradient></defs>
<rect width="400" height="260" fill="url(#sc-ros-bg)"/>
<rect x="40" y="34" width="120" height="150" fill="#23496b" opacity=".6"/><rect x="250" y="50" width="100" height="100" fill="#2d3f78" opacity=".5"/>
<path d="M90 262 Q200 190 310 262Z" fill="#1f2937"/><path d="M180 214 L200 244 L220 214Z" fill="#e5e7eb"/>
<ellipse cx="200" cy="118" rx="52" ry="64" fill="#e0b48f"/>
<path d="M146 108 Q150 52 200 50 Q252 52 254 108 Q236 74 200 74 Q164 74 146 108Z" fill="#3b2f2f"/>
<ellipse cx="180" cy="116" rx="9" ry="6" fill="#fff"/><ellipse cx="222" cy="114" rx="9" ry="9" fill="#fff"/>
<circle cx="181" cy="116" r="3.5" fill="#1f2937"/><circle cx="224" cy="112" r="3.5" fill="#1f2937"/>
<path d="M176 152 Q202 166 228 150" fill="none" stroke="#8b4a3c" stroke-width="4" stroke-linecap="round"/>
<g opacity=".55"><ellipse cx="206" cy="118" rx="52" ry="64" fill="none" stroke="#22d3ee" stroke-width="3"/><ellipse cx="194" cy="118" rx="52" ry="64" fill="none" stroke="#f472b6" stroke-width="3"/></g>
<rect x="0" y="96" width="400" height="8" fill="#22d3ee" opacity=".25"/><rect x="0" y="168" width="400" height="5" fill="#f472b6" opacity=".25"/>
<rect x="150" y="118" width="100" height="3" fill="#fff" opacity=".4"/>` + PIE,
};

export const ICONOS = {
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  shieldx: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  robot: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4"/><circle cx="12" cy="3.5" r="1"/><circle cx="9" cy="13" r="1.2"/><circle cx="15" cy="13" r="1.2"/><path d="M9.5 16.5h5"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  chat: '<path d="M4 5h16v10H9l-5 4V5z"/>',
  warning: '<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.5"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  cross: '<path d="M6 6l12 12M18 6L6 18"/>',
  news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.5" r="3.5"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 13v4M8 21h8M10 17h4"/>',
  speaker: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  mute: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',
  hint: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  heart: '<path d="M12 21s-7-4.6-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.4-9 9-9 9z"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M19 14c2 .8 3 2.6 3 6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>',
};

function desdePlantilla(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/** Devuelve un elemento <svg> con la ilustración pedida. */
export function crearEscena(id) {
  if (!ESCENAS[id]) throw new Error("Escena desconocida: " + id);
  return desdePlantilla(ESCENAS[id]());
}

/** Devuelve un ícono <svg> (trazo con el color del texto). */
export function icono(nombre, tam = 20) {
  const dibujo = ICONOS[nombre] || ICONOS.shield;
  return desdePlantilla(
    `<svg class="m4-ico" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${dibujo}</svg>`
  );
}
