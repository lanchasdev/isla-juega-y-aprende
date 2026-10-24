/* Lectura 2 — Lee y toca */
(function () {
'use strict';
const U = Kids.util;
const W = [
  ['perro','dog'],['gato','cat'],['casa','house'],['sol','sun'],['luna','moon'],['pato','duck'],['mesa','table'],['silla','chair'],
  ['pera','pear'],['fresa','strawberry'],['flor','flower'],['árbol','tree'],['coche','car'],['tren','train'],['libro','book'],['llave','key'],
  ['oso','bear'],['mono','monkey'],['pez','fish'],['rana','frog'],['vaca','cow'],['nube','cloud'],['estrella','star'],['corazón','heart'],
  ['barco','boat'],['globo','balloon'],['cama','bed'],['taza','cup'],['botón','button'],['balón','ball'],['cerdo','pig'],['caballo','horse'],
  ['oveja','sheep'],['zapato','shoe']
].map(([w, a]) => ({ w, a }));
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
function lev(a, b) {
  a = norm(a); b = norm(b); const d = [];
  for (let i = 0; i <= a.length; i++) { d[i] = [i]; }
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return d[a.length][b.length];
}
let mode = 'w2p'; /* se recuerda entre rondas */

Kids.css(`
.g-lectura-8 .btn svg{width:1.3em;height:1.3em;flex:none}
.g-lectura-8{gap:1rem}
.g-lectura-8 .l8-stage{display:flex;align-items:center;justify-content:center;gap:1.2rem;flex-wrap:wrap}
.g-lectura-8 .bigword{font-size:clamp(3rem,12vmin,5.5rem)}
.g-lectura-8 .l8-pic{width:clamp(8rem,28vmin,13rem);height:clamp(8rem,28vmin,13rem);padding:.8rem}
.g-lectura-8 .l8-pic svg{width:100%;height:100%;display:block}
.g-lectura-8 .l8-grid{display:grid;gap:1rem;justify-content:center;width:100%}
.g-lectura-8 .l8-grid.c3{grid-template-columns:repeat(3,auto)}
.g-lectura-8 .l8-grid.c4{grid-template-columns:repeat(4,auto)}
.g-lectura-8 .l8-grid .pic{width:clamp(6.4rem,20vmin,10.5rem);height:clamp(6.4rem,20vmin,10.5rem)}
.g-lectura-8 .l8-grid .pic svg{width:100%;height:100%;display:block}
.g-lectura-8 .l8-words{display:grid;gap:1rem;justify-content:center;width:100%}
.g-lectura-8 .l8-words.c3{grid-template-columns:repeat(3,auto)}
.g-lectura-8 .l8-words.c4{grid-template-columns:repeat(2,minmax(0,16rem))}
.g-lectura-8 .l8-words .ans{font-size:clamp(1.8rem,6vmin,2.8rem);min-width:0;padding:.3rem 1.2rem;min-height:clamp(4.5rem,13vmin,5.8rem)}
.g-lectura-8 .l8-words .ans.hint,.g-lectura-8 .l8-grid .pic.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
@media (max-width:560px){.g-lectura-8 .l8-grid.c4{grid-template-columns:repeat(2,auto)}.g-lectura-8 .l8-words.c3{grid-template-columns:1fr}}
`);

Kids.game({
  id: 'lectura-8', group: 'lectura', num: 2,
  title: 'Lee y toca', icon: 'dog', rounds: 8,
  blurb: 'Lee la palabra y toca su dibujo, o mira el dibujo y toca su palabra.',
  how: 'Lee la palabra y toca su dibujo. También puedes mirar el dibujo y tocar la palabra.',
  levels: ['3 opciones', '4 opciones', 'Palabras parecidas'],
  round(g, i) {
    const lv = g.level, n = lv === 1 ? 3 : 4;
    g.shared = g.shared || { used: [] };
    let cand = W.filter(x => !g.shared.used.includes(x.w));
    if (lv === 1) cand = cand.filter(x => x.w.length <= 5);
    if (lv === 3) cand = cand.filter(x => x.w.length >= 5);
    if (!cand.length) cand = W;
    const target = U.pick(cand); g.shared.used.push(target.w);
    const others = W.filter(x => x !== target);
    let dist;
    if (lv === 1) { /* muy distintas: otras iniciales, palabras cortas */
      const short = others.filter(x => x.w.length <= 5 && x.w[0] !== target.w[0]);
      dist = []; U.shuffle(short).forEach(x => { if (dist.length < 2 && !dist.some(d => d.w[0] === x.w[0])) dist.push(x); });
    } else if (lv === 2) {
      dist = []; U.shuffle(others).forEach(x => { if (dist.length < 3 && !dist.some(d => d.w[0] === x.w[0]) && x.w[0] !== target.w[0]) dist.push(x); });
    } else { /* las más parecidas a la palabra */
      const near = others.slice().sort((a, b) => lev(a.w, target.w) - lev(b.w, target.w) || Math.random() - .5);
      dist = near.slice(0, 5); dist = U.sample(dist, 3);
    }
    const opts = U.shuffle([target].concat(dist));
    const cls = 'c' + n;

    const bar = U.el(`<div class="seg"><button data-m="w2p">Palabra → dibujo</button><button data-m="p2w">Dibujo → palabra</button></div>`);
    const stage = U.el('<div class="l8-stage"></div>');
    const holder = U.el('<div style="width:100%;display:flex;justify-content:center"></div>');
    g.area.appendChild(bar); g.area.appendChild(stage); g.area.appendChild(holder);
    let done = false;

    function pick(el, ok) {
      if (done || el.disabled) return;
      if (ok) { done = true; el.classList.add('right'); holder.querySelectorAll('button').forEach(b => b.disabled = true); Kids.sound.pop(); g.say(target.w); g.right(); }
      else { el.classList.add('bad'); g.wrong(); g.t(() => el.classList.remove('bad'), 450); }
    }
    function build() {
      bar.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
      stage.innerHTML = ''; holder.innerHTML = '';
      const spk = U.el(`<button class="btn blue sm" aria-label="Escuchar la palabra">${Kids.icons.speaker} Escuchar</button>`);
      spk.onclick = () => g.say(target.w);
      if (mode === 'w2p') {
        stage.appendChild(U.el(`<div class="bigword">${U.esc(target.w)}</div>`)); stage.appendChild(spk);
        const grid = U.el(`<div class="l8-grid ${cls}"></div>`);
        opts.forEach(o => { const b = U.el(`<button class="pic" aria-label="${U.esc(o.a)}">${Kids.art.get(o.a)}</button>`); b.onclick = () => pick(b, o === target); b._ok = o === target; grid.appendChild(b); });
        holder.appendChild(grid);
        g.ask('Lee la palabra y toca su dibujo');
      } else {
        stage.appendChild(U.el(`<div class="pic l8-pic">${Kids.art.get(target.a)}</div>`)); stage.appendChild(spk);
        const wrap = U.el(`<div class="opts l8-words ${cls}"></div>`);
        opts.forEach(o => { const b = U.el(`<button class="ans">${U.esc(o.w)}</button>`); b.onclick = () => pick(b, o === target); b._ok = o === target; wrap.appendChild(b); });
        holder.appendChild(wrap);
        g.ask('Mira el dibujo y toca su palabra');
      }
    }
    g.helpHint = () => { const t = [...holder.querySelectorAll('button')].find(b => b._ok); if (t) { t.classList.add('hint'); g.toast('Mira: es «' + U.esc(target.w) + '»'); g.say(target.w); } };
    bar.querySelectorAll('button').forEach(b => b.onclick = () => { if (done || b.dataset.m === mode) return; mode = b.dataset.m; Kids.sound.pop(); build(); });
    build();
  }
});
})();
