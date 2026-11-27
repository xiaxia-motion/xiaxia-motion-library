// 票根居中退镜与分屏开源落款 · 夏夏的AI灵感
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
  function baseScale(canvas) {
    return sizes.get(canvas)?.sx || 1;
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
  function poseAt(points, clock) {
    const n = Math.max(0, Math.min(points.length - 1, clock)), i = Math.floor(n), a = points[i];
    if (i === n || i === points.length - 1) return a;
    const b = points[i + 1], k = n - i;
    return a.map((v, j) => v + (b[j] - v) * k);
  }
  function betweenTicks(frame, integerValue) {
    const i = Math.floor(frame), k = frame - i;
    if (!k) return integerValue(i);
    const a = integerValue(i), b = integerValue(i + 1);
    return a + (b - a) * k;
  }

  // drawing/base.js
  var W = 1440;
  var H = 1080;
  var ink = "#202021";
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
    const { color = ink, weight = 600, align = "left", font: font2 = fontCN, max, base = "middle" } = opt;
    c.save();
    c.fillStyle = color;
    c.textAlign = align;
    c.textBaseline = base;
    c.font = weight + " " + size + "px " + font2;
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
  var sizes2 = {
    tabs: [1050, 310],
    search: [850, 220],
    select: [830, 330],
    list: [925, 300],
    check: [760, 190],
    switch: [810, 196],
    slider: [880, 290],
    radio: [780, 235],
    button: [840, 218],
    progress: [820, 215],
    data: [700, 405],
    chart: [860, 380],
    notice: [1125, 475]
  };
  var { ink: ink2, bone, acid, cobalt, coral } = F;
  var inkText = (c, text, x, y, size, opts = {}) => txt(c, text, x, y, size, { color: ink2, weight: 800, ...opts });
  var number = (c, text, x, y, size, opts = {}) => inkText(c, text, x, y, size, { font: F.num, weight: 800, ...opts });
  var light = (c, text, x, y, size, opts = {}) => inkText(c, text, x, y, size, { weight: 600, ...opts });
  var snap = (f, at) => f < at ? 0 : Math.sin((f - at) * 0.68) * Math.exp(-(f - at) / 4.4);
  var anchor = (c, x, y, fn) => group(c, () => {
    c.translate(x, y);
    fn();
  });
  var hideIn = (state) => Boolean(state.hideIn);
  var hideOut = (state) => Boolean(state.hideOut);
  function search(c, f, s) {
    const value = s.inputText ?? (f < 59 ? "" : f < 72 ? "折" : "折线");
    if (!hideIn(s)) {
      circle(c, 443, 550, 28, null, ink2, 8);
      rule(c, 464, 571, 482, 589, ink2, 9);
    }
    const left = 525;
    if (value) {
      inkText(c, value, left, 545, 77, { max: 430 });
      const caret = left + Math.min(430, value.length * 77) + 9;
      if (f < 81 || Math.cos(f * 0.3) > 0) rect(c, caret, 506, 6, 80, cobalt);
    } else light(c, "搜索乐队", left, 545, 63, { color: F.muted });
    if (!hideOut(s)) {
      c.beginPath();
      c.moveTo(1058, 505);
      c.lineTo(1058, 544);
      c.lineTo(1006, 544);
      c.moveTo(1028, 524);
      c.lineTo(1006, 544);
      c.lineTo(1028, 565);
      c.strokeStyle = ink2;
      c.lineWidth = 7;
      c.lineJoin = "miter";
      c.stroke();
    }
  }
  function chevron(c, x, y, r, t) {
    group(c, () => {
      c.translate(x, y);
      c.rotate(Math.PI * t);
      c.beginPath();
      c.moveTo(-r, -r * 0.42);
      c.lineTo(0, r * 0.46);
      c.lineTo(r, -r * 0.42);
      c.lineWidth = 9;
      c.lineJoin = "miter";
      c.strokeStyle = ink2;
      c.stroke();
    });
  }
  function select(c, f, s) {
    const open = step(f, 99, 108), selected = step(f, 113, 118);
    const headerY = mix(547, 455, open);
    inkText(c, open > 0.5 ? "选择舞台" : "全部舞台", 370, headerY, open > 0.5 ? 53 : 66);
    if (!hideIn(s)) chevron(c, 1035, mix(550, 459, open), 27, open);
    if (open <= 0) return;
    clip(c, 307, 500, 826, 193 * open, () => {
      rule(c, 309, 502, 1130, 502, ink2, 5);
      light(c, "全部舞台", 372, 547, 40);
      const y = 596;
      rect(c, 308, y, 824, 98, rgb(bone, acid, selected));
      rule(c, 309, y, 1130, y, ink2, 3);
      inkText(c, "主舞台", 372, 645, 52);
      if (!hideOut(s)) {
        circle(c, 964, 641, 20, null, ink2, 4);
        if (selected > 0) group(c, () => {
          c.globalAlpha *= selected;
          tick(c, 964, 641, 26, ink2);
        });
      }
    });
  }
  function list(c, f, s) {
    const chosen = step(f, 140, 145);
    rect(c, 260, 392, 920, 82, ink2);
    inkText(c, featured.day + "场", 299, 435, 44, { color: bone });
    number(c, "1", 1063, 435, 48, { color: acid, align: "right" });
    inkText(c, "场", 1082, 435, 35, { color: acid });
    rect(c, 260, 474, 920, 213, rgb(bone, acid, chosen));
    number(c, featured.time, 301, 548, 88, { max: 218 });
    inkText(c, featured.artist, 548, 552, 61, { max: 248 });
    if (!hideIn(s)) {
      rect(c, 849, 519, 166, 68, bone, ink2, 4);
      inkText(c, featured.stage, 932, 554, 37, { align: "center", max: 147 });
    }
    if (!hideOut(s)) {
      anchor(c, 1040, 578, () => {
        c.scale(1 + 0.085 * snap(f, 142), 1 + 0.085 * snap(f, 142));
        if (chosen < 1) group(c, () => {
          c.globalAlpha *= 1 - chosen;
          plus(c, 0, 0, 43);
        });
        if (chosen > 0) group(c, () => {
          c.globalAlpha *= chosen;
          tick(c, 0, 0, 48);
        });
      });
    }
  }
  function check(c, f, s) {
    const filled = step(f, 169, 175);
    rect(c, 431, 511, 82, 82, rgb(bone, ink2, filled), ink2, 6);
    if (!s.passSocket && !hideIn(s) && filled > 0) clip(c, 436, 513, 78 * filled, 79, () => tick(c, 472, 552, 55, acid));
    inkText(c, "标为必看", 550, 543, 73, { max: 350 });
    if (!hideOut(s)) anchor(c, 1e3, 532, () => {
      c.rotate(snap(f, 172) * 0.13);
      const q = 1 + 0.12 * snap(f, 172);
      c.scale(q, q);
      star(c, 0, 0, 44, rgb("#ff9bc8", coral, filled));
    });
  }
  function toggle(c, f, s) {
    inkText(c, "开演提醒", 378, 541, 74, { max: 485 });
    const t = step(f, 195, 201), x = mix(900, 955, t);
    rounded(c, 854, 501, 148, 86, 43, rgb(bone, cobalt, t), ink2, 6);
    if (!(hideIn(s) || hideOut(s))) {
      circle(c, x, 544, 34, acid, ink2, 5);
      rule(c, x - 5, 534, x - 5, 554, ink2, 3);
      rule(c, x + 5, 534, x + 5, 554, ink2, 3);
    }
  }
  function slider(c, f, s) {
    const travel = step(f, 228, 241), value = s.minutes ?? Math.round(10 + 10 * travel), knob = s.minutes == null ? mix(565, 816, travel) : 314 + 753 * value / 30;
    inkText(c, "提前提醒", 334, 469, 62);
    number(c, String(value), 964, 465, 83, { align: "right" });
    inkText(c, "分钟", 982, 473, 40);
    const x0 = 314, x1 = 1067, y = 568;
    rect(c, x0, y - 8, x1 - x0, 16, ink2);
    rect(c, x0, y - 8, knob - x0, 16, cobalt);
    for (let j = 0; j < 4; j++) {
      const x = x0 + j * (x1 - x0) / 3;
      rule(c, x, y + 12, x, y + 24, ink2, 3);
    }
    number(c, "0", x0, 628, 37, { align: "center" });
    number(c, "30", x1, 628, 37, { align: "center" });
    if (!(hideIn(s) || hideOut(s))) circle(c, knob, y, 32, acid, ink2, 6);
  }
  function radio(c, f, s) {
    const selected = step(f, 266, 272);
    inkText(c, "提醒方式", 383, 477, 56);
    const y = 580;
    for (const [x, word] of [[485, "响铃"], [822, "振动"]]) {
      circle(c, x, y, 26, bone, ink2, 5);
      inkText(c, word, x + 51, y, 50, { weight: word === "响铃" && selected === 0 || word === "振动" && selected === 1 ? 800 : 600 });
    }
    if (selected < 1) circle(c, 485, y, 15 * (1 - selected), cobalt);
    if (selected > 0 && !(hideIn(s) || hideOut(s))) circle(c, 822, y, 15 * selected, cobalt);
  }
  function button(c, f, s) {
    const q = step(f, 294, 297) * (1 - step(f, 300, 304));
    inkText(c, "加入行程", 387 + q * 3, 538 + q * 3, 82, { max: 494 });
    if (!(hideIn(s) || hideOut(s))) anchor(c, 1005 + q * 3, 536 + q * 2, () => {
      c.rotate(snap(f, 297) * 0.12);
      plus(c, 0, 0, 76);
    });
  }
  function progress(c, f, s) {
    const v = step(f, 319, 354);
    inkText(c, v >= 1 ? "已保存" : "保存行程", 408, 495, 55);
    number(c, Math.round(100 * v) + "%", 1042, 495, 61, { align: "right" });
    rect(c, 437, 551, 603, 40, bone, ink2, 5);
    rect(c, 440, 554, 598 * v, 34, cobalt);
    if (v > 0 && v < 1) rect(c, Math.max(440, 437 + 598 * v - 5), 554, 5, 34, ink2);
    if (hideOut(s) && v >= 1) rect(c, 1027, 554, 11, 34, bone);
  }
  function data(c, f, s) {
    const roll = step(f, 368, 386);
    inkText(c, "我的周日行程", 411, 396, 46, { color: bone });
    if (!s.passSocket) clip(c, 424, 447, 307, 146, () => {
      number(c, "01", 598, 526 - roll * 161, 158, { color: acid, align: "center", max: 271 });
      number(c, "02", 598, 687 - roll * 161, 158, { color: acid, align: "center", max: 271 });
    });
    inkText(c, "场", 738, 547, 51, { color: bone });
    if (!hideOut(s)) rect(c, 758, 579, 55, 5, acid);
    rule(c, 411, 603, 1023, 603, bone, 3);
    number(c, prior.time, 415, 634, 38, { color: acid });
    light(c, prior.artist, 1015, 634, 34, { align: "right", color: bone });
    if (roll > 0) group(c, () => {
      c.globalAlpha *= roll;
      number(c, featured.time, 415, 688, 38, { color: acid });
      inkText(c, featured.artist, 1015, 688, 34, { align: "right", color: bone });
    });
  }
  function chart(c, f, s) {
    inkText(c, "我的演出时段", 341, 405, 51);
    const clicked = step(f, 438, 442), grow = step(f, 427, 438);
    if (clicked > 0) group(c, () => {
      c.globalAlpha *= clicked;
      number(c, featured.time, 918, 407, 39, { align: "right", color: F.muted });
      inkText(c, featured.artist, 930, 407, 35, { max: 155 });
    });
    const base = 637;
    const values = [{ x: 486, n: 0, label: "午后" }, { x: 710, n: 1, label: "傍晚" }, { x: 934, n: 1, label: "夜间" }];
    for (const [i, o] of values.entries()) {
      const height = 70 * o.n * (i === 2 ? grow : 1), color = i === 2 ? rgb(cobalt, coral, clicked) : cobalt;
      if (height > 0) rect(c, o.x - 59, base - height, 118, height, color, ink2, 5);
      number(c, String(i === 2 && grow < 0.35 ? 0 : o.n), o.x, base - height - 35, 43, { align: "center" });
      inkText(c, o.label, o.x, base + 45, 37, { align: "center", weight: i === 2 && clicked > 0.5 ? 800 : 600 });
    }
    rule(c, 366, base + 1, 1073, base + 1, ink2, 5);
    if (hideOut(s)) rect(c, 925, 565, 18, 7, coral);
  }
  function notice(c, f, s) {
    const left = 157.5, top = 302.5, w = 1125, h = 475;
    const head = top + 96, photoW = 400, stub = 1088;
    rect(c, left, top, w, 96, ink2);
    inkText(c, "已加入行程", left + 37, top + 50, 55, { color: bone });
    posterPhoto(c, left, head, photoW, h - 96, 0.32);
    rect(c, left + photoW, head, stub - left - photoW, h - 96, acid);
    const x = left + photoW + 27;
    inkText(c, featured.day + "　" + featured.stage, x, head + 49, 38);
    number(c, featured.time, x, head + 145, 119, { max: 466 });
    inkText(c, featured.artist, x, head + 237, 64, { max: 454 });
    rule(c, x, head + 284, stub - 26, head + 284, ink2, 4);
    const reminder = timeText(minutes(featured.time) - 20);
    inkText(c, reminder + "　振动提醒", x, head + 329, 40, { max: 462 });
    rect(c, stub, head, left + w - stub, h - 96, coral);
    group(c, () => {
      c.setLineDash([9, 10]);
      rule(c, stub, head + 2, stub, top + h, ink2, 3);
    });
    const stamp = step(f, 507, 511);
    if (stamp > 0) group(c, () => {
      c.translate((stub + left + w) / 2, head + (h - 96) * 0.49);
      c.rotate(-0.19 + snap(f, 509) * 0.08);
      const amount = stamp * (1 + 0.12 * snap(f, 509));
      c.scale(amount, amount);
      circle(c, 0, 0, 55, null, ink2, 7);
      tick(c, 0, 0, 65);
    });
  }
  var faces = { search, select, list, check, switch: toggle, slider, radio, button, progress, data, chart, notice };
  function drawFace(c, id, frame, box, inkState = {}) {
    const size = sizes2[id];
    if (!size || !box || box.w <= 0 || box.h <= 0) return;
    const [w, h] = size, l = (1440 - w) / 2, t = (1080 - h) / 2;
    group(c, () => {
      c.translate(box.x, box.y);
      c.scale(box.w / w, box.h / h);
      c.translate(-l, -t);
      clip(c, l + 3, t + 3, w - 6, h - 6, () => {
        if (id === "tabs") {
          dayStrip(c, l, t, w, h, frame < 29 ? "周六" : "周日");
          return;
        }
        faces[id](c, frame, inkState);
      });
    });
  }

  // drawing/componentWall.js
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

  // drawing/relayPhysics.json
  var relayPhysics_default = { engine: { name: "Matter.js", version: "0.20.0", hz: 240, displayFps: 30, registry: "https://registry.npmjs.org/matter-js/-/matter-js-0.20.0.tgz", firstEjectFrame: 24, ejectOrigin: [258, 302], ejectSamples: 22, axes: "x右 y下 角度顺时针" }, eject: { header: [[0, 0, 0], [69.694, -19.019, 0.267], [173.975, -47.414, 0.667], [277.942, -75.649, 1.066], [416.082, -113.047, 1.595], [553.67, -150.163, 2.123], [707.799, -191.583, 2.714], [861.237, -232.648, 3.302], [1030.915, -277.862, 3.953], [1216.583, -327.097, 4.665], [1401.233, -375.81, 5.373], [1601.514, -428.36, 6.141], [1784.052, -475.992, 6.84], [1982.042, -527.37, 7.6], [2178.848, -578.14, 8.354], [2374.476, -628.308, 9.104], [2568.933, -677.877, 9.85], [2762.227, -726.85, 10.591], [2938.397, -771.221, 11.266], [3113.6, -815.097, 11.938], [3287.842, -858.482, 12.606], [3445.415, -897.497, 13.21]], tabs: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], search: [[0, 0, 0], [78.182, 2.354, -1.718], [195.163, 5.938, -4.288], [311.377, 9.636, -6.85], [461.168, 14.98, -10.203], [610.361, 20.435, -13.543], [777.492, 26.706, -17.284], [943.871, 33.116, -21.009], [1127.861, 40.403, -25.128], [1329.19, 48.617, -29.635], [1529.415, 57.036, -34.117], [1746.589, 66.456, -38.979], [1944.524, 75.304, -43.41], [2159.214, 85.187, -48.216], [2372.62, 95.311, -52.993], [2584.749, 105.673, -57.742], [2795.608, 116.272, -62.462], [3005.206, 127.107, -67.154], [3196.236, 137.245, -71.43], [3386.217, 147.579, -75.683], [3575.156, 158.107, -79.913], [3746.019, 167.847, -83.738]], select: [[0, 0, 0], [73.927, -7.87, 1.718], [184.541, -19.582, 4.288], [295.239, -31.234, 6.85], [447.622, -47.028, 10.207], [598.25, -62.488, 13.55], [766.769, -79.621, 17.295], [934.495, -96.505, 21.024], [1119.97, -114.978, 25.147], [1322.922, -134.951, 29.659], [1524.761, -154.564, 34.146], [1743.687, -175.549, 39.013], [1943.217, -194.413, 43.449], [2159.639, -214.587, 48.26], [2374.765, -234.341, 53.042], [2588.605, -253.678, 57.796], [2801.165, -272.6, 62.521], [3012.453, -291.109, 67.218], [3205.022, -307.716, 71.499], [3396.536, -323.98, 75.757], [3586.998, -339.904, 79.991], [3759.239, -354.086, 83.82]], list: [[0, 0, 0], [73.782, 24.267, -1.718], [186.996, 60.775, -4.205], [303.783, 97.415, -6.52], [458.339, 146.177, -9.595], [612.132, 194.869, -12.659], [784.177, 248.897, -16.13], [953.966, 298.141, -19.9], [1140.82, 350.792, -23.798], [1344.545, 407.092, -27.765], [1545.398, 462.383, -31.413], [1760.262, 523.041, -35.044], [1953.6, 579.469, -38.112], [2161.02, 642.111, -41.228], [2365.365, 705.82, -44.159], [2567.083, 770.5, -46.944], [2766.456, 836.009, -49.609], [2963.758, 902.233, -52.181], [3143.021, 963.553, -54.474], [3320.88, 1025.398, -56.714], [3497.45, 1087.728, -58.905], [3656.949, 1144.55, -60.87]], check: [[0, 0, 0], [82.775, 15.284, 1.714], [201.623, 37.992, 4.204], [311.067, 60.319, 6.54], [456.482, 90.1, 9.644], [601.316, 119.896, 12.735], [763.563, 153.434, 16.198], [925.082, 186.989, 19.646], [1103.696, 224.293, 23.458], [1299.143, 265.353, 27.629], [1493.518, 306.439, 31.778], [1704.347, 351.289, 36.278], [1896.498, 392.43, 40.379], [2104.916, 437.339, 44.827], [2312.087, 482.279, 49.249], [2518.018, 527.25, 53.644], [2722.717, 572.25, 58.013], [2926.191, 617.281, 62.356], [3111.639, 658.585, 66.314], [3296.07, 699.914, 70.251], [3479.489, 741.267, 74.165], [3645.36, 778.883, 77.706]], switch: [[0, 0, 0], [73.514, 36.161, -1.674], [183.51, 90.329, -4.179], [293.176, 144.41, -6.676], [438.887, 216.383, -9.994], [584.016, 288.201, -13.299], [746.593, 368.813, -17.001], [908.44, 449.231, -20.686], [1087.418, 538.359, -24.762], [1283.263, 636.125, -29.221], [1478.033, 733.607, -33.656], [1689.291, 839.628, -38.467], [1881.834, 936.519, -42.851], [2090.676, 1041.9, -47.607], [2298.268, 1146.948, -52.334], [2504.618, 1251.668, -57.033], [2709.734, 1356.06, -61.703], [2913.622, 1460.126, -66.346], [3099.448, 1555.236, -70.578], [3284.254, 1650.076, -74.786], [3468.046, 1744.647, -78.971], [3634.255, 1830.388, -82.756]], slider: [[0, 0, 0], [-0.283, 78.514, 1.718], [-0.52, 193.536, 4.072], [-0.257, 302.063, 5.345], [0.092, 446.377, 7.035], [0.823, 587.869, 8.872], [2.54, 741.202, 11.445], [4.249, 894.015, 14.006], [6.701, 1061.5, 16.629], [11.879, 1242.622, 18.844], [20.099, 1422.024, 20.617], [31.933, 1617.391, 22.267], [43.533, 1795.975, 23.705], [56.34, 1989.988, 25.248], [69.623, 2183.316, 26.73], [83.022, 2375.818, 28.186], [96.342, 2567.464, 29.634], [110.144, 2758.465, 31.016], [122.838, 2932.82, 32.265], [135.462, 3106.467, 33.507], [148.018, 3279.413, 34.743], [159.372, 3436.031, 35.86]], radio: [[0, 0, 0], [10.401, 80.967, -1.718], [25.142, 182.499, 0.096], [39.119, 293.057, 3.313], [57.866, 437.485, 7.587], [76.707, 579.355, 10.769], [97.26, 741.213, 12.322], [119.295, 900.868, 13.658], [145.621, 1078.7, 14.859], [172.588, 1274.536, 15.801], [198.213, 1466.293, 16.739], [226.078, 1673.71, 17.407], [252.901, 1863.493, 17.796], [282.305, 2069.689, 18.166], [310.874, 2274.751, 18.489], [339.047, 2478.823, 18.795], [367.052, 2681.974, 19.1], [394.21, 2883.995, 19.356], [418.835, 3068.346, 19.582], [443.325, 3251.938, 19.805], [467.681, 3434.773, 20.028], [489.707, 3600.335, 20.229]], button: [[0, 0, 0], [49.969, 50.727, 1.718], [124.734, 126.69, 4.288], [199.276, 202.5, 6.85], [297.573, 298.894, 9.685], [395.062, 392.576, 12.169], [504.271, 497.679, 14.951], [612.989, 602.479, 17.721], [733.215, 718.57, 20.784], [864.771, 845.84, 24.136], [994.462, 971.844, 27.499], [1133.324, 1108.704, 31.335], [1259.859, 1233.689, 34.834], [1397.104, 1369.54, 38.629], [1533.528, 1504.878, 42.401], [1669.136, 1639.704, 46.151], [1803.932, 1774.023, 49.878], [1937.922, 1907.838, 53.583], [2060.041, 2030.061, 56.96], [2181.49, 2151.864, 60.318], [2302.274, 2273.251, 63.658], [2411.501, 2383.243, 66.679]], progress: [[0, 0, 0], [68.691, 25.227, -1.718], [171.471, 63.036, -4.288], [273.942, 100.807, -6.85], [410.094, 151.108, -10.254], [545.701, 201.342, -13.645], [697.862, 258.584, -17.338], [851.048, 321.193, -20.175], [1021.71, 393.428, -23.387], [1209.088, 473.957, -26.986], [1397.369, 555.209, -30.513], [1604.893, 643.043, -34.178], [1796.83, 722.351, -37.361], [2007.577, 807.349, -40.658], [2219.119, 890.841, -43.801], [2430.969, 972.939, -46.818], [2642.83, 1053.811, -49.715], [2854.403, 1133.58, -52.51], [3047.86, 1205.756, -55.007], [3240.728, 1277.101, -57.45], [3432.929, 1347.686, -59.844], [3606.932, 1411.461, -61.993]], data: [[0, 0, 0], [74.489, 37.414, 1.718], [185.942, 93.458, 4.288], [297.062, 149.409, 6.85], [444.704, 223.867, 10.254], [591.757, 298.16, 13.645], [756.489, 381.544, 17.443], [920.481, 464.722, 21.225], [1101.832, 556.901, 25.406], [1300.272, 658.007, 29.982], [1497.624, 758.81, 34.533], [1711.682, 868.434, 39.469], [1906.777, 968.608, 43.967], [2118.387, 1077.549, 48.847], [2328.73, 1186.138, 53.697], [2537.816, 1294.376, 58.518], [2745.65, 1402.265, 63.31], [2952.24, 1509.809, 68.074], [3140.529, 1608.087, 72.416], [3327.785, 1706.078, 76.733], [3514.013, 1803.783, 81.027], [3682.425, 1892.359, 84.911]], chart: [[0, 0, 0], [43.193, 55.609, -1.718], [107.821, 138.876, -4.288], [172.255, 221.968, -6.85], [258.477, 336.189, -10.027], [344.632, 451.69, -13.055], [441.127, 581.105, -16.447], [537.185, 710.086, -19.823], [643.411, 852.913, -23.557], [759.646, 1009.439, -27.643], [876.23, 1166.207, -31.558], [1003.92, 1336.403, -35.636], [1120.293, 1491.748, -39.352], [1246.516, 1660.528, -43.382], [1371.983, 1828.597, -47.388], [1496.699, 1995.96, -51.37], [1620.669, 2162.62, -55.328], [1743.898, 2328.582, -59.262], [1856.209, 2480.105, -62.848], [1967.905, 2631.047, -66.414], [2078.987, 2781.413, -69.961], [2179.442, 2917.612, -73.168]], notice: [[0, 0, 0], [15.21, 66.119, 1.718], [38.303, 178.489, 2.944], [61.246, 287.925, 4.168], [91.701, 432.461, 5.793], [121.451, 580.876, 7.47], [154.671, 747.669, 9.415], [187.2, 913.177, 11.324], [221.86, 1097.171, 13.382], [259.285, 1299.478, 15.625], [295.494, 1502.452, 17.574], [333.148, 1722.987, 19.534], [366.363, 1923.886, 21.252], [402.129, 2142.018, 23.099], [437.681, 2359.143, 24.936], [473.02, 2575.269, 26.762], [508.148, 2790.401, 28.576], [543.066, 3004.545, 30.38], [574.89, 3199.98, 32.024], [606.54, 3394.595, 33.659], [638.016, 3588.393, 35.285], [666.48, 3763.869, 36.756]] }, passes: [{ start: 44, impact: 54, end: 61, token: "ring", points: [[840, 529, -24], [797.602, 483.805, -1.68], [755.204, 449.954, 20.641], [712.806, 427.447, 42.961], [678.117, 417.469, 61.223], [639.573, 415.289, 81.515], [604.883, 421.343, 99.777], [570.194, 434.991, 118.039], [527.796, 461.983, 140.359], [485.398, 500.32, 162.68], [443, 550.008, 185], [443.047, 547.395, 192.832], [442.868, 549.93, 191.576], [442.983, 549.997, 184.247], [443.002, 549.997, 184.856], [443, 549.997, 184.988], [443, 549.997, 184.998], [443, 549.997, 184.998]], contacts: [{ step: 103, point: [443, 550], surface: [[443.333, 580.498]], speed: 24.91, angularSpeed: 0.142, normal: [0, -1], frame: 54, engineMs: 429.167 }, { step: 114, point: [442.765, 551.755], surface: [[444.64, 582.198], [438.665, 581.978]], speed: 13.277, angularSpeed: 0.218, normal: [0, -1], frame: 56, engineMs: 475 }, { step: 120, point: [443.002, 550.042], surface: [[442.754, 580.541]], speed: 0.018, angularSpeed: 0.256, normal: [0, -1], frame: 57, engineMs: 500 }, { step: 128, point: [443.011, 550.022], surface: [[444.075, 580.504]], speed: 0.122, angularSpeed: 2e-3, normal: [0, -1], frame: 58, engineMs: 533.333 }], simulationSteps: [0, 11, 22, 33, 42, 52, 61, 70, 81, 92, 103, 107, 114, 125, 138, 155, 175, 198], source: [840, 529], receiver: [443, 550], impactError: 8e-3, seatError: 3e-3 }, { start: 82, impact: 92, end: 99, token: "wedge", points: [[1030, 525, -48], [1030.568, 498.317, -42.532], [1031.136, 479.227, -37.063], [1031.641, 468.634, -32.203], [1032.083, 464.287, -27.949], [1032.525, 464.533, -23.696], [1032.967, 469.373, -19.443], [1033.409, 478.807, -15.19], [1033.914, 495.214, -10.329], [1034.482, 520.843, -4.861], [1035.051, 550.446, 0.608], [1035.011, 549.669, -1.948], [1034.997, 549.987, -0.117], [1034.998, 549.997, -0.029], [1035, 549.997, 1e-3], [1035, 549.997, 1e-3], [1035, 549.997, 1e-3], [1035, 549.997, 1e-3]], contacts: [{ step: 80, point: [1035.051, 554.066], surface: [[1034.757, 581.732]], speed: 15.893, angularSpeed: 0.042, normal: [0, -1], frame: 92, engineMs: 333.333 }, { step: 91, point: [1034.989, 550.464], surface: [[1035.167, 578.13]], speed: 3.277, angularSpeed: 0.12, normal: [0, -1], frame: 94, engineMs: 379.167 }], simulationSteps: [0, 9, 18, 26, 33, 40, 47, 54, 62, 71, 80, 84, 91, 102, 115, 132, 152, 175], source: [1030, 525], receiver: [1035, 550], impactError: 0.449, seatError: 3e-3 }, { start: 123, impact: 133, end: 140, token: "strip", points: [[964, 641, 16], [960.312, 569.939, 10.478], [956.624, 514.721, 4.956], [953.504, 480.373, 0.283], [950.667, 458.992, -3.965], [947.83, 446.986, -8.212], [945.277, 444.196, -12.035], [942.44, 450.002, -16.283], [939.319, 467.217, -20.956], [935.631, 502.186, -26.478], [931.943, 553.008, -32], [933.604, 555.903, -27.691], [931.61, 552.216, -30.183], [932.004, 552.921, -32.179], [931.999, 552.995, -32.007], [932, 552.998, -31.996], [932, 552.998, -31.996], [932, 552.998, -31.996]], contacts: [{ step: 113, point: [931.943, 553], surface: [[888.637, 605.413]], speed: 17.547, angularSpeed: 0.03, normal: [0, -1], frame: 133, engineMs: 470.833 }, { step: 118, point: [934.487, 556.999], surface: [[886.787, 605.447]], speed: 6.945, angularSpeed: 0.037, normal: [0, -1], frame: 135, engineMs: 491.667 }, { step: 125, point: [931.7, 552.432], surface: [[890.756, 606.71]], speed: 3.301, angularSpeed: 0.314, normal: [0, -1], frame: 136, engineMs: 520.833 }, { step: 133, point: [931.998, 553.067], surface: [[889.267, 605.95]], speed: 0.086, angularSpeed: 0.053, normal: [0, -1], frame: 136, engineMs: 554.167 }, { step: 140, point: [931.998, 553.047], surface: [[888.716, 605.48]], speed: 0.02, angularSpeed: 8e-3, normal: [0, -1], frame: 137, engineMs: 583.333 }], simulationSteps: [0, 13, 26, 37, 47, 57, 66, 76, 87, 100, 113, 117, 124, 135, 148, 165, 185, 208], source: [964, 641], receiver: [932, 553], impactError: 0.058, seatError: 2e-3 }, { start: 151, impact: 161, end: 168, token: "check", points: [[1040, 578, 42], [973.477, 515.818, 15.764], [912.072, 472.482, -8.455], [850.667, 442.645, -32.673], [804.613, 429.127, -50.836], [753.441, 423.014, -71.018], [707.387, 425.527, -89.182], [661.333, 435.634, -107.345], [599.928, 460.923, -131.564], [538.523, 499.711, -155.782], [472, 551.075, -182.018], [471.549, 551.764, -181.328], [472.062, 551.385, -177.289], [471.992, 551.975, -180.101], [472, 551.995, -180.003], [472, 551.995, -180.002], [472, 551.995, -180.002], [472, 551.995, -180.002]], contacts: [{ step: 111, point: [472, 556.967], surface: [[445.968, 584.901], [499.934, 582.999]], speed: 28.265, angularSpeed: 0.141, normal: [0, -1], frame: 161, engineMs: 462.5 }], simulationSteps: [0, 13, 25, 37, 46, 56, 65, 74, 86, 98, 111, 115, 122, 133, 146, 163, 183, 206], source: [1040, 578], receiver: [472, 552], impactError: 0.925, seatError: 5e-3 }, { start: 177, impact: 187, end: 194, token: "star", points: [[1e3, 532, -32], [989.341, 485.844, -16.835], [978.682, 451.032, -1.67], [968.023, 427.563, 13.495], [959.302, 416.799, 25.903], [949.612, 413.746, 39.689], [940.891, 419.013, 52.097], [932.171, 431.874, 64.505], [921.512, 457.906, 79.67], [910.853, 495.281, 94.835], [900.194, 544.008, 110], [897.333, 542.883, 117.727], [900.809, 544.183, 115], [899.964, 543.986, 108.643], [900.002, 543.998, 110.073], [900, 543.997, 110], [900, 543.997, 110], [900, 543.997, 110]], contacts: [{ step: 103, point: [900.194, 544], surface: [[898.903, 580.977]], speed: 19.603, angularSpeed: 0.096, normal: [0, -1], frame: 187, engineMs: 429.167 }, { step: 114, point: [901.688, 544.999], surface: [[896.062, 581.569]], speed: 15.043, angularSpeed: 0.262, normal: [0, -1], frame: 189, engineMs: 475 }, { step: 118, point: [899.952, 544.072], surface: [[902.224, 581.002]], speed: 0.217, angularSpeed: 0.014, normal: [0, -1], frame: 190, engineMs: 491.667 }, { step: 123, point: [900.025, 544.059], surface: [[897.844, 580.995]], speed: 0.035, angularSpeed: 0.05, normal: [0, -1], frame: 190, engineMs: 512.5 }], simulationSteps: [0, 11, 22, 33, 42, 52, 61, 70, 81, 92, 103, 107, 114, 125, 138, 155, 175, 198], source: [1e3, 532], receiver: [900, 544], impactError: 0.194, seatError: 3e-3 }, { start: 208, impact: 218, end: 225, token: "puck", points: [[955, 544, 0], [909.118, 496.789, -24.95], [867.059, 465.372, -47.822], [828.824, 446.654, -68.614], [794.412, 437.824, -87.327], [760, 436.588, -106.04], [725.588, 442.945, -124.752], [691.176, 456.896, -143.465], [652.941, 481.304, -164.257], [610.882, 518.98, -187.129], [565, 567.918, -212.079], [565.448, 568.177, -211.871], [565.201, 567.908, -206.613], [564.995, 567.995, -210.15], [565.001, 567.994, -210.029], [565, 567.995, -210.002], [565, 567.995, -210.002], [565, 567.995, -210.002]], contacts: [{ step: 102, point: [565, 573.019], surface: [[563.017, 601.951], [569.076, 601.731]], speed: 24.94, angularSpeed: 0.145, normal: [0, -1], frame: 218, engineMs: 425 }, { step: 106, point: [564.891, 569.421], surface: [[562.976, 598.358], [569.035, 598.124]], speed: 14.177, angularSpeed: 0.134, normal: [0, -1], frame: 219, engineMs: 441.667 }, { step: 113, point: [565.458, 568.532], surface: [[566.338, 597.519], [560.292, 597.068]], speed: 5.01, angularSpeed: 0.033, normal: [0, -1], frame: 220, engineMs: 470.833 }, { step: 115, point: [564.892, 568.09], surface: [[562.982, 597.027]], speed: 0.768, angularSpeed: 0.203, normal: [0, -1], frame: 221, engineMs: 479.167 }], simulationSteps: [0, 12, 23, 33, 42, 51, 60, 69, 79, 90, 102, 106, 113, 124, 137, 154, 174, 197], source: [955, 544], receiver: [565, 568], impactError: 0.082, seatError: 5e-3 }, { start: 246, impact: 256, end: 263, token: "puck", points: [[816, 568, -21], [816.667, 545.333, -18.667], [817.333, 528.667, -16.333], [818, 518, -14], [818.5, 513.937, -12.25], [819.083, 513.464, -10.208], [819.583, 516.714, -8.458], [820.083, 523.339, -6.708], [820.75, 537.422, -4.375], [821.417, 557.505, -2.042], [822.083, 580.009, 0.292], [821.98, 579.538, -2.071], [822.008, 579.978, -1.595], [822.005, 579.996, 0.232], [822, 579.997, 0.022], [822, 579.997, 3e-3], [822, 579.997, 2e-3], [822, 579.997, 2e-3]], contacts: [{ step: 73, point: [822.083, 583.589], surface: [[821.936, 612.588], [827.968, 611.985]], speed: 13.983, angularSpeed: 0.02, normal: [0, -1], frame: 256, engineMs: 304.167 }, { step: 84, point: [822.016, 580.462], surface: [[823.045, 609.443], [816.998, 609.024]], speed: 3.158, angularSpeed: 0.062, normal: [0, -1], frame: 258, engineMs: 350 }], simulationSteps: [0, 8, 16, 24, 30, 37, 43, 49, 57, 65, 73, 77, 84, 95, 108, 125, 145, 168], source: [816, 568], receiver: [822, 580], impactError: 0.083, seatError: 3e-3 }, { start: 275, impact: 285, end: 292, token: "pin", points: [[822, 580, -30], [843.32, 523.686, -13.689], [864.641, 480.873, 2.621], [882.408, 455.507, 16.214], [898.398, 440.694, 28.447], [914.388, 433.474, 40.68], [928.602, 433.431, 51.553], [944.592, 440.556, 63.786], [962.359, 457.377, 77.379], [983.68, 489.939, 93.689], [1005, 536.008, 110], [1004.699, 535.768, 110.851], [1005.104, 535.987, 111.067], [1004.996, 535.998, 109.906], [1005, 535.997, 109.988], [1005, 535.997, 109.998], [1005, 535.997, 109.998], [1005, 535.997, 109.998]], contacts: [{ step: 103, point: [1005, 536], surface: [[1006.047, 559.977]], speed: 18.464, angularSpeed: 0.095, normal: [0, -1], frame: 285, engineMs: 429.167 }, { step: 108, point: [1003.067, 537.026], surface: [[1003.981, 561.008], [997.744, 560.428]], speed: 10.584, angularSpeed: 0.063, normal: [0, -1], frame: 287, engineMs: 450 }, { step: 114, point: [1005.199, 536.105], surface: [[1005.675, 560.1]], speed: 1.669, angularSpeed: 0.041, normal: [0, -1], frame: 287, engineMs: 475 }], simulationSteps: [0, 12, 24, 34, 43, 52, 60, 69, 79, 91, 103, 107, 114, 125, 138, 155, 175, 198], source: [822, 580], receiver: [1005, 536], impactError: 8e-3, seatError: 3e-3 }, { start: 306, impact: 316, end: 323, token: "inkbar", points: [[1008, 534, 12], [946.036, 482.911, 7.855], [884.073, 445.323, 3.709], [827.273, 422.726, -0.091], [775.636, 412.027, -3.545], [724, 410.703, -7], [672.364, 418.754, -10.455], [620.727, 436.18, -13.909], [563.927, 466.177, -17.709], [501.964, 511.839, -21.855], [440, 571.008, -26], [440.938, 574.763, -18.55], [439.762, 569.795, -20.751], [440.002, 570.838, -26.619], [439.999, 571, -25.99], [440, 570.999, -25.993], [440, 570.999, -25.993], [440, 570.999, -25.993]], contacts: [{ step: 110, point: [440, 571], surface: [[411.501, 603.814]], speed: 29.747, angularSpeed: 0.024, normal: [0, -1], frame: 316, engineMs: 458.333 }, { step: 114, point: [439.898, 575.011], surface: [[407.359, 603.824]], speed: 17.621, angularSpeed: 0.046, normal: [0, -1], frame: 317, engineMs: 475 }, { step: 122, point: [439.835, 569.954], surface: [[413.851, 604.794]], speed: 5.616, angularSpeed: 0.658, normal: [0, -1], frame: 319, engineMs: 508.333 }, { step: 130, point: [439.999, 571.066], surface: [[411.962, 604.276]], speed: 0.108, angularSpeed: 0.109, normal: [0, -1], frame: 319, engineMs: 541.667 }, { step: 138, point: [440, 571.05], surface: [[411.576, 603.93]], speed: 5e-3, angularSpeed: 0.017, normal: [0, -1], frame: 320, engineMs: 575 }, { step: 144, point: [440, 571.043], surface: [[411.462, 603.824]], speed: 0.052, angularSpeed: 1e-3, normal: [0, -1], frame: 320, engineMs: 600 }], simulationSteps: [0, 12, 24, 35, 45, 55, 65, 75, 86, 98, 110, 114, 121, 132, 145, 162, 182, 205], source: [1008, 534], receiver: [440, 571], impactError: 8e-3, seatError: 1e-3 }, { start: 359, impact: 369, end: 376, token: "typeblock", points: [[1038, 568, -21], [990, 508.293, -26.127], [942, 462.086, -31.255], [898, 431.589, -35.955], [858, 413.709, -40.227], [818, 405.203, -44.5], [778, 406.072, -48.773], [738, 416.317, -53.045], [694, 438.414, -57.745], [646, 475.457, -62.873], [598, 526.008, -68], [593.39, 524.823, -82.96], [599.691, 526.199, -88.76], [598.089, 526.023, -75.623], [598.002, 526.018, -68.145], [598, 526.013, -68.092], [598, 525.998, -68.005], [598, 525.998, -68.007]], contacts: [{ step: 110, point: [598, 526], surface: [[618.562, 567.203]], speed: 24.486, angularSpeed: 0.03, normal: [0, -1], frame: 369, engineMs: 458.333 }, { step: 123, point: [597.441, 526.015], surface: [[614.076, 568.954]], speed: 3.92, angularSpeed: 0.906, normal: [0, -1], frame: 372, engineMs: 512.5 }, { step: 135, point: [597.972, 526.033], surface: [[616.03, 568.394]], speed: 0.142, angularSpeed: 0.274, normal: [0, -1], frame: 373, engineMs: 562.5 }, { step: 146, point: [597.993, 526.041], surface: [[617.88, 567.574]], speed: 0.072, angularSpeed: 0.08, normal: [0, -1], frame: 374, engineMs: 608.333 }, { step: 156, point: [598.001, 526.051], surface: [[618.618, 567.227]], speed: 0.013, angularSpeed: 0.019, normal: [0, -1], frame: 374, engineMs: 650 }, { step: 166, point: [598.001, 526.046], surface: [[618.627, 567.218]], speed: 0.035, angularSpeed: 2e-3, normal: [0, -1], frame: 375, engineMs: 691.667 }], simulationSteps: [0, 12, 24, 35, 45, 55, 65, 75, 86, 98, 110, 114, 121, 132, 145, 162, 182, 205], source: [1038, 568], receiver: [598, 526], impactError: 8e-3, seatError: 2e-3 }, { start: 400, impact: 410, end: 417, token: "column", points: [[762, 562, 13], [782.327, 511.754, 14.536], [801.091, 479.436, 15.955], [818.291, 461.67, 17.255], [833.927, 455.364, 18.436], [848, 457.703, 19.5], [862.073, 467.636, 20.564], [877.709, 487.58, 21.745], [894.909, 520.345, 23.045], [913.673, 569.027, 24.464], [934, 637.008, 26], [934.221, 636.749, 24.163], [933.898, 637.111, 20.274], [934.006, 637.003, 27.739], [934.005, 636.997, 26.441], [934.001, 636.997, 26.033], [934, 636.997, 26.002], [934, 636.997, 26.004]], contacts: [{ step: 110, point: [934, 637], surface: [[933.937, 675.91]], speed: 23.632, angularSpeed: 8e-3, normal: [0, -1], frame: 410, engineMs: 458.333 }, { step: 115, point: [932.984, 638.295], surface: [[934.91, 677.158]], speed: 10.267, angularSpeed: 0.09, normal: [0, -1], frame: 412, engineMs: 479.167 }, { step: 121, point: [933.778, 637.339], surface: [[937.836, 676.037]], speed: 2.655, angularSpeed: 0.017, normal: [0, -1], frame: 412, engineMs: 504.167 }, { step: 124, point: [934.006, 637.064], surface: [[935.026, 675.96]], speed: 0.061, angularSpeed: 0.104, normal: [0, -1], frame: 413, engineMs: 516.667 }, { step: 132, point: [934.011, 637.033], surface: [[932.686, 675.921]], speed: 0.057, angularSpeed: 0.041, normal: [0, -1], frame: 413, engineMs: 550 }], simulationSteps: [0, 13, 25, 36, 46, 55, 64, 74, 85, 97, 110, 114, 121, 132, 145, 162, 182, 205], source: [762, 562], receiver: [934, 637], impactError: 8e-3, seatError: 3e-3 }, { start: 447, impact: 463, end: 476, token: "stub", points: [[934, 567, -23], [945.106, 517.415, -20.264], [956.212, 475.423, -17.528], [967.317, 441.025, -14.792], [977.189, 416.824, -12.36], [987.061, 398.623, -9.928], [995.699, 387.619, -7.8], [1003.103, 381.843, -5.976], [1011.74, 379.37, -3.848], [1019.144, 380.907, -2.024], [1026.548, 385.819, -0.2], [1035.186, 395.815, 1.928], [1045.058, 412.864, 4.36], [1054.929, 435.913, 6.792], [1066.035, 469.015, 9.528], [1077.141, 509.71, 12.264], [1088.247, 558.008, 15], [1090.608, 555.295, 12.057], [1088.517, 555.782, 8.154], [1088.842, 553.268, 1.66], [1088.014, 557.908, 13.894], [1088.042, 557.276, 20.208], [1087.989, 558.07, 10.414], [1088.003, 557.838, 16.094], [1088, 558.015, 14.867], [1088.001, 558.017, 14.589], [1087.999, 557.988, 15.059], [1088.001, 557.992, 15.036], [1088, 557.997, 15.003], [1088, 557.998, 14.995]], contacts: [{ step: 125, point: [1088.247, 558], surface: [[1106.638, 611.068]], speed: 23.12, angularSpeed: 0.021, normal: [0, -1], frame: 463, engineMs: 520.833 }, { step: 139, point: [1088.002, 557.938], surface: [[1102.54, 612.189]], speed: 0.455, angularSpeed: 0.376, normal: [0, -1], frame: 468, engineMs: 579.167 }, { step: 152, point: [1088, 558.047], surface: [[1106.025, 611.241]], speed: 0.07, angularSpeed: 0.125, normal: [0, -1], frame: 470, engineMs: 633.333 }, { step: 166, point: [1088, 558.043], surface: [[1106.028, 611.236]], speed: 0.051, angularSpeed: 0.038, normal: [0, -1], frame: 472, engineMs: 691.667 }, { step: 178, point: [1088.001, 558.048], surface: [[1106.491, 611.082]], speed: 0.039, angularSpeed: 9e-3, normal: [0, -1], frame: 473, engineMs: 741.667 }], simulationSteps: [0, 9, 18, 27, 35, 43, 50, 56, 63, 69, 75, 82, 90, 98, 107, 116, 125, 127, 129, 133, 138, 143, 149, 157, 165, 174, 184, 195, 207, 220], source: [934, 567], receiver: [1088, 558], impactError: 0.247, seatError: 2e-3 }] };

  // drawing/tempoPlan.json
  var tempoPlan_default = {
    frames: 660,
    components: [
      "tabs",
      "search",
      "select",
      "list",
      "check",
      "switch",
      "slider",
      "radio",
      "button",
      "progress",
      "data",
      "chart",
      "notice"
    ],
    windows: [
      [
        51,
        63
      ],
      [
        94,
        110
      ],
      [
        149,
        164
      ],
      [
        192,
        208
      ],
      [
        235,
        247
      ],
      [
        276,
        293
      ],
      [
        339,
        354
      ],
      [
        385,
        397
      ],
      [
        428,
        446
      ],
      [
        484,
        501
      ],
      [
        535,
        550
      ],
      [
        583,
        599
      ]
    ],
    settled: [
      40,
      74,
      129,
      173,
      216,
      256,
      316,
      365,
      409,
      464,
      511,
      564,
      623
    ],
    preview: [
      45,
      84,
      139,
      183,
      226,
      267,
      329,
      375,
      418,
      475,
      522,
      573,
      638
    ],
    clock: [
      [
        [
          0,
          0
        ],
        [
          40,
          40
        ]
      ],
      [
        [
          63,
          55
        ],
        [
          67,
          59
        ],
        [
          74,
          72
        ],
        [
          96,
          81
        ]
      ],
      [
        [
          109,
          98
        ],
        [
          112,
          99
        ],
        [
          119,
          108
        ],
        [
          125,
          113
        ],
        [
          129,
          118
        ],
        [
          149,
          121
        ]
      ],
      [
        [
          164,
          138
        ],
        [
          168,
          140
        ],
        [
          173,
          145
        ],
        [
          194,
          149
        ]
      ],
      [
        [
          202,
          169
        ],
        [
          208,
          175
        ],
        [
          213,
          175
        ],
        [
          219,
          179
        ],
        [
          235,
          181
        ]
      ],
      [
        [
          247,
          193
        ],
        [
          252,
          195
        ],
        [
          256,
          201
        ],
        [
          276,
          207
        ]
      ],
      [
        [
          293,
          225
        ],
        [
          301,
          228
        ],
        [
          316,
          241
        ],
        [
          339,
          245
        ]
      ],
      [
        [
          354,
          264
        ],
        [
          360,
          266
        ],
        [
          365,
          272
        ],
        [
          385,
          274
        ]
      ],
      [
        [
          397,
          292
        ],
        [
          402,
          294
        ],
        [
          405,
          297
        ],
        [
          407,
          300
        ],
        [
          409,
          304
        ],
        [
          428,
          305
        ]
      ],
      [
        [
          446,
          319
        ],
        [
          464,
          354
        ],
        [
          486,
          358
        ]
      ],
      [
        [
          500,
          367
        ],
        [
          501,
          368
        ],
        [
          511,
          386
        ],
        [
          535,
          399
        ]
      ],
      [
        [
          550,
          426
        ],
        [
          553,
          427
        ],
        [
          560,
          438
        ],
        [
          561,
          439
        ],
        [
          564,
          442
        ],
        [
          583,
          446
        ]
      ],
      [
        [
          599,
          486
        ],
        [
          619,
          507
        ],
        [
          621,
          509
        ],
        [
          623,
          511
        ],
        [
          659,
          547
        ]
      ]
    ]
  };

  // drawing/releaseWall.js
  var grid = [
    [12, 12, 422, 193],
    [452, 12, 480, 193],
    [951, 12, 476, 193],
    [466, 224, 549, 279],
    [12, 525, 345, 132],
    [12, 675, 345, 140],
    [12, 835, 735, 228],
    [1084, 525, 343, 139],
    [766, 835, 661, 228],
    [1084, 683, 343, 132],
    [1036, 224, 391, 279],
    [12, 224, 435, 279],
    [376, 525, 688, 290]
  ];
  var credit = "github：xiaxia-motion-library";
  var font = '"Hiragino Sans GB","Heiti SC",Arial,sans-serif';
  var ease = (t) => {
    const k = Math.max(0, Math.min(1, t));
    return k * k * k * (10 + k * (-15 + 6 * k));
  };
  var recoil = (t) => t < 0 ? 0 : Math.sin(t * 0.48) * Math.exp(-t * 0.17);
  function title(c, open, f) {
    if (open <= 0) return;
    const h = 250 * open, cy = 519;
    clip(c, 0, cy - h / 2, 1440, h, () => {
      rect(c, 0, cy - h / 2, 1440, h, F.ink);
      const size = 0.89 + 0.11 * open + 0.012 * recoil(f - 478);
      group(c, () => {
        c.translate(720, cy + 2);
        c.scale(size, size);
        const first = "【新粗野主义】", rest = "风格UI组件已开源";
        c.font = "900 78px " + font;
        const w = c.measureText(first).width, left = -(w + c.measureText(rest).width) / 2;
        c.textAlign = "left";
        c.textBaseline = "middle";
        c.fillStyle = F.acid;
        c.fillText(first, left, -24);
        c.fillStyle = F.bone;
        c.fillText(rest, left + w, -24);
        c.font = '600 36px "Helvetica Neue",' + font;
        c.textAlign = "center";
        c.fillText(credit, 0, 64);
      });
    });
  }
  function releaseWall(c, f, bounds, draw2, heroCamera) {
    const pull = ease((f - 368) / 54), spread = step(f, 368, 415), gap = step(f, 448, 478), bump = recoil(f - 478);
    const anchor2 = 12, [ax, ay, aw, ah] = grid[anchor2], cx = ax + aw / 2, cy = ay + ah / 2, home = bounds[anchor2];
    c.save();
    heroCamera();
    const m = c.getTransform();
    c.restore();
    c.save();
    c.setTransform(mix(m.a, baseScale(c.canvas), pull), mix(m.b, 0, pull), mix(m.c, 0, pull), mix(m.d, baseScale(c.canvas), pull), mix(m.e, 0, pull), mix(m.f, 0, pull));
    for (let i = 0; i < grid.length; i++) {
      const [x, y, w, h] = grid[i], box = bounds[i], dx = x + w / 2 - cx, dy = y + h / 2 - cy;
      const growth = Math.exp(mix(Math.log(home.w / aw), 0, pull)), rise = Math.exp(mix(Math.log(home.h / ah), 0, pull));
      const upper = y < 520, near = y > 250 && y < 710, kick = (upper ? -1 : 1) * (near ? 134 : 129) * (gap + 0.035 * bump);
      const dist = 1 + (1 - spread) * 4.9;
      const px = mix(720, cx, pull) + dx * growth * dist, py = mix(540, cy, pull) + dy * rise * dist + kick;
      group(c, () => {
        c.translate(px, py);
        const width = w * growth, height = h * rise;
        if (i === anchor2) {
          c.scale(width / box.w, height / box.h);
          c.translate(-720, -540);
          draw2(i, 367);
          return;
        }
        const ratio = box.w / box.h, faceW = Math.min(width, height * ratio * 1.1), faceH = Math.min(height, width / ratio * 1.12);
        const depth = 5 * growth;
        rect(c, -width / 2 + depth, -height / 2 + depth, width, height, F.ink);
        rect(c, -width / 2, -height / 2, width, height, box.color, F.ink, 4 * growth);
        clip(c, -width / 2 + 2, -height / 2 + 2, width - 4, height - 4, () => {
          if (i === 0) {
            c.scale(width / box.w, height / box.h);
            c.translate(-720, -540);
            draw2(i, 700);
            return;
          }
          const full = [3, 10, 12].includes(i), fw = full ? width : faceW, fh = full ? height : faceH;
          drawFace(c, tempoPlan_default.components[i], 600, { x: -fw / 2, y: -fh / 2, w: fw, h: fh });
        });
      });
    }
    c.restore();
    title(c, gap + 0.028 * bump, f);
  }

  // drawing/selectionTour.js
  var roles = ["check", "tabs", "search", "slider", "radio", "progress", "notice"];
  var sizes3 = [[760, 190, "#ff9bc8"], [926, 210, F.bone], [850, 220, F.bone], [880, 290, "#94e8d5"], [780, 235, "#c3b3fd"], [820, 215, F.bone], [1125, 475, F.bone]];
  var wallSizes = [[1050, 310, F.bone], [850, 220, F.bone], [830, 330, F.bone], [925, 300, F.bone], [760, 190, "#ff9bc8"], [810, 196, F.bone], [880, 290, "#94e8d5"], [780, 235, "#c3b3fd"], [840, 218, F.acid], [820, 215, F.bone], [700, 405, F.cobalt], [860, 380, F.bone], [1125, 475, F.bone]];
  var toBox = ([w, h, color]) => ({ x: 720 - w / 2, y: 540 - h / 2, w, h, color });
  var wallBounds = wallSizes.map(toBox);
  var boxes = sizes3.map(toBox);
  var ramp = (f, a, b, t0, t1) => mix(t0, t1, step(f, a, b));
  function pose(i, f) {
    switch (i) {
      case 0:
        return ramp(f, 34, 41, 168, 176);
      case 1:
        return step(f, 81, 88);
      case 2:
        return f < 115 ? 53 : f < 125 ? 50 + (f - 115) * 1.8 : 68 + Math.min(19, (f - 125) * 1.7);
      case 3:
        return ramp(f, 181, 199, 226, 244);
      case 4:
        return ramp(f, 236, 244, 265, 273);
      case 5:
        return ramp(f, 279, 301, 319, 354);
      default:
        return ramp(f, 338, 346, 505, 513);
    }
  }
  function surface(c, i, f, g = {}) {
    const b = boxes[i], p = pose(i, f), depth = i === 6 ? 14 : 16;
    rect(c, b.x + depth, b.y + depth, b.w, b.h, F.ink);
    rect(c, b.x, b.y, b.w, b.h, b.color, F.ink, 6);
    if (i === 1) {
      const half = b.w / 2;
      dayStrip(c, b.x, b.y, b.w, b.h, "周六");
      const x = b.x + half * p;
      rect(c, b.x + 3, b.y + 3, b.w - 6, b.h - 6, F.bone);
      for (let j = 0; j < 2; j++) txt(c, j ? "周日" : "周六", b.x + (j + 0.5) * half, 543, 90, { align: "center", color: F.ink, weight: 850 });
      clip(c, x + 3, b.y + 3, half - 6, b.h - 6, () => {
        rect(c, x, b.y, half, b.h, F.ink);
        for (let j = 0; j < 2; j++) txt(c, j ? "周日" : "周六", b.x + (j + 0.5) * half, 543, 90, { align: "center", color: F.acid, weight: 850 });
      });
    } else drawFace(c, roles[i], p, b, g);
  }
  function about(c, x, y, sx, sy, fn) {
    if (sx <= 4e-3 || sy <= 4e-3) return;
    group(c, () => {
      c.translate(x, y);
      c.scale(sx, sy);
      c.translate(-x, -y);
      fn();
    });
  }
  function camera(c, f) {
    const u = step(f, 28, 53) * (1 - step(f, 327, 354)), z = 1 + u * (0.09 + 0.025 * Math.sin(f * 0.054));
    const r = 9e-3 * Math.sin(f * 0.061) * u;
    c.translate(720, 540);
    c.rotate(r);
    c.scale(z, z);
    c.translate(-720 - 9 * Math.sin(f * 0.048) * u, -540 - 4 * Math.sin(f * 0.073) * u);
  }
  function trans(c, i, f, a, b) {
    const p = step(f, a, b), wave = Math.sin(Math.PI * p), old = () => surface(c, i, f), next = () => surface(c, i + 1, f);
    if (i === 0) {
      const w = Math.abs(Math.cos(Math.PI * p)), cx = mix(472, 720, p);
      about(c, cx, 540, Math.max(0.01, w), 1 + 0.035 * wave, p < 0.5 ? old : next);
      if (w < 0.17) rect(c, cx - 3, 432, 6 + 9 * wave, 216, F.ink);
    } else if (i === 1) {
      const x = mix(240, 1200, p);
      clip(c, 0, 0, x, 1080, next);
      clip(c, x, 0, 1440 - x, 1080, old);
      if (wave > 0.03) rect(c, x - 3, 431, 6, 218, F.ink);
    } else if (i === 2) {
      const points = relayPhysics_default.passes[0].points, at = betweenTicks(f, (n) => Math.min(points.length - 1, Math.round((n - a) / (b - a) * (points.length - 1))));
      const src = points[0], end = points[points.length - 1], v = poseAt(points, at);
      const h = (v[0] - src[0]) / (end[0] - src[0]), x = mix(443, 565, h), y = mix(550, 568, h) + v[1] - mix(src[1], end[1], h);
      about(c, 443, 550, 1 - step(f, a, a + 9), 1 - step(f, a, a + 12), () => surface(c, 2, f, { hideIn: true }));
      const unfold = step(f, a + 5, b);
      about(c, 565, 568, unfold, unfold, () => surface(c, 3, f, { hideIn: true }));
      circle(c, x, y, 28 + 4 * p, rgb(F.bone, F.acid, p), F.ink, 6);
    } else if (i === 3) {
      about(c, 817, 568, 0.25 + 0.75 * p, 0.18 + 0.82 * p, next);
      for (let j = 0; j < 5; j++) {
        const x = 267 + j * 185, k = j - 2, fall = p * p * 620;
        group(c, () => {
          c.translate((k + (k >= 0 ? 0.5 : -0.5)) * 290 * p, fall - (j % 2 ? 370 : 690) * p);
          c.translate(x + 92, 540);
          c.rotate(k * p * 0.38);
          c.translate(-x - 92, -540);
          clip(c, x, 365, 185, 356, old);
        });
      }
    } else if (i === 4) {
      const x = 822, y = 580, r = 1190 * p;
      old();
      group(c, () => {
        c.beginPath();
        c.ellipse(x, y, Math.max(0.01, r), Math.max(0.01, r * 0.53), 0, 0, Math.PI * 2);
        c.clip();
        rect(c, 0, 0, 1440, 1080, F.cream);
        next();
      });
      if (p > 0 && p < 1) {
        c.beginPath();
        c.ellipse(x, y, r, r * 0.53, 0, 0, Math.PI * 2);
        c.strokeStyle = F.cobalt;
        c.lineWidth = 7 * (1 - p);
        c.stroke();
      }
    } else {
      const x = mix(1310, 133, p);
      clip(c, 0, 0, x, 1080, old);
      clip(c, x, 0, 1440 - x, 1080, next);
      if (wave > 0.01) {
        const hh = mix(216, 473, p);
        rect(c, x - 7 * wave, 540 - hh / 2, 14 * wave, hh, F.cobalt, F.ink, 3 * wave);
      }
    }
  }
  function tour(c, f) {
    rect(c, 0, 0, 1440, 1080, F.cream);
    if (f >= 368) {
      const draw2 = (i) => {
        if (i === 12) {
          surface(c, 6, 367);
          return;
        }
        const b = wallBounds[i];
        dayStrip(c, b.x, b.y, b.w, b.h, "周日");
      };
      releaseWall(c, f, wallBounds, draw2, () => camera(c, 368));
      return;
    }
    group(c, () => {
      camera(c, f);
      const intervals = [[52, 70], [96, 109], [151, 170], [209, 225], [258, 275], [309, 329]];
      for (let i = 0; i < intervals.length; i++) {
        const [a, b] = intervals[i];
        if (f < a) {
          surface(c, i, f);
          return;
        }
        if (f < b) {
          trans(c, i, f, a, b);
          return;
        }
      }
      surface(c, 6, f);
    });
  }

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
  function chevron2(c, x, y, r, up = false) {
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
        chevron2(c, w - 74, head * 0.55, 22, h > 225);
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
        const list2 = results(s), a = list2[0] || featured;
        rect(c, 0, 0, w, h * 0.35, F.ink);
        txt(c, s.day + "   " + a.stage, side, h * 0.18, 45, { color: F.bone, weight: 760 });
        txtRight(c, list2.length + " 场", w - side, h * 0.18, 39, F.acid);
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
        const list2 = roll > 0 ? [prior, featured] : [prior];
        txt(c, "我的周日行程", side, h * 0.15, 44, { color: F.bone, weight: 800 });
        clip(c, side - 3, h * 0.225, w * 0.47, h * 0.51, () => {
          txt(c, "01", side - 2, h * (0.48 - 0.55 * roll), h * 0.54, { font: F.num, weight: 800, color: F.acid });
          txt(c, "02", side - 2, h * (1.03 - 0.55 * roll), h * 0.54, { font: F.num, weight: 800, color: F.acid });
        });
        txtRight(c, "场演出", w - side, h * 0.53, 43, F.bone);
        rule(c, side, h * 0.69, w - side, h * 0.69, F.bone, 3);
        list2.forEach((a, i) => group(c, () => {
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
  var railCenter = 462;
  var ease2 = (t) => t * t * t * (10 + t * (-15 + 6 * t));
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
    const surface2 = id === "check" ? "#ff9bc8" : id === "slider" ? "#94e8d5" : id === "radio" ? "#c3b3fd" : col;
    shell(c, x + push, y + push, w, h + h / nh * extra, surface2, depth - push, 4);
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
  function showcase(c, elapsed) {
    const f = Math.max(0, Math.round(elapsed * 60) / 2);
    if (f >= 29) {
      tour(c, f);
      return;
    }
    const u = step(f, 0, 23), fly = ease2(u), turn = Math.sin(fly * Math.PI) * -0.047;
    const [x, y, w, h] = panels.check, cx = x + w / 2, cy = y + h / 2;
    const width = mix(1910, 1440 * w / 760, fly), scale = W / width;
    rect(c, 0, 0, W, H, F.cream);
    group(c, () => {
      c.translate(720, mix(railCenter, 540, fly));
      c.rotate(turn);
      c.scale(scale, scale);
      c.translate(-mix(800, cx, fly), -mix(532, cy, fly));
      const escape = step(f, 2, 24);
      if (escape === 0) {
        board(c, 1.38);
        return;
      }
      group(c, () => {
        c.translate(0, -escape * 950);
        masthead(c);
      });
      for (let i = 0; i < beats.length; i++) {
        const id = beats[i][0], b = panels[id], dx = b[0] + b[2] / 2 - cx, dy = b[1] + b[3] / 2 - cy;
        group(c, () => {
          if (id !== "check") {
            c.translate(dx * escape * 5.1, dy * escape * 5.1);
          } else if (f >= 19) {
            const k = step(f, 19, 28);
            c.translate(cx, cy);
            c.scale(1, Math.max(0.01, Math.abs(Math.cos(Math.PI * k))));
            c.translate(-cx, -cy);
            if (k >= 0.5) {
              c.translate(cx, cy);
              c.scale(w / 760, w / 760);
              c.translate(-720, -540);
              rect(c, 356, 461, 760, 190, F.ink);
              rect(c, 340, 445, 760, 190, "#ff9bc8", F.ink, 6);
              drawIntroCheck(c);
              return;
            }
          }
          panel(c, i, 1.38, selectionAt(1.38), 3574);
        });
      }
    });
  }
  function drawIntroCheck(c) {
    drawFace(c, "check", 168, { x: 340, y: 445, w: 760, h: 190 });
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
    await loadPhotos();
  }
  function draw(c, t) {
    showcase(c, t - 3388 / 30);
  }
  return __toCommonJS(component_entry_exports);
})();
