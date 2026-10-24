/* mundo-x20 — Dinosaurios: verdad o mentira */
(function () {
'use strict';
const U = Kids.util;
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const shadow = '<ellipse cx="50" cy="91" rx="38" ry="4.5" fill="#14235B" opacity=".10"/>';
const eye = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + r * .2}" cy="${y + r * .1}" r="${r * .56}" fill="#14235B"/><circle cx="${x + r * .45}" cy="${y - r * .25}" r="${r * .22}" fill="#fff"/>`;
const blush = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="2.2" fill="#FF8FA3" opacity=".6"/>`;

Kids.art.add({
  'wx20-trex': V(`${shadow}
    <path d="M32 54 Q10 54 4 72 Q20 68 34 72Z" fill="#F29A52"/>
    <path d="M34 68 q-6 12 -2 22 h16 q2 -10 -2 -22z" fill="#E98A3F"/><path d="M52 68 q-4 12 0 22 h16 q2 -10 -4 -22z" fill="#F29A52"/>
    <path d="M30 89h18M52 89h18" stroke="#fff" stroke-width="0" /><g fill="#FFF1D6"><path d="M34 90l3-4 3 4zM40 90l3-4 3 4zM56 90l3-4 3 4zM62 90l3-4 3 4z"/></g>
    <ellipse cx="46" cy="58" rx="27" ry="21" fill="#F29A52"/><path d="M26 64 Q46 86 68 66 Q48 74 26 64Z" fill="#FFD9A8"/>
    <g fill="#E07B2E" opacity=".7"><circle cx="34" cy="46" r="3.4"/><circle cx="46" cy="42" r="3"/><circle cx="26" cy="56" r="2.6"/><circle cx="56" cy="46" r="2.4"/></g>
    <path d="M54 24 Q58 12 76 12 Q95 12 95 30 Q95 46 80 47 L62 47 Q52 42 54 24Z" fill="#F29A52"/>
    <path d="M62 40 Q80 50 95 36" fill="none" stroke="#B5531C" stroke-width="2.4" stroke-linecap="round"/><g fill="#fff" stroke="#E0E0E0" stroke-width=".6"><path d="M72 42l2.4 5 2.4-4.4zM80 44l2.4 5 2.4-5zM88 41l2.2 5 2.4-5z"/></g>
    ${eye(72, 26, 6)}${blush(66, 36)}<circle cx="90" cy="24" r="1.6" fill="#B5531C"/>
    <path d="M62 56 q9 -1 11 6" stroke="#E98A3F" stroke-width="4.4" stroke-linecap="round" fill="none"/><path d="M72 62l2 3M74 60l3 2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`),
  'wx20-tri': V(`${shadow}
    <path d="M30 60 Q12 58 6 70 Q20 72 30 74Z" fill="#4FA8BE"/>
    <rect x="26" y="68" width="13" height="22" rx="6" fill="#4FA8BE"/><rect x="42" y="70" width="13" height="20" rx="6" fill="#5BB5C9"/><rect x="50" y="68" width="13" height="22" rx="6" fill="#4FA8BE"/>
    <ellipse cx="46" cy="58" rx="28" ry="20" fill="#5BB5C9"/><path d="M24 66 Q46 84 68 66 Q46 72 24 66Z" fill="#CFEFF5"/>
    <g fill="#3E93A8" opacity=".6"><circle cx="34" cy="48" r="3"/><circle cx="46" cy="44" r="3"/><circle cx="26" cy="58" r="2.4"/></g>
    <circle cx="70" cy="40" r="26" fill="#F4A261"/><g fill="#FFD166"><circle cx="70" cy="14" r="4.4"/><circle cx="84" cy="18" r="4.4"/><circle cx="92" cy="30" r="4.4"/><circle cx="94" cy="44" r="4.4"/><circle cx="56" cy="14" r="4.4"/><circle cx="46" cy="24" r="4.4"/><circle cx="44" cy="38" r="4.4"/></g><circle cx="70" cy="40" r="19" fill="#F7B982"/>
    <ellipse cx="76" cy="52" rx="19" ry="14" fill="#5BB5C9"/><path d="M82 60 Q92 62 96 56 Q96 66 86 68Z" fill="#F2D18C"/>
    <path d="M74 38 L86 12" stroke="#FFF7E6" stroke-width="6.4" stroke-linecap="round"/><path d="M84 40 L98 22" stroke="#FFF7E6" stroke-width="6" stroke-linecap="round"/><path d="M90 52 L98 44" stroke="#FFF7E6" stroke-width="5" stroke-linecap="round"/>
    ${eye(76, 47, 5.4)}${blush(70, 57)}<path d="M80 60 Q86 64 90 60" fill="none" stroke="#14235B" stroke-width="2" stroke-linecap="round"/>`),
  'wx20-steg': V(`${shadow}
    <path d="M24 56 Q8 56 4 70 Q8 74 22 70Z" fill="#6DBE5C"/><g fill="#E8452C"><path d="M6 66l-4-6 7 3zM12 62l-3-8 7 5z"/></g>
    <rect x="28" y="68" width="12" height="22" rx="6" fill="#5CAE4C"/><rect x="58" y="68" width="12" height="22" rx="6" fill="#5CAE4C"/><rect x="38" y="70" width="12" height="20" rx="6" fill="#6DBE5C"/><rect x="66" y="70" width="12" height="20" rx="6" fill="#6DBE5C"/>
    <path d="M18 66 Q22 36 52 34 Q82 34 86 62 Q70 74 52 74 Q30 74 18 66Z" fill="#7BCB68"/><path d="M26 70 Q52 82 80 66 Q52 74 26 70Z" fill="#D5F2C2"/>
    <g fill="#FF9F43" stroke="#E8801F" stroke-width="1.4" stroke-linejoin="round"><path d="M24 50 L26 30 L36 42Z"/><path d="M36 42 L40 20 L50 36Z"/><path d="M50 36 L56 14 L64 34Z"/><path d="M64 34 L72 18 L78 40Z"/><path d="M78 40 L84 28 L86 50Z"/></g>
    <path d="M78 54 Q82 46 92 50 Q98 56 92 64 Q84 68 76 64Z" fill="#7BCB68"/>
    ${eye(86, 54, 4.6)}${blush(82, 62)}<path d="M86 63 Q91 66 94 62" fill="none" stroke="#14235B" stroke-width="1.8" stroke-linecap="round"/>`),
  'wx20-diplo': V(`${shadow}
    <path d="M30 70 Q12 74 2 86 Q18 82 34 80Z" fill="#B49BEA"/>
    <rect x="22" y="68" width="11" height="22" rx="5.5" fill="#9F85DD"/><rect x="56" y="68" width="11" height="22" rx="5.5" fill="#9F85DD"/><rect x="32" y="70" width="11" height="20" rx="5.5" fill="#B49BEA"/><rect x="66" y="70" width="11" height="20" rx="5.5" fill="#B49BEA"/>
    <path d="M60 64 Q74 58 76 40 Q78 24 80 22 L90 24 Q86 32 88 44 Q88 66 68 76Z" fill="#B49BEA"/>
    <ellipse cx="42" cy="66" rx="28" ry="15" fill="#B49BEA"/><path d="M20 72 Q42 84 64 70 Q42 76 20 72Z" fill="#E6DCFB"/>
    <g fill="#8E72D2" opacity=".6"><circle cx="34" cy="60" r="3"/><circle cx="46" cy="58" r="3"/><circle cx="56" cy="64" r="2.4"/></g>
    <ellipse cx="86" cy="18" rx="10" ry="8" fill="#B49BEA"/>${eye(88, 16, 3.6)}${blush(86, 22)}<path d="M88 22 Q92 24 94 21" fill="none" stroke="#14235B" stroke-width="1.6" stroke-linecap="round"/>`),
  'wx20-brachio': V(`${shadow}
    <path d="M26 70 Q12 72 6 82 Q20 80 30 78Z" fill="#F0B552"/>
    <rect x="20" y="70" width="11" height="20" rx="5.5" fill="#E0A03C"/><rect x="48" y="66" width="12" height="24" rx="6" fill="#E0A03C"/><rect x="30" y="72" width="11" height="18" rx="5.5" fill="#F0B552"/><rect x="58" y="68" width="12" height="22" rx="6" fill="#F0B552"/>
    <path d="M58 62 Q70 56 70 38 L70 14 Q70 6 78 6 Q88 6 88 14 L82 20 L82 40 Q84 66 66 76Z" fill="#F0B552"/>
    <ellipse cx="38" cy="66" rx="28" ry="15" fill="#F0B552"/><path d="M16 72 Q38 84 62 70 Q38 76 16 72Z" fill="#FFE7B3"/>
    <g fill="#D78C27" opacity=".6"><circle cx="30" cy="60" r="3"/><circle cx="42" cy="58" r="3"/><circle cx="52" cy="62" r="2.4"/></g>
    <ellipse cx="82" cy="10" rx="11" ry="7.4" fill="#F0B552"/>${eye(84, 8, 3.4)}${blush(80, 13)}<path d="M84 13 Q88 15 91 12" fill="none" stroke="#14235B" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M22 28 q8 -10 18 -2 q-4 10 -18 2z" fill="#6DBE5C"/><path d="M8 20 q8 -10 18 -2" fill="none" stroke="#6DBE5C" stroke-width="0"/><path d="M40 16 q6 -8 14 -2 q-4 8 -14 2z" fill="#8ED87A"/>`),
  'wx20-ptero': V(`
    <g fill="#fff"><ellipse cx="18" cy="84" rx="14" ry="5"/><ellipse cx="30" cy="80" rx="9" ry="5"/><ellipse cx="82" cy="88" rx="12" ry="4"/></g>
    <path d="M46 52 Q26 22 4 30 Q10 40 14 44 Q20 38 26 46 Q32 40 38 50Z" fill="#F58A78"/><path d="M54 52 Q74 20 96 26 Q90 38 86 42 Q80 36 74 44 Q68 38 62 50Z" fill="#F7A494"/>
    <path d="M46 52 Q26 22 4 30M54 52 Q74 20 96 26" fill="none" stroke="#D96A57" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M44 58 Q40 78 46 84 L56 84 Q58 76 56 60Z" fill="#F58A78"/><path d="M44 80 q-6 6 -10 4M54 82 q8 4 12 0" fill="none" stroke="#D96A57" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="50" cy="56" rx="12" ry="14" fill="#F58A78"/><ellipse cx="50" cy="62" rx="7" ry="8" fill="#FFD9CF"/>
    <path d="M44 46 Q44 32 52 28 L58 30 L58 44Z" fill="#F58A78"/><path d="M50 30 L74 40 Q56 44 52 40Z" fill="#F7A494"/><path d="M52 30 L36 22 L46 36Z" fill="#F7C34A"/>
    ${eye(52, 36, 3.8)}<path d="M56 40 Q64 42 70 40" fill="none" stroke="#B5473A" stroke-width="1.6" stroke-linecap="round"/>`),
  'wx20-comps': V(`${shadow}
    <path d="M38 58 Q14 54 4 70 Q22 66 40 70Z" fill="#9BD65A"/>
    <path d="M44 66 L40 90 h12 L54 70Z" fill="#8AC84A"/><path d="M58 66 L56 90 h12 L68 70Z" fill="#9BD65A"/>
    <ellipse cx="54" cy="56" rx="22" ry="16" fill="#9BD65A"/><path d="M36 62 Q54 78 72 62 Q54 68 36 62Z" fill="#E4F6C4"/>
    <path d="M66 50 Q74 30 76 24" stroke="#9BD65A" stroke-width="12" stroke-linecap="round" fill="none"/>
    <ellipse cx="80" cy="22" rx="12" ry="9" fill="#9BD65A"/>${eye(82, 20, 4)}${blush(78, 27)}<path d="M80 27 Q86 29 90 25" fill="none" stroke="#14235B" stroke-width="1.6" stroke-linecap="round"/>
    <g fill="none" stroke="#F2A93B" stroke-width="2.4" stroke-linecap="round"><path d="M36 48 q-4 -6 -10 -4M42 44 q-3 -8 -10 -8M24 56 q-8 -2 -12 4"/></g>
    <path d="M60 60 q6 0 8 5" stroke="#8AC84A" stroke-width="3.6" stroke-linecap="round" fill="none"/>`),
  'wx20-egg': V(`${shadow}
    <path d="M10 82 Q50 96 90 82 Q86 68 50 68 Q14 68 10 82Z" fill="#E3B766"/><g stroke="#C9953E" stroke-width="1.6" stroke-linecap="round"><path d="M18 80 l10 -6M40 86 l8 -8M62 86 l-8 -8M82 80 l-10 -6"/></g>
    <path d="M50 8 C 28 8, 22 42, 24 56 C 26 74, 40 80, 50 80 C 60 80, 74 74, 76 56 C 78 42, 72 8, 50 8Z" fill="#C8EAB0" stroke="#8EC96F" stroke-width="2.4"/>
    <g fill="#8EC96F"><circle cx="40" cy="34" r="4.4"/><circle cx="58" cy="26" r="3.4"/><circle cx="62" cy="48" r="5"/><circle cx="40" cy="58" r="4.4"/><circle cx="52" cy="66" r="3"/></g><ellipse cx="38" cy="22" rx="5" ry="9" fill="#fff" opacity=".6" transform="rotate(14 38 22)"/>`)
});

