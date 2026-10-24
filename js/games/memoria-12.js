/* Encuentra las diferencias */
(function () {
'use strict';
const U = Kids.util;
const W = 200, H = 150;
/* dibujo del catálogo anidado en un SVG de escena */
function A(name, x, y, w, flip) {
  const args = Array.prototype.slice.call(arguments, 5);
  let s = Kids.art.get.apply(Kids.art, [name].concat(args)).replace('<svg', `<svg x="${x}" y="${y}" width="${w}" height="${w}"`);
  return flip ? `<g transform="translate(${2 * x + w} 0) scale(-1 1)">${s}</g>` : s;
}
/* cada escena: draw(d) con d(id)=true si esa diferencia está aplicada; diffs: id, sz (b grande, m media, s pequeña), pts [[x,y]], r */
const SCENES = [
{ /* parque */
  diffs: [
    { id: 'sun', sz: 'b', pts: [[23, 21]] }, { id: 'kite', sz: 'b', pts: [[131, 23]] }, { id: 'dog', sz: 'b', pts: [[85, 99]] },
    { id: 'cloud', sz: 'm', pts: [[68, 24], [98, 44]] }, { id: 'bench', sz: 'm', pts: [[36, 88]] },
    { id: 'ball', sz: 'm', pts: [[111, 119], [129, 131]] }, { id: 'flower', sz: 'm', pts: [[48, 130]] },
    { id: 'bird', sz: 's', pts: [[167, 51]] }, { id: 'butterfly', sz: 's', pts: [[108, 68]] }, { id: 'lamp', sz: 's', pts: [[124, 60]] },
    { id: 'flower3', sz: 's', pts: [[160, 128]] }
  ],
  draw(d) {
    return `<rect width="200" height="150" fill="#CDEBFF"/>
    <rect y="86" width="200" height="64" fill="#A9DE9A"/><ellipse cx="40" cy="92" rx="90" ry="14" fill="#9AD68C"/>
    <path d="M70 150 Q90 112 130 96 L150 96 Q112 114 112 150Z" fill="#F6E3AE"/>
    ${d('sun') ? '' : A('sun', 6, 4, 34)}
    ${d('cloud') ? A('cloud', 80, 26, 36) : A('cloud', 50, 6, 36)}
    ${d('kite') ? '' : A('kite', 118, 10, 26)}
    ${A('tree', 142, 38, 56)}
    ${d('bird') ? '' : A('bird', 160, 44, 14)}
    <rect x="123" y="62" width="3" height="32" rx="1.5" fill="#6B7A99"/><circle cx="124.5" cy="58" r="5" fill="${d('lamp') ? '#8F9BB5' : '#FFE27A'}"/>
    <g fill="${d('bench') ? '#E4572E' : '#9B6B3A'}"><rect x="12" y="75" width="46" height="5" rx="2"/><rect x="12" y="85" width="46" height="6" rx="2"/></g><g fill="#6B4A28"><rect x="16" y="90" width="4" height="10"/><rect x="50" y="90" width="4" height="10"/></g>
    ${d('dog') ? '' : A('dog', 70, 84, 30)}
    ${A('ball', d('ball') ? 122 : 104, d('ball') ? 124 : 112, 14)}
    ${d('butterfly') ? '' : A('butterfly', 100, 60, 16)}
    ${A('flower', 12, 112, 20, false, '#FF7EA8')}${A('flower', 38, 120, 20, false, d('flower') ? '#8C7BE0' : '#FFC21A')}
    ${d('flower3') ? '' : A('flower', 150, 118, 20, false, '#FF7EA8')}`;
  }
},
{ /* granja */
  diffs: [
    { id: 'sun', sz: 'b', pts: [[176, 20]] }, { id: 'roof', sz: 'b', pts: [[48, 44]] }, { id: 'cow', sz: 'b', pts: [[109, 89]] },
    { id: 'cloud', sz: 'm', pts: [[39, 27]] }, { id: 'sheep', sz: 'm', pts: [[141, 97]] }, { id: 'hen', sz: 'm', pts: [[176, 122], [112, 124]] },
    { id: 'fence', sz: 'm', pts: [[47, 112]] }, { id: 'apple', sz: 's', pts: [[172, 58]] }, { id: 'door', sz: 's', pts: [[48, 80]] },
    { id: 'smoke', sz: 's', pts: [[66, 24]] }, { id: 'window', sz: 's', pts: [[66, 66]] }, { id: 'flower', sz: 's', pts: [[138, 134]] }
  ],
  draw(d) {
    return `<rect width="200" height="150" fill="#D6F0FF"/>
    <ellipse cx="60" cy="84" rx="110" ry="16" fill="#B5E3A4"/><rect y="86" width="200" height="64" fill="#A9DE9A"/><rect y="128" width="200" height="22" fill="#9AD68C"/>
    ${d('sun') ? '' : A('sun', 160, 4, 32)}
    ${d('cloud') ? '' : A('cloud', 20, 8, 38)}
    <rect x="62" y="34" width="8" height="18" fill="#C98A6B"/>
    ${d('smoke') ? '' : '<g fill="#fff" opacity=".9"><circle cx="66" cy="29" r="4"/><circle cx="70" cy="22" r="5"/><circle cx="66" cy="14" r="6"/></g>'}
    <rect x="20" y="52" width="56" height="42" fill="#FFE2B8"/>
    <polygon points="14,55 48,26 82,55" fill="${d('roof') ? '#4C8DF6' : '#E4572E'}"/>
    <rect x="41" y="68" width="14" height="26" rx="2" fill="${d('door') ? '#8C7BE0' : '#9B6B3A'}"/>
    <rect x="60" y="60" width="12" height="12" rx="2" fill="${d('window') ? '#FFD23F' : '#CFE6FB'}" stroke="#fff" stroke-width="1.5"/><rect x="26" y="60" width="10" height="12" rx="2" fill="#CFE6FB" stroke="#fff" stroke-width="1.5"/>
    ${d('cow') ? '' : A('cow', 90, 70, 38)}
    ${d('sheep') ? '' : A('sheep', 128, 86, 26)}
    ${A('tree', 150, 40, 44)}
    ${d('apple') ? '' : '<circle cx="172" cy="58" r="4.5" fill="#F26B6B"/>'}
    <g fill="#fff"><rect x="0" y="108" width="95" height="4" rx="2"/><rect x="0" y="118" width="95" height="4" rx="2"/>
    ${[4, 24, 44, 64, 84].filter(x => !(d('fence') && x === 44)).map(x => `<rect x="${x}" y="100" width="6" height="26" rx="3"/>`).join('')}</g>
    ${d('hen') ? A('hen', 104, 116, 16) : A('hen', 168, 114, 16)}
    ${A('flower', 130, 126, 16, false, d('flower') ? '#8C7BE0' : '#FF7EA8')}`;
  }
},
{ /* playa */
  diffs: [
    { id: 'sun', sz: 'b', pts: [[167, 21]] }, { id: 'umb', sz: 'b', pts: [[42, 62]] }, { id: 'boat', sz: 'b', pts: [[117, 63]] },
    { id: 'cloud', sz: 'm', pts: [[40, 30], [76, 40]] }, { id: 'crab', sz: 'm', pts: [[118, 116]] }, { id: 'fish', sz: 'm', pts: [[154, 80]] },
    { id: 'bucket', sz: 'm', pts: [[88, 128]] }, { id: 'flag', sz: 's', pts: [[162, 108]] }, { id: 'star', sz: 's', pts: [[30, 128]] },
    { id: 'gull', sz: 's', pts: [[107, 21]] }
  ],
  draw(d) {
    return `<rect width="200" height="150" fill="#CDEFFF"/>
    <rect y="55" width="200" height="50" fill="#5CBBE6"/><g fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"><path d="M10 66q6-5 12 0t12 0"/><path d="M60 92q6-5 12 0t12 0"/><path d="M150 96q6-5 12 0t12 0"/><path d="M120 58q6-5 12 0t12 0"/></g>
    <path d="M0 102 Q60 92 120 102 T200 98 V150 H0Z" fill="#F6E3AE"/>
    ${d('sun') ? '' : A('sun', 150, 4, 34)}
    ${d('cloud') ? A('cloud', 56, 20, 36) : A('cloud', 20, 10, 40)}
    ${d('gull') ? '' : A('bird', 100, 14, 14)}
    ${d('boat') ? A('boat', 106, 54, 22) : A('boat', 100, 46, 34)}
    ${d('fish') ? '' : A('fish', 146, 72, 16)}
    <rect x="40" y="68" width="3.5" height="48" rx="1.5" fill="#8A6A3A"/>
    <path d="M18 72 Q42 36 66 72Z" fill="${d('umb') ? '#8C7BE0' : '#FF7E69'}"/><path d="M42 54.5 Q36 62 35 72 L49 72 Q48 62 42 54.5Z" fill="#fff" opacity=".85"/>
    ${d('crab') ? '' : A('crab', 108, 106, 20)}
    <path d="M78 118 L98 118 L94 136 L82 136Z" fill="${d('bucket') ? '#4C8DF6' : '#FF7E69'}"/><path d="M80 118 Q88 106 96 118" fill="none" stroke="#8A8FA8" stroke-width="1.8"/>
    <path d="M148 134 L148 120 L152 120 L152 116 L156 116 L156 120 L162 120 L162 114 L166 114 L166 120 L172 120 L172 134Z" fill="#E8CD8A"/><rect x="161" y="102" width="1.8" height="12" fill="#8A6A3A"/><polygon points="163,102 172,105 163,108" fill="${d('flag') ? '#4C8DF6' : '#E03131'}"/>
    ${d('star') ? '' : A('star', 22, 120, 16)}`;
  }
}
];
const POOL = { 1: ['b'], 2: ['b', 'm'], 3: ['b', 'm', 's'] };
const COUNT = { 1: 3, 2: 5, 3: 7 };
let offset = 0;

Kids.css(`
.g-memoria-12{gap:.6rem}
.g-memoria-12 .dtop{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap}
.g-memoria-12 .dpill{background:#fff;border-radius:999px;padding:.3rem 1.2rem;font-family:'Baloo 2',sans-serif;font-size:1.35rem;box-shadow:0 .25rem 0 var(--line)}
.g-memoria-12 .dpill b{color:var(--gd);font-size:1.6rem}
.g-memoria-12 .dpan{display:grid;gap:.9rem;justify-content:center}
.g-memoria-12 .pl{width:var(--pw);aspect-ratio:4/3;border-radius:1.4rem;overflow:hidden;background:#fff;border:.28rem solid #fff;box-shadow:0 .4rem 0 rgba(20,35,91,.16);cursor:pointer;touch-action:manipulation;position:relative}
.g-memoria-12 .pl svg{width:100%;height:100%;display:block}
.g-memoria-12 .mk{fill:rgba(92,199,122,.28);stroke:#2FB35A;stroke-width:3;transform-box:fill-box;transform-origin:center;animation:dmark .5s cubic-bezier(.3,1.6,.5,1) both}
@keyframes dmark{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.g-memoria-12 .hn{fill:rgba(255,210,63,.35);stroke:#F2B93B;stroke-width:3;transform-box:fill-box;transform-origin:center;animation:dhint .55s ease-in-out 5}
@keyframes dhint{50%{transform:scale(1.35);opacity:.4}}
`);

Kids.game({
  id: 'memoria-12', group: 'memoria', num: 2,
  title: 'Encuentra las diferencias',
  blurb: 'Mira los dos dibujos y toca lo que es distinto.',
  how: 'Los dos dibujos se parecen, pero no son iguales. Toca en el dibujo las cosas que son diferentes.',
  icon: 'butterfly',
  levels: ['3 diferencias', '5 diferencias', '7 diferencias'],
  rounds: 3,
  round(g, i) {
    if (i === 0) offset = U.rnd(0, SCENES.length - 1);
    const sc = SCENES[(offset + i) % SCENES.length], n = COUNT[g.level];
    const pool = sc.diffs.filter(d => POOL[g.level].includes(d.sz));
    let chosen = U.sample(pool, n);
    if (g.level === 3 && !chosen.some(d => d.sz === 's')) chosen[0] = U.pick(sc.diffs.filter(d => d.sz === 's'));
    const on = new Set(chosen.map(d => d.id));
    g.ask('Encuentra las ' + n + ' diferencias');
    const top = U.el(`<div class="dtop"><div class="dpill">Has encontrado <b class="nf">0</b> de <b>${n}</b></div><button class="btn sm blue">Pista</button></div>`);
    const pan = U.el('<div class="dpan"></div>');
    const mk = (draw) => U.el(`<div class="pl"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${sc.draw(draw)}<g class="marks"></g></svg></div>`);
    const left = mk(() => false), right = mk(id => on.has(id));
    pan.appendChild(left); pan.appendChild(right);
    g.area.appendChild(top); g.area.appendChild(pan);
    const nf = top.querySelector('.nf'), found = new Set();
    function fit() {
      if (!pan.isConnected) return;
      const fs = parseFloat(getComputedStyle(g.area).fontSize), aw = g.area.clientWidth - fs * 3, ah = g.area.clientHeight - top.offsetHeight - fs * 3.8, gap = 14;
      const wide = Math.min((aw - gap) / 2, ah * 4 / 3), tall = Math.min(aw, (ah - gap) / 2 * 4 / 3);
      const side = wide >= tall;
      pan.style.gridTemplateColumns = side ? 'auto auto' : 'auto';
      pan.style.setProperty('--pw', Math.max(120, Math.min(side ? wide : tall, 560)) + 'px');
    }
    const onResize = () => { if (!pan.isConnected) window.removeEventListener('resize', onResize); else fit(); };
    window.addEventListener('resize', onResize); fit();

    function circle(pt, cls, r) { return `<circle class="${cls}" cx="${pt[0]}" cy="${pt[1]}" r="${r}"/>`; }
    function mark(d) {
      found.add(d.id); nf.textContent = found.size; Kids.sound.pop();
      [left, right].forEach(p => { p.querySelector('.marks').insertAdjacentHTML('beforeend', d.pts.map(pt => circle(pt, 'mk', 14)).join('')); });
      if (found.size === n) g.t(() => g.right('¡Las has encontrado todas!'), 700);
    }
    let lastMiss = 0;
    function tap(e) {
      const p = e.currentTarget, r = p.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H;
      let best = null, bd = 1e9;
      chosen.forEach(d => d.pts.forEach(pt => {
        const dist = Math.hypot(pt[0] - x, pt[1] - y), rad = Math.max(14, d.sz === 'b' ? 17 : d.sz === 'm' ? 15 : 14);
        if (dist <= rad && dist < bd) { bd = dist; best = d; }
      }));
      if (best) { if (!found.has(best.id)) mark(best); return; }
      const now = Date.now();
      if (now - lastMiss > 1800) { lastMiss = now; g.wrong('¡Casi! Sigue mirando'); }
    }
    left.addEventListener('pointerdown', tap); right.addEventListener('pointerdown', tap);
    function hint() {
      const rest = chosen.filter(d => !found.has(d.id));
      if (!rest.length) return;
      const d = U.pick(rest);
      [left, right].forEach(p => {
        const m = p.querySelector('.marks'); m.insertAdjacentHTML('beforeend', circle(d.pts[0], 'hn', 18));
        const el = m.lastElementChild; g.t(() => el.remove(), 3000);
      });
    }
    top.querySelector('button').onclick = () => { Kids.sound.tap(); hint(); };
    g.helpHint = hint;
  }
});
})();
