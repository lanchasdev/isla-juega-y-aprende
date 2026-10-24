/* Ordena la historia */
(function () {
'use strict';
const U = Kids.util;
function A(name, x, y, w, flip) {
  const args = Array.prototype.slice.call(arguments, 5);
  const s = Kids.art.get.apply(Kids.art, [name].concat(args)).replace('<svg', `<svg x="${x}" y="${y}" width="${w}" height="${w}"`);
  return flip ? `<g transform="translate(${2 * x + w} 0) scale(-1 1)">${s}</g>` : s;
}
const sky = c => `<rect width="100" height="100" fill="${c || '#CDEBFF'}"/>`;
const grass = (y, c) => `<rect y="${y}" width="100" height="${100 - y}" fill="${c || '#A9DE9A'}"/>`;
const cl = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c || '#fff'}"><ellipse cx="0" cy="0" rx="14" ry="8"/><ellipse cx="-9" cy="2" rx="9" ry="7"/><ellipse cx="10" cy="2" rx="10" ry="7"/></g>`;
const soil = y => `<rect y="${y}" width="100" height="${100 - y}" fill="#B07A4B"/><rect y="${y}" width="100" height="6" fill="#8FCB7E"/>`;
const leafP = (x, y, r, rot) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .5}" fill="#5CC77A" transform="rotate(${rot} ${x} ${y})"/>`;
const tooth = (x, y, s, extra) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 -14Q-22 -30 -8 -28Q0 -26 8 -28Q22 -30 22 -14Q22 0 16 10Q14 30 8 30Q4 30 3 16Q0 12 -3 16Q-4 30 -8 30Q-14 30 -16 10Q-22 0 -22 -14Z" fill="#fff" stroke="#BFD6EE" stroke-width="2.4" stroke-linejoin="round"/>${extra || ''}</g>`;
const face = '<circle cx="-8" cy="-10" r="2.6" fill="#14235B"/><circle cx="8" cy="-10" r="2.6" fill="#14235B"/><path d="M-6 -2q6 6 12 0" fill="none" stroke="#14235B" stroke-width="2.2" stroke-linecap="round"/>';
const pond = '<ellipse cx="72" cy="72" rx="34" ry="19" fill="#6CC4EE"/><ellipse cx="72" cy="72" rx="34" ry="19" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/>';
const star = (x, y, s, c) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -8L2.4 -2.6 8 -2 3.8 1.8 5 7.6 0 4.6 -5 7.6 -3.8 1.8 -8 -2 -2.4 -2.6Z" fill="${c || '#FFD23F'}"/>`;

