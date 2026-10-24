/* Mates X13 — Bingo de sumas */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

const STAMPS = ['#FF7E69', '#8C7BE0', '#47B5BF', '#F2B93B', '#FF7EA8', '#5CC77A'];
const BALLS = ['#FF7E69', '#4C8DF6', '#8C7BE0', '#47B5BF', '#FFB02E', '#FF7EA8'];

A.add({
  'mx13-stamp': c => `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="${c}" opacity=".88"/><circle cx="50" cy="50" r="42" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round" opacity=".7"/> <path d="M50 20l9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3z" fill="#fff" opacity=".95"/></svg>`
});

Kids.css(`
.g-mates-x13{gap:.8rem}
.g-mates-x13 .bg-top{display:flex;align-items:center;gap:1.2rem;justify-content:center;flex-wrap:wrap}
.g-mates-x13 .bg-ball{width:8.2rem;height:8.2rem;border-radius:50%;background:radial-gradient(circle at 32% 28%,#fff 0 9%,var(--bc,#FF7E69) 10% 100%);box-shadow:0 .5rem 0 rgba(20,35,91,.18),inset 0 -.6rem 0 rgba(0,0,0,.1);display:flex;align-items:center;justify-content:center;position:relative;padding:0}
.g-mates-x13 .bg-ball .in{background:#fff;border-radius:999px;padding:.1rem .8rem;font-family:'Baloo 2';font-weight:800;font-size:1.9rem;line-height:1.2;color:var(--ink);white-space:nowrap}
.g-mates-x13 .bg-ball.roll{animation:bgroll .9s cubic-bezier(.3,1.3,.5,1) both}
@keyframes bgroll{0%{transform:translate(-14rem,-3rem) rotate(-540deg) scale(.6);opacity:0}70%{opacity:1}100%{transform:none}}
.g-mates-x13 .bg-info{display:flex;flex-direction:column;gap:.35rem;align-items:flex-start;font-family:'Baloo 2';line-height:1}
.g-mates-x13 .bg-hist{display:flex;gap:.3rem;flex-wrap:wrap;max-width:15rem;min-height:1.6rem}
.g-mates-x13 .bg-hist span{background:#fff;border-radius:999px;padding:.1rem .6rem;font-size:.95rem;box-shadow:0 .15rem 0 var(--line)}
.g-mates-x13 .bg-count{font-size:1.1rem;color:var(--ink2)}
.g-mates-x13 .bg-card{background:#fff;border-radius:1.8rem;padding:.7rem .8rem .9rem;box-shadow:0 .5rem 0 var(--line);border:.2rem solid var(--line)}
.g-mates-x13 .bg-title{display:flex;justify-content:center;gap:.3rem;margin-bottom:.5rem}
.g-mates-x13 .bg-title i{font-style:normal;width:2rem;height:2rem;border-radius:50%;color:#fff;font-family:'Baloo 2';font-weight:800;font-size:1.2rem;line-height:2rem;text-align:center}
.g-mates-x13 .bg-grid{display:grid;grid-template-columns:repeat(3,var(--cs,5.6rem));gap:.4rem}
.g-mates-x13 .bg-cell{width:var(--cs,5.6rem);height:var(--cs,5.6rem);border-radius:1.2rem;font-family:'Baloo 2';font-weight:800;font-size:2.4rem;color:var(--ink);position:relative;box-shadow:0 .25rem 0 rgba(20,35,91,.14);transition:transform .12s;padding:0;display:flex;align-items:center;justify-content:center}
.g-mates-x13 .bg-cell:nth-child(4n+1){background:var(--a1)}
.g-mates-x13 .bg-cell:nth-child(4n+2){background:var(--a2)}
.g-mates-x13 .bg-cell:nth-child(4n+3){background:var(--a3)}
.g-mates-x13 .bg-cell:nth-child(4n+4){background:var(--a4)}
.g-mates-x13 .bg-cell:hover{transform:translateY(-.1rem)}
.g-mates-x13 .bg-cell .st{position:absolute;inset:6%;pointer-events:none;animation:bgstamp .4s cubic-bezier(.3,1.6,.5,1) both}
.g-mates-x13 .bg-cell .st svg{width:100%;height:100%;display:block}
@keyframes bgstamp{0%{transform:scale(2.2) rotate(-20deg);opacity:0}100%{transform:none;opacity:1}}
.g-mates-x13 .bg-cell.bad{background:#FFD3CF!important}
.g-mates-x13 .bg-cell.stamped{box-shadow:none}
.g-mates-x13 .bg-cell.line{outline:.28rem solid var(--yellow);outline-offset:.05rem}
.g-mates-x13 .bg-cell.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .4rem #FFD23F}
.g-mates-x13 .bg-dots{display:flex;gap:.3rem;flex-wrap:wrap;align-items:center;justify-content:center;min-height:1.6rem}
.g-mates-x13 .bg-dots i{width:1.1rem;height:1.1rem;border-radius:50%;background:var(--g);display:inline-block;animation:pop .3s both}
.g-mates-x13 .bg-dots i.x{background:#ddd;position:relative}
.g-mates-x13 .bg-dots b{font-family:'Baloo 2';font-size:1.3rem;padding:0 .2rem}
@media (max-width:640px){.g-mates-x13 .bg-ball{width:6.2rem;height:6.2rem}.g-mates-x13 .bg-ball .in{font-size:1.5rem}.g-mates-x13 .bg-grid{--cs:4.6rem}.g-mates-x13 .bg-cell{font-size:2rem}.g-mates-x13 .bg-top{gap:.6rem}}
`);

