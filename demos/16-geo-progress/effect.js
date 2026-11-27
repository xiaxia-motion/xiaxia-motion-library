// 导出进度条 · 夏夏的AI灵感 · MIT
(() => {
  // geometry.js
  var config = Object.assign({ "id": "progress", "scene": ["send", "按钮 · 进度条", "Button / Progress", 1749, 29, 1794, 1844], "name": "导出进度条", "view": [329, 333, 469, 110], "frames": [1789, 1885], "how": "点进度条或按回车重新跑一遍从开始到完成的进度。", "prompt": "在圆角容器内从左向右灌入粉紫色进度。起始显示导出 PNG，运行时显示正在导出和百分比，填满后显示已导出和勾号。填充和数字取自同一个进度值，圆角边缘始终裁剪干净。", "params": "填充从第 1797 帧开始到第 1844 帧结束，使用平滑缓动。独立视口只取按钮上的进度区域。", "originalIndex": 16, "fps": 60, "start": 29.816666666666666, "end": 31.416666666666668, "speed": 1 }, window.effectSettings || {});
  var live = null;
  var canvas = document.querySelector("canvas");
  var surface = document.createElement("canvas");
  surface.width = 1e3;
  surface.height = 750;
  var g = surface.getContext("2d", { alpha: false });
  var output = canvas.getContext("2d", { alpha: false });
  var P = { bg: "#faf4e9", ink: "#352339", dark: "#322438", light: "#fff6e5", mint: "#dae990", pink: "#f1a1b5", melon: "#ffab80", violet: "#bba4e9", sub: "#d5c5cf", mute: "#766375", sep: "#654e64", line: "#cdbfba" };
  var clamp = (n) => Math.max(0, Math.min(1, n));
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
  var box = (x, y, w, h, r1, r2 = r1, r3 = r1, r4 = r1) => [x, y, w, h, r1, r2, r3, r4];
  function state(s, f) {
    const [id, , , start, , a, b, c, d] = s, q = phase(f, a, a + 17), press = pressure(f, a), second = b === void 0 ? 0 : phase(f, b, b + 15), hit = b === void 0 ? 0 : pressure(f, b);
    let palette = 0;
    let B, A, K, hand = [700, 447], artId = config.originalIndex > 3 ? 1 : 0, grid = 0, night = 0, thick = 0, spin = 0, flip = 0;
    switch (id) {
      case "send": {
        const v = phase(f, a + 3, b);
        B = box(171, 303, 658, 164, 83, 53, 83, 43);
        A = box(198, 329, 112, 112, 44);
        K = box(340 + press * 3, 346 + press * 5, 445 - press * 6, 83 - press * 8, 42, 41, 41, 19);
        hand = [622, 389];
        grid = 1;
        night = 1;
        thick = 1;
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
      case "send": {
        const v = phase(f, a + 3, b);
        cut(kx, ky, K[2], K[3], K.slice(4), () => {
          if (v > 0) rr(kx, ky, K[2] * v, K[3], 0, P.violet);
          const text = f < a ? "导出 PNG" : f < b ? "正在导出" : "已导出";
          label(text, 402, ky + 42, 34, P.ink);
          if (v >= 1) icon("tick", 733, ky + 42, 31, P.ink);
          else if (v > 0) tx(Math.round(v * 100) + "%", 749, ky + 42, 23, P.ink, 600, "right", "mono");
          else icon("save", 733, ky + 41, 29, P.ink);
        });
        break;
      }
    }
  }
  function shell(z) {
    rr(...z.B.slice(0, 4), z.B.slice(4), P.dark);
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
