/* Mates X5 — Mayor, menor o igual */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
const OBJ = ['apple', 'star', 'fish', 'cherry', 'duck', 'ball', 'flower', 'heart'];
let lastKey = '', lastObj = '';

/* cocodrilo mirando a la derecha; la mandíbula superior gira alrededor de la bisagra (112,66) */
A.add({
  'mx5-croc': `<svg viewBox="0 0 200 120" class="x5-svg">
  <ellipse cx="100" cy="112" rx="78" ry="6" fill="#14235B" opacity=".1"/>
  <path d="M6 70 Q-4 52 14 50 Q40 60 52 66 L54 90 Q30 92 6 70Z" fill="#5CC77A"/>
  <ellipse cx="70" cy="76" rx="52" ry="30" fill="#5CC77A"/>
  <ellipse cx="72" cy="90" rx="40" ry="14" fill="#C9F0B4"/>
  <g fill="#3FA860"><circle cx="40" cy="58" r="6"/><circle cx="62" cy="52" r="6"/><circle cx="84" cy="54" r="6"/></g>
  <rect x="44" y="94" width="18" height="16" rx="8" fill="#3FA860"/><rect x="82" y="94" width="18" height="16" rx="8" fill="#3FA860"/>
  <path class="x5-in" d="M106 72 L190 72 L180 26Z" fill="#E8556D" style="transform-origin:106px 72px"/>
  <g class="x5-low"><path d="M104 74 H186 Q194 74 192 82 Q190 94 176 94 H112 Q100 94 100 84Z" fill="#4DBA6C"/>
  <path d="M120 74 l5 -8 l5 8z M144 74 l5 -8 l5 8z M168 74 l5 -8 l5 8z" fill="#fff"/><path d="M112 82 Q146 90 184 82" stroke="#3FA860" stroke-width="2" fill="none" opacity=".5"/></g>
  <g class="x5-up" style="transform-origin:108px 70px"><path d="M104 66 H186 Q196 66 194 56 Q190 44 176 44 H112 Q98 44 96 56Z" fill="#5CC77A"/>
  <circle cx="182" cy="52" r="2.6" fill="#2D8A4C"/>
  <path d="M120 66 l5 8 l5 -8z M144 66 l5 8 l5 -8z M168 66 l5 8 l5 -8z" fill="#fff"/>
  <circle cx="122" cy="40" r="14" fill="#fff"/><circle cx="125" cy="41" r="7" fill="#14235B"/><circle cx="127" cy="38" r="2.6" fill="#fff"/>
  <path d="M112 58 Q140 64 168 58" stroke="#3FA860" stroke-width="2" fill="none" opacity=".4"/></g>
  </svg>`
});

