/* Juego mates-5: Ordena los números — globos */
(function () {
'use strict';
const U = Kids.util;
const COLORS = ['#FF7E69', '#FFC21A', '#4C8DF6', '#5CC77A', '#B28BF0', '#FF7EA8', '#47B5BF'];

Kids.css(`
.g-mates-5{gap:.9rem}
.g-mates-5 .row{flex:none;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap;align-items:center;background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line);padding:.6rem 1rem}
.g-mates-5 .row .slot{width:4.6rem;height:4.6rem;font-size:2.4rem;color:var(--ink)}
.g-mates-5 .row .slot b{animation:pop .45s}
.g-mates-5 .dir{font-family:'Baloo 2';font-size:1.2rem;background:var(--gl);padding:.1rem 1rem;border-radius:999px}
.g-mates-5 .scene.sky{flex:1 0 auto;min-height:14rem;display:flex;flex-wrap:wrap;gap:.4rem 1.2rem;justify-content:center;align-content:center;padding:1rem}
.g-mates-5 .cloud{position:absolute;opacity:.9;width:7rem;pointer-events:none}
.g-mates-5 .bal{position:relative;width:min(10.5rem,25vw);aspect-ratio:1/1.15;padding:0;flex:none;animation:g5bob 3.4s ease-in-out infinite;z-index:2}
.g-mates-5 .bal svg{width:100%;height:100%;display:block;pointer-events:none}
.g-mates-5 .bal span{position:absolute;left:0;right:0;top:14%;text-align:center;font-family:'Baloo 2';font-weight:800;font-size:3rem;line-height:1.1;color:#fff;text-shadow:0 .1rem .25rem rgba(20,35,91,.5);pointer-events:none}
.g-mates-5 .bal:active{transform:scale(.94)}
.g-mates-5 .bal.no{animation:shake .4s}
.g-mates-5 .bal.hint svg{animation:pulse .8s infinite}
.g-mates-5 .bal.gone{visibility:hidden;pointer-events:none}
.g-mates-5 .bal.popping{animation:g5pop .35s forwards}
.g-mates-5 .spark{position:absolute;width:.7rem;height:.7rem;border-radius:50%;animation:conf .6s ease-out forwards;pointer-events:none;z-index:5}
@keyframes g5bob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-.8rem) rotate(2deg)}}
@keyframes g5pop{0%{transform:scale(1)}40%{transform:scale(1.3)}100%{transform:scale(1.6);opacity:0}}
@media (max-width:640px){.g-mates-5 .bal span{font-size:2rem}.g-mates-5 .row .slot{width:3.6rem;height:3.6rem;font-size:1.9rem}}
`);

Kids.game({
  id: 'mates-5', group: 'mates', num: 5, title: 'Ordena los números',
  blurb: 'Toca los globos en orden, del número más pequeño al más grande.',
  how: 'Toca los globos en orden. Mira la pregunta: a veces se empieza por el número más pequeño y a veces por el más grande.',
  icon: 'balloon', levels: ['Del 1 al 5', 'Hasta 10', 'Hasta 20 y al revés'], rounds: 5,

  round(g, i) {
    const L = g.level;
    let nums, desc = false;
    if (L === 1) nums = U.range(5, 1);
    else if (L === 2) nums = U.sample(U.range(10, 1), 5);
    else { nums = U.sample(U.range(20, 1), 6); desc = Math.random() < 0.5; }
    const order = nums.slice().sort((a, b) => desc ? b - a : a - b);
    g.ask(desc ? 'Toca los globos del número más grande al más pequeño' : 'Toca los globos del número más pequeño al más grande');

    const row = U.el('<div class="row"></div>');
    const dir = U.el(`<span class="dir">${desc ? 'Mayor → menor' : 'Menor → mayor'}</span>`);
    const slots = order.map(() => { const s = U.el('<div class="slot"></div>'); return s; });
    row.append(dir, ...slots);
    const sky = U.el('<div class="scene sky"></div>');
    sky.insertAdjacentHTML('beforeend', `<div class="cloud" style="left:4%;top:8%">${Kids.art.get('cloud')}</div><div class="cloud" style="right:6%;bottom:6%;width:5rem">${Kids.art.get('cloud')}</div>`);
    g.area.append(row, sky);

    const cols = U.shuffle(COLORS);
    let next = 0;
    const bals = U.shuffle(nums).map((n, k) => {
      const col = cols[k % cols.length];
      const b = U.el(`<button class="bal" data-n="${n}" aria-label="Globo ${n}">${Kids.art.get('balloon', col)}<span>${n}</span></button>`);
      b.style.animationDelay = (-Math.random() * 3) + 's'; b.style.animationDuration = (3 + Math.random() * 1.6) + 's';
      b.style.marginTop = U.rnd(0, 1.2 * 10) / 10 + 'rem';
      b._col = col; sky.appendChild(b); return b;
    });
    bals.forEach(b => b.onclick = () => {
      if (b.classList.contains('gone') || next >= order.length) return;
      if (+b.dataset.n === order[next]) {
        bals.forEach(x => x.classList.remove('hint'));
        const r = b.getBoundingClientRect(), sr = sky.getBoundingClientRect();
        for (let k = 0; k < 8; k++) {
          const p = U.el('<i class="spark"></i>'), a = k / 8 * 6.28;
          p.style.left = (r.left - sr.left + r.width / 2) + 'px'; p.style.top = (r.top - sr.top + r.height / 3) + 'px';
          p.style.background = b._col; p.style.setProperty('--dx', Math.cos(a) * 50 + 'px'); p.style.setProperty('--dy', Math.sin(a) * 50 + 'px'); p.style.setProperty('--r', '0deg');
          sky.appendChild(p); g.t(() => p.remove(), 700);
        }
        Kids.sound.pop(); b.classList.add('popping'); g.t(() => b.classList.add('gone'), 330);
        slots[next].classList.add('filled'); slots[next].innerHTML = `<b>${b.dataset.n}</b>`;
        next++;
        if (next === order.length) g.right();
      } else {
        b.classList.remove('no'); void b.offsetWidth; b.classList.add('no'); g.t(() => b.classList.remove('no'), 450);
        g.wrong(desc ? 'Mira bien: empieza por el más grande' : 'Mira bien: empieza por el más pequeño');
      }
    });
    g.helpHint = () => {
      const t = bals.find(b => +b.dataset.n === order[next] && !b.classList.contains('gone'));
      if (t) t.classList.add('hint');
    };
  }
});
})();