/* cada historia: 4 viñetas en orden, con su frase corta */
const STORIES = [
  { t: 'la semilla', caps: ['Hay una semilla en la tierra', 'Sale un brotecito', 'La planta crece', 'Ya es una flor'], panels: [
    sky() + soil(64) + '<ellipse cx="50" cy="72" rx="14" ry="5" fill="#7B5030"/><ellipse cx="50" cy="40" rx="6" ry="9" fill="#8A5A2B" transform="rotate(20 50 40)"/><path d="M50 52v8" stroke="#8A5A2B" stroke-width="2" stroke-dasharray="2 3" stroke-linecap="round"/>',
    sky() + soil(64) + '<path d="M50 66V54" stroke="#4FB265" stroke-width="3.4" stroke-linecap="round"/>' + leafP(44, 52, 7, -30) + leafP(56, 52, 7, 30) + A('raindrop', 24, 16, 12) + A('raindrop', 64, 22, 12),
    sky() + soil(70) + A('sun', 62, 4, 30) + '<path d="M50 72V34" stroke="#4FB265" stroke-width="4" stroke-linecap="round"/>' + leafP(40, 56, 10, -25) + leafP(60, 46, 10, 25) + leafP(44, 36, 7, -35) + leafP(56, 34, 7, 35),
    sky() + soil(76) + '<path d="M50 78V50" stroke="#4FB265" stroke-width="4" stroke-linecap="round"/>' + leafP(40, 66, 9, -25) + leafP(60, 62, 9, 25) + A('flower', 25, 12, 50, false, '#FF7EA8') + A('butterfly', 70, 20, 16)
  ] },
  { t: 'el pastel', hard: true, caps: ['Mezclo los ingredientes', 'Lo meto en el horno', 'El pastel está hecho', 'Soplo las velas'], panels: [
    sky('#FFF1D6') + '<rect y="66" width="100" height="34" fill="#C98A5B"/><path d="M22 46h56q-2 28-14 28H36Q24 74 22 46Z" fill="#fff" stroke="#CFE6FB" stroke-width="2.5"/><ellipse cx="50" cy="46" rx="28" ry="7" fill="#FFD98A"/><path d="M58 20L50 46" stroke="#C98A5B" stroke-width="4" stroke-linecap="round"/><ellipse cx="60" cy="18" rx="4" ry="6" fill="#C98A5B" transform="rotate(24 60 18)"/><ellipse cx="82" cy="78" rx="6" ry="8" fill="#FFF7E6" stroke="#EADFC8" stroke-width="1.5"/><ellipse cx="14" cy="80" rx="6" ry="8" fill="#FFF7E6" stroke="#EADFC8" stroke-width="1.5"/>',
    sky('#FFF1D6') + '<rect x="14" y="18" width="72" height="68" rx="10" fill="#9AA6BF"/><rect x="22" y="36" width="56" height="40" rx="6" fill="#FF9A4D"/><rect x="26" y="40" width="48" height="32" rx="4" fill="#FFC857"/><rect x="34" y="52" width="32" height="14" rx="4" fill="#C98A5B"/><circle cx="30" cy="27" r="3.4" fill="#E8EEF8"/><circle cx="42" cy="27" r="3.4" fill="#E8EEF8"/><rect x="54" y="24" width="26" height="5" rx="2.5" fill="#E8EEF8"/>',
    sky('#FFF1D6') + '<rect y="72" width="100" height="28" fill="#C98A5B"/><ellipse cx="50" cy="74" rx="38" ry="7" fill="#fff" stroke="#EADFC8" stroke-width="2"/><path d="M20 70V52q0-8 8-8h44q8 0 8 8v18Q50 78 20 70Z" fill="#E0A55B"/><path d="M20 54q0-6 8-6h44q8 0 8 6Z" fill="#F2C57B"/>',
    sky('#FFF1D6') + '<rect y="72" width="100" height="28" fill="#C98A5B"/><ellipse cx="50" cy="76" rx="38" ry="7" fill="#fff" stroke="#EADFC8" stroke-width="2"/><path d="M20 72V54q0-8 8-8h44q8 0 8 8v18Q50 80 20 72Z" fill="#E0A55B"/><path d="M20 56q4-10 12-4t10-2 10 2 10-2 10 2 8 4q0 6-8 6H28q-8 0-8-6Z" fill="#FFB5CB"/><g fill="#FFD23F"><rect x="32" y="30" width="5" height="16" rx="2"/><rect x="48" y="30" width="5" height="16" rx="2"/><rect x="64" y="30" width="5" height="16" rx="2"/></g><g fill="#FF8A3D"><ellipse cx="34.5" cy="25" rx="3.4" ry="5"/><ellipse cx="50.5" cy="25" rx="3.4" ry="5"/><ellipse cx="66.5" cy="25" rx="3.4" ry="5"/></g>' + A('balloon', 0, 4, 22, false, '#FF7E69') + A('balloon', 78, 4, 22, false, '#4C8DF6')
  ] },
  { t: 'los dientes', caps: ['Pongo pasta en el cepillo', 'Me cepillo los dientes', 'Me enjuago con agua', 'Tengo los dientes limpios'], panels: [
    sky('#E4F5FF') + '<rect x="14" y="58" width="72" height="12" rx="6" fill="#4C8DF6" transform="rotate(-12 50 64)"/><g transform="rotate(-12 50 64)"><rect x="66" y="48" width="18" height="10" rx="3" fill="#CFE6FB"/><g fill="#fff"><rect x="68" y="46" width="2.6" height="6"/><rect x="72" y="46" width="2.6" height="6"/><rect x="76" y="46" width="2.6" height="6"/><rect x="80" y="46" width="2.6" height="6"/></g><path d="M64 48q10-14 22-4q-2 6-10 6z" fill="#5CE0C8"/></g>',
    sky('#E4F5FF') + tooth(50, 50, 1.5, '') + '<g fill="#fff" stroke="#BFD6EE" stroke-width="1.6"><circle cx="30" cy="30" r="6"/><circle cx="68" cy="26" r="8"/><circle cx="76" cy="52" r="5"/><circle cx="24" cy="56" r="4"/><circle cx="46" cy="22" r="4.5"/></g><g transform="rotate(25 70 70)"><rect x="42" y="64" width="50" height="10" rx="5" fill="#4C8DF6"/><rect x="26" y="58" width="22" height="9" rx="3" fill="#CFE6FB"/></g>',
    sky('#E4F5FF') + '<path d="M30 26h40l-5 54Q50 86 35 80Z" fill="#E6F4FF" stroke="#9BC8EE" stroke-width="3" stroke-linejoin="round"/><path d="M33 46h34l-3 32Q50 83 36 78Z" fill="#6CC4EE"/><path d="M33 46q8-5 17 0t17 0" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>' + A('raindrop', 70, 16, 14) + A('raindrop', 76, 46, 12) + A('raindrop', 64, 70, 12) + '<path d="M26 82q6-5 12 0t12 0" fill="none" stroke="#6CC4EE" stroke-width="3" stroke-linecap="round" opacity=".6"/>',
    sky('#E4F5FF') + tooth(50, 54, 1.6, face) + star(18, 22, 1.4) + star(82, 28, 1.1) + star(80, 76, 1.5) + star(20, 72, 1)
  ] },
  { t: 'la lluvia', caps: ['Brilla el sol', 'Llegan nubes grises', 'Llueve y abro el paraguas', 'Sale el arcoíris'], panels: [
    sky() + grass(70) + A('sun', 28, 6, 46) + cl(18, 54, .6) + cl(84, 46, .5),
    sky('#C9D6E6') + grass(70, '#8FC98B') + A('sun', 58, 8, 26) + cl(30, 30, 1.2, '#8E9BB0') + cl(66, 34, 1.3, '#7C8AA2') + cl(50, 22, 1.1, '#A0ACC0'),
    sky('#B6C3D6') + grass(76, '#7FBF82') + cl(34, 20, 1.5, '#6E7C95') + cl(68, 22, 1.5, '#7C8AA2') + '<g stroke="#4C8DF6" stroke-width="2.4" stroke-linecap="round"><path d="M18 40l-3 9M32 44l-3 9M46 40l-3 9M60 44l-3 9M74 40l-3 9M88 44l-3 9M26 62l-3 9M52 64l-3 9M80 62l-3 9"/></g>' + A('umbrella', 26, 44, 50),
    sky() + grass(74) + A('rainbow', 6, 10, 88) + A('sun', 70, 2, 24) + cl(18, 70, .6) 
  ] },
  { t: 'el patito', caps: ['El patito camina', 'Llega al estanque', 'Nada y chapotea', 'Se seca al sol'], panels: [
    sky() + grass(52) + pond + A('duck', 0, 40, 34) + A('sun', 70, 2, 22),
    sky() + grass(52) + pond + A('duck', 32, 40, 34) + A('sun', 70, 2, 22),
    sky() + grass(52) + pond + '<g fill="none" stroke="#fff" stroke-width="1.6"><ellipse cx="68" cy="82" rx="14" ry="4"/><ellipse cx="68" cy="82" rx="22" ry="6" opacity=".6"/></g>' + A('duck', 50, 44, 34) + '<g fill="#fff" stroke="#9BD3F2" stroke-width="1"><circle cx="48" cy="46" r="3"/><circle cx="90" cy="48" r="3.4"/><circle cx="52" cy="38" r="2"/></g>' + A('sun', 70, 2, 22),
    sky() + grass(52) + pond + A('sun', 6, 2, 34) + A('duck', 8, 42, 34) + A('raindrop', 2, 36, 8) + A('raindrop', 38, 40, 8) + A('raindrop', 4, 60, 7)
  ] },
  { t: 'el muñeco de nieve', caps: ['Hago una bola de nieve', 'Pongo otra bola encima', 'Pongo la cabeza', 'Le pongo nariz y bufanda'], panels: [
    sky('#D6EAFB') + '<rect y="66" width="100" height="34" fill="#fff"/><circle cx="50" cy="62" r="24" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/>' + A('snowflake', 6, 6, 18) + A('snowflake', 74, 14, 14),
    sky('#D6EAFB') + '<rect y="72" width="100" height="28" fill="#fff"/><circle cx="50" cy="66" r="25" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/><circle cx="50" cy="32" r="18" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/>',
    sky('#D6EAFB') + '<rect y="76" width="100" height="24" fill="#fff"/><circle cx="50" cy="72" r="24" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/><circle cx="50" cy="46" r="18" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/><circle cx="50" cy="24" r="12" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/>',
    sky('#D6EAFB') + '<rect y="76" width="100" height="24" fill="#fff"/><circle cx="50" cy="72" r="24" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/><circle cx="50" cy="46" r="18" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/><circle cx="50" cy="24" r="12" fill="#fff" stroke="#CFE0F2" stroke-width="2.5"/><circle cx="46" cy="22" r="1.8" fill="#14235B"/><circle cx="55" cy="22" r="1.8" fill="#14235B"/><path d="M50 25l9 2-9 2z" fill="#FF8A3D"/><path d="M38 34q12 7 24 0l2 7q-14 7-28 0z" fill="#FF5C7A"/><circle cx="50" cy="52" r="2.4" fill="#14235B"/><circle cx="50" cy="63" r="2.4" fill="#14235B"/>' + A('snowflake', 6, 6, 16) + A('snowflake', 78, 18, 14)
  ] },
  { t: 'la noche', hard: true, caps: ['Brilla el sol', 'El sol se esconde', 'Sale la luna', 'Me voy a dormir'], panels: [
    sky('#BFE6FB') + A('sun', 30, 4, 40) + grass(72) + cl(80, 46, .6),
    '<defs><linearGradient id="x8-sunset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB27A"/><stop offset="1" stop-color="#FFE0A0"/></linearGradient></defs><rect width="100" height="100" fill="url(#x8-sunset)"/><circle cx="50" cy="66" r="18" fill="#FF8A3D"/>' + grass(68, '#6FAE76'),
    sky('#1F2D6B') + grass(74, '#2F5C55') + A('moon', 34, 8, 40) + star(14, 20, 1.2, '#FFF3B0') + star(84, 16, 1, '#FFF3B0') + star(78, 44, 1.3, '#FFF3B0') + star(20, 50, .9, '#FFF3B0'),
    '<rect width="100" height="100" fill="#3A3F7A"/><rect y="70" width="100" height="30" fill="#5B4B8A"/><rect x="62" y="12" width="28" height="34" rx="6" fill="#1F2D6B" stroke="#E9DFFF" stroke-width="2.5"/>' + A('moon', 64, 14, 22) + A('bed', 6, 36, 64) + '<text x="62" y="62" font-family="Baloo 2,sans-serif" font-weight="800" font-size="12" fill="#CFE6FB">z</text><text x="72" y="52" font-family="Baloo 2,sans-serif" font-weight="800" font-size="16" fill="#CFE6FB">Z</text>'
  ] },
  { t: 'la pesca', hard: true, caps: ['Lanzo la caña', 'El flotador se mueve', 'Pica un pez', 'El pez está en el cubo'], panels: [
    sky() + '<rect y="52" width="100" height="48" fill="#6CC4EE"/><rect x="0" y="44" width="34" height="9" fill="#B98558"/><path d="M14 44L62 8" stroke="#8A5A2B" stroke-width="2.6" stroke-linecap="round"/><path d="M62 8Q84 16 80 50" fill="none" stroke="#fff" stroke-width="1.2"/><circle cx="80" cy="54" r="5" fill="#FF5C5C"/><path d="M75 54h10" stroke="#fff" stroke-width="2"/>',
    sky() + '<rect y="52" width="100" height="48" fill="#6CC4EE"/><rect x="0" y="44" width="34" height="9" fill="#B98558"/><path d="M14 44L62 8" stroke="#8A5A2B" stroke-width="2.6" stroke-linecap="round"/><path d="M62 8Q84 16 80 54" fill="none" stroke="#fff" stroke-width="1.2"/><circle cx="80" cy="56" r="5" fill="#FF5C5C"/><path d="M75 56h10" stroke="#fff" stroke-width="2"/><g fill="none" stroke="#fff" stroke-width="1.6"><ellipse cx="80" cy="60" rx="10" ry="3"/><ellipse cx="80" cy="60" rx="16" ry="5" opacity=".6"/></g><ellipse cx="74" cy="82" rx="14" ry="6" fill="#3E86B5" opacity=".6"/><path d="M86 82l8-5v10z" fill="#3E86B5" opacity=".6"/>',
    sky() + '<rect y="62" width="100" height="38" fill="#6CC4EE"/><rect x="0" y="54" width="34" height="9" fill="#B98558"/><path d="M14 54L48 14" stroke="#8A5A2B" stroke-width="2.6" stroke-linecap="round"/><path d="M48 14Q62 16 70 24" fill="none" stroke="#fff" stroke-width="1.2"/>' + A('fish', 54, 20, 34) + '<g fill="#fff" stroke="#9BD3F2" stroke-width="1"><circle cx="68" cy="74" r="3"/><circle cx="80" cy="70" r="2.4"/></g>',
    sky('#FFF1D6') + grass(66, '#C9E5A6') + '<path d="M26 44h48l-6 42H32Z" fill="#E4572E"/><ellipse cx="50" cy="44" rx="24" ry="6" fill="#B63E1E"/><path d="M26 44q24-40 48 0" fill="none" stroke="#8A8F9E" stroke-width="3"/>' + A('fish', 30, 24, 40) + '<path d="M28 44h44l-2 8H30Z" fill="#E4572E"/>'
  ] },
  { t: 'el pollito', hard: true, caps: ['Hay un huevo en el nido', 'El huevo se rompe', 'Sale un pollito', 'Mamá gallina con su pollito'], panels: [
    sky('#FFF5D6') + grass(70, '#C9E5A6') + '<ellipse cx="50" cy="72" rx="34" ry="12" fill="#D9A867"/><path d="M18 70q32 24 64 0" fill="#C98E4F"/><ellipse cx="50" cy="56" rx="14" ry="18" fill="#FFF7E6" stroke="#EADFC8" stroke-width="2"/>',
    sky('#FFF5D6') + grass(70, '#C9E5A6') + '<ellipse cx="50" cy="72" rx="34" ry="12" fill="#D9A867"/><path d="M18 70q32 24 64 0" fill="#C98E4F"/><ellipse cx="50" cy="56" rx="14" ry="18" fill="#FFF7E6" stroke="#EADFC8" stroke-width="2"/><path d="M37 54l6 5 5-7 6 7 5-6 6 6" fill="none" stroke="#B7A27A" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><g fill="none" stroke="#FFB300" stroke-width="2" stroke-linecap="round"><path d="M28 30l5 5M72 30l-5 5M50 22v7"/></g>',
    sky('#FFF5D6') + grass(70, '#C9E5A6') + '<ellipse cx="50" cy="78" rx="34" ry="10" fill="#D9A867"/>' + A('chick', 32, 34, 36) + '<path d="M34 66l4 8 5-6 5 7 5-7 5 6 4-8q-14 6-28 0Z" fill="#FFF7E6" stroke="#EADFC8" stroke-width="2" stroke-linejoin="round"/>',
    sky() + grass(54) + A('hen', 6, 34, 52) + A('chick', 58, 52, 28) + A('sun', 70, 2, 24) + A('flower', 62, 76, 16, false, '#FF7EA8')
  ] },
  { t: 'la mariposa', hard: true, caps: ['Un huevecito en la hoja', 'Nace una oruga', 'La oruga se hace crisálida', 'Sale una mariposa'], panels: [
    sky() + '<path d="M10 74Q40 40 90 62Q60 90 10 74Z" fill="#5CC77A"/><path d="M12 74Q50 62 88 62" fill="none" stroke="#3FA25E" stroke-width="2"/><g fill="#FFF7E6" stroke="#EADFC8" stroke-width="1"><circle cx="46" cy="64" r="3"/><circle cx="52" cy="62" r="3"/><circle cx="49" cy="68" r="3"/></g>',
    sky() + '<path d="M6 74Q40 44 94 62Q60 92 6 74Z" fill="#5CC77A"/><g><circle cx="36" cy="62" r="7" fill="#9AE06A"/><circle cx="46" cy="60" r="7" fill="#7FD457"/><circle cx="56" cy="60" r="7" fill="#9AE06A"/><circle cx="66" cy="62" r="7" fill="#7FD457"/><circle cx="74" cy="56" r="9" fill="#FFD23F"/><circle cx="72" cy="54" r="1.8" fill="#14235B"/><circle cx="78" cy="54" r="1.8" fill="#14235B"/><path d="M72 60q3 3 6 0" fill="none" stroke="#14235B" stroke-width="1.6" stroke-linecap="round"/></g>',
    sky() + '<path d="M0 14h100" stroke="#8A5A2B" stroke-width="7"/><path d="M50 16v18" stroke="#8A5A2B" stroke-width="2"/><path d="M50 32q-16 6-14 26t14 24q14-4 14-24T50 32Z" fill="#9BCB6A" stroke="#6FA84A" stroke-width="2.4"/><path d="M40 48q10 4 20 0M39 60q11 4 22 0M42 72q8 4 16 0" fill="none" stroke="#6FA84A" stroke-width="1.8"/>',
    sky() + grass(76) + A('butterfly', 24, 14, 52) + A('flower', 62, 58, 28, false, '#FF7EA8') + A('flower', 8, 62, 26, false, '#FFC21A')
  ] }
];