const D = {
  trex: { n: 'T-rex', art: 'wx20-trex' }, tri: { n: 'Triceratops', art: 'wx20-tri' }, steg: { n: 'Estegosaurio', art: 'wx20-steg' },
  diplo: { n: 'Diplodocus', art: 'wx20-diplo' }, brachio: { n: 'Braquiosaurio', art: 'wx20-brachio' }, ptero: { n: 'Pterodáctilo', art: 'wx20-ptero' },
  comps: { n: 'Compsognato', art: 'wx20-comps' }, egg: { n: 'Huevo de dinosaurio', art: 'wx20-egg' }
};
/* v: true=verdad. lv 1 = fácil, 2 = más sutil. art = dibujo (nivel 1) */
const BANK = [
  { s: 'El T-rex comía carne.', v: 1, lv: 1, art: 'trex', e: '¡Sí! El T-rex era carnívoro y tenía dientes enormes.' },
  { s: 'El T-rex era un dinosaurio que solo comía plantas.', v: 0, lv: 1, art: 'trex', e: 'Era mentira. El T-rex comía carne, no plantas.' },
  { s: 'El T-rex tenía los brazos muy pequeñitos.', v: 1, lv: 1, art: 'trex', e: '¡Verdad! Sus brazos eran cortitos, pero su boca era enorme.' },
  { s: 'El T-rex tenía dientes grandes y afilados.', v: 1, lv: 1, art: 'trex', e: '¡Verdad! Con esos dientes mordía a su comida.' },
  { s: 'Los dinosaurios vivían con los humanos.', v: 0, lv: 1, art: 'tri', e: 'Era mentira. Los dinosaurios vivieron hace muchísimo tiempo, mucho antes de que hubiera personas.' },
  { s: 'El triceratops tenía tres cuernos.', v: 1, lv: 1, art: 'tri', e: '¡Verdad! Tenía dos cuernos largos y uno pequeño en la nariz. Por eso se llama triceratops.' },
  { s: 'El triceratops comía plantas.', v: 1, lv: 1, art: 'tri', e: '¡Verdad! El triceratops era herbívoro.' },
  { s: 'El triceratops tenía un gran escudo de hueso detrás de la cabeza.', v: 1, lv: 1, art: 'tri', e: '¡Verdad! Ese escudo se llama gorguera y protegía su cuello.' },
  { s: 'Todos los dinosaurios tenían cuernos.', v: 0, lv: 1, art: 'tri', e: 'Era mentira. Solo algunos dinosaurios, como el triceratops, tenían cuernos.' },
  { s: 'Todos los dinosaurios comían carne.', v: 0, lv: 1, art: 'diplo', e: 'Era mentira. Muchos dinosaurios, como el diplodocus, comían solo plantas.' },
  { s: 'Los dinosaurios ponían huevos.', v: 1, lv: 1, art: 'egg', e: '¡Verdad! Los dinosaurios nacían de huevos, como los pollitos.' },
  { s: 'El estegosaurio tenía placas en la espalda.', v: 1, lv: 1, art: 'steg', e: '¡Verdad! Tenía grandes placas en la espalda y púas en la cola.' },
  { s: 'El estegosaurio tenía alas y podía volar.', v: 0, lv: 1, art: 'steg', e: 'Era mentira. El estegosaurio caminaba por el suelo y no tenía alas.' },
  { s: 'El estegosaurio tenía púas en la cola.', v: 1, lv: 1, art: 'steg', e: '¡Verdad! Con las púas de la cola se defendía.' },
  { s: 'El diplodocus era muy pequeño.', v: 0, lv: 1, art: 'diplo', e: 'Era mentira. El diplodocus era larguísimo, uno de los dinosaurios más largos.' },
  { s: 'El diplodocus tenía el cuello muy largo.', v: 1, lv: 1, art: 'diplo', e: '¡Verdad! Con su cuello largo llegaba a las hojas de los árboles.' },
  { s: 'El braquiosaurio comía hojas de los árboles altos.', v: 1, lv: 1, art: 'brachio', e: '¡Verdad! Con su cuello tan largo llegaba muy arriba.' },
  { s: 'El braquiosaurio tenía el cuello cortito.', v: 0, lv: 1, art: 'brachio', e: 'Era mentira. El braquiosaurio tenía un cuello larguísimo.' },
  { s: 'El pterodáctilo podía volar.', v: 1, lv: 1, art: 'ptero', e: '¡Verdad! Tenía alas de piel y volaba por el cielo.' },
  { s: 'El pterodáctilo vivía debajo de la tierra, como un topo.', v: 0, lv: 1, art: 'ptero', e: 'Era mentira. El pterodáctilo volaba por el cielo.' },
  { s: 'Algunos dinosaurios tenían plumas.', v: 1, lv: 1, art: 'comps', e: '¡Verdad! Los científicos han encontrado dinosaurios con plumas.' },
  { s: 'Todos los dinosaurios eran del mismo tamaño.', v: 0, lv: 1, art: 'comps', e: 'Era mentira. Algunos eran enormes y otros muy pequeñitos.' },
  { s: 'Hoy ya no viven dinosaurios gigantes como el T-rex.', v: 1, lv: 1, art: 'trex', e: '¡Verdad! Desaparecieron hace muchísimos años.' },
  /* más sutiles (nivel 3) */
  { s: 'Los dinosaurios eran reptiles.', v: 1, lv: 2, e: '¡Verdad! Los dinosaurios eran reptiles, como los lagartos y los cocodrilos.' },
  { s: 'Los fósiles son huesos y huellas muy antiguos que quedaron en la roca.', v: 1, lv: 2, e: '¡Verdad! Gracias a los fósiles sabemos cómo eran los dinosaurios.' },
  { s: 'Los paleontólogos son los científicos que estudian los fósiles de los dinosaurios.', v: 1, lv: 2, e: '¡Verdad! Los paleontólogos buscan y estudian los fósiles.' },
  { s: 'Todos los dinosaurios vivían en el mar.', v: 0, lv: 2, e: 'Era mentira. Los dinosaurios vivían en la tierra. En el mar vivían otros reptiles.' },
  { s: 'Los bebés dinosaurio nacían de la barriga de su mamá.', v: 0, lv: 2, e: 'Era mentira. Los dinosaurios nacían de huevos.' },
  { s: 'Algunos dinosaurios cuidaban sus huevos en nidos.', v: 1, lv: 2, e: '¡Verdad! Algunos hacían nidos y cuidaban de sus huevos.' },
  { s: 'El pterodáctilo era un dinosaurio.', v: 0, lv: 2, e: 'Era mentira. Era un reptil volador, pariente de los dinosaurios, pero no era un dinosaurio.' },
  { s: 'Algunos dinosaurios eran del tamaño de una gallina.', v: 1, lv: 2, e: '¡Verdad! Había dinosaurios pequeñitos, como el compsognato.' },
  { s: 'Las aves de hoy son parientes de los dinosaurios.', v: 1, lv: 2, e: '¡Verdad! Los científicos piensan que las aves vienen de dinosaurios con plumas.' },
  { s: 'Un asteroide enorme chocó con la Tierra y ayudó a que los dinosaurios gigantes desaparecieran.', v: 1, lv: 2, e: '¡Verdad! Eso pasó hace muchísimos años.' },
  { s: 'El braquiosaurio era más alto que una jirafa.', v: 1, lv: 2, e: '¡Verdad! Era altísimo, mucho más que una jirafa.' },
  { s: 'El T-rex era más pequeño que un gato.', v: 0, lv: 2, e: 'Era mentira. El T-rex era enorme, ¡tan largo como un autobús!' },
  { s: 'Los dinosaurios que comían plantas se llaman herbívoros.', v: 1, lv: 2, e: '¡Verdad! Y los que comían carne se llaman carnívoros.' }
];
const SIZES = [
  { q: '¿Cuál era el más grande?', pool: ['brachio', 'trex', 'comps'], a: 'brachio', e: '¡Sí! El braquiosaurio era altísimo, como un edificio de cuatro pisos.' },
  { q: '¿Cuál era el más grande?', pool: ['diplo', 'tri', 'steg'], a: 'diplo', e: '¡Sí! El diplodocus era larguísimo, casi como dos autobuses.' },
  { q: '¿Cuál era el más pequeño?', pool: ['comps', 'trex', 'tri'], a: 'comps', e: '¡Sí! El compsognato era pequeñito, como una gallina.' },
  { q: '¿Cuál era el más pequeño?', pool: ['comps', 'steg', 'brachio'], a: 'comps', e: '¡Sí! El compsognato era el más chiquitín.' },
  { q: '¿Cuál era el más largo?', pool: ['diplo', 'trex', 'tri'], a: 'diplo', e: '¡Sí! El diplodocus era uno de los dinosaurios más largos de todos.' },
  { q: '¿Cuál era el más alto?', pool: ['brachio', 'steg', 'tri'], a: 'brachio', e: '¡Sí! Con su cuello largo, el braquiosaurio llegaba altísimo.' }
];

