// 翻页指示器 · 夏夏的AI灵感 · MIT
(() => {
  // geometry.js
  var config = Object.assign({ "id": "pager", "scene": ["card", "卡片 · 翻页指示器", "Card / Page indicator", 349, 27, 387, 433], "name": "翻页指示器", "view": [193, 545, 600, 54], "frames": [376, 467], "how": "点第一、第二页的位置，或横拖和按左右键，查看指示器移动。", "prompt": "把翻页位置做成青柠色短胶囊与三个页位，右侧显示 01 / 03。片中第一张翻到第二张时，胶囊平移一个页距，空闲页呈小圆点，过半后页码改为 02 / 03。提取卡片底部这一条作为能独立运行的指示器。", "params": "胶囊 29×8，页距 35，小圆点半径 4，原片横拖共 46 帧。保留三页标记，演示原片实际操作的前两页。", "originalIndex": 3, "fps": 60, "start": 6.266666666666667, "end": 7.783333333333333, "speed": 1 }, window.effectSettings || {});
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
        for (let i = 0; i < 3; i++) {
          if (Math.abs(i - travel) > 0.51) circle(227 + i * 35, 572, 4, P.sub);
        }
        meta("0" + (travel > 0.5 ? 2 : 1) + " / 03", 703, 571, 14);
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
