/* Isla Juega y Aprende — núcleo: utilidades, dibujos, voz, sonido, pantallas y motor de juegos */
(function () {
'use strict';
const K = window.Kids = {};

/* ================= utilidades ================= */
const U = K.util = {
  shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  pick(a) { return a[Math.floor(Math.random() * a.length)]; },
  sample(a, n) { return U.shuffle(a).slice(0, n); },
  rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
  el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; },
  esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); },
  range(n, from) { return Array.from({ length: n }, (_, i) => i + (from || 0)); }
};
K.css = function (text) { const s = document.createElement('style'); s.textContent = text; document.head.appendChild(s); };

/* ================= dibujos (SVG) ================= */
const ART = {};
K.art = {
  add(map) { Object.assign(ART, map); },
  has(n) { return n in ART; },
  names() { return Object.keys(ART); },
  /* devuelve un string <svg viewBox="0 0 100 100"> ; admite argumentos (p.ej. art.get('balloon','#f00')) */
  get(name, ...args) {
    const a = ART[name];
    if (a === undefined) { console.warn('[art] falta el dibujo:', name); return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="#EADFC8"/><text x="50" y="58" font-size="26" text-anchor="middle" fill="#8a7a55" font-family="sans-serif">?</text></svg>'; }
    return typeof a === 'function' ? a(...args) : a;
  }
};

/* ================= iconos de interfaz ================= */
const IC = K.icons = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 4V5L7 9z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.2 5.8a9 9 0 0 1 0 12.4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 4V5L7 9z"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" width="1.2em" height="1.2em"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="1.2em" height="1.2em"><path d="M20 12a8 8 0 1 1-2.5-5.8M20 4v5h-5"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="currentColor" width="1.2em" height="1.2em"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zm0 2.2 6 2v9.6l-6-2z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l5 5 9-10"/></svg>'
};
const starSvg = (on, cls) => `<svg viewBox="0 0 24 24" class="${cls || ''}"><path d="M12 2.2l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.1 6 20.6l1.3-6.7-5-4.7 6.8-.8z" fill="${on ? '#FFC21A' : '#E7DFCC'}" stroke="${on ? '#E69A00' : '#D6CBB0'}" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
K.starSvg = starSvg;
const starsRow = (n, of) => `<span class="stars">${U.range(of || 3).map(i => starSvg(i < n)).join('')}</span>`;

/* ================= grupos ================= */
K.groups = {
  mates:   { id: 'mates',   name: 'Matemáticas', short: 'Matemáticas', color: 'var(--mates)',   light: 'var(--matesL)',   dark: 'var(--matesD)',   mascot: 'lion',     mascot2: 'duck' },
  lectura: { id: 'lectura', name: 'Lectura',     short: 'Lectura',     color: 'var(--lectura)', light: 'var(--lecturaL)', dark: 'var(--lecturaD)', mascot: 'fox',      mascot2: 'cat' },
  memoria: { id: 'memoria', name: 'Memoria y lógica', short: 'Memoria', color: 'var(--memoria)', light: 'var(--memoriaL)', dark: 'var(--memoriaD)', mascot: 'elephant', mascot2: 'owl' },
  mundo:   { id: 'mundo',   name: 'Conocimiento del mundo', short: 'Mundo', color: 'var(--mundo)', light: 'var(--mundoL)', dark: 'var(--mundoD)', mascot: 'parrot', mascot2: 'turtle' }
};
K.games = [];
/* K.game({id, group, num, title, blurb, icon:'artName', rounds, round(g,i), start?(g), stars?(mistakes,rounds)}) */
K.game = function (def) { K.games.push(def); K.games.sort((a, b) => (a.group === b.group ? a.num - b.num : 0)); };
const gamesOf = gid => K.games.filter(g => g.group === gid).sort((a, b) => a.num - b.num);
const gameById = id => K.games.find(g => g.id === id);

/* ================= voz y sonido ================= */
const save = K.save = {
  data: { name: '', avatar: 0, voice: true, sound: true, stars: {}, last: {} },
  load() { try { const d = JSON.parse(localStorage.getItem('isla-v1') || '{}'); Object.assign(save.data, d); } catch (e) {} },
  flush() { try { localStorage.setItem('isla-v1', JSON.stringify(save.data)); } catch (e) {} },
  stars(id) { return save.data.stars[id] || [0, 0, 0]; },
  best(id) { return Math.max(0, ...save.stars(id)); },
  setStars(id, level, n) { const a = save.stars(id).slice(); a[level - 1] = Math.max(a[level - 1], n); save.data.stars[id] = a; save.flush(); },
  groupStars(gid) { return gamesOf(gid).reduce((s, g) => s + save.best(g.id), 0); },
  total() { return Object.keys(K.groups).reduce((s, g) => s + save.groupStars(g), 0); }
};
save.load();

K.voice = {
  say(text) {
    if (!save.data.voice || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/[¿¡]/g, ''));
      u.lang = 'es-ES'; u.rate = 0.88; u.pitch = 1.15;
      const v = speechSynthesis.getVoices().find(v => /^es/i.test(v.lang));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) {}
  },
  stop() { try { speechSynthesis.cancel(); } catch (e) {} }
};
let actx = null;
function tone(freq, t0, dur, type, vol) {
  if (!save.data.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    const t = actx.currentTime + t0;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + dur + 0.05);
  } catch (e) {}
}
K.sound = {
  tone(freq, t0, dur, type, vol) { tone(freq, t0 || 0, dur || .3, type, vol); },
  ctx() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); return actx; } catch (e) { return null; } },
  ok() { tone(523, 0, .14, 'triangle'); tone(659, .1, .14, 'triangle'); tone(784, .2, .3, 'triangle'); },
  bad() { tone(300, 0, .18, 'sine', .12); tone(240, .15, .25, 'sine', .12); },
  pop() { tone(660, 0, .08, 'sine', .1); },
  tap() { tone(440, 0, .06, 'sine', .08); },
  win() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .14, .3, 'triangle')); }
};

/* ================= arrastrar y soltar =================
   K.drag(el,{ targets:()=>[els], onDrop:(target,el)=>true|false, onTap?:(el)=>{}, onStart?:(el)=>{} })
   Si onDrop devuelve true el juego es responsable de colocar el elemento (p.ej. target.appendChild(el)). */
K.drag = function (el, o) {
  el.classList.add('draggable'); el.style.touchAction = 'none';
  let sx = 0, sy = 0, active = false, moved = false;
  const hit = e => o.targets().find(t => { const r = t.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; });
  el.addEventListener('pointerdown', e => {
    if (el.dataset.locked) return;
    active = true; moved = false; sx = e.clientX; sy = e.clientY;
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    el.classList.add('dragging'); K.sound.pop(); o.onStart && o.onStart(el);
  });
  el.addEventListener('pointermove', e => {
    if (!active) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
    el.style.transform = `translate(${dx}px,${dy}px) scale(1.08)`;
    const t = hit(e); o.targets().forEach(x => x.classList.toggle('hot', x === t));
  });
  const end = e => {
    if (!active) return; active = false;
    el.classList.remove('dragging'); o.targets().forEach(x => x.classList.remove('hot'));
    const t = moved ? hit(e) : null; let ok = false;
    if (t) ok = o.onDrop(t, el);
    if (!moved && o.onTap) o.onTap(el);
    el.style.transition = ok ? '' : 'transform .25s';
    el.style.transform = '';
    if (!ok) setTimeout(() => { el.style.transition = ''; }, 280);
  };
  el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
};

/* ================= decoración ================= */
const bush = c => `<svg viewBox="0 0 140 70" class="bush"><g fill="${c || '#7FCB8A'}"><ellipse cx="30" cy="62" rx="30" ry="22"/><ellipse cx="72" cy="58" rx="34" ry="30"/><ellipse cx="112" cy="64" rx="28" ry="20"/></g><g fill="#5FB070"><ellipse cx="60" cy="66" rx="18" ry="12"/><ellipse cx="100" cy="68" rx="14" ry="8"/></g><circle cx="26" cy="46" r="4" fill="#FF8FA3"/><circle cx="84" cy="38" r="4" fill="#FFD23F"/><circle cx="118" cy="52" r="4" fill="#fff"/></svg>`;
function avatarSvg(i) {
  const sk = ['#F6C9A0', '#F3B58F', '#FFD7B5', '#9B5E3A'][i], hair = ['#6B3E1E', '#2B1B12', '#E4572E', '#1B1B1B'][i];
  const bg = ['#BFE3FA', '#FFC9DC', '#C9F0D6', '#DCD0FA'][i], shirt = ['#4C8DF6', '#FF7EA8', '#F2B93B', '#5CC77A'][i];
  const back = [
    '', '<path d="M20 60 Q18 20 50 20 Q82 20 80 60 L80 90 L20 90Z" fill="' + hair + '"/>', '<circle cx="28" cy="40" r="11" fill="' + hair + '"/><circle cx="72" cy="40" r="11" fill="' + hair + '"/>', '<circle cx="50" cy="42" r="36" fill="' + hair + '"/>'
  ][i];
  const top = [
    '<path d="M24 52 Q22 24 50 24 Q78 24 76 52 Q64 38 50 41 Q36 38 24 52Z" fill="' + hair + '"/>',
    '<path d="M26 52 Q26 26 50 26 Q74 26 74 52 Q60 36 40 38 Q30 40 26 52Z" fill="' + hair + '"/><path d="M60 24l8-8 4 12zM60 24l-6-9-6 10z" fill="#FF4F81" transform="translate(6 1)"/>',
    '<path d="M24 50 Q24 24 50 24 Q76 24 76 50 Q62 36 50 40 Q38 36 24 50Z" fill="' + hair + '"/>',
    '<path d="M26 50 Q28 30 50 30 Q72 30 74 50 Q60 42 50 44 Q40 42 26 50Z" fill="' + hair + '"/>'
  ][i];
  const glasses = i === 2 ? '<g fill="none" stroke="#14235B" stroke-width="2.4"><circle cx="40" cy="58" r="8"/><circle cx="60" cy="58" r="8"/><path d="M48 58h4"/></g>' : '';
  return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="${bg}"/>${back}<path d="M16 100 Q20 80 50 80 Q80 80 84 100Z" fill="${shirt}"/><rect x="43" y="72" width="14" height="12" rx="5" fill="${sk}"/><circle cx="50" cy="56" r="25" fill="${sk}"/>${top}${glasses}<circle cx="40" cy="58" r="3.2" fill="#14235B"/><circle cx="60" cy="58" r="3.2" fill="#14235B"/><circle cx="33" cy="66" r="4" fill="#FF9AA2" opacity=".7"/><circle cx="67" cy="66" r="4" fill="#FF9AA2" opacity=".7"/><path d="M42 68 Q50 76 58 68" fill="none" stroke="#14235B" stroke-width="2.8" stroke-linecap="round"/></svg>`;
}
K.avatarSvg = avatarSvg;