let used = [];

Kids.css(`
.g-memoria-x8{gap:.9rem}
.g-memoria-x8 .os-row{display:grid;gap:.9rem;width:min(100%,46rem);justify-content:center}
.g-memoria-x8 .os-slot{aspect-ratio:1;border:.25rem dashed #9CB5E8;border-radius:1.4rem;background:rgba(255,255,255,.7);position:relative;display:flex;align-items:center;justify-content:center;transition:all .15s;padding:0;min-width:0}
.g-memoria-x8 .os-slot .n{font-family:'Baloo 2',sans-serif;font-size:3.4rem;color:#B9C8EA;line-height:1}
.g-memoria-x8 .os-slot.hot,.g-memoria-x8 .os-slot.want{background:#FFF3BF;border-color:var(--yellow)}
.g-memoria-x8 .os-slot.want{animation:pulse 1s infinite}
.g-memoria-x8 .os-slot.filled{border-style:solid;border-color:var(--g);background:#fff}
.g-memoria-x8 .os-slot.okk{border-color:var(--green);background:#E8F9EC}
.g-memoria-x8 .os-slot .bdg{position:absolute;left:-.5rem;top:-.6rem;width:2rem;height:2rem;border-radius:50%;background:var(--g);color:#fff;font-family:'Baloo 2',sans-serif;font-size:1.3rem;display:flex;align-items:center;justify-content:center;z-index:3;box-shadow:0 .15rem 0 var(--gd)}
.g-memoria-x8 .os-p{aspect-ratio:1;width:100%;border-radius:1.2rem;overflow:hidden;background:#fff;border:.22rem solid var(--line);box-shadow:0 .3rem 0 var(--line);padding:0;position:relative;display:block;min-width:0}
.g-memoria-x8 .os-slot .os-p{position:absolute;inset:-.25rem;width:auto;aspect-ratio:auto;border-color:var(--g)}
.g-memoria-x8 .os-p svg{width:100%;height:100%}
.g-memoria-x8 .os-p.sel{border-color:var(--blue);box-shadow:0 .4rem 0 var(--blue);transform:translateY(-.3rem) scale(1.04)}
.g-memoria-x8 .os-p.lbl{border-radius:1.2rem 1.2rem 0 0}
.g-memoria-x8 .os-opt{display:flex;flex-direction:column;gap:.3rem;align-items:center;font-family:'Baloo 2',sans-serif;font-size:1.05rem;line-height:1.05;text-align:center}
.g-memoria-x8 .os-opt.right .os-p{border-color:var(--green)}
.g-memoria-x8 .os-opt.bad .os-p{border-color:#F26B6B}
.g-memoria-x8 .os-hint{min-height:1.5rem;font-family:'Baloo 2',sans-serif;color:var(--ink2);font-size:1.15rem;text-align:center}
.g-memoria-x8 .os-pool{min-height:5rem}
@media (max-width:640px){.g-memoria-x8 .os-row{gap:.45rem}.g-memoria-x8 .os-slot .n{font-size:2rem}.g-memoria-x8 .os-slot{border-width:.18rem}}
`);