function expr(r, lv) {
  let sub = false;
  if (lv === 3) sub = r < 20 && (r === 1 || Math.random() < .5);
  if (sub) {
    const b = U.rnd(1, Math.min(9, 20 - r));
    return { a: r + b, b, op: '−', r };
  }
  if (lv === 1) { const a = U.rnd(1, r - 1); return { a, b: r - a, op: '+', r }; }
  const lo = Math.max(1, r - 10), hi = Math.min(r - 1, 10);
  const a = U.rnd(lo, hi); return { a, b: r - a, op: '+', r };
}

Kids.game({
  id: 'mates-x13', group: 'mates', num: 18,
  title: 'Bingo de sumas',
  blurb: 'Resuelve la suma de la bola y tacha el resultado en tu cartón.',
  how: 'Sale una bola con una cuenta. Resuélvela y toca ese número en tu cartón para ponerle un sello. Consigue una línea o el cartón entero y ¡bingo!',
  icon: 'mx13-stamp',
  levels: ['Sumas hasta 10 (línea)', 'Sumas hasta 20 (línea)', 'Sumas y restas (cartón lleno)'],
  rounds: 1,
  stars(m) { return m <= 2 ? 3 : m <= 6 ? 2 : 1; },
  round(g) {
    const lv = g.level, N = lv === 1 ? 6 : 9;
    const pool = lv === 1 ? U.range(9, 2) : lv === 2 ? U.range(19, 2) : U.range(20, 1);
    const results = U.sample(pool, N);
    const calls = U.shuffle(results).map(r => expr(r, lv));
    const col = U.pick(STAMPS);
    const lines = lv === 1 ? [[0, 1, 2], [3, 4, 5]]
      : lv === 2 ? [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
      : [U.range(9)];
    const goal = lv === 3 ? 'el cartón entero' : 'una línea';
    const wide = window.innerWidth < 640;

    const top = U.el('<div class="bg-top"></div>');
    const ball = U.el('<button class="bg-ball" aria-label="Bola del bingo: toca para oírla otra vez"><span class="in"></span></button>');
    const info = U.el(`<div class="bg-info"><div class="bg-count"></div><div class="bg-hist" aria-label="Bolas que ya han salido"></div><div class="bg-dots"></div></div>`);
    top.append(ball, info);
    const card = U.el('<div class="bg-card"></div>');
    const title = U.el('<div class="bg-title">' + 'BINGO'.split('').map((c, k) => `<i style="background:${BALLS[k]}">${c}</i>`).join('') + '</div>');
    const grid = U.el(`<div class="bg-grid" style="--cs:${wide ? '4.6rem' : (N === 6 ? '6.2rem' : '5.4rem')}"></div>`);
    card.append(title, grid);
    g.area.append(top, card);

    const cells = results.map((r, k) => {
      const b = U.el(`<button class="bg-cell" aria-label="Número ${r}">${r}</button>`);
      b.dataset.r = r; grid.appendChild(b); return b;
    });
    const stamped = new Set();
    let cur = -1, fails = 0, over = false, callText = '';

    function lineDone() {
      return lines.find(l => l.every(k => stamped.has(k)));
    }
    function nextCall() {
      cur++; fails = 0;
      const c = calls[cur];
      const q = c.a + ' ' + c.op + ' ' + c.b;
      callText = '¿Cuánto es ' + c.a + (c.op === '+' ? ' más ' : ' menos ') + c.b + '?';
      ball.style.setProperty('--bc', BALLS[cur % BALLS.length]);
      ball.querySelector('.in').textContent = q;
      ball.classList.remove('roll'); void ball.offsetWidth; ball.classList.add('roll');
      info.querySelector('.bg-dots').innerHTML = '';
      info.querySelector('.bg-count').textContent = 'Bola ' + (cur + 1) + ' · Busca ' + goal;
      Kids.sound.tone(520, 0, .1, 'triangle'); Kids.sound.tone(700, .1, .12, 'triangle');
      g.ask(callText);
      cells.forEach(c2 => c2.classList.remove('hint'));
    }
    ball.onclick = () => g.say(callText);

    function hint() {
      const c = calls[cur];
      g.toast('Cuenta con calma: ' + c.a + (c.op === '+' ? ' y ' + c.b + ' más' : ' y quita ' + c.b));
      const d = info.querySelector('.bg-dots'); d.innerHTML = '';
      if (c.op === '+') {
        for (let k = 0; k < c.a; k++) d.appendChild(U.el('<i></i>'));
        d.appendChild(U.el('<b>+</b>'));
        for (let k = 0; k < c.b; k++) d.appendChild(U.el('<i style="background:var(--yellow)"></i>'));
      } else {
        for (let k = 0; k < c.a; k++) d.appendChild(U.el(k < c.a - c.b ? '<i></i>' : '<i class="x"></i>'));
      }
      cells.forEach(cl => { if (+cl.dataset.r === c.r && !cl.classList.contains('stamped')) cl.classList.add('hint'); });
    }

    cells.forEach((cl, k) => {
      cl.onclick = () => {
        if (over || cl.classList.contains('stamped')) return;
        const c = calls[cur];
        if (+cl.dataset.r === c.r) {
          cl.classList.add('stamped'); cl.classList.remove('hint'); stamped.add(k);
          cl.appendChild(U.el(`<span class="st">${A.get('mx13-stamp', col)}</span>`));
          Kids.sound.pop();
          info.querySelector('.bg-hist').appendChild(U.el(`<span>${c.a} ${c.op} ${c.b} = ${c.r}</span>`));
          const l = lineDone();
          if (l) {
            over = true; l.forEach(j => cells[j].classList.add('line'));
            if (lv === 3) cells.forEach(x => x.classList.add('line'));
            g.toast('¡BINGO!');
            g.right('¡BINGO!');
          } else g.t(nextCall, 1100);
        } else {
          cl.classList.add('bad'); g.shake(cl); g.t(() => cl.classList.remove('bad'), 500);
          fails++; g.wrong();
          if (fails === 2) hint();
        }
      };
    });
    nextCall();
  }
});
})();
