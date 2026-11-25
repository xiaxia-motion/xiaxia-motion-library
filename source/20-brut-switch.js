// 开演提醒滑钮 · 夏夏的AI灵感
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
    operation: () => operation,
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

  // drawing/base.js
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
  var posterPhoto = (c, x, y, w, h, fy = 0.31) => cover(c, pictures.guitar, x, y, w, h, 0.56, fy);
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
  function dayStrip(c, x, y, w, h, day) {
    const a = day === "周六" ? 0 : 1;
    ["周六", "周日"].forEach((s, i) => {
      const active = i === a;
      rect(c, x + i * w / 2, y, w / 2, h, active ? F.ink : F.bone, F.ink, 4);
      txt(c, s, x + (i + 0.5) * w / 2, y + h * 0.51, h * 0.48, { align: "center", weight: active ? 800 : 630, color: active ? F.acid : F.ink });
    });
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

  // solo.js
  function solo(c, id, def, p, state = {}) {
    const [w, h, color, lo, hi] = def;
    const b = { x: (1440 - w) / 2, y: (1080 - h) / 2, w, h };
    rect(c, 0, 0, 1440, 1080, F.cream);
    const lift = id === "button" ? Math.max(0, 1 - Math.abs(p - 0.36) * 5) * 7 : 0;
    rect(c, b.x + 15, b.y + 15, w, h, F.ink);
    b.x += lift;
    b.y += lift;
    rect(c, b.x, b.y, w, h, color, F.ink, 6);
    if (id === "tabs") {
      const half = b.w / 2;
      dayStrip(c, b.x, b.y, b.w, b.h, "周六");
      const x = b.x + half * p;
      rect(c, b.x + 3, b.y + 3, b.w - 6, b.h - 6, F.bone);
      for (let j = 0; j < 2; j++) txt(c, j ? "周日" : "周六", b.x + (j + 0.5) * half, 543, 90, { align: "center", color: F.ink, weight: 850 });
      clip(c, x + 3, b.y + 3, half - 6, b.h - 6, () => {
        rect(c, x, b.y, half, b.h, F.ink);
        for (let j = 0; j < 2; j++) txt(c, j ? "周日" : "周六", b.x + (j + 0.5) * half, 543, 90, { align: "center", color: F.acid, weight: 850 });
      });
    } else drawFace(c, id, lo + (hi - lo) * p, b, state);
  }

  // ../../../../../../../../var/folders/99/fwfmgn090cl0c1l5bc51xtcw0000gn/T/neo-4k60-MVi4O2/src/component-entry.js
  async function ready() {
  }
  function draw(c, t) {
    const v = Math.max(0, Math.min(1, (t - 0.38) / 1.42));
    operation(c, v * v * (3 - 2 * v));
  }
  function operation(c, amount, state = {}) {
    solo(c, "switch", [810, 196, "#fff9eb", 193, 203], Math.max(0, Math.min(1, amount)), state);
  }
  return __toCommonJS(component_entry_exports);
})();