Kids.game({
  id: 'memoria-x8', group: 'memoria', num: 12,
  title: 'Ordena la historia',
  blurb: 'Mira los dibujos y ponlos en orden: ¿qué pasó primero?',
  how: 'Toca un dibujo y luego toca el hueco donde va, o arrástralo. Pon los dibujos en el orden en que pasó la historia: primero, después y al final.',
  icon: 'book',
  levels: ['3 dibujos', '4 dibujos', '4 dibujos y preguntas'],
  rounds: 3,
  stars(m) { return m <= 2 ? 3 : m <= 5 ? 2 : 1; },
  round(g, ri) {
    if (ri === 0) used = [];
    const lv = g.level, N = lv === 1 ? 3 : 4;
    let pool = STORIES.map((s, i) => i).filter(i => !used.includes(i));
    if (lv === 3) { const h = pool.filter(i => STORIES[i].hard); if (h.length) pool = h; }
    if (lv === 1) { const e = pool.filter(i => !STORIES[i].hard); if (e.length) pool = e; }
    const si = U.pick(pool); used.push(si);
    const S = STORIES[si];
    let idx = U.range(4);
    if (N === 3) idx = U.shuffle(idx).slice(0, 3).sort((a, b) => a - b);
    // panel k = k-ésima viñeta de la partida (0..N-1)
    const pan = idx.map((o, k) => ({ k, svg: S.panels[o], cap: S.caps[o] }));
    let order; do { order = U.shuffle(U.range(N)); } while (order.every((x, i) => x === i));
    const placed = Array(N).fill(-1), sel = { k: -1 };
    g.ask(lv === 3 ? 'Pon la historia en orden: ' + S.t : '¿Qué pasó primero? Ordena la historia');
    const wrap = U.el('<div style="display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%"></div>');
    const slotsRow = U.el('<div class="os-row"></div>'), poolRow = U.el('<div class="os-row os-pool"></div>'), hint = U.el('<div class="os-hint"></div>');
    [slotsRow, poolRow].forEach(r => r.style.gridTemplateColumns = `repeat(${N},minmax(0,1fr))`);
    wrap.append(slotsRow, hint, poolRow); g.area.appendChild(wrap);
    let busy = false;
    const slotEls = [];
    function pnl(k) {
      const b = U.el(`<button class="os-p" data-k="${k}" aria-label="Dibujo: ${U.esc(pan[k].cap)}"><svg viewBox="0 0 100 100">${pan[k].svg}</svg></button>`);
      return b;
    }
    function render() {
      slotsRow.innerHTML = ''; poolRow.innerHTML = ''; slotEls.length = 0;
      for (let s = 0; s < N; s++) {
        const el = U.el(`<div class="os-slot ${placed[s] >= 0 ? 'filled' : ''} ${sel.k >= 0 && placed[s] < 0 ? 'want' : ''}" role="button" tabindex="0" aria-label="Hueco ${s + 1}"><span class="n">${s + 1}</span></div>`);
        if (placed[s] >= 0) {
          el.querySelector('.n').remove(); const k = placed[s]; const p = pnl(k);
          el.appendChild(p); el.insertAdjacentHTML('beforeend', `<span class="bdg">${s + 1}</span>`);
          if (el.dataset.ok) el.classList.add('okk');
          Kids.drag(p, { targets: () => slotEls, onDrop: (t) => { if (busy) return false; const to = slotEls.indexOf(t); if (to === s) return false; moveTo(k, to); return true; }, onTap: () => { if (busy) return; if (sel.k >= 0) place(sel.k, s); else unplace(s); } });
        } else el.onclick = () => { if (busy) return; if (sel.k >= 0) place(sel.k, s); };
        slotsRow.appendChild(el); slotEls.push(el);
      }
      order.forEach(k => {
        if (placed.includes(k)) { poolRow.appendChild(U.el('<div style="aspect-ratio:1"></div>')); return; }
        const p = pnl(k); if (sel.k === k) p.classList.add('sel');
        Kids.drag(p, { targets: () => slotEls, onDrop: (t) => { if (busy) return false; place(k, slotEls.indexOf(t)); return true; }, onTap: () => { if (busy) return; sel.k = sel.k === k ? -1 : k; Kids.sound.pop(); render(); } });
        poolRow.appendChild(p);
      });
      hint.textContent = sel.k >= 0 ? 'Ahora toca el hueco donde va' : (placed.includes(-1) ? 'Toca un dibujo y luego un hueco' : '');
    }
    function place(k, s) {
      const old = placed[s]; const from = placed.indexOf(k);
      if (from >= 0) placed[from] = old; // intercambio
      placed[s] = k; sel.k = -1; Kids.sound.tap(); render(); check();
    }
    function moveTo(k, to) { place(k, to); }
    function unplace(s) { placed[s] = -1; Kids.sound.tap(); render(); }
    function check() {
      if (placed.includes(-1)) return;
      busy = true;
      const good = placed.map((k, s) => k === s);
      if (good.every(Boolean)) {
        slotEls.forEach(e => e.classList.add('okk'));
        if (lv === 3) g.t(phase2, 900); else { g.say('¡Muy bien! Así pasó: ' + pan.map(p => p.cap).join(', ')); g.right(); }
      } else {
        slotEls.forEach((e, s) => { if (!good[s]) g.shake(e); else e.classList.add('okk'); });
        g.wrong('Casi. Fíjate qué pasa primero');
        g.t(() => { placed.forEach((k, s) => { if (k !== s) placed[s] = -1; }); busy = false; render(); slotEls.forEach((e, s) => { if (placed[s] === s) e.classList.add('okk'); }); if (pendingHelp) { pendingHelp = false; doHelp(); } }, 900);
      }
    }
    function phase2() {
      busy = true; g.area.innerHTML = ''; g.roundMistakes = 0;
      const j = U.rnd(0, N - 2);
      g.ask('¿Qué pasó después de «' + pan[j].cap + '»?');
      const w = U.el('<div style="display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%"></div>');
      const row = U.el('<div class="os-row"></div>'); row.style.gridTemplateColumns = `repeat(${N - 1},minmax(0,1fr))`;
      U.shuffle(pan.filter(p => p.k !== j)).forEach(p => {
        const o = U.el(`<div class="os-opt"></div>`), b = pnl(p.k); b.classList.add('lbl');
        o.append(b, U.el(`<span>${U.esc(p.cap)}</span>`)); row.appendChild(o);
        b.onclick = () => {
          if (p.k === j + 1) { o.classList.add('right'); g.right(); } else { o.classList.add('bad'); g.shake(o); g.wrong(); }
        };
      });
      w.appendChild(row); g.area.appendChild(w);
      g.helpHint = () => { const r = [...row.children][[...row.children].findIndex((o, i) => o.querySelector('span').textContent === pan[j + 1].cap)]; if (r) { r.firstChild.classList.add('sel'); } };
    }
    let pendingHelp = false;
    function doHelp() {
      const s = placed.findIndex((k, i) => k !== i); if (s < 0) return;
      const k = s, from = placed.indexOf(k); if (from >= 0) placed[from] = placed[s];
      placed[s] = k; sel.k = -1; render(); g.toast('Te ayudo: he puesto uno bien'); check();
    }
    g.helpHint = () => { if (busy) pendingHelp = true; else doHelp(); };
    render();
  }
});
})();
