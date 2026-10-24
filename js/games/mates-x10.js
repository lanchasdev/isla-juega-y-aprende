/* Mates x10 — Pesa en la balanza */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

A.add({
  'mx10-sack': n => `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="92" rx="34" ry="6" fill="rgba(20,35,91,.12)"/><path d="M30 28 Q22 50 18 74 Q16 90 50 90 Q84 90 82 74 Q78 50 70 28Z" fill="#E7C28B" stroke="#C99A5E" stroke-width="2.5"/><path d="M32 26 Q50 38 68 26 L64 14 Q50 22 36 14Z" fill="#D9AB6E" stroke="#C99A5E" stroke-width="2.5"/><path d="M36 24 Q50 30 64 24" stroke="#B5473A" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="28" y="46" width="44" height="26" rx="9" fill="#fff"/><text x="50" y="66" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="${String(n).length > 2 ? 18 : 22}" fill="#14235B">${n} kg</text></svg>`,
  'mx10-w': n => {
    const c = { 1: ['#FFD23F', '#E0A800'], 2: ['#8CC4F5', '#4C8DF6'], 5: ['#FF9DB5', '#E5648A'] }[n];
    return `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="90" rx="34" ry="5" fill="rgba(20,35,91,.12)"/><path d="M26 84 L34 40 H66 L74 84Z" fill="${c[0]}" stroke="${c[1]}" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="32" r="11" fill="none" stroke="${c[1]}" stroke-width="6"/><text x="50" y="72" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="30" fill="#14235B">${n}</text></svg>`;
  }
});

const AN = {
  whale: ['la ballena', 'H'], elephant: ['el elefante', 'H'], giraffe: ['la jirafa', 'H'], horse: ['el caballo', 'H'], cow: ['la vaca', 'H'], bear: ['el oso', 'H'],
  lion: ['el león', 'M'], pig: ['el cerdito', 'M'], sheep: ['la oveja', 'M'], dog: ['el perro', 'M'], monkey: ['el mono', 'M'],
  cat: ['el gato', 'L'], duck: ['el patito', 'L'], rabbit: ['el conejo', 'L'], chick: ['el pollito', 'L'], mouse: ['el ratón', 'L'], bee: ['la abeja', 'L'], butterfly: ['la mariposa', 'L']
};
const TIER = { H: 3, M: 2, L: 1 };
const byTier = t => Object.keys(AN).filter(k => AN[k][1] === t);
const cap = s => s.replace(/^./, c => c.toUpperCase());

Kids.css(`
.g-mates-x10 .x10-bal{width:min(36rem,92%);height:auto;max-height:40vh;flex:none;overflow:visible}
.g-mates-x10 .x10-bal .beam,.g-mates-x10 .x10-bal .pan{transition:transform 1.1s cubic-bezier(.34,1.45,.55,1)}
.g-mates-x10 .x10-pics{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;width:100%}
.g-mates-x10 .x10-pics .pic{width:min(11rem,29vw);min-height:6.5rem;position:relative}
.g-mates-x10 .x10-pics .pic svg{max-width:6rem;max-height:6rem}
.g-mates-x10 .x10-pics .pic .lbl{font-size:1.2rem}
.g-mates-x10 .x10-pics .pic.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .35rem var(--yellow),0 .4rem 0 var(--line)}
.g-mates-x10 .x10-pics .pic[disabled]{opacity:.9}
.g-mates-x10 .x10-rank{position:absolute;left:-.5rem;top:-.5rem;width:2.2rem;height:2.2rem;border-radius:50%;background:var(--g);color:#fff;font-family:'Baloo 2';font-size:1.4rem;display:flex;align-items:center;justify-content:center;border:.15rem solid #fff;animation:pop .3s both}
.g-mates-x10 .x10-wts{display:flex;gap:.9rem;justify-content:center;align-items:center;flex-wrap:wrap}
.g-mates-x10 .x10-wb{width:5.2rem;height:5.8rem;border-radius:1.2rem;background:#fff;box-shadow:0 .35rem 0 var(--line);border:.2rem solid var(--line);padding:.2rem;display:flex;align-items:center;justify-content:center}
.g-mates-x10 .x10-wb svg{width:100%;height:100%}
.g-mates-x10 .x10-wb:active{transform:translateY(.2rem)}
.g-mates-x10 .x10-wb.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .35rem var(--yellow),0 .35rem 0 var(--line)}
.g-mates-x10 .x10-on{display:flex;gap:.3rem;align-items:center;justify-content:center;flex-wrap:wrap;min-height:2.8rem;font-family:'Baloo 2';font-size:1.3rem;color:var(--ink2)}
.g-mates-x10 .x10-on button{width:2.6rem;height:2.6rem;border-radius:50%;font-family:'Baloo 2';font-weight:800;font-size:1.2rem;color:var(--ink);box-shadow:0 .15rem 0 rgba(0,0,0,.18)}
.g-mates-x10 .x10-clear{font-family:'Baloo 2';font-size:1.1rem;padding:.25rem 1rem;border-radius:999px;background:#fff;box-shadow:0 .2rem 0 var(--line);min-height:2.4rem}
.g-mates-x10 .x10-sum{font-family:'Baloo 2';font-size:1.5rem;background:#fff;border-radius:999px;padding:0 1.2rem;box-shadow:var(--shadow)}
@media (max-width:640px){.g-mates-x10 .x10-wb{width:4.4rem;height:5rem}}
`);

