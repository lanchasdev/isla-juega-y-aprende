/* Mates x9 — Mide con la regla (clips y centímetros) */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
const UN = 40, X0 = 24, H = 28;
const CLIPC = ['#4C8DF6', '#FF7E69', '#5CC77A', '#8C7BE0', '#F2B93B'];
const OBJ = { pencil: 'el lápiz', ribbon: 'la cinta', crayon: 'la cera', straw: 'la pajita' };

A.add({ 'mx9-clip': '<svg viewBox="0 0 100 100"><path d="M30 28 H66 A14 14 0 0 1 66 56 H34 A10 10 0 0 1 34 36 H60" transform="translate(0,8)" fill="none" stroke="#6F86C8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 72 H80" stroke="rgba(20,35,91,.1)" stroke-width="6" stroke-linecap="round"/></svg>' });

Kids.css(`
.g-mates-x9 .x9-card{width:min(100%,62rem);background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line);padding:.6rem .8rem}
.g-mates-x9 .x9-svg{width:100%;height:auto;max-height:46vh}
.g-mates-x9 .x9-hint{opacity:0;transition:opacity .4s}
.g-mates-x9 .x9-hint.on{opacity:1}
.g-mates-x9 .x9-cn{opacity:0;transition:opacity .25s}
.g-mates-x9 .x9-cn.on{opacity:1}
`);

function objSvg(kind, x, y, L, col) {
  const h = H;
  if (kind === 'pencil') {
    const t = Math.min(16, L * .3);
    return `<g><rect x="${x}" y="${y}" width="${L - t}" height="${h}" rx="3" fill="#FFD23F"/><rect x="${x}" y="${y + h * .4}" width="${L - t}" height="${h * .2}" fill="#F2B93B"/>` +
      `<rect x="${x}" y="${y}" width="9" height="${h}" rx="3" fill="#FF8FB1"/><rect x="${x + 9}" y="${y}" width="4" height="${h}" fill="#B8C2DA"/>` +
      `<polygon points="${x + L - t},${y} ${x + L},${y + h / 2} ${x + L - t},${y + h}" fill="#F3CFA0"/><polygon points="${x + L - 5},${y + h / 2 - 3} ${x + L},${y + h / 2} ${x + L - 5},${y + h / 2 + 3}" fill="#4B5A8A"/></g>`;
  }
  if (kind === 'ribbon') {
    const c = col || '#FF7EA8';
    return `<g><polygon points="${x},${y} ${x + L},${y} ${x + L - 8},${y + h / 2} ${x + L},${y + h} ${x},${y + h} ${x + 8},${y + h / 2}" fill="${c}"/>` +
      `<path d="M${x + 14} ${y + 5} H${x + L - 14} M${x + 14} ${y + h - 5} H${x + L - 14}" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".75" stroke-dasharray="1 7"/></g>`;
  }
  if (kind === 'crayon') {
    const c = col || '#5CC77A', t = 14;
    return `<g><rect x="${x}" y="${y + 1}" width="${L - t}" height="${h - 2}" rx="4" fill="${c}"/><rect x="${x + 10}" y="${y + 1}" width="${Math.max(6, L - t - 20)}" height="${h - 2}" fill="#fff" opacity=".35"/>` +
      `<polygon points="${x + L - t},${y + 1} ${x + L},${y + h / 2} ${x + L - t},${y + h - 1}" fill="${c}"/><polygon points="${x + L - 5},${y + h / 2 - 3} ${x + L},${y + h / 2} ${x + L - 5},${y + h / 2 + 3}" fill="#fff" opacity=".8"/></g>`;
  }
  const c = col || '#47B5BF';
  let st = '';
  for (let k = 12; k < L - 6; k += 16) st += `<polygon points="${x + k},${y} ${x + k + 7},${y} ${x + k + 1},${y + h * .6} ${x + k - 6},${y + h * .6}" fill="#fff" opacity=".7"/>`;
  return `<g><rect x="${x}" y="${y + 4}" width="${L}" height="${h - 8}" rx="6" fill="${c}"/>${st}</g>`;
}

function clipsSvg(n, y) {
  let s = '';
  for (let k = 0; k < n; k++) {
    const x = X0 + k * UN;
    s += `<g transform="translate(${x} ${y})"><path d="M7 7 H27 A6 6 0 0 1 27 19 H9 A4.5 4.5 0 0 1 9 10 H23" fill="none" stroke="${CLIPC[k % 5]}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" transform="scale(1.2 1.15)"/></g>`;
    s += `<text class="x9-cn" data-k="${k}" x="${x + UN / 2}" y="${y + 46}" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="19" fill="#14235B">${k + 1}</text>`;
  }
  return s;
}