/* ================= router ================= */
const app = () => document.getElementById('app');
let dispose = null;
let cur = '';
function go(hash) { cur = hash.replace(/^#\/?/, ''); try { history.replaceState(null, '', hash); } catch (e) {} route(); }
K.go = go;
function mount(html, cls) {
  if (dispose) { dispose(); dispose = null; }
  K.voice.stop();
  const a = app(); a.innerHTML = '';
  const s = U.el(`<div class="screen ${cls || ''}">${html}</div>`);
  a.appendChild(s); return s;
}
function route() {
  const [a, b, c] = cur.split('/');
  if (a === 'map') mapScreen();
  else if (a === 'group' && K.groups[b]) libScreen(b);
  else if (a === 'prep' && gameById(b)) prepScreen(gameById(b));
  else if (a === 'play' && gameById(b)) playGame(gameById(b), Math.min(3, Math.max(1, +c || 1)));
  else homeScreen();
}
K.start = function () {
  try { cur = location.hash.replace(/^#\/?/, ''); } catch (e) {}
  window.addEventListener('hashchange', () => { cur = location.hash.replace(/^#\/?/, ''); route(); });
  route();
};

/* ================= portada ================= */
function homeScreen() {
  const d = save.data; let sel = d.avatar || 0;
  const s = mount(`
    <div class="logo"><div class="disp">Isla Juega y Aprende</div><small>Juegos para niños y niñas de 6 y 7 años</small></div>
    <div class="hills"><svg viewBox="0 0 400 150" preserveAspectRatio="none"><path d="M0 70 Q80 20 170 60 T400 40 V150 H0Z" fill="#A9DE9A"/><path d="M0 100 Q110 60 220 95 T400 80 V150 H0Z" fill="#7FCB8A"/></svg></div>
    <div class="hello">
      <h1>¡Hola!</h1><p>¿Cómo te llamas?</p>
      <div class="avatars">${U.range(4).map(i => `<button class="avatar ${i === sel ? 'sel' : ''}" data-av="${i}" aria-label="Avatar ${i + 1}">${avatarSvg(i)}</button>`).join('')}</div>
      <label class="nameBox"><input id="nm" maxlength="14" placeholder="Escribe tu nombre" value="${U.esc(d.name || '')}" autocomplete="off"></label>
      <button class="btn" id="go">Vamos a jugar ${IC.arrow}</button>
    </div>
    <div class="dogbox" aria-hidden="true">${K.art.get('dog')}</div>
    <div class="housebox" aria-hidden="true">${K.art.get('house')}</div>`, 'home');
  s.querySelectorAll('.avatar').forEach(b => b.onclick = () => { sel = +b.dataset.av; s.querySelectorAll('.avatar').forEach(x => x.classList.toggle('sel', x === b)); K.sound.pop(); });
  const start = () => { d.name = s.querySelector('#nm').value.trim() || 'Amigo'; d.avatar = sel; save.flush(); K.sound.ok(); go('#/map'); };
  s.querySelector('#go').onclick = start;
  s.querySelector('#nm').addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
  K.voice.say('¡Hola! ¿Cómo te llamas?');
}

/* ================= mapa ================= */
const ISLANDS = {
  mates:   { x: 5,  y: 2,  c1: '#9BDB8E', c2: '#F6E3AE' },
  lectura: { x: 62, y: 0,  c1: '#A8E09A', c2: '#F6E3AE' },
  memoria: { x: 8,  y: 46, c1: '#9CD98D', c2: '#F6E3AE' },
  mundo:   { x: 60, y: 44, c1: '#8DD6A0', c2: '#F6E3AE' }
};
function islandLand(i) {
  return `<svg viewBox="0 0 200 150" preserveAspectRatio="none"><path d="M10 95 Q0 50 50 38 Q70 6 120 20 Q172 10 188 56 Q204 98 168 124 Q120 148 60 132 Q20 124 10 95Z" fill="${i.c2}"/><path d="M22 88 Q14 54 54 46 Q74 20 118 30 Q162 24 176 60 Q188 92 158 112 Q116 130 66 118 Q30 112 22 88Z" fill="${i.c1}"/><g fill="#6DBE7B" opacity=".6"><circle cx="48" cy="80" r="9"/><circle cx="150" cy="92" r="11"/><circle cx="120" cy="52" r="8"/></g><g fill="#fff"><circle cx="66" cy="96" r="3"/><circle cx="132" cy="76" r="3"/></g><g fill="#FF8FA3"><circle cx="86" cy="104" r="3"/><circle cx="48" cy="62" r="3"/></g></svg>`;
}
function mapScreen() {
  const d = save.data;
  const s = mount(`
    <div class="maptop">
      <button class="icon-btn" id="bk" aria-label="Volver al inicio">${IC.back}</button>
      <h2>Elige una isla para empezar</h2>
      <div class="pillstat"><span class="av">${avatarSvg(d.avatar || 0)}</span>${U.esc(d.name || 'Amigo')} ${starSvg(true, 'st')} <b>${save.total()}</b></div>
    </div>
    <div class="mapbody">
      <svg class="waves" viewBox="0 0 400 300" preserveAspectRatio="none"><g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M20 60 q10 -8 20 0 t20 0"/><path d="M200 150 q10 -8 20 0 t20 0"/><path d="M330 240 q10 -8 20 0 t20 0"/><path d="M110 250 q10 -8 20 0 t20 0"/><path d="M350 90 q10 -8 20 0 t20 0"/><path d="M180 30 q10 -8 20 0 t20 0"/></g></svg>
      <svg class="path" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M33 22 C 44 30, 54 30, 64 20 M80 34 C 88 42, 86 48, 78 52 M64 66 C 54 76, 42 76, 36 66 M20 50 C 14 42, 16 36, 20 32" fill="none" stroke="#fff" stroke-linecap="round" vector-effect="non-scaling-stroke" style="stroke-width:6px;stroke-dasharray:.1 14;opacity:.9"/></svg>
      ${Object.values(K.groups).map(g => {
        const i = ISLANDS[g.id], n = gamesOf(g.id).length, max = n * 3;
        return `<button class="island" data-g="${g.id}" style="left:${i.x}%;top:${i.y}%" aria-label="${g.name}">
          <span class="land">${islandLand(i)}</span>
          <span class="mascot">${K.art.get(g.mascot)}</span>
          <span class="tag" style="background:${g.color}">${g.short}<small>${save.groupStars(g.id)} de ${max} estrellas</small></span>
        </button>`;
      }).join('')}
      <div class="boat" style="left:42%;top:62%">${K.art.has('boat') ? K.art.get('boat') : ''}</div>
    </div>`, 'map');
  s.querySelector('#bk').onclick = () => go('#/');
  s.querySelectorAll('.island').forEach(b => b.onclick = () => { K.sound.pop(); go('#/group/' + b.dataset.g); });
}

/* ================= biblioteca de un grupo ================= */
function libScreen(gid) {
  const g = K.groups[gid], list = gamesOf(gid);
  const s = mount(`
    <div class="libhead" style="--g:${g.color}">
      <button class="icon-btn back" id="bk" aria-label="Volver al mapa">${IC.back}</button>
      <div class="mascot">${K.art.get(g.mascot)}</div>
      <h1>${g.name}</h1>
      <div class="mascot2">${K.art.get(g.mascot2)}</div>
    </div>
    <div class="libbody" style="--gl:${g.light}">
      <h3>Elige un juego</h3>
      <div class="gamegrid">${list.map(x => `<button class="gamecard" data-id="${x.id}">
        <span class="ic">${K.art.get(x.icon)}</span><b>${x.title}</b>${starsRow(save.best(x.id))}</button>`).join('')}</div>
    </div>`, 'lib');
  s.querySelector('#bk').onclick = () => go('#/map');
  s.querySelectorAll('.gamecard').forEach(b => b.onclick = () => { K.sound.pop(); go('#/prep/' + b.dataset.id); });
}

/* ================= preparar actividad ================= */
const LV = [{ n: 'Fácil', s: 1 }, { n: 'Medio', s: 2 }, { n: 'Difícil', s: 3 }];
function prepScreen(def) {
  const g = K.groups[def.group]; let lv = save.data.last[def.id] || 1;
  const st = save.stars(def.id);
  const s = mount(`
    <div class="panel" style="--g:${g.color};--gl:${g.light}">
      <div class="topbtns"><button class="icon-btn" id="bk" aria-label="Volver">${IC.back}</button><button class="icon-btn" id="hm" aria-label="Mapa">${IC.home}</button></div>
      <div class="phead" style="margin-top:3.2rem"><span class="ic">${K.art.get(def.icon)}</span><div><h1>${def.title}</h1><p>${def.blurb || ''}</p></div></div>
      <h3>Nivel</h3>
      <div class="levels">${LV.map(l => `<button class="lvl ${l.s === lv ? 'sel' : ''}" data-l="${l.s}">${starsRow(st[l.s - 1] || 0, 3).replace(/<svg/g, '<svg').replace('class="stars"', 'class="stars"')}${l.n}<small>${def.levels ? def.levels[l.s - 1] : ''}</small></button>`).join('')}</div>
      <div class="row">
        <button class="btn blue sm" id="say">${IC.speaker} Escucha las instrucciones</button>
        <button class="btn" id="go">Empezar ${IC.arrow}</button>
      </div>
    </div>`, 'prep');
  s.style.setProperty('--g', g.color); s.style.setProperty('--gl', g.light);
  s.querySelectorAll('.lvl').forEach(b => b.onclick = () => { lv = +b.dataset.l; s.querySelectorAll('.lvl').forEach(x => x.classList.toggle('sel', x === b)); K.sound.pop(); });
  s.querySelector('#bk').onclick = () => go('#/group/' + def.group);
  s.querySelector('#hm').onclick = () => go('#/map');
  s.querySelector('#say').onclick = () => K.voice.say(def.how || def.blurb || def.title);
  s.querySelector('#go').onclick = () => { save.data.last[def.id] = lv; save.flush(); K.sound.ok(); go('#/play/' + def.id + '/' + lv); };
}

/* ================= motor del juego ================= */
const PRAISE = ['¡Muy bien!', '¡Genial!', '¡Lo has conseguido!', '¡Fantástico!', '¡Bien hecho!', '¡Estupendo!'];
const TRY = ['¡Casi! Inténtalo otra vez', '¡Prueba otra vez!', '¡Tú puedes! Mira con calma', 'Uy, otra vez, ¡ánimo!'];

function playGame(def, level) {
  const grp = K.groups[def.group];
  const s = mount(`
    <header class="gbar">
      <button class="icon-btn" data-a="back" aria-label="Volver">${IC.back}</button>
      <div class="gtitle"><span class="num-badge">${def.num}</span><b>${def.title}</b></div>
      <div class="dots"></div>
      <button class="icon-btn" data-a="voice" aria-label="Voz">${save.data.voice ? IC.speaker : IC.mute}</button>
      <button class="icon-btn" data-a="home" aria-label="Mapa">${IC.home}</button>
    </header>
    <div class="ask"><button class="say" aria-label="Escuchar">${IC.speaker}</button><span class="txt">&nbsp;</span></div>
    <main class="area g-${def.id}"></main>
    ${bush('#8ED69A').replace('class="bush"', 'class="bush" style="left:-1rem"')}${bush('#9BDDA6').replace('class="bush"', 'class="bush" style="right:-1rem;transform:scaleX(-1)"')}
    <div class="toast"></div>`, 'game-screen');
  s.style.setProperty('--g', grp.color); s.style.setProperty('--gl', grp.light); s.style.setProperty('--gd', grp.dark);
  const area = s.querySelector('.area'), dotsEl = s.querySelector('.dots'), txt = s.querySelector('.txt'), toast = s.querySelector('.toast');
  const rounds = def.rounds || 6;
  let alive = true, i = 0, mistakes = 0, locked = false, lastAsk = '', timers = [];
  dispose = () => { alive = false; timers.forEach(clearTimeout); };

  const g = {
    level, rounds, def, area, screen: s, i: 0, roundMistakes: 0,
    ask(t) { lastAsk = t; txt.textContent = t; K.voice.say(t); },
    say(t) { K.voice.say(t); },
    t(fn, ms) { const id = setTimeout(() => { if (alive) fn(); }, ms); timers.push(id); return id; },
    shake(el) { if (!el) return; el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); },
    toast(msg, bad) {
      toast.className = 'toast ' + (bad ? 'bad' : '');
      toast.innerHTML = msg; void toast.offsetWidth; toast.classList.add('show');
      clearTimeout(g._tt); g._tt = setTimeout(() => toast.classList.remove('show'), 1600);
    },
    wrong(msg) {
      if (locked) return; mistakes++; g.roundMistakes++; K.sound.bad();
      const m = msg || U.pick(TRY); g.toast(m, true);
      if (g.roundMistakes === 2 && g.helpHint) g.helpHint();
    },
    right(msg) {
      if (locked) return; locked = true; K.sound.ok(); cheer(msg || U.pick(PRAISE));
      dotsEl.children[i] && dotsEl.children[i].classList.add('done');
      g.t(() => { i++; if (i >= rounds) finish(); else startRound(); }, 1250);
    },
    lock() { locked = true; }, unlock() { locked = false; },
    get mistakes() { return mistakes; }
  };

  function cheer(msg) {
    const c = U.el(`<div class="cheer"><div class="bubble">${starSvg(true)}${U.esc(msg)}</div></div>`);
    const cols = ['#FF7E69', '#FFD23F', '#47B5BF', '#8C7BE0', '#5CC77A', '#4C8DF6'];
    for (let k = 0; k < 26; k++) {
      const p = U.el('<i class="confetti"></i>'), a = Math.random() * 6.28, r = 90 + Math.random() * 190;
      p.style.setProperty('--dx', Math.cos(a) * r + 'px'); p.style.setProperty('--dy', Math.sin(a) * r - 40 + 'px'); p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      p.style.background = cols[k % cols.length]; c.appendChild(p);
    }
    s.appendChild(c); setTimeout(() => c.remove(), 1500);
  }
  function drawDots() { dotsEl.innerHTML = U.range(rounds).map(k => `<i class="${k < i ? 'done' : ''} ${k === i ? 'on' : ''}"></i>`).join(''); }
  function startRound() {
    area.innerHTML = ''; locked = false; g.roundMistakes = 0; g.helpHint = null; g.i = i; drawDots();
    try { def.round(g, i); } catch (e) { console.error('[juego ' + def.id + ']', e); area.innerHTML = '<div class="card">Ups, este juego tiene un fallo. Vuelve al mapa.</div>'; }
  }
  function finish() {
    const n = def.stars ? def.stars(mistakes, rounds) : (mistakes <= Math.ceil(rounds * .2) ? 3 : mistakes <= Math.ceil(rounds * .6) ? 2 : 1);
    save.setStars(def.id, level, n); K.sound.win(); endScreen(def, level, n);
  }
  s.querySelector('[data-a=back]').onclick = () => go('#/prep/' + def.id);
  s.querySelector('[data-a=home]').onclick = () => go('#/map');
  s.querySelector('.say').onclick = () => K.voice.say(lastAsk);
  const vb = s.querySelector('[data-a=voice]');
  vb.onclick = () => { save.data.voice = !save.data.voice; save.flush(); vb.innerHTML = save.data.voice ? IC.speaker : IC.mute; if (!save.data.voice) K.voice.stop(); else K.voice.say(lastAsk); };
  startRound();
}

/* ================= final ================= */
function endScreen(def, level, n) {
  const g = K.groups[def.group], list = gamesOf(def.group), idx = list.findIndex(x => x.id === def.id), next = list[idx + 1];
  const s = mount(`
    <h1>¡Genial, ${U.esc(save.data.name || 'Amigo')}!</h1>
    <p>Has completado «${def.title}»</p>
    <div class="bigstars">${U.range(3).map(k => starSvg(k < n)).join('')}</div>
    <div class="mascot">${K.art.get(g.mascot)}</div>
    <div class="btns">
      <button class="btn" id="again">${IC.redo} Otra partida</button>
      ${next ? `<button class="btn teal" id="next">Siguiente juego ${IC.arrow}</button>` : ''}
      <button class="btn blue" id="map">${IC.map} Volver al mapa</button>
    </div>`, 'end');
  s.querySelectorAll('.bigstars svg').forEach((el, k) => { el.style.animation = `pop .5s ${k * .25}s both`; });
  const cols = ['#FF7E69', '#FFD23F', '#47B5BF', '#8C7BE0', '#5CC77A', '#4C8DF6'];
  for (let k = 0; k < 40; k++) {
    const p = U.el('<i class="confetti"></i>'), a = Math.random() * 6.28, r = 150 + Math.random() * 300;
    p.style.setProperty('--dx', Math.cos(a) * r + 'px'); p.style.setProperty('--dy', Math.sin(a) * r + 'px'); p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    p.style.background = cols[k % cols.length]; s.appendChild(p);
  }
  K.voice.say(n === 3 ? '¡Genial! Tres estrellas' : n === 2 ? '¡Muy bien! Dos estrellas' : '¡Bien hecho! Sigue practicando');
  s.querySelector('#again').onclick = () => go('#/play/' + def.id + '/' + level);
  if (next) s.querySelector('#next').onclick = () => go('#/prep/' + next.id);
  s.querySelector('#map').onclick = () => go('#/map');
}
})();
