/* Mates x19 — Calculadora loca */
(function () {
'use strict';
const U = Kids.util;
const SYM = { '+': '+', '-': '−', '*': '×' };
const ev = (a, o, b) => o === '+' ? a + b : o === '-' ? a - b : a * b;
let lastKey = '';

Kids.css(`
.g-mates-x19 .x19-calc{width:min(36rem,94%);background:linear-gradient(#8C7BE0,#6F5FC9);border-radius:2rem;padding:.9rem 1rem 1rem;box-shadow:0 .5rem 0 #4B3FA0,0 1rem 1.4rem rgba(20,35,91,.15);display:flex;flex-direction:column;gap:.7rem;position:relative;margin-top:1.2rem}
.g-mates-x19 .x19-eyes{position:absolute;top:-1.3rem;left:50%;transform:translateX(-50%);display:flex;gap:.5rem}
.g-mates-x19 .x19-eye{width:2.4rem;height:2.4rem;background:#fff;border-radius:50%;border:.15rem solid #4B3FA0;position:relative;overflow:hidden}
.g-mates-x19 .x19-eye::after{content:'';position:absolute;width:.9rem;height:.9rem;border-radius:50%;background:var(--ink);left:50%;top:50%;margin:-.45rem 0 0 -.45rem;animation:x19look 3s infinite}
.g-mates-x19 .x19-eye:nth-child(2)::after{animation-delay:.2s}
@keyframes x19look{0%,100%{transform:translate(-.3rem,.2rem)}30%{transform:translate(.4rem,-.2rem)}60%{transform:translate(.2rem,.3rem)}}
.g-mates-x19 .x19-scr{background:#D9F5DD;border-radius:1.2rem;border:.25rem solid #4B3FA0;min-height:5.4rem;display:flex;align-items:center;justify-content:center;gap:.5rem;flex-wrap:wrap;font-family:'Baloo 2';font-weight:800;font-size:clamp(2.2rem,8.5vw,3.6rem);line-height:1;color:var(--ink);padding:.4rem .8rem;box-shadow:inset 0 .3rem 0 rgba(0,0,0,.08)}
.g-mates-x19 .x19-hole{min-width:3.4rem;min-height:4rem;border-radius:.9rem;border:.22rem dashed #4B3FA0;background:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:inherit;transition:background .15s}
.g-mates-x19 .x19-hole.cur{background:#FFF3BF;border-color:var(--yellow);animation:pulse 1.2s infinite}
.g-mates-x19 .x19-hole.filled{border-style:solid}
.g-mates-x19 .x19-keys{display:flex;flex-wrap:wrap;gap:.7rem;justify-content:center}
.g-mates-x19 .x19-key{min-width:5rem;min-height:4.6rem;border-radius:1.2rem;font-family:'Baloo 2';font-weight:800;font-size:2.4rem;color:var(--ink);box-shadow:0 .35rem 0 rgba(20,35,91,.3);flex:1 1 4.5rem;max-width:7rem;padding:0}
.g-mates-x19 .x19-key:nth-child(4n+1){background:#FFD23F}
.g-mates-x19 .x19-key:nth-child(4n+2){background:#FF9AB5}
.g-mates-x19 .x19-key:nth-child(4n+3){background:#7ED3DB}
.g-mates-x19 .x19-key:nth-child(4n+4){background:#B8F0A8}
.g-mates-x19 .x19-key:active{transform:translateY(.25rem);box-shadow:0 .1rem 0 rgba(20,35,91,.3)}
.g-mates-x19 .x19-key.bad{background:#FFD3CF!important;animation:shake .4s}
.g-mates-x19 .x19-key.right{background:#BDEFC8!important;animation:pop .5s}
.g-mates-x19 .x19-key.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .4rem #FFD23F}
.g-mates-x19 .x19-key[disabled]{pointer-events:none}
.g-mates-x19 .x19-tag{font-family:'Baloo 2';font-size:1.1rem;color:#fff;text-align:center;letter-spacing:.05rem}
`);

/* devuelve un problema {tokens:[{t:'n',v}|{t:'o',hole,op}|{t:'?'..}], kind, answers...} */
function make(lv) {
  const max = lv === 1 ? 10 : 20;
  for (let t = 0; t < 200; t++) {
    const r = Math.random();
    let p = null;
    if (lv === 3 && r < .3) { // dos huecos
      const a = U.rnd(2, 9), b = U.rnd(1, 6), d = U.rnd(1, 5);
      const o1 = U.pick(['+', '-']), o2 = U.pick(['+', '-']);
      const res = ev(ev(a, o1, b), o2, d);
      if (res < 0 || res > max) continue;
      const sols = [];
      ['+', '-'].forEach(x => ['+', '-'].forEach(y => { if (ev(ev(a, x, b), y, d) === res && ev(a, x, b) >= 0) sols.push(x + y); }));
      if (sols.length !== 1) continue;
      p = { kind: 'two', parts: [a, '?', b, '?', d], c: res, sol: [o1, o2] };
    } else if (lv === 1 || r < .5 || (lv === 3 && r < .65)) { // signo que falta
      const ops = lv === 3 ? ['+', '-', '*'] : ['+', '-'];
      const o = U.pick(ops);
      let a, b;
      if (o === '*') { a = U.rnd(2, 10); b = 2; if (Math.random() < .4) { a = U.rnd(2, 6); b = 3; } }
      else { a = U.rnd(lv === 1 ? 2 : 4, max); b = U.rnd(1, Math.min(a, lv === 1 ? 9 : 12)); }
      const c = ev(a, o, b);
      if (c < 0 || c > (lv === 3 && o === '*' ? 30 : max)) continue;
      const okOps = ops.filter(x => ev(a, x, b) === c);
      if (okOps.length !== 1) continue;
      p = { kind: 'sign', parts: [a, '?', b], c, sol: [o], ops };
    } else { // número que falta (3 posiciones)
      const o = lv === 3 ? U.pick(['+', '-', '*']) : U.pick(['+', '-']);
      let a, b;
      if (o === '*') { a = U.rnd(2, 9); b = 2; }
      else { a = U.rnd(2, max - 1); b = U.rnd(1, Math.min(a, 12)); }
      const c = ev(a, o, b);
      if (c < 0 || c > max + (o === '*' ? 10 : 0)) continue;
      const hole = U.rnd(0, 1); // 0 = primer número, 1 = segundo
      if (o === '-' && hole === 0 && (c + b) > max) continue;
      const ans = hole === 0 ? a : b;
      p = { kind: 'num', parts: hole === 0 ? ['?', o, b] : [a, o, '?'], c, ans, op: o };
    }
    const key = JSON.stringify(p.parts) + p.c;
    if (key === lastKey) continue;
    lastKey = key; return p;
  }
  return { kind: 'sign', parts: [5, '?', 3], c: 8, sol: ['+'], ops: ['+', '-'] };
}

function numOptions(ans, max) {
  const set = new Set([ans]);
  [ans + 1, ans - 1, ans + 2, ans - 2, ans + 3, ans - 3].forEach(v => { if (v >= 0 && v <= max && set.size < 4 && v !== ans) set.add(v); });
  let k = 0; while (set.size < 4 && k++ < 50) set.add(U.rnd(0, max));
  return U.shuffle([...set]);
}

Kids.game({
  id: 'mates-x19', group: 'mates', num: 24,
  title: 'Calculadora loca',
  blurb: 'La calculadora ha perdido una pieza. ¡Encuéntrala!',
  how: 'A la calculadora loca le falta un signo o un número. Toca la tecla que lo arregla.',
  icon: 'robot',
  levels: ['Más y menos hasta 10', 'Hasta 20', 'Con por y dos huecos'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, p = make(lv);
    const calc = U.el('<div class="x19-calc"><div class="x19-eyes"><i class="x19-eye"></i><i class="x19-eye"></i></div><div class="x19-scr"></div><div class="x19-keys"></div><div class="x19-tag">CALCULADORA LOCA</div></div>');
    const scr = calc.querySelector('.x19-scr'), keys = calc.querySelector('.x19-keys');
    const holes = [];
    p.parts.forEach(v => {
      if (v === '?') { const h = U.el('<span class="x19-hole" aria-label="Hueco"></span>'); holes.push(h); scr.appendChild(h); }
      else scr.appendChild(U.el(`<span>${SYM[v] || v}</span>`));
    });
    scr.appendChild(U.el('<span>=</span>')); scr.appendChild(U.el(`<span>${p.c}</span>`));
    if (p.kind === 'sign') g.ask('¿Qué signo falta entre el ' + p.parts[0] + ' y el ' + p.parts[2] + ' para que dé ' + p.c + '?');
    else if (p.kind === 'num') g.ask('¿Qué número falta para que la cuenta salga bien?');
    else g.ask('Faltan dos signos. ¿Cuáles hacen que dé ' + p.c + '?');
    const mkKey = (txt, label) => { const b = U.el(`<button class="x19-key" aria-label="${label}">${txt}</button>`); keys.appendChild(b); return b; };
    let btns = [];
    const fill = (h, txt) => { h.textContent = txt; h.classList.add('filled'); h.classList.remove('cur'); };

    if (p.kind === 'sign') {
      holes[0].classList.add('cur');
      btns = p.ops.map(o => {
        const b = mkKey(SYM[o], o === '+' ? 'más' : o === '-' ? 'menos' : 'por');
        b.onclick = () => {
          if (o === p.sol[0]) { btns.forEach(x => x.disabled = true); b.classList.add('right'); fill(holes[0], SYM[o]); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        return b;
      });
      g.helpHint = () => { g.toast('Prueba con las dos cuentas'); btns.forEach((b, k) => { if (p.ops[k] === p.sol[0] && !b.disabled) b.classList.add('hint'); }); };
    } else if (p.kind === 'num') {
      holes[0].classList.add('cur');
      const vals = numOptions(p.ans, 20);
      btns = vals.map(v => {
        const b = mkKey(v, String(v));
        b.onclick = () => {
          if (v === p.ans) { btns.forEach(x => x.disabled = true); b.classList.add('right'); fill(holes[0], v); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        return b;
      });
      g.helpHint = () => { g.toast('Cuenta con los dedos si quieres'); btns.forEach((b, k) => { if (vals[k] === p.ans && !b.disabled) b.classList.add('hint'); }); };
    } else {
      let step = 0, chosen = [];
      holes[0].classList.add('cur');
      btns = ['+', '-'].map(o => {
        const b = mkKey(SYM[o], o === '+' ? 'más' : 'menos');
        b.onclick = () => {
          Kids.sound.pop();
          fill(holes[step], SYM[o]); chosen.push(o); step++;
          if (step === 1) { holes[1].classList.add('cur'); return; }
          if (chosen[0] === p.sol[0] && chosen[1] === p.sol[1]) { btns.forEach(x => x.disabled = true); g.right(); }
          else {
            g.wrong('Esa cuenta no sale ' + p.c + '. ¡Prueba otra combinación!');
            g.t(() => { holes.forEach(h => { h.textContent = ''; h.classList.remove('filled'); }); holes[0].classList.add('cur'); step = 0; chosen = []; btns.forEach(x => x.classList.remove('hint')); }, 700);
          }
        };
        return b;
      });
      g.helpHint = () => {
        g.toast('Empieza por ' + p.parts[0] + ' ' + SYM[p.sol[0]] + ' ' + p.parts[2] + '…');
        btns.forEach((b, k) => { if (['+', '-'][k] === p.sol[step]) b.classList.add('hint'); });
      };
    }
    g.area.appendChild(calc);
  },
  stars(m, r) { return m <= 2 ? 3 : m <= 7 ? 2 : 1; }
});
})();