function rulerSvg(cm, y) {
  let s = `<rect x="${X0 - 8}" y="${y}" width="${cm * UN + 16}" height="50" rx="6" fill="#FFE8A3" stroke="#E8CF6A" stroke-width="2"/>`;
  for (let k = 0; k <= cm * 2; k++) {
    const x = X0 + k * UN / 2, big = k % 2 === 0;
    s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + (big ? 16 : 9)}" stroke="#8A6A2A" stroke-width="${big ? 2 : 1.4}"/>`;
    if (big) s += `<text x="${x}" y="${y + 40}" text-anchor="middle" font-family="Baloo 2,Nunito,sans-serif" font-weight="800" font-size="22" fill="#6B4E12">${k / 2}</text>`;
  }
  s += `<text x="${X0 + cm * UN + 4}" y="${y + 36}" text-anchor="start" font-family="Baloo 2,Nunito,sans-serif" font-weight="700" font-size="12" fill="#6B4E12" opacity="0">cm</text>`;
  return s;
}

function opts(ans, lo, hi, extra) {
  const set = [ans];
  (extra || []).forEach(v => { if (v >= lo && v <= hi && !set.includes(v)) set.push(v); });
  [-1, 1, -2, 2, 3].forEach(d => { if (set.length < 4 && ans + d >= lo && ans + d <= hi && !set.includes(ans + d)) set.push(ans + d); });
  return U.shuffle(set.slice(0, 4));
}

