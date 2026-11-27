// 从收藏键退镜显出组件展板 · 夏夏的AI灵感
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
  var sizes = /* @__PURE__ */ new WeakMap();
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
    const first = __default[0], last = __default[__default.length - 1];
    if (t <= first[0]) return t;
    if (t >= last[0]) return last[1] + t - last[0];
    const i = __default.findIndex((r) => r[0] > t), a = __default[i - 1], b = __default[i];
    const span = b[0] - a[0], u = (t - a[0]) / span, v = 1 - u;
    return v * v * (1 + 2 * u) * a[1] + u * v * v * span * a[2] + u * u * (3 - 2 * u) * b[1] - u * u * v * span * b[2];
  }

  // drawing/base.js
  var W = 1440;
  var H = 1080;
  var ink = "#202021";
  var paper = "#f8f4ea";
  var fontCN = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
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
  function rounded(c, x, y, w, h, r, fill, stroke = null, lw = 3) {
    c.beginPath();
    c.roundRect(x, y, w, h, r);
    if (fill) {
      c.fillStyle = fill;
      c.fill();
    }
    if (stroke) {
      c.lineWidth = lw;
      c.strokeStyle = stroke;
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
  var minutes = (s) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  var timeText = (n) => String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0");
  var results = (s) => acts.filter((a) => a.day === s.day && a.artist.includes(s.search) && (!s.main || a.stage === "主舞台"));
  var counts = (s) => {
    const out = [0, 0, 0];
    for (const a of s.saved ? [prior, featured] : [prior]) {
      const h = minutes(a.time);
      out[h < 17 * 60 ? 0 : h < 19 * 60 ? 1 : 2]++;
    }
    return out;
  };
  var posterPhoto = (c, x, y, w, h, fy = 0.31) => cover(c, pictures.guitar, x, y, w, h, 0.56, fy);
  function heavy(c, s, x, y, size, max, opt = {}) {
    txt(c, s, x, y, size, { weight: 900, max, ...opt });
  }
  function logo(c, x, y, w, color = F.ink) {
    const bars = [0.49, 0.89, 0.66, 1, 0.4];
    bars.forEach((v, i) => rect(c, x + w * i * 0.198, y + (1 - v) * w * 0.46, w * 0.123, v * w * 0.9, color));
  }
  function plus(c, x, y, size, fg = F.ink) {
    rule(c, x - size / 2, y, x + size / 2, y, fg, size * 0.15);
    rule(c, x, y - size / 2, x, y + size / 2, fg, size * 0.15);
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
  function dayStrip(c, x, y, w, h, day) {
    const a = day === "周六" ? 0 : 1;
    ["周六", "周日"].forEach((s, i) => {
      const active = i === a;
      rect(c, x + i * w / 2, y, w / 2, h, active ? F.ink : F.bone, F.ink, 4);
      txt(c, s, x + (i + 0.5) * w / 2, y + h * 0.51, h * 0.48, { align: "center", weight: active ? 800 : 630, color: active ? F.acid : F.ink });
    });
  }
  function lineItem(c, a, x, y, w, h, { selected = false, compact = false } = {}) {
    rect(c, x, y, w, h, selected ? F.acid : F.bone);
    rule(c, x, y + h, x + w, y + h, F.ink, 3);
    const left = x + w * 0.031;
    const n = Math.min(h * 0.61, w * 0.118);
    txt(c, a.time, left, y + h * 0.55, n, { font: F.num, weight: 800 });
    txt(c, a.artist, x + w * 0.255, y + h * 0.48, Math.min(h * 0.43, w * 0.073), { weight: 800, max: w * 0.38 });
    if (!compact) txt(c, a.stage, x + w * 0.666, y + h * 0.52, Math.min(h * 0.32, w * 0.057), { max: w * 0.22, weight: 550 });
    if (selected) tick(c, x + w * 0.944, y + h * 0.51, h * 0.29);
    else plus(c, x + w * 0.946, y + h * 0.51, h * 0.29);
  }

  // drawing/relayFaces.js
  var { ink: ink2, bone, acid, cobalt, coral } = F;

  // drawing/componentWall.js
  var wallSeed = [537, 382, 366, 132];
  function bookmarkButton(c, r) {
    const [x, y, w, h] = r;
    shell(c, x, y, w, h, F.acid, 10, 5);
    star(c, x + w * 0.21, y + h * 0.5, Math.min(h * 0.26, w * 0.097), F.ink);
    heavy(c, "收藏", x + w * 0.39, y + h * 0.52, Math.min(h * 0.43, w * 0.21), w * 0.53);
  }

  // drawing/festivalLens.js
  var path = [
    [3574, 800, 532, 1910, 0],
    [3583, 746, 503, 1800, -1],
    [3592, 423, 363, 1005, -4.5],
    [3600, 264, 307, 620, -1],
    [3605, 272, 303, 595, 0],
    [3615, 430, 299, 770, 3.8],
    [3627, 715, 303, 649, 0.5],
    [3645, 787, 307, 635, 0],
    [3656, 915, 297, 806, 3.7],
    [3670, 1270, 312, 704, 1],
    [3678, 1300, 328, 661, 0],
    [3689, 1317, 398, 671, -0.6],
    [3700, 1326, 455, 741, -1.7],
    [3717, 1324, 505, 643, 0.2],
    [3727, 1141, 462, 790, -4.6],
    [3743, 814, 442, 653, -0.6],
    [3748, 793, 447, 644, 0],
    [3759, 813, 507, 651, -1.3],
    [3774, 841, 551, 630, -0.1],
    [3784, 659, 512, 808, -4.7],
    [3796, 277, 505, 632, -1],
    [3802, 258, 512, 580, 0],
    [3808, 281, 519, 548, 1.1],
    [3815, 278, 525, 520, 0.4],
    [3820, 283, 522, 547, -0.2],
    [3832, 290, 655, 693, 2.2],
    [3843, 288, 718, 609, 0.2],
    [3849, 317, 717, 627, 0],
    [3857, 506, 704, 822, 4],
    [3867, 747, 718, 673, 0.6],
    [3871, 770, 718, 614, -0.6],
    [3875, 774, 717, 651, 0.55],
    [3884, 965, 699, 795, 3.8],
    [3900, 1286, 709, 698, 0.3],
    [3925, 1314, 720, 658, 0],
    [3934, 1326, 781, 748, 1.4],
    [3950, 1361, 951, 568, 0.6],
    [3960, 1372, 957, 540, 0],
    [3973, 1330, 958, 594, -0.7],
    [3987, 1037, 949, 787, -3.6],
    [4004, 916, 958, 647, -0.5],
    [4012, 961, 974, 601, 0],
    [4021, 955, 974, 655, -0.3],
    [4034, 801, 949, 900, -3],
    [4053, 433, 958, 782, -2.1],
    [4067, 339, 955, 696, -0.75],
    [4081, 337, 954, 671, 0.25],
    [4096, 333, 951, 706, 0],
    [4110, 333, 948, 700, 0],
    [4121, 333, 948, 700, 0]
  ];
  function tangent(i, k) {
    if (i <= 0 || i >= path.length - 1) return 0;
    const a = path[i - 1], b = path[i], c = path[i + 1], da = b[0] - a[0], db = c[0] - b[0];
    const l = (b[k] - a[k]) / da, r = (c[k] - b[k]) / db;
    if (l * r <= 0) return 0;
    const wa = 2 * db + da, wb = db + 2 * da;
    return (wa + wb) / (wa / l + wb / r);
  }
  var tangents = path.map((a, i) => a.map((_, k) => k ? tangent(i, k) : 0));

  // drawing/selectionTour.js
  var sizes2 = [[760, 190, "#ff9bc8"], [926, 210, F.bone], [850, 220, F.bone], [880, 290, "#94e8d5"], [780, 235, "#c3b3fd"], [820, 215, F.bone], [1125, 475, F.bone]];
  var wallSizes = [[1050, 310, F.bone], [850, 220, F.bone], [830, 330, F.bone], [925, 300, F.bone], [760, 190, "#ff9bc8"], [810, 196, F.bone], [880, 290, "#94e8d5"], [780, 235, "#c3b3fd"], [840, 218, F.acid], [820, 215, F.bone], [700, 405, F.cobalt], [860, 380, F.bone], [1125, 475, F.bone]];
  var toBox = ([w, h, color]) => ({ x: 720 - w / 2, y: 540 - h / 2, w, h, color });
  var wallBounds = wallSizes.map(toBox);
  var boxes = sizes2.map(toBox);

  // drawing/festivalTour.js
  var beats = [
    ["tabs", 1.58, 820, 158, F.bone],
    ["search", 3.12, 878, 180, F.bone],
    ["select", 4.83, 740, 168, F.bone],
    ["list", 6.57, 1040, 310, F.bone],
    ["check", 8.31, 730, 178, F.acid],
    ["switch", 9.7, 720, 178, F.bone],
    ["slider", 11.07, 932, 272, F.bone],
    ["radio", 12.84, 790, 218, F.bone],
    ["button", 14.4, 716, 178, F.acid],
    ["progress", 15.81, 888, 186, F.bone],
    ["data", 17.63, 646, 414, F.cobalt],
    ["chart", 19.23, 910, 412, F.bone],
    ["notice", 21.18, 1046, 476, F.bone]
  ];
  var readyAt = 17.28;
  function selectionAt(u) {
    const leadValue = mix(10, 20, step(u, 11.48, 12.18));
    const lead = Math.round(leadValue);
    return {
      day: u < 2.09 ? "周六" : "周日",
      search: u < 3.7 ? "" : u < 3.94 ? "折" : "折线",
      main: u >= 5.99,
      picked: u >= 7.23,
      starred: u >= 8.85,
      remind: step(u, 10.17, 10.37),
      lead,
      leadValue,
      method: u >= 13.39 ? "振动" : "响铃",
      pressed: step(u, 14.83, 14.98) * (1 - step(u, 15.12, 15.39)),
      saved: u >= readyAt,
      progress: step(u, 15.98, readyAt),
      night: u >= 20.12,
      clock: timeText(minutes(featured.time) - lead)
    };
  }
  function chevron(c, x, y, r, up = false) {
    const a = up ? -1 : 1;
    rule(c, x - r, y - r * 0.38 * a, x, y + r * 0.45 * a, F.ink, 7);
    rule(c, x, y + r * 0.45 * a, x + r, y - r * 0.38 * a, F.ink, 7);
  }
  function magnify(c, x, y, r) {
    circle(c, x, y, r, null, F.ink, 7);
    rule(c, x + r * 0.72, y + r * 0.72, x + r * 1.62, y + r * 1.62, F.ink, 8);
  }
  function txtRight(c, text, x, y, size, color = F.ink) {
    txt(c, text, x, y, size, { align: "right", color, weight: 700 });
  }
  function animatedDay(c, w, h, u) {
    const q = step(u, 2.025, 2.155);
    if (q === 0 || q === 1) {
      dayStrip(c, 0, 0, w, h, q ? "周日" : "周六");
      return;
    }
    rect(c, 0, 0, w, h, F.bone, F.ink, 4);
    const labels = (color, weight) => ["周六", "周日"].forEach((label, index) => {
      txt(c, label, (index + 0.5) * w / 2, h * 0.51, h * 0.48, { align: "center", color, weight });
    });
    labels(F.ink, 630);
    const left = q * w / 2;
    rect(c, left, 0, w / 2, h, F.ink);
    clip(c, left, 0, w / 2, h, () => labels(F.acid, 800));
  }
  function inside(c, id, w, h, u, s) {
    const mid = h * 0.5, side = 38;
    switch (id) {
      case "tabs":
        animatedDay(c, w, h, u);
        return;
      case "search": {
        magnify(c, 73, mid - 4, 23);
        txt(c, s.search || "搜索乐队", 130, mid, 63, { color: s.search ? F.ink : F.muted, weight: s.search ? 800 : 550 });
        const focus = u >= 3.53;
        const cp = 130 + (s.search.length || 0) * 64;
        if (focus && (u < 4.35 || Math.cos((u - 4.35) * 15) > 0)) rect(c, cp + 7, mid - 38, 5, 77, F.cobalt);
        if (s.search) {
          const n = results({ ...s, main: false }).length;
          txtRight(c, n + " 场", w - 40, mid, 39);
        }
        return;
      }
      case "select": {
        const head = Math.min(h, 168);
        txt(c, "舞台", side, head * 0.32, 30, { color: F.muted });
        heavy(c, s.main ? "主舞台" : "全部舞台", side, head * 0.67, 61, w - 161);
        chevron(c, w - 74, head * 0.55, 22, h > 225);
        if (h > head + 2) {
          const menuY = head;
          rect(c, 0, menuY, w, 152, F.bone);
          rule(c, 0, menuY, w, menuY, F.ink, 5);
          ["全部舞台", "主舞台"].forEach((label, k) => {
            const y = menuY + k * 76;
            if (k === 1 && u > 5.71) rect(c, 0, y, w, 76, F.acid);
            txt(c, label, side, y + 38, 35, { weight: k ? 800 : 600 });
            if (k === 0 ? !s.main : s.main) tick(c, w - 73, y + 39, 29);
          });
        }
        return;
      }
      case "list": {
        const list = results(s), a = list[0] || featured;
        rect(c, 0, 0, w, h * 0.35, F.ink);
        txt(c, s.day + "   " + a.stage, side, h * 0.18, 45, { color: F.bone, weight: 760 });
        txtRight(c, list.length + " 场", w - side, h * 0.18, 39, F.acid);
        lineItem(c, a, 0, h * 0.36, w, h * 0.64, { selected: s.picked });
        return;
      }
      case "check": {
        const r = 72, x = 48;
        rect(c, x, mid - r / 2, r, r, s.starred ? F.ink : F.bone, F.ink, 6);
        if (s.starred) tick(c, x + r / 2, mid, r * 0.64, F.acid);
        heavy(c, "标为必看", 157, mid, 69, w - 270);
        if (s.starred) star(c, w - 77, mid, 33, F.coral);
        return;
      }
      case "switch": {
        heavy(c, "开演提醒", side, mid, 68, w - 268);
        const x = w - 224, sw = 174, th = 82;
        rSwitch(c, x, mid, sw, th, s.remind);
        return;
      }
      case "slider": {
        heavy(c, "提前提醒", side, h * 0.27, 57, w * 0.52);
        txtRight(c, s.lead + " 分钟", w - side, h * 0.28, 52);
        const left = 64, right = w - 64, y = h * 0.61;
        rect(c, left, y - 7, right - left, 14, F.ink);
        const fillX = left + (right - left) * s.leadValue / 30;
        rect(c, left, y - 8, fillX - left, 16, F.cobalt);
        for (let j = 0; j < 4; j++) {
          const x = left + j * (right - left) / 3;
          rule(c, x, y + 14, x, y + 24, F.ink, 3);
        }
        rounded(c, fillX - 28, y - 28, 56, 56, 28, F.acid, F.ink, 5);
        txt(c, "0", left, y + 52, 30, { font: F.num, align: "center" });
        txt(c, "30 分钟", right, y + 51, 30, { align: "right" });
        return;
      }
      case "radio": {
        heavy(c, "提醒方式", side, h * 0.27, 45, w - 76);
        const y = h * 0.7;
        ["响铃", "振动"].forEach((label, i) => {
          const x = 68 + i * w * 0.47;
          circle(c, x, y, 26, F.bone, F.ink, 5);
          if (s.method === label) circle(c, x, y, 14, F.cobalt);
          txt(c, label, x + 51, y, 49, { weight: s.method === label ? 850 : 600 });
        });
        return;
      }
      case "button":
        heavy(c, "加入行程", w * 0.075, mid, 75, w * 0.68);
        plus(c, w * 0.86, mid, 64);
        return;
      case "progress": {
        const pp = s.progress;
        txt(c, s.saved ? "已保存" : "正在保存", side, h * 0.34, 42, { weight: 760 });
        txtRight(c, Math.round(pp * 100) + "%", w - side, h * 0.34, 44);
        const x = side, y = h * 0.63, ww = w - 2 * side, hh = 28;
        rect(c, x, y, ww, hh, F.bone, F.ink, 4);
        rect(c, x + 2, y + 2, (ww - 4) * pp, hh - 4, F.cobalt);
        return;
      }
      case "data": {
        const roll = step(u, 17.63, 18.05);
        const list = roll > 0 ? [prior, featured] : [prior];
        txt(c, "我的周日行程", side, h * 0.15, 44, { color: F.bone, weight: 800 });
        clip(c, side - 3, h * 0.225, w * 0.47, h * 0.51, () => {
          txt(c, "01", side - 2, h * (0.48 - 0.55 * roll), h * 0.54, { font: F.num, weight: 800, color: F.acid });
          txt(c, "02", side - 2, h * (1.03 - 0.55 * roll), h * 0.54, { font: F.num, weight: 800, color: F.acid });
        });
        txtRight(c, "场演出", w - side, h * 0.53, 43, F.bone);
        rule(c, side, h * 0.69, w - side, h * 0.69, F.bone, 3);
        list.forEach((a, i) => group(c, () => {
          const y = h * (0.777 + 0.142 * i);
          if (i) c.globalAlpha = roll;
          txt(c, a.time, side, y, 40, { font: F.num, color: F.acid, weight: 700 });
          txtRight(c, a.artist, w - side, y, 32, F.bone);
        }));
        return;
      }
      case "chart": {
        heavy(c, "我的演出时段", side, h * 0.145, 49, w - 80);
        const numbers = counts(s), x0 = w * 0.1, x1 = w * 0.91, y0 = h * 0.76, d = (x1 - x0) / 3;
        const labels = ["午后", "傍晚", "夜间"];
        rule(c, x0 - 10, y0, x1 + 12, y0, F.ink, 4);
        numbers.forEach((n, i) => {
          const x = x0 + (i + 0.5) * d, bh = n * h * 0.34 * (i === 2 ? step(u, 19.14, 19.78) : 1);
          if (bh > 0) rect(c, x - d * 0.23, y0 - bh, d * 0.46, bh, s.night && i === 2 ? F.coral : F.cobalt, F.ink, 4);
          txt(c, String(n), x, y0 - bh - 23, 34, { align: "center", font: F.num, weight: 800 });
          txt(c, labels[i], x, y0 + 42, 34, { align: "center", weight: i === 2 && s.night ? 850 : 600 });
        });
        if (s.night) {
          txtRight(c, featured.time + "  " + featured.artist, w - side, h * 0.15, 31);
        }
        return;
      }
      case "notice": {
        const photo = w * 0.36, stub = w * 0.848, top = h * 0.22;
        rect(c, 0, 0, w, top, F.ink);
        txt(c, "已加入行程", 35, top * 0.51, 53, { color: F.bone, weight: 800 });
        posterPhoto(c, 0, top, photo, h - top, 0.32);
        rect(c, photo, top, stub - photo, h - top, F.acid);
        const x = photo + 27, ww = stub - x - 24;
        txt(c, "周日   " + featured.stage, x, top + h * 0.1, 34, { weight: 700 });
        txt(c, featured.time, x, top + h * 0.303, 110, { font: F.num, weight: 850, max: ww });
        heavy(c, featured.artist, x, top + h * 0.49, 57, ww);
        rule(c, x, top + h * 0.593, stub - 25, top + h * 0.593, F.ink, 4);
        txt(c, s.clock + "   " + s.method + "提醒", x, top + h * 0.69, 36, { weight: 740, max: ww });
        rect(c, stub, top, w - stub, h - top, F.coral);
        const stamp = step(u, 21.985, 22.09), ring = Math.min((w - stub) * 0.32, h * 0.15);
        if (stamp > 0) group(c, () => {
          const kick = Math.sin(Math.PI * step(u, 22, 22.38));
          c.translate((w + stub) / 2, h * 0.614);
          c.rotate(-0.17 - 0.13 * kick);
          const mag = stamp * (1 + 0.28 * kick);
          c.scale(mag, mag);
          circle(c, 0, 0, ring, null, F.ink, 8);
          tick(c, 0, 0, ring * 1.06, F.ink);
        });
        return;
      }
    }
  }
  function rSwitch(c, x, mid, w, h, q) {
    rounded(c, x, mid - h / 2, w, h, h / 2, rgb(F.bone, F.cobalt, q), F.ink, 5);
    circle(c, x + h / 2 + (w - h) * q, mid, h * 0.38, F.acid, F.ink, 4);
  }
  var panels = {
    tabs: [32, 232, 452, 140],
    search: [508, 232, 510, 140],
    select: [1042, 232, 526, 140],
    list: [1042, 400, 526, 205],
    check: [542, 400, 476, 90],
    switch: [542, 515, 476, 90],
    slider: [32, 400, 486, 205],
    radio: [32, 634, 450, 166],
    button: [506, 634, 512, 166],
    progress: [1042, 634, 526, 166],
    data: [1205, 830, 363, 270],
    chart: [657, 830, 524, 270],
    notice: [32, 830, 601, 270]
  };
  var headerButton = [1272, 73, 242, 87.28];
  var overview = [800, 532, 1910];
  var railCenter = 462;
  var ease = (t) => t * t * t * (10 + t * (-15 + 6 * t));
  var unit = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
  function lensBetween(a, b, t) {
    const k = ease(t), distance = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const widen = 0.085 * distance * 16 * k * k * (1 - k) * (1 - k);
    return [mix(a[0], b[0], k), mix(a[1], b[1], k), Math.exp(mix(Math.log(a[2]), Math.log(b[2]), k)) + widen];
  }
  function masthead(c) {
    shell(c, 32, 34, 1536, 166, F.ink, 7, 4);
    rect(c, 36, 38, 725, 158, F.acid);
    logo(c, 59, 68, 68);
    heavy(c, "周末现场", 151, 117, 108, 565);
    clip(c, 764, 38, 435, 158, () => posterPhoto(c, 764, 24, 435, 202, 0.2));
    rect(c, 1199, 38, 6, 158, F.ink);
    bookmarkButton(c, headerButton);
  }
  function panel(c, index, u, s, frame, depth = 7) {
    const [id, , , nh, col] = beats[index];
    const [x, y, w, h] = panels[id], open = id === "select" ? step(u, 5.22, 5.5) * (1 - step(u, 5.99, 6.34)) : 0;
    const nw = w * nh / h;
    const extra = open * 152, push = id === "button" ? s.pressed * (depth - 1) : 0;
    const surface = id === "check" ? "#ff9bc8" : id === "slider" ? "#94e8d5" : id === "radio" ? "#c3b3fd" : col;
    shell(c, x + push, y + push, w, h + h / nh * extra, surface, depth - push, 4);
    group(c, () => {
      c.translate(x + push, y + push);
      c.scale(w / nw, h / nh);
      const height = nh + extra;
      clip(c, 2, 2, nw - 4, height - 4, () => {
        if (id === "notice" && u < 21.7) {
          rect(c, 0, 0, nw, nh * 0.22, F.ink);
          txt(c, "演出回执", 40, nh * 0.116, 51, { color: F.bone, weight: 800 });
          posterPhoto(c, 0, nh * 0.22, nw * 0.37, nh * 0.78, 0.32);
          rect(c, nw * 0.37, nh * 0.22, nw * 0.63, nh * 0.78, F.acid);
          heavy(c, s.saved ? "准备出票" : "等待选场", nw * 0.42, nh * 0.58, 81, nw * 0.5);
          const feed = step(u, 21.18, 21.7);
          if (feed > 0) clip(c, 0, 0, nw, nh * feed, () => group(c, () => {
            c.translate(0, nh * (feed - 1));
            inside(c, id, nw, nh, u, s);
          }));
        } else if (id === "progress" && u < 15.9) {
          txt(c, "待保存", 38, nh * 0.34, 42, { weight: 760 });
          txtRight(c, "0%", nw - 38, nh * 0.34, 44);
          rect(c, 38, nh * 0.63, nw - 76, 28, F.bone, F.ink, 4);
        } else {
          inside(c, id, nw, height, u, s);
        }
      });
    });
    if (id === "notice" && u > 22) {
      const amount = step(u, 22, 22.7), sx = x + w * 0.848;
      group(c, () => {
        c.globalAlpha = amount;
        c.setLineDash([3, 6]);
        rule(c, sx, y + 7, sx, y + h - 5, F.ink, 1.6);
      });
      circle(c, sx, y - 1, 7 * amount, F.cream);
      circle(c, sx, y + h + 6, 8 * amount, F.cream);
    }
  }
  function board(c, u) {
    const state = selectionAt(u);
    shell(c, 0, 0, 1600, 1132, F.cream, 10, 4);
    masthead(c);
    for (let i = 0; i < beats.length; i++) if (beats[i][0] !== "select") panel(c, i, u, state, null);
    panel(c, 2, u, state, null);
  }
  function world(c, view, screenY, draw2) {
    const [cx, cy, width] = view, scale = W / width;
    group(c, () => {
      c.translate(720, screenY);
      c.scale(scale, scale);
      c.translate(-cx, -cy);
      draw2();
    });
  }
  function conclusion(c, t) {
    rect(c, 0, 0, W, H, paper);
    const k = ease(unit(t, 0, 2.68)), [bx, by, bw, bh] = headerButton;
    const start = [bx + bw / 2, by + bh / 2, W * bw / wallSeed[2]];
    const view = lensBetween(start, overview, k), sy = mix(wallSeed[1] + wallSeed[3] / 2, railCenter, k);
    world(c, view, sy, () => {
      const v = ease(unit(t, 0.1, 2.33)), x = mix(bx - 4, -15, v), y = mix(by - 3, -15, v);
      clip(c, x, y, mix(bw + 18, 1630, v), mix(bh + 18, 1162, v), () => board(c, 1.38));
    });
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
    await loadPhotos();
  }
  function draw(c, t) {
    conclusion(c, Math.max(0, secondRoundTime(t + 74 / 30) - 115.255));
  }
  return __toCommonJS(component_entry_exports);
})();
