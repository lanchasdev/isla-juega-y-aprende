/* Mates X15 — Gráfica de frutas */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;

const FR = [
  { a: 'apple', nm: 'Manzanas', pl: 'manzanas', g: 'f', c: '#FF8A80', d: '#E5534B' },
  { a: 'pear', nm: 'Peras', pl: 'peras', g: 'f', c: '#CDE67F', d: '#9CC23B' },
  { a: 'banana', nm: 'Plátanos', pl: 'plátanos', g: 'm', c: '#FFE066', d: '#E8B800' },
  { a: 'orange', nm: 'Naranjas', pl: 'naranjas', g: 'f', c: '#FFB866', d: '#F08A1C' },
  { a: 'strawberry', nm: 'Fresas', pl: 'fresas', g: 'f', c: '#FF9DB3', d: '#E8506F' },
  { a: 'cherry', nm: 'Cerezas', pl: 'cerezas', g: 'f', c: '#E58AB0', d: '#C23A74' },
  { a: 'grapes', nm: 'Uvas', pl: 'uvas', g: 'f', c: '#BBA6F2', d: '#7E5FD6' },
  { a: 'watermelon', nm: 'Sandías', pl: 'sandías', g: 'f', c: '#8FDDA4', d: '#3FAE63' }
];
let lastKey = '';

Kids.css(`
.g-mates-x15{gap:.8rem}
.g-mates-x15 .fg-card{width:min(36rem,96%);padding:.6rem .6rem .5rem}
.g-mates-x15 .fg-card svg.chart{display:block;width:100%;height:auto;font-family:'Baloo 2','Nunito',sans-serif}
.g-mates-x15 .fg-cap{text-align:center;font-family:'Baloo 2';font-size:1rem;color:var(--ink2);line-height:1;margin-top:.1rem}
.g-mates-x15 .opts.fr .pic{min-width:6.2rem;padding:.4rem .7rem;font-size:1.25rem;cursor:pointer}
.g-mates-x15 .opts.fr .pic svg{max-width:4.6rem;max-height:4.6rem}
.g-mates-x15 .opts .ans.hint,.g-mates-x15 .opts .pic.hint{animation:pulse 1s infinite;box-shadow:0 0 0 .5rem #FFD23F}
@media (max-width:640px){.g-mates-x15 .opts.fr{gap:.6rem}.g-mates-x15 .opts.fr .pic{min-width:5rem}.g-mates-x15 .opts.fr .pic svg{max-width:3.4rem;max-height:3.4rem}}
`);

function choices(c, count, max) {
  const pool = [];
  for (let d = -4; d <= 4; d++) { const v = c + d; if (d && v >= 1 && v <= max) pool.push(v); }
  const near = U.shuffle(pool.filter(v => Math.abs(v - c) <= 1)), rest = U.shuffle(pool.filter(v => Math.abs(v - c) > 1));
  return U.shuffle([c].concat(near, rest).slice(0, count));
}

const icon = (name, x, y, s) => A.get(name).replace('<svg', `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}"`);