Kids.game({
  id: 'mates-x9', group: 'mates', num: 14,
  title: 'Mide con la regla',
  blurb: 'Mide con clips y con una regla en centímetros.',
  how: 'Mira el objeto. Cuenta los clips o lee la regla y toca cuánto mide.',
  icon: 'mx9-clip',
  levels: ['Contar clips hasta 6', 'Clips y regla en cm', 'Medir sin empezar en 0 y comparar'],
  rounds: 8,
  round(g, i) {
    const lv = g.level;
    const kind = U.pick(Object.keys(OBJ));
    const col = U.pick(['#FF7EA8', '#4C8DF6', '#8C7BE0', '#FF8A5C', '#47B5BF']);
    let mode;
    if (lv === 1) mode = 'clips'; else if (lv === 2) mode = i % 2 === 0 ? 'clips' : 'cm'; else mode = i % 2 === 0 ? 'offset' : 'compare';
    const card = U.el('<div class="x9-card"></div>');
    const answer = (ans, lo, hi, extra, onOk, unit) => {
      const box = U.el('<div class="opts"></div>');
      opts(ans, lo, hi, extra).forEach(v => {
        const b = U.el(`<button class="ans" aria-label="${v} ${unit}">${v}</button>`);
        b.onclick = () => {
          if (v === ans) { box.querySelectorAll('button').forEach(x => x.disabled = true); b.classList.add('right'); onOk(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        box.appendChild(b);
      });
      return box;
    };
    const hintOn = svg => svg.querySelectorAll('.x9-hint').forEach(e => e.classList.add('on'));

    if (mode === 'clips') {
      const n = lv === 1 ? U.rnd(2, 6) : U.rnd(4, 10), W = X0 * 2 + n * UN;
      const svg = U.el(`<svg class="x9-svg" viewBox="0 0 ${Math.max(W, 300)} 120" role="img" aria-label="${OBJ[kind]} con clips debajo"><g transform="translate(${Math.max(0, (300 - W) / 2)} 0)">` +
        objSvg(kind, X0, 12, n * UN, col) + `<g class="x9-hint"><line x1="${X0}" y1="42" x2="${X0}" y2="62" stroke="#F2B93B" stroke-width="2.5" stroke-dasharray="4 4"/><line x1="${X0 + n * UN}" y1="42" x2="${X0 + n * UN}" y2="62" stroke="#F2B93B" stroke-width="2.5" stroke-dasharray="4 4"/></g>` +
        `<g>${clipsSvg(n, 52)}</g></g></svg>`);
      card.appendChild(svg); g.area.appendChild(card);
      g.ask('¿Cuántos clips mide ' + OBJ[kind] + '?');
      g.area.appendChild(answer(n, 1, lv === 1 ? 8 : 12, [], () => g.right(), 'clips'));
      g.helpHint = () => {
        g.toast('Cuenta los clips, uno a uno'); hintOn(svg);
        svg.querySelectorAll('.x9-cn').forEach((t, k) => g.t(() => { t.classList.add('on'); Kids.sound.pop(); }, 380 * (k + 1)));
      };
    } else if (mode === 'cm' || mode === 'offset') {
      const cm = lv === 2 ? 12 : 14;
      let a = 0, len;
      if (mode === 'cm') len = U.rnd(2, 10); else { a = U.rnd(1, 6); len = U.rnd(2, Math.min(8, cm - a)); }
      const b = a + len, W = X0 * 2 + cm * UN + 20;
      const svg = U.el(`<svg class="x9-svg" viewBox="0 0 ${W} 112" role="img" aria-label="${OBJ[kind]} sobre una regla">` +
        objSvg(kind, X0 + a * UN, 12, len * UN, col) + rulerSvg(cm, 56) +
        `<g class="x9-hint"><line x1="${X0 + a * UN}" y1="42" x2="${X0 + a * UN}" y2="78" stroke="#E5484D" stroke-width="2.5" stroke-dasharray="4 4"/><line x1="${X0 + b * UN}" y1="42" x2="${X0 + b * UN}" y2="78" stroke="#E5484D" stroke-width="2.5" stroke-dasharray="4 4"/>` +
        `<circle cx="${X0 + a * UN}" cy="92" r="14" fill="none" stroke="#E5484D" stroke-width="3"/><circle cx="${X0 + b * UN}" cy="92" r="14" fill="none" stroke="#E5484D" stroke-width="3"/></g></svg>`);
      card.appendChild(svg); g.area.appendChild(card);
      g.ask('¿Cuántos centímetros mide ' + OBJ[kind] + '?');
      g.area.appendChild(answer(len, 1, 14, mode === 'offset' ? [b, a] : [], () => g.right(), 'centímetros'));
      g.helpHint = () => {
        g.toast(a === 0 ? 'Mira en qué número acaba' : 'Mira dónde empieza y dónde acaba');
        hintOn(svg);
      };
    } else {
      const cm = 14;
      const k2 = U.pick(Object.keys(OBJ).filter(k => k !== kind));
      const la = U.rnd(3, 12); let lb; do { lb = U.rnd(3, 12); } while (lb === la || Math.abs(lb - la) > 6);
      const W = X0 * 2 + cm * UN + 20;
      const col2 = U.pick(['#F2994A', '#5CC77A', '#8C7BE0']);
      const svg = U.el(`<svg class="x9-svg" viewBox="0 0 ${W} 150" role="img" aria-label="Dos objetos sobre una regla">` +
        objSvg(kind, X0, 10, la * UN, col) + objSvg(k2, X0, 50, lb * UN, col2) + rulerSvg(cm, 94) +
        `<g class="x9-hint"><line x1="${X0 + la * UN}" y1="40" x2="${X0 + la * UN}" y2="118" stroke="#E5484D" stroke-width="2.5" stroke-dasharray="4 4"/><line x1="${X0 + lb * UN}" y1="80" x2="${X0 + lb * UN}" y2="118" stroke="#E5484D" stroke-width="2.5" stroke-dasharray="4 4"/></g></svg>`);
      card.appendChild(svg); g.area.appendChild(card);
      const longer = la > lb ? kind : k2, diff = Math.abs(la - lb);
      g.ask('¿Qué es más largo: ' + OBJ[kind] + ' o ' + OBJ[k2] + '?');
      const box = U.el('<div class="opts"></div>');
      const holder = U.el('<div style="width:100%"></div>'); holder.appendChild(box);
      [kind, k2].forEach(k => {
        const b = U.el(`<button class="ans" style="font-size:1.9rem" aria-label="${OBJ[k]}">${OBJ[k].replace(/^./, c => c.toUpperCase())}</button>`);
        b.onclick = () => {
          if (k === longer) {
            box.querySelectorAll('button').forEach(x => x.disabled = true); b.classList.add('right');
            g.roundMistakes = 0; g.helpHint = hint2;
            g.t(() => {
              g.ask('¿Cuántos centímetros más largo es ' + OBJ[longer] + '?');
              holder.innerHTML = ''; holder.appendChild(answer(diff, 1, 12, [la, lb], () => g.right(), 'centímetros'));
            }, 700);
          } else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        box.appendChild(b);
      });
      g.area.appendChild(holder);
      const hint1 = () => { g.toast('Mira cuál llega más lejos en la regla'); hintOn(svg); };
      const hint2 = () => { g.toast('Resta: cuántos cm se pasa uno del otro'); hintOn(svg); };
      g.helpHint = hint1;
    }
  }
});
})();
