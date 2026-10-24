/* memoria-x16 — Vista desde arriba: ¿cómo se ve desde arriba? */
(function () {
'use strict';
const K = window.Kids, U = K.util;
const S = (inner, vb) => `<svg viewBox="${vb || '0 0 100 100'}">${inner}</svg>`;
const G = (x, y, s, inner, rot) => `<g transform="translate(${x} ${y}) scale(${s})${rot ? ` rotate(${rot})` : ''}">${inner}</g>`;
const sh = (cx = 50, cy = 92, rx = 32) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#5b4a2e" opacity=".15"/>`;

/* ---------- objetos: [lado, arriba] en caja 100x100 ---------- */
const OB = {
  ball: {
    name: 'la pelota', why: 'Una pelota se ve redonda desde cualquier lado.',
    side: S(`${sh()}<circle cx="50" cy="52" r="38" fill="#C9E33B"/><path d="M16 36 Q36 54 18 74 M84 36 Q64 54 82 74" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M28 28 Q36 20 46 18" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>`),
    top:  S(`<circle cx="50" cy="50" r="38" fill="#C9E33B"/><path d="M30 14 Q52 34 70 14 M30 86 Q52 66 70 86" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="50" r="38" fill="none" stroke="#A9C21E" stroke-width="2.5" opacity=".6"/>`)
  },
  cup: {
    name: 'la taza', why: 'Desde arriba, la taza es un círculo con el asa a un lado.',
    side: S(`${sh()}<ellipse cx="46" cy="86" rx="38" ry="7" fill="#DDE8F5"/><path d="M62 42 Q86 40 84 58 Q82 74 60 72" fill="none" stroke="#FF7EA8" stroke-width="8" stroke-linecap="round"/><path d="M18 30 H72 L66 78 Q64 86 56 86 H34 Q26 86 24 78Z" fill="#FF7EA8"/><ellipse cx="45" cy="30" rx="27" ry="7" fill="#FFB3CC"/><ellipse cx="45" cy="31" rx="21" ry="4.5" fill="#7A4A2B"/><path d="M28 44 V68" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>`),
    top:  S(`<circle cx="46" cy="50" r="40" fill="#DDE8F5"/><rect x="62" y="42" width="30" height="16" rx="8" fill="#FF7EA8"/><circle cx="46" cy="50" r="28" fill="#FF7EA8"/><circle cx="46" cy="50" r="21" fill="#7A4A2B"/><path d="M34 42 Q40 34 50 34" fill="none" stroke="#B07A53" stroke-width="3" stroke-linecap="round"/>`)
  },
  tree: {
    name: 'el árbol', why: 'Desde arriba, un árbol es una gran copa verde y redonda.',
    side: S(`${sh()}<rect x="43" y="52" width="14" height="40" rx="4" fill="#A9703F"/><circle cx="50" cy="34" r="26" fill="#5CC77A"/><circle cx="30" cy="46" r="18" fill="#4DB86B"/><circle cx="70" cy="46" r="18" fill="#4DB86B"/><circle cx="42" cy="26" r="9" fill="#7BDB94" opacity=".7"/>`),
    top:  S(`<circle cx="50" cy="26" r="20" fill="#4DB86B"/><circle cx="76" cy="46" r="20" fill="#4DB86B"/><circle cx="68" cy="76" r="20" fill="#4DB86B"/><circle cx="34" cy="76" r="20" fill="#4DB86B"/><circle cx="24" cy="46" r="20" fill="#4DB86B"/><circle cx="50" cy="52" r="26" fill="#5CC77A"/><circle cx="42" cy="44" r="7" fill="#7BDB94"/><circle cx="62" cy="60" r="5" fill="#7BDB94"/><circle cx="50" cy="26" r="5" fill="#7BDB94" opacity=".7"/>`)
  },
  house: {
    name: 'la casa', why: 'Desde arriba se ve el tejado, con una línea en el medio donde se juntan las dos aguas.', rot: true,
    side: S(`${sh()}<rect x="18" y="48" width="64" height="44" rx="3" fill="#FFD98A"/><path d="M8 52 L50 12 L92 52Z" fill="#E8604C"/><path d="M50 12 L92 52 H80 L50 22Z" fill="#C94A38" opacity=".5"/><rect x="42" y="62" width="16" height="30" rx="5" fill="#8A5A33"/><rect x="24" y="58" width="13" height="13" rx="3" fill="#BFE6FB"/><rect x="63" y="58" width="13" height="13" rx="3" fill="#BFE6FB"/><circle cx="54" cy="78" r="1.8" fill="#FFD98A"/>`),
    top:  S(`<rect x="22" y="8" width="56" height="84" rx="6" fill="#E8604C"/><rect x="50" y="8" width="28" height="84" rx="6" fill="#C94A38"/><rect x="48" y="8" width="4" height="84" fill="#9E3526"/><g stroke="#fff" stroke-width="2" opacity=".35"><path d="M22 28H48M22 48H48M22 68H48M52 28H78M52 48H78M52 68H78"/></g><rect x="26" y="14" width="12" height="14" rx="2" fill="#8A6A5A"/>`),
    rotTop: true
  },
  parasol: {
    name: 'la sombrilla', why: 'Desde arriba, la sombrilla es un círculo con picos de colores que salen del centro.',
    side: S(`${sh()}<rect x="47" y="30" width="6" height="60" rx="3" fill="#A9703F"/><path d="M8 48 Q10 12 50 10 Q90 12 92 48 Q84 40 76 48 Q66 38 58 48 Q50 38 42 48 Q34 38 24 48 Q16 40 8 48Z" fill="#FF7E69"/><path d="M50 10 Q42 14 42 48 Q34 38 24 48 Q22 22 50 10Z" fill="#FFD23F"/><path d="M50 10 Q58 14 58 48 Q66 38 76 48 Q78 22 50 10Z" fill="#FFD23F"/><circle cx="50" cy="8" r="3" fill="#A9703F"/><ellipse cx="50" cy="91" rx="16" ry="3.5" fill="#C9B38A"/>`),
    top:  S(`<circle cx="50" cy="50" r="42" fill="#FF7E69"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const a = i * Math.PI / 4, b = a + Math.PI / 4; return i % 2 ? `<path d="M50 50 L${(50 + 42 * Math.cos(a)).toFixed(1)} ${(50 + 42 * Math.sin(a)).toFixed(1)} A42 42 0 0 1 ${(50 + 42 * Math.cos(b)).toFixed(1)} ${(50 + 42 * Math.sin(b)).toFixed(1)}Z" fill="#FFD23F"/>` : ''; }).join('')}<circle cx="50" cy="50" r="5" fill="#A9703F"/>`)
  },
  car: {
    name: 'el coche', why: 'Desde arriba, el coche es un rectángulo con el techo y las ventanas.', rot: true,
    side: S(`${sh(50, 90, 42)}<path d="M24 54 L32 33 Q34 28 40 28 H62 Q68 28 71 33 L80 54Z" fill="#4C9AF5"/><path d="M33 52 L38 35 H48 V52Z M52 52 V35 H62 Q65 35 67 39 L72 52Z" fill="#D6EEFF"/><rect x="6" y="50" width="88" height="30" rx="13" fill="#2F7FE0"/><rect x="86" y="58" width="9" height="9" rx="4" fill="#FFE066"/><circle cx="27" cy="80" r="11" fill="#3a3f52"/><circle cx="27" cy="80" r="5" fill="#dfe5ee"/><circle cx="73" cy="80" r="11" fill="#3a3f52"/><circle cx="73" cy="80" r="5" fill="#dfe5ee"/>`),
    top:  S(`<rect x="14" y="14" width="16" height="12" rx="4" fill="#3a3f52"/><rect x="62" y="14" width="16" height="12" rx="4" fill="#3a3f52"/><rect x="14" y="74" width="16" height="12" rx="4" fill="#3a3f52"/><rect x="62" y="74" width="16" height="12" rx="4" fill="#3a3f52"/><rect x="8" y="22" width="84" height="56" rx="18" fill="#2F7FE0"/><rect x="32" y="30" width="34" height="40" rx="8" fill="#4C9AF5"/><path d="M68 30 H72 L78 38 V62 L72 70 H68Z" fill="#D6EEFF"/><path d="M30 30 H26 L20 38 V62 L26 70 H30Z" fill="#D6EEFF"/><rect x="84" y="30" width="6" height="9" rx="3" fill="#FFE066"/><rect x="84" y="61" width="6" height="9" rx="3" fill="#FFE066"/>`),
    rotTop: true
  },
  bed: {
    name: 'la cama', why: 'Desde arriba, la cama es un rectángulo con la almohada en un extremo.', rot: true,
    side: S(`${sh(50, 90, 42)}<rect x="6" y="30" width="10" height="56" rx="4" fill="#A9703F"/><rect x="84" y="52" width="9" height="34" rx="4" fill="#A9703F"/><rect x="12" y="56" width="78" height="14" rx="5" fill="#8C7BE0"/><rect x="12" y="46" width="78" height="14" rx="6" fill="#B5A8F5"/><ellipse cx="29" cy="45" rx="14" ry="7" fill="#fff"/>`),
    top:  S(`<rect x="8" y="14" width="84" height="72" rx="8" fill="#A9703F"/><rect x="16" y="20" width="70" height="60" rx="6" fill="#B5A8F5"/><rect x="38" y="20" width="48" height="60" rx="6" fill="#8C7BE0"/><rect x="21" y="28" width="26" height="44" rx="10" fill="#fff"/><path d="M52 34 H80 M52 50 H80 M52 66 H80" stroke="#B5A8F5" stroke-width="3" stroke-linecap="round" opacity=".7"/>`),
    rotTop: true
  }
};
const LV1 = ['ball', 'cup', 'tree', 'house', 'parasol', 'car', 'bed'];

/* ---------- escenas de mesa (nivel 2) ---------- */
const TI = {
  plate: { name: 'el plato', side: x => `<ellipse cx="${x}" cy="64.5" rx="27" ry="4.2" fill="#fff" stroke="#9CC5EE" stroke-width="1.6"/><ellipse cx="${x}" cy="63.5" rx="15" ry="2" fill="#EAF4FF"/>`,
    top: (x, y) => `<circle cx="${x}" cy="${y}" r="25" fill="#fff" stroke="#9CC5EE" stroke-width="2"/><circle cx="${x}" cy="${y}" r="16" fill="#EAF4FF" stroke="#CFE6FB" stroke-width="2"/>` },
  cup: { name: 'la taza', side: x => `<path d="M${x + 8} 52 Q${x + 20} 52 ${x + 18} 58 Q${x + 16} 64 ${x + 8} 63" fill="none" stroke="#FF7EA8" stroke-width="3.4"/><path d="M${x - 10} 46 H${x + 10} L${x + 8} 64 Q${x + 7} 66 ${x + 4} 66 H${x - 4} Q${x - 7} 66 ${x - 8} 64Z" fill="#FF7EA8"/><ellipse cx="${x}" cy="46" rx="10" ry="2.6" fill="#7A4A2B"/>`,
    top: (x, y) => `<rect x="${x + 6}" y="${y - 3.5}" width="18" height="7" rx="3.5" fill="#FF7EA8"/><circle cx="${x}" cy="${y}" r="12" fill="#FF7EA8"/><circle cx="${x}" cy="${y}" r="8.5" fill="#7A4A2B"/>` },
  apple: { name: 'la manzana', side: x => `<circle cx="${x}" cy="55" r="11" fill="#F0453F"/><path d="M${x} 44 Q${x + 1} 40 ${x + 4} 38" stroke="#7A4A2B" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M${x + 1} 42 Q${x + 8} 37 ${x + 11} 41 Q${x + 6} 45 ${x + 1} 42Z" fill="#5CC77A"/><path d="M${x - 7} 50 Q${x - 5} 47 ${x - 2} 46" stroke="#fff" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`,
    top: (x, y) => `<circle cx="${x}" cy="${y}" r="12" fill="#F0453F"/><circle cx="${x}" cy="${y}" r="3" fill="#B52A25"/><path d="M${x} ${y} Q${x + 3} ${y - 9} ${x + 9} ${y - 10} Q${x + 8} ${y - 3} ${x} ${y}Z" fill="#5CC77A"/>` },
  bowl: { name: 'el cuenco', side: x => `<path d="M${x - 18} 52 H${x + 18} Q${x + 17} 66 ${x} 66 Q${x - 17} 66 ${x - 18} 52Z" fill="#FFB347"/><ellipse cx="${x}" cy="52" rx="18" ry="3.5" fill="#FFE2B0"/>`,
    top: (x, y) => `<circle cx="${x}" cy="${y}" r="19" fill="#FFB347"/><circle cx="${x}" cy="${y}" r="14" fill="#FFE2B0"/><circle cx="${x - 4}" cy="${y - 3}" r="3" fill="#F2B93B" opacity=".6"/>` }
};
const TNAMES = Object.keys(TI);
const SLOTX = [38, 100, 162];
const tableSide = items => S(`<rect x="10" y="66" width="180" height="11" rx="5" fill="#E8B27A"/><rect x="18" y="72" width="164" height="7" rx="3" fill="#C98E55"/><rect x="24" y="78" width="9" height="26" rx="4" fill="#C98E55"/><rect x="167" y="78" width="9" height="26" rx="4" fill="#C98E55"/>${items.map((k, i) => TI[k].side(SLOTX[i])).join('')}`, '0 0 200 110');
const tableTop = items => S(`<rect x="6" y="6" width="188" height="98" rx="18" fill="#E8B27A" stroke="#C98E55" stroke-width="3"/><path d="M14 30 H186 M14 80 H186" stroke="#C98E55" stroke-width="1.5" opacity=".4"/>${items.map((k, i) => TI[k].top(SLOTX[i], 55)).join('')}`, '0 0 200 110');

/* ---------- habitación (nivel 3) ---------- */
const SL = [{ n: 'atrás, a la izquierda', fx: 44, fy: 90, fs: .8, tx: 38, ty: 40 }, { n: 'atrás, a la derecha', fx: 156, fy: 90, fs: .8, tx: 102, ty: 40 }, { n: 'delante, en el medio', fx: 100, fy: 128, fs: 1.1, tx: 70, ty: 90 }];
const RI = {
  bed: { name: 'la cama',
    front: `<rect x="-29" y="-38" width="58" height="22" rx="5" fill="#A9703F"/><rect x="-27" y="-24" width="54" height="14" rx="4" fill="#B5A8F5"/><ellipse cx="0" cy="-26" rx="15" ry="5" fill="#fff"/><rect x="-29" y="-14" width="58" height="14" rx="5" fill="#8C7BE0"/><rect x="-27" y="-2" width="7" height="5" fill="#A9703F"/><rect x="20" y="-2" width="7" height="5" fill="#A9703F"/>`,
    top: (x, y) => `<rect x="${x - 17}" y="${y - 25}" width="34" height="50" rx="5" fill="#A9703F"/><rect x="${x - 14}" y="${y - 22}" width="28" height="44" rx="4" fill="#B5A8F5"/><rect x="${x - 14}" y="${y - 6}" width="28" height="28" rx="4" fill="#8C7BE0"/><rect x="${x - 11}" y="${y - 20}" width="22" height="11" rx="5" fill="#fff"/>` },
  table: { name: 'la mesa',
    front: `<ellipse cx="0" cy="-24" rx="25" ry="5" fill="#E8B27A"/><rect x="-25" y="-25" width="50" height="6" rx="3" fill="#E8B27A"/><rect x="-25" y="-21" width="50" height="3" fill="#C98E55"/><rect x="-3" y="-18" width="6" height="16" fill="#C98E55"/><ellipse cx="0" cy="-1" rx="13" ry="3" fill="#C98E55"/><circle cx="-8" cy="-30" r="5" fill="#F0453F"/>`,
    top: (x, y) => `<circle cx="${x}" cy="${y}" r="17" fill="#E8B27A" stroke="#C98E55" stroke-width="2.5"/><circle cx="${x - 5}" cy="${y - 4}" r="5" fill="#F0453F"/>` },
  rug: { name: 'la alfombra',
    front: `<ellipse cx="0" cy="-3" rx="30" ry="7" fill="#47B5BF"/><ellipse cx="0" cy="-3" rx="22" ry="4.6" fill="#FFD23F"/><ellipse cx="0" cy="-3" rx="13" ry="2.6" fill="#47B5BF"/>`,
    top: (x, y) => `<ellipse cx="${x}" cy="${y}" rx="27" ry="19" fill="#47B5BF"/><ellipse cx="${x}" cy="${y}" rx="20" ry="13" fill="#FFD23F"/><ellipse cx="${x}" cy="${y}" rx="11" ry="7" fill="#47B5BF"/>` }
};
const roomFront = asg => { // asg[slot] = item key
  const order = [0, 1, 2];
  const flat = order.filter(i => asg[i] === 'rug'), solid = order.filter(i => asg[i] !== 'rug');
  const draw = i => `<g transform="translate(${SL[i].fx} ${SL[i].fy}) scale(${SL[i].fs})">${RI[asg[i]].front}</g>`;
  return S(`<rect width="200" height="140" fill="#FFE9C7"/><rect y="62" width="200" height="78" fill="#E8C089"/><path d="M0 62 H200" stroke="#C98E55" stroke-width="3"/><g stroke="#D4A56B" stroke-width="1.5" opacity=".7"><path d="M0 85 H200M0 108 H200M50 62 L20 140M100 62 V140M150 62 L180 140"/></g>
    <rect x="76" y="10" width="48" height="36" rx="4" fill="#BFE6FB" stroke="#fff" stroke-width="4"/><path d="M100 10 V46 M76 28 H124" stroke="#fff" stroke-width="3"/>
    ${flat.map(draw).join('')}${solid.sort((a, b) => SL[a].fy - SL[b].fy).map(draw).join('')}`, '0 0 200 140');
};
const roomTop = asg => S(`<rect x="2" y="2" width="136" height="116" rx="8" fill="#E8C089" stroke="#A9703F" stroke-width="4"/><rect x="48" y="0" width="44" height="6" rx="3" fill="#8FD0F2"/><rect x="48" y="114" width="44" height="6" rx="2" fill="#A9703F"/>${[0, 1, 2].filter(i => asg[i] === 'rug').map(i => RI.rug.top(SL[i].tx, SL[i].ty)).join('')}${[0, 1, 2].filter(i => asg[i] !== 'rug').map(i => RI[asg[i]].top(SL[i].tx, SL[i].ty)).join('')}`, '0 0 140 120');

K.css(`
.g-memoria-x16{gap:.9rem}
.g-memoria-x16 .src{background:#fff;border-radius:1.8rem;padding:.6rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line);flex:none;display:flex;flex-direction:column;align-items:center;gap:.2rem}
.g-memoria-x16 .src svg{width:var(--sw);height:var(--sh)}
.g-memoria-x16 .src small{font-family:'Baloo 2';font-size:1.1rem;color:var(--ink2)}
.g-memoria-x16 .choices{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;width:100%}
.g-memoria-x16 .pic{width:var(--ow);height:var(--oh);padding:.4rem;box-sizing:border-box}
.g-memoria-x16 .pic svg{width:100%;height:100%;max-width:none;max-height:none}
.g-memoria-x16 .pic.dim{opacity:.35;transform:scale(.92)}
.g-memoria-x16 .why{max-width:min(94%,40rem);padding:.5rem 1.2rem;font-family:'Baloo 2';font-size:1.3rem;line-height:1.15;background:#E8F9EC;border:.2rem solid #5CC77A;animation:pop .5s both;text-align:center}
.g-memoria-x16 .arrow{font-family:'Baloo 2';font-size:1.2rem;color:var(--gd)}
`);

function setSize(area, kind, n) {
  const h = area.clientHeight || 560, w = area.clientWidth || 900;
  const mobile = w < 640;
  let sw, sh_, ow, oh;
  if (kind === 'obj') { sh_ = Math.min(h * .34, 230); sw = sh_; ow = Math.min(mobile ? w * .28 : 190, h * .28); oh = ow; }
  else if (kind === 'table') { sw = Math.min(sh_ = h * .3, 260) * 200 / 110; sw = Math.min(sw, w * .8); sh_ = sw * 110 / 200; ow = Math.min(mobile ? w * .3 : 230, w * .31); oh = ow * 110 / 200; if (mobile) { ow = w * .72; oh = ow * .42; } }
  else { sh_ = Math.min(h * .27, 190); sw = sh_ * 200 / 140; sw = Math.min(sw, w * .8); sh_ = sw * 140 / 200; oh = Math.min(mobile ? h * .17 : h * .3, 170); ow = oh * 140 / 120; if (mobile) { ow = w * .38; oh = ow * .78; } }
  return [sw, sh_, ow, oh];
}

let lastKey = '';
K.game({
  id: 'memoria-x16', group: 'memoria', num: 20, title: 'Vista desde arriba',
  blurb: 'Mira el dibujo de lado y busca cómo se vería desde arriba.',
  how: 'Mira el dibujo. Imagina que lo miras desde el cielo, como un pájaro. Toca el dibujo que muestra cómo se ve desde arriba.',
  icon: 'house', levels: ['Cosas conocidas', 'Una mesa puesta', 'Una habitación'], rounds: 6,
  round(g, ri) {
    const area = g.area, lv = g.level;
    let src, opts, why, ask, kind, label;
    if (lv === 1) {
      kind = 'obj';
      let k; do { k = U.pick(LV1); } while (k === lastKey); lastKey = k;
      const o = OB[k];
      const others = U.sample(LV1.filter(x => x !== k), 2);
      let wrongs = others.map(x => ({ html: OB[x].top }));
      if (o.rotTop && Math.random() < .6) wrongs[0] = { html: o.top.replace('<svg viewBox="0 0 100 100">', '<svg viewBox="0 0 100 100"><g transform="rotate(90 50 50)">').replace(/<\/svg>$/, '</g></svg>') };
      src = o.side; label = 'De lado'; ask = `Mira ${o.name}. ¿Cómo se ve desde arriba?`; why = o.why;
      opts = U.shuffle([{ html: o.top, ok: 1 }, ...wrongs]);
    } else if (lv === 2) {
      kind = 'table';
      const items = U.sample(TNAMES, 3), perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
      const wr = U.sample(perms.slice(1), 2);
      const arr = p => p.map(i => items[i]);
      src = tableSide(items); label = 'Mesa vista de lado'; ask = 'Mira la mesa de lado. ¿Cómo se ve desde arriba?';
      const nm = items.map(k => TI[k].name);
      why = `De izquierda a derecha: ${nm[0]}, ${nm[1]} y ${nm[2]}.`;
      opts = U.shuffle([{ html: tableTop(items), ok: 1 }, ...wr.map(p => ({ html: tableTop(arr(p)) }))]);
    } else {
      kind = 'room';
      const names = ['bed', 'table', 'rug'];
      const base = U.shuffle(names), perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
      const wr = U.sample(perms.slice(1), 3);
      const arr = p => p.map(i => base[i]);
      src = roomFront(base); label = 'Habitación vista de frente'; ask = 'Mira la habitación de frente. ¿Cómo se ve desde arriba?';
      const key = base.join(); if (key === lastKey) { /* sólo para variar */ } lastKey = key;
      why = base.map((k, i) => `${RI[k].name[0].toUpperCase() + RI[k].name.slice(1)} está ${SL[i].n}`).join('. ') + '.';
      opts = U.shuffle([{ html: roomTop(base), ok: 1 }, ...wr.map(p => ({ html: roomTop(arr(p)) }))]);
    }
    g.ask(ask);
    const [sw, sh_, ow, oh] = setSize(area, kind, opts.length);
    const srcEl = U.el(`<div class="src" style="--sw:${sw}px;--sh:${sh_}px">${src}<small>${label}</small></div>`);
    const arrow = U.el('<div class="arrow">¿Cómo se ve desde arriba?</div>');
    const ch = U.el(`<div class="choices" style="--ow:${ow}px;--oh:${oh}px"></div>`);
    const holder = U.el('<div></div>');
    area.append(srcEl, arrow, ch, holder);
    let done = false;
    const els = opts.map((o, i) => {
      const b = U.el(`<button class="pic" aria-label="Vista desde arriba, opción ${i + 1}">${o.html}</button>`);
      b.onclick = () => {
        if (done || b.disabled) return;
        K.sound.tap();
        if (!o.ok) { b.classList.add('bad'); b.disabled = true; g.wrong('¡Casi! Piensa cómo lo ve un pájaro desde el cielo'); return; }
        done = true; b.classList.add('right');
        els.forEach(e => { if (e !== b) { e.disabled = true; if (!e.classList.contains('bad')) e.classList.add('dim'); } });
        holder.appendChild(U.el(`<div class="card why">${U.esc(why)}</div>`)); g.say(why);
        g.t(() => g.right(), 900 + why.length * 45);
      };
      ch.appendChild(b); return b;
    });
    g.helpHint = () => {
      const bad = els.filter((e, i) => !opts[i].ok && !e.disabled);
      bad.slice(0, Math.max(1, bad.length - 1)).forEach(e => e.classList.add('dim'));
      const t = lv === 1 ? 'Fíjate en la forma que tiene por arriba.' : lv === 2 ? 'Mira el orden: de izquierda a derecha.' : 'Fíjate qué hay detrás, cerca de la ventana, y qué hay delante.';
      g.toast(t); g.say(t);
    };
  }
});
})();
