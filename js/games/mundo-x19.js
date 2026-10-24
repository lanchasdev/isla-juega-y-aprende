/* mundo-x19 — Instrumentos musicales */
(function () {
'use strict';
const U = Kids.util;
const V = (inner) => '<svg viewBox="0 0 100 100" aria-hidden="true">' + inner + '</svg>';
const shadow = '<ellipse cx="50" cy="92" rx="34" ry="4.5" fill="#14235B" opacity=".10"/>';

Kids.art.add({
  'wx19-drum': V(`${shadow}<path d="M16 40 V70 Q16 84 50 84 Q84 84 84 70 V40Z" fill="#E8553E"/><path d="M16 40 V70 Q16 84 50 84 Q84 84 84 70 V40" fill="none" stroke="#C93E2A" stroke-width="2"/>
    <g stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".9"><path d="M24 50 L34 76 L44 52 L54 78 L64 52 L74 76 L80 54"/></g>
    <ellipse cx="50" cy="40" rx="34" ry="11" fill="#FFF1D0" stroke="#F3C463" stroke-width="3"/><ellipse cx="42" cy="38" rx="14" ry="3.4" fill="#fff" opacity=".7"/>
    <g stroke="#A66B3A" stroke-width="4.4" stroke-linecap="round"><path d="M22 10 L52 38"/><path d="M78 10 L48 38"/></g><circle cx="22" cy="10" r="5" fill="#FFD23F"/><circle cx="78" cy="10" r="5" fill="#FFD23F"/>`),
  'wx19-piano': V(`${shadow}<rect x="8" y="22" width="84" height="60" rx="9" fill="#3A3F7A"/><rect x="12" y="26" width="76" height="12" rx="4" fill="#4D54A0"/>
    <rect x="12" y="38" width="76" height="40" rx="4" fill="#fff"/><g stroke="#C9CCE4" stroke-width="1.6"><path d="M22 38V78M32 38V78M42 38V78M52 38V78M62 38V78M72 38V78M82 38V78" /></g>
    <g fill="#2B2F5E"><rect x="19" y="38" width="7" height="24" rx="2"/><rect x="29" y="38" width="7" height="24" rx="2"/><rect x="49" y="38" width="7" height="24" rx="2"/><rect x="59" y="38" width="7" height="24" rx="2"/><rect x="69" y="38" width="7" height="24" rx="2"/></g>
    <circle cx="80" cy="32" r="2" fill="#FFD23F"/>`),
  'wx19-flute': V(`${shadow}<g transform="rotate(-32 50 50)"><rect x="4" y="43" width="92" height="14" rx="7" fill="#BFD6EE" stroke="#8FB0D4" stroke-width="2"/><rect x="8" y="45" width="84" height="4" rx="2" fill="#fff" opacity=".7"/>
    <g fill="#F5B731" stroke="#D99A14" stroke-width="1.4"><circle cx="34" cy="50" r="3.4"/><circle cx="46" cy="50" r="3.4"/><circle cx="58" cy="50" r="3.4"/><circle cx="72" cy="50" r="3.4"/></g><ellipse cx="18" cy="50" rx="4" ry="2.6" fill="#6C8FB8"/><path d="M26 43v14M80 43v14" stroke="#8FB0D4" stroke-width="2"/></g>`),
  'wx19-guitar': V(`${shadow}<g transform="rotate(-38 50 50)"><rect x="44" y="-2" width="12" height="46" rx="3" fill="#8B5A33"/><rect x="42" y="-6" width="16" height="14" rx="4" fill="#6B3F1E"/>
    <g fill="#F5B731"><circle cx="45" cy="0" r="2"/><circle cx="55" cy="0" r="2"/><circle cx="45" cy="6" r="2"/><circle cx="55" cy="6" r="2"/></g>
    <path d="M50 38 C 70 34, 78 48, 70 58 C 82 66, 80 90, 50 92 C 20 90, 18 66, 30 58 C 22 48, 30 34, 50 38Z" fill="#E8913A" stroke="#C9722A" stroke-width="2.4"/>
    <circle cx="50" cy="64" r="9" fill="#5B3416"/><circle cx="50" cy="64" r="9" fill="none" stroke="#F7C98A" stroke-width="2"/><rect x="40" y="80" width="20" height="4" rx="2" fill="#6B3F1E"/>
    <g stroke="#fff" stroke-width=".9" opacity=".9"><path d="M47 4V82M50 4V82M53 4V82"/></g></g>`),
  'wx19-tambourine': V(`${shadow}<circle cx="50" cy="50" r="40" fill="#E0A15B"/><circle cx="50" cy="50" r="31" fill="#FFF1D0" stroke="#C9803A" stroke-width="2"/><circle cx="42" cy="42" r="12" fill="#fff" opacity=".5"/>
    ${[0, 1, 2, 3, 4, 5].map(k => { const a = k * 60 - 30; return `<g transform="rotate(${a} 50 50)"><rect x="45" y="6" width="10" height="9" rx="3" fill="#B9712F"/><circle cx="50" cy="10.5" r="4.4" fill="#FFD23F" stroke="#D99A14" stroke-width="1.2"/></g>`; }).join('')}
    <path d="M28 58 Q50 76 72 58" fill="none" stroke="#FF8FB1" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="44" r="3" fill="#FF8FB1"/>`),
  'wx19-trumpet': V(`${shadow}<path d="M8 22 L34 42 V60 L8 78 Q2 50 8 22Z" fill="#F5B731" stroke="#D99A14" stroke-width="2.4" stroke-linejoin="round"/><path d="M34 42 H84 V60 H34" fill="#F5B731" stroke="#D99A14" stroke-width="2.4"/>
    <path d="M44 60 Q44 82 62 82 Q80 82 80 60" fill="none" stroke="#F5B731" stroke-width="7" stroke-linecap="round"/><path d="M44 60 Q44 82 62 82 Q80 82 80 60" fill="none" stroke="#D99A14" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>
    <g fill="#FF8FB1"><rect x="48" y="30" width="8" height="12" rx="3"/><rect x="60" y="30" width="8" height="12" rx="3"/><rect x="72" y="30" width="8" height="12" rx="3"/></g>
    <rect x="82" y="46" width="12" height="9" rx="4" fill="#E9EEF5" stroke="#B9C5D6" stroke-width="1.6"/><rect x="36" y="44" width="40" height="4" rx="2" fill="#fff" opacity=".5"/>`),
  'wx19-xylophone': V(`${shadow}<path d="M12 78 L36 22 M88 78 L64 22" stroke="#A66B3A" stroke-width="5" stroke-linecap="round"/>
    <g><rect x="14" y="62" width="72" height="12" rx="6" fill="#FF7E69"/><rect x="18" y="49" width="64" height="12" rx="6" fill="#FFB347"/><rect x="22" y="36" width="56" height="12" rx="6" fill="#FFD23F"/><rect x="28" y="23" width="44" height="12" rx="6" fill="#5CC77A"/></g>
    <g fill="#fff" opacity=".6"><rect x="20" y="64" width="26" height="3" rx="1.5"/><rect x="24" y="51" width="22" height="3" rx="1.5"/><rect x="28" y="38" width="18" height="3" rx="1.5"/></g>
    <g stroke="#8B5A33" stroke-width="3.4" stroke-linecap="round"><path d="M70 4 L56 30"/><path d="M84 8 L72 36"/></g><circle cx="70" cy="4" r="5" fill="#4C8DF6"/><circle cx="84" cy="8" r="5" fill="#8C7BE0"/>`),
  'wx19-maracas': V(`${shadow}<g transform="rotate(-22 30 50)"><rect x="26" y="58" width="8" height="30" rx="4" fill="#C98F52"/><ellipse cx="30" cy="38" rx="17" ry="24" fill="#FF7E69"/><g fill="#FFE98F"><circle cx="24" cy="28" r="3.6"/><circle cx="36" cy="34" r="3.6"/><circle cx="26" cy="44" r="3.6"/><circle cx="36" cy="50" r="3"/></g><ellipse cx="23" cy="26" rx="4" ry="8" fill="#fff" opacity=".3"/></g>
    <g transform="rotate(22 70 50)"><rect x="66" y="58" width="8" height="30" rx="4" fill="#C98F52"/><ellipse cx="70" cy="38" rx="17" ry="24" fill="#4C8DF6"/><g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M56 30 Q70 38 84 30"/><path d="M55 42 Q70 50 85 42"/></g><ellipse cx="63" cy="26" rx="4" ry="8" fill="#fff" opacity=".3"/></g>`),
  'wx19-bells': V(`${shadow}<g><path d="M8 22 Q30 6 52 22" fill="none" stroke="#C98F52" stroke-width="3" stroke-linecap="round"/><path d="M26 30 C26 12 54 12 54 30 L58 52 Q40 60 22 52Z" fill="#F5B731" stroke="#D99A14" stroke-width="2.4" stroke-linejoin="round" transform="translate(-6 8)"/><ellipse cx="34" cy="62" rx="4.4" ry="4.4" fill="#C98F52"/><path d="M22 36 Q20 46 24 54" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/></g>
    <g transform="translate(36 12) scale(.8)"><path d="M26 30 C26 12 54 12 54 30 L58 52 Q40 60 22 52Z" fill="#FFD23F" stroke="#D99A14" stroke-width="2.4" stroke-linejoin="round" transform="translate(6 8)"/><ellipse cx="46" cy="63" rx="4.4" ry="4.4" fill="#C98F52"/><path d="M34 38 Q32 48 36 56" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/></g>
    <path d="M78 16l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FFF3B0"/><path d="M16 78l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#FFF3B0"/>`),
  'wx19-violin': V(`${shadow}<g transform="rotate(-24 50 54)"><rect x="46" y="2" width="8" height="38" rx="2.4" fill="#4B2E1A"/><path d="M50 -2 q-8 2 -6 8 q4 4 8 -2" fill="#8B5A33" transform="translate(0 2)"/>
    <path d="M50 34 C 64 30, 70 42, 64 52 C 74 58, 74 82, 50 86 C 26 82, 26 58, 36 52 C 30 42, 36 30, 50 34Z" fill="#D9803A" stroke="#A8571F" stroke-width="2.4"/>
    <path d="M42 56 q-2 8 2 14M58 56 q2 8 -2 14" fill="none" stroke="#5B3416" stroke-width="2.4" stroke-linecap="round"/><rect x="42" y="76" width="16" height="3.6" rx="1.8" fill="#4B2E1A"/>
    <ellipse cx="42" cy="46" rx="4" ry="8" fill="#fff" opacity=".25" transform="rotate(10 42 46)"/></g>
    <path d="M20 86 L88 16" stroke="#8B5A33" stroke-width="3" stroke-linecap="round"/><path d="M22 84 L86 18" stroke="#F4EBD0" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>`)
});

const INS = {
  tambor:    { n: 'Tambor', art: 'wx19-drum', fam: 'perc' }, maracas: { n: 'Maracas', art: 'wx19-maracas', fam: 'perc' }, pandereta: { n: 'Pandereta', art: 'wx19-tambourine', fam: 'perc' },
  piano:     { n: 'Piano', art: 'wx19-piano', fam: 'keys' }, xilofono: { n: 'Xilófono', art: 'wx19-xylophone', fam: 'keys' }, campanas: { n: 'Campanas', art: 'wx19-bells', fam: 'keys' },
  flauta:    { n: 'Flauta', art: 'wx19-flute', fam: 'wind' }, trompeta: { n: 'Trompeta', art: 'wx19-trumpet', fam: 'wind' },
  guitarra:  { n: 'Guitarra', art: 'wx19-guitar', fam: 'str' }, violin: { n: 'Violín', art: 'wx19-violin', fam: 'str' }
};
const FAM = { perc: ['tambor', 'maracas', 'pandereta'], keys: ['piano', 'xilofono', 'campanas'], wind: ['flauta', 'trompeta'], str: ['guitarra', 'violin'] };

/* ===== síntesis ===== */
const NT = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, Cs5: 554.37, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G6: 1568 };
let master = null, bus = null, noiseBuf = null;
function ctx() {
  if (Kids.save && Kids.save.data && Kids.save.data.sound === false) return null;
  const c = Kids.sound.ctx(); if (!c) return null;
  try { if (c.state === 'suspended') c.resume(); } catch (e) {}
  if (!master || master.context !== c) {
    master = c.createGain(); master.gain.value = .7;
    const comp = c.createDynamicsCompressor(); master.connect(comp); comp.connect(c.destination);
    noiseBuf = null; bus = null;
  }
  return c;
}
function newBus(c) {
  if (bus) { try { bus.gain.cancelScheduledValues(c.currentTime); bus.gain.setTargetAtTime(0, c.currentTime, .015); } catch (e) {} }
  bus = c.createGain(); bus.gain.value = 1; bus.connect(master); return bus;
}
function env(gp, t, peak, att, dur, rel) {
  gp.setValueAtTime(.0001, t); gp.exponentialRampToValueAtTime(peak, t + att);
  if (rel) { gp.setValueAtTime(peak, Math.max(t + att, t + dur - rel)); }
  gp.exponentialRampToValueAtTime(.0001, t + dur);
}
function note(c, out, o) {
  const os = c.createOscillator(), g = c.createGain(); os.type = o.type || 'sine'; os.frequency.setValueAtTime(o.f, o.t);
  if (o.glide) os.frequency.exponentialRampToValueAtTime(o.glide, o.t + (o.gdur || .15));
  let node = os;
  if (o.lp) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(o.lp, o.t); if (o.lpTo) f.frequency.exponentialRampToValueAtTime(o.lpTo, o.t + (o.lpDur || .1)); f.Q.value = o.q || .7; node.connect(f); node = f; }
  if (o.vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vibRate || 5.5; lg.gain.value = o.vib; l.connect(lg); lg.connect(os.frequency); l.start(o.t + (o.vibDelay || 0)); l.stop(o.t + o.dur + .1); }
  node.connect(g); g.connect(out); env(g.gain, o.t, o.peak, o.att || .01, o.dur, o.rel); os.start(o.t); os.stop(o.t + o.dur + .05);
}
function noise(c, out, o) {
  if (!noiseBuf) { noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  const s = c.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
  const f = c.createBiquadFilter(); f.type = o.ft || 'bandpass'; f.frequency.value = o.fq; f.Q.value = o.q || 1;
  const g = c.createGain(); s.connect(f); f.connect(g); g.connect(out); env(g.gain, o.t, o.peak, o.att || .004, o.dur); s.start(o.t, Math.random() * .5); s.stop(o.t + o.dur + .05);
}
function pluck(c, out, f, t, dur, vol) {
  const sr = c.sampleRate, N = Math.max(2, Math.round(sr / f)), len = Math.floor(sr * dur), buf = c.createBuffer(1, len, sr), d = buf.getChannelData(0);
  for (let i = 0; i < N; i++) d[i] = (Math.random() * 2 - 1) * (1 - .4 * i / N);
  for (let i = N; i < len; i++) d[i] = .5 * (d[i - N] + (i - N - 1 >= 0 ? d[i - N - 1] : d[i - N])) * .997;
  const s = c.createBufferSource(); s.buffer = buf; const g = c.createGain();
  g.gain.setValueAtTime(vol, t); g.gain.setValueAtTime(vol, t + dur - .15); g.gain.linearRampToValueAtTime(0, t + dur);
  s.connect(g); g.connect(out); s.start(t);
}
function pianoNote(c, out, f, t, dur, vol) {
  [[1, 1], [2, .35], [3, .14], [4, .06]].forEach(p => note(c, out, { type: 'sine', f: f * p[0], t, dur: dur * (p[0] === 1 ? 1 : .6), peak: vol * p[1], att: .006 }));
}
function bellNote(c, out, f, t, dur, vol) {
  [[1, 1], [2.01, .5], [2.76, .32], [5.4, .14]].forEach(p => note(c, out, { type: 'sine', f: f * p[0], t, dur: dur / (1 + p[0] * .25), peak: vol * p[1], att: .004 }));
}
const PLAY = {
  tambor(c, o, t) { [0, .45, .9].forEach((d, k) => { const v = k === 2 ? .7 : 1; note(c, o, { type: 'sine', f: 200, glide: 55, gdur: .16, t: t + d, dur: .35, peak: .55 * v, att: .004 }); noise(c, o, { t: t + d, dur: .09, fq: 1400, ft: 'lowpass', peak: .22 * v }); }); return 1.4; },
  piano(c, o, t) { [NT.C4, NT.E4, NT.G4, NT.E4].forEach((f, k) => pianoNote(c, o, f, t + k * .34, 1.2, .2)); return 1.9; },
  flauta(c, o, t) { [NT.E5, NT.G5, NT.E5].forEach((f, k) => { note(c, o, { type: 'sine', f, t: t + k * .55, dur: .62, peak: .3, att: .07, rel: .18, vib: 5, vibRate: 5, vibDelay: .15 }); note(c, o, { type: 'sine', f: f * 2, t: t + k * .55, dur: .55, peak: .03, att: .08 }); noise(c, o, { t: t + k * .55, dur: .5, fq: 3200, q: 1.5, peak: .012, att: .06 }); }); return 1.8; },
  guitarra(c, o, t) { [NT.E4 / 2, NT.A4 / 2, NT.D4, NT.G4].forEach((f, k) => pluck(c, o, f, t + k * .07, 1.6, .3)); [NT.G4, NT.D4].forEach((f, k) => pluck(c, o, f, t + 1 + k * .3, 1.2, .3)); return 2.3; },
  pandereta(c, o, t) { [0, .2, .4, .5, .7].forEach((d, k) => { noise(c, o, { t: t + d, dur: .16, fq: 5000, ft: 'highpass', peak: k === 0 ? .32 : .22 }); [6500, 8200, 9800].forEach(f => note(c, o, { type: 'square', f, t: t + d, dur: .09, peak: .012, att: .003 })); }); return 1.0; },
  trompeta(c, o, t) { [[NT.G4, 0, .2], [NT.G4, .26, .2], [NT.C5, .52, .75]].forEach(a => note(c, o, { type: 'sawtooth', f: a[0], t: t + a[1], dur: a[2], peak: .26, att: .035, rel: .08, lp: 700, lpTo: 3000, lpDur: .09, q: 2 })); return 1.4; },
  xilofono(c, o, t) { [NT.E5, NT.G5, NT.C6, NT.E6, NT.C6].forEach((f, k) => { note(c, o, { type: 'sine', f, t: t + k * .17, dur: .38, peak: .3, att: .003 }); note(c, o, { type: 'sine', f: f * 3.9, t: t + k * .17, dur: .08, peak: .06, att: .002 }); }); return 1.3; },
  maracas(c, o, t) { [0, .13, .3, .43, .6, .73].forEach((d, k) => noise(c, o, { t: t + d, dur: .1, fq: k % 2 ? 6500 : 4500, q: 1.3, peak: .4, att: .006 })); return 1.0; },
  campanas(c, o, t) { [NT.E5, NT.C5, NT.D5, NT.G4].forEach((f, k) => bellNote(c, o, f, t + k * .5, 1.6, .2)); return 2.8; },
  violin(c, o, t) { [[NT.A4, 0, .6], [NT.Cs5, .62, .6], [NT.E5, 1.24, 1]].forEach(a => note(c, o, { type: 'sawtooth', f: a[0], t: t + a[1], dur: a[2], peak: .22, att: .12, rel: .15, lp: 2600, vib: 6, vibRate: 5.5, vibDelay: .2 })); return 2.3; }
};
function playIns(k) { const c = ctx(); if (!c) return 0; return PLAY[k](c, newBus(c), c.currentTime + .05); }
function playNotes(list, gap, who) {
  const c = ctx(); if (!c) return 0; const o = newBus(c), t = c.currentTime + .05;
  list.forEach((f, k) => { if (who === 'flauta') note(c, o, { type: 'sine', f, t: t + k * gap, dur: gap * .95, peak: .22, att: .04, rel: .1 }); else pianoNote(c, o, f, t + k * gap, 1, .22); });
  return gap * list.length + .6;
}

const SPK = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.6 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
Kids.css(`
.g-mundo-x19{gap:.9rem}
.g-mundo-x19 .x19-spk{width:clamp(6rem,19vmin,9rem);height:clamp(6rem,19vmin,9rem);border-radius:50%;background:var(--g);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 .5rem 0 var(--gd);flex:none;transition:transform .12s}
.g-mundo-x19 .x19-spk:active{transform:translateY(.25rem);box-shadow:0 .2rem 0 var(--gd)}
.g-mundo-x19 .x19-spk svg{width:56%;height:56%}
.g-mundo-x19 .x19-spk.on{animation:pulse .6s infinite}
.g-mundo-x19 .x19-spkwrap{display:flex;flex-direction:column;align-items:center;gap:.3rem;font-family:'Baloo 2';font-weight:800;font-size:1.2rem}
.g-mundo-x19 .x19-opts{gap:.8rem}
.g-mundo-x19 .x19-opts .pic{width:clamp(5.2rem,17vmin,9.5rem);cursor:pointer}
.g-mundo-x19 .x19-opts .pic svg{max-width:100%;aspect-ratio:1;height:auto}
.g-mundo-x19 .x19-opts .pic .lbl{font-size:clamp(.85rem,2.5vmin,1.2rem)}
.g-mundo-x19 .x19-pair{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.g-mundo-x19 .x19-pc{background:#fff;border-radius:1.8rem;padding:.8rem 1rem;box-shadow:0 .4rem 0 var(--line);border:.2rem solid var(--line);display:flex;flex-direction:column;align-items:center;gap:.6rem;font-family:'Baloo 2';font-weight:800;font-size:1.4rem}
.g-mundo-x19 .x19-pc .x19-spk{width:4.6rem;height:4.6rem}
.g-mundo-x19 .x19-pc .btn{font-size:1.3rem}
.g-mundo-x19 .x19-pc.right{background:#BDEFC8;border-color:#5CC77A}
.g-mundo-x19 .x19-pc.bad{animation:shake .4s}
.g-mundo-x19 .x19-shape svg{width:100%;aspect-ratio:1;max-width:9rem;display:block}
`);

let seq = [];
Kids.game({
  id: 'mundo-x19', group: 'mundo', num: 22,
  title: 'Instrumentos musicales',
  blurb: 'Escucha el sonido y descubre qué instrumento es.',
  how: 'Pulsa el altavoz grande para escuchar el sonido. Después toca el instrumento que suena. Puedes escuchar cuantas veces quieras.',
  icon: 'drum',
  levels: ['3 instrumentos', '4 instrumentos', 'Más instrumentos y melodías'],
  rounds: 6,
  round(g, i) {
    if (i === 0) seq = [];
    if (g.level === 3 && i === 2) return melody(g);
    if (g.level === 3 && i === 5) return pitch(g);
    identify(g, i);
  }
});

function speaker(g, playFn, label) {
  const wrap = U.el(`<div class="x19-spkwrap"><button class="x19-spk" aria-label="${label || 'Escuchar el sonido otra vez'}">${SPK}</button><span>Escuchar</span></div>`);
  const b = wrap.querySelector('button');
  const go = () => { const d = playFn(); b.classList.add('on'); g.t(() => b.classList.remove('on'), Math.min(2000, (d || .6) * 1000)); if (!d) g.toast('Activa el sonido para escuchar'); };
  b.onclick = go; return { wrap, go };
}

function identify(g, i) {
  let list;
  if (g.level === 1) list = ['tambor', 'piano', 'flauta'];
  else if (g.level === 2) list = U.shuffle(Object.keys(FAM)).map(f => U.pick(FAM[f]));
  else list = U.sample(Object.keys(INS), U.rnd(5, 6));
  if (!seq.length) seq = U.shuffle(list.slice());
  let correct = seq.pop(); if (list.indexOf(correct) < 0) correct = U.pick(list);
  if (g.level === 3 && i === 0 && list.indexOf('piano') < 0) { /* nada */ }
  g.ask(g.level === 1 ? 'Escucha con atención. ¿Qué instrumento suena?' : '¿Qué instrumento está sonando?');
  const sp = speaker(g, () => playIns(correct));
  g.area.appendChild(sp.wrap);
  const box = U.el('<div class="opts x19-opts"></div>');
  let right = null;
  U.shuffle(list).forEach(k => {
    const b = U.el(`<button class="pic" aria-label="${INS[k].n}">${Kids.art.get(INS[k].art)}<span class="lbl">${INS[k].n}</span></button>`);
    if (k === correct) right = b;
    b.onclick = () => {
      if (b.disabled) return;
      if (k === correct) { b.classList.add('right'); box.querySelectorAll('button').forEach(x => x.disabled = true); g.say('¡Es ' + (k === 'maracas' || k === 'campanas' ? 'las ' : k === 'pandereta' || k === 'trompeta' || k === 'flauta' || k === 'guitarra' ? 'la ' : 'el ') + INS[k].n.toLowerCase() + '!'); g.t(() => g.right(), 900); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Mmm, ese no suena así. ¡Escucha otra vez!'); }
    };
    box.appendChild(b);
  });
  g.area.appendChild(box);
  g.helpHint = () => { right.style.animation = 'bounce .6s 5'; sp.go(); g.toast('Escucha: es ' + INS[correct].n.toLowerCase()); };
  g.t(sp.go, 700);
}

function pitch(g) {
  g.ask('Escucha los dos sonidos. ¿Cuál suena más agudo?');
  const lows = [NT.C4, NT.D4, NT.E4], highs = [NT.C5, NT.E5, NT.G5];
  const lo = U.pick(lows), hi = U.pick(highs), highFirst = Math.random() < .5, who = U.pick(['piano', 'flauta']);
  const fs = highFirst ? [hi, lo] : [lo, hi];
  const pair = U.el('<div class="x19-pair"></div>'); g.area.appendChild(pair);
  const cards = fs.map((f, k) => {
    const card = U.el(`<div class="x19-pc"><span>Sonido ${k + 1}</span><button class="x19-spk" aria-label="Escuchar el sonido ${k + 1}">${SPK}</button><button class="btn" aria-label="Es el sonido ${k + 1}">Es este</button></div>`);
    card.querySelector('.x19-spk').onclick = () => playNotes([f], .8, who);
    card.querySelector('.btn').onclick = () => {
      if (card.classList.contains('right')) return;
      if (f === hi) { card.classList.add('right'); pair.querySelectorAll('button').forEach(x => x.disabled = true); g.say('¡Sí! Ese suena más agudo.'); g.t(() => g.right(), 1200); }
      else { card.classList.remove('bad'); void card.offsetWidth; card.classList.add('bad'); g.wrong('Mmm, casi. Los sonidos agudos suenan finitos, como un pajarito.'); }
    };
    pair.appendChild(card); return card;
  });
  g.helpHint = () => { const k = highFirst ? 0 : 1; cards[k].querySelector('.btn').style.animation = 'bounce .6s 5'; g.toast('El agudo es el finito, como un pajarito.'); };
  g.t(() => playNotes([fs[0]], .8, who), 600); g.t(() => playNotes([fs[1]], .8, who), 1700);
}

const SHAPES = {
  sube: { n: 'Sube', seq: [NT.C4, NT.E4, NT.G4], dots: [44, 28, 12] },
  baja: { n: 'Baja', seq: [NT.G4, NT.E4, NT.C4], dots: [12, 28, 44] },
  sbaja: { n: 'Sube y baja', seq: [NT.C4, NT.G4, NT.C4], dots: [44, 12, 44] },
  igual: { n: 'Igual', seq: [NT.E4, NT.E4, NT.E4], dots: [28, 28, 28] }
};
const shapeSvg = (k) => { const d = SHAPES[k].dots; return `<svg viewBox="0 0 100 60" aria-hidden="true"><path d="M20 ${d[0] + 4}L50 ${d[1] + 4}L80 ${d[2] + 4}" fill="none" stroke="#B7A6F0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${d.map((y, j) => `<circle cx="${20 + j * 30}" cy="${y + 4}" r="8" fill="${['#FF7E69', '#FFB347', '#5CC77A'][j]}" stroke="#fff" stroke-width="2.4"/>`).join('')}</svg>`; };
function melody(g) {
  g.ask('Escucha tres notas. ¿Suben, bajan o hacen otra cosa?');
  const keys = U.sample(Object.keys(SHAPES), 3); const correct = U.pick(keys);
  const sp = speaker(g, () => playNotes(SHAPES[correct].seq, .5, 'piano'), 'Escuchar las tres notas otra vez');
  g.area.appendChild(sp.wrap);
  const box = U.el('<div class="opts x19-opts"></div>'); let right = null;
  keys.forEach(k => {
    const b = U.el(`<button class="pic x19-shape" aria-label="${SHAPES[k].n}" style="width:clamp(6.5rem,22vmin,10rem)">${shapeSvg(k)}<span class="lbl">${SHAPES[k].n}</span></button>`);
    if (k === correct) right = b;
    b.onclick = () => {
      if (b.disabled) return;
      if (k === correct) { b.classList.add('right'); box.querySelectorAll('button').forEach(x => x.disabled = true); g.say('¡Muy bien! Las notas: ' + SHAPES[k].n.toLowerCase()); g.t(() => g.right(), 1400); }
      else { b.classList.add('bad'); b.disabled = true; g.wrong('Casi. ¡Escucha otra vez las tres notas!'); }
    };
    box.appendChild(b);
  });
  g.area.appendChild(box);
  g.helpHint = () => { right.style.animation = 'bounce .6s 5'; sp.go(); g.toast('Mira los puntitos: ' + SHAPES[correct].n.toLowerCase()); };
  g.t(sp.go, 700);
}
})();