const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
Kids.css(`
.g-mundo-x20{gap:.8rem}
.g-mundo-x20 .x20-card{background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line);padding:.8rem 1.2rem;display:flex;align-items:center;gap:1rem;width:min(100%,46rem);justify-content:center}
.g-mundo-x20 .x20-card .dino{width:clamp(6rem,24vmin,12rem);flex:none}
.g-mundo-x20 .x20-card .dino svg{width:100%;aspect-ratio:1;display:block}
.g-mundo-x20 .x20-card .st{font-family:'Baloo 2';font-weight:800;font-size:clamp(1.3rem,4.4vmin,2.3rem);line-height:1.2;color:var(--ink);text-align:left}
.g-mundo-x20 .x20-card.noart .st{text-align:center;font-size:clamp(1.5rem,5vmin,2.6rem)}
.g-mundo-x20 .x20-vm{display:flex;gap:1.2rem;flex-wrap:wrap;justify-content:center;width:100%}
.g-mundo-x20 .x20-b{min-width:min(44vw,15rem);min-height:5.2rem;border-radius:1.6rem;font-family:'Baloo 2';font-weight:800;font-size:clamp(1.3rem,4vmin,2rem);color:#fff;display:inline-flex;align-items:center;justify-content:center;gap:.6rem;padding:.3rem 1.2rem;box-shadow:0 .4rem 0 rgba(20,35,91,.2);transition:transform .12s}
.g-mundo-x20 .x20-b svg{width:1.6em;height:1.6em;flex:none}
.g-mundo-x20 .x20-b.v{background:#3FB46A;box-shadow:0 .4rem 0 #2A8A4E}
.g-mundo-x20 .x20-b.m{background:#F0795F;box-shadow:0 .4rem 0 #C75A43}
.g-mundo-x20 .x20-b:active{transform:translateY(.2rem)}
.g-mundo-x20 .x20-b.bad{opacity:.45;animation:shake .4s}
.g-mundo-x20 .x20-b.right{animation:pop .5s;outline:.3rem solid var(--yellow)}
.g-mundo-x20 .x20-b[disabled]{pointer-events:none}
.g-mundo-x20 .x20-ex{background:#FFF3BF;border-radius:1.4rem;padding:.6rem 1.2rem;font-family:'Baloo 2';font-weight:700;font-size:clamp(1.05rem,3vmin,1.5rem);line-height:1.25;width:min(100%,46rem);text-align:center;animation:pop .4s}
.g-mundo-x20 .x20-opts .pic{width:clamp(6rem,21vmin,11rem);cursor:pointer}
.g-mundo-x20 .x20-opts .pic svg{max-width:100%;aspect-ratio:1;height:auto}
.g-mundo-x20 .x20-opts .pic .lbl{font-size:clamp(.85rem,2.5vmin,1.2rem);text-align:center}
@media (max-width:560px){.g-mundo-x20 .x20-card{flex-direction:column;gap:.4rem}.g-mundo-x20 .x20-card .st{text-align:center}}
`);

