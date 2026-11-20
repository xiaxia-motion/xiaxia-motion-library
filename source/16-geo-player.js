// 三瓣唱片播放器 · 夏夏的AI灵感 · MIT
(() => {
  // geometry.js
  var config = Object.assign({ "id": "player", "scene": ["player", "音乐播放器", "Music player", 467, 29, 508, 547, 578, 618], "name": "三瓣唱片播放器", "view": [82, 177, 836, 405], "frames": [496, 652], "how": "点播放或暂停，再点左右弯箭头快退、快进 5 秒。空格控制播放，左右键跳转。", "prompt": "画一张带同心刻纹和三瓣桃粉色圆心的黑胶唱片，右边写涟漪。点播放让唱片转动，24 根细频谱柱跟随 8 个频段起伏。演示快进五秒、快退五秒和暂停，时间、进度线与播放图标同步。", "params": "原片从第 12 秒读数起步，旋转速率每秒 3.5 弧度。频谱使用原片已存的数值采样，独立示例静音。", "originalIndex": 4, "fps": 60, "start": 8.266666666666667, "end": 10.866666666666667, "speed": 1 }, window.effectSettings || {});
  var live = null;
  var canvas = document.querySelector("canvas");
  var surface = document.createElement("canvas");
  surface.width = 1e3;
  surface.height = 750;
  var g = surface.getContext("2d", { alpha: false });
  var output = canvas.getContext("2d", { alpha: false });
  var P = { bg: "#faf4e9", ink: "#352339", dark: "#322438", light: "#fff6e5", mint: "#dae990", pink: "#f1a1b5", melon: "#ffab80", violet: "#bba4e9", sub: "#d5c5cf", mute: "#766375", sep: "#654e64", line: "#cdbfba" };
  var clamp = (n) => Math.max(0, Math.min(1, n));
  var mix = (a, b, v) => a + (b - a) * v;
  function smooth(x) {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  }
  function phase(f, a, b) {
    return smooth((f - a) / (b - a));
  }
  function pressure(f, a) {
    return phase(f, a - 5, a) - phase(f, a + 2, a + 11);
  }
  function placed(x, y, sx, sy, fn) {
    if (Math.abs(sx * sy) < 1e-5) return;
    g.save();
    g.translate(x, y);
    g.scale(sx, sy);
    fn();
    g.restore();
  }
  function rr(x, y, w, h, r, fill) {
    if (w <= 0 || h <= 0) return;
    g.beginPath();
    g.roundRect(x, y, w, h, r);
    g.fillStyle = fill;
    g.fill();
  }
  function circle(x, y, r, c) {
    if (r <= 0) return;
    g.beginPath();
    g.arc(x, y, r, 0, 2 * Math.PI);
    g.fillStyle = c;
    g.fill();
  }
  function stroke(points, c, w = 2, closed = false) {
    if (points.length < 2) return;
    g.beginPath();
    points.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y));
    if (closed) g.closePath();
    g.strokeStyle = c;
    g.lineWidth = w;
    g.stroke();
  }
  function poly(points, c) {
    g.beginPath();
    points.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y));
    g.closePath();
    g.fillStyle = c;
    g.fill();
  }
  function tx(s, x, y, n, c = P.light, b = 620, align = "left", font = "ui") {
    g.font = b + " " + n + "px " + (font === "mono" ? '"Menlo","Hiragino Sans GB",monospace' : font === "display" ? '"Avenir Next","Hiragino Sans GB",sans-serif' : '"Helvetica Neue","Hiragino Sans GB",sans-serif');
    g.textAlign = align;
    g.textBaseline = "middle";
    g.fillStyle = c;
    g.fillText(s, x, y);
  }
  function cut(x, y, w, h, r, fn) {
    if (w <= 0 || h <= 0) return;
    g.save();
    g.beginPath();
    g.roundRect(x, y, w, h, r);
    g.clip();
    fn();
    g.restore();
  }
  function tick(x, y, s, c) {
    stroke([[x - s * 0.48, y], [x - s * 0.12, y + s * 0.33], [x + s * 0.48, y - s * 0.36]], c, s * 0.14);
  }
  function icon(k, x, y, s, c) {
    placed(x, y, s / 24, s / 24, () => {
      if (k === "more") {
        for (let i = -1; i <= 1; i++) circle(7 * i, 0, 2, c);
      }
      if (k === "bars") {
        [-6, 0, 6].forEach((yy, i) => stroke([[-9, yy], [i === 2 ? 3 : 9, yy]], c, 2.4));
      }
      if (k === "arrow" || k === "out") {
        g.save();
        if (k === "out") g.rotate(-Math.PI / 4);
        stroke([[-9, 0], [8, 0], [2, -6]], c, 2.3);
        stroke([[8, 0], [2, 6]], c, 2.3);
        g.restore();
      }
      if (k === "down") stroke([[-7, -3], [0, 4], [7, -3]], c, 2.5);
      if (k === "tick") tick(0, 0, 18, c);
      if (k === "grid") {
        for (let i = 0; i < 4; i++) rr(-9 + i % 2 * 10, -9 + Math.floor(i / 2) * 10, 8, 8, 2, c);
      }
      if (k === "pen") {
        stroke([[-8, 8], [-6, 1], [4, -9], [10, -3], [0, 7], [-8, 8]], c, 2);
        stroke([[1, -6], [7, 0]], c, 2);
      }
      if (k === "copy") {
        rr(-8, -8, 12, 14, 2, c);
        rr(-3, -3, 11, 13, 2, P.dark);
        stroke([[-3, -3], [8, -3], [8, 10], [-3, 10], [-3, -3]], c, 2);
      }
      if (k === "save") {
        stroke([[0, -10], [0, 4], [-5, -1]], c, 2);
        stroke([[0, 4], [5, -1]], c, 2);
        stroke([[-9, 3], [-9, 9], [9, 9], [9, 3]], c, 2);
      }
      if (k === "heart") {
        g.beginPath();
        g.moveTo(0, 9);
        g.bezierCurveTo(-18, -3, -8, -14, 0, -6);
        g.bezierCurveTo(8, -14, 18, -3, 0, 9);
        g.fillStyle = c;
        g.fill();
      }
    });
  }
  function printPlate(x, y, w, h, r, id = 0, spin = 0, grid = 0, night = 0, weight = 0, palette = 0) {
    if (w < 1 || h < 1) return;
    cut(x, y, w, h, r, () => {
      const base = [P.mint, P.pink, P.violet][id], ink = P.ink, mid = [P.melon, P.melon, P.mint][id];
      rr(x, y, w, h, 0, base);
      const m = Math.min(w, h), cx = x + w * 0.5, cy = y + h * 0.5;
      function art(dark, paper = base) {
        const pen = dark ? paper : ink, accent = dark ? P.pink : mid;
        rr(x, y, w, h, 0, dark ? P.ink : paper);
        placed(cx, cy, m, m, () => {
          g.rotate(spin);
          if (id === 0) {
            for (let j = 0; j < 15; j++) {
              let k = j / 15, a = -1.15 + k * 2.63;
              g.save();
              g.rotate(a);
              g.beginPath();
              g.ellipse(0.052, 0, 0.332, 0.091 + k * 0.026, 0, 0, Math.PI * 2);
              g.lineWidth = 0.011 + weight * 9e-3;
              g.strokeStyle = pen;
              g.stroke();
              g.restore();
            }
            circle(0.04, 0.012, 0.056, accent);
          }
          if (id === 1) {
            for (let j = 0; j < 15; j++) {
              const k = j / 14;
              g.beginPath();
              for (let i = 0; i <= 126; i++) {
                const a = i * Math.PI / 63, rad = 0.29 + 0.073 * Math.sin(3 * a + 0.44) - k * 0.217 + 0.017 * Math.sin(a * 6 + k * 2);
                const px = Math.cos(a) * rad * 1.18 + 0.11 * (k - 0.46), py = Math.sin(a) * rad * 1.08 - 0.085 * (k - 0.4);
                if (!i) g.moveTo(px, py);
                else g.lineTo(px, py);
              }
              g.closePath();
              g.lineWidth = 85e-4 + weight * 7e-3;
              g.strokeStyle = pen;
              g.stroke();
            }
            circle(0.11, -0.065, 0.031, accent);
          }
          if (id === 2) {
            for (let j = 0; j < 14; j++) {
              const v = j / 14;
              g.save();
              g.rotate(-0.54 + v * 1.1);
              g.beginPath();
              g.roundRect(-0.291 + v * 0.16, -0.291 + v * 0.16, 0.582 - v * 0.32, 0.582 - v * 0.32, 0.055);
              g.strokeStyle = pen;
              g.lineWidth = 0.011;
              g.stroke();
              g.restore();
            }
          }
        });
        if (m > 125) {
          const o = m * 0.067, sz = Math.min(10, m * 0.045);
          tx("FA / 0" + (id + 1), x + o, y + o + 2, sz, pen, 550, "left", "mono");
          stroke([[x + w - o - 6, y + h - o], [x + w - o + 2, y + h - o]], pen, 1.3);
          stroke([[x + w - o - 2, y + h - o - 4], [x + w - o - 2, y + h - o + 4]], pen, 1.3);
        }
      }
      art(false);
      if (palette > 0) cut(x, y, w * palette, h, 0, () => art(false, P.violet));
      if (night > 0) cut(x + w * (1 - night), y, w * night, h, 0, () => art(true, palette > 0.99 ? P.violet : base));
      if (grid > 0) cut(x, y, w * grid, h, 0, () => {
        for (let n = 1; n < 4; n++) {
          let a = x + w * n / 4, b = y + h * n / 4;
          stroke([[a, y + 5], [a, y + h - 5]], night ? P.violet : "#9d617c", 0.85);
          stroke([[x + 5, b], [x + w - 5, b]], night ? P.violet : "#9d617c", 0.85);
        }
      });
    });
  }
  var musicEnergy = window.geometryBands;
  function handPath(f, keys) {
    if (f <= keys[0][0]) return keys[0].slice(1);
    for (let i = 1; i < keys.length; i++) {
      const before = keys[i - 1], after = keys[i];
      if (f <= after[0]) {
        const v = phase(f, before[0], after[0]);
        return [mix(before[1], after[1], v), mix(before[2], after[2], v)];
      }
    }
    return keys.at(-1).slice(1);
  }
  function targets(f, keys) {
    return handPath(f, keys.flatMap(([t, x, y]) => [[t - 4, x, y], [t + 4, x, y]]));
  }
  function pressedSymbol(symbol, x, y, s, c) {
    placed(x, y, s / 24, s / 24, () => {
      if (symbol === "play") {
        poly([[-6, -10], [10, 0], [-6, 10]], c);
        return;
      }
      if (symbol === "pause") {
        rr(-7, -9, 5, 18, 2, c);
        rr(2, -9, 5, 18, 2, c);
        return;
      }
      if (symbol === "restart") {
        g.beginPath();
        g.arc(0, 1, 8, -2.82, 2.3);
        g.lineWidth = 2.3;
        g.strokeStyle = c;
        g.stroke();
        poly([[-11, -9], [-11, 0], [-3, -3]], c);
        return;
      }
      if (symbol === "plus" || symbol === "minus") {
        stroke([[-8, 0], [8, 0]], c, 2.7);
        if (symbol === "plus") stroke([[0, -8], [0, 8]], c, 2.7);
        return;
      }
      if (symbol === "back" || symbol === "forward") {
        g.save();
        if (symbol === "back") g.scale(-1, 1);
        g.beginPath();
        g.arc(0, 1, 9, -1.8, 2.4);
        g.lineWidth = 2;
        g.strokeStyle = c;
        g.stroke();
        poly([[0, -12], [8, -8], [1, -4]], c);
        g.restore();
        tx("5", 0, 2, 10, c, 700, "center", "mono");
        return;
      }
      if (symbol === "compass") {
        g.beginPath();
        g.arc(0, 0, 9, 0, Math.PI * 2);
        g.strokeStyle = c;
        g.lineWidth = 2;
        g.stroke();
        poly([[5, -5], [2, 2], [-5, 5], [-2, -2]], c);
        return;
      }
      icon(symbol, 0, 0, 24, c);
    });
  }
  function keyFace(x, y, w, h, r, p, top, fn) {
    const depth = 5, drop = 4 * p;
    rr(x, y + depth, w, h, r, "#251a29");
    rr(x, y + drop, w, h - 1.3 * p, r, top);
    fn(x + w / 2, y + h / 2 + drop);
  }
  function angleArc(x, y, r, from, to, col, w) {
    if (r <= 0 || to <= from) return;
    g.beginPath();
    g.arc(x, y, r, from, to);
    g.strokeStyle = col;
    g.lineWidth = w;
    g.stroke();
  }
  function transport(s, f) {
    if (live) return { running: live.rotation, playing: live.playing, elapsed: live.elapsed, hand: [610, 461] };
    const [play, advance, back, pause] = s.slice(5);
    const running = Math.max(0, Math.min(f, pause) - play) / 60;
    return { running, playing: f >= play && f < pause, elapsed: 12 + running + 5 * phase(f, advance, advance + 9) - 5 * phase(f, back, back + 9), hand: targets(f, [[play, 610, 461], [advance, 733, 461], [back, 488, 461], [pause, 610, 461]]) };
  }
  function recordFace(x, y, w, h, z) {
    const r = Math.min(w, h) * 0.496;
    placed(x + w / 2, y + h / 2, z.disc, z.disc, () => {
      circle(0, 0, r, "#201b25");
      for (let i = 0; i < 12; i++) angleArc(0, 0, r * (0.41 + i * 0.047), 0, Math.PI * 2, i % 3 ? "#493442" : "#65505e", Math.max(0.5, r * 9e-3));
      for (const phi of [-1.07, 2.07]) {
        for (let j = 0; j < 10; j++) angleArc(0, 0, r * (0.46 + j * 0.047), phi, phi + 0.36, "#946f83", Math.max(0.5, r * 0.012));
      }
      g.save();
      g.rotate(z.spin);
      circle(0, 0, r * 0.38, P.pink);
      for (let j = 0; j < 3; j++) {
        g.rotate(2 * Math.PI / 3);
        g.beginPath();
        g.ellipse(r * 0.13, 0, r * 0.17, r * 0.068, -0.52, 0, Math.PI * 2);
        g.fillStyle = P.ink;
        g.fill();
      }
      circle(0, 0, r * 0.05, P.light);
      circle(0, 0, r * 0.024, P.ink);
      g.restore();
    });
  }
  function playerPicture(s, f) {
    const [play, advance, back, pause] = s.slice(5), track = transport(s, f);
    tx("涟漪", 424, 263, 55, P.light, 800);
    tx("RIPPLE    /    02", 426, 311, 17, P.sub, 650, "left", "mono");
    const row = musicEnergy[Math.min(musicEnergy.length - 1, Math.max(0, Math.round(track.elapsed * 60)))];
    for (let i = 0; i < 24; i++) {
      const v = row[i % 8] / 255, stable = 5 + 3 * Math.cos(i * 0.7), amt = live ? Number(live.playing) : phase(f, play, play + 8) * (1 - phase(f, pause, pause + 9));
      const ht = mix(stable, 7 + 32 * v * (0.68 + 0.32 * Math.sin(i * 0.7 + f * 0.14)), amt);
      rr(429 + i * 13, 365 - ht / 2, 7, ht, 4, i < 12 ? P.mint : P.violet);
    }
    rr(424, 399, 355, 5, 3, P.sep);
    rr(424, 399, 355 * track.elapsed / 28.6, 5, 3, P.pink);
    circle(424 + 355 * track.elapsed / 28.6, 401, 5, P.pink);
    for (const [x, at, label] of [[488, back, "back"], [733, advance, "forward"]]) keyFace(x - 31, 434, 62, 53, 24, pressure(f, at), "#59415c", (cx, cy) => pressedSymbol(label, cx, cy, 27, P.light));
    const k = Math.max(pressure(f, play), pressure(f, pause));
    pressedSymbol(track.playing ? "pause" : "play", 610, 461 + 3 * k, 30, P.ink);
    tx("0:" + Math.floor(track.elapsed).toString().padStart(2, "0") + "  /  0:28", 424, 514, 16, P.sub, 600, "left", "mono");
  }
  var box = (x, y, w, h, r1, r2 = r1, r3 = r1, r4 = r1) => [x, y, w, h, r1, r2, r3, r4];
  function state(s, f) {
    const [id, , , start, , a, b, c, d] = s, q = phase(f, a, a + 17), press = pressure(f, a), second = b === void 0 ? 0 : phase(f, b, b + 15), hit = b === void 0 ? 0 : pressure(f, b);
    let palette = 0;
    let B, A, K, hand = [700, 447], artId = config.originalIndex > 3 ? 1 : 0, grid = 0, night = 0, thick = 0, spin = 0, flip = 0;
    switch (id) {
      case "player": {
        const t = transport(s, f), dep = Math.max(pressure(f, a), pressure(f, d));
        B = box(106, 201, 788, 355, 48, 86, 45, 30);
        A = box(130, 249, 251, 251, 126);
        K = box(555 + 2 * dep, 428 + 4 * dep, 110 - 4 * dep, 65 - 3 * dep, 30);
        hand = t.hand;
        spin = t.running * 3.5;
        break;
      }
    }
    palette = id === "select" ? phase(f, d, d + 12) : config.originalIndex > 9 ? 1 : 0;
    return { B, A, K, hand, palette, artId, disc: id === "player" ? 1 : 0, dial: id === "timer" ? 1 : 0, clock: 0, grid, night, thick, spin, flip, q, press, second, hit };
  }
  function inside(s, f, z) {
    const [id, , , start, , a, b, c, d] = s, { B, A, K, q, press, second } = z;
    const [x, y, w, h] = B, ky = K[1], kx = K[0];
    const label = (s2, x2, y2, n = 29, col = P.light, wt = 670, align = "left") => tx(s2, x2, y2, n, col, wt, align);
    const meta = (s2, x2, y2, n = 14, col = P.sub) => tx(s2, x2, y2, n, col, 580, "left", "mono");
    function radio(x2, y2, sel, base) {
      circle(x2, y2, 12, base);
      circle(x2, y2, 9, sel ? P.mint : P.dark);
      if (sel) circle(x2, y2, 5, P.ink);
    }
    switch (id) {
      case "player":
        playerPicture(s, f);
        break;
    }
  }
  function plateDraw(z) {
    const [x, y, w, h, r] = z.A;
    cut(x, y, w, h, r, () => {
      if (z.flip > 0 && z.flip < 1) {
        const dx = w * z.flip;
        printPlate(x - dx, y, w, h, 0, 0);
        printPlate(x + w - dx, y, w, h, 0, 1);
      } else printPlate(x, y, w, h, 0, z.flip === 1 ? 1 : z.artId, z.spin, z.grid, z.night, z.thick, z.palette);
      if (z.disc > 0) recordFace(x, y, w, h, z);
    });
  }
  function shell(z) {
    rr(...z.B.slice(0, 4), z.B.slice(4), P.dark);
    plateDraw(z);
    rr(...z.K.slice(0, 4), z.K.slice(4), P.mint);
  }
  function pointer(pt, p, sz) {
    if (sz < 8e-3) return;
    placed(pt[0], pt[1], sz * (1 - 0.14 * p), sz * (1 - 0.14 * p), () => {
      const coords = [[0, 0], [5, 31], [12, 22], [20, 32], [25, 29], [18, 18], [29, 16]];
      poly(coords, P.light);
      stroke(coords, P.ink, 2, true);
    });
  }
  function drawScene(frame, input = null) {
    live = input;
    const s = config.scene;
    const [x, y, w, h] = config.view;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.lineCap = "round";
    g.lineJoin = "round";
    rr(0, 0, 1e3, 750, 0, P.bg);
    const z = state(s, frame);
    shell(z);
    inside(s, frame, z);
    if (!input) drawPointer(s, z, frame);
    output.drawImage(surface, x, y, w, h, 0, 0, canvas.width, canvas.height);
  }
  function drawPointer(s, z, frame) {
    const id = s[0], skip = id === "graph" ? [2] : ["slider", "card", "send"].includes(id) ? [1] : [];
    let push = Math.max(0, ...s.slice(5).map((at, i) => skip.includes(i) ? 0 : pressure(frame, at)));
    if (["card", "slider", "graph"].includes(id)) {
      const k = id === "graph" ? 6 : 5;
      push = Math.max(push, 0.7 * (phase(frame, s[k] - 4, s[k]) - phase(frame, s[k + 1], s[k + 1] + 6)));
    }
    const handSize = phase(frame, 98, 113) * (1 - phase(frame, 1885 - 11, 1885));
    pointer(z.hand, push, handSize);
  }
  window.geometryScene = { config, draw: drawScene };
  window.drawEffect = (seconds) => drawScene(Math.round(seconds * config.fps));
})();
