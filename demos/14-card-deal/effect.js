// 夏夏的AI灵感 · 八张工具卡依次飞出。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
(() => {
  var clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  var out = (v) => 1 - Math.pow(1 - clamp(v), 3);
  var smooth = (v) => {
    v = clamp(v);
    return v * v * (3 - 2 * v);
  };
  var mix = (a, b, t) => a + (b - a) * t;
  var TIMING = { duration: 6.6, spinStart: 0, stop: 1.1, deal: 1.32, interval: 0.19, flight: 0.72, hold: 4.15 };
  var PHYSICS = { rise: 0.55, hover: 0, fall: 0.55, flight: 1.1, turns: 10, apexHeight: 600, airScale: 1.1, ground: 180, startZ: 650, viewTilt: 40 };
  var c = Math.cos(PHYSICS.viewTilt * Math.PI / 180);
  var s = Math.sin(PHYSICS.viewTilt * Math.PI / 180);
  function projectile(t) {
    const time = clamp(t, 0, PHYSICS.flight), p = clamp(time / PHYSICS.flight), H = PHYSICS.apexHeight;
    let height, verticalVelocity, z, phase;
    if (time < PHYSICS.rise) {
      const u = time / PHYSICS.rise;
      height = H * (2 * u - u * u);
      verticalVelocity = 2 * H * (1 - u) / PHYSICS.rise;
      z = PHYSICS.startZ * (1 - 0.5 * smooth(u));
      phase = "\u4E0A\u5347";
    } else if (time < PHYSICS.rise + PHYSICS.hover) {
      height = H;
      verticalVelocity = 0;
      z = PHYSICS.startZ / 2;
      phase = "\u6700\u9AD8\u70B9\u505C\u7559";
    } else {
      const u = clamp((time - PHYSICS.rise - PHYSICS.hover) / PHYSICS.fall);
      height = H * (1 - u * u);
      verticalVelocity = time >= PHYSICS.flight ? 0 : -2 * H * u / PHYSICS.fall;
      z = PHYSICS.startZ / 2 * (1 - smooth(u));
      phase = time >= PHYSICS.flight ? "\u843D\u684C" : "\u4E0B\u843D";
    }
    return { height, verticalVelocity, z, turn: PHYSICS.turns * 360 * (p * p * p * (10 + p * (-15 + 6 * p))), phase };
  }
  function project(y, z) {
    return { y: y * c + z * s, z: -y * s + z * c };
  }
  var LAND = { ...project(PHYSICS.ground, 0), rx: 50, s: 1.3 };
  function heroPose(t) {
    if (t < TIMING.stop) {
      const a = projectile(t), p = project(PHYSICS.ground - a.height, a.z);
      return { x: 0, ...p, rx: 50, ry: 0, rz: 0, s: mix(1.3, PHYSICS.airScale, smooth(a.height / PHYSICS.apexHeight)), opacity: 1, axis: [230, 282, 0], axisAngle: a.turn };
    }
    const exit = out((t - 3.65) / 0.38);
    return { x: 0, y: LAND.y, z: LAND.z, rx: 50, ry: 0, rz: 0, s: mix(1.3, 0.25, exit), opacity: 1 - exit };
  }
  function tableState(t) {
    const a = projectile(t), p = project(PHYSICS.ground, a.z), height = a.height / PHYSICS.apexHeight, fade = 1 - smooth((t - 3.5) / 0.65);
    return { opacity: fade, shadow: { ...p, scale: 1.3 + height * 0.4, blur: 3 + height * 22, opacity: fade * (0.48 - 0.43 * height) } };
  }
  var catalog = [["Remotion", "\u4EE3\u7801\u7F16\u6392\u89C6\u9891"], ["Anime.js", "\u4E8C\u7EF4\u52A8\u6548"], ["Tween.js", "\u52A8\u4F5C\u8FC7\u6E21"], ["Three.js", "\u5B9E\u65F6\u4E09\u7EF4"], ["Ammo.js", "\u7269\u7406\u6A21\u62DF"], ["TSL Textures", "\u7A0B\u5E8F\u7EB9\u7406"], ["SuperCollider", "\u58F0\u97F3\u5408\u6210"], ["FluidSynth", "MIDI\u4E50\u5668"], ["SoundTouchJS", "\u53D8\u901F\u53D8\u8C03"], ["FFmpeg", "\u89C6\u9891\u5904\u7406"], ["gifski", "\u52A8\u56FE\u8F93\u51FA"]];
  var svg = (s2) => `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s2}</svg>`;
  var symbols = [svg('<rect x="17" y="20" width="58" height="46" rx="5" opacity=".25"/><rect x="22" y="27" width="58" height="46" rx="5" opacity=".5"/><rect x="27" y="34" width="58" height="46" rx="5"/><path d="m51 47 16 10-16 10z"/>'), svg(Array.from({ length: 9 }, (_, i) => `<path d="M${13 + i * 9} ${35 + Math.sin(i * 0.8) * 17}v${24 + i * 2}" stroke-width="4" opacity="${0.3 + i * 0.075}"/>`).join("")), svg('<path d="M12 79C22 79 18 24 46 24S76 80 90 18" stroke-width="3"/><path d="M12 16v66h80" opacity=".2"/><circle cx="46" cy="24" r="6" fill="#a5c8f8"/>'), svg('<path d="m50 10 37 66-74 0zM50 10v80M13 76l37 14 37-14M13 76l37-41 37 41M50 35v55"/><circle cx="50" cy="35" r="4" fill="#769fcf"/>'), svg('<path d="m20 33 23-12 23 12v29L43 75 20 62zM20 33l23 13 23-13M43 46v29M61 55l17-9 17 9v23L78 87 61 78zM61 55l17 10 17-10M78 65v22"/>'), svg(Array.from({ length: 8 }, (_, i) => `<ellipse cx="50" cy="50" rx="${12 + i * 4}" ry="${7 + i * 5}" transform="rotate(${i * 11} 50 50)" opacity="${0.3 + i * 0.08}"/>`).join("")), svg('<path d="M6 50h8l7-27 12 57 12-62 12 61 11-49 9 27h17" stroke-width="2.6"/><path d="M7 16h86M7 84h86" opacity=".15"/>'), svg('<rect x="14" y="19" width="72" height="64" rx="5"/><path d="M28 20v62M43 20v62M57 20v62M72 20v62"/><path d="M25 20v34M40 20v34M68 20v34" stroke-width="7"/>'), svg('<path d="M10 51h8l5-21 9 44 11-51 10 53 10-47 10 39 7-17h10"/><path d="M24 12h52m-7-5 7 5-7 5M76 90H24m7-5-7 5 7 5"/>'), svg('<path d="m25 17 27 33-27 33m29-66 27 33-27 33" stroke-width="7"/><path d="M15 8h72M15 92h72" opacity=".22"/>'), svg('<rect x="15" y="17" width="65" height="57" rx="5" opacity=".25"/><rect x="22" y="25" width="65" height="57" rx="5"/><path d="M43 53c-14-24-29 19-8 12l31-20c21-7 6 36-8 12" stroke-width="3"/>')];
  var keep = [3, 1, 2, 4, 5, 6, 0, 9];
  var tools = keep.map((i) => catalog[i]);
  var back = '<div class="edge"></div><div class="face back"><span class="back-word">AI</span></div>';
  var deck = document.getElementById("deck");
  deck.innerHTML = `<div class="card hero" id="hero">${back}<div class="face front"><div class="corner">AI</div><div class="micro">CREATIVE TOOLS</div><div class="hero-number">8</div><div class="hero-name">TOOLS</div><div class="hero-note">AI \u89C6\u9891\u5236\u4F5C\u5DE5\u5177\u5408\u96C6</div></div></div>`;
  document.getElementById("cards").innerHTML = tools.map(([name, use], i) => `<div class="card-layer" style="z-index:${i + 1}"><div class="card tool" data-tool="${name}" data-layout-allow-overflow>${back}<div class="face front"><div class="corner">${String(i + 1).padStart(2, "0")}</div><div class="micro">AI TOOLKIT</div><div class="symbol">${symbols[keep[i]]}</div><h2 class="tool-name ${name.length > 11 ? "long" : ""}">${name}</h2><div class="use">${use}</div><div class="corner end">${String(i + 1).padStart(2, "0")}</div></div></div></div>`).join("");
  var hero = document.getElementById("hero");
  var cards = [...document.querySelectorAll(".tool")];
  function pose(el, p) {
    const diagonal = Array.isArray(p.axis), angle = diagonal ? p.axisAngle : p.ry;
    el.style.opacity = p.opacity;
    const rotation = diagonal ? `rotateZ(${p.rz}deg) rotateY(${p.ry}deg) rotateX(${p.rx}deg) rotate3d(${p.axis.join(",")},${angle}deg)` : `rotateZ(${p.rz}deg) rotateY(${p.ry}deg) rotateX(${p.rx}deg)`;
    el.style.transform = `translate3d(${p.x}px,${p.y}px,${p.z}px) ${rotation} scale(${p.s})`;
    el.style.setProperty("--shine", Math.sin(angle * Math.PI / 180) * 70 + "%");
    el.style.setProperty("--gloss", 0.13 + Math.abs(Math.sin(angle * Math.PI / 180)) * 0.38);
    const r = Math.PI / 180, sz = Math.sin(p.rz * r), cz = Math.cos(p.rz * r);
    let nx, ny, nz;
    if (diagonal) {
      const len = Math.hypot(...p.axis), ax = p.axis[0] / len, ay = p.axis[1] / len, sn = Math.sin(angle * r), co = Math.cos(angle * r), sx = Math.sin(p.rx * r), cx = Math.cos(p.rx * r), sy = Math.sin(p.ry * r), cy = Math.cos(p.ry * r);
      const x0 = ay * sn, y0 = -ax * sn * cx - co * sx, z0 = -ax * sn * sx + co * cx, x1 = x0 * cy + z0 * sy, y1 = y0;
      nz = -x0 * sy + z0 * cy;
      nx = cz * x1 - sz * y1;
      ny = sz * x1 + cz * y1;
    } else {
      const sx = Math.sin(p.rx * r), cx = Math.cos(p.rx * r), sy = Math.sin(p.ry * r), cy = Math.cos(p.ry * r);
      nx = cz * sy * cx + sz * sx;
      ny = sz * sy * cx - cz * sx;
      nz = cy * cx;
    }
    const front = nx * -p.x + ny * -p.y + nz * (1500 - p.z) > 0;
    el.querySelector(".front").style.opacity = front ? "1" : "0";
    el.querySelector(".back").style.opacity = front ? "0" : "1";
  }
  var BEATS = { deal: 1.25, interval: 0.095, flight: 0.5, dealEnd: 2.7, dollyEnd: 2.82, lift: 2.74, titleIn: 2.8, titleReady: 3.4, impact: 4.9, body: 5, clear: 5.55, duration: 10 };
  var cardEls = [...document.querySelectorAll(".tool")];
  var hero2 = document.getElementById("hero");
  var caption = document.getElementById("caption");
  var title = "VibeCoding8\u79CD\u5DE5\u5177\u5206\u4EAB";
  var en = [..."VibeCoding"].map((c2, i) => `<span class="glyph english ${i === 0 ? "cut-v" : ""}" data-glyph="${i}" aria-hidden="true"><span class="ink">${c2}</span></span>`).join("");
  var zh = [..."\u79CD\u5DE5\u5177\u5206\u4EAB"].map((c2, i) => `<span class="glyph cjk" data-glyph="${i + 11}" aria-hidden="true"><span class="ink">${c2}</span></span>`).join("");
  caption.innerHTML = `<div id="title-main">${en}</div><div id="title-subline"><span class="glyph digit" data-glyph="10" aria-hidden="true"></span><div id="title-chinese">${zh}</div></div>`;
  var glyphs = [...caption.querySelectorAll(".glyph")].sort((a, b) => Number(a.dataset.glyph) - Number(b.dataset.glyph));
  var design = document.querySelector("#design");
  var stage = document.querySelector("#stage");
  function size() {
    design.style.transform = "scale(" + stage.clientWidth / 1440 + ")";
  }
  new ResizeObserver(size).observe(stage);
  size();
  var baseCenters = glyphs.map((el) => {
    const r = el.getBoundingClientRect();
    const b = stage.getBoundingClientRect(), k = 1440 / b.width;
    return { x: (r.x + r.width / 2 - b.x) * k, y: (r.y + r.height / 2 - b.y) * k };
  });
  var slotCenter = baseCenters[10];
  var scatter = [[-0.9, -0.038, 0.677], [0.61, 0.716, -0.967], [0.418, 0.575, 0.822], [-0.76, -0.451, 0.944], [-0.621, 0.579, -0.215], [0.714, 0.437, -0.824], [0.577, 0.567, 0.464], [0.902, 0.346, 0.016], [-0.526, 0.743, -0.275], [-0.571, -0.353, 0.954], [-0.666, 0.61, -0.075], [-0.122, 0.875, -0.783], [-0.141, 0.726, -0.659], [0.606, -0.665, -0.713], [-0.962, 0.131, 0.307], [0.227, 0.813, -0.979], [0.264, -0.754, -0.013]];
  function grid(i) {
    const row = Math.floor(i / 4), col = i % 4;
    return { x: (col - 1.5) * 360, y: [-230, 230][row], z: 0, rz: (col - 1.5) * 1.7 };
  }
  function camera(t) {
    const p = smooth((t - BEATS.deal) / (BEATS.dollyEnd - BEATS.deal));
    return { y: -100 * p, z: -450 * p };
  }
  function expandedGrid(i) {
    const col = i % 4;
    return { x: (col - 1.5) * 365, y: i < 4 ? -350 : 440, z: 0, rz: (col - 1.5) * (i < 4 ? -1.2 : 1.3) };
  }
  function floating(t, i) {
    const b = grid(i), e = expandedGrid(i), q = smooth((t - BEATS.lift) / 0.36), h = Math.max(0, t - BEATS.lift), ph = i * 0.73, u = clamp((t - BEATS.titleIn) / 0.6), push = 1 - Math.pow(1 - u, 3) + Math.sin(u * Math.PI) * 0.07;
    return { x: mix(b.x, e.x, push) + q * Math.sin(h * 1.8 + ph) * 5, y: mix(b.y, e.y, push) - 20 * q + q * Math.sin(h * 2.1 + ph) * 8, z: 55 * q + q * Math.sin(h * 1.5 + ph) * 10, rx: q * Math.sin(h * 1.7 + ph) * 3, ry: q * Math.cos(h * 1.4 + ph) * 3.4, rz: mix(b.rz, e.rz, push) + q * Math.sin(h * 1.8 + ph) * 2.1, s: mix(1.1, 0.97, push), opacity: 1 };
  }
  function toolPose(t, i) {
    const start = BEATS.deal + i * BEATS.interval, u = clamp((t - start) / BEATS.flight), p = out(u), b = grid(i), lift = Math.sin(u * Math.PI);
    let a = { x: mix(0, b.x, p), y: mix(LAND.y, b.y, p) - lift * (i < 4 ? 20 + i % 2 * 8 : 125 + i % 3 * 18), z: mix(LAND.z + 4, 0, p) + lift * (i < 4 ? 70 : 190), rx: mix(50, 0, p) + Math.sin(u * Math.PI * 2) * 14, ry: 0, rz: mix(0, b.rz, p) + lift * (b.x < 0 ? -24 : 24), s: mix(1.3, 1.1, p), opacity: t < start ? 0 : 1 };
    if (t >= BEATS.lift) a = floating(t, i);
    if (t >= BEATS.impact) {
      const h = t - BEATS.impact, e = clamp(h / 0.52), travel = 2400 * (e * 0.7 + e * e * 0.3), origin = floating(BEATS.impact, i), len = Math.hypot(origin.x, origin.y + 50) || 1, dx = origin.x / len, dy = (origin.y + 50) / len, sign = i % 2 ? 1 : -1;
      a = { ...origin, x: origin.x + dx * travel, y: origin.y + dy * travel, z: origin.z + e * 690, rx: origin.rx + sign * e * (75 + i * 4), ry: origin.ry + sign * e * (100 + i * 5), rz: origin.rz + sign * e * (100 + i * 7), s: origin.s + e * 0.15, opacity: t >= BEATS.clear ? 0 : 1 };
    }
    const cam = camera(t);
    a.y += cam.y;
    a.z += cam.z;
    return a;
  }
  function render(t) {
    const cam = camera(t), floor = tableState(Math.min(t, 1.3)), fade = 1 - smooth((t - 2.3) / 0.5), shadow = floor.shadow, table = document.getElementById("table"), cast = document.getElementById("contact-shadow");
    table.style.transform = `translate3d(0,${LAND.y + 2 + cam.y}px,${LAND.z - 2 + cam.z}px) rotateX(50deg)`;
    table.style.opacity = fade;
    cast.style.transform = `translate3d(0,${shadow.y + 1 + cam.y}px,${shadow.z - 1 + cam.z}px) rotateX(50deg) scale(${shadow.scale})`;
    cast.style.opacity = shadow.opacity * fade;
    cast.style.filter = `blur(${shadow.blur}px)`;
    let hp = heroPose(Math.min(t, 1.3));
    hp = { ...hp, y: hp.y + cam.y, z: hp.z + cam.z };
    const lift = smooth((t - BEATS.titleIn) / 0.38), floatTime = Math.max(0, t - BEATS.titleReady);
    const slotZ = 20, slotX = (slotCenter.x - 720) * (1500 - slotZ) / 1500, slotY = (slotCenter.y - 540) * (1500 - slotZ) / 1500;
    hp = { ...hp, x: mix(hp.x, slotX, lift), y: mix(hp.y, slotY, lift) + Math.sin(floatTime * 1.65) * 4 * lift, z: mix(hp.z, slotZ, lift), rx: mix(hp.rx, 0, lift), ry: Math.sin(floatTime * 1.2) * 2 * lift, rz: Math.sin(floatTime * 1.5) * 1.5 * lift, s: mix(hp.s, 0.42, lift), opacity: 1 };
    if (t >= BEATS.impact) {
      const u = clamp((t - BEATS.impact) / 0.48);
      hp = { ...hp, x: hp.x + u * u * 2100, y: hp.y - u * u * 1500, z: hp.z + u * 450, rx: hp.rx + u * 90, ry: hp.ry + u * 140, rz: hp.rz + u * 210, opacity: t >= BEATS.clear ? 0 : 1 };
    }
    pose(hero2, hp);
    cardEls.forEach((el, i) => pose(el, toolPose(t, i)));
    const appear = smooth((t - BEATS.titleIn) / 0.6), h = Math.max(0, t - BEATS.impact), exp = clamp(h / 0.22);
    const breath = Math.sin(Math.max(0, t - BEATS.titleReady) * 1.65) * 4;
    caption.style.opacity = appear;
    caption.style.transform = `translateY(${breath}px)`;
    caption.style.filter = "none";
    glyphs.forEach((el, i) => {
      const delay = i < 10 ? 0.12 + i * 6e-3 : 0.32 + Math.max(0, i - 11) * 0.012;
      const a = smooth((t - BEATS.titleIn - delay) / (0.6 - delay));
      const p = baseCenters[i], dx = p.x - 720, dy = p.y - 530, len = Math.hypot(dx, dy) || 1;
      const travel = exp * 2300;
      const enterX = (720 - p.x) * (1 - a) * 0.18, enterY = (i < 10 ? 34 : 23) * (1 - a);
      const tilt = scatter[i][2] * exp * 165;
      el.style.transform = `translate3d(${dx / len * travel + enterX}px,${dy / len * travel + enterY}px,${exp * 130}px) scale(${0.91 + 0.09 * a}) rotate(${tilt}deg)`;
      el.style.opacity = t >= BEATS.clear ? "0" : String(a);
    });
    const stop = t - 1.1, landing = stop >= 0 && stop < 0.18 ? Math.sin(stop * 100) * 2.5 * Math.exp(-stop * 30) : 0, hit = t >= BEATS.impact && h < 0.4 ? Math.exp(-h * 13) : 0;
    const sx = hit * Math.sin(h * 91) * 15, sy = landing + hit * Math.cos(h * 77) * 10;
    document.getElementById("front-scene").style.transform = `translate(${sx}px,${sy}px)`;
    document.getElementById("front-background").style.opacity = 1 - smooth((t - BEATS.body) / 0.22);
    document.getElementById("halo").style.opacity = clamp(t / 0.6) * (1 - smooth((t - BEATS.impact) / 0.3)) * 0.75;
    const ring = document.getElementById("shock-ring");
    ring.style.opacity = t >= BEATS.impact && h < 0.36 ? Math.sin(clamp(h / 0.36) * Math.PI) * 0.38 : 0;
    ring.style.transform = `scale(${1 + out(h / 0.36) * 7})`;
    document.getElementById("impact-glow").style.opacity = t >= BEATS.impact && h < 0.09 ? (1 - h / 0.09) * 0.19 : 0;
    document.getElementById("body-shell").style.opacity = smooth((t - BEATS.body) / 0.22);
    document.getElementById("front-scene").style.opacity = t >= BEATS.clear ? "0" : "1";
    document.querySelectorAll(".card *").forEach((el) => {
      if (t < 3.4 || t >= BEATS.impact) el.setAttribute("data-layout-ignore", "");
      else el.removeAttribute("data-layout-ignore");
    });
    window.__sceneState = { time: t, camera: cam, title, slotCenter, layout: "\u5927\u5B57\u53CC\u5C42", visibleCards: cardEls.filter((_, i) => toolPose(t, i).opacity > 0).length, phase: t < 1.25 ? "\u629B\u843D" : t < 2.7 ? "\u5FEB\u53D1\u4E0E\u62C9\u8FDC" : t < 3.4 ? "\u4E2D\u592E\u6807\u9898\u6491\u5F00\u5361\u9635" : t < 4.9 ? "\u60AC\u6D6E\u9605\u8BFB" : t < 5.55 ? "\u91CD\u51FB\u6563\u573A" : "\u6B63\u6587" };
  }
  window.drawEffect = render;
})();
