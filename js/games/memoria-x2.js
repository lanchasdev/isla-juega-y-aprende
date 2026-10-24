/* ¿Qué ha desaparecido? */
(function () {
'use strict';
const U = Kids.util;
const NAMES = { car: 'coche', ball: 'pelota', teddy: 'osito', robot: 'robot', kite: 'cometa', drum: 'tambor', train: 'tren', doll: 'muñeca', book: 'libro', shoe: 'zapato', house: 'casa', key: 'llave', cup: 'taza', lamp: 'lámpara', boat: 'barco', hat: 'sombrero', apple: 'manzana', banana: 'plátano', pear: 'pera', cake: 'tarta', strawberry: 'fresa', star: 'estrella', balloon: 'globo', umbrella: 'paraguas', orange: 'naranja' };
const POOL = Object.keys(NAMES);
Kids.css(`
.g-memoria-x2{gap:.8rem}
.g-memoria-x2 .sx2-shelf{position:relative;background:#F6DDAA;border:.3rem solid #D9AE6B;border-radius:1.6rem;padding:.7rem;box-shadow:0 .5rem 0 #C0914F;overflow:hidden;width:min(100%,46rem)}
.g-memoria-x2 .sx2-grid{display:grid;gap:.6rem;justify-items:center}
.g-memoria-x2 .sx2-it{width:100%;max-width:8.5rem;aspect-ratio:1;background:#FFF8EA;border-radius:1.2rem;padding:.4rem;display:flex;align-items:center;justify-content:center;border-bottom:.35rem solid #E7C98F;transition:transform .3s}
.g-memoria-x2 .sx2-it svg{width:100%;height:100%}
.g-memoria-x2 .sx2-it.gap{background:rgba(255,255,255,.35);border:.2rem dashed #D9AE6B;border-bottom-width:.2rem}
.g-memoria-x2 .sx2-it.gap svg{display:none}
.g-memoria-x2 .sx2-cur{position:absolute;inset:0;border-radius:1.2rem;background:repeating-linear-gradient(90deg,#8C7BE0 0 1.6rem,#7A68D4 1.6rem 3.2rem);transform:translateY(-104%);transition:transform .7s cubic-bezier(.5,0,.3,1);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;color:#fff;font-family:'Baloo 2';font-size:1.6rem;z-index:3}
.g-memoria-x2 .sx2-cur.down{transform:none}
.g-memoria-x2 .sx2-cur svg{width:6rem}
.g-memoria-x2 .sx2-bar{display:flex;gap:1rem;align-items:center;justify-content:center;min-height:4rem;flex-wrap:wrap}
.g-memoria-x2 .sx2-time{width:4rem;height:4rem;border-radius:50%;background:#fff;border:.3rem solid var(--g);display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-size:2rem;color:var(--gd);box-shadow:var(--shadow)}
.g-memoria-x2 .sx2-opts{display:flex;gap:.8rem;flex-wrap:wrap;justify-content:center;width:100%}
.g-memoria-x2 .sx2-opts .pic{width:min(8.5rem,26vw);min-height:6.4rem}
.g-memoria-x2 .sx2-opts .pic svg{max-width:5.6rem;max-height:5.6rem}
.g-memoria-x2 .sx2-opts .pic.pulse{border-color:var(--yellow);background:#FFF8D6}
`);
Kids.game({
  id: 'memoria-x2', group: 'memoria', num: 6, title: '¿Qué ha desaparecido?',
  blurb: 'Mira bien los objetos de la estantería. Cuando se tapen, ¿cuál ha desaparecido?',
  how: 'Mira bien los objetos de la estantería. Cuando se tape con la cortina, uno desaparecerá. Dime cuál falta.',
  icon: 'teddy', levels: ['4 objetos, falta 1', '6 objetos', '8 objetos, faltan 2'], rounds: 6,
  round(g, i) {
    const L = g.level, N = [4, 6, 8][L - 1], T = [8, 6, 5][L - 1], nopt = [3, 4, 6][L - 1];
    const nMiss = L === 3 ? (i % 2 === 0 ? 1 : 2) : 1;
    const all = U.shuffle(POOL), shelf = all.slice(0, N), others = all.slice(N);
    const missing = U.sample(shelf, nMiss);
    const opts = U.shuffle(missing.concat(others.slice(0, nopt - nMiss)));
    const cols = L === 1 ? 4 : (L === 2 ? 3 : 4);
    g.ask('Mira bien los objetos');
    const root = U.el(`<div style="display:flex;flex-direction:column;align-items:center;gap:.8rem;width:100%">
      <div class="sx2-shelf"><div class="sx2-grid" style="grid-template-columns:repeat(${cols},1fr)">${shelf.map(n => `<div class="sx2-it" data-n="${n}" aria-label="${NAMES[n]}">${Kids.art.get(n)}</div>`).join('')}</div>
        <div class="sx2-cur"><svg viewBox="0 0 100 60"><path d="M14 30 Q30 46 46 30 M54 30 Q70 46 86 30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg><span>Ojitos cerrados…</span></div></div>
      <div class="sx2-bar"><div class="sx2-time" aria-live="off">${T}</div><button class="btn sm" id="ready" aria-label="Listo">¡Listo! ${Kids.icons.check}</button></div>
      <div class="sx2-opts" style="display:none"></div></div>`);
    g.area.appendChild(root);
    const cur = root.querySelector('.sx2-cur'), tm = root.querySelector('.sx2-time'), bar = root.querySelector('.sx2-bar'), optsEl = root.querySelector('.sx2-opts');
    let started = false, left = T;
    function cover() {
      if (started) return; started = true;
      g.ask('¡Cierra los ojitos!'); bar.style.visibility = 'hidden';
      cur.classList.add('down');
      g.t(() => {
        root.querySelectorAll('.sx2-it').forEach(e => { if (missing.includes(e.dataset.n)) { e.classList.add('gap'); e.innerHTML = ''; e.setAttribute('aria-label', 'hueco vacío'); } });
      }, 900);
      g.t(() => {
        cur.classList.remove('down');
        g.ask(nMiss === 2 ? '¿Cuáles dos han desaparecido?' : '¿Qué objeto ha desaparecido?');
        build();
      }, 1700);
    }
    function build() {
      bar.style.display = 'none'; optsEl.style.display = 'flex';
      let found = 0;
      optsEl.innerHTML = '';
      opts.forEach(n => {
        const b = U.el(`<button class="pic" aria-label="${NAMES[n]}">${Kids.art.get(n)}<span class="lbl">${NAMES[n]}</span></button>`);
        b.onclick = () => {
          if (b.disabled) return;
          if (missing.includes(n)) {
            b.classList.add('right'); b.disabled = true; found++;
            const gap = root.querySelector(`.sx2-it.gap[data-n="${n}"]`); if (gap) { gap.classList.remove('gap'); gap.innerHTML = Kids.art.get(n); gap.style.outline = '.3rem solid var(--green)'; }
            if (found === nMiss) g.right();
            else Kids.sound.pop();
          } else {
            b.classList.add('bad'); b.disabled = true; g.wrong();
          }
        };
        optsEl.appendChild(b);
      });
      g.helpHint = () => {
        [...optsEl.children].forEach((b, k) => { if (missing.includes(opts[k]) && !b.disabled) b.classList.add('pulse'); });
      };
    }
    root.querySelector('#ready').onclick = cover;
    (function tick() { g.t(() => { if (started) return; left--; tm.textContent = Math.max(0, left); if (left <= 0) cover(); else tick(); }, 1000); })();
  }
});
})();
