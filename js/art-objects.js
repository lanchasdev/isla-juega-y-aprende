/* Dibujos compartidos: objetos y juguetes (Kids.art) */
(function () {
  'use strict';
  const K = window.Kids;
  const S = (inner) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  /* mezcla un color hex con negro (t<0) o blanco (t>0) */
  function mix(hex, t) {
    let h = String(hex).replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    const ch = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(t < 0 ? v * (1 + t) : v + (255 - v) * t));
    return '#' + ch.map(v => v.toString(16).padStart(2, '0')).join('');
  }
  const shadow = (cx = 50, cy = 91, rx = 34) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="4" fill="#5b4a2e" opacity=".16"/>`;
  const gloss = (d) => `<path d="${d}" fill="#fff" opacity=".45"/>`;
  const wheel = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#3a3f52"/><circle cx="${cx}" cy="${cy}" r="${r * .5}" fill="#dfe5ee"/><circle cx="${cx}" cy="${cy}" r="${r * .18}" fill="#8b95a8"/>`;
  const eye = (x, y, r = 3) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#3b2a20"/><circle cx="${x + r * .35}" cy="${y - r * .35}" r="${r * .35}" fill="#fff"/>`;
  const cheek = (x, y, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FF8FA3" opacity=".55"/>`;

  const art = {};

  art.car = S(`${shadow(50, 90, 40)}
    <path d="M24 52 L32 31 Q34 26 40 26 H62 Q68 26 71 31 L80 52Z" fill="#4C9AF5"/>
    <path d="M33 50 L38 33 H48 V50Z M52 50 V33 H62 Q65 33 67 37 L72 50Z" fill="#D6EEFF"/>
    <rect x="6" y="48" width="88" height="32" rx="13" fill="#2F7FE0"/>
    <rect x="6" y="48" width="88" height="12" rx="6" fill="#4C9AF5"/>
    <path d="M12 54 H60" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <rect x="86" y="58" width="9" height="9" rx="4" fill="#FFE066"/><rect x="5" y="58" width="7" height="9" rx="3" fill="#FF6B6B"/>
    <rect x="44" y="66" width="12" height="3.5" rx="1.7" fill="#1E5FB8" opacity=".7"/>
    ${wheel(27, 80, 11)}${wheel(73, 80, 11)}`);

  art.ball = (() => {
    const cols = ['#FF6B6B', '#FFE9C7', '#4DABF7', '#FFD43B', '#69DB7C', '#FFE9C7'];
    let w = '';
    for (let i = 0; i < 6; i++) {
      const a1 = (i * 60 - 90) * Math.PI / 180, a2 = ((i + 1) * 60 - 90) * Math.PI / 180;
      w += `<path d="M50 50 L${(50 + 70 * Math.cos(a1)).toFixed(1)} ${(50 + 70 * Math.sin(a1)).toFixed(1)} L${(50 + 70 * Math.cos(a2)).toFixed(1)} ${(50 + 70 * Math.sin(a2)).toFixed(1)}Z" fill="${cols[i]}"/>`;
    }
    return S(`<defs><clipPath id="ball-c"><circle cx="50" cy="49" r="44"/></clipPath></defs>
      <ellipse cx="50" cy="93" rx="30" ry="3.5" fill="#5b4a2e" opacity=".16"/>
      <g clip-path="url(#ball-c)" transform="translate(0 -1)">${w}<circle cx="50" cy="50" r="7" fill="#FFF8E8"/><circle cx="50" cy="50" r="3.5" fill="#FF6B6B"/>
      <circle cx="50" cy="50" r="62" fill="none" stroke="#000" stroke-opacity=".06" stroke-width="30"/></g>
      <circle cx="50" cy="49" r="43" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
      <ellipse cx="33" cy="26" rx="11" ry="6" transform="rotate(-35 33 26)" fill="#fff" opacity=".55"/>`);
  })();

  art.teddy = S(`${shadow()}
    <circle cx="26" cy="24" r="12" fill="#B9773F"/><circle cx="26" cy="24" r="6.5" fill="#F2C48D"/>
    <circle cx="74" cy="24" r="12" fill="#B9773F"/><circle cx="74" cy="24" r="6.5" fill="#F2C48D"/>
    <ellipse cx="23" cy="68" rx="9" ry="14" transform="rotate(25 23 68)" fill="#B9773F"/>
    <ellipse cx="77" cy="68" rx="9" ry="14" transform="rotate(-25 77 68)" fill="#B9773F"/>
    <ellipse cx="34" cy="88" rx="12" ry="8" fill="#B9773F"/><ellipse cx="66" cy="88" rx="12" ry="8" fill="#B9773F"/>
    <ellipse cx="34" cy="89" rx="6" ry="4" fill="#F2C48D"/><ellipse cx="66" cy="89" rx="6" ry="4" fill="#F2C48D"/>
    <ellipse cx="50" cy="70" rx="23" ry="22" fill="#C98544"/><ellipse cx="50" cy="73" rx="13" ry="13" fill="#F2C48D"/>
    <circle cx="50" cy="38" r="26" fill="#C98544"/>
    <ellipse cx="50" cy="47" rx="12" ry="9.5" fill="#F2C48D"/><ellipse cx="50" cy="43" rx="4.5" ry="3.3" fill="#4a2f20"/>
    <path d="M50 46 V50 M44.5 50 Q50 54 55.5 50" stroke="#4a2f20" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    ${eye(40, 34, 3)}${eye(60, 34, 3)}${cheek(33, 44, 3.5)}${cheek(67, 44, 3.5)}
    <path d="M50 62 L36 55 Q32 60 36 66Z M50 62 L64 55 Q68 60 64 66Z" fill="#E8505B"/>
    <circle cx="50" cy="62" r="4.5" fill="#D13A47"/>
    ${gloss('M32 22 Q40 14 50 14 Q40 18 34 28Z')}`);

  art.robot = S(`${shadow()}
    <path d="M50 22 V11" stroke="#8aa0b5" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="9" r="5" fill="#FF6B6B"/>
    <rect x="18" y="32" width="9" height="16" rx="4" fill="#8aa0b5"/><rect x="73" y="32" width="9" height="16" rx="4" fill="#8aa0b5"/>
    <rect x="12" y="62" width="14" height="24" rx="7" fill="#8aa0b5"/><rect x="74" y="62" width="14" height="24" rx="7" fill="#8aa0b5"/>
    <rect x="34" y="82" width="12" height="11" rx="4" fill="#5d7287"/><rect x="54" y="82" width="12" height="11" rx="4" fill="#5d7287"/>
    <rect x="26" y="58" width="48" height="29" rx="9" fill="#58A6F0"/>
    <rect x="32" y="64" width="36" height="16" rx="5" fill="#CFE8FF"/>
    <circle cx="40" cy="72" r="3.5" fill="#FF6B6B"/><circle cx="50" cy="72" r="3.5" fill="#FFD43B"/><circle cx="60" cy="72" r="3.5" fill="#69DB7C"/>
    <rect x="24" y="21" width="52" height="40" rx="13" fill="#7DBBF7"/>
    <rect x="31" y="29" width="38" height="24" rx="9" fill="#1f3a5f"/>
    <circle cx="41" cy="40" r="6" fill="#9be7ff"/><circle cx="59" cy="40" r="6" fill="#9be7ff"/>
    <circle cx="42.5" cy="38.5" r="2" fill="#fff"/><circle cx="60.5" cy="38.5" r="2" fill="#fff"/>
    <path d="M43 47 Q50 52 57 47" stroke="#9be7ff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    ${cheek(29, 52, 3)}${cheek(71, 52, 3)}${gloss('M28 28 Q32 24 40 24 Q32 27 30 34Z')}`);

  art.kite = S(`<path d="M50 70 Q36 78 48 84 Q62 90 50 96" stroke="#8a6a4a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M50 6 L82 38 L50 70 L18 38Z" fill="#FF6B6B"/>
    <path d="M50 6 L82 38 L50 38Z" fill="#FFD43B"/><path d="M50 38 L18 38 L50 70Z" fill="#4DABF7"/>
    <path d="M50 6 V70 M18 38 H82" stroke="#fff" stroke-width="2" opacity=".7"/>
    <path d="M50 6 L82 38 L50 70 L18 38Z" fill="none" stroke="#c9453f" stroke-width="2" stroke-linejoin="round"/>
    <path d="M40 76 L48 72 L48 81Z M60 76 L52 72 L52 81Z" fill="#FF6B6B" transform="translate(-1 0)"/>
    <path d="M38 86 L47 82 L47 91Z M61 90 L53 86 L53 95Z" fill="#4DABF7"/>
    <path d="M42 66 L50 62 L50 71Z M58 66 L50 62 L50 71Z" fill="none"/>
    ${gloss('M30 30 L44 14 L44 24 L34 36Z')}`);

  art.drum = S(`${shadow(50, 92, 36)}
    <path d="M16 42 V76 Q16 90 50 90 Q84 90 84 76 V42Z" fill="#E8505B"/>
    <path d="M18 52 L34 82 L50 54 L66 82 L82 52" stroke="#FFE3C2" stroke-width="3" fill="none" stroke-linejoin="round"/>
    <path d="M16 42 V76 Q16 90 50 90" stroke="#fff" stroke-width="3" fill="none" opacity=".25" transform="translate(4 0)"/>
    <ellipse cx="50" cy="42" rx="34" ry="12" fill="#FFC21A"/><ellipse cx="50" cy="42" rx="30" ry="9.5" fill="#FFF1D6"/>
    <path d="M16 78 Q50 96 84 78" stroke="#FFC21A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M24 8 L52 40" stroke="#D9A066" stroke-width="5" stroke-linecap="round"/><circle cx="23" cy="7" r="5.5" fill="#FFD43B"/>
    <path d="M76 8 L48 40" stroke="#D9A066" stroke-width="5" stroke-linecap="round"/><circle cx="77" cy="7" r="5.5" fill="#FFD43B"/>`);

  art.train = S(`${shadow(50, 91, 44)}
    <circle cx="52" cy="14" r="5" fill="#fff" opacity=".8"/><circle cx="60" cy="8" r="4" fill="#fff" opacity=".6"/>
    <rect x="44" y="26" width="9" height="18" rx="2" fill="#3b4252"/><rect x="41" y="22" width="15" height="7" rx="3.5" fill="#3b4252"/>
    <rect x="28" y="42" width="34" height="32" rx="9" fill="#4DABF7"/>
    <circle cx="62" cy="58" r="3" fill="#FFE066"/>
    <rect x="6" y="28" width="28" height="46" rx="6" fill="#E8505B"/><rect x="3" y="23" width="34" height="9" rx="4" fill="#B93A44"/>
    <rect x="11" y="36" width="18" height="15" rx="4" fill="#D6EEFF"/>
    <rect x="66" y="46" width="30" height="28" rx="5" fill="#FFC21A"/>
    <rect x="66" y="46" width="30" height="7" rx="3" fill="#E69A00"/>
    <circle cx="74" cy="42" r="6" fill="#69DB7C"/><circle cx="86" cy="42" r="6" fill="#FF8FA3"/>
    <rect x="61" y="63" width="6" height="4" fill="#3b4252"/>
    ${wheel(19, 78, 9)}${wheel(46, 80, 7)}${wheel(75, 80, 7)}${wheel(88, 80, 7)}
    <rect x="2" y="87" width="96" height="3" rx="1.5" fill="#8a7a55" opacity=".5"/>`);

  art.doll = S(`${shadow(50, 94, 26)}
    <circle cx="27" cy="30" r="10" fill="#8B5A2B"/><circle cx="73" cy="30" r="10" fill="#8B5A2B"/>
    <path d="M24 22 L33 26 L30 33 L22 29Z M76 22 L67 26 L70 33 L78 29Z" fill="#E8505B"/>
    <circle cx="50" cy="27" r="19" fill="#8B5A2B"/>
    <ellipse cx="50" cy="31" rx="15" ry="16" fill="#FFD9B8"/>
    <path d="M34 28 Q36 11 50 11 Q64 11 66 28 Q58 18 50 21 Q42 18 34 28Z" fill="#8B5A2B"/>
    ${eye(44, 32, 2.4)}${eye(56, 32, 2.4)}${cheek(39, 38, 3)}${cheek(61, 38, 3)}
    <path d="M45 39 Q50 43 55 39" stroke="#C04A4A" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="27" cy="62" rx="5.5" ry="11" transform="rotate(25 27 62)" fill="#FFD9B8"/>
    <ellipse cx="73" cy="62" rx="5.5" ry="11" transform="rotate(-25 73 62)" fill="#FFD9B8"/>
    <rect x="39" y="80" width="7" height="12" rx="3" fill="#FFD9B8"/><rect x="54" y="80" width="7" height="12" rx="3" fill="#FFD9B8"/>
    <ellipse cx="41" cy="93" rx="7" ry="4" fill="#E8505B"/><ellipse cx="59" cy="93" rx="7" ry="4" fill="#E8505B"/>
    <path d="M40 46 Q50 42 60 46 L78 84 Q50 92 22 84Z" fill="#FF7EA8"/>
    <path d="M36 62 Q50 68 64 62 M30 74 Q50 82 70 74" stroke="#fff" stroke-width="2.5" fill="none" opacity=".5" stroke-linecap="round"/>
    <circle cx="50" cy="52" r="2.5" fill="#FFD43B"/>`);

  art.table = S(`${shadow(50, 92, 44)}
    <rect x="18" y="50" width="8" height="30" rx="2" fill="#B97A3E"/><rect x="74" y="50" width="8" height="30" rx="2" fill="#B97A3E"/>
    <path d="M18 28 H82 L94 44 H6Z" fill="#EDBE80"/>
    <rect x="6" y="44" width="88" height="10" rx="4" fill="#D29A57"/>
    <rect x="9" y="54" width="9" height="38" rx="3" fill="#D29A57"/><rect x="82" y="54" width="9" height="38" rx="3" fill="#D29A57"/>
    <path d="M24 36 H70 M30 40 H78" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    <path d="M12 48 H88" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".3"/>`);

  art.chair = S(`${shadow(50, 93, 32)}
    <rect x="24" y="6" width="9" height="56" rx="4" fill="#C98B4B"/><rect x="67" y="6" width="9" height="56" rx="4" fill="#C98B4B"/>
    <rect x="30" y="10" width="40" height="30" rx="7" fill="#E3A862"/>
    <path d="M40 14 V36 M50 14 V36 M60 14 V36" stroke="#C98B4B" stroke-width="3" stroke-linecap="round"/>
    <rect x="22" y="52" width="9" height="40" rx="3" fill="#C98B4B"/><rect x="69" y="52" width="9" height="40" rx="3" fill="#C98B4B"/>
    <rect x="16" y="48" width="68" height="16" rx="7" fill="#E8505B"/>
    <rect x="18" y="49" width="64" height="6" rx="3" fill="#fff" opacity=".28"/>`);

  art.button = (color = '#F26B6B') => {
    const d = mix(color, -.25), l = mix(color, .35), h = mix(color, -.5);
    return S(`<ellipse cx="50" cy="94" rx="30" ry="3.2" fill="#5b4a2e" opacity=".14"/>
      <circle cx="50" cy="49" r="44" fill="${d}"/><circle cx="50" cy="47" r="44" fill="${color}"/>
      <circle cx="50" cy="47" r="33" fill="none" stroke="${d}" stroke-width="3.5"/>
      <circle cx="50" cy="47" r="30" fill="${l}" opacity=".18"/>
      <g fill="${h}"><circle cx="41" cy="38" r="5.2"/><circle cx="59" cy="38" r="5.2"/><circle cx="41" cy="56" r="5.2"/><circle cx="59" cy="56" r="5.2"/></g>
      <path d="M41 38 L59 56 M59 38 L41 56" stroke="#F8F1E4" stroke-width="2.6" stroke-linecap="round"/>
      <g fill="none" stroke="#fff" stroke-width="1.2" opacity=".0"></g>
      <path d="M20 30 Q30 14 48 11" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/>`);
  };

  art.house = S(`${shadow(50, 92, 44)}
    <rect x="66" y="14" width="12" height="26" rx="2" fill="#B9704A"/><rect x="63" y="11" width="18" height="7" rx="3" fill="#8f5636"/>
    <rect x="15" y="44" width="70" height="46" rx="4" fill="#FFE2A8"/>
    <rect x="15" y="82" width="70" height="8" fill="#F3CC84" opacity=".8"/>
    <path d="M6 52 L50 12 L94 52Z" fill="#E8505B" stroke="#E8505B" stroke-width="6" stroke-linejoin="round"/>
    <path d="M22 42 L50 18" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".4"/>
    <circle cx="50" cy="38" r="6" fill="#D6EEFF"/><circle cx="50" cy="38" r="6" fill="none" stroke="#8f4a36" stroke-width="2"/>
    <path d="M42 90 V70 Q42 62 50 62 Q58 62 58 70 V90Z" fill="#4DABF7"/><circle cx="54" cy="77" r="1.8" fill="#FFE066"/>
    <rect x="20" y="58" width="16" height="16" rx="3" fill="#D6EEFF"/><rect x="64" y="58" width="16" height="16" rx="3" fill="#D6EEFF"/>
    <path d="M28 58 V74 M20 66 H36 M72 58 V74 M64 66 H80" stroke="#fff" stroke-width="2"/>
    <rect x="20" y="58" width="16" height="16" rx="3" fill="none" stroke="#C98B4B" stroke-width="2"/><rect x="64" y="58" width="16" height="16" rx="3" fill="none" stroke="#C98B4B" stroke-width="2"/>`);

  art.key = S(`<g transform="rotate(-30 50 50)">
    <path d="M44 42 H88 Q94 42 94 48 V52 Q94 58 88 58 H44Z" fill="#F0A800"/>
    <rect x="72" y="56" width="9" height="16" rx="2.5" fill="#F0A800"/><rect x="85" y="56" width="9" height="11" rx="2.5" fill="#F0A800"/>
    <path d="M44 42 H88 Q94 42 94 48 H44Z" fill="#FFD43B"/>
    <path d="M28 25 A23 23 0 1 0 28 75 A23 23 0 1 0 28 25Z M28 38 A10 10 0 1 1 28 62 A10 10 0 1 1 28 38Z" fill="#FFC21A" fill-rule="evenodd"/>
    <path d="M12 38 Q16 27 28 25" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".6"/></g>`);

  art.book = S(`${shadow(50, 91, 44)}
    <path d="M5 28 Q27 22 50 32 Q73 22 95 28 V80 Q73 74 50 84 Q27 74 5 80Z" fill="#3B8BEB"/>
    <path d="M10 26 Q28 20 50 30 V78 Q28 68 10 74Z" fill="#FFFDF5"/>
    <path d="M90 26 Q72 20 50 30 V78 Q72 68 90 74Z" fill="#FFF6DE"/>
    <path d="M17 36 Q27 34 41 40 M17 46 Q27 44 41 50 M17 56 Q27 54 41 60" stroke="#c7bfa8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M59 40 Q73 34 83 36 M59 50 Q73 44 83 46" stroke="#c7bfa8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M62 58 L66 66 L74 67 L68 72 L70 80 L62 76 L55 80 L56 72 L50 67 L58 66Z" transform="translate(0 -12) scale(.9) translate(8 6)" fill="#FFC21A"/>
    <path d="M50 30 V78" stroke="#c7bfa8" stroke-width="1.5" opacity=".7"/>
    <path d="M72 66 V92 L77 87 L82 92 V70Z" fill="#E8505B" opacity="0"/>`);

  art.shoe = S(`${shadow(50, 91, 44)}
    <path d="M10 38 Q10 26 22 26 H34 Q38 46 56 50 Q76 52 88 62 Q94 67 94 76 V80 H10Z" fill="#E8505B"/>
    <path d="M60 52 Q78 54 88 62 Q94 67 94 76 V80 H62Z" fill="#fff" opacity=".2"/>
    <path d="M36 36 L48 32 M40 44 L52 39 M45 50 L57 45" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M10 26 Q10 20 22 20 H34 Q36 26 34 28 H12Z" fill="#B93A44"/>
    <rect x="6" y="72" width="90" height="15" rx="7.5" fill="#fff"/>
    <rect x="6" y="80" width="90" height="7" rx="3.5" fill="#d9cfb8"/>
    <path d="M12 48 Q16 62 12 68" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>`);

  art.beanie = S(`<defs><clipPath id="beanie-c"><path d="M17 62 Q17 20 50 20 Q83 20 83 62Z"/></clipPath></defs>
    ${shadow(50, 91, 38)}
    <path d="M17 62 Q17 20 50 20 Q83 20 83 62Z" fill="#FFF3DD"/>
    <g clip-path="url(#beanie-c)"><rect x="10" y="30" width="80" height="8" fill="#4C8FE0"/><rect x="10" y="46" width="80" height="8" fill="#4C8FE0"/></g>
    <rect x="12" y="58" width="76" height="26" rx="10" fill="#3B7BD6"/>
    <path d="M22 62 V80 M32 62 V80 M42 62 V80 M52 62 V80 M62 62 V80 M72 62 V80 M82 62 V80" stroke="#fff" stroke-width="2.2" opacity=".25" stroke-linecap="round"/>
    <circle cx="50" cy="15" r="11" fill="#FFFAF0"/>
    <circle cx="44" cy="12" r="4" fill="#fff"/><circle cx="56" cy="17" r="4" fill="#F0E4CC"/><circle cx="48" cy="19" r="3.5" fill="#F0E4CC"/>
    ${gloss('M26 40 Q30 28 42 25 Q34 32 32 44Z')}`);

  art.swimsuit = S(`<defs><clipPath id="swimsuit-c"><path d="M16 24 H84 L90 54 Q92 66 88 76 Q86 82 78 82 Q68 82 64 68 L50 58 L36 68 Q32 82 22 82 Q14 82 12 76 Q8 66 10 54Z"/></clipPath></defs>
    ${shadow(50, 91, 38)}
    <g clip-path="url(#swimsuit-c)">
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<rect x="${i * 8}" y="0" width="8" height="100" fill="${i % 2 ? '#3B8BEB' : '#F0505B'}"/>`).join('')}
    </g>
    <path d="M5 0" />
    <rect x="13" y="18" width="74" height="14" rx="7" fill="#FFF3DD"/>
    
    <path d="M44 32 Q40 42 36 44 M56 32 Q60 42 64 44" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <circle cx="36" cy="45" r="2.6" fill="#fff"/><circle cx="64" cy="45" r="2.6" fill="#fff"/>
    <path d="M12 78 Q22 84 30 78 M70 78 Q78 84 88 78" stroke="#000" stroke-opacity="0" fill="none"/>`);

  art.balloon = (color = '#FF7E69') => {
    const d = mix(color, -.22);
    return S(`<path d="M50 77 Q42 84 52 88 Q60 92 49 98" stroke="#8a7a65" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M50 70 L43 81 Q50 79 57 81Z" fill="${d}"/>
      <path d="M50 4 C22 4 16 28 20 44 C25 62 40 71 50 72 C60 71 75 62 80 44 C84 28 78 4 50 4Z" fill="${color}"/>
      <path d="M50 4 C78 4 84 28 80 44 C75 62 60 71 50 72 C66 62 72 40 68 24 C66 14 60 7 50 4Z" fill="${d}" opacity=".45"/>
      <ellipse cx="34" cy="24" rx="7" ry="12" transform="rotate(18 34 24)" fill="#fff" opacity=".55"/>
      <circle cx="30" cy="42" r="2.6" fill="#fff" opacity=".4"/>`);
  };

  art.coin = (txt = '1') => {
    const t = String(txt), n = t.length;
    const fs = n <= 1 ? 50 : n === 2 ? 40 : n === 3 ? 30 : 24;
    return S(`<ellipse cx="50" cy="94" rx="32" ry="3.2" fill="#5b4a2e" opacity=".15"/>
      <circle cx="50" cy="50" r="44" fill="#E69A00"/>
      <circle cx="50" cy="48" r="44" fill="#FFC21A"/>
      <circle cx="50" cy="48" r="36" fill="#FFD84D" stroke="#E8A800" stroke-width="3"/>
      <path d="M50 12 A36 36 0 0 0 14 48" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".55" transform="translate(0 0)"/>
      <text x="50" y="${48 + fs * .36}" font-size="${fs}" font-weight="800" text-anchor="middle" fill="#B87400" font-family="'Baloo 2','Nunito','Arial Rounded MT Bold',system-ui,sans-serif">${t.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>`);
  };

  art.boat = S(`<path d="M50 8 V64" stroke="#8B5A2B" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M50 8 L62 14 L50 20Z" fill="#E8505B"/>
    <path d="M54 20 Q80 38 84 58 H54Z" fill="#fff"/>
    <path d="M46 28 Q28 42 18 58 H46Z" fill="#FFD43B"/>
    <path d="M54 24 Q70 38 76 52" stroke="#e3dccb" stroke-width="2" fill="none" opacity=".8"/>
    <path d="M10 62 H90 L80 82 Q78 86 72 86 H28 Q22 86 20 82Z" fill="#E8505B"/>
    <path d="M10 62 H90 L88 67 H12Z" fill="#fff" opacity=".35"/>
    <circle cx="36" cy="73" r="3.5" fill="#D6EEFF"/><circle cx="50" cy="73" r="3.5" fill="#D6EEFF"/><circle cx="64" cy="73" r="3.5" fill="#D6EEFF"/>
    <path d="M2 86 Q10 80 18 86 T34 86 T50 86 T66 86 T82 86 T98 86 V96 H2Z" fill="#4DABF7" opacity=".9"/>
    <path d="M10 92 Q18 88 26 92 M58 93 Q66 89 74 93" stroke="#fff" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>`);

  art.bed = S(`${shadow(50, 93, 46)}
    <rect x="4" y="14" width="13" height="78" rx="5" fill="#C98B4B"/>
    <rect x="83" y="42" width="13" height="50" rx="5" fill="#C98B4B"/>
    <rect x="4" y="14" width="13" height="10" rx="5" fill="#E3A862"/>
    <rect x="14" y="68" width="74" height="10" rx="3" fill="#B97A3E"/>
    <rect x="14" y="48" width="72" height="24" rx="8" fill="#fff"/>
    <rect x="20" y="36" width="26" height="18" rx="9" fill="#FFF6DE"/><rect x="20" y="36" width="26" height="8" rx="4" fill="#fff"/>
    <path d="M40 46 H86 V68 Q86 74 80 74 H46 Q40 74 40 68Z" fill="#4DABF7"/>
    <path d="M40 46 H86 V54 H40Z" fill="#8CCBFA"/>
    <circle cx="54" cy="64" r="3" fill="#fff" opacity=".6"/><circle cx="66" cy="64" r="3" fill="#fff" opacity=".6"/><circle cx="78" cy="64" r="3" fill="#fff" opacity=".6"/>`);

  art.cup = S(`<ellipse cx="46" cy="88" rx="36" ry="6" fill="#E9DFC8"/><ellipse cx="46" cy="86" rx="36" ry="6" fill="#F6EEDC"/>
    <path d="M42 8 Q36 14 42 20 Q48 26 42 30 M56 10 Q50 16 56 22" stroke="#cfc8b8" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M70 42 H80 Q92 42 92 56 Q92 70 78 70 H68" stroke="#27A9A0" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 36 H76 V62 Q76 84 46 84 Q16 84 16 62Z" fill="#2FC4B9"/>
    <path d="M16 36 H76 V44 H16Z" fill="#fff" opacity=".18"/>
    <ellipse cx="46" cy="36" rx="30" ry="7" fill="#1E9A92"/><ellipse cx="46" cy="37" rx="26" ry="5" fill="#8A5A3C"/>
    <path d="M46 70 C36 63 36 55 41 54 C44 53 46 56 46 57 C46 56 48 53 51 54 C56 55 56 63 46 70Z" fill="#fff" opacity=".85"/>
    ${gloss('M22 46 Q22 62 28 72 Q20 62 20 48Z')}`);

  art.lamp = S(`${shadow(50, 93, 26)}
    <path d="M50 4 L50 8 M18 12 L22 15 M82 12 L78 15" stroke="#FFD43B" stroke-width="3" stroke-linecap="round" opacity="0"/>
    <rect x="45" y="50" width="10" height="30" rx="3" fill="#B9906A"/>
    <path d="M26 92 Q26 76 50 76 Q74 76 74 92Z" fill="#E8505B"/>
    <path d="M34 90 Q36 82 44 80" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4"/>
    <path d="M32 10 H68 L86 52 H14Z" fill="#FFCF4A"/>
    <path d="M50 10 H68 L86 52 H50Z" fill="#F5B72A" opacity=".5"/>
    <ellipse cx="50" cy="10" rx="18" ry="4" fill="#FFE58A"/><ellipse cx="50" cy="52" rx="36" ry="5" fill="#F0A800"/>
    <path d="M30 18 L22 42" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>
    <circle cx="50" cy="56" r="4" fill="#FFF5C2"/>`);

  art.scarf = S(`${shadow(50, 94, 36)}
    <defs><clipPath id="scarf-c"><path d="M56 54 L80 50 L88 90 L62 94Z"/></clipPath></defs>
    <path d="M56 54 L80 50 L88 90 L62 94Z" fill="#E8505B"/>
    <g clip-path="url(#scarf-c)"><path d="M50 62 L90 56 L90 64 L50 70Z M50 78 L90 72 L90 80 L50 86Z" fill="#fff" opacity=".85"/></g>
    <path d="M64 94 V99 M70 93 V99 M76 92 V98 M82 91 V97 M87 90 V96" stroke="#C93D49" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M6 24 Q50 78 94 24 L92 46 Q50 98 8 46Z" fill="#F0626B"/>
    <path d="M6 24 Q50 78 94 24 L93 32 Q50 86 7 32Z" fill="#fff" opacity=".2"/>
    <path d="M18 40 L22 24 M40 54 L42 40 M60 54 L58 40 M82 40 L78 24" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".85"/>`);

  art.tshirt = S(`${shadow(50, 93, 34)}
    <path d="M34 10 Q50 24 66 10 L94 24 L84 46 L72 40 V88 Q72 91 69 91 H31 Q28 91 28 88 V40 L16 46 L6 24Z" fill="#37B5A5"/>
    <path d="M6 24 L16 46 L28 40 L24 18Z M94 24 L84 46 L72 40 L76 18Z" fill="#2A9A8C"/>
    <path d="M34 10 Q50 24 66 10 Q64 20 50 26 Q36 20 34 10Z" fill="#1F7D72"/>
    <path d="M34 10 Q50 32 66 10" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6" transform="translate(0 2)"/>
    <path d="M50 44 L54.5 53 L64 54 L57 60.5 L59 70 L50 65 L41 70 L43 60.5 L36 54 L45.5 53Z" fill="#FFD43B"/>
    <path d="M32 40 V84" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".28"/>
    <path d="M30 86 H70" stroke="#1F7D72" stroke-width="2" stroke-dasharray="3 3" opacity=".6"/>`);

  art.sandal = S(`<ellipse cx="50" cy="95" rx="22" ry="3" fill="#5b4a2e" opacity=".14"/>
    <path d="M50 4 Q76 4 76 30 Q76 46 70 60 Q72 82 62 92 Q50 99 38 92 Q28 82 30 60 Q24 46 24 30 Q24 4 50 4Z" fill="#E2A24E" transform="translate(0 2)"/>
    <path d="M50 4 Q74 4 74 28 Q74 44 68 58 Q70 80 60 90 Q50 96 40 90 Q30 80 32 58 Q26 44 26 28 Q26 4 50 4Z" fill="#FFBE5C"/>
    <path d="M34 82 Q50 92 66 82" stroke="#E2A24E" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M28 46 Q34 28 50 24 Q66 28 72 46" stroke="#4DABF7" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50 24 V12" stroke="#4DABF7" stroke-width="9" stroke-linecap="round" opacity="0"/>
    <path d="M30 44 Q36 30 50 27" stroke="#8CCBFA" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
    <circle cx="50" cy="24" r="8" fill="#FF7EA8"/><circle cx="50" cy="24" r="3.5" fill="#FFE066"/>`);

  art.boot = S(`${shadow(54, 93, 42)}
    <path d="M27 10 H58 V56 Q60 63 76 65 Q94 67 94 80 Q94 91 84 91 H28 Q23 91 23 84Z" fill="#FFC21A"/>
    <path d="M58 56 Q60 63 76 65 Q94 67 94 80 Q94 91 84 91 H58Z" fill="#E8A800" opacity=".35"/>
    <path d="M23 80 H94 V84 Q94 92 84 92 H28 Q23 92 23 84Z" fill="#3B8BEB"/>
    <path d="M23 78 H94 V82 H23Z" fill="#fff" opacity=".6"/>
    <rect x="23" y="6" width="40" height="13" rx="6" fill="#E8505B"/>
    <rect x="25" y="8" width="36" height="4" rx="2" fill="#fff" opacity=".35"/>
    <path d="M32 24 Q31 46 34 66" stroke="#fff" stroke-width="4.5" stroke-linecap="round" fill="none" opacity=".5"/>
    <circle cx="74" cy="76" r="2" fill="#fff" opacity="0"/>`);

  art.hat = S(`${shadow(50, 91, 44)}
    <ellipse cx="50" cy="66" rx="46" ry="18" fill="#E5B35E"/>
    <ellipse cx="50" cy="63" rx="46" ry="17" fill="#F4CB78"/>
    <path d="M26 64 Q24 20 50 20 Q76 20 74 64Q50 74 26 64Z" fill="#F4CB78"/>
    <path d="M26 64 Q50 74 74 64 L73 53 Q50 63 27 53Z" fill="#E8505B"/>
    <path d="M30 34 Q50 26 70 34 M28 44 Q50 36 72 44" stroke="#D9A94F" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M14 66 Q50 82 86 66" stroke="#D9A94F" stroke-width="2" fill="none" opacity=".8"/>
    <path d="M60 60 L72 70 L66 74Z M60 60 L74 62 L72 70Z" fill="#C93D49"/>
    <circle cx="62" cy="60" r="4" fill="#E8505B"/>
    ${gloss('M32 34 Q36 24 46 22 Q38 28 36 40Z')}`);

  art.shape = (tipo = 'circle', color = '#E03131') => {
    const d = mix(color, -.2);
    const st = (pts) => `<polygon points="${pts}" fill="${color}" stroke="${color}" stroke-width="11" stroke-linejoin="round"/>`;
    let body, hi;
    switch (tipo) {
      case 'square':
        body = `<rect x="8" y="10" width="84" height="84" rx="20" fill="${d}"/><rect x="8" y="8" width="84" height="84" rx="20" fill="${color}"/>`;
        hi = `<path d="M22 28 Q22 20 30 20 H46" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".5"/>`; break;
      case 'triangle':
        body = `<g transform="translate(0 2)" opacity="1"><polygon points="50,16 88,82 12,82" fill="${d}" stroke="${d}" stroke-width="12" stroke-linejoin="round"/></g>${st('50,14 88,80 12,80')}`;
        hi = `<path d="M36 52 L48 30" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>`; break;
      case 'diamond':
        body = `<polygon points="50,14 88,52 50,90 12,52" fill="${d}" stroke="${d}" stroke-width="12" stroke-linejoin="round" transform="translate(0 2)"/>${st('50,12 88,50 50,88 12,50')}`;
        hi = `<path d="M30 40 L44 26" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>`; break;
      case 'star': {
        let p = '';
        for (let i = 0; i < 10; i++) { const r = i % 2 ? 21 : 41, a = (i * 36 - 90) * Math.PI / 180; p += `${(50 + r * Math.cos(a)).toFixed(1)},${(53 + r * Math.sin(a)).toFixed(1)} `; }
        let p2 = p.replace(/(\d+\.\d),(\d+\.\d)/g, (m, x, y) => `${x},${(+y + 2).toFixed(1)}`);
        body = `<polygon points="${p2}" fill="${d}" stroke="${d}" stroke-width="11" stroke-linejoin="round"/>${st(p)}`;
        hi = `<path d="M38 38 L48 22" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>`; break;
      }
      case 'heart': {
        const h = 'M50 88 C12 60 6 34 24 22 C38 14 48 22 50 30 C52 22 62 14 76 22 C94 34 88 60 50 88Z';
        body = `<path d="${h}" fill="${d}" transform="translate(0 3)"/><path d="${h}" fill="${color}"/>`;
        hi = `<path d="M22 34 Q24 26 32 25" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".5"/>`; break;
      }
      default:
        body = `<circle cx="50" cy="52" r="42" fill="${d}"/><circle cx="50" cy="50" r="42" fill="${color}"/>`;
        hi = `<path d="M22 40 Q26 24 42 18" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".5"/>`;
    }
    return S(body + hi);
  };

  K.art.add(art);
})();