function balance() {
  const pan = (cx, k) => `<g class="pan" data-s="${k}" style="transform-origin:${cx}px 70px"><g stroke="#B58A5B" stroke-width="2.5" stroke-linecap="round"><line x1="${cx}" y1="70" x2="${cx - 50}" y2="150"/><line x1="${cx}" y1="70" x2="${cx + 50}" y2="150"/></g><g class="items"></g><path d="M${cx - 58} 150 H${cx + 58} Q${cx + 50} 184 ${cx} 184 Q${cx - 50} 184 ${cx - 58} 150Z" fill="#8C7BE0" style="fill:var(--g)" stroke="rgba(20,35,91,.2)" stroke-width="2"/><ellipse cx="${cx}" cy="150" rx="58" ry="5" fill="rgba(255,255,255,.35)"/></g>`;
  const svg = U.el(`<svg class="x10-bal" viewBox="0 0 400 250" role="img" aria-label="Balanza de dos platillos">
    <ellipse cx="200" cy="240" rx="100" ry="8" fill="rgba(20,35,91,.12)"/>
    <path d="M142 238 L166 212 H234 L258 238Z" fill="#B58A5B"/>
    <rect x="191" y="70" width="18" height="146" rx="7" fill="#C79A66"/>
    <g class="beam" style="transform-origin:200px 70px"><rect x="62" y="63" width="276" height="14" rx="7" fill="#E7B25A" stroke="#C48B2E" stroke-width="2"/>${pan(70, 'L')}${pan(330, 'R')}</g>
    <circle cx="200" cy="70" r="13" fill="#FFD23F" stroke="#E0A800" stroke-width="3"/></svg>`);
  const beam = svg.querySelector('.beam'), pans = { L: svg.querySelector('.pan[data-s=L]'), R: svg.querySelector('.pan[data-s=R]') };
  const nest = (art, x, y, w) => art.replace('<svg ', `<svg x="${x}" y="${y}" width="${w}" height="${w}" `);
  const api = {
    svg,
    tilt(a) { a = Math.max(-14, Math.min(14, a)); beam.style.transform = `rotate(${a}deg)`; pans.L.style.transform = `rotate(${-a}deg)`; pans.R.style.transform = `rotate(${-a}deg)`; },
    items(side, arts, s) {
      const cx = side === 'L' ? 70 : 330; s = s || 62;
      const n = arts.length;
      pans[side].querySelector('.items').innerHTML = arts.map((a, k) => nest(a, cx - n * s / 2 + k * s, 154 - s, s)).join('');
    },
    grid(side, arts, s) {
      const cx = side === 'L' ? 70 : 330, per = 3;
      pans[side].querySelector('.items').innerHTML = arts.map((a, k) => { const r = Math.floor(k / per), c = k % per, inRow = Math.min(per, arts.length - r * per); return nest(a, cx - inRow * s / 2 + c * s, 154 - s * (r + 1), s); }).join('');
    }
  };
  api.tilt(0);
  return api;
}

