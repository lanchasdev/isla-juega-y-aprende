/* mundo-x5 — Profesiones */
(function () {
'use strict';
const U = Kids.util;

/* ---------- personas ---------- */
const EYES = '<circle cx="42.5" cy="40" r="2.6" fill="#14235B"/><circle cx="57.5" cy="40" r="2.6" fill="#14235B"/><circle cx="43.3" cy="39.2" r=".9" fill="#fff"/><circle cx="58.3" cy="39.2" r=".9" fill="#fff"/><path d="M44 47 Q50 52 56 47" fill="none" stroke="#14235B" stroke-width="2" stroke-linecap="round"/><circle cx="37" cy="46" r="3.2" fill="#FF9AA2" opacity=".55"/><circle cx="63" cy="46" r="3.2" fill="#FF9AA2" opacity=".55"/>';
const hairCap = c => `<path d="M29 38 Q27 15 50 15 Q73 15 71 38 Q64 27 50 28 Q36 27 29 38Z" fill="${c}"/>`;
function person(o) {
  const sk = o.skin || '#F6C9A0';
  return `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="97" rx="30" ry="3.5" fill="#14235B" opacity=".1"/>${o.back || ''}<path d="M16 100 Q16 66 50 64 Q84 66 84 100Z" fill="${o.body}" stroke="#14235B" stroke-opacity=".14" stroke-width="1.5"/>${o.mid || ''}<rect x="44" y="54" width="12" height="13" rx="5" fill="${sk}"/><ellipse cx="29.5" cy="41" rx="3.5" ry="5" fill="${sk}"/><ellipse cx="70.5" cy="41" rx="3.5" ry="5" fill="${sk}"/><circle cx="50" cy="38" r="21" fill="${sk}"/>${o.hair || ''}${EYES}${o.front || ''}${o.hat || ''}${o.prop || ''}</svg>`;
}
const toque = '<rect x="32" y="15" width="36" height="14" rx="5" fill="#fff" stroke="#CBD5E6" stroke-width="2"/><path d="M34 16 Q32 3 44 6 Q50 0 56 6 Q68 3 66 16Z" fill="#fff" stroke="#CBD5E6" stroke-width="2"/>';
const capP = (c, band, vis) => `<path d="M27 32 Q27 11 50 11 Q73 11 73 32Z" fill="${c}"/><rect x="25" y="28" width="50" height="7" rx="3" fill="${band}"/><path d="M30 36 Q50 40 70 36 Q50 32 30 36Z" fill="${vis}"/>`;
Kids.art.add({
  'wx5-medica': person({ body: '#fff', mid: '<path d="M42 66 L50 80 L58 66Z" fill="#CFE6FB"/>', hair: hairCap('#8A4B24'), back: '', front: '<path d="M38 66 Q36 84 50 86 Q64 84 62 66" fill="none" stroke="#47B5BF" stroke-width="3.2" stroke-linecap="round"/><circle cx="50" cy="87" r="4" fill="#C9D3DC"/><rect x="67" y="79" width="9" height="9" rx="2" fill="#fff" stroke="#E0E6EE"/><path d="M71.500 80.500 v6 M68.500 83.500 h6" stroke="#E8574A" stroke-width="2"/>', hat: '<circle cx="50" cy="13" r="6" fill="#8A4B24"/><path d="M30 30 Q50 18 70 30" stroke="#C9D3DC" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="50" cy="22" r="4.5" fill="#E9EEF5" stroke="#B8C4D2" stroke-width="1.5"/>' }),
  'wx5-bombero': person({ skin: '#E0A47A', body: '#E8574A', mid: '<rect x="16" y="86" width="68" height="5" fill="#FFD23F"/><rect x="16" y="93" width="68" height="3" fill="#FFD23F"/>', hat: '<path d="M27 34 Q27 10 50 10 Q73 10 73 34Z" fill="#FFC21A"/><path d="M22 38 Q50 32 78 38 Q78 31 70 31 H30 Q22 31 22 38Z" fill="#E8A800"/><circle cx="50" cy="21" r="6" fill="#E8574A"/><path d="M50 17 l1.5 3 3.300.4 -2.400 2.200.6 3.200 -3-1.700 -3 1.700.6-3.200 -2.400-2.200 3.300-.4z" fill="#fff"/>' }),
  'wx5-policia': person({ body: '#2F4B8F', mid: '<path d="M42 66 L50 78 L58 66Z" fill="#fff"/>', hair: hairCap('#4A2E1B'), front: '<path d="M48 70 h4 l1.500 11 -3.500 3 -3.500-3z" fill="#14235B"/><path d="M68 76 l2.400 4.800 5.300.8 -3.800 3.700.9 5.300 -4.800-2.500 -4.800 2.500.9-5.300 -3.800-3.700 5.300-.8z" fill="#FFC21A"/>', hat: capP('#1F3570', '#14235B', '#14235B') + '<circle cx="50" cy="20" r="5" fill="#FFC21A"/>' }),
  'wx5-cocinera': person({ body: '#fff', mid: '<path d="M40 66 L50 75 L60 66 L56 63 H44Z" fill="#E8574A"/><circle cx="50" cy="84" r="2" fill="#E0E6EE"/><circle cx="50" cy="92" r="2" fill="#E0E6EE"/>', hair: '<path d="M29 40 Q28 28 36 26 L36 40Z M71 40 Q72 28 64 26 L64 40Z" fill="#8A4B24"/>', hat: toque, prop: '<path d="M80 99 L72 72" stroke="#C9D3DC" stroke-width="3.500" stroke-linecap="round"/><ellipse cx="71" cy="68" rx="6" ry="5" fill="#C9D3DC"/>' }),
  'wx5-maestra': person({ body: '#8C7BE0', back: '<path d="M26 40 Q22 68 32 74 H68 Q78 68 74 40Z" fill="#5B3A1E"/>', mid: '<path d="M40 66 L50 74 L60 66Z" fill="#fff"/>', hair: hairCap('#5B3A1E'), front: '<g fill="none" stroke="#14235B" stroke-width="2"><circle cx="42.500" cy="40" r="6.500"/><circle cx="57.500" cy="40" r="6.500"/><path d="M49 40 h2"/></g>', prop: '<rect x="12" y="74" width="26" height="20" rx="3" fill="#FFD23F"/><rect x="15" y="77" width="20" height="14" rx="2" fill="#fff"/><path d="M18 82 h14 M18 86 h10" stroke="#9CC5EE" stroke-width="2" stroke-linecap="round"/>' }),
  'wx5-panadero': person({ skin: '#E0A47A', body: '#F5E6C8', mid: '<path d="M32 70 Q50 66 68 70 V100 H32Z" fill="#fff"/>', hair: '', front: '<path d="M41 46 Q45.500 42 50 46 Q54.500 42 59 46 Q54.500 50 50 47 Q45.500 50 41 46Z" fill="#6B3E1E"/>', hat: toque, prop: '<ellipse cx="70" cy="88" rx="17" ry="9" fill="#E9A957"/><path d="M60 82 q3 6 0 12 M70 80 q3 8 0 14 M80 82 q3 6 0 12" fill="none" stroke="#C97F2E" stroke-width="2.200" stroke-linecap="round"/>' }),
  'wx5-granjero': person({ body: '#E8574A', mid: '<path d="M33 72 H67 V100 H33Z" fill="#4C8DF6"/><path d="M33 72 L38 64 M67 72 L62 64" stroke="#4C8DF6" stroke-width="5" stroke-linecap="round"/><circle cx="37" cy="76" r="2" fill="#FFD23F"/><circle cx="63" cy="76" r="2" fill="#FFD23F"/>', hair: '<path d="M29 40 Q29 30 33 28 L33 40Z M71 40 Q71 30 67 28 L67 40Z" fill="#8A4B24"/>', hat: '<ellipse cx="50" cy="27" rx="32" ry="6.500" fill="#F2C94C"/><path d="M33 27 Q33 8 50 8 Q67 8 67 27Z" fill="#F2C94C"/><rect x="33" y="20" width="34" height="5" fill="#E8574A"/>', prop: '<path d="M16 99 V58" stroke="#8A5A33" stroke-width="3.500" stroke-linecap="round"/><path d="M9 58 V46 M16 58 V44 M23 58 V46 M9 58 H23" stroke="#9AA6B5" stroke-width="3" stroke-linecap="round" fill="none"/>' }),
  'wx5-piloto': person({ skin: '#9B6A45', body: '#1F3570', mid: '<path d="M42 66 L50 78 L58 66Z" fill="#fff"/><path d="M20 90 H32 M20 94 H32 M68 90 H80 M68 94 H80" stroke="#FFC21A" stroke-width="2.500"/>', front: '<path d="M48 70 h4 l1.500 11 -3.500 3 -3.500-3z" fill="#E8574A"/>', hat: capP('#fff', '#14235B', '#14235B') + '<path d="M38 20 Q44 16 50 20 Q56 16 62 20 Q56 25 50 22 Q44 25 38 20Z" fill="#FFC21A"/>' }),
  'wx5-jardinero': person({ skin: '#FFD7B5', body: '#5CC77A', mid: '<path d="M34 72 H66 V100 H34Z" fill="#B98558"/>', hair: '', hat: '<ellipse cx="50" cy="29" rx="34" ry="7" fill="#E9C46A"/><path d="M33 29 Q33 9 50 9 Q67 9 67 29Z" fill="#E9C46A"/><rect x="33" y="22" width="34" height="5" fill="#3FA55B"/>', prop: '<path d="M18 99 V82" stroke="#3FA55B" stroke-width="3.500" stroke-linecap="round"/><g fill="#FF7EA8"><circle cx="18" cy="72" r="5.500"/><circle cx="12" cy="78" r="5.500"/><circle cx="24" cy="78" r="5.500"/><circle cx="18" cy="82" r="5.500"/></g><circle cx="18" cy="77" r="4.500" fill="#FFD23F"/>' }),
  'wx5-pintor': person({ body: '#fff', mid: '<circle cx="34" cy="84" r="4" fill="#E8574A"/><circle cx="64" cy="90" r="5" fill="#4C8DF6"/><circle cx="50" cy="78" r="3" fill="#FFD23F"/><circle cx="72" cy="76" r="3" fill="#5CC77A"/>', hair: '<path d="M29 40 Q28 28 35 27 L35 40Z M71 40 Q72 28 65 27 L65 40Z" fill="#3A2415"/>', hat: '<ellipse cx="46" cy="19" rx="26" ry="9" fill="#E8574A" transform="rotate(-8 46 19)"/><circle cx="57" cy="11" r="3" fill="#E8574A"/>', prop: '<path d="M86 99 L74 74" stroke="#B98558" stroke-width="4" stroke-linecap="round"/><path d="M74 74 L70 63 Q77 61 79 72Z" fill="#4C8DF6"/>' }),
  'wx5-cartero': person({ skin: '#E0A47A', body: '#4C8DF6', mid: '<path d="M24 66 L80 100 H64 L24 74Z" fill="#B98558"/>', hair: '<path d="M29 40 Q29 32 33 30 L33 40Z M71 40 Q71 32 67 30 L67 40Z" fill="#3A2415"/>', hat: capP('#2F6FD6', '#FFC21A', '#2F6FD6'), prop: '<rect x="8" y="74" width="30" height="20" rx="3" fill="#fff" stroke="#D5DDEC" stroke-width="1.500"/><path d="M8 76 L23 87 L38 76" fill="none" stroke="#D5DDEC" stroke-width="1.500"/><rect x="29" y="77" width="7" height="8" rx="1.500" fill="#E8574A"/>' }),
  'wx5-vet': person({ body: '#47B5BF', back: '<path d="M66 28 Q92 30 82 58 Q80 44 68 42Z" fill="#8A4B24"/>', mid: '<path d="M42 66 L50 76 L58 66Z" fill="#fff"/>', hair: hairCap('#8A4B24'), front: '<circle cx="68" cy="82" r="6" fill="#fff"/><circle cx="68" cy="84" r="2.600" fill="#47B5BF"/><circle cx="65" cy="80" r="1.200" fill="#47B5BF"/><circle cx="68" cy="78.500" r="1.200" fill="#47B5BF"/><circle cx="71" cy="80" r="1.200" fill="#47B5BF"/>', prop: '<g transform="translate(6 68)"><path d="M3 12 L8 0 L15 9Z M26 9 L33 0 L38 12Z" fill="#F2A65A"/><circle cx="20" cy="18" r="16" fill="#F2A65A"/><circle cx="14" cy="16" r="2.200" fill="#14235B"/><circle cx="26" cy="16" r="2.200" fill="#14235B"/><path d="M17.500 21 h5 l-2.500 3z" fill="#E8574A"/></g>' })
});
/* herramientas */
const TS = '<ellipse cx="50" cy="95" rx="30" ry="3" fill="#14235B" opacity=".1"/>';
Kids.art.add({
  'wx5-t-steto': `<svg viewBox="0 0 100 100">${TS}<path d="M28 14 Q28 44 44 48 Q60 44 60 14" fill="none" stroke="#47B5BF" stroke-width="4.500" stroke-linecap="round"/><path d="M44 48 Q44 76 62 78" fill="none" stroke="#47B5BF" stroke-width="4.500" stroke-linecap="round"/><circle cx="28" cy="12" r="4.500" fill="#9CAAB8"/><circle cx="60" cy="12" r="4.500" fill="#9CAAB8"/><circle cx="70" cy="78" r="12" fill="#C9D3DC" stroke="#9CAAB8" stroke-width="3"/><circle cx="70" cy="78" r="6" fill="#E9EEF5"/></svg>`,
  'wx5-t-hose': `<svg viewBox="0 0 100 100">${TS}<path d="M10 82 Q8 56 30 58 Q52 60 44 76 Q38 90 62 84 Q86 78 74 46 L78 34" fill="none" stroke="#E8574A" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><rect x="70" y="10" width="20" height="14" rx="3.500" fill="#FFC21A" transform="rotate(25 80 17)"/><path d="M92 20 L98 14 M94 28 L100 28 M92 12 L96 6" stroke="#6FA8F7" stroke-width="3" stroke-linecap="round"/></svg>`,
  'wx5-t-whistle': `<svg viewBox="0 0 100 100">${TS}<path d="M14 40 H64 L86 34 V58 H68 Q62 80 40 80 Q14 80 14 56Z" fill="#C9D3DC" stroke="#9CAAB8" stroke-width="3" stroke-linejoin="round"/><rect x="14" y="40" width="50" height="7" rx="3" fill="#9CAAB8"/><circle cx="40" cy="62" r="9" fill="#fff" stroke="#9CAAB8" stroke-width="2.500"/><path d="M86 46 Q98 46 98 62 Q98 76 84 78" fill="none" stroke="#E8574A" stroke-width="3.500" stroke-linecap="round"/></svg>`,
  'wx5-t-pan': `<svg viewBox="0 0 100 100">${TS}<circle cx="40" cy="54" r="31" fill="#4B5A8A"/><circle cx="40" cy="54" r="24" fill="#6B7BB0"/><rect x="66" y="48" width="30" height="11" rx="5.500" fill="#8A5A33"/><ellipse cx="31" cy="44" rx="9" ry="4" fill="#fff" opacity=".3"/><circle cx="46" cy="58" r="8" fill="#FFC933"/><ellipse cx="46" cy="58" rx="12" ry="9" fill="#fff" opacity=".0"/></svg>`,
  'wx5-t-board': `<svg viewBox="0 0 100 100">${TS}<rect x="8" y="12" width="84" height="64" rx="6" fill="#B98558"/><rect x="14" y="18" width="72" height="52" rx="3" fill="#3FA55B"/><text x="50" y="52" font-size="23" fill="#fff" text-anchor="middle" font-weight="800" font-family="Baloo 2,sans-serif">A B C</text><rect x="12" y="76" width="76" height="6" rx="3" fill="#8A5A33"/><rect x="62" y="70" width="14" height="6" rx="2" fill="#fff"/></svg>`,
  'wx5-t-rolling': `<svg viewBox="0 0 100 100">${TS}<rect x="24" y="34" width="54" height="28" rx="9" fill="#E5BE86" stroke="#C99560" stroke-width="2.500"/><rect x="4" y="41" width="22" height="14" rx="7" fill="#B98558"/><rect x="76" y="41" width="22" height="14" rx="7" fill="#B98558"/><g fill="#fff" opacity=".9"><circle cx="30" cy="76" r="2.500"/><circle cx="46" cy="82" r="2"/><circle cx="62" cy="76" r="2.500"/><circle cx="74" cy="84" r="2"/></g></svg>`,
  'wx5-t-rake': `<svg viewBox="0 0 100 100">${TS}<path d="M50 94 V34" stroke="#B98558" stroke-width="6" stroke-linecap="round"/><rect x="18" y="26" width="64" height="9" rx="4" fill="#9AA6B5"/><path d="M24 35 V50 M34 35 V50 M44 35 V50 M56 35 V50 M66 35 V50 M76 35 V50" stroke="#9AA6B5" stroke-width="4" stroke-linecap="round"/></svg>`,
  'wx5-t-can': `<svg viewBox="0 0 100 100">${TS}<path d="M20 38 H66 L62 82 Q61 88 55 88 H31 Q25 88 24 82Z" fill="#4C8DF6"/><path d="M62 56 L88 32" stroke="#4C8DF6" stroke-width="7" stroke-linecap="round"/><path d="M82 24 L96 40 L90 42 L78 30Z" fill="#2F6FD6"/><path d="M22 44 Q4 44 6 62 Q8 74 24 74" fill="none" stroke="#2F6FD6" stroke-width="5" stroke-linecap="round"/><path d="M30 38 Q43 22 56 38" fill="none" stroke="#2F6FD6" stroke-width="5" stroke-linecap="round"/><g fill="#9CC5EE"><circle cx="94" cy="54" r="3"/><circle cx="88" cy="62" r="2.500"/><circle cx="96" cy="68" r="2"/></g><ellipse cx="34" cy="60" rx="4" ry="12" fill="#fff" opacity=".3"/></svg>`,
  'wx5-t-brush': `<svg viewBox="0 0 100 100">${TS}<path d="M84 12 L40 62" stroke="#E5A94B" stroke-width="8" stroke-linecap="round"/><path d="M44 58 L34 70" stroke="#C9D3DC" stroke-width="10" stroke-linecap="round"/><path d="M34 70 Q18 76 14 88 Q28 90 40 76Z" fill="#8C7BE0"/><circle cx="76" cy="84" r="9" fill="#FF7EA8"/><circle cx="58" cy="88" r="6" fill="#FFD23F"/></svg>`,
  'wx5-t-letter': `<svg viewBox="0 0 100 100">${TS}<rect x="10" y="24" width="80" height="56" rx="6" fill="#fff" stroke="#D5DDEC" stroke-width="3"/><path d="M12 28 L50 56 L88 28" fill="none" stroke="#D5DDEC" stroke-width="3" stroke-linejoin="round"/><rect x="66" y="32" width="18" height="20" rx="2.500" fill="#FF8FA3" stroke="#fff" stroke-width="2"/><path d="M75 47 l-5 -5 a2.600 2.600 0 0 1 5 -3 a2.600 2.600 0 0 1 5 3z" fill="#fff"/></svg>`,
  'wx5-t-plane': `<svg viewBox="0 0 100 100">${TS}<path d="M10 52 Q10 44 20 44 H74 Q94 44 94 54 Q94 62 74 62 H20 Q10 62 10 52Z" fill="#fff" stroke="#D5DDEC" stroke-width="3"/><path d="M44 46 L28 14 H42 L66 46Z" fill="#4C8DF6"/><path d="M44 60 L28 90 H42 L66 60Z" fill="#4C8DF6"/><path d="M10 50 L4 30 H18 L22 46Z" fill="#E8574A"/><g fill="#9CC5EE"><circle cx="56" cy="53" r="3.500"/><circle cx="68" cy="53" r="3.500"/><circle cx="80" cy="53" r="3.500"/></g></svg>`
});
Kids.art.add({ 'wx5-icon': `<svg viewBox="0 0 100 100"><circle cx="30" cy="44" r="22" fill="#FFFFFF" opacity="0"/><g transform="translate(-4 -2) scale(.62)">${Kids.art.get('wx5-bombero').replace(/<\/?svg[^>]*>/g, '')}</g><g transform="translate(40 18) scale(.62)">${Kids.art.get('wx5-medica').replace(/<\/?svg[^>]*>/g, '')}</g></svg>` });

/* datos */
const PR = {
  medica:  { n: 'la médica', art: 'wx5-medica', q: '¿Quién nos cura cuando estamos enfermos?', long: 'Trabaja en un hospital y ayuda a las personas a ponerse bien cuando están malitas.', tool: 'steto', toolN: 'el estetoscopio', not: ['vet'] },
  bombero: { n: 'el bombero', art: 'wx5-bombero', q: '¿Quién apaga los fuegos?', long: 'Conduce un camión rojo muy rápido y apaga los incendios con una manguera.', tool: 'hose', toolN: 'la manguera', not: [] },
  policia: { n: 'la policía', art: 'wx5-policia', q: '¿Quién nos cuida y ayuda en la calle?', long: 'Lleva uniforme azul, vigila las calles y ayuda a que todos estemos seguros.', tool: 'whistle', toolN: 'el silbato', not: [] },
  cocinera:{ n: 'la cocinera', art: 'wx5-cocinera', q: '¿Quién prepara las comidas en un restaurante?', long: 'Lleva un gorro blanco muy alto y guisa platos ricos en una cocina grande.', tool: 'pan', toolN: 'la sartén', not: ['panadero'] },
  maestra: { n: 'la maestra', art: 'wx5-maestra', q: '¿Quién enseña en el colegio?', long: 'Cada mañana enseña a leer, escribir y contar a los niños de la clase.', tool: 'board', toolN: 'la pizarra', not: [] },
  panadero:{ n: 'el panadero', art: 'wx5-panadero', q: '¿Quién hace el pan?', long: 'Se levanta muy temprano para amasar la harina y hornear las barras de pan.', tool: 'rolling', toolN: 'el rodillo', not: ['cocinera'] },
  granjero:{ n: 'el granjero', art: 'wx5-granjero', q: '¿Quién cuida las vacas y los campos de la granja?', long: 'Vive en el campo, da de comer a las vacas y a las gallinas y cultiva la tierra.', tool: 'rake', toolN: 'el rastrillo', not: ['jardinero', 'vet'] },
  piloto:  { n: 'el piloto', art: 'wx5-piloto', q: '¿Quién conduce un avión por el cielo?', long: 'Lleva el avión por el cielo y lo aterriza con cuidado en el aeropuerto.', tool: 'plane', toolN: 'el avión', not: [] },
  jardinero:{ n: 'el jardinero', art: 'wx5-jardinero', q: '¿Quién cuida las flores del jardín?', long: 'Riega las flores y poda los arbustos de los parques y de los jardines.', tool: 'can', toolN: 'la regadera', not: ['granjero'] },
  pintor:  { n: 'el pintor', art: 'wx5-pintor', q: '¿Quién pinta cuadros con colores?', long: 'Mezcla colores y usa pinceles para hacer cuadros o pintar paredes.', tool: 'brush', toolN: 'el pincel', not: [] },
  cartero: { n: 'el cartero', art: 'wx5-cartero', q: '¿Quién lleva las cartas a las casas?', long: 'Va de casa en casa con una bolsa llena de cartas y de paquetes.', tool: 'letter', toolN: 'la carta', not: [] },
  vet:     { n: 'la veterinaria', art: 'wx5-vet', q: '¿Quién cura a los animales enfermos?', long: 'Trabaja con animales y los cura cuando están malitos.', tool: null, toolN: '', not: ['medica', 'granjero'] }
};
const KEYS = Object.keys(PR), TOOLP = KEYS.filter(k => PR[k].tool);
const MULTI = [
  ['Trabaja con animales.', ['granjero', 'vet'], 'animales'],
  ['Trabaja con plantas.', ['granjero', 'jardinero'], 'plantas'],
  ['Trabaja con la comida.', ['cocinera', 'panadero'], 'comida'],
  ['Ayuda a curar cuando algo duele.', ['medica', 'vet'], 'curar']
];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const pa = k => Kids.art.get(PR[k].art);
const ta = k => Kids.art.get('wx5-t-' + PR[k].tool);
function distract(k, n) { return U.sample(KEYS.filter(x => x !== k && !PR[k].not.includes(x) && !PR[x].not.includes(k)), n); }

Kids.css(`
.g-mundo-x5 .x5-opts{display:flex;flex-wrap:wrap;gap:clamp(.6rem,2vmin,1.2rem);justify-content:center;width:100%;max-width:60rem}
.g-mundo-x5 .x5-opts .pic{width:clamp(6.6rem,22vmin,11.5rem);padding:.4rem .4rem .5rem}
.g-mundo-x5 .x5-opts .pic svg{width:100%;height:auto;max-width:none;max-height:none;aspect-ratio:1}
.g-mundo-x5 .x5-opts .pic .lbl{font-size:clamp(1rem,2.6vmin,1.5rem);min-height:1em;text-align:center}
.g-mundo-x5 .x5-opts .pic.pulse{animation:pulse .7s 5}
.g-mundo-x5 .x5-big{display:flex;align-items:center;gap:1rem;background:#fff;border-radius:2rem;box-shadow:0 .4rem 0 var(--line);padding:.5rem 1.4rem .5rem .7rem;max-width:100%}
.g-mundo-x5 .x5-big .pi{width:clamp(5.5rem,20vmin,9.5rem);flex:none}
.g-mundo-x5 .x5-big .pi svg{width:100%;height:auto;display:block}
.g-mundo-x5 .x5-big b{font-family:'Baloo 2';font-size:clamp(1.2rem,3.4vmin,2rem);line-height:1.1}
.g-mundo-x5 .x5-long{font-family:'Baloo 2';font-size:clamp(1.15rem,3vmin,1.8rem);line-height:1.2;text-align:center;background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line);padding:.8rem 1.4rem;max-width:44rem}
.g-mundo-x5 .x5-count{font-family:'Baloo 2';font-size:1.15rem;color:var(--ink2);text-align:center}
`);

Kids.game({
  id: 'mundo-x5', group: 'mundo', num: 8,
  title: 'Profesiones',
  blurb: 'Descubre quién hace cada trabajo y qué herramientas usa.',
  how: 'Escucha la pregunta y toca a la persona o la herramienta que corresponde. A veces hay más de una respuesta.',
  icon: 'wx5-icon',
  levels: ['Con nombres', 'Sin nombres y herramientas', 'Pistas largas'],
  rounds: 8,
  round(g, i) {
    const L = g.level;
    if (i === 0) PLAN = { who: U.shuffle(KEYS), tools: U.shuffle(TOOLP), multi: U.shuffle(MULTI), w: 0, t: 0, m: 0 };
    const opts = U.el('<div class="x5-opts"></div>');
    let kind = 'who';
    if (L === 2) kind = i % 4 === 1 ? 'tool' : i % 4 === 3 ? 'whoTool' : 'who';
    if (L === 3) kind = (i === 3 || i === 6) ? 'multi' : 'long';
    const mk = (k, label, art) => U.el(`<button class="pic" data-k="${k}" aria-label="${kind === 'tool' ? PR[k].toolN : PR[k].n}">${art}<span class="lbl">${label ? cap(PR[k].n) : ''}</span></button>`);
    let correct, q, extraTop = null;
    if (kind === 'multi') {
      const m = PLAN.multi[PLAN.m++ % PLAN.multi.length], [txt, valid] = m;
      const others = U.sample(KEYS.filter(k => !valid.includes(k) && !PR[k].not.some(x => valid.includes(x)) && !valid.some(v => PR[v].not.includes(k))), 3);
      U.shuffle(valid.concat(others)).forEach(k => opts.appendChild(mk(k, false, pa(k))));
      const found = new Set();
      g.area.append(U.el(`<div class="x5-long">${txt}</div>`), U.el(`<div class="x5-count">Hay ${valid.length} respuestas. Toca todas.</div>`), opts);
      opts.querySelectorAll('.pic').forEach(b => b.onclick = () => {
        const k = b.dataset.k; if (found.has(k)) return;
        if (valid.includes(k)) {
          found.add(k); b.classList.add('right'); b.disabled = true; b.querySelector('.lbl').textContent = cap(PR[k].n); Kids.sound.pop(); g.say(cap(PR[k].n));
          if (found.size === valid.length) g.right('¡Las has encontrado todas!');
        } else { g.shake(b); b.classList.add('bad'); g.t(() => b.classList.remove('bad'), 700); g.wrong('Mmm, ' + PR[k].n + ' no trabaja con eso. ¡Sigue!'); }
      });
      g.helpHint = () => { const b = Array.from(opts.querySelectorAll('.pic')).find(x => valid.includes(x.dataset.k) && !x.disabled); b && b.classList.add('pulse'); g.toast('Pista: una de las respuestas se mueve'); };
      g.ask(txt + ' Toca a todas las personas que lo hacen.');
      return;
    }
    let choices, art, labelOn = L === 1, big = null;
    if (kind === 'who' || kind === 'long') {
      correct = PLAN.who[PLAN.w++ % KEYS.length];
      q = kind === 'long' ? PR[correct].long + ' ¿Quién es?' : PR[correct].q;
      choices = U.shuffle([correct].concat(distract(correct, L === 1 ? 2 : 3)));
      art = pa;
      if (kind === 'long') big = U.el(`<div class="x5-long">${PR[correct].long}</div>`);
    } else if (kind === 'tool') {
      correct = PLAN.tools[PLAN.t++ % TOOLP.length]; q = '¿Qué herramienta usa ' + PR[correct].n + '?';
      const tools = U.shuffle([correct].concat(U.sample(TOOLP.filter(x => x !== correct), 3)));
      big = U.el(`<div class="x5-big"><div class="pi">${pa(correct)}</div><b>${cap(PR[correct].n)}</b></div>`);
      choices = tools; art = ta; labelOn = false;
    } else {
      correct = PLAN.tools[PLAN.t++ % TOOLP.length]; q = '¿Quién usa ' + PR[correct].toolN + '?';
      big = U.el(`<div class="x5-big"><div class="pi">${ta(correct)}</div><b>${cap(PR[correct].toolN)}</b></div>`);
      choices = U.shuffle([correct].concat(U.sample(TOOLP.filter(x => x !== correct), 3))); art = pa; labelOn = false;
    }
    choices.forEach(k => opts.appendChild(mk(k, labelOn, art(k))));
    if (big) g.area.appendChild(big);
    g.area.appendChild(opts);
    let done = false;
    opts.querySelectorAll('.pic').forEach(b => b.onclick = () => {
      if (done) return; const k = b.dataset.k;
      if (k === correct) {
        done = true; b.classList.add('right'); const lb = b.querySelector('.lbl');
        const nm = kind === 'tool' ? cap(PR[k].toolN) : cap(PR[k].n); lb.textContent = nm; g.say(nm);
        g.right(kind === 'tool' ? '¡Sí! ' + nm : '¡Sí! Es ' + PR[k].n);
      } else {
        b.classList.add('bad'); b.disabled = true;
        g.wrong(kind === 'tool' ? 'Esa herramienta es de otro trabajo. ¡Prueba otra!' : kind === 'whoTool' ? 'Esa persona usa otra herramienta. ¡Prueba otra!' : 'Esa es ' + PR[k].n + '. ¡Mira otra vez!');
      }
    });
    g.helpHint = () => { const b = opts.querySelector(`[data-k="${correct}"]`); b && b.classList.add('pulse'); g.toast('Pista: mira lo que se mueve'); };
    g.ask(q);
  },
  stars(m) { return m <= 2 ? 3 : m <= 6 ? 2 : 1; }
});
let PLAN = null;
})();
