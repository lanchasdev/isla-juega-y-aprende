/* memoria-x20 — Pares: unir lo que va junto */
(function () {
'use strict';
const K = window.Kids, U = K.util;
const S = inner => `<svg viewBox="0 0 100 100">${inner}</svg>`;
const sh = (cx = 50, cy = 90, rx = 30) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#5b4a2e" opacity=".15"/>`;

K.art.add({
  'mx20-lock': S(`${sh()}<path d="M30 46 V34 Q30 12 50 12 Q70 12 70 34 V46" fill="none" stroke="#9AA5B8" stroke-width="9" stroke-linecap="round"/>
    <rect x="20" y="42" width="60" height="46" rx="12" fill="#F2B93B"/><rect x="20" y="42" width="60" height="14" rx="7" fill="#FFD66B"/>
    <circle cx="50" cy="63" r="6" fill="#8A5A12"/><rect x="47.5" y="63" width="5" height="14" rx="2.5" fill="#8A5A12"/>`),
  'mx20-brush': S(`${sh()}<g transform="rotate(-35 50 50)"><rect x="8" y="42" width="62" height="15" rx="7.5" fill="#4C8DF6"/><rect x="8" y="42" width="62" height="6" rx="3" fill="#7DB0FF"/>
    <rect x="62" y="34" width="26" height="30" rx="6" fill="#fff" stroke="#CFE6FB" stroke-width="2"/>
    <g stroke="#47B5BF" stroke-width="5" stroke-linecap="round"><path d="M68 30v8M76 30v8M84 30v8"/></g></g>
    <circle cx="82" cy="20" r="4" fill="#BFE6FB"/><circle cx="90" cy="30" r="2.5" fill="#BFE6FB"/>`),
  'mx20-glove': S(`${sh()}<path d="M26 90 V70 Q14 56 20 44 Q26 34 34 44 L38 52 V22 Q38 12 46 12 Q54 12 54 22 V40 V16 Q54 8 62 8 Q70 8 70 18 V42 V24 Q70 16 77 18 Q84 20 84 28 V56 Q86 76 70 82 V90Z" fill="#FF7EA8"/>
    <rect x="26" y="78" width="46" height="14" rx="5" fill="#fff"/><path d="M46 20v22M62 18v26" stroke="#E65A88" stroke-width="2.5" stroke-linecap="round"/>`),
  'mx20-spoon': S(`${sh()}<g transform="rotate(35 50 50)"><ellipse cx="50" cy="26" rx="17" ry="22" fill="#C9D3E3"/><ellipse cx="50" cy="24" rx="12" ry="17" fill="#E6EDF7"/>
    <path d="M45 44 H55 L57 90 Q57 96 50 96 Q43 96 43 90Z" fill="#C9D3E3"/><path d="M48 46 V88" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>`),
  'mx20-plate': S(`${sh(50, 84, 36)}<ellipse cx="50" cy="52" rx="42" ry="32" fill="#fff" stroke="#CFE6FB" stroke-width="3"/><ellipse cx="50" cy="52" rx="42" ry="32" fill="none" stroke="#9CC5EE" stroke-width="2" opacity=".6"/>
    <ellipse cx="50" cy="53" rx="27" ry="19" fill="#EAF4FF" stroke="#CFE6FB" stroke-width="2"/><path d="M30 44 Q40 36 52 38" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`),
  'mx20-paper': S(`${sh()}<path d="M22 10 H62 L80 28 V88 Q80 92 76 92 H26 Q22 92 22 88Z" fill="#fff" stroke="#E4DCC6" stroke-width="2.5"/><path d="M62 10 V28 H80Z" fill="#E4DCC6"/>
    <g stroke="#B6C7E6" stroke-width="3.5" stroke-linecap="round"><path d="M32 42h36M32 54h36M32 66h36M32 78h22"/></g>`),
  'mx20-road': S(`<rect x="0" y="0" width="100" height="100" rx="14" fill="#8BD16F"/><path d="M38 0 H62 L92 100 H8Z" fill="#5B6275"/><path d="M50 4 V16 M50 28 V44 M50 56 V76 M50 88 V98" stroke="#FFE066" stroke-width="4" stroke-linecap="round"/>
    <path d="M40 0 L12 100 M60 0 L88 100" stroke="#fff" stroke-width="2" opacity=".6"/>`),
  'mx20-pencil': S(`${sh()}<g transform="rotate(40 50 50)"><rect x="40" y="6" width="20" height="14" rx="5" fill="#FF8FA3"/><rect x="40" y="18" width="20" height="6" fill="#C9D3E3"/>
    <rect x="40" y="24" width="20" height="46" fill="#FFD23F"/><rect x="40" y="24" width="7" height="46" fill="#FFE680"/><path d="M40 70 H60 L50 92Z" fill="#F4D7B0"/><path d="M46 82 H54 L50 92Z" fill="#3b2a20"/></g>`),
  'mx20-tooth': S(`${sh()}<path d="M22 30 Q22 12 40 14 Q50 18 60 14 Q78 12 78 30 Q78 46 70 56 Q68 76 62 88 Q58 94 54 86 Q52 70 50 66 Q48 70 46 86 Q42 94 38 88 Q32 76 30 56 Q22 46 22 30Z" fill="#fff" stroke="#DDE8F5" stroke-width="3"/>
    <path d="M32 26 Q34 20 40 20" fill="none" stroke="#CFE6FB" stroke-width="3.5" stroke-linecap="round"/><circle cx="42" cy="38" r="2.6" fill="#3b2a20"/><circle cx="58" cy="38" r="2.6" fill="#3b2a20"/><path d="M45 46 Q50 51 55 46" fill="none" stroke="#3b2a20" stroke-width="2.4" stroke-linecap="round"/>`),
  'mx20-foot': S(`${sh()}<path d="M36 12 Q58 6 62 26 Q64 42 60 58 Q68 66 66 80 Q62 92 46 90 Q32 88 32 74 Q34 62 38 54 Q30 36 36 12Z" fill="#F6C9A0"/>
    <g fill="#F6C9A0" stroke="#E5AE80" stroke-width="1.5"><circle cx="38" cy="14" r="7"/><circle cx="50" cy="10" r="5.5"/><circle cx="59" cy="14" r="5"/><circle cx="65" cy="22" r="4.5"/></g>`),
  'mx20-hand': S(`${sh()}<path d="M26 60 Q14 46 22 38 Q28 34 34 44 L38 50 V20 Q38 12 45 12 Q52 12 52 20 V38 V14 Q52 6 59 6 Q66 6 66 14 V40 V20 Q66 12 73 14 Q80 16 80 24 V58 Q82 80 64 88 H44 Q30 80 26 60Z" fill="#F6C9A0"/>
    <path d="M45 20v22M59 14v26" stroke="#E5AE80" stroke-width="2" stroke-linecap="round"/>`),
  'mx20-head': S(`${sh()}<circle cx="50" cy="52" r="34" fill="#F6C9A0"/><path d="M18 46 Q20 18 50 16 Q80 18 82 46 Q70 30 50 32 Q30 30 18 46Z" fill="#6B3E1E"/>
    <circle cx="38" cy="54" r="4" fill="#3b2a20"/><circle cx="62" cy="54" r="4" fill="#3b2a20"/><circle cx="39.4" cy="52.6" r="1.4" fill="#fff"/><circle cx="63.4" cy="52.6" r="1.4" fill="#fff"/>
    <circle cx="30" cy="64" r="5" fill="#FF8FA3" opacity=".55"/><circle cx="70" cy="64" r="5" fill="#FF8FA3" opacity=".55"/><path d="M42 68 Q50 76 58 68" fill="none" stroke="#3b2a20" stroke-width="3" stroke-linecap="round"/>`),
  'mx20-sock': S(`${sh()}<path d="M34 8 H62 V50 Q62 56 68 58 Q86 64 86 78 Q86 90 72 90 Q54 90 40 78 Q32 70 34 56Z" fill="#8C7BE0"/><rect x="34" y="8" width="28" height="12" fill="#fff"/>
    <path d="M34 28 H62 M34 36 H62" stroke="#fff" stroke-width="4" opacity=".5"/>`),
  'mx20-nest': S(`${sh(50, 88, 36)}<path d="M12 56 Q12 90 50 90 Q88 90 88 56Z" fill="#B98B5B"/><path d="M14 62 Q50 78 86 62 M18 74 Q50 88 82 74 M24 56 Q50 66 76 56" fill="none" stroke="#8A5A33" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="38" cy="52" rx="10" ry="13" fill="#E4F0FF" stroke="#BFD8F5" stroke-width="2"/><ellipse cx="62" cy="52" rx="10" ry="13" fill="#FFF3C4" stroke="#F0DC8A" stroke-width="2"/><ellipse cx="50" cy="46" rx="10" ry="13" fill="#E4F5E8" stroke="#BDE3C6" stroke-width="2"/>`)
});

/* Todas las parejas: a, b = dibujos (nombre, etiqueta), why = explicación; easy = nivel 1-2 */
const P = [
  { id: 'llave',   a: ['key', 'la llave'],        b: ['mx20-lock', 'el candado'],  why: 'La llave abre el candado.', easy: 1 },
  { id: 'pie',     a: ['mx20-foot', 'el pie'],    b: ['shoe', 'el zapato'],        why: 'El zapato se pone en el pie.', easy: 1 },
  { id: 'cuchara', a: ['mx20-spoon', 'la cuchara'], b: ['mx20-plate', 'el plato'], why: 'Con la cuchara comemos del plato.', easy: 1 },
  { id: 'diente',  a: ['mx20-tooth', 'el diente'], b: ['mx20-brush', 'el cepillo'], why: 'El cepillo sirve para lavar los dientes.', easy: 1 },
  { id: 'mano',    a: ['mx20-hand', 'la mano'],   b: ['mx20-glove', 'el guante'],  why: 'El guante abriga la mano.', easy: 1 },
  { id: 'cabeza',  a: ['mx20-head', 'la cabeza'], b: ['hat', 'el sombrero'],       why: 'El sombrero se pone en la cabeza.', easy: 1 },
  { id: 'lapiz',   a: ['mx20-pencil', 'el lápiz'], b: ['mx20-paper', 'el papel'],  why: 'Con el lápiz escribimos y dibujamos en el papel.', easy: 1 },
  { id: 'coche',   a: ['car', 'el coche'],        b: ['mx20-road', 'la carretera'], why: 'El coche circula por la carretera.', easy: 1 },
  { id: 'mono',    a: ['monkey', 'el mono'],      b: ['banana', 'el plátano'],     why: 'Al mono le encantan los plátanos.' },
  { id: 'conejo',  a: ['rabbit', 'el conejo'],    b: ['carrot', 'la zanahoria'],   why: 'El conejo come zanahorias.' },
  { id: 'abeja',   a: ['bee', 'la abeja'],        b: ['flower', 'la flor'],        why: 'La abeja saca el néctar de las flores.' },
  { id: 'paraguas', a: ['raindrop', 'la lluvia'], b: ['umbrella', 'el paraguas'],  why: 'El paraguas nos protege de la lluvia.' },
  { id: 'pajaro',  a: ['bird', 'el pájaro'],      b: ['mx20-nest', 'el nido'],     why: 'El pájaro pone sus huevos en el nido.' },
  { id: 'calcetin', a: ['mx20-sock', 'el calcetín'], b: ['boot', 'la bota'],       why: 'El calcetín se pone dentro de la bota.' },
  { id: 'luna',    a: ['moon', 'la luna'],        b: ['star', 'la estrella'],      why: 'La luna y las estrellas salen de noche.' },
  { id: 'rana',    a: ['frog', 'la rana'],        b: ['leaf', 'la hoja'],          why: 'La rana se sienta sobre las hojas del estanque.' }
];
const NP = { 1: 3, 2: 5, 3: 6 };
let bag = [];
function draw(level, n) {
  if (level < 3) { // fáciles
    const pool = P.filter(p => p.easy);
    return U.sample(pool.filter(p => bag.indexOf(p.id) < 0).length >= n ? pool.filter(p => bag.indexOf(p.id) < 0) : pool, n);
  }
  const hard = P.filter(p => !p.easy), easy = P.filter(p => p.easy);
  const fresh = hard.filter(p => bag.indexOf(p.id) < 0);
  const h = U.sample(fresh.length >= 4 ? fresh : hard, 4), e = U.sample(easy.filter(p => bag.indexOf(p.id) < 0).length >= 2 ? easy.filter(p => bag.indexOf(p.id) < 0) : easy, n - 4);
  return h.concat(e);
}

K.css(`
.g-memoria-x20{gap:.7rem}
.g-memoria-x20 .board{position:relative;width:min(36rem,96%);display:grid;grid-template-columns:1fr 1fr;column-gap:22%;row-gap:.6rem;flex:none}
.g-memoria-x20 .col{display:flex;flex-direction:column;gap:.6rem;min-width:0}
.g-memoria-x20 .it{display:flex;align-items:center;gap:.5rem;padding:.3rem .6rem;min-height:var(--rh);background:#fff;border:.2rem solid var(--line);border-radius:1.3rem;box-shadow:0 .3rem 0 var(--line);font-family:'Baloo 2';font-size:1.15rem;line-height:1;text-align:left;position:relative;z-index:2;transition:transform .12s,background .2s}
.g-memoria-x20 .it svg{height:var(--ih);width:var(--ih);flex:none}
.g-memoria-x20 .it.r{flex-direction:row-reverse;text-align:right}
.g-memoria-x20 .it.sel{background:var(--gl);border-color:var(--g);transform:scale(1.05);box-shadow:0 .3rem 0 var(--g)}
.g-memoria-x20 .it.hot{background:#FFF3BF;border-color:var(--yellow)}
.g-memoria-x20 .it.done{pointer-events:none;border-color:var(--c);background:#fff}
.g-memoria-x20 .it.bad{animation:shake .4s;background:#FFD3CF}
.g-memoria-x20 .it.hint{animation:pulse .8s 4;border-color:var(--yellow);background:#FFF3BF}
.g-memoria-x20 svg.lines{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;overflow:visible}
.g-memoria-x20 .why{max-width:min(94%,40rem);padding:.5rem 1.2rem;font-family:'Baloo 2';font-size:1.3rem;background:#E8F9EC;border:.2rem solid #5CC77A;animation:pop .4s both;min-height:2.6rem}
.g-memoria-x20 .it .tx{overflow:hidden}
@media (max-width:640px){.g-memoria-x20 .board{column-gap:16%}.g-memoria-x20 .it{font-size:1rem;padding:.25rem .4rem}}
`);

const LC = ['#E03131', '#4C8DF6', '#2F9E5B', '#E8890C', '#8C7BE0', '#D6336C'];
K.game({
  id: 'memoria-x20', group: 'memoria', num: 24, title: 'Pares que van juntos',
  blurb: 'Une cada cosa con lo que va con ella: la llave con el candado, el pie con el zapato…',
  how: 'Toca una cosa y luego toca la que va con ella. También puedes arrastrar una hasta su pareja. Se dibujará una línea.',
  icon: 'key', levels: ['3 parejas', '5 parejas', '6 parejas y explicación'], rounds: 3,
  round(g, ri) {
    if (ri === 0) bag = [];
    const n = NP[g.level];
    const set = draw(g.level, n); set.forEach(p => bag.push(p.id));
    g.ask('Une cada cosa con su pareja');
    const L = U.shuffle(set), R = U.shuffle(set);
    const rowH = g.level === 1 ? 6 : g.level === 2 ? 4.8 : 4.3;
    const board = U.el(`<div class="board" style="--rh:${rowH}rem;--ih:${rowH - .9}rem"><div class="col l"></div><div class="col rr"></div></div>`);
    const why = U.el('<div class="card why" style="visibility:hidden" aria-live="polite">&nbsp;</div>');
    g.area.append(board, why);
    const svgNS = U.el('<svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>');
    board.appendChild(svgNS);
    const mk = (p, side) => {
      const d = side === 'l' ? p.a : p.b;
      const b = U.el(`<button class="it ${side === 'r' ? 'r' : ''}" data-id="${p.id}" data-s="${side}" aria-label="${U.esc(d[1])}">${K.art.get(d[0])}<span class="tx">${U.esc(d[1])}</span></button>`);
      return b;
    };
    const lEls = L.map(p => mk(p, 'l')), rEls = R.map(p => mk(p, 'r'));
    lEls.forEach(e => board.querySelector('.l').appendChild(e)); rEls.forEach(e => board.querySelector('.rr').appendChild(e));
    const all = lEls.concat(rEls);
    let sel = null, done = 0, dragged = false;

    const center = (el, side) => {
      const br = board.getBoundingClientRect(), r = el.getBoundingClientRect();
      return [((side === 'l' ? r.right : r.left) - br.left) / br.width * 100, ((r.top + r.bottom) / 2 - br.top) / br.height * 100];
    };
    function attempt(a, b) {
      if (a.dataset.s === b.dataset.s) return;
      const ok = a.dataset.id === b.dataset.id;
      all.forEach(e => e.classList.remove('sel', 'hint'));
      sel = null;
      if (!ok) {
        [a, b].forEach(e => { e.classList.add('bad'); g.t(() => e.classList.remove('bad'), 450); });
        g.wrong('Esos no van juntos. ¡Prueba otra vez!');
        return;
      }
      const col = LC[done % LC.length]; done++;
      const l = a.dataset.s === 'l' ? a : b, r = a.dataset.s === 'l' ? b : a;
      [a, b].forEach(e => { e.classList.add('done'); e.style.setProperty('--c', col); e.disabled = true; });
      const [x1, y1] = center(l, 'l'), [x2, y2] = center(r, 'r');
      svgNS.insertAdjacentHTML('beforeend', `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`);
      K.sound.pop();
      const p = set.find(q => q.id === a.dataset.id);
      why.style.visibility = 'visible'; why.textContent = p.why; g.say(p.why);
      if (done === n) g.t(() => g.right(), 600 + p.why.length * 45);
    }
    function pick(el) {
      if (el.disabled) return;
      K.sound.tap();
      if (!sel) { sel = el; el.classList.add('sel'); return; }
      if (sel === el) { el.classList.remove('sel'); sel = null; return; }
      if (sel.dataset.s === el.dataset.s) { sel.classList.remove('sel'); sel = el; el.classList.add('sel'); return; }
      attempt(sel, el);
    }
    all.forEach(el => {
      let sx = 0, sy = 0;
      el.addEventListener('pointerdown', e => { dragged = false; sx = e.clientX; sy = e.clientY; });
      el.addEventListener('pointermove', e => { if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 8) dragged = true; });
      el.onclick = () => { if (dragged) { dragged = false; return; } pick(el); };
      K.drag(el, {
        targets: () => all.filter(x => x.dataset.s !== el.dataset.s && !x.disabled),
        onDrop: t => { dragged = true; attempt(el, t); return false; }
      });
    });
    g.helpHint = () => {
      const left = L.find(p => !lEls.find(e => e.dataset.id === p.id).disabled); if (!left) return;
      [lEls, rEls].forEach(arr => { const e = arr.find(x => x.dataset.id === left.id); e.classList.add('hint'); });
      g.toast('Mira las dos que se mueven: ¡van juntas!');
    };
  }
});
})();
