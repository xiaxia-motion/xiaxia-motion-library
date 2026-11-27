// 四种应用页面同屏展开 · 夏夏的AI灵感
var NeoEffect = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  var component_entry_exports = {};
  __export(component_entry_exports, {
    draw: () => draw,
    ready: () => ready
  });

  // native.js
  var SCALE = 1;
  var sizes = /* @__PURE__ */ new WeakMap();
  function mark(canvas, w, h) {
    sizes.set(canvas, { w, h, sx: canvas.width / w, sy: canvas.height / h });
    return canvas;
  }
  function baseScale(canvas) {
    return sizes.get(canvas)?.sx || 1;
  }
  var prepared = /* @__PURE__ */ new WeakSet();
  function scaleEffects(ctx) {
    if (prepared.has(ctx)) return;
    prepared.add(ctx);
    for (const name of ["shadowBlur", "shadowOffsetX", "shadowOffsetY", "filter"]) {
      const native = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, name);
      if (!native?.set) continue;
      Object.defineProperty(ctx, name, {
        configurable: true,
        get() {
          const value = native.get.call(this);
          return name === "filter" ? value : value / baseScale(this.canvas);
        },
        set(value) {
          const k = baseScale(this.canvas);
          native.set.call(this, name === "filter" ? String(value).replace(/blur\(\s*([\d.]+)px\s*\)/g, (_, n) => "blur(" + Number(n) * k + "px)") : value * k);
        }
      });
    }
  }
  function context(canvas, options) {
    const ctx = canvas.getContext("2d", options);
    const size = sizes.get(canvas);
    if (!size) throw new Error("尚未登记画布逻辑尺寸");
    ctx.setTransform(size.sx, 0, 0, size.sy, 0, 0);
    scaleEffects(ctx);
    return ctx;
  }
  function sheet(w, h, options, ratio = SCALE) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(w * ratio));
    canvas.height = Math.max(1, Math.round(h * ratio));
    mark(canvas, w, h);
    context(canvas, options);
    return canvas;
  }
  function blit(ctx, image, ...a) {
    const size = sizes.get(image);
    if (!size) {
      ctx.drawImage(image, ...a);
      return;
    }
    if (a.length === 2) {
      ctx.drawImage(image, a[0], a[1], size.w, size.h);
      return;
    }
    if (a.length === 8) {
      ctx.drawImage(image, a[0] * size.sx, a[1] * size.sy, a[2] * size.sx, a[3] * size.sy, ...a.slice(4));
      return;
    }
    ctx.drawImage(image, ...a);
  }

  // drawing/第三轮对白时钟.json
  var __default = [
    [
      82.7,
      82.7,
      1
    ],
    [
      88.55,
      88.55,
      1
    ],
    [
      89.44,
      89.44,
      1.233409787406278
    ],
    [
      91.12,
      92.345,
      1.1987166922846912
    ],
    [
      91.69,
      92.905,
      0.991229468984208
    ],
    [
      92.23,
      93.445,
      1.0090107737512142
    ],
    [
      93.22,
      94.455,
      0.9043810492984494
    ],
    [
      95.15,
      95.985,
      1.210945308782989
    ],
    [
      95.9,
      97.48,
      1.6090464744882371
    ],
    [
      96.95,
      98.87,
      1.3454706885029266
    ],
    [
      98.01,
      100.32,
      1.5619950447053694
    ],
    [
      98.95,
      102.02,
      1.4405628208042738
    ],
    [
      100.28,
      103.58,
      1.2218227783761597
    ],
    [
      101.21,
      104.76,
      1.3713816804333325
    ],
    [
      102.6,
      106.86,
      1.3590189476910612
    ],
    [
      104.32,
      108.97,
      1.244099154035843
    ],
    [
      106.78,
      112.08,
      1.1672555553070838
    ],
    [
      107.74,
      113.14,
      1.0956097881413889
    ],
    [
      109.7,
      115.26666666666667,
      0.36359143400699234
    ],
    [
      111.83,
      115.72666666666666,
      0.32182306999060634
    ],
    [
      113.39,
      116.62666666666667,
      0.6390193390310058
    ],
    [
      114.37,
      117.31666666666666,
      1.0187941413471087
    ],
    [
      115.17,
      118.71666666666667,
      1.7859619919545011
    ],
    [
      115.4,
      119.13333333333334,
      1.825348248205978
    ]
  ];

  // drawing/voiceClock.js
  function secondRoundTime(t) {
    const first2 = __default[0], last = __default[__default.length - 1];
    if (t <= first2[0]) return t;
    if (t >= last[0]) return last[1] + t - last[0];
    const i = __default.findIndex((r) => r[0] > t), a = __default[i - 1], b = __default[i];
    const span = b[0] - a[0], u = (t - a[0]) / span, v = 1 - u;
    return v * v * (1 + 2 * u) * a[1] + u * v * v * span * a[2] + u * u * (3 - 2 * u) * b[1] - u * u * v * span * b[2];
  }

  // drawing/配音与应用镜头.json
  var __default2 = [
    [
      82.7,
      82.7,
      0.538148097395925
    ],
    [
      83.07,
      82.92,
      0.7129556059883226
    ],
    [
      85.83,
      85.879,
      1.255088842393183
    ],
    [
      86.75,
      87.194,
      1.3311105820586417
    ],
    [
      87.97,
      88.704,
      1.403417920136064
    ],
    [
      88.55,
      89.614,
      1.5550467239759864
    ],
    [
      89.44,
      90.984,
      1.0376253741230301
    ],
    [
      92.345,
      93.04,
      0.8859493713749156
    ],
    [
      92.905,
      93.63,
      1.1858237745811953
    ],
    [
      93.445,
      94.361,
      1.4480362128884054
    ],
    [
      94.455,
      95.96,
      1.4524217484998685
    ],
    [
      95.985,
      97.99,
      0.8495562910096143
    ],
    [
      97.48,
      98.926,
      0.7297826646521813
    ],
    [
      98.87,
      100.136,
      0.8572108795041539
    ],
    [
      100.32,
      101.36,
      0.7461001158495895
    ],
    [
      102.02,
      102.49,
      0.8019364033121185
    ],
    [
      103.58,
      104.055,
      1.0279993206855074
    ],
    [
      104.76,
      105.296,
      0.8579133071502135
    ],
    [
      106.86,
      106.77,
      0.8452365248284687
    ],
    [
      108.97,
      109.012,
      1.0532015225284324
    ],
    [
      112.08,
      112.255,
      1.0342994398887906
    ],
    [
      113.14,
      113.345,
      0.9608547854830864
    ],
    [
      115.013,
      115.013,
      0.956156627435184
    ],
    [
      115.26666666666667,
      115.26666666666667,
      1.013055095759405
    ]
  ];

  // drawing/base.js
  var W = 1440;
  var H = 1080;
  var ink = "#202021";
  var paper = "#f8f4ea";
  var fontCN = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
  var latin = '"Helvetica Neue",Arial,sans-serif';
  var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  var mix = (a, b, p) => a + (b - a) * p;
  var lin = (t, a, b) => clamp((t - a) / (b - a));
  var smooth = (q) => q * q * (3 - 2 * q);
  var step = (t, a, b) => smooth(lin(t, a, b));
  function rgb(a, b, k) {
    if (k <= 0) return a;
    if (k >= 1) return b;
    const va = parseInt(a.slice(1), 16), vb = parseInt(b.slice(1), 16);
    return "rgb(" + [16, 8, 0].map((s) => Math.round(mix(va >> s & 255, vb >> s & 255, k))).join(",") + ")";
  }
  function rect(c, x, y, w, h, color, stroke = null, lw = 3) {
    if (w <= 0 || h <= 0) return;
    if (color) {
      c.fillStyle = color;
      c.fillRect(x, y, w, h);
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = lw;
      c.strokeRect(x, y, w, h);
    }
  }
  function rule(c, x1, y1, x2, y2, color = ink, lw = 3) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineWidth = lw;
    c.strokeStyle = color;
    c.stroke();
  }
  function circle(c, x, y, r, color, stroke = null, lw = 3) {
    if (r <= 0) return;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    if (color) {
      c.fillStyle = color;
      c.fill();
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = lw;
      c.stroke();
    }
  }
  function txt(c, str, x, y, size, opt = {}) {
    if (!str || size <= 1) return;
    const { color = ink, weight = 600, align = "left", font = fontCN, max, base = "middle" } = opt;
    c.save();
    c.fillStyle = color;
    c.textAlign = align;
    c.textBaseline = base;
    c.font = weight + " " + size + "px " + font;
    if (max && c.measureText(str).width > max) {
      let s = max / c.measureText(str).width;
      c.translate(x, y);
      c.scale(s, 1);
      c.fillText(str, 0, 0);
    } else c.fillText(str, x, y);
    c.restore();
  }
  function group(c, fn) {
    c.save();
    fn();
    c.restore();
  }
  function clip(c, x, y, w, h, fn) {
    group(c, () => {
      c.beginPath();
      c.rect(x, y, w, h);
      c.clip();
      fn();
    });
  }
  function cover(c, im, x, y, w, h, fx = 0.5, fy = 0.5) {
    if (!im || w <= 0 || h <= 0) return;
    const scale = Math.max(w / im.width, h / im.height), sw = w / scale, sh = h / scale;
    blit(c, im, (im.width - sw) * fx, (im.height - sh) * fy, sw, sh, x, y, w, h);
  }
  function arrow(c, x, y, size, opt = {}) {
    const { color = ink, angle = -Math.PI / 4, width = 0.105 } = opt;
    group(c, () => {
      c.translate(x, y);
      c.rotate(angle);
      c.lineWidth = size * width;
      c.lineCap = "square";
      c.lineJoin = "miter";
      c.strokeStyle = color;
      c.beginPath();
      c.moveTo(-size * 0.47, 0);
      c.lineTo(size * 0.42, 0);
      c.moveTo(size * 0.05, -size * 0.36);
      c.lineTo(size * 0.42, 0);
      c.lineTo(size * 0.05, size * 0.36);
      c.stroke();
    });
  }

  // drawing/photos.js
  var pictures = {};
  async function loadPhotos() {
    await Promise.all(Object.entries(window.NEO_MEDIA || {}).map(([id, url]) => new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => {
        pictures[id] = im;
        resolve();
      };
      im.onerror = () => reject(Error("图片无法读取 " + id));
      im.src = url;
    })));
  }

  // drawing/festival.js
  var F = { ink: "#171916", bone: "#fff9eb", acid: "#e1fa41", cobalt: "#293ee3", coral: "#ff7355", muted: "#585b51", dark: "#101915", cream: "#fbf7e8", num: '"DIN Condensed","Arial Narrow","Helvetica Neue",sans-serif' };
  var acts = [
    { id: "sat1", day: "周六", artist: "沿河声场", time: "16:00", end: "16:45", stage: "草地舞台" },
    { id: "sat2", day: "周六", artist: "南线来信", time: "18:10", end: "18:55", stage: "仓库舞台" },
    { id: "sat3", day: "周六", artist: "夏夜列车", time: "20:00", end: "20:55", stage: "主舞台" },
    { id: "sun1", day: "周日", artist: "折线乐队", time: "15:45", end: "16:25", stage: "草地舞台" },
    { id: "sun2", day: "周日", artist: "北岸白噪", time: "17:30", end: "18:15", stage: "仓库舞台" },
    { id: "sun3", day: "周日", artist: "折线乐队", time: "20:30", end: "21:25", stage: "主舞台" }
  ];
  var featured = acts[5];
  var prior = acts[4];
  function heavy(c, s, x, y, size, max, opt = {}) {
    txt(c, s, x, y, size, { weight: 900, max, ...opt });
  }
  function tick(c, x, y, w, fg = F.ink) {
    c.beginPath();
    c.moveTo(x - w * 0.46, y);
    c.lineTo(x - w * 0.11, y + w * 0.34);
    c.lineTo(x + w * 0.45, y - w * 0.35);
    c.lineWidth = w * 0.15;
    c.strokeStyle = fg;
    c.stroke();
  }
  function star(c, x, y, r, fill = F.acid) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, k = i % 2 ? r * 0.46 : r;
      pts.push([x + Math.cos(a) * k, y + Math.sin(a) * k]);
    }
    c.beginPath();
    pts.forEach(([a, b], i) => i ? c.lineTo(a, b) : c.moveTo(a, b));
    c.closePath();
    c.fillStyle = fill;
    c.fill();
    c.strokeStyle = F.ink;
    c.lineWidth = 3;
    c.stroke();
  }
  function shell(c, x, y, w, h, col = F.bone, depth = 13, lw = 6) {
    rect(c, x + depth, y + depth, w, h, F.ink);
    rect(c, x, y, w, h, col, F.ink, lw);
  }

  // drawing/press.js
  var lerpRect = (a, b, k) => a.map((v, i) => mix(v, b[i], k));

  // drawing/space.js
  var rad = Math.PI / 180;

  // drawing/colorFlow.js
  var tableBox = [178, 169, 1082, 580];
  var ink2 = "#191a17";
  var previewHit = 2069 / 30;
  var yellowHit = 2092 / 30;
  var cyanHit = 2123 / 30;
  var rows = [["边框", "2–4 px", "纯黑"], ["投影偏移", "4–8 px", "向右下"], ["投影模糊", "0 px", "硬边"], ["填色", "纯色", "无渐变"]];
  function tableWords(c, r, visibility) {
    if (visibility <= 0) return;
    const [x, y, w, h] = r, head = h * 0.16, rh = (h - head) / 4, cols = [0, 0.37, 0.66, 1];
    const line2 = (caption, px, py, size, options) => group(c, () => {
      c.translate(px, py);
      c.scale(1, visibility);
      txt(c, caption, 0, 0, size, options);
    });
    cols.slice(0, 3).forEach((k, j) => line2(["属性", "示例取值", "外观"][j], x + w * k + 25, y + head * 0.51, Math.min(42, head * 0.51), { color: F.bone, weight: 800 }));
    rows.forEach((row, i) => {
      const top = y + head + i * rh;
      rule(c, x, top, x + w, top, ink2, 3 * visibility);
      row.forEach((val, j) => line2(val, x + w * cols[j] + 25, top + rh * 0.5, Math.min(j === 1 ? 53 : 43, rh * 0.48), { weight: j === 1 ? 800 : 650 }));
    });
    for (const v of cols.slice(1, -1)) rule(c, x + w * v, y + head, x + w * v, y + h, ink2, 4 * visibility);
  }
  function paramTable(c, r, opening, rowPosition) {
    const [x, y, w, h] = r, head = h * 0.16, rh = (h - head) / 4;
    rect(c, x + 12, y + 13, w, h, ink2);
    rect(c, x, y, w, h, F.bone, ink2, 5);
    rect(c, x, y, w, head, ink2);
    clip(c, x + 3, y + head, w - 6, h - head, () => rect(c, x + 3, y + head + rh * rowPosition + 1, w - 6, rh - 2, "#fff1a0"));
    tableWords(c, r, opening);
  }

  // drawing/applicationPages.js
  var night = "#18281e";
  var lime = "#c9ee72";
  function line(c, s, x, y, size, options = {}) {
    txt(c, s, x, y, size, { weight: 720, ...options });
  }
  function chip(c, x, y, w, h, s, bg, fg) {
    rect(c, x, y, w, h, bg);
    line(c, s, x + w / 2, y + h * 0.52, h * 0.49, { align: "center", color: fg, max: w - 12 });
  }
  function portfolio(c) {
    rect(c, 0, 0, 640, 350, "#faf7ed");
    line(c, "个人作品集", 25, 36, 25);
    rule(c, 24, 62, 615, 62, F.ink, 2);
    cover(c, pictures.gallery_wide, 286, 80, 327, 242, 0.47, 0.56);
    line(c, "空间", 24, 136, 65);
    line(c, "摄影", 23, 216, 65);
    line(c, "城市建筑影像选", 29, 292, 24);
    arrow(c, 230, 292, 38, { angle: -0.72 });
  }
  function timer(c, t) {
    rect(c, 0, 0, 640, 350, night);
    line(c, "十刻", 29, 40, 33, { color: lime });
    line(c, "专注计时器", 605, 40, 23, { color: "#c9dbbd", align: "right" });
    rule(c, 28, 70, 610, 70, "#73866f", 2);
    line(c, "留出 25 分钟", 26, 135, 45, { color: "#f3f7ec", weight: 800 });
    line(c, "只做一件事", 26, 201, 54, { color: lime, weight: 800 });
    chip(c, 28, 258, 187, 55, "在线试用  ↗", lime, night);
    const elapsed = Math.max(0, Math.floor(t - 87.36));
    const clock = elapsed ? "24:" + String(60 - elapsed).padStart(2, "0") : "25:00";
    rect(c, 365, 99, 246, 214, "#eff5dd");
    line(c, "专注时段", 388, 136, 23, { color: night });
    line(c, clock, 383, 202, 64, { font: latin, color: night, weight: 700 });
    for (let i = 0; i < 9; i++) rect(c, 387 + i * 22, 267, 15, 9, i < 6 ? "#315a40" : "#becbad");
  }
  function printFair(c) {
    rect(c, 0, 0, 640, 350, "#ff9bbf");
    rect(c, 0, 0, 211, 350, "#fc693a");
    clip(c, 5, 0, 202, 350, () => group(c, () => {
      c.translate(107, 177);
      c.rotate(-0.27);
      for (let i = 0; i < 6; i++) {
        rect(c, -101 + i * 5, -119 + i * 15, 170, 178, i % 2 ? "#ffa2c7" : "#ffed99", F.ink, 4);
      }
      circle(c, -1, 49, 53, "#e74b33", F.ink, 4);
      circle(c, -1, 49, 23, "#ffc949", F.ink, 4);
    }));
    rule(c, 211, 0, 211, 350, F.ink, 5);
    line(c, "周末印刷社", 234, 57, 35);
    line(c, "开放日", 228, 157, 90);
    line(c, "11.28", 237, 266, 61, { font: latin, weight: 800 });
    chip(c, 430, 239, 177, 57, "预约入场", F.ink, "#fff0dc");
  }
  function devTools(c, t) {
    rect(c, 0, 0, 640, 350, "#e8e9ff");
    rect(c, 0, 0, 640, 59, "#24294c");
    line(c, "{ }  取色工具", 27, 31, 27, { color: "#f4f4ff" });
    const colors = ["#adc1ff", "#82ddd0", "#ddc5f4", "#f3a99c"];
    colors.forEach((col, i) => {
      const x = 28 + 146 * i;
      rect(c, x, 91, 137, 103, col, F.ink, 3);
      if (i === 1) tick(c, x + 70, 143, 40);
    });
    line(c, "HEX", 29, 243, 22);
    line(c, "#82DDD0", 26, 289, 48, { font: latin });
    chip(c, 436, 246, 163, 59, t > 90.2 ? "已复制" : "复制色值", "#384489", "#ffffff");
  }
  var pages = [portfolio, timer, printFair, devTools];
  function creativePage(c, r, id, t) {
    const [x, y, w, h] = r;
    if (w < 3 || h < 3) return;
    shell(c, x, y, w, h, "#fffdf6", 8, 4);
    clip(c, x + 1, y + 1, w - 2, h - 2, () => group(c, () => {
      c.translate(x, y);
      c.scale(w / 640, h / 350);
      pages[id](c, t);
    }));
  }
  var serviceBg = ["#edf3e8", "#eaf2ff", "#f6efdf"];
  function serviceTitle(c, s, sub) {
    line(c, sub, 23, 32, 20, { weight: 620 });
    rule(c, 22, 55, 345, 55, F.ink, 2);
    line(c, s, 21, 99, 40, { weight: 850 });
  }
  function finance(c, t) {
    serviceTitle(c, "月度账单", "个人账户");
    line(c, "本周支出", 23, 160, 24);
    line(c, "¥126", 20, 223, 66, { font: latin, weight: 800 });
    const on = step(t, 93.15, 93.7);
    rect(c, 22, 274, 323, 52, "#fffdf6", F.ink, 2);
    rect(c, 22 + 161 * on, 274, 161, 52, "#285647");
    line(c, "全部", 102, 301, 23, { align: "center", color: on > 0.5 ? F.ink : "#ffffff" });
    line(c, "支出", 264, 301, 23, { align: "center", color: on > 0.5 ? "#ffffff" : F.ink });
    const rows2 = [["工资", "+6800"], ["书店", "−86"], ["午餐", "−28"], ["地铁", "−12"]];
    clip(c, 19, 335, 329, 185, () => rows2.forEach(([s, n], i) => {
      const y = 367 + (i - on) * 61;
      line(c, s, 24, y, 26);
      line(c, n, 344, y, 28, { font: latin, align: "right" });
      rule(c, 22, y + 27, 344, y + 27, "#aabbad", 2);
    }));
  }
  function booking(c, t) {
    serviceTitle(c, "预约挂号", "门诊服务");
    line(c, "眼科门诊", 23, 160, 30);
    line(c, "11 月 28 日", 22, 215, 34);
    rule(c, 22, 253, 345, 253, "#91a5bb", 2);
    line(c, "可约时段", 23, 285, 24);
    const on = step(t, 94.12, 94.59);
    chip(c, 22, 315, 150, 56, "14:10", "#ffffff", F.ink);
    chip(c, 188, 315, 156, 56, "14:30", on > 0.5 ? "#17477a" : "#ffffff", on > 0.5 ? "#ffffff" : F.ink);
    if (on > 0.45) tick(c, 63, 427, 38, "#17477a");
    line(c, on > 0.45 ? "已约 14:30" : "请选择时段", on > 0.45 ? 96 : 23, 430, 29, { color: "#17477a" });
  }
  var draftLocal = [17, 212, 335, 75];
  function admin(c, t) {
    serviceTitle(c, "内容管理", "编辑工作台");
    line(c, "待发布", 23, 164, 27);
    line(c, "2", 338, 164, 28, { align: "right", font: latin });
    const on = step(t, 94.89, 95.41);
    const [x, y, w, h] = draftLocal;
    rect(c, x, y, w, h, "#ffdf85", F.ink, 2);
    rect(c, 30, 237, 22, 22, on > 0.5 ? F.ink : "#fffdf6", F.ink, 2);
    if (on > 0.5) tick(c, 41, 248, 15, "#ffffff");
    line(c, "窗边的书架", 66, 249, 27);
    rect(c, 30, 317, 22, 22, "#fffdf6", F.ink, 2);
    line(c, "小城邮局", 66, 329, 27);
    rule(c, 22, 365, 344, 365, "#ad9f8a", 2);
    chip(c, 22, 412, 323, 66, on > 0.5 ? "预览文章  ↗" : "选择草稿", "#322d28", "#fff8ea");
  }
  var services = [finance, booking, admin];
  function servicePage(c, r, id, t) {
    const [x, y, w, h] = r;
    if (w < 3 || h < 3) return;
    shell(c, x, y, w, h, serviceBg[id], 9, 4);
    clip(c, x + 2, y + 2, w - 4, h - 4, () => group(c, () => {
      c.translate(x, y);
      c.scale(w / 370, h / 540);
      rect(c, 0, 0, 370, 540, serviceBg[id]);
      services[id](c, t);
    }));
  }

  // drawing/componentWall.js
  var wallSeed = [537, 382, 366, 132];
  function bookmarkButton(c, r) {
    const [x, y, w, h] = r;
    shell(c, x, y, w, h, F.acid, 10, 5);
    star(c, x + w * 0.21, y + h * 0.5, Math.min(h * 0.26, w * 0.097), F.ink);
    heavy(c, "收藏", x + w * 0.39, y + h * 0.52, Math.min(h * 0.43, w * 0.21), w * 0.53);
  }

  // drawing/readingPage.js
  var articleBox = [112, 134, 1208, 683];
  var articleFace = "#fffcf3";
  var articleYellow = "#ffe623";
  var serif = '"Songti SC","STSong","Hiragino Mincho ProN",serif';
  var sections = [
    ["起初，我把书架安在窗前，书脊排得整整齐齐。", "坐下翻书，才发现我的肩膀总把光挡在书页外。"],
    ["我把架子往旁边挪了半步，刚好腾出一把椅子的位置。", "下午四点，阳光从扶手落到膝头，最后照亮半张书页。"],
    ["朋友问我，这回还能添几排新书。我把那把椅子拉出来。", "书少摆一层，靠窗的人就能安安静静地读完这一页。"]
  ];
  function bookmarkRect(r) {
    const [x, y, w, h] = r;
    return [x + w * 0.795, y + h * 0.052, w * 0.158, h * 0.105];
  }
  function readingPage(c, r, t, { bookmark = true } = {}) {
    const [x, y, w, h] = r;
    if (w < 2 || h < 2) return;
    const warn = step(t, 99.94, 100.32) * (1 - step(t, 107.83, 109.15));
    const whiten = step(t, 99.97, 100.34) * (1 - step(t, 102.48, 102.8));
    const grid2 = step(t, 104.045, 104.68) * (1 - step(t, 106.94, 108.47));
    const set = step(t, 107.6, 111.04);
    const col = rgb(F.ink, "#ffffff", whiten), bg = rgb(articleFace, articleYellow, warn);
    shell(c, x, y, w, h, bg, 8, 4);
    clip(c, x + 1, y + 1, w - 2, h - 2, () => group(c, () => {
      c.translate(x, y);
      c.scale(w / 1208, h / 683);
      const left = mix(70, 103, set), right = mix(1138, 1082, set);
      txt(c, "街角随笔", left, 70, 34, { weight: 740, color: col });
      rule(c, left, 112, right, 112, col, 3);
      txt(c, "窗边的书架", left, 198, mix(70, 82, set), { font: serif, weight: 820, color: col });
      if (grid2 > 1e-3) rect(c, left - 16, 139, right - left + 32, 111, null, F.ink, grid2 * 9);
      const top = mix(289, 298, set), gap = mix(106, 112, set);
      sections.forEach((lines, i) => {
        const yy = top + i * gap;
        if (grid2 > 1e-3) rect(c, left - 17, yy - 33, right - left + 34, 90, null, F.ink, grid2 * 8);
        lines.forEach((s, j) => {
          txt(c, s, left, yy + j * mix(38, 42, set), mix(32, 34, set), { weight: 480, font: serif, color: col });
          if (grid2 > 1e-3 && j === 0) rule(c, left - 12, yy + 19, right + 13, yy + 19, F.ink, grid2 * 4);
        });
      });
    }));
    if (bookmark) bookmarkButton(c, bookmarkRect(r));
  }

  // drawing/applicationsFlow.js
  var first = [178, 169, 1082, 580];
  var single = [[86, 278, 611, 334], [743, 278, 611, 334]];
  var grid = [[86, 136, 611, 334], [743, 136, 611, 334], [86, 510, 611, 334], [743, 510, 611, 334]];
  var desk = [[111, 172, 382, 558], [529, 172, 382, 558], [947, 172, 382, 558]];
  var singleDesk = [489, 133, 462, 675];
  function sprout(r, ax, ay, k) {
    return lerpRect([r[0] + r[2] * ax, r[1] + r[3] * ay, 0, 0], r, k);
  }
  function fitLocal(r, inner, width, height) {
    return [r[0] + r[2] * inner[0] / width, r[1] + r[3] * inner[1] / height, r[2] * inner[2] / width, r[3] * inner[3] / height];
  }
  function creativeBoxes(t) {
    const second = step(t, 86.87, 87.45), third = step(t, 88.35, 88.94), fourth = step(t, 89.3, 89.91);
    return [
      lerpRect(lerpRect(first, single[0], second), grid[0], third),
      sprout(lerpRect(single[1], grid[1], third), 0, 0.53, second),
      sprout(grid[2], 0.5, 0, third),
      sprout(grid[3], 0.5, 0, fourth)
    ];
  }
  function serviceBoxes(t) {
    const two = step(t, 93.59, 94.12), three = step(t, 94.36, 94.93);
    return [
      lerpRect(lerpRect(singleDesk, [286, 156, 409, 597], two), desk[0], three),
      sprout(lerpRect([749, 156, 409, 597], desk[1], three), 0.06, 0.53, two),
      sprout(desk[2], 0, 0.65, three)
    ];
  }
  function tableUnfold(c, t) {
    const k = step(t, 82.705, 83.63);
    if (k === 0) {
      paramTable(c, tableBox, 1, 3);
      return;
    }
    const [x, y, w, h] = tableBox;
    paramTable(c, tableBox, 1 - step(k, 0, 0.45), 3);
    const top = y + h * (1 - k);
    clip(c, x - 12, top, w + 42, y + h + 23 - top, () => creativePage(c, first, 0, t));
  }
  function fourToServices(c, t) {
    const k = step(t, 92.44, 93.27);
    for (let i = 0; i < 3; i++) {
      const shrink = 1 - step(t, 92.45 + i * 0.045, 93.12 + i * 0.025);
      creativePage(c, sprout(grid[i], i === 0 ? 1 : 0.5, i === 2 ? 0.2 : 0.78, shrink), i, t);
    }
    const face = lerpRect(grid[3], singleDesk, k);
    creativePage(c, face, 3, t);
    const reveal = step(t, 92.59, 93.27);
    if (reveal > 0) {
      const [x, y, w, h] = face;
      const window2 = sprout([x - 12, y - 12, w + 38, h + 38], 0.34, 0.43, reveal);
      clip(c, ...window2, () => servicePage(c, face, 0, t));
    }
  }
  var printedArticle;
  function articleProof() {
    if (printedArticle) return printedArticle;
    printedArticle = sheet(1208, 683);
    readingPage(printedArticle.getContext("2d"), [0, 0, 1208, 683], 96.6);
    return printedArticle;
  }
  function desksToArticle(c, t) {
    const open = step(t, 95.86, 96.96);
    const boxes = serviceBoxes(t);
    const depth = 1 - 0.1 * step(open, 0.05, 0.76);
    const anchorX = 1280, anchorY = 460;
    group(c, () => {
      c.translate(anchorX, anchorY);
      c.scale(depth, depth);
      c.translate(-anchorX, -anchorY);
      boxes.forEach((r2, i) => servicePage(c, r2, i, t));
    });
    if (open === 0) return;
    const from = fitLocal(desk[2], draftLocal, 370, 540);
    const r = lerpRect(from, articleBox, open);
    const [x, y, w, h] = r;
    const fill = rgb("#ffdf85", "#fffcf3", step(open, 0.15, 0.74));
    const lineWidth = mix(2 * desk[2][2] / 370, 4, open);
    const lift = 8 * step(open, 0.1, 0.63);
    if (lift > 0) rect(c, x + lift, y + lift, w, h, F.ink);
    rect(c, x, y, w, h, fill, F.ink, lineWidth);
    const reveal = step(open, 0.28, 0.94);
    if (reveal > 0) group(c, () => {
      c.globalAlpha = reveal;
      const proof = articleProof();
      clip(c, x + 2, y + 2, w - 4, h * 143 / 683 - 2, () => blit(c, proof, x, y, w, h));
      clip(c, x + 2, y + h * 251 / 683, w - 4, h * 432 / 683 - 2, () => blit(c, proof, x, y, w, h));
    });
    const ax = mix(from[0] + 49 * desk[2][2] / 370, articleBox[0] + 70, open);
    const ay = mix(from[1] + 37 * desk[2][3] / 540, articleBox[1] + 198, open);
    const sz = mix(27 * desk[2][2] / 370, 70, open);
    const check = 1 - step(open, 0.035, 0.37);
    if (check > 0) {
      const side = 22 * desk[2][2] / 370 * check, cx = ax - 25 * desk[2][2] / 370;
      rect(c, cx - side / 2, ay - side / 2, side, side, F.ink);
      tick(c, cx, ay, side * 0.66, "#ffffff");
    }
    const typeset = step(open, 0.38, 0.74);
    if (typeset < 1) group(c, () => {
      c.globalAlpha = 1 - typeset;
      txt(c, "窗边的书架", ax, ay, sz, { weight: 720 });
    });
    if (typeset > 0) group(c, () => {
      c.globalAlpha = typeset;
      txt(c, "窗边的书架", ax, ay, sz, { font: '"Songti SC","STSong","Hiragino Mincho ProN",serif', weight: 820, color: F.ink });
    });
  }
  function articleToWall(c, t) {
    const k = step(t, 113.87, 115.22);
    if (k === 0) {
      readingPage(c, articleBox, t);
      return;
    }
    const anchor = bookmarkRect(articleBox), r = lerpRect(anchor, wallSeed, k);
    const paperR = lerpRect(articleBox, r, k), show = 1 - step(k, 0.58, 1);
    if (show > 0) group(c, () => {
      c.globalAlpha = show;
      readingPage(c, paperR, t, { bookmark: false });
    });
    bookmarkButton(c, r);
  }
  function sceneClock(time) {
    if (time <= __default2[0][0] || time >= __default2[__default2.length - 1][0]) return time;
    const i = __default2.findIndex((row) => row[0] > time), a = __default2[i - 1], b = __default2[i];
    const d = b[0] - a[0], u = (time - a[0]) / d, v = 1 - u;
    return v * v * (1 + 2 * u) * a[1] + u * v * v * d * a[2] + u * u * (3 - 2 * u) * b[1] - u * u * v * d * b[2];
  }
  function applicationsFlow(c, time) {
    const t = sceneClock(time);
    rect(c, 0, 0, W, H, paper);
    if (t < 83.63) {
      tableUnfold(c, t);
      return;
    }
    if (t < 92.44) {
      creativeBoxes(t).forEach((r, i) => creativePage(c, r, i, t));
      return;
    }
    if (t < 93.27) {
      fourToServices(c, t);
      return;
    }
    if (t < 95.86) {
      serviceBoxes(t).forEach((r, i) => servicePage(c, r, i, t));
      return;
    }
    if (t < 97.02) {
      desksToArticle(c, t);
      return;
    }
    articleToWall(c, t);
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
    await loadPhotos();
  }
  function draw(c, t) {
    applicationsFlow(c, secondRoundTime(t + 74 / 30));
  }
  return __toCommonJS(component_entry_exports);
})();