Kids.css(`
.g-mates-x5 .x5-wrap{display:flex;flex-direction:column;align-items:center;gap:.8rem;width:100%;max-width:62rem}
.g-mates-x5 .x5-stage{display:grid;grid-template-columns:1fr minmax(11rem,20rem) 1fr;gap:.6rem;align-items:center;width:100%}
.g-mates-x5 .x5-side{background:#fff;border-radius:1.6rem;border:.2rem solid var(--line);box-shadow:0 .4rem 0 var(--line);padding:.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;min-height:9rem;transition:transform .2s,background .2s}
.g-mates-x5 .x5-side.win{background:#E8F9EC;border-color:#5CC77A;transform:scale(1.05)}
.g-mates-x5 .x5-n{font-family:'Baloo 2';font-weight:800;font-size:3.4rem;line-height:1}
.g-mates-x5 .x5-n.sm{font-size:2.6rem}
.g-mates-x5 .x5-objs{display:flex;flex-wrap:wrap;gap:.1rem;justify-content:center;max-width:15rem}
.g-mates-x5 .x5-o{width:min(2.8rem,6.2vw);height:min(2.8rem,6.2vw);display:block}
.g-mates-x5 .x5-o svg{width:100%;height:100%}
.g-mates-x5 .x5-croc{position:relative;width:100%}
.g-mates-x5 .x5-croc .x5-svg{width:100%;height:auto;transition:transform .35s}
.g-mates-x5 .x5-croc.left .x5-svg{transform:scaleX(-1)}
.g-mates-x5 .x5-in{transform:scaleY(0);transition:transform .35s}.g-mates-x5 .x5-croc.open .x5-in{transform:scaleY(1)}
.g-mates-x5 .x5-up{transition:transform .35s cubic-bezier(.3,1.5,.5,1)}
.g-mates-x5 .x5-croc.open .x5-up{transform:rotate(-30deg)}
.g-mates-x5 .x5-croc.munch .x5-up{animation:x5-munch .5s 2}
@keyframes x5-munch{50%{transform:rotate(-4deg)}}
.g-mates-x5 .x5-croc.eq .x5-svg{animation:bounce .8s 2}
.g-mates-x5 .x5-ops{display:flex;gap:1rem;justify-content:center}
.g-mates-x5 .x5-op{width:min(6.6rem,26vw);height:min(5.6rem,16vw);border-radius:1.6rem;font-family:'Baloo 2';font-weight:800;font-size:3.4rem;line-height:1;box-shadow:0 .4rem 0 rgba(20,35,91,.16);transition:transform .12s;display:flex;align-items:center;justify-content:center}
.g-mates-x5 .x5-op:nth-child(1){background:var(--a1)}.g-mates-x5 .x5-op:nth-child(2){background:var(--a2)}.g-mates-x5 .x5-op:nth-child(3){background:var(--a3)}
.g-mates-x5 .x5-op:hover{transform:translateY(-.15rem)}
.g-mates-x5 .x5-op.right{background:#BDEFC8!important;box-shadow:0 .4rem 0 #5CC77A;animation:pop .5s}
.g-mates-x5 .x5-op.bad{background:#FFD3CF!important;animation:shake .4s}
.g-mates-x5 .x5-op.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .45rem #FFD23F}
.g-mates-x5 .x5-op[disabled]{pointer-events:none}
.g-mates-x5 .x5-tip{color:var(--ink2);font-size:1.1rem;text-align:center}
@media (max-width:640px){.g-mates-x5 .x5-stage{grid-template-columns:1fr 1fr}.g-mates-x5 .x5-croc{grid-column:1/3;grid-row:1;max-width:11rem;margin:0 auto}.g-mates-x5 .x5-n{font-size:2.6rem}}
`);

function make(lv, i) {
  for (let t = 0; t < 60; t++) {
    let q;
    if (lv === 1) { const a = U.rnd(1, 10), b = U.rnd(1, 10); q = { a, b, kind: Math.random() < .6 ? 'obj' : 'num' }; }
    else if (lv === 2) {
      const a = U.rnd(1, 20); let b = Math.random() < .25 ? a : U.rnd(1, 20);
      q = { a, b, kind: a <= 10 && b <= 10 && Math.random() < .4 ? 'obj' : 'num' };
    } else {
      if (i % 2 === 1) {
        const mk = () => { const x = U.rnd(1, 9), y = U.rnd(1, 9); return [x, y]; };
        const [x, y] = mk(); let [z, w] = mk();
        if (Math.random() < .25) { z = U.rnd(1, 9); w = x + y - z; if (w < 1 || w > 9) { z = x; w = y; } }
        q = { kind: 'sum', ex: [x, y], ey: [z, w], a: x + y, b: z + w };
      } else {
        const a = U.rnd(10, 100); let b;
        const r = Math.random();
        b = r < .2 ? a : r < .6 ? (a - a % 10) + U.rnd(0, 9) : U.rnd(10, 100);
        if (b > 100) b = 100;
        q = { a, b, kind: 'num' };
      }
    }
    q.ans = q.a > q.b ? '>' : q.a < q.b ? '<' : '=';
    const key = q.kind + q.a + '_' + q.b;
    if (key !== lastKey && (lv === 1 ? q.a !== q.b : true)) { lastKey = key; return q; }
  }
  return { a: 7, b: 4, kind: 'num', ans: '>' };
}

