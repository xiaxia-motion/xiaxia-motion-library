// 四色按钮展开为参数表 · 夏夏的AI灵感
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
  function plus(c, x, y, size, fg = F.ink) {
    rule(c, x - size / 2, y, x + size / 2, y, fg, size * 0.15);
    rule(c, x, y - size / 2, x, y + size / 2, fg, size * 0.15);
  }

  // drawing/press.js
  var lerpRect = (a, b, k) => a.map((v, i) => mix(v, b[i], k));

  // drawing/space.js
  var rad = Math.PI / 180;

  // drawing/colorFlow.js
  var buttonBox = [320, 374, 800, 190];
  var tableBox = [178, 169, 1082, 580];
  var ink2 = "#191a17";
  var colors = ["#ffe22b", "#ff8cc3", "#56d6e1", "#82e57c"];
  var previewHit = 2069 / 30;
  var yellowHit = 2092 / 30;
  var cyanHit = 2123 / 30;
  var endRects = ([x, y, w, h]) => [[x, y, w * 0.71, h], [x + w * 0.71, y, w * 0.29, h * 0.53], [x + w * 0.71, y + h * 0.53, w * 0.145, h * 0.47], [x + w * 0.855, y + h * 0.53, w * 0.145, h * 0.47]];
  function fourButton(c, r, press = 0, alpha = 1) {
    const d = Math.min(15, r[3] * 0.1), off = d * press, R = [r[0] + off, r[1] + off, r[2], r[3]], [x, y, w, h] = R;
    group(c, () => {
      c.globalAlpha = alpha;
      rect(c, r[0] + d, r[1] + d, w, h, ink2);
      endRects(R).forEach((s, i) => rect(c, ...s, colors[i], ink2, Math.max(3, h * 0.027)));
      rect(c, ...R, null, ink2, Math.max(4, h * 0.036));
      heavy(c, "加入行程", x + w * 0.058, y + h * 0.51, h * 0.47, w * 0.63);
      plus(c, x + w * 0.855, y + h * 0.265, h * 0.29);
    });
  }
  var rows = [["边框", "2–4 px", "纯黑"], ["投影偏移", "4–8 px", "向右下"], ["投影模糊", "0 px", "硬边"], ["填色", "纯色", "无渐变"]];
  function tableWords(c, r, visibility) {
    if (visibility <= 0) return;
    const [x, y, w, h] = r, head = h * 0.16, rh = (h - head) / 4, cols = [0, 0.37, 0.66, 1];
    const line = (caption, px, py, size, options) => group(c, () => {
      c.translate(px, py);
      c.scale(1, visibility);
      txt(c, caption, 0, 0, size, options);
    });
    cols.slice(0, 3).forEach((k, j) => line(["属性", "示例取值", "外观"][j], x + w * k + 25, y + head * 0.51, Math.min(42, head * 0.51), { color: F.bone, weight: 800 }));
    rows.forEach((row, i) => {
      const top = y + head + i * rh;
      rule(c, x, top, x + w, top, ink2, 3 * visibility);
      row.forEach((val, j) => line(val, x + w * cols[j] + 25, top + rh * 0.5, Math.min(j === 1 ? 53 : 43, rh * 0.48), { weight: j === 1 ? 800 : 650 }));
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
  function parametersFlow(c, u) {
    rect(c, 0, 0, W, H, paper);
    const open = step(u, 0, 0.78), r = lerpRect(buttonBox, tableBox, open);
    const pos = step(u, 1.24, 1.64) + step(u, 2.57, 2.99) + step(u, 3.93, 4.36);
    if (open >= 1) {
      paramTable(c, r, 1, pos);
      return;
    }
    if (open === 0) {
      fourButton(c, buttonBox);
      return;
    }
    const [x, y, w, h] = r, head = h * 0.16, row = (h - head) / 4, tiles = endRects(buttonBox);
    const dest = [[x, y + head, w, row], [x, y, w * 0.37, head], [x + w * 0.37, y, w * 0.29, head], [x + w * 0.66, y, w * 0.34, head]];
    rect(c, x + mix(15, 12, open), y + mix(15, 13, open), w, h, ink2);
    rect(c, ...r, F.bone, ink2, 5);
    tiles.forEach((tile, i) => {
      const box = lerpRect(tile, dest[i], open);
      rect(c, ...box, rgb(colors[i], i === 0 ? "#fff1a0" : ink2, open), ink2, 5 * (1 - open));
    });
    const label = 1 - step(open, 0, 0.45);
    if (label > 0) {
      const front = lerpRect(tiles[0], dest[0], open), [xx, yy, ww, hh] = front;
      group(c, () => {
        c.translate(xx + ww * 0.082, yy + hh * 0.51);
        c.scale(1, label);
        heavy(c, "加入行程", 0, 0, hh * 0.47, ww * 0.85);
      });
      const box = lerpRect(tiles[1], dest[1], open);
      plus(c, box[0] + box[2] * 0.5, box[1] + box[3] * 0.5, box[3] * 0.55 * label);
    }
    tableWords(c, r, step(open, 0.9, 1));
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
  }
  function draw(c, t) {
    parametersFlow(c, t + 74 / 30 - 75.7);
  }
  return __toCommonJS(component_entry_exports);
})();
