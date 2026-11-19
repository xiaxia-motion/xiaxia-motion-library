// 夏夏的AI灵感 · 环形散开。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // shim:react
  var require_react = __commonJS({
    "shim:react"(exports, module) {
      module.exports = window.React;
    }
  });
  var require_react_jsx_runtime_production = __commonJS({
    "\u89C6\u9891/01-\u77E5\u8BC6\u8BB2\u89E3/\u7701Token\u65B9\u6CD5/\u65E9\u671F\u6E90\u7801\u5DE5\u7A0B/token-saving-30s/node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
      "use strict";
      /**
       * @license React
       * react-jsx-runtime.production.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
      var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
      function jsxProd(type, config, maybeKey) {
        var key = null;
        void 0 !== maybeKey && (key = "" + maybeKey);
        void 0 !== config.key && (key = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        config = maybeKey.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== config ? config : null,
          props: maybeKey
        };
      }
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsxProd;
      exports.jsxs = jsxProd;
    }
  });
  var require_jsx_runtime = __commonJS({
    "\u89C6\u9891/01-\u77E5\u8BC6\u8BB2\u89E3/\u7701Token\u65B9\u6CD5/\u65E9\u671F\u6E90\u7801\u5DE5\u7A0B/token-saving-30s/node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production();
      } else {
        module.exports = null;
      }
    }
  });
  var import_react5 = __toESM(require_react());
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var C = { ink: "#252823", deep: "#222720", paper: "#F6F1E6", cream: "#FFF9EA", red: "#DC4833", redDark: "#A93122", sage: "#DFE9DC", butter: "#F2D680", blue: "#C5DAE5", pink: "#EEC2B3", line: "#BDBCB1", muted: "#645F52", violet: "#B8BAD7" };
  var FONT = '"Hiragino Sans GB","Heiti SC","Noto Sans CJK SC",Arial,sans-serif';
  var clamp = (n, a = 0, z = 1) => Math.max(a, Math.min(z, n));
  var mix = (a, d, u2) => a + (d - a) * u2;
  var u = (v, a, z) => clamp((v - a) / (z - a));
  var smooth = (v, a, z) => {
    const t = u(v, a, z);
    return t * t * (3 - 2 * t);
  };
  var soft = (v, a, z) => {
    const t = u(v, a, z);
    return t * t * t * (t * (t * 6 - 15) + 10);
  };
  var out = (v, a, z) => 1 - Math.pow(1 - u(v, a, z), 3);
  var pop = (v, a, z) => {
    const t = u(v, a, z);
    return 1 - Math.exp(-6.1 * t) * Math.cos(8.8 * t) * (1 - t);
  };
  var col = (a, b, t) => {
    const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16);
    return "#" + [16, 8, 0].map((s) => Math.round(mix(x >> s & 255, y >> s & 255, clamp(t))).toString(16).padStart(2, "0")).join("");
  };
  function keys(v, pts) {
    let ans = pts[0][1];
    for (let i = 1; i < pts.length; i++) {
      const [a, h] = pts[i - 1], [b, k] = pts[i];
      if (v >= a) ans = mix(h, k, soft(v, a, b));
    }
    return ans;
  }
  function label(x, y, txt, size, opts = {}) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x, y, fontFamily: FONT, fontSize: size, fontWeight: "600", fill: C.ink, ...opts, children: txt });
  }
  var Glyph = ({ k, x = 0, y = 0, s = 32, ink = C.ink, accent, phase = 0 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `translate(${x} ${y}) scale(${s / 44})`, stroke: ink, strokeWidth: "3.4", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", children: k === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-16-13h28v7M-16-13v7M-2-12v25M-10 13H6", strokeWidth: "4.5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 4h9m-4.5 0v12", strokeWidth: "2.6", opacity: ".78" })
  ] }) : k === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "-18", y: "-15", width: "36", height: "30", rx: "4" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "7", cy: "-6", r: "3.8", fill: accent || ink, stroke: "none" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-17 10l10-11L3 9l5-5 9 8" })
  ] }) : k === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [-15, -7.5, 0, 7.5, 15].map((x2, i) => {
    const h = [5, 12, 18, 10, 6][i] * (1 + 0.15 * Math.sin(phase + i * 1.7));
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${x2} ${-h}v${h * 2}`, strokeWidth: "4.2" }, i);
  }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "-18.5", y: "-13.5", width: "37", height: "27", rx: "5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m-4.3-7 12 7-12 7Z", fill: accent || ink, stroke: "none" })
  ] }) });
  var Fab = ({ x, y, r = 50, rot = 0, scale = 1, color = C.red, op = 1, halo = 0, ink = C.cream }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { opacity: op, transform: `translate(${x} ${y}) scale(${scale})`, children: [
    halo > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: r + 4 + halo * 27, fill: "none", stroke: color, opacity: (1 - halo) * 0.58, strokeWidth: "2.8" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cy: "4", r, fill: "#463D31", opacity: ".14" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r, fill: color }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { r: r - 0.85, stroke: "#30251D", strokeOpacity: ".16", fill: "none", strokeWidth: "1.7" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: `rotate(${rot})`, stroke: ink, strokeWidth: r * 0.112, strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${-r * 0.365} 0h${r * 0.73}M0 ${-r * 0.365}v${r * 0.73}` }) })
  ] });
  var Arrow = ({ x, y, opacity = 1, scale = 1, angle = 0 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) rotate(${angle - 9}) scale(${scale})`, opacity, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 1 9 39l8-12 12-2Z", fill: "#29312B", opacity: ".16", transform: "translate(2 4)" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 1 9 39l8-12 12-2Z", stroke: C.ink, strokeWidth: "2.5", strokeLinejoin: "round", fill: C.cream })
  ] });
  var import_react = __toESM(require_react());
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var WIDTH = 1448;
  var S = 1200 / WIDTH;
  var import_react2 = __toESM(require_react());
  var import_jsx_runtime3 = __toESM(require_jsx_runtime());
  var timeline_default = {
    fps: 60,
    frames: 2029,
    bpm: 126,
    sourceStart: 11.889666666666667,
    beats: 71.01500000000001,
    marks: {
      ringTap: 1,
      orbitOpened: 3.2,
      orbitTouch: 7.85,
      ringFold: 10,
      inkFall: 11,
      inkHit: 13,
      inkOpen: 13.25,
      inkSelect: 19.9,
      inkFold: 22.6,
      railReady: 25,
      railPull: 26,
      railDone: 29.5,
      railPick: 32,
      railTurn: 34.5,
      wheelForm: 37.7,
      wheelPull: 39.5,
      wheelFirst: 40.7,
      wheelSecond: 42.12,
      wheelThird: 43.48,
      wheelLock: 45.08,
      filmOpen: 47.5,
      endArt: 49.5,
      endOpen: 47.5,
      postcardReady: 49.55,
      pushIn: 49.83,
      fullBleed: 53.55,
      farRise: 48.1,
      midRise: 48.92,
      nearRise: 49.74,
      sunRise: 49.85,
      sunUp: 54.5,
      flight: 50.75,
      nameRise: 54.05,
      seal: 57.7
    },
    cues: [
      [
        1,
        "click",
        -11,
        -0.02
      ],
      [
        1.22,
        "flick",
        -12,
        -0.16
      ],
      [
        1.56,
        "bop",
        -15,
        -0.44
      ],
      [
        1.83,
        "bop",
        -15,
        0.05
      ],
      [
        2.1,
        "bop",
        -15,
        0.4
      ],
      [
        2.39,
        "bop",
        -14,
        0.1
      ],
      [
        7.85,
        "type",
        -11,
        -0.12
      ],
      [
        8.08,
        "type",
        -17,
        -0.08
      ],
      [
        10.05,
        "swish",
        -15,
        0.1
      ],
      [
        11.8,
        "dripUp",
        -16,
        -0.03
      ],
      [
        13,
        "drop",
        -9,
        -0.02
      ],
      [
        13.65,
        "wet",
        -14,
        0.05
      ],
      [
        14.3,
        "wet",
        -17,
        0.24
      ],
      [
        19.9,
        "click",
        -12,
        0.2
      ],
      [
        20.08,
        "stamp",
        -13,
        0.2
      ],
      [
        22.6,
        "squeeze",
        -12,
        0.1
      ],
      [
        25.02,
        "bop",
        -13,
        -0.34
      ],
      [
        26,
        "click",
        -11,
        -0.44
      ],
      [
        26.18,
        "pull",
        -12,
        -0.24
      ],
      [
        27.1,
        "tick",
        -17,
        -0.32
      ],
      [
        27.72,
        "tick",
        -16,
        -0.07
      ],
      [
        28.36,
        "tick",
        -16,
        0.13
      ],
      [
        29.08,
        "tick",
        -15,
        0.38
      ],
      [
        29.5,
        "stop",
        -12,
        0.47
      ],
      [
        32,
        "pluck",
        -13,
        0.18
      ],
      [
        34.55,
        "hinge",
        -12,
        0.2
      ],
      [
        37.7,
        "stop",
        -14,
        0
      ],
      [
        39.5,
        "click",
        -13,
        0.13
      ],
      [
        40.7,
        "detent",
        -13,
        -0.09
      ],
      [
        42.12,
        "detent",
        -13,
        0
      ],
      [
        43.48,
        "detent",
        -12,
        0.13
      ],
      [
        45.08,
        "clack",
        -10,
        0
      ],
      [
        47.5,
        "film",
        -12,
        -0.04
      ],
      [
        49.5,
        "chime",
        -16,
        0.09
      ],
      [
        54.35,
        "penLift",
        -20,
        -0.12
      ],
      [
        57.7,
        "stamp",
        -15,
        0.16
      ]
    ],
    bodyOffsetFrames: 200,
    openerFrames: 486,
    endingStart: 1686,
    endingFrames: 343,
    middleFrames: 1200,
    chapterChanges: [
      12.62,
      24.75,
      36.4
    ],
    finish: {
      collapseFrom: 47.5,
      chipReady: 49.55,
      quietFrom: 49.55,
      quietBy: 51.53,
      sizeSettle: 51.86
    },
    audio: {
      effectGainDb: 2.5,
      musicGainDb: -11.3
    }
  };
  var import_jsx_runtime4 = __toESM(require_jsx_runtime());
  var M = timeline_default.marks;
  var import_jsx_runtime5 = __toESM(require_jsx_runtime());
  var import_jsx_runtime6 = __toESM(require_jsx_runtime());
  var starts = [0, ...timeline_default.chapterChanges];
  var import_jsx_runtime7 = __toESM(require_jsx_runtime());
  var import_react4 = __toESM(require_react());
  var import_react3 = __toESM(require_react());
  var import_jsx_runtime8 = __toESM(require_jsx_runtime());
  var import_jsx_runtime9 = __toESM(require_jsx_runtime());
  var edgeOn = Math.PI * 0.496;
  var mountainCrest = "M-84 14 C-72 13 -64 5 -52 -4 C-46 -9 -42 -13 -37 -13 C-34 -13 -31 -11 -28 -9 L-11 1 C-3 6 2 7 14 7 L65 7 Q78 7 85 2";
  var sky = mountainCrest + " L124 -134 H-124 Z";
  var backMountain = mountainCrest + " Q78 15 67 16 L12 16 C0 16 -6 14 -16 8 L-35 -3 Q-38 -5 -42 -2 L-60 11 Q-72 20 -84 16 Z";
  var edit_default = {
    fps: 60,
    totalFrames: 1680,
    preservedHead: 269,
    preservedTail: 93,
    firstTailFrame: 1587,
    sourceTailFirstFrame: 250,
    clickFrame: 1486,
    logoSettledFrame: 1558,
    points: [
      [200, 0],
      [280, 2.8],
      [457, 7.85],
      [487, 10.05],
      [548, 13],
      [613, 15.85],
      [740, 19.9],
      [796, 22.6],
      [851, 25.02],
      [886, 26],
      [974, 29.5],
      [1057, 32],
      [1114, 34.55],
      [1200, 37.7],
      [1257, 39.5],
      [1286, 40.7],
      [1314, 42.12],
      [1343, 43.48],
      [1400, 45.08],
      [1422, 46],
      [1434, 47.5],
      [1462, 49.55],
      [1481, 51.86],
      [1486, 52]
    ],
    hoverStops: [
      { index: 1, arrival: 311, departure: 333, sound: 305 },
      { index: 2, arrival: 354, departure: 377, sound: 348 },
      { index: 3, arrival: 398, departure: 421, sound: 392 },
      { index: 0, arrival: 443, departure: 472, sound: 457 }
    ],
    endingClock: [[0, 0], [4, 0.19], [7, 0.34], [13, 0.86], [20, 1.14], [41, 1.79], [72, 2.71]],
    audio: { musicStartSeconds: 0, musicGainDb: -13.3, effectGainDb: 2.5 }
  };
  function mapClock(frame, points) {
    if (frame <= points[0][0]) return points[0][1];
    for (let i = 1; i < points.length; i++) {
      const [start, previous] = points[i - 1];
      const [end, next] = points[i];
      if (frame <= end) return mix(previous, next, (frame - start) / (end - start));
    }
    return points[points.length - 1][1];
  }
  var hub = { x: 600, y: 381 };
  var radius = 154;
  function orbitTip(angle) {
    return { x: hub.x + radius * Math.cos(angle) + 10, y: hub.y + radius * Math.sin(angle) + 9 };
  }
  function oldPointer(beat) {
    return {
      x: keys(beat, [[0, 819], [0.99, 626], [2.6, 680], [4.3, 705]]),
      y: keys(beat, [[0, 522], [0.99, 396], [2.6, 459], [4.3, 448]])
    };
  }
  function orbitPointer(frame, beat) {
    const departure = 275;
    if (frame <= departure) return oldPointer(beat);
    const stops = edit_default.hoverStops;
    if (frame < stops[0].arrival) {
      const origin = oldPointer(mapClock(departure, edit_default.points));
      const q = soft(frame, departure, stops[0].arrival);
      const target = orbitTip(0);
      return {
        x: mix(origin.x, target.x, q) + 10 * Math.sin(q * Math.PI),
        y: mix(origin.y, target.y, q) + 7 * Math.sin(q * Math.PI)
      };
    }
    for (let i = 0; i < stops.length; i++) {
      const here = stops[i], next = stops[i + 1], angle = i * Math.PI / 2;
      if (frame <= here.departure) return orbitTip(angle);
      if (next && frame < next.arrival) {
        return orbitTip(angle + Math.PI / 2 * soft(frame, here.departure, next.arrival));
      }
    }
    const top = orbitTip(1.5 * Math.PI);
    const exit = soft(frame, stops[3].departure, 507);
    return { x: mix(top.x, 676, exit), y: mix(top.y, 255, exit) };
  }
  var import_jsx_runtime10 = __toESM(require_jsx_runtime());
  var X = 600;
  var Y = 381;
  var R = 154;
  var fills = [C.butter, C.pink, C.blue, "#C3D3B6"];
  var angles = [-90, 0, 90, 180];
  function Orbit({ frame, b, names: names2 }) {
    if (b > 13.46) return null;
    const fold = soft(b, 10, 12.12);
    const fade = 1 - soft(b, 12.7, 13.45);
    const ring = out(b, 1.25, 3.3) * (1 - fold);
    const click = edit_default.hoverStops[3].sound;
    const selected = soft(frame, click - 3, click + 4) * (1 - soft(b, 10.05, 10.95));
    const pressed = Math.sin(Math.PI * u(frame, click - 3, click + 5));
    const cursor = orbitPointer(frame, b);
    const hubPress = 1 - 0.115 * Math.sin(Math.PI * u(b, 0.83, 1.25)) - 0.065 * Math.sin(Math.PI * u(b, 7.73, 8.04));
    const fall = soft(b, 11.05, 13);
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { opacity: fade, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "ellipse",
        {
          cx: X,
          cy: Y,
          rx: R,
          ry: R,
          stroke: C.ink,
          opacity: ring * 0.22,
          strokeWidth: "1.35",
          strokeDasharray: "2.5 8",
          fill: "none"
        }
      ),
      angles.map((angle, i) => {
        const go = pop(b, 1.11 + i * 0.18, 2.36 + i * 0.18);
        const turn = (1 - Math.min(1, go)) * -47;
        const ar = (angle + turn + fold * (i === 0 ? 0 : 35)) * Math.PI / 180;
        const r = R * go * (1 - (i === 0 ? soft(b, 10.3, 11.6) : fold));
        const x = X + Math.cos(ar) * r, y = Y + Math.sin(ar) * r;
        const distance = Math.hypot(cursor.x - x, cursor.y - y);
        const hover = (1 - soft(distance, 21, 63)) * soft(frame, 284, 294) * (1 - soft(b, 9.85, 10.3));
        const active = i === 0 ? selected : 0;
        const normalHover = hover * (1 - active);
        const size = (1 + 0.062 * normalHover + 0.125 * active - (i === 0 ? 0.058 * pressed : 0)) * (0.58 + 0.42 * clamp(go)) * (1 - (i === 0 ? 0.61 : 0.7) * fold);
        const opacity = out(b, 1.05 + i * 0.18, 1.36 + i * 0.18) * (1 - soft(b, i === 0 ? 10.7 : 10.2, i === 0 ? 11.72 : 11.75));
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { opacity, transform: `translate(${x} ${y}) scale(${size})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "circle",
            {
              r: 45 + normalHover * 4.5 + active * 7,
              fill: "none",
              stroke: col("#9C7256", C.red, active),
              strokeWidth: 1.7 + 0.3 * active,
              opacity: normalHover * 0.69 + active * 0.7
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cy: "3", r: "43", fill: C.ink, opacity: ".08" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "circle",
            {
              r: "43",
              fill: col(col(fills[i], "#B78861", normalHover * 0.11), C.red, active),
              fillOpacity: 0.86 + 0.14 * Math.max(active, normalHover),
              stroke: C.ink,
              strokeOpacity: 0.66 + 0.22 * normalHover,
              strokeWidth: 1.45 + 0.55 * normalHover
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Glyph, { k: i, s: 39, ink: col(C.ink, C.cream, active), phase: b * 0.9 }),
          label(0, 73, names2[i], 29, { textAnchor: "middle", opacity: out(b, 1.9 + i * 0.17, 2.9 + i * 0.17) * (1 - fold) })
        ] }, i);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        Fab,
        {
          x: X,
          y: Y,
          r: 49,
          rot: 45 * ring,
          scale: hubPress * (1 - 0.71 * soft(b, 10.5, 11.9)),
          color: col(C.red, C.ink, soft(b, 11.8, 13)),
          halo: b >= 1 && b < 2 ? u(b, 1, 2) : 0
        }
      ),
      b > 10.55 && b < 13.25 && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { opacity: out(b, 10.55, 11.05) * (1 - smooth(b, 13, 13.25)), children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ellipse", { cx: X, cy: mix(Y - R, Y, fall), rx: mix(13, 17, fall), ry: 14 + 11 * Math.sin(fall * Math.PI), fill: C.red }),
        fall > 0 && fall < 0.98 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ellipse", { cx: X + 2, cy: mix(Y - R + 1, Y - 33, fall), rx: 4 * (1 - fall) + 1, ry: 6 * (1 - fall) + 2, fill: C.red })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        Arrow,
        {
          x: cursor.x,
          y: cursor.y,
          opacity: 1 - soft(b, 9.85, 10.65),
          scale: 1.05 - 0.13 * Math.sin(Math.PI * u(b, 0.8, 1.25)) - 0.08 * pressed
        }
      )
    ] });
  }
  var names = ["\u6587\u5B57", "\u56FE\u7247", "\u97F3\u9891", "\u89C6\u9891"];
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react5.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "75 50 1050 720" }, /* @__PURE__ */ import_react5.default.createElement(Orbit, { frame: f + 28, b: mapClock(f + 28, edit_default.points), names }))));
  };
})();
