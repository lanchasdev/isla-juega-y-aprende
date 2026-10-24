/* Lectura x9 — Dictado con voz */
(function () {
'use strict';
const U = Kids.util;
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
/* nivel 1: con dibujo (3 y 4 letras) */
const L1 = [['sol', 'sun'], ['pez', 'fish'], ['oso', 'bear'], ['gato', 'cat'], ['pato', 'duck'], ['casa', 'house'], ['luna', 'moon'], ['mesa', 'table'],
  ['pera', 'pear'], ['tren', 'train'], ['cama', 'bed'], ['taza', 'cup'], ['rana', 'frog'], ['vaca', 'cow'], ['nube', 'cloud'], ['mono', 'monkey'],
  ['flor', 'flower'], ['uvas', 'grapes'], ['llave', 'key'], ['coche', 'car']];
const L2 = ['perro', 'silla', 'fresa', 'libro', 'globo', 'barco', 'cerdo', 'tarta', 'zorro', 'oveja', 'abeja', 'árbol', 'ratón', 'balón', 'león', 'agua', 'mano',
  'boca', 'nariz', 'queso', 'leche', 'pollo', 'lápiz', 'sopa', 'nieve', 'playa', 'mundo', 'feliz', 'cielo', 'amigo', 'verde', 'mamá', 'papá', 'ojos', 'pelo', 'tigre', 'lobo', 'hoja', 'isla'];
const L3W = ['caballo', 'tortuga', 'jirafa', 'manzana', 'naranja', 'plátano', 'zapato', 'conejo', 'cereza', 'tambor', 'lámpara', 'cometa', 'abuela', 'escuela', 'pelota', 'ventana', 'colores',
  'bonito', 'ardilla', 'bosque', 'familia', 'camisa', 'cocina', 'jardín', 'ratones', 'pájaro', 'dibujar'];
const L3P = ['la luna', 'el gato', 'mi casa', 'un pato', 'una flor', 'el sol', 'mi mamá', 'la mesa', 'un perro', 'mi amigo', 'la escuela', 'el coche', 'buenos días', 'una niña',
  'mi papá', 'las uvas', 'el libro', 'la rana', 'un niño', 'el tren', 'mi abuela', 'la playa'];
const ALPHA = 'abcdefghijklmnñopqrstuvwxyz'.split('');
let usedAll = [];

Kids.css(`
.g-lectura-x9{gap:.9rem}
.g-lectura-x9 .x9-pic{width:clamp(7rem,24vmin,11rem);height:clamp(7rem,24vmin,11rem);padding:.7rem;background:#fff;border-radius:2rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line)}
.g-lectura-x9 .x9-pic svg{width:100%;height:100%}
.g-lectura-x9 .x9-slots{display:flex;gap:.4rem;justify-content:center;align-items:center;flex-wrap:wrap;max-width:100%}
.g-lectura-x9 .x9-gap{width:1.3rem}
.g-lectura-x9 .x9-s{width:var(--sw);height:calc(var(--sw) * 1.25);border-radius:1rem;border:.2rem solid var(--line);border-bottom:.35rem solid #9CB5E8;background:#fff;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2',sans-serif;font-weight:800;font-size:calc(var(--sw) * .66);line-height:1;color:var(--ink);padding:0}
.g-lectura-x9 .x9-s.cur{border-color:var(--yellow);background:#FFF9DB;border-bottom-color:var(--yellow)}
.g-lectura-x9 .x9-s.bad{background:#FFD3CF;border-color:#F28C84}
.g-lectura-x9 .x9-s.ok{background:#BDEFC8;border-color:#5CC77A;border-bottom-color:#5CC77A}
.g-lectura-x9 .x9-kb{display:grid;gap:.45rem;grid-template-columns:repeat(auto-fit,minmax(max(56px,3.6rem),1fr));width:min(100%,38rem)}
.g-lectura-x9 .x9-kb.few{width:min(100%,24rem);grid-template-columns:repeat(auto-fit,minmax(max(56px,3.6rem),5.2rem));justify-content:center}
.g-lectura-x9 .x9-k{min-height:max(56px,3.6rem);border-radius:1.1rem;background:var(--a1);box-shadow:0 .3rem 0 rgba(20,35,91,.16);font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(1.8rem,5vmin,2.4rem);color:var(--ink);padding:0;transition:transform .1s}
.g-lectura-x9 .x9-k:nth-child(4n+2){background:var(--a2)}
.g-lectura-x9 .x9-k:nth-child(4n+3){background:var(--a3)}
.g-lectura-x9 .x9-k:nth-child(4n+4){background:var(--a4)}
.g-lectura-x9 .x9-k:active{transform:translateY(.2rem);box-shadow:0 .1rem 0 rgba(20,35,91,.16)}
.g-lectura-x9 .x9-k[disabled]{opacity:.25;pointer-events:none}
.g-lectura-x9 .x9-k.hint{animation:pulse .9s infinite;outline:.25rem solid #5CC77A}
.g-lectura-x9 .x9-act{display:flex;gap:.7rem;justify-content:center;flex-wrap:wrap}
.g-lectura-x9 .x9-act .btn{font-size:1.3rem;padding:.4rem 1.3rem;min-height:3.6rem}
.g-lectura-x9 .x9-act .btn svg{width:1.3em;height:1.3em}
`);

Kids.game({
  id: 'lectura-x9', group: 'lectura', num: 13,
  title: 'Dictado con voz', icon: 'owl', rounds: 6,
  blurb: 'Escucha la palabra y escríbela con las letras.',
  how: 'Escucha la palabra. Toca las letras para escribirla y después toca comprobar. Puedes oírla otra vez.',
  levels: ['Con dibujo y letras justas', 'Sin dibujo, teclado', 'Palabras largas y frases'],
  round(g, i) {
    if (i === 0) usedAll = [];
    const lv = g.level; let text, art = null, phrase = false;
    const fresh = a => { const c = a.filter(x => !usedAll.includes(Array.isArray(x) ? x[0] : x)); return U.pick(c.length ? c : a); };
    if (lv === 1) { const x = fresh(L1); text = x[0]; art = x[1]; }
    else if (lv === 2) text = fresh(L2);
    else { phrase = Math.random() < .4; text = fresh(phrase ? L3P : L3W); }
    usedAll.push(text);
    const target = norm(text).replace(/ /g, '');
    const chars = text.split(''); /* con espacios y tildes */
    const letterPos = chars.map((c, k) => c === ' ' ? -1 : k).filter(k => k >= 0);
    const n = letterPos.length;

    g.ask(lv === 1 ? 'Escucha y escribe la palabra' : phrase ? 'Escucha y escribe las dos palabras' : 'Escucha y escribe la palabra');
    g.t(() => g.say(text), 1500);

    if (art) g.area.appendChild(U.el(`<div class="x9-pic" aria-hidden="true">${Kids.art.get(art)}</div>`));
    const slotsEl = U.el('<div class="x9-slots" aria-label="Tu palabra"></div>');
    const sw = `min(${lv === 3 ? 4.2 : 4.8}rem, calc((100vw - 4rem) / ${chars.length + 0.5}))`;
    slotsEl.style.setProperty('--sw', sw);
    const slots = [];
    chars.forEach(c => {
      if (c === ' ') { slotsEl.appendChild(U.el('<span class="x9-gap"></span>')); return; }
      const s = U.el('<button class="x9-s" aria-label="Casilla vacía"></button>'); slotsEl.appendChild(s); slots.push(s);
    });
    g.area.appendChild(slotsEl);

    /* teclado o fichas */
    let letters;
    if (lv === 1) {
      const extra = U.sample(ALPHA.filter(x => !target.includes(x) && x !== 'ñ'), 3);
      letters = U.shuffle(target.split('').concat(extra));
    } else letters = ALPHA;
    const kb = U.el(`<div class="x9-kb ${lv === 1 ? 'few' : ''}"></div>`);
    const keys = letters.map(L => {
      const b = U.el(`<button class="x9-k" aria-label="Letra ${L}">${L.toUpperCase()}</button>`); b._l = L; kb.appendChild(b); return b;
    });
    g.area.appendChild(kb);
    const act = U.el(`<div class="x9-act">
      <button class="btn blue" data-a="rep" aria-label="Escuchar otra vez">${Kids.icons.speaker} Oír</button>
      <button class="btn white" data-a="del" aria-label="Borrar la última letra">⌫ Borrar</button>
      <button class="btn" data-a="ok" aria-label="Comprobar">${Kids.icons.check} Comprobar</button></div>`);
    g.area.appendChild(act);

    const typed = Array(n).fill(null); /* {l, key} */
    let finished = false;
    function render() {
      const cur = typed.indexOf(null);
      slots.forEach((s, k) => {
        const t = typed[k]; s.textContent = t ? t.l.toUpperCase() : '';
        s.classList.toggle('cur', k === cur); s.classList.remove('bad');
        s.setAttribute('aria-label', t ? 'Letra ' + t.l + ', toca para borrar' : 'Casilla vacía');
      });
      if (lv === 1) { const used = typed.filter(Boolean).map(t => t.key); keys.forEach(k => k.disabled = used.includes(k)); }
    }
    function put(key) {
      if (finished) return; const p = typed.indexOf(null); if (p < 0) { g.toast('Ya tienes todas las letras. Toca comprobar'); return; }
      typed[p] = { l: key._l, key }; Kids.sound.tap(); render();
    }
    keys.forEach(k => k.onclick = () => { k.classList.remove('hint'); put(k); });
    slots.forEach((s, k) => s.onclick = () => { if (finished || !typed[k]) return; typed[k] = null; Kids.sound.tap(); render(); });
    act.querySelector('[data-a=del]').onclick = () => {
      if (finished) return; let p = typed.indexOf(null); p = p < 0 ? n - 1 : p - 1; if (p >= 0) { typed[p] = null; Kids.sound.tap(); render(); }
    };
    act.querySelector('[data-a=rep]').onclick = () => g.say(text);
    act.querySelector('[data-a=ok]').onclick = () => {
      if (finished) return;
      if (typed.includes(null)) { g.toast('Aún faltan letras. ¡Sigue escribiendo!'); return; }
      const got = typed.map(t => t.l).join('');
      if (got === target) {
        finished = true; keys.forEach(k => k.disabled = true);
        slots.forEach((s, k) => { s.textContent = chars[letterPos[k]].toUpperCase(); s.classList.remove('cur'); s.classList.add('ok', 'pop'); });
        if (text !== norm(text)) g.toast('Se escribe con tilde: <b>' + U.esc(text) + '</b>');
        g.say(text); g.right();
      } else {
        typed.forEach((t, k) => { if (t.l !== target[k]) slots[k].classList.add('bad'); });
        slots.forEach(s => g.shake(s)); g.wrong('Casi. Toca las casillas rojas para cambiarlas');
      }
    };
    g.helpHint = () => {
      /* quita las letras mal puestas y marca la siguiente */
      typed.forEach((t, k) => { if (t && t.l !== target[k]) typed[k] = null; }); render();
      const p = typed.indexOf(null); if (p < 0) return;
      const want = target[p]; const kk = keys.find(x => x._l === want && !x.disabled); if (kk) { kk.classList.add('hint'); g.t(() => kk.classList.remove('hint'), 4000); }
      g.toast('Mira la letra que brilla');
    };
    render();
  }
});
})();
