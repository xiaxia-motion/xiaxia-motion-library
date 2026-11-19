// 夏夏的AI灵感 · 横向拉开。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var MONO = '"Menlo","Courier New",monospace';
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
  var ending_time_default = {
    fps: 60,
    frames: 343,
    sourceStartFrame: 1486,
    sourceEndFrameExclusive: 1829,
    confirm: 0.12,
    pressEnd: 0.3,
    collapse: 0.38,
    rule: 0.86,
    clear: 1.13,
    wordmarkBegin: 1,
    pen: 1.1143,
    settled: 2.71
  };
  var import_jsx_runtime7 = __toESM(require_jsx_runtime());
  function SelectedVideo({ seconds }) {
    if (seconds >= ending_time_default.clear) return null;
    const press = Math.sin(Math.PI * u(seconds, 0.03, ending_time_default.pressEnd));
    const fold = soft(seconds, ending_time_default.collapse, ending_time_default.rule);
    const leave = soft(seconds, ending_time_default.rule, ending_time_default.clear);
    const confirm = soft(seconds, ending_time_default.confirm, ending_time_default.pressEnd);
    const width = mix(288, 146, fold) * (1 - leave), height = mix(68, 3.4, fold);
    const y = mix(410, 442, fold);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("g", { transform: "translate(600 " + y + ") scale(" + (1 - 0.035 * press) + " " + (1 - 0.065 * press) + ")", opacity: 1 - leave, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: -width / 2, y: -height / 2, width, height, rx: height / 2, fill: col(C.ink, "#BD4E3E", fold) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("g", { opacity: 1 - soft(seconds, ending_time_default.collapse - 0.02, ending_time_default.collapse + 0.25), children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Glyph, { x: -75, k: 3, s: 34, ink: C.cream }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("text", { x: "7", y: "10", textAnchor: "middle", fill: C.cream, fontSize: "30", fontFamily: FONT, fontWeight: "600", children: "\u89C6\u9891" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "path",
          {
            d: "M75 0l6 6 12-14",
            fill: "none",
            stroke: C.pink,
            strokeWidth: "3",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            pathLength: "1",
            strokeDasharray: "1 1",
            strokeDashoffset: 1 - confirm
          }
        )
      ] })
    ] });
  }
  var import_react4 = __toESM(require_react());
  var import_react3 = __toESM(require_react());
  var import_jsx_runtime8 = __toESM(require_jsx_runtime());
  var import_jsx_runtime9 = __toESM(require_jsx_runtime());
  var edgeOn = Math.PI * 0.496;
  var mountainCrest = "M-84 14 C-72 13 -64 5 -52 -4 C-46 -9 -42 -13 -37 -13 C-34 -13 -31 -11 -28 -9 L-11 1 C-3 6 2 7 14 7 L65 7 Q78 7 85 2";
  var sky = mountainCrest + " L124 -134 H-124 Z";
  var backMountain = mountainCrest + " Q78 15 67 16 L12 16 C0 16 -6 14 -16 8 L-35 -3 Q-38 -5 -42 -2 L-60 11 Q-72 20 -84 16 Z";
  var import_jsx_runtime10 = __toESM(require_jsx_runtime());
  var M2 = timeline_default.marks;
  var X = 600;
  var Y = 381;
  var start = 321;
  var end = 879;
  var xs = [342, 469, 595, 721];
  var colors = [C.butter, C.pink, C.blue, "#C6D6BD"];
  var PI = Math.PI;
  function ClosingVideoRow({ progress, name, gate }) {
    const width = mix(318, 288, progress), height = mix(60, 68, progress), radius = mix(14, 34, progress);
    const left = -width / 2, right = width / 2;
    const written = soft(progress, 0.08, 0.88);
    const cut = mix(left - 2, right + 2, written);
    const iconX = mix(-107, -75, progress), textX = mix(-66, -23, progress), size = mix(29, 30, progress);
    const letters = (color) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Glyph, { x: iconX, k: 3, s: mix(36, 34, progress), ink: color }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("text", { x: textX, y: "10", fill: color, fontFamily: FONT, fontSize: size, fontWeight: "600", children: name })
    ] });
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { transform: "translate(" + X + " " + Y + ")", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("clipPath", { id: "v6-active-row", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: left, y: -height / 2, width, height, rx: radius }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("clipPath", { id: "v6-row-ink", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: left - 2, y: "-45", width: Math.max(0, cut - left + 2), height: "90" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { clipPath: "url(#v6-active-row)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: left, y: -height / 2, width, height, fill: gate }),
        letters(C.ink),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("text", { x: "122", y: "5", fontSize: "15", fontFamily: MONO, fill: C.muted, opacity: 1 - soft(progress, 0, 0.31), textAnchor: "end", children: "04" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { clipPath: "url(#v6-row-ink)", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: left, y: -height / 2, width, height, fill: C.ink }),
          letters(C.cream)
        ] })
      ] })
    ] });
  }
  function RailWheel({ b, names: names2, showPointer }) {
    if (b < 24.59) return null;
    const enter = soft(b, 24.59, 25.08), pull = soft(b, M2.railPull, M2.railDone);
    const railQ = pull + 0.011 * Math.sin(PI * u(b, 29.46, 29.92));
    const hx = mix(start, end, railQ), mid = (start + hx) / 2, railLength = hx - start + 98;
    const turn = soft(b, M2.railTurn, M2.wheelForm), theta = turn * PI / 2;
    const centerX = mix(mid, X, turn);
    const len = mix(railLength, 340, turn), wid = mix(98, 339, turn);
    const fr = soft(b, timeline_default.finish.collapseFrom, timeline_default.finish.chipReady);
    if (fr === 1) return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("g", { transform: "translate(0 -29)", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(SelectedVideo, { seconds: 0 }) });
    const hFinal = mix(len, 68, fr), wFinal = mix(wid, 288, fr);
    const scroll = keys(b, [[38.3, 0], [39.5, 0], [40.7, -0.96], [42.12, 0], [43.48, 1], [44.65, 2.14], [45.08, 2]]);
    const band = soft(b, 36.6, 38.48) * (1 - fr);
    const selection = soft(b, 45.08, 45.4);
    const act = soft(b, 31.2, 32) * (1 - soft(b, 34, 35.1));
    const face = soft(turn, 0.39, 0.84);
    const base = col(C.ink, "#F8F4E7", face), ink = col(C.cream, C.ink, face);
    const iconBadge = Math.sin(Math.PI * turn) ** 1.3, textVisible = 1 - smooth(turn, 0.05, 0.25) + smooth(turn, 0.72, 0.96);
    const halfClip = Math.min(mix(282, 157, turn), hFinal / 2 - 6);
    const gateColor = col(C.red, "#F7C3AC", 0.42);
    const press = 1 - 0.12 * Math.sin(PI * u(b, 25.86, 26.23));
    const knobX = mix(hx, centerX + (len / 2 - 47 + 33 * turn) * Math.cos(theta), turn);
    const knobY = Y + turn * (len / 2 - 48 + 33 * turn) * Math.sin(theta);
    const px = keys(b, [[24.7, 288], [25.94, 328], [26.05, 329], [29.5, 889], [30.2, 864], [31.1, 748], [32, 609], [33.4, 610], [34.45, 746], [35.85, 756], [38.4, 765], [39.45, 749], [40.7, 748], [43.6, 746], [45.1, 743], [46, 802]]);
    const py = keys(b, [[24.7, 505], [25.94, 394], [29.5, 395], [30.2, 432], [32, 391], [33.4, 391], [34.6, 457], [35.85, 495], [38.4, 451], [39.45, 391], [40.7, 425], [42.12, 394], [43.48, 355], [45.1, 329], [46, 347]]);
    const dragP = b >= 26 && b <= 29.5 ? hx + 9 : px;
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { opacity: enter, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("clipPath", { id: "railMask", children: turn < 1e-3 ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: start - 49, y: Y - 50, width: railLength, height: "101", rx: "49" }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: centerX - 456, y: Y - halfClip, width: "912", height: halfClip * 2, rx: "8" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { children: [
        b < 36.9 && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { opacity: (0.4 + 0.35 * pull) * (1 - turn) * (1 - smooth(b, 29.05, 30.2)), children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", { d: `M${start} ${Y}H${end}`, stroke: C.ink, strokeDasharray: "3 9", strokeWidth: "1.5" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cx: end, cy: Y, r: "49", fill: "none", stroke: C.ink, strokeOpacity: ".34", strokeDasharray: "3 7" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { opacity: 1 - soft(fr, 0.52, 0.97), transform: `translate(${centerX} ${Y}) rotate(${turn * 90})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: -hFinal / 2 + 3, y: -wFinal / 2 + 5, width: hFinal, height: wFinal, rx: mix(49, 34, turn), fill: C.ink, opacity: 0.11 * (1 - fr) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: -hFinal / 2, y: -wFinal / 2, width: hFinal, height: wFinal, rx: mix(49, 33, turn), fill: base, stroke: C.ink, strokeWidth: 1.55 })
        ] }),
        band > 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { opacity: band, children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: X - 159, y: Y - 30, width: "318", height: "60", rx: "14", fill: gateColor, fillOpacity: fr > 0 ? 0 : 0.8 + selection * 0.2 }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", { d: `M${X - 158} ${Y + 31}h316`, stroke: C.red, strokeWidth: "1.2", opacity: ".5" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("path", { d: "M413 375l8 6-8 6m373-12-8 6 8 6", fill: "none", stroke: C.red, strokeWidth: "2" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("g", { clipPath: "url(#railMask)", children: xs.map((xx, i) => {
          if (fr > 0 && i === 3) return null;
          const delta = xx - mid;
          const v = mix(delta, (i - 1 - scroll) * 64, turn);
          const tx = centerX + v * Math.cos(theta), ty = Y + v * Math.sin(theta);
          const trigger = out(hx, xx + 32, xx + 100);
          const selected = i === 2 ? act : 0;
          const q = Math.abs(i - 1 - scroll);
          const vis = mix(1, clamp(1 - (q - 1.45) * 0.64, 0.12, 1), turn);
          const op = trigger * vis * (1 - soft(fr, 0.02, 0.63));
          const railT = 1 - turn;
          const icoX = mix(0, -107, turn), icoY = mix(-12, 0, turn);
          return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("g", { transform: `translate(${tx} ${ty})`, opacity: op, children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("rect", { x: "-47", y: "-41", width: "94", height: "82", rx: "29", fill: C.red, opacity: selected * 0.95 }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("g", { opacity: railT * 0.8, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cx: "21", cy: "-28", r: "3", fill: colors[i] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cx: icoX, cy: icoY, r: 20 * iconBadge, fill: colors[i], opacity: iconBadge }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Glyph, { x: icoX, y: icoY, k: i, s: mix(33, 36, turn), ink: col(ink, C.ink, Math.min(1, iconBadge * 1.75)), phase: b * (i === 2 && selected > 0 ? 4 : 0.5) }),
            label(mix(0, -66, turn), mix(27, 10, turn), names2[i], mix(26, 29, turn), { fill: ink, opacity: textVisible, textAnchor: turn > 0.52 ? "start" : "middle" }),
            turn > 0.65 && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("text", { x: "122", y: "5", fontSize: "15", fontFamily: MONO, fill: C.muted, opacity: smooth(turn, 0.65, 1), textAnchor: "end", children: [
              "0",
              i + 1
            ] })
          ] }, i);
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("g", { opacity: 1 - soft(b, 36.6, 37.54), children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Fab, { x: knobX, y: knobY, r: 49, scale: press * (1 - 0.65 * soft(b, 36.4, 38.25)), rot: pull * 90 + turn * 90, halo: b >= 26 && b < 27 ? u(b, 26, 27) : 0 }) }),
        fr > 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ClosingVideoRow, { progress: fr, name: names2[3], gate: gateColor }),
        showPointer && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Arrow, { x: dragP, y: py, opacity: out(b, 24.65, 25.18) * (1 - soft(b, 45.45, 46.1)), scale: 1.02 - 0.1 * Math.sin(PI * u(b, 25.8, 26.3)) })
      ] })
    ] });
  }
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
      const [start2, previous] = points[i - 1];
      const [end2, next] = points[i];
      if (frame <= end2) return mix(previous, next, (frame - start2) / (end2 - start2));
    }
    return points[points.length - 1][1];
  }
  var names = ["\u6587\u5B57", "\u56FE\u7247", "\u97F3\u9891", "\u89C6\u9891"];
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react5.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "75 50 1050 720" }, /* @__PURE__ */ import_react5.default.createElement(RailWheel, { frame: f + 178, b: mapClock(f + 178, edit_default.points), names }))));
  };
})();
