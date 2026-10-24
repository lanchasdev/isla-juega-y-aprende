/* Mi primer diario — lectura-x20 */
(function () {
'use strict';
const K = window.Kids, U = K.util, A = K.art;

const S = (inner) => `<svg viewBox="0 0 100 100">${inner}</svg>`;
const eyes = '<circle cx="36" cy="44" r="5" fill="#14235B"/><circle cx="64" cy="44" r="5" fill="#14235B"/><circle cx="37.5" cy="42.5" r="1.8" fill="#fff"/><circle cx="65.5" cy="42.5" r="1.8" fill="#fff"/>';
const closed = '<path d="M28 46q8-8 16 0M56 46q8-8 16 0" fill="none" stroke="#14235B" stroke-width="3.5" stroke-linecap="round"/>';
const blush = '<circle cx="26" cy="58" r="5" fill="#FF9AA2" opacity=".6"/><circle cx="74" cy="58" r="5" fill="#FF9AA2" opacity=".6"/>';
A.add({
  'lx20-alegria': S(`<circle cx="50" cy="50" r="40" fill="#FFD23F"/>${eyes}${blush}<path d="M30 60q20 24 40 0z" fill="#fff" stroke="#14235B" stroke-width="3" stroke-linejoin="round"/>`),
  'lx20-emocion': S(`<circle cx="50" cy="50" r="40" fill="#FFA94D"/>${eyes}${blush}<path d="M34 62q16 22 32 0z" fill="#C0392B"/><path d="M82 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM14 18l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FFE27A"/>`),
  'lx20-calma': S(`<circle cx="50" cy="50" r="40" fill="#A8E6B8"/>${closed}${blush}<path d="M38 64q12 8 24 0" fill="none" stroke="#14235B" stroke-width="3.5" stroke-linecap="round"/>`),
  'lx20-sueno': S(`<circle cx="50" cy="50" r="40" fill="#CFC5F4"/>${closed}<ellipse cx="50" cy="66" rx="6" ry="7" fill="#14235B" opacity=".8"/><path d="M72 14h12l-12 12h12" fill="none" stroke="#6552C4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`),
  'lx20-sorpresa': S(`<circle cx="50" cy="50" r="40" fill="#9CD3F5"/>${eyes}<path d="M28 30q8-6 16 0M56 30q8-6 16 0" fill="none" stroke="#14235B" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="66" rx="8" ry="10" fill="#14235B"/>`),
  'lx20-tristeza': S(`<circle cx="50" cy="50" r="40" fill="#B5C7E8"/>${eyes}<path d="M30 38l12-5M70 38l-12-5" stroke="#14235B" stroke-width="3" stroke-linecap="round"/><path d="M38 70q12-10 24 0" fill="none" stroke="#14235B" stroke-width="3.5" stroke-linecap="round"/><path d="M34 54q-4 8 0 10 4-2 0-10z" fill="#6CC4EE"/>`),
  'lx20-tarde': S(`<circle cx="50" cy="62" r="26" fill="#FF9F43"/><rect x="0" y="62" width="100" height="38" fill="#FFE9C9"/><path d="M8 70h84M18 80h64" stroke="#FF9F43" stroke-width="4" stroke-linecap="round" opacity=".6"/><path d="M50 14v10M20 26l7 7M80 26l-7 7" stroke="#FFC21A" stroke-width="5" stroke-linecap="round"/>`),
  'lx20-cole': S(`<rect x="14" y="40" width="72" height="46" rx="4" fill="#FFB347"/><path d="M8 42L50 14l42 28z" fill="#E8604C"/><rect x="42" y="58" width="16" height="28" rx="3" fill="#8C5A2B"/><rect x="22" y="52" width="14" height="14" rx="2" fill="#CDEBFA"/><rect x="64" y="52" width="14" height="14" rx="2" fill="#CDEBFA"/><path d="M50 14V4" stroke="#14235B" stroke-width="3"/><path d="M50 4h12v7H50z" fill="#4C8DF6"/>`),
  'lx20-pincel': S(`<path d="M72 14l14 14-38 38-14-14z" fill="#F2B93B"/><path d="M34 52l14 14C44 82 28 88 12 86c4-14 8-28 22-34z" fill="#FF7EA8"/><circle cx="20" cy="82" r="3" fill="#FF4F81"/>`),
  'lx20-amigos': `<svg viewBox="0 0 100 100">${K.avatarSvg(0).replace('<svg viewBox="0 0 100 100">', '<svg x="2" y="22" width="58" height="58" viewBox="0 0 100 100">')}${K.avatarSvg(1).replace('<svg viewBox="0 0 100 100">', '<svg x="40" y="22" width="58" height="58" viewBox="0 0 100 100">')}</svg>`,
  'lx20-familia': `<svg viewBox="0 0 100 100">${K.avatarSvg(2).replace('<svg viewBox="0 0 100 100">', '<svg x="4" y="14" width="46" height="46" viewBox="0 0 100 100">')}${K.avatarSvg(3).replace('<svg viewBox="0 0 100 100">', '<svg x="50" y="14" width="46" height="46" viewBox="0 0 100 100">')}${K.avatarSvg(1).replace('<svg viewBox="0 0 100 100">', '<svg x="27" y="52" width="38" height="38" viewBox="0 0 100 100">')}</svg>`,
  'lx20-abuelos': `<svg viewBox="0 0 100 100">${K.avatarSvg(2).replace('<svg viewBox="0 0 100 100">', '<svg x="22" y="22" width="56" height="56" viewBox="0 0 100 100">')}</svg>`
});

const ACT = {
  desayuno: { l: 'Desayunar', art: 'cup', ph: 'desayuné' },
  cole: { l: 'Escuela', art: 'lx20-cole', ph: 'fui a la escuela' },
  parque: { l: 'Parque', art: 'tree', ph: 'fui al parque' },
  banar: { l: 'Bañarme', art: 'swimsuit', ph: 'me bañé' },
  jugar: { l: 'Jugar', art: 'ball', ph: 'jugué' },
  dibujar: { l: 'Dibujar', art: 'lx20-pincel', ph: 'dibujé' },
  cometa: { l: 'Cometa', art: 'kite', ph: 'volé una cometa' },
  coche: { l: 'Pasear', art: 'car', ph: 'paseé en coche' },
  flores: { l: 'Flores', art: 'flower', ph: 'recogí flores' },
  merienda: { l: 'Merendar', art: 'cake', ph: 'merendé' },
  cuento: { l: 'Leer', art: 'book', ph: 'leí un cuento' },
  tambor: { l: 'Música', art: 'drum', ph: 'toqué música' },
  tren: { l: 'Tren', art: 'train', ph: 'viajé en tren' },
  cenar: { l: 'Cenar', art: 'carrot', ph: 'cené' },
  dormir: { l: 'Dormir', art: 'bed', ph: 'me fui a dormir' },
  estrellas: { l: 'Estrellas', art: 'star', ph: 'miré las estrellas' },
  osito: { l: 'Mi osito', art: 'teddy', ph: 'abracé a mi osito' }
};
const FEEL = {
  alegria: { l: 'Alegría', art: 'lx20-alegria', ph: 'Sentí alegría.' },
  emocion: { l: 'Emoción', art: 'lx20-emocion', ph: 'Sentí emoción.' },
  calma: { l: 'Calma', art: 'lx20-calma', ph: 'Sentí calma.' },
  sueno: { l: 'Sueño', art: 'lx20-sueno', ph: 'Sentí sueño.' },
  sorpresa: { l: 'Sorpresa', art: 'lx20-sorpresa', ph: 'Sentí sorpresa.' },
  tristeza: { l: 'Tristeza', art: 'lx20-tristeza', ph: 'Sentí un poco de tristeza.' }
};
const WHO = {
  amigos: { l: 'Mis amigos', art: 'lx20-amigos', ph: 'con mis amigos' },
  familia: { l: 'Mi familia', art: 'lx20-familia', ph: 'con mi familia' },
  mascota: { l: 'Mi mascota', art: 'dog', ph: 'con mi mascota' },
  abuelos: { l: 'Mis abuelos', art: 'lx20-abuelos', ph: 'con mis abuelos' }
};
const PER = [
  { k: 'm', pre: 'Hoy por la mañana', ask: '¿Qué hiciste por la mañana?', name: 'Mañana', art: 'sun', pool: ['desayuno', 'cole', 'parque', 'banar', 'jugar', 'dibujar', 'cometa', 'coche', 'flores'] },
  { k: 't', pre: 'Por la tarde', ask: '¿Qué hiciste por la tarde?', name: 'Tarde', art: 'lx20-tarde', pool: ['jugar', 'merienda', 'parque', 'cuento', 'dibujar', 'tambor', 'flores', 'tren', 'cometa', 'banar'] },
  { k: 'n', pre: 'Por la noche', ask: '¿Qué hiciste por la noche?', name: 'Noche', art: 'moon', pool: ['cenar', 'banar', 'cuento', 'dormir', 'estrellas', 'osito', 'dibujar', 'tambor', 'jugar'] }
];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const KEY = 'isla-diario';

/* frase de un momento: html con palabras clave en color y texto plano */
function sentence(p, d) {
  const acts = d.acts.map(a => `<mark class="a">${ACT[a].ph}</mark>`).join(' y ');
  const who = d.who ? ` <mark class="w">${WHO[d.who].ph}</mark>` : '';
  const feel = d.feel ? ` <mark class="f">${FEEL[d.feel].ph}</mark>` : '';
  const html = `${p.pre} ${acts}${who}.${feel}`;
  return html;
}
const plain = html => html.replace(/<[^>]+>/g, '');

Kids.css(`
.g-lectura-x20 .wrap{width:100%;max-width:52rem;display:flex;flex-direction:column;align-items:center;gap:.8rem}
.g-lectura-x20 .steps{display:flex;gap:.6rem;align-items:center;justify-content:center}
.g-lectura-x20 .steps .st{display:flex;align-items:center;gap:.4rem;padding:.2rem .9rem .2rem .3rem;border-radius:999px;background:#fff;box-shadow:0 .25rem 0 var(--line);font-family:'Baloo 2';font-size:1.15rem;opacity:.55}
.g-lectura-x20 .steps .st svg{width:2.2rem;height:2.2rem}
.g-lectura-x20 .steps .st.on{opacity:1;background:var(--gl);box-shadow:0 .25rem 0 var(--g)}
.g-lectura-x20 .steps .st.done{opacity:1}
.g-lectura-x20 .live{font-family:'Baloo 2';font-size:clamp(1.15rem,2.8vh,1.6rem);line-height:1.3;min-height:3.4rem;text-align:center;max-width:100%}
.g-lectura-x20 mark{background:none;font-weight:800;border-radius:.4rem;padding:0 .15rem}
.g-lectura-x20 mark.a{color:#C0392B;background:#FFE4DE}
.g-lectura-x20 mark.w{color:#1F6FD0;background:#DCEBFA}
.g-lectura-x20 mark.f{color:#2E8B4A;background:#DDF6E3}
.g-lectura-x20 .opts .pic{width:clamp(5.2rem,15vw,7.6rem);padding:.45rem}
.g-lectura-x20 .opts .pic svg{height:clamp(3.4rem,9vh,5rem);width:100%}
.g-lectura-x20 .opts .pic .lbl{font-size:clamp(1rem,2.4vh,1.3rem)}
.g-lectura-x20 .opts .pic.on{border-color:var(--green);background:#E8F9EC;box-shadow:0 .4rem 0 var(--green);transform:translateY(-.15rem)}
.g-lectura-x20 .opts .pic.on::after{content:'✓';position:absolute;top:-.5rem;right:-.4rem;width:1.7rem;height:1.7rem;border-radius:50%;background:var(--green);color:#fff;font-size:1.1rem;display:flex;align-items:center;justify-content:center}
.g-lectura-x20 .row{display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center}
.g-lectura-x20 .page{width:100%;background:#fff;border-radius:1.8rem;padding:1rem 1.2rem;box-shadow:0 .4rem 0 var(--line);border:.25rem solid #F3E7C8;background-image:repeating-linear-gradient(transparent 0 2rem,rgba(76,141,246,.08) 2rem 2.1rem)}
.g-lectura-x20 .page h2{font-size:clamp(1.5rem,4vh,2.2rem);color:var(--lecturaD);text-align:center}
.g-lectura-x20 .page small{display:block;text-align:center;color:var(--ink2);font-family:'Baloo 2';margin-bottom:.4rem}
.g-lectura-x20 .dl{display:flex;gap:.7rem;align-items:center;padding:.4rem 0;border-top:.15rem dashed #EADFC8}
.g-lectura-x20 .dl .pe{flex:none;width:clamp(2.6rem,7vh,3.6rem)}
.g-lectura-x20 .dl .stk{flex:none;display:flex;gap:.2rem}
.g-lectura-x20 .dl .stk svg{width:clamp(2.2rem,6vh,3.2rem);height:clamp(2.2rem,6vh,3.2rem)}
.g-lectura-x20 .dl p{margin:0;font-family:'Baloo 2';font-size:clamp(1.1rem,2.7vh,1.5rem);line-height:1.3}
.g-lectura-x20 .dl p{flex:1 1 12rem;min-width:0}
@media (max-width:640px){.g-lectura-x20 .dl{flex-wrap:wrap}.g-lectura-x20 .dl p{flex:1 1 100%}.g-lectura-x20 .page{padding:.7rem .8rem}}
.g-lectura-x20 .intro{display:flex;flex-direction:column;gap:1rem;align-items:center}
.g-lectura-x20 .intro .lion{width:9rem}
`);

let diary = null;
function load() { try { const d = JSON.parse(localStorage.getItem(KEY) || 'null'); return d && d.d ? d : null; } catch (e) { return null; } }

K.game({
  id: 'lectura-x20', group: 'lectura', num: 24,
  title: 'Mi primer diario', icon: 'book', rounds: 1,
  blurb: 'Cuenta cómo ha sido tu día eligiendo pegatinas y escucha tu diario.',
  how: 'Elige pegatinas para contar qué hiciste por la mañana, por la tarde y por la noche. Después podrás escuchar tu diario.',
  levels: ['Una pegatina por momento', 'Pegatinas y cómo me sentí', 'Pegatinas, emoción y con quién'],
  stars() { return 3; },
  round(g) {
    const lv = g.level;
    const root = U.el('<div class="wrap"></div>'); g.area.appendChild(root);
    diary = { m: { acts: [] }, t: { acts: [] }, n: { acts: [] } };
    const nStick = lv === 1 ? 4 : lv === 2 ? 6 : 8;
    const maxPick = lv === 1 ? 1 : 2;
    const deckFor = {}; PER.forEach(p => { deckFor[p.k] = U.sample(p.pool, nStick); });

    const stepsBar = pi => `<div class="steps">${PER.map((p, k) => `<span class="st ${k === pi ? 'on' : k < pi ? 'done' : ''}">${A.get(p.art)}${p.name}</span>`).join('')}</div>`;
    const liveLine = (p, d) => d.acts.length ? sentence(p, d) : '&nbsp;';

    function intro(saved) {
      g.ask('¿Quieres ver tu último diario o hacer uno nuevo?');
      root.innerHTML = `<div class="intro"><div class="lion">${A.get('lion')}</div>
        <button class="btn" id="new">Hacer mi diario de hoy</button>
        <button class="btn blue" id="old">Ver mi último diario</button></div>`;
      root.querySelector('#new').onclick = () => { K.sound.pop(); stepAct(0); };
      root.querySelector('#old').onclick = () => { K.sound.pop(); view(saved.d, saved.level, saved.date, false); };
    }

    function stepAct(pi) {
      const p = PER[pi], d = diary[p.k]; d.acts = [];
      g.ask(p.ask + (maxPick > 1 ? ' Elige una o dos pegatinas' : ' Elige una pegatina'));
      root.innerHTML = `${stepsBar(pi)}<div class="card live" aria-live="polite">&nbsp;</div><div class="opts"></div><div class="row"><button class="btn" id="ok" disabled style="opacity:.5">Listo ${K.icons.arrow}</button></div>`;
      const live = root.querySelector('.live'), box = root.querySelector('.opts'), ok = root.querySelector('#ok');
      const upd = () => { live.innerHTML = liveLine(p, d); ok.disabled = !d.acts.length; ok.style.opacity = d.acts.length ? 1 : .5; };
      ok.onclick = () => { if (d.acts.length) next(pi, 'act'); };
      if (lv === 1) root.querySelector('.row').style.display = 'none';
      deckFor[p.k].forEach(a => {
        const b = U.el(`<button class="pic" aria-label="${U.esc(ACT[a].l)}" aria-pressed="false">${A.get(ACT[a].art)}<span class="lbl">${U.esc(ACT[a].l)}</span></button>`);
        b.onclick = () => {
          K.sound.pop();
          const at = d.acts.indexOf(a);
          if (at >= 0) { d.acts.splice(at, 1); b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); upd(); return; }
          if (d.acts.length >= maxPick) {
            if (maxPick === 1) { box.querySelectorAll('.pic.on').forEach(x => x.classList.remove('on')); d.acts = []; }
            else { g.toast('Solo dos pegatinas. Quita una para cambiar'); return; }
          }
          d.acts.push(a); b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); upd();
          g.say(ACT[a].l);
          if (lv === 1) { g.say(plain(sentence(p, d))); g.t(() => next(pi, 'act'), 1700); }
        };
        box.appendChild(b);
      });
    }

    function stepPick(pi, kind) {
      const p = PER[pi], d = diary[p.k];
      const src = kind === 'feel' ? FEEL : WHO;
      g.ask(kind === 'feel' ? `¿Cómo te sentiste por la ${p.k === 'm' ? 'mañana' : p.k === 't' ? 'tarde' : 'noche'}?` : `¿Con quién estabas por la ${p.k === 'm' ? 'mañana' : p.k === 't' ? 'tarde' : 'noche'}?`);
      root.innerHTML = `${stepsBar(pi)}<div class="card live">${sentence(p, d)}</div><div class="opts"></div>`;
      const box = root.querySelector('.opts'), live = root.querySelector('.live');
      Object.keys(src).forEach(key => {
        const b = U.el(`<button class="pic" aria-label="${U.esc(src[key].l)}">${A.get(src[key].art)}<span class="lbl">${U.esc(src[key].l)}</span></button>`);
        b.onclick = () => {
          K.sound.pop(); box.querySelectorAll('.pic.on').forEach(x => x.classList.remove('on')); b.classList.add('on');
          d[kind === 'feel' ? 'feel' : 'who'] = key; live.innerHTML = sentence(p, d);
          g.say(src[key].l);
          g.t(() => next(pi, kind), 900);
        };
        box.appendChild(b);
      });
    }

    function next(pi, from) {
      if (from === 'act' && lv >= 2) return stepPick(pi, lv === 3 ? 'who' : 'feel');
      if (from === 'who') return stepPick(pi, 'feel');
      if (pi < 2) return stepAct(pi + 1);
      saveIt(); view(diary, lv, null, true);
    }

    function saveIt() {
      const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
      try { localStorage.setItem(KEY, JSON.stringify({ d: diary, level: lv, date })); } catch (e) {}
    }

    function view(d, level, date, fresh) {
      date = date || new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
      const name = (K.save.data.name || '').trim();
      const lines = PER.map(p => { const x = d[p.k]; return { p, x, html: sentence(p, x) }; });
      const full = lines.map(l => plain(l.html)).join(' ');
      g.ask(fresh ? '¡Tu diario está listo! Pulsa para escucharlo' : 'Este es tu último diario');
      root.innerHTML = `<div class="page"><h2>Mi diario${name ? ' de ' + U.esc(name) : ''}</h2><small>${U.esc(date)}</small>
        ${lines.map(l => `<div class="dl"><div class="pe">${A.get(l.p.art)}</div><div class="stk">${l.x.acts.map(a => A.get(ACT[a].art)).join('')}${l.x.who ? A.get(WHO[l.x.who].art) : ''}${l.x.feel ? A.get(FEEL[l.x.feel].art) : ''}</div><p>${l.html}</p></div>`).join('')}</div>
        <div class="row"><button class="btn blue" id="read" aria-label="Leer mi diario en voz alta">${K.icons.speaker} Leer mi diario</button>
        ${fresh ? `<button class="btn" id="fin">Terminar ${K.icons.arrow}</button>` : `<button class="btn" id="new">Hacer uno nuevo</button>`}</div>`;
      root.querySelector('#read').onclick = () => g.say(full);
      if (fresh) { g.t(() => g.say(full), 900); root.querySelector('#fin').onclick = () => { if (!root._done) { root._done = true; g.right('¡Qué diario tan bonito!'); } }; }
      else root.querySelector('#new').onclick = () => { K.sound.pop(); stepAct(0); };
    }

    const saved = load();
    if (saved) intro(saved); else stepAct(0);
  }
});
})();