function pic(key, labelText, artStr) {
  return U.el(`<button class="pic big" aria-label="${labelText}">${artStr}<span class="lbl">${cap(labelText)}</span></button>`);
}

Kids.game({
  id: 'mates-x10', group: 'mates', num: 15,
  title: 'Pesa en la balanza',
  blurb: 'Mira cómo se inclina la balanza y descubre qué pesa más.',
  how: 'Mira la balanza. Toca lo que pesa más, ordena de más a menos pesado, o pon pesas para equilibrarla.',
  icon: 'elephant',
  levels: ['¿Qué pesa más?', 'Ordenar tres', 'Equilibrar con pesas'],
  rounds: 7,
  round(g, i) {
    if (g.level === 1) lv1(g, i); else if (g.level === 2) lv2(g, i); else if (i % 3 === 2) cmpKg(g); else weigh(g);
  }
});

let last = '';
function lv1(g, i) {
  const more = i % 3 !== 2;
  let h, l;
  do { h = U.pick(byTier('H')); l = U.pick(byTier('L')); } while (h + l === last); last = h + l;
  const pair = U.shuffle([h, l]);
  const bal = balance(); g.area.appendChild(bal.svg);
  bal.items('L', [A.get(pair[0])]); bal.items('R', [A.get(pair[1])]);
  g.ask(more ? '¿Qué pesa más?' : '¿Qué pesa menos?');
  const row = U.el('<div class="x10-pics"></div>'); g.area.appendChild(row);
  const target = more ? h : l;
  const btns = pair.map(k => {
    const b = pic(k, AN[k][0], A.get(k));
    b.onclick = () => {
      if (k === target) {
        btns.forEach(x => x.disabled = true); b.classList.add('right');
        bal.tilt(pair[0] === h ? -14 : 14); Kids.sound.tone(300, 0, .3, 'sine', .1);
        g.t(() => g.right(cap(AN[h][0]) + ' pesa más'), 1300);
      } else { b.classList.add('bad'); b.disabled = true; g.wrong(); bal.tilt(0); }
    };
    row.appendChild(b); return b;
  });
  g.helpHint = () => {
    g.toast('Mira: ¿cuál es más grande?'); bal.tilt(pair[0] === h ? -9 : 9);
    btns.forEach((b, k) => { if (pair[k] === target && !b.disabled) b.classList.add('hint'); });
  };
}

function lv2(g, i) {
  const asc = i % 3 === 2;
  const trio = [U.pick(byTier('H')), U.pick(byTier('M')), U.pick(byTier('L'))];
  const order = asc ? trio.slice().reverse() : trio.slice(); // orden correcto a tocar
  const shown = U.shuffle(trio);
  const bal = balance(); g.area.appendChild(bal.svg);
  g.ask(asc ? 'Toca de MENOS a MÁS pesado' : 'Toca de MÁS a MENOS pesado');
  const row = U.el('<div class="x10-pics"></div>'); g.area.appendChild(row);
  let step = 0;
  const btns = shown.map(k => {
    const b = pic(k, AN[k][0], A.get(k));
    b.onclick = () => {
      if (b.disabled || step >= 2) return;
      if (k !== order[step]) { b.classList.add('bad'); g.wrong(); g.t(() => b.classList.remove('bad'), 450); return; }
      b.classList.remove('hint'); b.disabled = true; b.classList.add('right'); b.appendChild(U.el(`<span class="x10-rank">${step + 1}</span>`));
      Kids.sound.pop();
      if (step === 0) { bal.items('L', [A.get(k)]); bal.items('R', []); bal.tilt(asc ? 10 : -10); }
      else {
        const prev = order[step - 1];
        // prev ocupa el platillo izquierdo; k el derecho
        bal.items('L', [A.get(prev)]); bal.items('R', [A.get(k)]); bal.tilt(asc ? 12 : -12);
      }
      step++;
      if (step === 2) {
        const lastK = order[2], lb = btns.find(x => !x.disabled);
        g.t(() => { lb.disabled = true; lb.classList.add('right'); lb.appendChild(U.el('<span class="x10-rank">3</span>')); bal.items('L', [A.get(order[1])]); bal.items('R', [A.get(lastK)]); bal.tilt(asc ? 12 : -12); g.t(() => g.right(), 1200); }, 600);
      }
    };
    row.appendChild(b); return b;
  });
  g.helpHint = () => {
    g.toast(asc ? 'Empieza por el más ligero' : 'Empieza por el más grande');
    btns.forEach((b, k) => { if (shown[k] === order[step] && !b.disabled) b.classList.add('hint'); });
  };
}