Kids.game({
  id: 'mates-x15', group: 'mates', num: 20,
  title: 'Gráfica de frutas',
  blurb: 'Lee la gráfica de frutas y contesta.',
  how: 'Mira la gráfica de barras. Cada fruta es un voto. Lee con atención y contesta a la pregunta.',
  icon: 'watermelon',
  levels: ['3 frutas, hasta 5', '4 frutas, hasta 8', '5 frutas, hasta 10'],
  rounds: 8,
  round(g, i) {
    const lv = g.level, nF = lv === 1 ? 3 : lv === 2 ? 4 : 5, MAX = lv === 1 ? 5 : lv === 2 ? 8 : 10;
    /* datos */
    let fr, vals, q;
    for (let t = 0; t < 100; t++) {
      fr = U.sample(FR, nF);
      vals = lv === 1 ? U.sample(U.range(5, 1), nF) : U.range(nF).map(() => U.rnd(1, MAX));
      const mx = Math.max(...vals), mn = Math.min(...vals);
      if (vals.filter(v => v === mx).length > 1 || vals.filter(v => v === mn).length > 1) continue;
      const r = Math.random();
      if (lv === 1) q = { t: r < .5 ? 'most' : 'least' };
      else if (lv === 2) q = { t: r < .6 ? 'count' : r < .8 ? 'most' : 'least' };
      else q = { t: r < .4 ? 'diff' : r < .7 ? 'sum' : r < .85 ? 'count' : (Math.random() < .5 ? 'most' : 'least') };
      if (q.t === 'count') q.x = U.rnd(0, nF - 1);
      if (q.t === 'diff') {
        const idx = U.shuffle(U.range(nF)); q.x = idx[0]; q.y = idx[1];
        if (vals[q.x] <= vals[q.y]) { const tmp = q.x; q.x = q.y; q.y = tmp; }
        if (vals[q.x] === vals[q.y]) continue;
      }
      if (q.t === 'sum') { const idx = U.shuffle(U.range(nF)); q.x = idx[0]; q.y = idx[1]; }
      const key = fr.map(f => f.a).join() + vals.join() + q.t + (q.x ?? '') + (q.y ?? '');
      if (key === lastKey) continue;
      lastKey = key; break;
    }

    /* enunciado */
    const cu = f => f.g === 'f' ? 'Cuántas' : 'Cuántos';
    let text, ans, kind = 'num';
    if (q.t === 'most') { text = '¿Qué fruta gusta más?'; kind = 'fruit'; ans = vals.indexOf(Math.max(...vals)); }
    else if (q.t === 'least') { text = '¿Qué fruta gusta menos?'; kind = 'fruit'; ans = vals.indexOf(Math.min(...vals)); }
    else if (q.t === 'count') { text = '¿' + cu(fr[q.x]) + ' ' + fr[q.x].pl + ' hay?'; ans = vals[q.x]; }
    else if (q.t === 'diff') { text = '¿' + cu(fr[q.x]) + ' ' + fr[q.x].pl + ' más hay que ' + fr[q.y].pl + '?'; ans = vals[q.x] - vals[q.y]; }
    else { text = 'Si juntamos ' + fr[q.x].pl + ' y ' + fr[q.y].pl + ', ¿cuántas frutas hay?'; ans = vals[q.x] + vals[q.y]; }
    g.ask(text);

    /* ---- dibujo SVG ---- */
    const W = 480, H = 330, L = 44, R = 10, T = 14, B = 80;
    const pw = W - L - R, ph = H - T - B, uh = ph / MAX, slot = pw / nF, bw = Math.min(slot * .74, 74);
    const cx = k => L + slot * k + slot / 2;
    const yv = v => T + ph - v * uh;
    let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica de barras de frutas">`;
    for (let v = 0; v <= MAX; v++) {
      s += `<line x1="${L}" x2="${W - R}" y1="${yv(v)}" y2="${yv(v)}" stroke="${v === 0 ? '#4B5A8A' : '#E5DDC8'}" stroke-width="${v === 0 ? 3 : 1.5}"${v && v % 5 ? '' : ''}/>`;
      s += `<text x="${L - 9}" y="${yv(v) + 5}" text-anchor="end" font-size="16" font-weight="800" fill="#4B5A8A">${v}</text>`;
    }
    s += `<line x1="${L}" x2="${L}" y1="${T}" y2="${yv(0)}" stroke="#4B5A8A" stroke-width="3"/>`;
    fr.forEach((f, k) => {
      const v = vals[k], x0 = cx(k) - bw / 2, h = v * uh;
      if (lv === 3) {
        s += `<rect x="${x0}" y="${yv(v)}" width="${bw}" height="${h}" rx="9" fill="${f.c}" stroke="${f.d}" stroke-width="2.5"/>`;
        s += icon(f.a, cx(k) - 17, yv(v) - 36, 34);
      } else {
        s += `<rect x="${x0}" y="${yv(v)}" width="${bw}" height="${h}" rx="9" fill="${f.c}" opacity=".35"/>`;
        const is = Math.min(uh, bw) * .94;
        for (let u = 0; u < v; u++) s += icon(f.a, cx(k) - is / 2, yv(u + 1) + (uh - is) / 2, is);
      }
      s += icon(f.a, cx(k) - 17, T + ph + 8, 34);
      s += `<text x="${cx(k)}" y="${T + ph + 62}" text-anchor="middle" font-size="${nF > 4 ? 15 : 17}" font-weight="800" fill="#14235B">${f.nm}</text>`;
    });
    s += `<g class="ov"></g></svg>`;
    const card = U.el(`<div class="card fg-card">${s}<div class="fg-cap">${lv === 3 ? 'Mira hasta dónde llega cada barra en los números.' : 'Cada dibujo es un voto de la clase.'}</div></div>`);
    g.area.appendChild(card);
    const ov = card.querySelector('.ov');
    const NS = 'http://www.w3.org/2000/svg';
    const badge = (x, y, n, col) => {
      const gg = document.createElementNS(NS, 'g'); gg.style.animation = 'pop .3s both'; gg.style.transformOrigin = x + 'px ' + y + 'px';
      gg.innerHTML = `<circle cx="${x}" cy="${y}" r="10.5" fill="${col || '#47B5BF'}" stroke="#fff" stroke-width="2.5"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">${n}</text>`;
      ov.appendChild(gg);
    };
    const cellY = u => yv(u) + uh / 2;   // u = 1..v

    /* ---- respuestas ---- */
    const done = [];
    const optsBox = U.el(`<div class="opts ${kind === 'fruit' ? 'fr' : ''}"></div>`);
    const mark = (b, ok) => {
      if (ok) { done.forEach(x => x.disabled = true); b.classList.add('right'); g.right(); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
    };
    let correctBtn;
    if (kind === 'fruit') {
      U.shuffle(U.range(nF)).forEach(k => {
        const f = fr[k];
        const b = U.el(`<button class="pic" aria-label="${f.pl}">${A.get(f.a)}<span class="lbl">${f.nm}</span></button>`);
        b.onclick = () => mark(b, k === ans);
        optsBox.appendChild(b); done.push(b); if (k === ans) correctBtn = b;
      });
    } else {
      choices(ans, lv === 1 ? 3 : 4, lv === 3 ? 20 : 10).forEach(v => {
        const b = U.el(`<button class="ans" aria-label="${v}">${v}</button>`);
        b.onclick = () => mark(b, v === ans);
        optsBox.appendChild(b); done.push(b); if (v === ans) correctBtn = b;
      });
    }
    g.area.appendChild(optsBox);

    g.helpHint = () => {
      g.toast('Vamos a contar las frutas');
      let steps = [];
      if (kind === 'fruit') {
        fr.forEach((f, k) => steps.push(() => badge(cx(k), yv(vals[k]) - (lv === 3 ? 46 : 12), vals[k], f.d)));
      } else if (q.t === 'count') {
        for (let u = 1; u <= vals[q.x]; u++) steps.push(() => badge(cx(q.x), cellY(u), u, fr[q.x].d));
      } else if (q.t === 'diff') {
        for (let u = vals[q.y] + 1; u <= vals[q.x]; u++) steps.push(() => badge(cx(q.x), cellY(u), u - vals[q.y], '#F26B6B'));
        steps.unshift(() => { const gg = document.createElementNS(NS, 'line'); gg.setAttribute('x1', L); gg.setAttribute('x2', W - R); gg.setAttribute('y1', yv(vals[q.y])); gg.setAttribute('y2', yv(vals[q.y])); gg.setAttribute('stroke', '#F26B6B'); gg.setAttribute('stroke-width', 3); gg.setAttribute('stroke-dasharray', '7 6'); ov.appendChild(gg); });
      } else {
        for (let u = 1; u <= vals[q.x]; u++) steps.push(() => badge(cx(q.x), cellY(u), u, fr[q.x].d));
        for (let u = 1; u <= vals[q.y]; u++) steps.push(() => badge(cx(q.y), cellY(u), vals[q.x] + u, fr[q.y].d));
      }
      steps.forEach((fn, n) => g.t(() => {
        fn(); Kids.sound.pop();
        if (n === steps.length - 1 && correctBtn && !correctBtn.disabled) correctBtn.classList.add('hint');
      }, 330 * (n + 1)));
    };
  }
});
})();
