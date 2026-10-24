/* Juego mates-4: La tienda de juguetes — pagar con monedas */
(function () {
'use strict';
const U = Kids.util;
const TOYS = [['car', 'el coche'], ['ball', 'la pelota'], ['teddy', 'el osito'], ['robot', 'el robot'], ['kite', 'la cometa'], ['drum', 'el tambor'], ['train', 'el tren'], ['doll', 'la muñeca']];

Kids.css(`
.g-mates-4{gap:.9rem}.g-mates-4>*,.g-mates-4 .tray>*{flex:none}
.g-mates-4 .shop{display:flex;gap:1.2rem;align-items:center;justify-content:center;flex-wrap:wrap;width:100%}
.g-mates-4 .toycard{background:#fff;border-radius:1.8rem;box-shadow:0 .4rem 0 var(--line);padding:.5rem 1rem;display:flex;flex-direction:column;align-items:center;position:relative;width:min(11rem,30vw)}
.g-mates-4 .toycard svg{width:100%;max-height:7.5rem}
.g-mates-4 .tag{background:var(--yellow,#FFD23F);color:var(--ink);font-family:'Baloo 2';font-weight:800;font-size:1.7rem;line-height:1;padding:.25rem .9rem;border-radius:.9rem;box-shadow:0 .2rem 0 rgba(20,35,91,.2);margin-top:-.3rem}
.g-mates-4 .tray{display:flex;flex-direction:column;align-items:center;gap:.4rem;flex:1;min-width:16rem;max-width:34rem}
.g-mates-4 .tray .slot{width:100%;min-height:6.5rem;flex-wrap:wrap;gap:.3rem;padding:.4rem;align-content:center;position:relative}
.g-mates-4 .tray .slot:empty::before{content:'Suelta aquí las monedas';font-family:'Nunito';font-weight:800;font-size:1.1rem;color:#8a9ac4}
.g-mates-4 .tray .slot.over{border-color:#FF7E69;background:#FFF0E8}
.g-mates-4 .total{font-family:'Baloo 2';font-size:1.5rem;line-height:1}
.g-mates-4 .bar{width:100%;height:1rem;border-radius:999px;background:#fff;box-shadow:inset 0 .1rem 0 rgba(20,35,91,.15);overflow:hidden}
.g-mates-4 .bar i{display:block;height:100%;width:0;background:var(--g);border-radius:999px;transition:width .25s,background .2s}
.g-mates-4 .bar.over i{background:#FF7E69}
.g-mates-4 .purse{background:#F3D9B0;border-radius:1.8rem;box-shadow:0 .4rem 0 #D9B97F;padding:.6rem 1rem;display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;align-items:center;min-height:5rem;max-width:42rem;width:100%;position:relative;margin-top:.8rem}
.g-mates-4 .purse::before{content:'Mi monedero';position:absolute;top:-.9rem;left:1rem;background:#fff;padding:0 .7rem;border-radius:999px;font-family:'Baloo 2';font-size:1rem}
.g-mates-4 .coin{width:4.6rem;height:4.6rem;border-radius:50%;cursor:grab;display:block;padding:0;flex:none;position:relative}
.g-mates-4 .coin.c2{width:4.9rem;height:4.9rem}.g-mates-4 .coin.c5{width:5.4rem;height:5.4rem}.g-mates-4 .coin.c10{width:5.9rem;height:5.9rem}
.g-mates-4 .coin svg{width:100%;height:100%;display:block;pointer-events:none}
.g-mates-4 .coin.hint{animation:pulse .9s infinite}
.g-mates-4 .sub{display:flex;gap:.8rem;align-items:center;justify-content:center;flex-wrap:wrap}
.g-mates-4 .btn.sm{font-size:1.1rem;padding:.3rem 1.1rem}
.g-mates-4 .have{display:flex;gap:.4rem;flex-wrap:wrap;justify-content:center;background:#F3D9B0;border-radius:1.6rem;padding:.6rem 1rem;box-shadow:0 .4rem 0 #D9B97F;align-items:center}
.g-mates-4 .have .coin{cursor:default}
.g-mates-4 .shelf{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.g-mates-4 .shelf .pic{width:min(10rem,40vw)}
.g-mates-4 .shelf .pic svg{max-height:6.5rem}
.g-mates-4 .shelf .tag{margin-top:0}
.g-mates-4 .pic.hint{animation:pulse .9s infinite}
@media (max-width:640px){.g-mates-4 .coin{width:4rem;height:4rem}.g-mates-4 .coin.c2{width:4.2rem;height:4.2rem}.g-mates-4 .coin.c5{width:4.6rem;height:4.6rem}.g-mates-4 .coin.c10{width:5rem;height:5rem}}
`);

function decompose(price, denoms) {
  const out = []; let rem = price;
  while (rem > 0) {
    const ok = denoms.filter(d => d <= rem).sort((a, b) => b - a);
    out.push(U.pick(ok.slice(0, 2))); rem -= out[out.length - 1];
  }
  return out;
}
const coinEl = v => U.el(`<button class="coin c${v}" data-v="${v}" aria-label="Moneda de ${v} euro${v > 1 ? 's' : ''}">${Kids.art.get('coin', String(v))}</button>`);
const sum = a => a.reduce((s, x) => s + x, 0);

Kids.game({
  id: 'mates-4', group: 'mates', num: 4, title: 'La tienda de juguetes',
  blurb: 'Paga el juguete con las monedas justas.',
  how: 'Mira cuánto cuesta el juguete. Arrastra monedas a la bandeja hasta pagar justo lo que cuesta.',
  icon: 'teddy', levels: ['Hasta 5 €', 'Hasta 10 €', 'Hasta 20 €'], rounds: 5,

  round(g, i) {
    const L = g.level, A = g.area;
    const denoms = [[1, 2], [1, 2, 5], [1, 2, 5, 10]][L - 1];
    const maxP = [5, 10, 20][L - 1], minP = [2, 4, 8][L - 1];

    /* nivel 3, rondas 2 y 4: elegir el juguete que cuesta lo que indican las monedas */
    if (L === 3 && (i === 1 || i === 3)) return chooseRound();

    const price = U.rnd(minP, maxP);
    const [art, nm] = U.pick(TOYS);
    const sol = decompose(price, denoms);
    const extra = U.range([2, 3, 3][L - 1]).map(() => U.pick(denoms));
    const purseVals = U.shuffle(sol.concat(extra));
    g.ask(`Paga ${nm}: cuesta ${price} €`);

    const shop = U.el(`<div class="shop"><div class="toycard">${Kids.art.get(art)}<span class="tag">${price} €</span></div>
      <div class="tray"><div class="slot" aria-label="Bandeja de pago"></div>
      <div class="total"></div><div class="bar"><i></i></div></div></div>`);
    const tray = shop.querySelector('.slot'), total = shop.querySelector('.total'), bar = shop.querySelector('.bar');
    const purse = U.el('<div class="purse"></div>');
    const sub = U.el('<div class="sub"><button class="btn blue sm" type="button">Devolver todas</button></div>');
    A.append(shop, purse, sub);

    const coins = purseVals.map((v, k) => { const c = coinEl(v); c.dataset.id = k; return c; });
    // marcar una combinación válida (para la ayuda)
    const need = sol.slice();
    coins.forEach(c => { const ix = need.indexOf(+c.dataset.v); if (ix >= 0) { need.splice(ix, 1); c.dataset.sol = 1; } });
    coins.forEach(c => purse.appendChild(c));

    let done = false, wasOver = false;
    const paid = () => sum([...tray.children].map(c => +c.dataset.v));
    function update() {
      const p = paid();
      total.textContent = `Total pagado: ${p} / ${price}`;
      bar.firstElementChild.style.width = Math.min(100, p / price * 100) + '%';
      bar.classList.toggle('over', p > price); tray.classList.toggle('over', p > price);
      if (p > price && !wasOver) { wasOver = true; g.wrong('Te has pasado un poco. Toca una moneda de la bandeja para devolverla'); }
      if (p <= price) wasOver = false;
      if (p === price && !done) {
        done = true; coins.forEach(c => { c.dataset.locked = 1; }); tray.classList.add('filled'); g.right('¡Pagado justo!');
      }
    }
    function toTray(c) { tray.appendChild(c); c.classList.remove('hint'); Kids.sound.tap(); update(); }
    function toPurse(c) { purse.appendChild(c); Kids.sound.tap(); update(); }
    coins.forEach(c => Kids.drag(c, {
      targets: () => [tray, purse],
      onDrop(t, el) { if (done) return false; if (t === tray) { if (el.parentNode !== tray) toTray(el); } else if (el.parentNode !== purse) toPurse(el); return true; },
      onTap(el) { if (done) return; el.parentNode === tray ? toPurse(el) : toTray(el); }
    }));
    sub.firstElementChild.onclick = () => { if (done) return; [...tray.children].forEach(c => purse.appendChild(c)); update(); };
    update();
    g.helpHint = () => {
      g.toast('Mira las monedas que brillan', false);
      [...tray.children].forEach(c => purse.appendChild(c)); update();
      coins.forEach(c => { if (c.dataset.sol && c.parentNode === purse) c.classList.add('hint'); });
    };

    function chooseRound() {
      const prices = U.sample(U.range(20, 1).filter(x => x >= 3 && x <= 20), 4);
      const target = U.pick(prices), toys = U.sample(TOYS, 4);
      const vals = decompose(target, denoms).sort((a, b) => b - a);
      g.ask('Tengo estas monedas. ¿Qué juguete puedo comprar justo?');
      const have = U.el(`<div class="have">${vals.map(v => coinEl(v).outerHTML).join('')}<span class="chip total" style="display:none"></span></div>`);
      const shelf = U.el('<div class="shelf"></div>');
      A.append(have, shelf);
      let done = false;
      toys.forEach((t, k) => {
        const b = U.el(`<button class="pic" data-p="${prices[k]}" aria-label="${t[1]}, ${prices[k]} euros">${Kids.art.get(t[0])}<span class="tag">${prices[k]} €</span></button>`);
        b.onclick = () => {
          if (done || b.disabled) return;
          if (+b.dataset.p === target) { done = true; b.classList.add('right'); g.right(); }
          else { b.classList.add('bad'); b.disabled = true; g.wrong(); }
        };
        shelf.appendChild(b);
      });
      g.helpHint = () => {
        const c = have.querySelector('.chip'); c.style.display = ''; c.textContent = `Suman ${target} €`;
        shelf.querySelectorAll('.pic').forEach(b => { if (+b.dataset.p === target) b.classList.add('hint'); });
      };
    }
  }
});
})();