let deck = [], sizeIdx = [];
function readTime(t) { return Math.min(5200, 900 + t.length * 52); }
Kids.game({
  id: 'mundo-x20', group: 'mundo', num: 23,
  title: 'Dinosaurios: verdad o mentira',
  blurb: 'Lee la frase sobre los dinosaurios y di si es verdad o mentira.',
  how: 'Escucha la frase y toca ¡Es verdad! o ¡Es mentira!. Después te cuento la explicación.',
  icon: 'turtle',
  levels: ['Con dibujo', 'Sin dibujo', 'Frases difíciles y tamaños'],
  rounds: 8,
  round(g, i) {
    if (i === 0) {
      const mk = lv => { const all = BANK.filter(b => b.lv === lv), t = U.shuffle(all.filter(b => b.v)), f = U.shuffle(all.filter(b => !b.v)); return U.shuffle(t.slice(0, 4).concat(f.slice(0, 4))); };
      if (g.level === 1) deck = mk(1);
      else if (g.level === 2) deck = mk(1);
      else { const all = BANK.filter(b => b.lv === 2), t = U.shuffle(all.filter(b => b.v)), f = U.shuffle(all.filter(b => !b.v)); deck = U.shuffle(t.slice(0, 3).concat(f.slice(0, 3))); }
      sizeIdx = U.shuffle(SIZES.slice());
    }
    if (g.level === 3 && (i === 3 || i === 6)) return size(g);
    const it = deck.pop() || U.pick(BANK.filter(b => b.lv === (g.level === 3 ? 2 : 1)));
    statement(g, it);
  }
});