function cmpKg(g) {
  const a = U.rnd(2, 20); let b; do { b = U.rnd(2, 20); } while (Math.abs(a - b) < 2);
  const bal = balance(); g.area.appendChild(bal.svg);
  bal.items('L', [A.get('mx10-sack', a)], 70); bal.items('R', [A.get('mx10-sack', b)], 70);
  g.ask('¿Qué saco pesa más: el de ' + a + ' kg o el de ' + b + ' kg?');
  const row = U.el('<div class="opts"></div>'); g.area.appendChild(row);
  const btns = [a, b].map((v, k) => {
    const bt = U.el(`<button class="ans" style="font-size:2.4rem" aria-label="El saco de ${v} kilos">${v} kg</button>`);
    bt.onclick = () => {
      if (v === Math.max(a, b)) { btns.forEach(x => x.disabled = true); bt.classList.add('right'); bal.tilt(a > b ? -14 : 14); g.t(() => g.right(), 1300); }
      else { bt.classList.add('bad'); bt.disabled = true; g.wrong(); }
    };
    row.appendChild(bt); return bt;
  });
  g.helpHint = () => { g.toast('Mira los números: ¿cuál es mayor?'); bal.tilt(a > b ? -8 : 8); };
}

function weigh(g) {
  const N = U.rnd(3, 14);
  const bal = balance(); g.area.appendChild(bal.svg);
  bal.items('L', [A.get('mx10-sack', N)], 74);
  g.ask('El saco pesa ' + N + ' kg. Pon pesas en el otro platillo hasta equilibrar la balanza.');
  const placed = [];
  let done = false;
  const sum = () => placed.reduce((s, v) => s + v, 0);
  const info = U.el('<div class="x10-sum"></div>');
  const wts = U.el('<div class="x10-wts"></div>');
  const on = U.el('<div class="x10-on"></div>');
  const clear = U.el('<button class="x10-clear" aria-label="Quitar todas las pesas">Quitar todas</button>');
  const refresh = () => {
    info.innerHTML = 'Pesas: <b>' + sum() + ' kg</b>';
    bal.grid('R', placed.map(v => A.get('mx10-w', v)), 38);
    bal.tilt((sum() - N) * 5);
    on.innerHTML = '';
    placed.forEach((v, k) => {
      const b = U.el(`<button aria-label="Quitar la pesa de ${v} kilos" style="background:${{ 1: '#FFD23F', 2: '#8CC4F5', 5: '#FF9DB5' }[v]}">${v}</button>`);
      b.onclick = () => { if (done) return; placed.splice(k, 1); Kids.sound.tap(); refresh(); };
      on.appendChild(b);
    });
  };
  const need = () => N - sum();
  [1, 2, 5].forEach(v => {
    const b = U.el(`<button class="x10-wb" aria-label="Poner una pesa de ${v} kilos">${A.get('mx10-w', v)}</button>`);
    b.dataset.v = v;
    b.onclick = () => {
      if (done) return;
      placed.push(v); Kids.sound.pop(); wts.querySelectorAll('.hint').forEach(x => x.classList.remove('hint')); refresh();
      const s = sum();
      if (s === N) { done = true; g.right('¡Equilibrio perfecto!'); }
      else if (s > N) g.wrong('¡Nos pasamos! Quita alguna pesa tocándola.');
    };
    wts.appendChild(b);
  });
  clear.onclick = () => { if (done) return; placed.length = 0; refresh(); };
  g.area.appendChild(info); g.area.appendChild(wts); g.area.appendChild(on); g.area.appendChild(clear);
  refresh();
  g.helpHint = () => {
    const r = need();
    if (r < 0) { g.toast('Quita alguna pesa: la balanza se ha pasado'); return; }
    const v = [5, 2, 1].find(x => x <= r);
    g.toast('Prueba con la pesa de ' + v + ' kg');
    wts.querySelectorAll('.x10-wb').forEach(b => { if (+b.dataset.v === v) b.classList.add('hint'); });
  };
}
})();
