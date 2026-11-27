// 横拖版画卡片 · 夏夏的AI灵感 · MIT
(() => {
  // geometry.js
  var config = Object.assign({ "id": "card", "scene": ["card", "卡片 · 翻页指示器", "Card / Page indicator", 349, 27, 387, 433], "name": "横拖版画卡片", "view": [145, 158, 710, 486], "frames": [376, 467], "how": "在卡片上左右拖动翻页，也可点左右半边或按方向键。", "prompt": "把折光与涟漪两张程序版画放进同一个固定圆角窗口。向左横拖，前一张从左边退出，后一张贴着它从右边进入。下方中英文标题与图案同向滑动并受各自窗口裁剪。保留青柠色的折光线与桃粉色的涟漪轮廓。", "params": "版画窗口 620×255，标题行水平位移 615。片中从第 387 帧拖至 433 帧。独立卡片保留图案与标题。", "originalIndex": 3, "fps": 60, "start": 6.266666666666667, "end": 7.783333333333333, "speed": 1 }, window.effectSettings || {});
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
  var box = (x, y, w, h, r1, r2 = r1, r3 = r1, r4 = r1) => [x, y, w, h, r1, r2, r3, r4];
  function state(s, f) {
    const [id, , , start, , a, b, c, d] = s, q = phase(f, a, a + 17), press = pressure(f, a), second = b === void 0 ? 0 : phase(f, b, b + 15), hit = b === void 0 ? 0 : pressure(f, b);
    let palette = 0;
    let B, A, K, hand = [700, 447], artId = config.originalIndex > 3 ? 1 : 0, grid = 0, night = 0, thick = 0, spin = 0, flip = 0;
    switch (id) {
      case "card":
        B = box(169, 182, 662, 438, 56, 35, 80, 36);
        A = box(190, 201, 620, 255, 40);
        K = box(213 + phase(f, a, b) * 35, 568, 29, 8, 4);
        hand = [mix(673, 352, phase(f, a, b)), 372];
        flip = phase(f, a, b);
        break;
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
      case "card": {
        const travel = phase(f, a, b);
        cut(210, 470, 565, 83, 0, () => {
          for (let i = 0; i < 2; i++) {
            const xx = 219 + (i - travel) * 615;
            label(i ? "涟漪" : "折光", xx, 516, 52);
            meta(i ? "RIPPLE  /  PRINT 02" : "REFRACT  /  PRINT 01", xx + 146, 523, 15);
          }
        });
        break;
      }
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
    });
  }
  function shell(z) {
    rr(...z.B.slice(0, 4), z.B.slice(4), P.dark);
    plateDraw(z);
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
