// 折线图切换与选点 · 夏夏的AI灵感 · MIT
(() => {
  // geometry.js
  var config = Object.assign({ "id": "line", "scene": ["graph", "曲线图 · 折线图", "Data visualization", 652, 31, 692, 722, 777, 809, 847], "name": "折线图切换与选点", "view": [87, 159, 826, 469], "frames": [805, 893], "how": "在折线上指向数据点或拖动。左右键逐日选点。", "prompt": "沿用七天收听量图表的同一坐标系。点击折线后，让已有平滑曲线连续变为逐点相连的折线，节点随之显现。然后选周五，光环、竖虚线和气泡共同落到 5600 的位置，保留过渡过程。", "params": "原片第 809 帧点击折线，在第 810 至 827 帧之间混合两种线形，第 847 帧选择数据点。", "originalIndex": 5, "fps": 60, "start": 13.416666666666666, "end": 14.883333333333333, "speed": 1 }, window.effectSettings || {});
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
  (() => {
    "use strict";
    const root = typeof window === "undefined" ? globalThis : window;
    const values = [3400, 5200, 4600, 6800, 5600, 7400, 8640];
    const xs = values.map((_, i) => 390 + i * 110), ys = values.map((v) => 710 - v * 0.025);
    const slopes = ys.slice(1).map((y, i) => (y - ys[i]) / 110);
    const tangent = ys.map((_, i) => i === 0 ? slopes[0] : i === ys.length - 1 ? slopes.at(-1) : slopes[i - 1] * slopes[i] <= 0 ? 0 : 2 * slopes[i - 1] * slopes[i] / (slopes[i - 1] + slopes[i]));
    const segments = slopes.map((_, i) => ({ x0: xs[i], y0: ys[i], x1: xs[i] + 110 / 3, y1: ys[i] + tangent[i] * 110 / 3, x2: xs[i + 1] - 110 / 3, y2: ys[i + 1] - tangent[i + 1] * 110 / 3, x3: xs[i + 1], y3: ys[i + 1] }));
    const clamp2 = (x) => Math.max(0, Math.min(1, x));
    function yAt(x) {
      const i = Math.max(0, Math.min(5, Math.floor((x - xs[0]) / 110))), s = segments[i], u = clamp2((x - s.x0) / 110), v = 1 - u;
      return v * v * v * s.y0 + 3 * v * v * u * s.y1 + 3 * v * u * u * s.y2 + u * u * u * s.y3;
    }
    const number = (n) => Number(n.toFixed(6));
    const path = `M${xs[0]} ${ys[0]} ` + segments.map((s) => `C${number(s.x1)} ${number(s.y1)} ${number(s.x2)} ${number(s.y2)} ${s.x3} ${s.y3}`).join(" ");
    root.IceCurve = { values, xs, ys, tangent, segments, path, yAt, valueAt: (x) => (710 - yAt(x)) / 0.025 };
  })();
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
  function angleArc(x, y, r, from, to, col, w) {
    if (r <= 0 || to <= from) return;
    g.beginPath();
    g.arc(x, y, r, from, to);
    g.strokeStyle = col;
    g.lineWidth = w;
    g.stroke();
  }
  var chartX = 211;
  var chartW = 591;
  function chartValue(u, straight) {
    const at = clamp(u) * 6, i = Math.min(5, Math.floor(at));
    return mix(IceCurve.valueAt(390 + 660 * clamp(u)), mix(IceCurve.values[i], IceCurve.values[i + 1], at - i), straight);
  }
  function graphPoint(u, straight) {
    return [chartX + chartW * u, 508 - (chartValue(u, straight) - 3e3) * 0.0232];
  }
  function graphState(s, f) {
    if (live) {
      const u2 = live.u, straight2 = config.id === "line" ? 1 : 0;
      return { straight: straight2, u: u2, draw: 1, tip: 1, hand: graphPoint(u2, straight2), modePress: 0 };
    }
    const [curve, grab, stop, line, point] = s.slice(5), straight = phase(f, line + 1, line + 18);
    const scrub = mix(1 / 6, 1, phase(f, grab, stop)), endU = mix(1, 4 / 6, phase(f, point - 1, point + 8));
    const u = f < point - 1 ? scrub : endU, p = graphPoint(u, straight), start = graphPoint(1 / 6, 0), end = graphPoint(1, 0), picked = graphPoint(4 / 6, 1);
    const hand = f >= grab - 2 && f <= stop + 4 ? [p[0], p[1]] : handPath(f, [[curve - 3, 630, 264], [curve + 5, 630, 264], [grab - 2, ...start], [stop + 4, ...end], [line - 4, 746, 264], [line + 5, 746, 264], [point - 4, ...picked], [point + 12, ...picked]]);
    return { straight, u, hand, draw: phase(f, curve + 1, curve + 26), tip: phase(f, grab - 2, grab + 9), modePress: Math.max(pressure(f, curve), pressure(f, line)) };
  }
  function graphPicture(s, f, z) {
    const st = graphState(s, f), [a, b, c, d, e] = s.slice(5), value = chartValue(st.u, st.straight);
    tx("收听趋势", 256, 236, 26, P.light, 720);
    tx(Math.round(st.tip ? mix(IceCurve.values[6], value, st.tip) : chartValue(st.draw, 0)).toLocaleString("en-US"), 256, 281, 50, P.light, 720, "left", "display");
    const field = st.straight > 0.5 ? 1 : 0;
    ["曲线", "折线"].forEach((name, i) => {
      const cx = 627 + i * 118, k = pressure(f, i ? d : a);
      tx(name, cx, 264 + 4 * k, 24, field === i ? P.ink : P.light, 720, "center");
    });
    const bottom = 534, top = 342;
    [3e3, 6e3, 9e3].forEach((v) => {
      const y = 508 - (v - 3e3) * 0.0232;
      stroke([[chartX, y], [chartX + chartW, y]], P.sep, 1);
      tx(v / 1e3 + "k", chartX - 19, y, 14, P.sub, 550, "right", "mono");
    });
    "一二三四五六日".split("").forEach((t, i) => tx("周" + t, chartX + chartW * i / 6, bottom + 13, 15, P.sub, 560, "center"));
    const pts = [];
    for (let i = 0; i <= 120; i++) {
      let u = i / 120 * st.draw;
      pts.push(graphPoint(u, st.straight));
    }
    if (st.draw > 5e-3) {
      poly([[chartX, bottom - 5], ...pts, [pts.at(-1)[0], bottom - 5]], "#59415d");
      stroke(pts, P.pink, 5);
      stroke(pts.map(([x, y]) => [x, y - 1.5]), "#ffd2cd", 1.2);
      for (let i = 0; i < 7; i++) if (i / 6 <= st.draw) {
        const [x, y] = graphPoint(i / 6, st.straight);
        circle(x, y, 3.9 + 2.2 * st.straight, P.dark);
        angleArc(x, y, 3.9 + 2.2 * st.straight, 0, Math.PI * 2, P.pink, 2);
      }
    }
    if (st.tip > 1e-3) {
      const [x, y] = graphPoint(st.u, st.straight);
      g.save();
      g.setLineDash([3, 6]);
      stroke([[x, y + 8], [x, bottom - 5]], P.sub, 1.4);
      g.restore();
      placed(x, y, st.tip, st.tip, () => {
        angleArc(0, 0, 11, 0, Math.PI * 2, P.mint, 2);
        circle(0, 0, 4.2, P.mint);
      });
      const xx = Math.min(771, Math.max(245, x)), yy = y - 20;
      placed(xx, yy, st.tip, st.tip, () => {
        rr(-64, -60, 128, 57, 15, P.mint);
        poly([[-6, -5], [0, 2], [7, -5]], P.mint);
        const slot = Math.min(6, st.u * 6), dow = "一二三四五六日"[Math.floor(slot)], hour = Math.floor(slot % 1 * 24 + 1e-6);
        tx("周" + dow + (hour ? " " + String(hour).padStart(2, "0") + "时" : ""), 0, -46, 13, P.ink, 580, "center");
        tx(Math.round(value).toLocaleString("en-US"), 0, -23, 23, P.ink, 720, "center", "mono");
      });
    }
  }
  var box = (x, y, w, h, r1, r2 = r1, r3 = r1, r4 = r1) => [x, y, w, h, r1, r2, r3, r4];
  function state(s, f) {
    const [id, , , start, , a, b, c, d] = s, q = phase(f, a, a + 17), press = pressure(f, a), second = b === void 0 ? 0 : phase(f, b, b + 15), hit = b === void 0 ? 0 : pressure(f, b);
    let palette = 0;
    let B, A, K, hand = [700, 447], artId = config.originalIndex > 3 ? 1 : 0, grid = 0, night = 0, thick = 0, spin = 0, flip = 0;
    switch (id) {
      case "graph": {
        const t = graphState(s, f);
        B = box(111, 183, 778, 421, 44, 69, 44, 32);
        A = box(146, 221, 81, 83, 28);
        K = box(574 + 118 * t.straight, 238 + 4 * t.modePress, 107, 53 - 2 * t.modePress, 27);
        hand = t.hand;
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
      case "graph":
        graphPicture(s, f, z);
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