Kids.game({
  id: 'mates-x5', group: 'mates', num: 10,
  title: 'Mayor, menor o igual',
  blurb: 'El cocodrilo siempre se come al número más grande. ¿Hacia dónde abre la boca?',
  how: 'Mira los dos números. El cocodrilo abre la boca hacia el más grande. Toca mayor, menor o igual.',
  icon: 'turtle',
  levels: ['Hasta 10', 'Hasta 20, con igual', 'Hasta 100 y sumas'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, q = make(lv, i);
    let obj; do { obj = U.pick(OBJ); } while (obj === lastObj); lastObj = obj;
    g.ask(q.kind === 'sum' ? '¿Qué suma es más grande?' : q.kind === 'obj' ? '¿Dónde hay más?' : '¿Cuál número es más grande?');
    const wrap = U.el('<div class="x5-wrap"></div>'); g.area.appendChild(wrap);
    const side = (n, e) => {
      let inner;
      if (q.kind === 'obj') inner = `<div class="x5-objs">${U.range(n).map(() => `<span class="x5-o">${A.get(obj)}</span>`).join('')}</div><div class="x5-n sm">${n}</div>`;
      else if (q.kind === 'sum') inner = `<div class="x5-n">${e[0]}+${e[1]}</div>`;
      else inner = `<div class="x5-n">${n}</div>`;
      return U.el(`<div class="x5-side" aria-label="${q.kind === 'sum' ? e[0] + ' más ' + e[1] : n}">${inner}</div>`);
    };
    const L = side(q.a, q.ex), R = side(q.b, q.ey);
    const croc = U.el(`<div class="x5-croc" aria-hidden="true">${A.get('mx5-croc')}</div>`);
    const stage = U.el('<div class="x5-stage"></div>');
    stage.append(L, croc, R); wrap.appendChild(stage);
    wrap.appendChild(U.el('<div class="x5-tip">&gt; mayor &nbsp;·&nbsp; &lt; menor &nbsp;·&nbsp; = igual</div>'));
    const ops = U.el('<div class="x5-ops"></div>');
    const defs = lv === 1 ? ['>', '<'] : ['>', '<', '='];
    const names = { '>': 'Mayor que: el de la izquierda es más grande', '<': 'Menor que: el de la derecha es más grande', '=': 'Igual' };
    const btns = defs.map(o => {
      const b = U.el(`<button class="x5-op" aria-label="${names[o]}">${o === '>' ? '&gt;' : o === '<' ? '&lt;' : '='}</button>`);
      b.onclick = () => {
        croc.classList.remove('open', 'left', 'munch', 'eq');
        if (o === '>') croc.classList.add('left', 'open'); else if (o === '<') croc.classList.add('open'); else croc.classList.add('eq');
        void croc.offsetWidth;
        Kids.sound.tone && Kids.sound.tone(o === '=' ? 440 : 300, 0, .15, 'triangle', .15);
        if (o === q.ans) {
          btns.forEach(x => x.disabled = true); b.classList.add('right');
          const w = q.ans === '>' ? L : q.ans === '<' ? R : null;
          if (w) w.classList.add('win'); else { L.classList.add('win'); R.classList.add('win'); }
          if (w) croc.classList.add('munch');
          g.right();
        } else {
          b.classList.add('bad'); b.disabled = true; g.wrong();
          g.t(() => croc.classList.remove('open', 'left', 'eq'), 900);
        }
      };
      ops.appendChild(b); return b;
    });
    wrap.appendChild(ops);
    g.helpHint = () => {
      g.toast(q.ans === '=' ? 'Los dos son iguales, ¡nadie come más!' : `El más grande es el ${q.ans === '>' ? 'de la izquierda' : 'de la derecha'}: ${Math.max(q.a, q.b)}`);
      btns.forEach(b => { if (b.innerHTML.replace('&gt;', '>').replace('&lt;', '<') === q.ans && !b.disabled) b.classList.add('hint'); });
      (q.ans === '>' ? L : q.ans === '<' ? R : null) && (q.ans === '>' ? L : R).classList.add('win');
    };
  }
});
})();