function statement(g, it) {
  g.ask('¿Verdad o mentira? ' + it.s);
  const art = g.level === 1 && it.art;
  const card = U.el(`<div class="x20-card ${art ? '' : 'noart'}">${art ? '<div class="dino" role="img" aria-label="' + U.esc(D[it.art].n) + '">' + Kids.art.get(D[it.art].art) + '</div>' : ''}<div class="st">${U.esc(it.s)}</div></div>`);
  g.area.appendChild(card);
  const row = U.el('<div class="x20-vm"></div>');
  const bv = U.el(`<button class="x20-b v" aria-label="¡Es verdad!">${CHECK}¡Es verdad!</button>`), bm = U.el(`<button class="x20-b m" aria-label="¡Es mentira!">${CROSS}¡Es mentira!</button>`);
  row.appendChild(bv); row.appendChild(bm); g.area.appendChild(row);
  const correctB = it.v ? bv : bm;
  [[bv, 1], [bm, 0]].forEach(p => p[0].onclick = () => {
    if (p[0].disabled) return;
    if (p[1] === it.v) {
      row.querySelectorAll('button').forEach(x => x.disabled = true); p[0].classList.add('right');
      g.area.appendChild(U.el(`<div class="x20-ex">${U.esc(it.e)}</div>`)); g.say(it.e); g.t(() => g.right(), readTime(it.e));
    } else { p[0].classList.add('bad'); p[0].disabled = true; g.wrong('Mmm, ¡piénsalo otra vez!'); }
  });
  g.helpHint = () => { correctB.style.animation = 'bounce .6s 5'; g.toast('Piensa con calma. ¡Tú puedes!'); g.say(it.s); };
}

function size(g) {
  const sz = sizeIdx.pop() || U.pick(SIZES);
  g.ask(sz.q);
  const box = U.el('<div class="opts x20-opts"></div>'); let right = null;
  U.shuffle(sz.pool).forEach(k => {
    const b = U.el(`<button class="pic" aria-label="${D[k].n}">${Kids.art.get(D[k].art)}<span class="lbl">${D[k].n}</span></button>`);
    if (k === sz.a) right = b;
    b.onclick = () => {
      if (b.disabled) return;
      if (k === sz.a) { box.querySelectorAll('button').forEach(x => x.disabled = true); b.classList.add('right'); g.area.appendChild(U.el(`<div class="x20-ex">${U.esc(sz.e)}</div>`)); g.say(sz.e); g.t(() => g.right(), readTime(sz.e)); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, casi. ¡Prueba otra vez!'); }
    };
    box.appendChild(b);
  });
  g.area.appendChild(box);
  g.helpHint = () => { right.style.animation = 'bounce .6s 5'; g.toast('Fíjate en sus nombres y piensa en su tamaño.'); };
}
})();
