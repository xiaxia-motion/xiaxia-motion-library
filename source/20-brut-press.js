// 四色按钮按入硬阴影 · 夏夏的AI灵感
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
  var ink = "#202021";
  var paper = "#f8f4ea";
  var white = "#fffdf6";
  var fontCN = '"Hiragino Sans GB","Heiti SC","Arial",sans-serif';
  var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  var lin = (t, a, b) => clamp((t - a) / (b - a));
  var smooth = (q) => q * q * (3 - 2 * q);
  var step = (t, a, b) => smooth(lin(t, a, b));
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
  function pointer(c, x, y, sc = 1) {
    group(c, () => {
      c.translate(x, y);
      c.scale(sc, sc);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(6, 39);
      c.lineTo(15, 28);
      c.lineTo(24, 44);
      c.lineTo(32, 40);
      c.lineTo(22, 24);
      c.lineTo(37, 22);
      c.closePath();
      c.fillStyle = white;
      c.fill();
      c.lineWidth = 3;
      c.strokeStyle = ink;
      c.stroke();
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

  // drawing/space.js
  var rad = Math.PI / 180;

  // drawing/colorFlow.js
  var buttonBox = [320, 374, 800, 190];
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

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
  }
  function draw(c, t) {
    const actual = t + 74 / 30;
    const pressed = step(actual, 72.84, 73.13) * (1 - step(actual, 74.88, 75.42));
    const show = step(actual, 72.22, 72.88) * (1 - step(actual, 75.12, 75.58));
    rect(c, 0, 0, 1440, 1080, paper);
    fourButton(c, buttonBox, pressed);
    if (show > 0) group(c, () => {
      c.globalAlpha = show;
      pointer(c, buttonBox[0] + buttonBox[2] * 0.81 + (1 - show) * 109 + pressed * 12, buttonBox[1] + buttonBox[3] * 0.38 + pressed * 13, 0.97);
    });
  }
  return __toCommonJS(component_entry_exports);
})();
