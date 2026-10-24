/* Lectura x5 — ¿Singular o plural? */
(function () {
'use strict';
const U = Kids.util;
/* s singular, p plural, a dibujo, g género, t tipo: s | es | ch (cambio z→c) | acc (pierde la tilde) */
const B = [
  ['gato','gatos','cat','m','s'],['pato','patos','duck','m','s'],['perro','perros','dog','m','s'],['vaca','vacas','cow','f','s'],
  ['rana','ranas','frog','f','s'],['oso','osos','bear','m','s'],['mono','monos','monkey','m','s'],['loro','loros','parrot','m','s'],
  ['pera','peras','pear','f','s'],['manzana','manzanas','apple','f','s'],['fresa','fresas','strawberry','f','s'],['nube','nubes','cloud','f','s'],
  ['estrella','estrellas','star','f','s'],['casa','casas','house','f','s'],['silla','sillas','chair','f','s'],['mesa','mesas','table','f','s'],
  ['taza','tazas','cup','f','s'],['llave','llaves','key','f','s'],['pelota','pelotas','ball','f','s'],['globo','globos','balloon','m','s'],
  ['coche','coches','car','m','s'],['libro','libros','book','m','s'],['barco','barcos','boat','m','s'],['abeja','abejas','bee','f','s'],
  ['oveja','ovejas','sheep','f','s'],['jirafa','jirafas','giraffe','f','s'],['cereza','cerezas','cherry','f','s'],['hoja','hojas','leaf','f','s'],
  ['flor','flores','flower','f','es'],['árbol','árboles','tree','m','es'],['tambor','tambores','drum','m','es'],
  ['pez','peces','fish','m','ch'],['lápiz','lápices','lx5-lapiz','m','ch'],['luz','luces','lx5-luz','f','ch'],
  ['ratón','ratones','mouse','m','acc'],['león','leones','lion','m','acc'],['botón','botones','button','m','acc'],
  ['corazón','corazones','heart','m','acc'],['delfín','delfines','dolphin','m','acc']
].map(([s, p, a, g, t]) => ({ s, p, a, g, t }));
const NUM = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco'];
const COLORS = ['#FF7EA8', '#FFD23F', '#8C7BE0', '#FF7E69', '#4C8DF6'];
Kids.art.add({
  'lx5-lapiz': '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="92" rx="32" ry="4" fill="#14235B" opacity=".08"/><g transform="rotate(35 50 50)"><rect x="39" y="10" width="22" height="62" rx="3" fill="#FFD23F"/><rect x="39" y="10" width="7" height="62" fill="#F2B93B"/><rect x="39" y="6" width="22" height="12" rx="3" fill="#FF8FAE"/><rect x="39" y="16" width="22" height="5" fill="#C9D3E6"/><path d="M39 72h22l-11 22z" fill="#F6D9B0"/><path d="M45 84h10l-5 10z" fill="#4B5A8A"/></g></svg>',
  'lx5-luz': '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="93" rx="22" ry="3.5" fill="#14235B" opacity=".08"/><g stroke="#FFB400" stroke-width="4" stroke-linecap="round"><path d="M50 6v8M18 20l6 6M82 20l-6 6M8 48h8M84 48h8"/></g><path d="M50 18c-17 0-28 12-28 27 0 11 6 17 11 23 3 4 4 7 4 11h26c0-4 1-7 4-11 5-6 11-12 11-23 0-15-11-27-28-27z" fill="#FFE680" stroke="#F2B93B" stroke-width="3"/><rect x="36" y="79" width="28" height="9" rx="3" fill="#B9C3D9"/><rect x="40" y="88" width="20" height="6" rx="3" fill="#8B97B5"/><circle cx="42" cy="46" r="3.2" fill="#14235B"/><circle cx="58" cy="46" r="3.2" fill="#14235B"/><path d="M43 56q7 7 14 0" fill="none" stroke="#14235B" stroke-width="3" stroke-linecap="round"/></svg>'
});

Kids.css(`
.g-lectura-x5{gap:.9rem}
.g-lectura-x5 .x5-stage{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;align-items:center;padding:.6rem 1rem;background:linear-gradient(#CDEBFA 0 62%,#BFE8A8 62%);border-radius:1.8rem;box-shadow:0 .4rem 0 rgba(20,35,91,.12);min-width:min(92%,14rem);max-width:100%;flex:none}
.g-lectura-x5 .x5-stage svg{width:clamp(4.8rem,17vmin,9rem);height:clamp(4.8rem,17vmin,9rem)}
.g-lectura-x5 .x5-stage.one svg{width:clamp(6.5rem,24vmin,12rem);height:clamp(6.5rem,24vmin,12rem)}
.g-lectura-x5 .x5-stage.many svg{width:clamp(4rem,13vmin,7rem);height:clamp(4rem,13vmin,7rem)}
.g-lectura-x5 .x5-pair{display:flex;align-items:center;gap:.8rem;flex-wrap:wrap;justify-content:center}
.g-lectura-x5 .x5-mini{background:#fff;border-radius:1.4rem;padding:.4rem .8rem;box-shadow:0 .3rem 0 var(--line);display:flex;align-items:center;gap:.5rem;font-family:'Baloo 2',sans-serif;font-size:clamp(1.3rem,4.5vmin,2rem)}
.g-lectura-x5 .x5-mini svg{width:clamp(3.4rem,10vmin,5.4rem);height:clamp(3.4rem,10vmin,5.4rem)}
.g-lectura-x5 .x5-sent{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(1.8rem,6.5vmin,3rem);background:#fff;padding:.2rem 1.4rem;border-radius:1.4rem;box-shadow:0 .3rem 0 var(--line)}
.g-lectura-x5 .x5-sent u{display:inline-block;min-width:3em;border-bottom:.22rem solid var(--g);text-decoration:none;text-align:center;color:var(--gd)}
.g-lectura-x5 .x5-opts .ans{font-size:clamp(1.7rem,6vmin,2.7rem);min-width:min(40%,10rem);padding:.3rem 1.3rem}
.g-lectura-x5 .x5-opts .ans.hint{animation:pulse 1s infinite;outline:.25rem solid #5CC77A}
`);

function wrongForm(w) {
  if (w.t === 's') return w.s + 'es';
  if (w.t === 'es') return w.s + 's';
  if (w.t === 'ch') return w.s.slice(0, -1) + 'zes';
  return w.s + 'es';
}
function stage(w, n, color) {
  return U.range(n).map(k => w.a === 'flower' ? Kids.art.get('flower', COLORS[k % 5]) : Kids.art.get(w.a)).join('');
}

Kids.game({
  id: 'lectura-x5', group: 'lectura', num: 9,
  title: '¿Singular o plural?', icon: 'flower', rounds: 7,
  blurb: 'Mira si hay uno o varios y elige la palabra correcta.',
  how: 'Mira el dibujo. Si hay uno, es singular. Si hay varios, es plural. Elige la palabra que le corresponde.',
  levels: ['Uno o varios', 'Gato y gatos', 'Lápiz y lápices'],
  round(g, i) {
    const lv = g.level, sh = g.shared = g.shared || { used: [] };
    if (i === 0) sh.used = [];
    const pool = lv === 1 ? B.filter(x => x.t === 's' || x.t === 'es') : lv === 2 ? B.filter(x => x.t === 's' || x.t === 'es') : B.filter(x => x.t !== 's');
    let cand = pool.filter(x => !sh.used.includes(x.s)); if (!cand.length) cand = pool;
    const w = U.pick(cand); sh.used.push(w.s);
    const art = w.g === 'm' ? 'un' : 'una', vs = w.g === 'm' ? 'varios' : 'varias';
    const opts = U.el('<div class="opts x5-opts"></div>');
    let right = null, done = false;
    function mk(text, ok) {
      const b = U.el(`<button class="ans">${U.esc(text)}</button>`); b._ok = ok;
      b.onclick = () => {
        if (done) return;
        if (ok) { done = true; b.classList.add('right'); opts.querySelectorAll('button').forEach(x => x.disabled = true); g.say(text); g.right(); }
        else { b.classList.add('bad'); g.wrong(); g.t(() => b.classList.remove('bad'), 450); }
      };
      return b;
    }
    if (lv === 1) {
      const many = Math.random() < .5, n = many ? U.rnd(2, 5) : 1;
      g.area.append(U.el(`<div class="x5-stage ${many ? 'many' : 'one'}">${stage(w, n)}</div>`), opts);
      U.shuffle([[`${art} ${w.s}`, !many], [`${vs} ${w.p}`, many]]).forEach(([t, ok]) => opts.appendChild(mk(t, ok)));
      g.ask('¿Qué hay en el dibujo?');
      g.helpHint = () => { const b = [...opts.children].find(x => x._ok); b.classList.add('hint'); g.toast(many ? 'Hay varios: cuéntalos' : 'Solo hay uno'); };
    } else if (lv === 2) {
      const n = U.rnd(2, 4);
      const one = U.el(`<div class="x5-mini">${Kids.art.get(w.a)}<span>${art} ${w.s}</span></div>`);
      const arrow = U.el('<div class="x5-mini" style="font-size:1.6rem">→</div>');
      const many = U.el(`<div class="x5-stage many">${stage(w, n)}</div>`);
      const row = U.el('<div class="x5-pair"></div>'); row.append(one, arrow, many);
      const sent = U.el(`<div class="x5-sent">Hay ${NUM[n]} <u>&nbsp;&nbsp;?&nbsp;&nbsp;</u></div>`);
      g.area.append(row, sent, opts);
      const set = [w.p, w.s, wrongForm(w)];
      U.shuffle(set).forEach(t => opts.appendChild(mk(t, t === w.p)));
      g.ask('Hay varios. ¿Cómo se dice?');
      g.helpHint = () => { [...opts.children].find(x => x._ok).classList.add('hint'); g.toast('Si hay varios, la palabra termina en «' + (w.t === 's' ? 's' : 'es') + '»'); };
    } else {
      const n = U.rnd(2, 5);
      g.area.append(U.el(`<div class="x5-stage many">${stage(w, n)}</div>`), U.el(`<div class="x5-sent">Hay ${NUM[n]} <u>&nbsp;&nbsp;?&nbsp;&nbsp;</u>.</div>`), opts);
      const wf = wrongForm(w), alt = w.t === 'acc' ? w.s + 's' : w.s;
      U.shuffle([w.p, w.s, wf]).forEach(t => opts.appendChild(mk(t, t === w.p)));
      g.ask('Completa: Hay ' + NUM[n] + ' …');
      g.helpHint = () => {
        [...opts.children].find(x => x._ok).classList.add('hint');
        g.toast(w.t === 'ch' ? 'Con -z cambia: la z se vuelve c' : w.t === 'acc' ? 'Cuidado con la tilde: ' + U.esc(w.s) + ' → ' + U.esc(w.p) : 'Al final lleva -es');
      };
    }
  }
});
})();
