/* Lectura 1 — ¿Qué empieza por…? */
(function () {
'use strict';
const U = Kids.util;
/* [palabra, dibujo]; cada dibujo aparece una sola vez en todo el banco */
const BANK = {
  A: [['abeja','bee'],['árbol','tree'],['arcoíris','rainbow']],
  B: [['ballena','whale'],['barco','boat'],['botón','button'],['balón','ball'],['búho','owl'],['bufanda','scarf'],['bota','boot']],
  C: [['casa','house'],['coche','car'],['conejo','rabbit'],['cereza','cherry'],['cama','bed'],['caballo','horse'],['cangrejo','crab'],['camiseta','tshirt'],['cometa','kite']],
  D: [['delfín','dolphin']],
  E: [['elefante','elephant'],['estrella','star']],
  F: [['fresa','strawberry'],['flor','flower']],
  G: [['gato','cat'],['gallina','hen'],['globo','balloon'],['gorro','beanie']],
  H: [['hoja','leaf']],
  J: [['jirafa','giraffe']],
  L: [['luna','moon'],['león','lion'],['libro','book'],['lámpara','lamp'],['loro','parrot']],
  M: [['mono','monkey'],['mesa','table'],['manzana','apple'],['mariposa','butterfly'],['muñeca','doll'],['moneda','coin']],
  N: [['nube','cloud'],['naranja','orange']],
  O: [['oso','bear'],['oveja','sheep']],
  P: [['pato','duck'],['perro','dog'],['pera','pear'],['pingüino','penguin'],['pollito','chick'],['pez','fish'],['pájaro','bird'],['paraguas','umbrella'],['plátano','banana'],['pastel','cake']],
  R: [['ratón','mouse'],['rana','frog'],['robot','robot']],
  S: [['sol','sun'],['silla','chair'],['sandía','watermelon'],['sombrero','hat'],['sandalia','sandal']],
  T: [['tren','train'],['tortuga','turtle'],['tambor','drum'],['taza','cup']],
  U: [['uvas','grapes']],
  V: [['vaca','cow']],
  Z: [['zapato','shoe'],['zorro','fox'],['zanahoria','carrot']]
};
const NAMES = { A:'a',B:'be',C:'ce',D:'de',E:'e',F:'efe',G:'ge',H:'hache',J:'jota',L:'ele',M:'eme',N:'ene',O:'o',P:'pe',R:'erre',S:'ese',T:'te',U:'u',V:'uve',Z:'zeta' };
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
const ALL = [];
Object.keys(BANK).forEach(L => BANK[L].forEach(([w, a]) => { if (norm(w)[0] !== L) console.error('[lectura-6] ¡' + w + ' no empieza por ' + L + '!'); ALL.push({ w, a, L }); }));

let withWords = false; /* nivel 2: etiquetas opcionales (se recuerda) */

Kids.css(`
.g-lectura-6 .btn svg{width:1.3em;height:1.3em;flex:none}
.g-lectura-6{gap:.9rem}
.g-lectura-6 .l6-top{display:flex;align-items:center;gap:1.4rem;flex-wrap:wrap;justify-content:center}
.g-lectura-6 .l6-letter .btn{white-space:nowrap}
.g-lectura-6 .l6-letter{display:flex;align-items:center;gap:1.2rem;padding:.3rem 1.6rem .5rem}
.g-lectura-6 .l6-big{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(4.5rem,15vmin,7.5rem);line-height:1;color:var(--gd)}
.g-lectura-6 .l6-big i{font-style:normal;color:var(--g);margin-left:.15em}
.g-lectura-6 .l6-grid{display:grid;gap:1rem;justify-content:center;width:100%}
.g-lectura-6 .l6-grid .pic{width:clamp(6.6rem,21vmin,11rem);min-height:clamp(6.6rem,21vmin,11rem)}
.g-lectura-6 .l6-grid .pic .art{width:100%;display:block}
.g-lectura-6 .l6-grid .pic .lbl{font-weight:800;font-size:clamp(1.1rem,3.4vmin,1.7rem);color:var(--ink)}
.g-lectura-6 .l6-grid .pic.right{pointer-events:none}
.g-lectura-6 .l6-grid .pic.hint{animation:pulse 1s infinite;border-color:#5CC77A}
.g-lectura-6 .l6-tick{position:absolute;top:-.6rem;right:-.6rem;width:2.4rem;height:2.4rem;border-radius:50%;background:#5CC77A;color:#fff;padding:.35rem;box-shadow:0 .2rem 0 #3E9F59}
.g-lectura-6 .l6-grid.c3{grid-template-columns:repeat(3,auto)}
.g-lectura-6 .l6-grid.c4{grid-template-columns:repeat(4,auto)}
.g-lectura-6 .l6-grid.c6{grid-template-columns:repeat(3,auto)}
@media (max-width:560px){.g-lectura-6 .l6-grid.c4{grid-template-columns:repeat(2,auto)}}
`);

Kids.game({
  id: 'lectura-6', group: 'lectura', num: 1,
  title: '¿Qué empieza por…?', icon: 'monkey', rounds: 8,
  blurb: 'Mira la letra y toca los dibujos que empiezan por ella.',
  how: 'Mira la letra y toca el dibujo cuyo nombre empieza por esa letra.',
  levels: ['3 dibujos con palabra', '4 dibujos', 'Toca todos'],
  round(g, i) {
    const lv = g.level, nOk = lv === 3 ? 2 : 1, total = lv === 1 ? 3 : lv === 2 ? 4 : 6;
    /* las letras no se repiten dentro de una partida */
    g.shared = g.shared || { used: [] };
    const letters = Object.keys(BANK).filter(L => BANK[L].length >= nOk);
    let pool = letters.filter(L => !g.shared.used.includes(L)); if (!pool.length) { g.shared.used = []; pool = letters; }
    const L = U.pick(pool); g.shared.used.push(L);
    const good = U.sample(ALL.filter(x => x.L === L), nOk);
    const bad = U.sample(ALL.filter(x => norm(x.w)[0] !== L), total - nOk);
    const cards = U.shuffle(good.concat(bad));
    const showLbl = () => lv === 1 || (lv === 2 && withWords);
    const name = NAMES[L];

    const top = U.el(`<div class="l6-top"><div class="card l6-letter"><div class="l6-big">${L}<i>${L.toLowerCase()}</i></div><button class="btn blue sm" aria-label="Escuchar la letra">${Kids.icons.speaker} Suena ${name}</button></div></div>`);
    top.querySelector('button').onclick = () => g.say(name);
    if (lv === 2) {
      const seg = U.el(`<div class="seg"><button data-w="1">Con palabras</button><button data-w="0">Solo dibujos</button></div>`);
      const upd = () => { seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', (b.dataset.w === '1') === withWords)); grid.querySelectorAll('.lbl').forEach(l => l.hidden = !withWords); };
      seg.querySelectorAll('button').forEach(b => b.onclick = () => { withWords = b.dataset.w === '1'; Kids.sound.pop(); upd(); });
      top.appendChild(seg); g._segUpd = upd;
    }
    const grid = U.el(`<div class="l6-grid c${total}"></div>`);
    let found = 0;
    cards.forEach(c => {
      const b = U.el(`<button class="pic" aria-label="${U.esc(c.w)}"><span class="art">${Kids.art.get(c.a)}</span><span class="lbl"${showLbl() ? '' : ' hidden'}>${U.esc(c.w)}</span></button>`);
      const isGood = good.includes(c);
      b.onclick = () => {
        if (b.classList.contains('right')) return;
        if (isGood) {
          b.classList.remove('hint'); b.classList.add('right'); b.disabled = true;
          b.insertAdjacentHTML('beforeend', `<span class="l6-tick">${Kids.icons.check}</span>`);
          const l = b.querySelector('.lbl'); l.hidden = false;
          Kids.sound.pop(); g.say(c.w);
          if (++found === nOk) g.right(nOk > 1 ? '¡Los has encontrado todos!' : undefined);
        } else {
          b.classList.add('bad'); g.wrong();
          g.t(() => b.classList.remove('bad'), 450);
        }
      };
      b._c = c; b._good = isGood; grid.appendChild(b);
    });
    if (g._segUpd) g._segUpd();
    g.helpHint = () => {
      const t = [...grid.children].find(b => b._good && !b.classList.contains('right'));
      if (t) { t.classList.add('hint'); const l = t.querySelector('.lbl'); l.hidden = false; g.toast('Mira: empieza por ' + L); }
    };
    g.area.appendChild(top); g.area.appendChild(grid);
    g.ask(nOk > 1 ? `Toca TODOS los que empiezan por ${L}` : `¿Qué empieza por ${L}?`);
  }
});
})();
