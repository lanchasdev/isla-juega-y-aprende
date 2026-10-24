/* Lectura x1 — Sílabas mágicas */
(function () {
'use strict';
const U = Kids.util;
const W = [
  ['pato','pa-to','duck'],['gato','ga-to','cat'],['mono','mo-no','monkey'],['vaca','va-ca','cow'],['rana','ra-na','frog'],
  ['oso','o-so','bear'],['loro','lo-ro','parrot'],['pera','pe-ra','pear'],['luna','lu-na','moon'],['nube','nu-be','cloud'],
  ['hoja','ho-ja','leaf'],['casa','ca-sa','house'],['mesa','me-sa','table'],['cama','ca-ma','bed'],['taza','ta-za','cup'],
  ['bota','bo-ta','boot'],['coche','co-che','car'],['llave','lla-ve','key'],['silla','si-lla','chair'],
  ['perro','pe-rro','dog'],['zorro','zo-rro','fox'],['cerdo','cer-do','pig'],['tarta','tar-ta','cake'],['barco','bar-co','boat'],
  ['libro','li-bro','book'],['fresa','fre-sa','strawberry'],['globo','glo-bo','balloon'],['árbol','ár-bol','tree'],['tambor','tam-bor','drum'],
  ['ratón','ra-tón','mouse'],['león','le-ón','lion'],['delfín','del-fín','dolphin'],['botón','bo-tón','button'],
  ['mariposa','ma-ri-po-sa','butterfly'],['elefante','e-le-fan-te','elephant'],['camiseta','ca-mi-se-ta','tshirt'],['zanahoria','za-na-ho-ria','carrot'],
  ['arcoíris','ar-co-í-ris','rainbow'],['caballo','ca-ba-llo','horse'],['conejo','co-ne-jo','rabbit'],['gallina','ga-lli-na','hen'],
  ['tortuga','tor-tu-ga','turtle'],['jirafa','ji-ra-fa','giraffe'],['ballena','ba-lle-na','whale'],['pelota','pe-lo-ta','ball'],
  ['osito','o-si-to','teddy'],['cometa','co-me-ta','kite'],['muñeca','mu-ñe-ca','doll'],['zapato','za-pa-to','shoe'],
  ['abeja','a-be-ja','bee'],['manzana','man-za-na','apple'],['naranja','na-ran-ja','orange'],['plátano','plá-ta-no','banana'],
  ['cereza','ce-re-za','cherry'],['sandía','san-dí-a','watermelon'],['lámpara','lám-pa-ra','lamp'],['bufanda','bu-fan-da','scarf'],
  ['sombrero','som-bre-ro','hat'],['estrella','es-tre-lla','star'],['pájaro','pá-ja-ro','bird'],['cangrejo','can-gre-jo','crab']
].map(([w, s, a]) => ({ w, s: s.split('-'), a }));
const DIRECT = /^(ch|ll|qu|gu|[bcdfghjklmnñprstvz])?[aeiou]$/;
const isDirect = x => x.s.every(t => DIRECT.test(t));
const COLS = ['#7B61D9', '#D9692A', '#1F9BA8', '#D6477A'];
const ALLSYL = [...new Set(W.flatMap(x => x.s))];

Kids.css(`
.g-lectura-x1{gap:.9rem}
.g-lectura-x1 .x1-pic{width:clamp(7rem,24vmin,12rem);height:clamp(7rem,24vmin,12rem);padding:.7rem;background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line);position:relative;flex:none}
.g-lectura-x1 .x1-pic svg{width:100%;height:100%}
.g-lectura-x1 .x1-pic .spk{position:absolute;right:-.7rem;bottom:-.7rem;width:2.8rem;height:2.8rem;border-radius:50%;background:var(--gl);color:var(--gd);display:flex;align-items:center;justify-content:center;box-shadow:0 .2rem 0 rgba(0,0,0,.15)}
.g-lectura-x1 .x1-pic .spk svg{width:1.4rem;height:1.4rem}
.g-lectura-x1 .x1-slots{display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap}
.g-lectura-x1 .x1-slot{min-width:clamp(4.2rem,15vmin,6.5rem);height:clamp(4.2rem,14vmin,5.8rem);padding:0 .6rem;font-size:clamp(1.9rem,6.5vmin,3rem);font-family:'Baloo 2',sans-serif;font-weight:800;border-radius:1.2rem;border:.25rem dashed #9CB5E8;background:rgba(255,255,255,.75);color:var(--ink)}
.g-lectura-x1 .x1-slot.sel{border-color:var(--yellow);background:#FFF3BF}
.g-lectura-x1 .x1-slot.hot{background:#FFF3BF;border-color:var(--yellow);transform:scale(1.06)}
.g-lectura-x1 .x1-slot.filled{border-style:solid;border-color:var(--green);background:#E8F9EC;animation:pop .35s}
.g-lectura-x1 .x1-tiles{gap:.8rem}
.g-lectura-x1 .x1-tile{min-width:clamp(4rem,14vmin,6rem);min-height:clamp(3.8rem,12vmin,5rem);font-size:clamp(1.8rem,6vmin,2.7rem);padding:.1rem 1rem}
.g-lectura-x1 .x1-tile.used{opacity:.25;pointer-events:none}
.g-lectura-x1 .x1-tile.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x1 .x1-word{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(2.2rem,8vmin,3.6rem);min-height:1.2em;line-height:1}
`);

Kids.game({
  id: 'lectura-x1', group: 'lectura', num: 5,
  title: 'Sílabas mágicas', icon: 'butterfly', rounds: 7,
  blurb: 'Junta las sílabas para formar el nombre del dibujo.',
  how: 'Mira el dibujo y junta las sílabas para formar su nombre. Toca una sílaba o arrástrala a su hueco.',
  levels: ['2 sílabas fáciles', '2 sílabas, más fichas', '3 y 4 sílabas'],
  round(g, i) {
    const lv = g.level, sh = g.shared = g.shared || { used: [] };
    if (i === 0) sh.used = [];
    let pool = lv === 1 ? W.filter(x => x.s.length === 2 && isDirect(x))
      : lv === 2 ? W.filter(x => x.s.length === 2 && !isDirect(x) || (x.s.length === 2 && Math.random() < .3))
      : W.filter(x => x.s.length >= 3);
    let cand = pool.filter(x => !sh.used.includes(x.w)); if (!cand.length) cand = pool;
    const t = U.pick(cand); sh.used.push(t.w);
    const n = t.s.length;
    /* distractores */
    let others = ALLSYL.filter(s => !t.s.includes(s));
    if (lv === 1) others = others.filter(s => DIRECT.test(s));
    else others = U.shuffle(others).sort((a, b) => sim(b, t.s) - sim(a, t.s)).slice(0, 14);
    const nd = lv === 1 ? 4 : lv === 2 ? 6 : 4 + (n === 3 ? 1 : 0);
    const tiles = U.shuffle(t.s.map(s => ({ s, ok: true })).concat(U.sample(others, nd).map(s => ({ s, ok: false }))));

    const pic = U.el(`<div class="x1-pic">${Kids.art.get(t.a)}<button class="spk" aria-label="Escuchar la palabra">${Kids.icons.speaker}</button></div>`);
    pic.querySelector('.spk').onclick = () => g.say(t.w);
    const slotsEl = U.el('<div class="x1-slots"></div>');
    const wordEl = U.el('<div class="x1-word" aria-live="polite"></div>');
    const tilesEl = U.el('<div class="opts x1-tiles"></div>');
    g.area.append(pic, slotsEl, wordEl, tilesEl);
    const slots = t.s.map((s, k) => {
      const b = U.el(`<button class="x1-slot" aria-label="Hueco ${k + 1} de ${n}"></button>`);
      b.onclick = () => { if (b.classList.contains('filled') || done) return; selSlot = selSlot === k ? null : k; refresh(); Kids.sound.tap(); };
      slotsEl.appendChild(b); return b;
    });
    let selSlot = null, done = false;
    const filled = Array(n).fill(false);
    const nextEmpty = () => filled.indexOf(false);
    function refresh() { slots.forEach((b, k) => b.classList.toggle('sel', selSlot === k && !filled[k])); }
    function place(tile, k) {
      if (done || filled[k] || tile.el.classList.contains('used')) return false;
      if (tile.s === t.s[k]) {
        filled[k] = true; selSlot = null;
        slots[k].textContent = tile.s; slots[k].style.color = COLS[k % 4]; slots[k].classList.add('filled'); slots[k].classList.remove('sel');
        tile.el.classList.add('used'); tile.el.disabled = true; Kids.sound.pop();
        tilesEl.querySelectorAll('.hint').forEach(x => x.classList.remove('hint'));
        if (filled.every(Boolean)) {
          done = true; wordEl.innerHTML = t.s.map((s, q) => `<span style="color:${COLS[q % 4]}">${U.esc(s)}</span>`).join('');
          wordEl.classList.add('pop'); g.say(t.w); g.right();
        } else g.say(tile.s);
        return true;
      }
      tile.el.classList.add('bad'); g.shake(tile.el); g.t(() => tile.el.classList.remove('bad'), 450); g.wrong();
      return false;
    }
    tiles.forEach(tile => {
      const b = tile.el = U.el(`<button class="ans x1-tile" aria-label="Sílaba ${U.esc(tile.s)}">${U.esc(tile.s)}</button>`);
      tilesEl.appendChild(b);
      Kids.drag(b, {
        targets: () => slots.filter((s, k) => !filled[k]),
        onDrop: (target) => { place(tile, slots.indexOf(target)); return false; },
        onTap: () => { const k = selSlot != null && !filled[selSlot] ? selSlot : nextEmpty(); if (k >= 0) place(tile, k); }
      });
      b.addEventListener('click', e => { if (e.detail === 0) { const k = selSlot != null && !filled[selSlot] ? selSlot : nextEmpty(); if (k >= 0) place(tile, k); } });
    });
    g.helpHint = () => {
      const k = nextEmpty(); if (k < 0) return;
      const tl = tiles.find(x => x.s === t.s[k] && !x.el.classList.contains('used'));
      if (tl) { tl.el.classList.add('hint'); g.toast('Busca la sílaba «' + U.esc(t.s[k]) + '»'); g.say(t.s[k]); }
    };
    g.ask('Junta las sílabas para formar la palabra');
  }
});
function sim(s, need) {
  let sc = Math.random();
  need.forEach(n => { if (n[0] === s[0]) sc += 2; if (n.slice(-1) === s.slice(-1)) sc += 1; if (n.length === s.length) sc += .5; });
  return sc;
}
})();
