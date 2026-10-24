/* Lectura x3 — Mayúsculas y minúsculas */
(function () {
'use strict';
const U = Kids.util;
const EASY = ['A','E','I','O','U','M','S','P','L','T'];
const MID = ['B','C','D','F','H','N','V','Z','J','K','Ñ','X'];
const TRICKY = ['G','R','Q','B','D','F','H','N','T','Y'];
const NAME = { A:'a',B:'be',C:'ce',D:'de',E:'e',F:'efe',G:'ge',H:'hache',I:'i',J:'jota',K:'ka',L:'ele',M:'eme',N:'ene','Ñ':'eñe',O:'o',P:'pe',Q:'cu',R:'erre',S:'ese',T:'te',U:'u',V:'uve',X:'equis',Y:'ye',Z:'zeta' };
const LINEC = ['#7B61D9', '#D9692A', '#1F9BA8', '#D6477A', '#4C8DF6', '#3FA95F', '#E0A800', '#8A5CC2'];

Kids.css(`
.g-lectura-x3{gap:.8rem}
.g-lectura-x3 .x3-board{--s:clamp(2.5rem,calc((100vh - 19rem) / var(--n) - .7rem),5.4rem);position:relative;display:flex;justify-content:center;gap:clamp(5rem,26vmin,16rem);width:100%;max-width:34rem;padding:.4rem 0}
.g-lectura-x3 .x3-col{display:flex;flex-direction:column;gap:.6rem;align-items:center;z-index:2}
.g-lectura-x3 .x3-col h4{margin:0;font-family:'Baloo 2',sans-serif;font-size:1.1rem;color:var(--ink2)}
.g-lectura-x3 .x3-l{width:var(--s);height:var(--s);border-radius:1.2rem;background:#fff;border:.2rem solid var(--line);box-shadow:0 .3rem 0 var(--line);font-family:'Baloo 2',sans-serif;font-weight:800;font-size:calc(var(--s) * .56);color:var(--ink);display:flex;align-items:center;justify-content:center;line-height:1}
.g-lectura-x3 .x3-l.script{font-family:'Bradley Hand','Segoe Print','Comic Sans MS','Chalkboard SE',cursive;font-weight:700}
.g-lectura-x3 .x3-l.sel{background:#FFF3BF;border-color:var(--yellow);transform:scale(1.1)}
.g-lectura-x3 .x3-l.hot{background:#FFF3BF;border-color:var(--yellow)}
.g-lectura-x3 .x3-l.done{color:#fff;border-color:transparent;pointer-events:none}
.g-lectura-x3 .x3-l.bad{background:#FFD3CF}
.g-lectura-x3 .x3-l.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x3 .x3-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible}
.g-lectura-x3 .x3-note{font-size:1.1rem;color:var(--ink2);margin:0;text-align:center}
`);

Kids.game({
  id: 'lectura-x3', group: 'lectura', num: 7,
  title: 'Mayúsculas y minúsculas', icon: 'star', rounds: 4,
  blurb: 'Une cada letra mayúscula con su letra minúscula.',
  how: 'Toca una letra grande y luego su pareja pequeña. También puedes arrastrar la letra grande hasta la pequeña.',
  levels: ['4 letras fáciles', '6 letras', '8 letras difíciles'],
  round(g, i) {
    const lv = g.level, n = lv === 1 ? 4 : lv === 2 ? 6 : 8;
    let letters;
    if (lv === 1) letters = U.sample(EASY, n);
    else if (lv === 2) letters = U.sample(EASY, 2).concat(U.sample(MID, n - 2));
    else { const hard = U.sample(['G','R','Q','B','D'], 4); letters = hard.concat(U.sample(TRICKY.filter(x => !hard.includes(x)), n - 4)); }
    const script = lv === 3 && i % 2 === 1;
    const pairs = U.shuffle(letters);
    const lowers = U.shuffle(letters);
    const board = U.el('<div class="x3-board" style="--n:' + n + '"><svg class="x3-lines"></svg></div>');
    const cu = U.el('<div class="x3-col"><h4>MAYÚSCULAS</h4></div>'), cl = U.el('<div class="x3-col"><h4>minúsculas</h4></div>');
    board.append(cu, cl);
    const note = U.el(`<p class="x3-note">${script ? 'Las pequeñas están escritas a mano' : ' '}</p>`);
    g.area.append(board, note);
    const svg = board.querySelector('svg');
    let sel = null, matched = 0, ci = 0;
    const lines = [];
    function center(el) { const b = board.getBoundingClientRect(), r = el.getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top, r]; }
    function drawLines() {
      svg.innerHTML = '';
      lines.forEach(({ a, b, c }) => {
        const [x1, y1, r1] = center(a), [x2, y2, r2] = center(b);
        const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        l.setAttribute('x1', r1.width / 2 + x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2 - r2.width / 2); l.setAttribute('y2', y2);
        l.setAttribute('stroke', c); l.setAttribute('stroke-width', 6); l.setAttribute('stroke-linecap', 'round'); l.setAttribute('opacity', '.8');
        svg.appendChild(l);
      });
    }
    const resize = () => { if (board.isConnected) drawLines(); else window.removeEventListener('resize', resize); };
    window.addEventListener('resize', resize);
    const say = L => g.say(NAME[L]);
    function pair(U1, L1) {
      const c = LINEC[ci++ % LINEC.length];
      [U1, L1].forEach(e => { e.classList.remove('sel'); e.classList.add('done'); e.style.background = c; e.disabled = true; });
      lines.push({ a: U1, b: L1, c }); drawLines(); g.t(drawLines, 340); Kids.sound.pop(); matched++;
      if (matched === n) { g.say(letters.length ? 'Mayúsculas y minúsculas, ¡todas unidas!' : ''); g.right(); }
    }
    function attempt(a, b) { /* a: mayúscula, b: minúscula */
      if (a._L === b._L) { sel = null; pair(a, b); return true; }
      b.classList.add('bad'); a.classList.remove('sel'); sel = null; g.shake(b); g.wrong(); g.t(() => b.classList.remove('bad'), 450); return false;
    }
    function choose(el, up) {
      if (el.disabled) return;
      say(el._L);
      if (!sel) { sel = el; el.classList.add('sel'); return; }
      if (sel === el) { el.classList.remove('sel'); sel = null; return; }
      if (sel._up === up) { sel.classList.remove('sel'); sel = el; el.classList.add('sel'); return; }
      const a = up ? el : sel, b = up ? sel : el; attempt(a, b);
    }
    const lowEls = [], upEls = [];
    lowers.forEach(L => {
      const b = U.el(`<button class="x3-l ${script ? 'script' : ''}" aria-label="letra minúscula ${L.toLowerCase()}">${L.toLowerCase()}</button>`);
      b._L = L; b._up = false; b.onclick = () => choose(b, false); cl.appendChild(b); lowEls.push(b);
    });
    pairs.forEach(L => {
      const b = U.el(`<button class="x3-l" aria-label="letra mayúscula ${L}">${L}</button>`);
      b._L = L; b._up = true; cu.appendChild(b); upEls.push(b);
      Kids.drag(b, {
        targets: () => lowEls.filter(x => !x.disabled),
        onStart: () => say(L),
        onDrop: (t) => { if (sel) { sel.classList.remove('sel'); sel = null; } attempt(b, t); return false; },
        onTap: () => { if (!b.disabled) { if (sel && sel !== b) { if (sel._up) { sel.classList.remove('sel'); sel = b; b.classList.add('sel'); } else attempt(b, sel); } else if (sel === b) { b.classList.remove('sel'); sel = null; } else { sel = b; b.classList.add('sel'); } } }
      });
      b.addEventListener('click', e => { if (e.detail === 0) choose(b, true); });
    });
    requestAnimationFrame(drawLines);
    g.helpHint = () => {
      const a = upEls.find(x => !x.disabled); if (!a) return;
      const b = lowEls.find(x => x._L === a._L); a.classList.add('hint'); b.classList.add('hint');
      g.toast('Mira: la «' + a._L + '» va con la «' + a._L.toLowerCase() + '»'); say(a._L);
    };
    g.ask('Une cada mayúscula con su minúscula');
  }
});
})();
