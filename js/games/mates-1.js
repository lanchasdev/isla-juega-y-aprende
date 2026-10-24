/* Mates 1 — Cuenta los animales */
(function () {
'use strict';
const U = Kids.util, A = Kids.art;
const POND = [{ a: 'duck', p: 'patos' }, { a: 'frog', p: 'ranas' }, { a: 'fish', p: 'peces' }, { a: 'turtle', p: 'tortugas' }];
const MEADOW = [{ a: 'sheep', p: 'ovejas' }, { a: 'cow', p: 'vacas' }, { a: 'rabbit', p: 'conejos' }, { a: 'pig', p: 'cerdos' }, { a: 'hen', p: 'gallinas' }, { a: 'chick', p: 'pollitos' }, { a: 'horse', p: 'caballos' }];
let lastKind = '', lastN = 0;

Kids.css(`
.g-mates-1 .scene{aspect-ratio:16/10;width:min(100%,max(26rem,calc((100vh - 19rem)*1.6)));max-width:64rem;flex:none}
.g-mates-1 .m1-deco{position:absolute;pointer-events:none;opacity:.95}
.g-mates-1 .m1-an{position:absolute;aspect-ratio:1;padding:0;background:none;border:0;cursor:pointer;transition:filter .15s}
.g-mates-1 .m1-an .in{width:100%;height:100%;display:block;transition:transform .2s}
.g-mates-1 .m1-an .in svg{width:100%;height:100%;display:block}
.g-mates-1 .m1-an:hover .in{transform:scale(1.08) rotate(0deg)!important}
.g-mates-1 .m1-an.no{animation:shake .4s}
.g-mates-1 .m1-an.on .in{filter:drop-shadow(0 0 .35rem #FFD23F) drop-shadow(0 0 .15rem #fff)}
.g-mates-1 .m1-b{position:absolute;right:-8%;top:-8%;min-width:1.7rem;height:1.7rem;padding:0 .25rem;border-radius:999px;background:var(--g);color:#fff;border:.15rem solid #fff;font-family:'Baloo 2';font-weight:800;font-size:1.15rem;line-height:1.3rem;display:flex;align-items:center;justify-content:center;animation:pop .3s both;box-shadow:0 .15rem 0 rgba(0,0,0,.18);pointer-events:none}
.g-mates-1 .opts .ans.hint{animation:pulse 1s infinite;outline:.25rem solid #fff;box-shadow:0 0 0 .5rem #FFD23F}
@media (max-width:640px){.g-mates-1 .m1-b{min-width:1.4rem;height:1.4rem;font-size:.95rem;line-height:1.05rem}}
`);

/* reparte n puntos sin solaparse mucho (unidades: ancho = 100, alto = h) */
function scatter(n, s, h, ymin) {
  let minD = s * 0.92, pts = [];
  for (let tries = 0; tries < 40; tries++) {
    pts = [];
    let ok = true;
    for (let k = 0; k < n && ok; k++) {
      let placed = false;
      for (let t = 0; t < 120; t++) {
        const x = U.rnd(Math.round(s * 5), Math.round((100 - s / 2) * 10)) / 10, y = U.rnd(Math.round(ymin * 10), Math.round((h - s / 2) * 10)) / 10;
        const xx = Math.max(s / 2 + 1, Math.min(99 - s / 2, x));
        if (pts.every(p => Math.hypot(p.x - xx, p.y - y) >= minD)) { pts.push({ x: xx, y }); placed = true; break; }
      }
      if (!placed) ok = false;
    }
    if (ok) return pts;
    minD *= 0.93;
  }
  return pts;
}

function choices(correct, count, max) {
  const pool = [];
  for (let d = -3; d <= 3; d++) { const v = correct + d; if (d && v >= 1 && v <= max) pool.push(v); }
  const near = U.shuffle(pool.filter(v => Math.abs(v - correct) <= 2));
  const far = U.shuffle(pool.filter(v => Math.abs(v - correct) > 2));
  const out = [correct].concat(near, far).slice(0, count);
  return U.shuffle(out);
}

Kids.game({
  id: 'mates-1', group: 'mates', num: 1,
  title: 'Cuenta los animales',
  blurb: 'Cuenta cuántos animales hay y toca el número correcto.',
  how: 'Cuenta los animales. Si los tocas, te ayudo a contarlos. Después toca el número correcto.',
  icon: 'duck',
  levels: ['Hasta 5', 'Hasta 10', 'Hasta 20'],
  rounds: 8,
  round(g, i) {
    const lv = g.level;
    const pond = Math.random() < 0.5;
    const list = pond ? POND : MEADOW;
    let kind;
    do { kind = U.pick(list); } while (kind.a === lastKind && list.length > 1);
    lastKind = kind.a;
    let n;
    do { n = lv === 1 ? U.rnd(1, 5) : lv === 2 ? U.rnd(4, 10) : U.rnd(4, 12); } while (n === lastN);
    lastN = n;
    const items = U.range(n).map(() => ({ kind, target: true }));
    if (lv === 3) {
      const others = U.sample(list.filter(k => k.a !== kind.a), U.rnd(1, 2));
      const extra = U.rnd(3, Math.min(9, 20 - n));
      for (let k = 0; k < extra; k++) items.push({ kind: others[k % others.length], target: false });
    }
    const total = items.length;
    const s = total <= 5 ? 17 : total <= 10 ? 13 : innerWidth < innerHeight ? 12.5 : 10.5;
    const portrait = innerWidth < innerHeight, h = portrait ? 100 / 1.1 : 62.5, ymin = h * 0.2 + s * 0.5;
    const pts = scatter(total, s, h, ymin);
    const order = U.shuffle(items);

    g.ask('¿Cuántos ' + kind.p + ' hay?');
    const scene = U.el(`<div class="scene ${pond ? 'pond' : 'meadow'}" style="${portrait ? 'aspect-ratio:1.1' : ''}"></div>`);
    const deco = (name, l, t, w, arg) => scene.appendChild(U.el(`<div class="m1-deco" style="left:${l}%;top:${t}%;width:${w}%">${A.get(name, arg)}</div>`));
    deco('cloud', 6, 0, 16); deco('cloud', 70, 3, 13); if (Math.random() < .6) deco('sun', 44, -2, 11);
    if (!pond) { deco('flower', 1, 70, 7, '#FF7EA8'); deco('flower', 90, 76, 7, '#FFD23F'); }
    const badges = [];
    let counted = 0;
    order.forEach((it, k) => {
      const p = pts[k] || { x: 50, y: h / 2 };
      const rot = U.rnd(-9, 9), sc = (U.rnd(88, 108) / 100);
      const flip = Math.random() < .5 ? -1 : 1;
      const b = U.el(`<button class="m1-an" aria-label="${U.esc(it.kind.a)}" style="left:${p.x}%;top:${p.y / h * 100}%;width:${s * sc}%;transform:translate(-50%,-50%);z-index:${Math.round(p.y * 10)}"><span class="in" style="transform:scaleX(${flip}) rotate(${rot}deg)">${A.get(it.kind.a)}</span></button>`);
      it.el = b; b.onclick = () => {
        if (b.classList.contains('on')) {            // quitar la marca y renumerar
          b.classList.remove('on'); const bd = b.querySelector('.m1-b'); bd && bd.remove();
          badges.splice(badges.indexOf(b), 1); badges.forEach((x, j) => { x.querySelector('.m1-b').textContent = j + 1; });
          Kids.sound.tap(); return;
        }
        if (!it.target) { g.shake(b); b.classList.add('no'); g.t(() => b.classList.remove('no'), 450); Kids.sound.tap(); return; }
        b.classList.add('on'); badges.push(b);
        b.appendChild(U.el(`<span class="m1-b">${badges.length}</span>`));
        Kids.sound.pop(); g.say(String(badges.length));
      };
      scene.appendChild(b);
    });
    g.area.appendChild(scene);

    const ansBox = U.el('<div class="opts"></div>');
    const vals = choices(n, lv === 1 ? 3 : 4, lv === 1 ? 6 : lv === 2 ? 11 : 20);
    const btns = vals.map(v => {
      const b = U.el(`<button class="ans">${v}</button>`);
      b.onclick = () => {
        if (v === n) {
          b.classList.add('right'); btns.forEach(x => x.disabled = true);
          g.right('¡Sí, ' + n + '!');
        } else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
      };
      ansBox.appendChild(b); return b;
    });
    g.area.appendChild(ansBox);

    g.helpHint = () => {
      g.toast('Vamos a contarlos juntos');
      badges.forEach(b => { b.classList.remove('on'); const bd = b.querySelector('.m1-b'); bd && bd.remove(); });
      badges.length = 0;
      order.filter(it => it.target).forEach((it, k) => g.t(() => {
        it.el.classList.add('on'); it.el.appendChild(U.el(`<span class="m1-b">${k + 1}</span>`)); Kids.sound.pop();
        if (k === n - 1) btns.forEach(b => { if (+b.textContent === n && !b.disabled) b.classList.add('hint'); });
      }, 450 * (k + 1)));
    };
  }
});
})();
