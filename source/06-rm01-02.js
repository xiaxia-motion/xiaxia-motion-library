// 夏夏的AI灵感 · 墨滴展开。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var import_react7 = __toESM(require_react());
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var C = { ink: "#252823", deep: "#222720", paper: "#F6F1E6", cream: "#FFF9EA", red: "#DC4833", redDark: "#A93122", sage: "#DFE9DC", butter: "#F2D680", blue: "#C5DAE5", pink: "#EEC2B3", line: "#BDBCB1", muted: "#645F52", violet: "#B8BAD7" };
  var FONT = '"Hiragino Sans GB","Heiti SC","Noto Sans CJK SC",Arial,sans-serif';
  var clamp = (n, a = 0, z = 1) => Math.max(a, Math.min(z, n));
  var mix = (a, d, u3) => a + (d - a) * u3;
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
  var Arrow = ({ x, y, opacity = 1, scale = 1, angle = 0 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: `translate(${x} ${y}) rotate(${angle - 9}) scale(${scale})`, opacity, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 1 9 39l8-12 12-2Z", fill: "#29312B", opacity: ".16", transform: "translate(2 4)" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 1 9 39l8-12 12-2Z", stroke: C.ink, strokeWidth: "2.5", strokeLinejoin: "round", fill: C.cream })
  ] });
  function blob(cx, cy, rx, ry, phase, amp) {
    const P = [];
    const n = 20;
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2;
      const wob = 1 + amp * (0.47 * Math.sin(a * 3 + phase) + 0.31 * Math.cos(a * 5 - phase * 0.82) + 0.22 * Math.sin(a * 2 - phase * 0.9));
      P.push([cx + rx * wob * Math.cos(a), cy + ry * wob * Math.sin(a)]);
    }
    let d = `M${P[0][0]} ${P[0][1]}`;
    for (let i = 0; i < n; i++) {
      const prev = P[(i + n - 1) % n], p = P[i], next = P[(i + 1) % n], next2 = P[(i + 2) % n];
      d += `C${p[0] + (next[0] - prev[0]) / 6} ${p[1] + (next[1] - prev[1]) / 6} ${next[0] - (next2[0] - p[0]) / 6} ${next[1] - (next2[1] - p[1]) / 6} ${next[0]} ${next[1]}`;
    }
    return d + "Z";
  }
  var import_react = __toESM(require_react());

  // shim:remotion
  var Easing = { bezier: (a, b, c, d) => (x) => {
    const at3 = (t, u3, v) => 3 * (1 - t) * (1 - t) * t * u3 + 3 * (1 - t) * t * t * v + t * t * t;
    let lo = 0, hi = 1;
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      if (at3(mid, a, c) < x) lo = mid;
      else hi = mid;
    }
    return at3((lo + hi) / 2, b, d);
  } };
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
  var import_jsx_runtime10 = __toESM(require_jsx_runtime());
  var fills = [C.butter, C.pink, C.blue, "#C3D3B6"];
  var import_jsx_runtime11 = __toESM(require_jsx_runtime());
  var M2 = timeline_default.marks;
  var colors = [C.butter, C.pink, C.blue, "#C6D6BD"];
  var import_jsx_runtime12 = __toESM(require_jsx_runtime());
  var import_react5 = __toESM(require_react());
  var import_jsx_runtime13 = __toESM(require_jsx_runtime());
  var WIDTH2 = 1448;
  var S2 = 1200 / WIDTH2;
  var import_jsx_runtime14 = __toESM(require_jsx_runtime());
  var C2 = { ink: "#252823", deep: "#222720", paper: "#F6F1E6", cream: "#FFF9EA", red: "#DC4833", redDark: "#A93122", sage: "#DFE9DC", butter: "#F2D680", blue: "#C5DAE5", pink: "#EEC2B3", line: "#BDBCB1", muted: "#645F52", violet: "#B8BAD7" };
  var timeline_default2 = {
    fps: 60,
    bpm: 126,
    beats: 17,
    frames: 486,
    sourceStart: 11.889666666666667,
    bodyOffsetBeats: 7,
    marks: {
      ringTap: 1,
      ringFold: 10,
      aiSettle: 1.04,
      headlineIn: 0.08,
      headlineReady: 1.37,
      lineDraw: 0.52,
      lineFull: 1.6,
      pull: 1.73,
      pullLength: 1.36,
      letterLag: 0.064,
      headerIn: 0.03,
      accountIn: 0.25,
      titleExit: 6.02,
      titleGone: 7.1,
      retract: 6.04,
      retracted: 6.74,
      shapeStart: 6.75,
      shapeDone: 7.77,
      panelIn: 6.95,
      panelReady: 8.78,
      click: 8,
      pick: 14.85
    },
    cues: [
      [
        0.04,
        "stamp",
        -17,
        -0.22
      ],
      [
        0.53,
        "penLift",
        -20,
        -0.06
      ],
      [
        1.74,
        "paperSlide",
        -13,
        0
      ],
      [
        3.18,
        "stop",
        -19,
        0.04
      ],
      [
        6.05,
        "swish",
        -19,
        0.08
      ],
      [
        6.77,
        "squeeze",
        -18,
        0
      ],
      [
        7.72,
        "detent",
        -18,
        0
      ],
      [
        8,
        "click",
        -12,
        0
      ],
      [
        8.21,
        "flick",
        -17,
        0
      ],
      [
        8.48,
        "bop",
        -15,
        -0.04
      ],
      [
        8.66,
        "bop",
        -15,
        0.3
      ],
      [
        8.84,
        "bop",
        -14,
        0.06
      ],
      [
        9.02,
        "bop",
        -14,
        -0.32
      ],
      [
        14.85,
        "type",
        -11,
        -0.09
      ],
      [
        15.08,
        "type",
        -17,
        -0.07
      ]
    ],
    footer: {
      firstRevisedFrame: 186,
      layoutFrom: 6.55,
      layoutReady: 8.18,
      enter: 7.57,
      ready: 8.72,
      raiseBottom: 72
    }
  };
  var import_jsx_runtime15 = __toESM(require_jsx_runtime());
  var M3 = timeline_default2.marks;
  var fills2 = [C2.butter, C2.pink, C2.blue, "#C3D3B6"];
  var import_react6 = __toESM(require_react());
  var import_jsx_runtime16 = __toESM(require_jsx_runtime());
  var gridLines = [
    ...Array.from({ length: 29 }, (_, i) => {
      const x = 16 + 42.15 * i;
      const wobble = Math.sin(i * 2.2);
      return { d: `M${x} -6 Q${x + wobble * 1.18} 284 ${x + wobble * 0.55} 494 T${x + 0.53 * Math.sin(i)} 906`, major: i % 4 === 0 };
    }),
    ...Array.from({ length: 22 }, (_, i) => {
      const y = 21 + 42.05 * i;
      const wobble = Math.cos(i * 1.81);
      return { d: `M-6 ${y} Q339 ${y + 0.95 * wobble} 617 ${y + 0.45 * wobble} T1206 ${y - 0.54 * wobble}`, major: i % 4 === 0 };
    })
  ];
  var import_jsx_runtime17 = __toESM(require_jsx_runtime());
  var import_jsx_runtime18 = __toESM(require_jsx_runtime());
  var m = timeline_default2.marks;
  var lineY = 573.5;
  var titleScale = 0.93;
  var oldTitleY = 441;
  var newTitleY = oldTitleY + 15;
  var titleMap = "translate(600 " + newTitleY + ") scale(" + titleScale + ") translate(-600 " + -oldTitleY + ")";
  var visibleLineY = newTitleY + titleScale * (lineY * S2 - oldTitleY);
  var inkCurve = Easing.bezier(0.23, 0.86, 0.26, 1);
  var pullCurve = Easing.bezier(0.42, 0, 0.24, 1);
  var edit_default2 = {
    fps: 60,
    totalFrames: 1620,
    titleCut: [120, 148],
    sourceEnd: 1648,
    cursorSourceRange: [553, 740],
    cursorBeats: [13.2, 13.84, 19.9],
    sourceKeyframes: { afterTitle: 250, afterCursor: 769 },
    sourceLogoSettled: 1558,
    audio: { musicStartSeconds: 0, musicGainDb: -13.3, effectGainDb: 2.5, tailFadeSeconds: 0.56 }
  };
  function inkPointer(beat) {
    const [entry, full, click] = edit_default2.cursorBeats;
    const opacity = out(beat, entry, full) * (1 - soft(beat, 22.3, 23));
    if (beat >= click) {
      return {
        x: keys(beat, [[click, 725], [22.3, 725], [24, 785]]),
        y: keys(beat, [[click, 332], [22.3, 332], [24, 418]]),
        opacity
      };
    }
    const t = 1 - Math.pow(1 - u(beat, entry, click), 1.72);
    const a = 1 - t;
    const bezier2 = (p0, p1, p2, p3) => a * a * a * p0 + 3 * a * a * t * p1 + 3 * a * t * t * p2 + t * t * t * p3;
    return { x: bezier2(852, 838, 768, 725), y: bezier2(476, 431, 353, 332), opacity };
  }
  var import_jsx_runtime19 = __toESM(require_jsx_runtime());
  var M4 = timeline_default.marks;
  var import_jsx_runtime20 = __toESM(require_jsx_runtime());
  var edit_default3 = {
    fps: 60,
    totalFrames: 1470,
    start: 525,
    visible: 526,
    arrive: 562,
    click: 569,
    join: 591,
    resumeSource: 741,
    phaseBlendFrom: 550,
    openingBlendFrom: 572,
    audioCuts: [[565, 708], [735, 742]],
    musicStartSeconds: 0,
    musicGainDb: -13.3,
    effectGainDb: 2.5
  };
  var removed = edit_default3.resumeSource - edit_default3.join;
  var titleTrim = edit_default2.titleCut[1] - edit_default2.titleCut[0];
  var beatAt = (frame) => mapClock(frame + titleTrim, edit_default.points);
  var firstVisible = inkPointer(beatAt(edit_default3.visible));
  function bezier(a, b, c, d, t) {
    const h = 1 - t;
    return h * h * h * a + 3 * h * h * t * b + 3 * h * t * t * c + t * t * t * d;
  }
  function quickChoice(frame) {
    const natural = beatAt(frame);
    const original = inkPointer(natural);
    const travel = smooth(frame, edit_default3.visible, edit_default3.arrive);
    const press = Math.sin(Math.PI * u(frame, edit_default3.click - 4, edit_default3.click + 4));
    const select = soft(frame, edit_default3.click - 3, edit_default3.click + 2);
    const hover = 0.14 * soft(frame, edit_default3.arrive - 4, edit_default3.arrive) * (1 - select);
    const cursor = frame < edit_default3.visible ? original : {
      x: bezier(firstVisible.x, 825, 765, 725, travel),
      y: bezier(firstVisible.y, 431, 346, 332, travel),
      opacity: original.opacity
    };
    const outline = mix(natural, beatAt(frame + removed), soft(frame, edit_default3.phaseBlendFrom, edit_default3.join));
    const opening = mix(natural, 17, soft(frame, edit_default3.openingBlendFrom, edit_default3.join));
    return { natural, outline, opening, press, hot: select + hover, cursor };
  }
  var import_jsx_runtime21 = __toESM(require_jsx_runtime());
  var M5 = timeline_default.marks;
  var X = 600;
  var Y = 381;
  function FastInk({ frame, names: names2 }) {
    const { outline: b, opening: g, hot, press, cursor } = quickChoice(frame);
    if (b < 12.68 || b > 25.44) return null;
    const seed = out(g, 12.68, 13.12);
    const raw = pop(g, M5.inkOpen, 15.85);
    const spread = Math.max(0, raw);
    const open = clamp(raw);
    const close = soft(b, M5.inkFold, 25);
    const cx = mix(X, 321, close), cy = Y + 3 * Math.sin(b * 0.9) * open * (1 - close);
    const rx = mix(15 + spread * 244, 49, close), ry = mix(16 + spread * 155, 49, close);
    const amp = mix(0.245, 0.108, soft(g, 13.9, 17)) * (1 - close);
    const d = blob(cx, cy, rx, ry, b * 0.44, amp);
    const local = out(g, 14.25, 15.72) * (1 - soft(b, 22.72, 23.69));
    const droplet = (j) => {
      const a = (-151 + j * 67) * Math.PI / 180, sg = u(g, 13.16 + j * 0.095, 15.13 + j * 0.095), rt = 0.3 + Math.sin(Math.PI * sg) * 1.02;
      return { x: cx + Math.cos(a) * rx * rt, y: cy + Math.sin(a) * ry * rt, r: Math.sin(Math.PI * sg) * (7 + j % 4 * 3) };
    };
    const pix = [[X - 112, Y - 59], [X + 96, Y - 59], [X - 112, Y + 62], [X + 96, Y + 62]];
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("g", { opacity: seed * (1 - soft(b, 25, 25.44)), children: [
      g < 16 && [0, 1, 2, 3, 4].map((j) => {
        const q = droplet(j);
        return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("circle", { cx: q.x, cy: q.y, r: Math.max(0, q.r), fill: C.ink }, j);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: blob(cx + 1, cy + 6, rx, ry, b * 0.44, amp), fill: C.ink, opacity: 0.11 * (1 - close) }),
      g < 16.6 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: blob(cx, cy, rx + 6, ry + 5, b * 0.44 - 0.16, amp), fill: "none", stroke: C.red, strokeWidth: "2.1", opacity: Math.sin(Math.PI * u(g, 13.04, 16.6)) * 0.7 }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d, fill: col(C.ink, C.red, soft(b, 23.78, 25)) }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("g", { opacity: local * 0.28, stroke: C.cream, strokeWidth: "1", strokeDasharray: "3 7", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: `M${X - 195} ${Y}h390 M${X} ${Y - 114}v228` }) }),
      pix.map(([xx, yy], i) => {
        const k = pop(g, 14.05 + i * 0.175, 15.55 + i * 0.175) * (1 - close);
        const x = mix(cx, xx, k), y = mix(cy, yy, k), a = i === 1 ? hot : 0;
        return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("g", { transform: `translate(${x} ${y + 7 * (1 - clamp(k))}) scale(${(0.85 + 0.15 * clamp(k)) * (1 - (i === 1 ? 0.038 * press : 0))})`, opacity: local * out(g, 14.02 + i * 0.18, 14.85 + i * 0.18), children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("rect", { x: "-75", y: "-32", width: "150", height: "64", rx: "32", fill: C.red, opacity: a }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Glyph, { x: -41, y: 0, k: i, s: 38, ink: C.cream, accent: i === 1 ? C.butter : void 0, phase: b * 0.7 }),
          label(22, 10, names2[i], 29, { fill: C.cream, textAnchor: "middle" })
        ] }, i);
      }),
      g < 13.65 && /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("circle", { cx: X, cy: Y, r: 17 + 67 * out(g, 13, 13.66), fill: "none", stroke: C.red, strokeWidth: 3.6 * (1 - u(g, 13, 13.66)), opacity: Math.sin(Math.PI * u(g, 12.95, 13.66)) }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("g", { opacity: smooth(b, 24, 25), children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("path", { d: `M${cx - 16} ${cy}h32M${cx} ${cy - 16}v32`, fill: "none", stroke: C.cream, strokeWidth: "5.7", strokeLinecap: "round" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Arrow, { ...cursor, scale: 1 - 0.105 * press })
    ] });
  }
  var names = ["\u6587\u5B57", "\u56FE\u7247", "\u97F3\u9891", "\u89C6\u9891"];
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react7.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "75 50 1050 720" }, /* @__PURE__ */ import_react7.default.createElement(FastInk, { frame: f, names }))));
  };
})();
