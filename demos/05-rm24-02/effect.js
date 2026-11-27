// 夏夏的AI灵感 · 训练卡展开。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var import_react2 = __toESM(require_react());
  var timeline_default = {
    fps: 60,
    duration: 1560,
    title: {
      exit: 94,
      arrive: 166
    },
    outro: {
      start: 1394,
      mark: 1464,
      name: 1470
    },
    chapters: [
      156,
      430,
      754,
      1084
    ],
    day: {
      begin: 236,
      end: 326
    },
    card: {
      begin: 388,
      end: 488,
      click: 606,
      openEnd: 676
    },
    wheel: {
      begin: 724,
      end: 810,
      drag: 850,
      dragEnd: 970
    },
    save: {
      begin: 1064,
      end: 1140,
      press: 1160,
      finish: 1230,
      show: 1270
    },
    poses: [
      [
        0,
        720,
        585,
        640,
        0.01,
        0
      ],
      [
        94,
        720,
        585,
        640,
        0.01,
        0
      ],
      [
        166,
        720,
        520,
        392,
        430,
        52
      ],
      [
        220,
        720,
        520,
        360,
        408,
        48
      ],
      [
        388,
        720,
        520,
        360,
        408,
        48
      ],
      [
        488,
        480,
        520,
        660,
        450,
        46
      ],
      [
        724,
        480,
        520,
        660,
        450,
        46
      ],
      [
        810,
        1010,
        520,
        460,
        516,
        68
      ],
      [
        1064,
        1010,
        520,
        460,
        516,
        68
      ],
      [
        1140,
        720,
        510,
        370,
        370,
        185
      ],
      [
        1230,
        720,
        510,
        370,
        370,
        185
      ],
      [
        1300,
        1080,
        510,
        320,
        320,
        160
      ],
      [
        1394,
        1080,
        510,
        320,
        320,
        160
      ],
      [
        1464,
        720,
        450,
        164,
        164,
        82
      ]
    ],
    cues: [
      [
        22,
        "rule",
        1
      ],
      [
        38,
        "type",
        0.65
      ],
      [
        46,
        "type",
        0.65
      ],
      [
        54,
        "type",
        0.65
      ],
      [
        62,
        "type",
        0.65
      ],
      [
        94,
        "fold",
        1.1
      ],
      [
        146,
        "land",
        1
      ],
      [
        236,
        "click",
        0.8
      ],
      [
        261,
        "type",
        0.8
      ],
      [
        286,
        "type",
        0.8
      ],
      [
        314,
        "magnet",
        1.2
      ],
      [
        388,
        "page",
        1.2
      ],
      [
        448,
        "fold",
        1
      ],
      [
        488,
        "land",
        1
      ],
      [
        606,
        "click",
        1.1
      ],
      [
        640,
        "reveal",
        1
      ],
      [
        724,
        "fold",
        1.2
      ],
      [
        794,
        "land",
        1.1
      ],
      [
        850,
        "click",
        0.8
      ],
      [
        888,
        "type",
        1.1
      ],
      [
        939,
        "type",
        1.2
      ],
      [
        970,
        "magnet",
        1.3
      ],
      [
        1064,
        "page",
        1.2
      ],
      [
        1140,
        "land",
        1
      ],
      [
        1160,
        "click",
        0.9
      ],
      [
        1230,
        "save",
        1.2
      ],
      [
        1268,
        "reveal",
        1
      ],
      [
        1394,
        "fold",
        1.1
      ],
      [
        1464,
        "land",
        1.1
      ]
    ]
  };
  var import_react = __toESM(require_react());
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var C = { ink: "#233728", red: "#bd302b", paper: "#f6f2e9", page: "#f3f1ec", dark: "#1d3027", soft: "#7b8475", line: "#d6d3c9", cream: "#f7f0e2", amber: "#d3a36c" };
  var clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  var mix = (a, b, t) => a + (b - a) * t;
  var u = (f, a, b) => clamp((f - a) / (b - a));
  var sm = (f, a, b) => {
    const t = u(f, a, b);
    return t * t * (3 - 2 * t);
  };
  var out = (f, a, b) => 1 - (1 - u(f, a, b)) ** 3;
  var tx = (x, y) => `translate(${x} ${y})`;
  function track(f, ps) {
    if (f <= ps[0][0]) return { x: ps[0][1], y: ps[0][2] };
    for (let i = 1; i < ps.length; i++) {
      const a2 = ps[i - 1], b = ps[i];
      if (f <= b[0]) {
        const t = sm(f, a2[0], b[0]);
        return { x: mix(a2[1], b[1], t), y: mix(a2[2], b[2], t) };
      }
    }
    const a = ps[ps.length - 1];
    return { x: a[1], y: a[2] };
  }
  function T({ x, y, children, size = 24, fill = C.ink, weight = 400, anchor = "start", spacing = 0, mono = false, opacity = 1 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { x, y, fontFamily: mono ? '"Menlo",monospace' : '"Helvetica Neue","Hiragino Sans GB",sans-serif', fontSize: size, fontWeight: weight, fill, textAnchor: anchor, letterSpacing: spacing, opacity, children });
  }
  var Line = ({ x, y, x2, y2, color = C.line, width = 1, opacity = 1 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: `M${x} ${y}L${x2} ${y2}`, fill: "none", stroke: color, strokeWidth: width, opacity, strokeLinecap: "round" });
  var CursorVisibility = import_react.default.createContext(true);
  function Mouse({ x, y, down = 0, opacity = 1, color = C.red }) {
    const enabled = import_react.default.useContext(CursorVisibility);
    if (!enabled) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { "data-motion-cursor": "true", "data-x": x, "data-y": y, transform: tx(x, y) + ` scale(${1 - 0.12 * down})`, opacity, style: { filter: "drop-shadow(0 2px 2px #18211840)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 0 1.4 34.4 10.2 26.1 18.1 41.4 24.6 37.9 16.7 23.2 29 21.2Z", fill: color, stroke: "#fffaf0", strokeWidth: "2.2", strokeLinejoin: "round" }) });
  }
  function colorMix(a, b, t) {
    const n = (s, i) => parseInt(s.slice(i * 2 + 1, i * 2 + 3), 16);
    return "#" + [0, 1, 2].map((i) => Math.round(mix(n(a, i), n(b, i), clamp(t))).toString(16).padStart(2, "0")).join("");
  }
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var TL = timeline_default;
  var FPS = TL.fps;
  var DURATION = TL.duration;
  function Odo({ x, y, value, size = 76, digits = 2, fill = C.ink, id = "odo" }) {
    const str = String(Math.round(value)).padStart(digits, "0");
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("clipPath", { id, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x - 5, y: y - size * 0.9, width: digits * size * 0.64 + 10, height: size * 1.22 }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { clipPath: `url(#${id})`, children: [...str].map((c, i) => {
        const divisor = 10 ** (digits - i - 1), raw = value / divisor, fraction = value - Math.floor(value), carry = Math.floor(value) % divisor === divisor - 1, q = divisor === 1 ? fraction : carry && fraction > 0.8 ? (fraction - 0.8) / 0.2 : 0, base = Math.floor(raw) % 10;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(x + i * size * 0.64, y - q * size * 1.15), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 0, y: 0, size, mono: true, fill, children: base }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 0, y: size * 1.15, size, mono: true, fill, children: (base + 1) % 10 })
        ] }, i);
      }) })
    ] });
  }
  var import_jsx_runtime3 = __toESM(require_jsx_runtime());
  var D = timeline_default.day;
  var K = timeline_default.card;
  var W = timeline_default.wheel;
  var S = timeline_default.save;
  var E = timeline_default.outro;
  var LENGTH = timeline_default.duration;
  var seq = (f, k) => {
    if (f <= k[0][0]) return k[0][1];
    for (let i = 1; i < k.length; i++) if (f <= k[i][0]) return mix(k[i - 1][1], k[i][1], sm(f, k[i - 1][0], k[i][0]));
    return k[k.length - 1][1];
  };
  function state(f) {
    const p = timeline_default.poses, at = (i) => seq(f, p.map((v) => [v[0], v[i]]));
    const day = sm(f, D.begin, D.end), card = sm(f, K.begin, K.end), open = sm(f, K.click, K.openEnd), wheel = sm(f, W.begin, W.end), reps = 10 + 2 * sm(f, W.drag, W.dragEnd), save = sm(f, S.begin, S.end), press = sm(f, S.press, S.finish), end = sm(f, E.start, E.mark);
    return { x: at(1), y: at(2), w: at(3), h: at(4), r: at(5), day, card, open, wheel, reps, save, press, end, green: wheel * (1 - save) + press * (1 - end * 0.2) };
  }
  function pointer(f) {
    const p = track(f, [[0, 1470, 840], [194, 1410, 780], [D.begin, 835, 590], [D.end, 600, 590], [376, 655, 700], [488, 703, 684], [K.click, 703, 684], [K.openEnd, 810, 705], [W.drag, 1080, 625], [W.dragEnd, 1080, 425], [1024, 1190, 650], [S.end, 858, 530], [S.press, 858, 530], [S.finish, 858, 530], [1300, 1170, 665], [1394, 1350, 790], [E.mark, 1480, 890]]);
    return { ...p, down: f >= D.begin && f <= D.end || f >= W.drag && f <= W.dragEnd || f >= S.press && f <= S.finish ? 0.85 : Math.sin(Math.PI * u(f, K.click, K.click + 13)) };
  }
  function rounded(x, y, w, h, r) {
    const a = x - w / 2, b = y - h / 2;
    return `M${a + r} ${b}H${a + w - r}Q${a + w} ${b} ${a + w} ${b + r}V${b + h - r}Q${a + w} ${b + h} ${a + w - r} ${b + h}H${a + r}Q${a} ${b + h} ${a} ${b + h - r}V${b + r}Q${a} ${b} ${a + r} ${b}`;
  }
  function Defs({ s }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "ivory", x1: "0", y1: "0", x2: ".8", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: colorMix("#fffdf6", "#506653", s.green) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".48", stopColor: colorMix("#f2ede2", "#304c38", s.green) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: colorMix("#ded6c6", "#1d3227", s.green) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "metal", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#c4bba9" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".28", stopColor: "#fffdf5" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".58", stopColor: "#b9b09e" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".8", stopColor: "#f5efe0" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#aaa28e" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "weight", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#587251" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".32", stopColor: "#344d36" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".68", stopColor: "#192e20" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#3f5740" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "steel", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#8f9985" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".35", stopColor: "#f5f3df" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".55", stopColor: "#b7bda5" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#73866e" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "wheelshade", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#102319" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".3", stopColor: "#34513a" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".52", stopColor: "#415c42" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".75", stopColor: "#2e4733" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#102319" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("radialGradient", { id: "shadow", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#403b2d", stopOpacity: ".2" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#403b2d", stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("filter", { id: "lift", x: "-40%", y: "-50%", width: "180%", height: "220%", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("feDropShadow", { dx: "0", dy: "17", stdDeviation: "14", floodColor: "#3a3a2d", floodOpacity: ".15" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("clipPath", { id: "stage", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "25", y: "157", width: "1390", height: "728" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("clipPath", { id: "face", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2 + 11, y: s.y - s.h / 2 + 11, width: Math.max(1, s.w - 22), height: Math.max(1, s.h - 22), rx: Math.max(0, s.r - 11) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("clipPath", { id: "sides", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M25 158H520V880H25ZM920 158H1415V880H920Z" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("clipPath", { id: "wheelclip", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "839", y: "354", width: "342", height: "342", rx: "42" }) })
    ] });
  }
  function Dumbbell({ x, y, scale = 1, turn = 0 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(x, y) + ` rotate(${turn}) scale(${scale})`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ellipse", { cx: "0", cy: "92", rx: "180", ry: "30", fill: "url(#shadow)" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "-167", y: "-17", width: "334", height: "34", rx: "12", fill: "url(#steel)" }),
      [-1, 1].map((v) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: `scale(${v} 1)`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "80", y: "-83", width: "66", height: "166", rx: "21", fill: "url(#weight)", stroke: "#778968", strokeWidth: "1.6" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "139", y: "-59", width: "29", height: "118", rx: "11", fill: "url(#weight)" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "69", y: "-51", width: "13", height: "102", rx: "5", fill: "url(#steel)" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M96-58V53", stroke: "#a0ad87", opacity: ".6", strokeWidth: "2.5" })
      ] }, v)),
      Array.from({ length: 11 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: -48 + i * 9.6, y: -13, x2: -48 + i * 9.6, y2: 13, color: "#72826a", width: 1.3 }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 0, y: 98, size: 22, anchor: "middle", mono: true, fill: C.soft, children: "20 KG" })
    ] });
  }
  function Calendar({ f, s }) {
    const q = out(f, 138, 188) * (1 - s.card);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { opacity: q, clipPath: "url(#sides)", children: [3, 4, 5, 6, 7, 8].map((n, i) => {
      const off = n - 5 - s.day, cx = 720 + off * 274, sy = 0.92 - 0.1 * Math.min(3, Math.abs(off)), angle = off * 8;
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(cx, 525 + Math.abs(off) * 18) + ` rotate(${angle}) scale(${sy})`, filter: "url(#lift)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "-148", y: "-180", width: "296", height: "360", rx: "40", fill: "#ede7da", stroke: "#d1c8b7" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: -120, y: -90, x2: 120, y2: -90, color: "#d0c6b2" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 0, y: -121, size: 24, anchor: "middle", fill: C.soft, children: ["\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"][i] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 0, y: 55, size: 145, anchor: "middle", weight: 500, children: String(n).padStart(2, "0") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cy: "125", r: "5", fill: n < 5 ? C.ink : "#b7b7a2" })
      ] }, n);
    }) });
  }
  function Training({ f, s }) {
    const q = out(f, K.begin + 30, K.end + 20) * (1 - s.save);
    if (q <= 0) return null;
    const ww = s.wheel;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: q, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { transform: tx(mix(480, 420, ww), mix(548, 315, ww)) + ` scale(${mix(1.18, 0.8, ww)}) rotate(${-10 * (1 - ww) + 3 * Math.sin(Math.PI * s.open)})`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Dumbbell, { x: 0, y: 0 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { clipPath: "url(#face)", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: 1 - sm(f, W.begin, W.begin + 30), transform: tx(s.x - 480, s.y - 520), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 210, y: 382, size: 56, weight: 600, children: "\u4E0A\u80A2\u529B\u91CF" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 211, y: 427, size: 25, fill: C.soft, children: "11\u670806\u65E5 \xB7 \u5DF2\u5B8C\u6210\u7684\u8BAD\u7EC3" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "622", y: "653", width: "168", height: "63", rx: "31", fill: C.ink }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 706, y: 694, size: 26, anchor: "middle", fill: C.cream, children: s.open > 0.8 ? "\u7F16\u8F91\u8BB0\u5F55" : "\u8BB0\u5F55\u8BAD\u7EC3" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 210, y: 696, size: 26, fill: C.soft, children: "\u54D1\u94C3\u5367\u63A8 \xB7 3 \u7EC4" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: out(f, K.end, K.end + 32), transform: tx(mix(1090, 420, ww), mix(520, 584, ww)), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: -206, y: -167, size: 33, weight: 600, children: ww > 0.6 ? "\u54D1\u94C3\u5367\u63A8" : "\u8BAD\u7EC3\u8BB0\u5F55" }),
        [0, 1, 2].map((i) => {
          const grow = out(f, K.click + i * 12, K.openEnd + i * 12);
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(0, (i - 1) * 94), children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: -220, y: -39, width: "440", height: "78", rx: "20", fill: i === 2 ? colorMix("#eee6d7", "#e1e4d4", grow) : "#fdfaf2", stroke: i === 2 ? colorMix("#d3c8b5", C.red, grow) : "#d3c8b5", strokeWidth: i === 2 ? 1.8 : 1 }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: -191, y: 11, size: 27, fill: C.soft, children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: -20, y: 11, size: 28, anchor: "middle", children: "20 kg" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: 164, y: 12, size: 33, mono: true, anchor: "middle", fill: i === 2 ? C.red : C.ink, children: [
              i === 2 ? Math.round(s.reps) : 10,
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tspan", { fontSize: "20", children: " \u6B21" })
            ] })
          ] }, i);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: -205, y: 185, size: 27, fill: C.soft, children: [
          "\u5408\u8BA1 ",
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tspan", { fill: C.ink, fontWeight: "600", children: 20 + Math.round(s.reps) }),
          " \u6B21 \xB7 \u8BB0\u5F55\u5DF2\u5B8C\u6210\u7684\u52A8\u4F5C"
        ] })
      ] })
    ] });
  }
  function Wheel({ f, s }) {
    const q = sm(f, W.begin + 54, W.end) * (1 - sm(f, S.begin, S.begin + 25));
    if (q <= 0) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: q, clipPath: "url(#face)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 1010, y: 330, size: 28, anchor: "middle", fill: "#d3dec5", children: "\u7B2C 3 \u7EC4 \xB7 \u6B21\u6570" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "839", y: "354", width: "342", height: "342", rx: "42", fill: "url(#wheelshade)", stroke: "#819276", strokeWidth: "1.4" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { clipPath: "url(#wheelclip)", children: [
        [8, 9, 10, 11, 12, 13, 14].map((n) => {
          const d = n - s.reps, sc = Math.max(0.54, 1 - 0.2 * Math.abs(d));
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { transform: tx(1010, 526 + d * 108) + ` scale(${sc})`, opacity: Math.max(0, 1 - Math.abs(d) * 0.34), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 0, y: 40, size: 132, mono: true, weight: 500, anchor: "middle", fill: Math.abs(d) < 0.5 ? C.cream : "#91a286", children: n }) }, n);
        }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "844", y: "466", width: "332", height: "120", rx: "23", fill: "none", stroke: "#e2b48e", strokeWidth: "1.8" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M856 523l-9 6 9 6M1164 523l9 6-9 6", fill: "#dcad84" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 1010, y: 743, size: 24, anchor: "middle", fill: "#c3d1b7", children: "\u4E0A\u4E0B\u6ED1\u52A8\uFF0C\u677E\u624B\u5438\u9644" })
    ] });
  }
  function Weekly({ f, s }) {
    const q = out(f, S.show, 1300) * (1 - s.end);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: q, transform: tx(-30 * (1 - q), 0), children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 210, y: 376, size: 31, fill: C.soft, children: "\u672C\u5468\u76EE\u6807" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: 200, y: 514, size: 115, weight: 600, children: [
        "4",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tspan", { fontSize: "53", fill: C.soft, children: " / 4 \u6B21" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 210, y: 576, size: 30, children: "\u672C\u6B21\u8BB0\u5F55\u5DF2\u4FDD\u5B58" }),
      ["02", "03", "04", "06"].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(210 + i * 137, 627), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { width: "112", height: "96", rx: "23", fill: i === 3 ? C.ink : "#e4e4d6", stroke: i === 3 ? C.red : "#cbcfbc", strokeWidth: i === 3 ? 2 : 1 }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 56, y: 45, size: 32, mono: true, anchor: "middle", fill: i === 3 ? C.cream : C.ink, children: n }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M45 67l8 8 15-17", stroke: i === 3 ? C.cream : C.ink, strokeWidth: "2.8", fill: "none", strokeLinecap: "round" })
      ] }, n))
    ] });
  }
  function Seal({ f, s }) {
    const q = sm(f, S.begin + 35, S.end), done = out(f, S.finish, S.finish + 23);
    if (q <= 0) return null;
    const r = s.w / 2 - 23;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: q, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: s.x, cy: s.y, r, fill: "none", stroke: colorMix("#d1c6b2", "#71856b", s.press), strokeWidth: "7" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: s.x, cy: s.y, r, fill: "none", stroke: C.red, strokeWidth: "8", strokeLinecap: "round", pathLength: "1", strokeDasharray: `${s.press} 1`, transform: `rotate(-90 ${s.x} ${s.y})` }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: 1 - done, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: s.x, y: s.y + 12, size: 73, mono: true, weight: 500, anchor: "middle", fill: colorMix(C.ink, C.cream, sm(s.press, 0.42, 0.5)), children: [
          Math.round(s.press * 100),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tspan", { fontSize: "25", children: "%" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: s.x, y: s.y + 65, size: 28, anchor: "middle", fill: colorMix(C.ink, C.cream, sm(s.press, 0.42, 0.5)), children: "\u6309\u4F4F\u4FDD\u5B58" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { opacity: done, transform: tx(s.x, s.y) + ` scale(${mix(4, 1.7, s.end)})`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M-16 0l11 12 24-28", fill: "none", stroke: C.cream, strokeWidth: "4.5", strokeLinecap: "round", strokeLinejoin: "round", pathLength: "1", strokeDasharray: `${done} 1` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: s.x, y: s.y + 90 * (1 - s.end), size: 24 * (1 - s.end), fill: "#cbd7bd", anchor: "middle", opacity: done * (1 - s.end), children: "11 \u6708 06 \u65E5" }),
      [0, 1, 2, 3].map((i) => {
        const a = i * Math.PI / 2 - 0.6, z = u(f, S.finish, S.finish + 44);
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: `M${s.x + Math.cos(a) * (r + 38 + z * 30)} ${s.y + Math.sin(a) * (r + 38 + z * 30)}l${Math.cos(a) * 18} ${Math.sin(a) * 18}`, stroke: C.red, strokeWidth: "3", opacity: Math.sin(Math.PI * z) * 0.7 }, i);
      })
    ] });
  }
  var prompts = [["\u7528 Remotion \u5236\u4F5C\u7ACB\u4F53\u65E5\u671F\u6ED1\u9009\uFF0C", "\u8BA9\u5361\u7247\u6CBF\u5F27\u7EBF\u6EDA\u52A8\uFF0C\u677E\u624B\u5438\u9644\u3002"], ["\u5C06\u539F\u65E5\u671F\u724C\u5C55\u5F00\u6210\u8BAD\u7EC3\u5361\uFF0C", "\u7528\u6750\u8D28\u5206\u5C42\u4E0E\u8FD1\u666F\u7A81\u51FA\u63A7\u4EF6\u3002"], ["\u628A\u6B21\u6570\u8F93\u5165\u505A\u6210\u673A\u68B0\u6EDA\u8F6E\uFF0C", "\u6570\u5B57\u968F\u62D6\u52A8\u6EDA\u52A8\uFF0C\u9010\u6863\u5438\u9644\u3002"], ["\u957F\u6309\u65F6\u586B\u6EE1\u8FDB\u5EA6\u73AF\u5E76\u843D\u5370\uFF0C", "\u8BA9\u539F\u7EC4\u4EF6\u8FDE\u7EED\u6536\u6210\u5B8C\u6210\u5FBD\u7AE0\u3002"]];
  function Labels({ f }) {
    const starts = timeline_default.chapters, names = ["\u5468\u5386\u6ED1\u9009", "\u8BAD\u7EC3\u5361\u5C55\u5F00", "\u6B21\u6570\u6EDA\u8F6E", "\u957F\u6309\u6253\u5361"], i = starts.reduce((v, x, j) => f >= x ? j : v, 0), q = out(f, starts[i], starts[i] + 18), opacity = sm(f, 150, 172) * (1 - sm(f, E.start - 4, E.start + 16));
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(0, 10 * (1 - q)), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 69, y: 123, size: 54, mono: true, weight: 700, fill: C.red, children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M153 82V127", stroke: "#aaa593" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 179, y: 123, size: 49, weight: 600, children: names[i] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 1367, y: 119, size: 25, anchor: "end", fill: C.soft, children: "\u5FAA\u7EC3 \xB7 \u8BAD\u7EC3\u8BB0\u5F55" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: 66, y: 896, x2: 1374, y2: 896, color: "#bdb6a7" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 70, y: 956, size: 37, fill: C.red, weight: 600, children: "\u63D0\u793A\u8BCD" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M216 924V1018", stroke: "#b3a893" }),
      prompts[i].map((t, j) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 252, y: 956 + 60 * j, size: 44, spacing: -0.5, children: t }, j))
    ] });
  }
  function Scene({ f }) {
    const s = state(f), p = pointer(f), q = out(f, 112, 166), first = out(f, 166, 194) * (1 - s.card), cam = seq(f, [[94, 1], [166, 1.17], [220, 1], [376, 1], [488, 1.04], [676, 1.04], [810, 1], [900, 1.06], [1024, 1], [1140, 1.05], [1230, 1.05], [1300, 1]]), camx = mix(720, 1010, s.wheel * (1 - s.save));
    const redDraw = out(f, 22, 42) * mix(0.5, 1, sm(f, 94, 166));
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Defs, { s }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { clipPath: "url(#stage)", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(camx, 520) + ` scale(${cam}) translate(${-camx} -520)`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Calendar, { f, s }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Weekly, { f, s }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { "data-continuous": "date-card-wheel-seal", opacity: q, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ellipse", { cx: s.x + 5, cy: s.y + s.h / 2 + 21, rx: s.w * 0.6, ry: Math.min(55, s.h * 0.1), fill: "url(#shadow)" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2, y: s.y - s.h / 2 + 10, width: s.w, height: s.h, rx: s.r, fill: "#b7af9e" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2, y: s.y - s.h / 2, width: s.w, height: s.h, rx: s.r, fill: "url(#ivory)", stroke: "url(#metal)", strokeWidth: "3" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2 + 8, y: s.y - s.h / 2 + 8, width: Math.max(1, s.w - 16), height: Math.max(1, s.h - 16), rx: Math.max(0, s.r - 8), fill: "none", stroke: "#fffef6", strokeOpacity: 0.6 * (1 - s.green), strokeWidth: "2" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: first, clipPath: "url(#face)", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: s.x, y: s.y - 132, size: 27, anchor: "middle", fill: C.soft, children: [
            "11 \u6708 \xB7 \u661F\u671F",
            s.day > 0.5 ? "\u4E94" : "\u56DB"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: s.x - s.w / 2 + 30, y: s.y - 100, x2: s.x + s.w / 2 - 30, y2: s.y - 100, color: "#cfc5b2" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Odo, { x: s.x - 124, y: s.y + 63, value: 5 + s.day, size: 192, digits: 2, fill: C.ink, id: "day" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: s.x, y: s.y + 143, size: 27, fill: C.red, anchor: "middle", children: "\u4ECA\u5929\uFF0C\u7559\u4E0B\u4E00\u6B21\u8FDB\u6B65\u3002" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Training, { f, s }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Wheel, { f, s }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Seal, { f, s }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { "data-continuous": "red-title-rule", d: rounded(s.x, s.y, s.w, s.h, s.r), fill: "none", stroke: C.red, strokeWidth: mix(6, 3.5, s.card), strokeLinecap: "round", pathLength: "1", strokeDasharray: `${redDraw} 1` }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Mouse, { x: p.x, y: p.y, down: p.down, color: C.ink, opacity: sm(f, 194, 214) * (1 - sm(f, E.start, E.start + 28)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Labels, { f }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: out(f, E.name, E.name + 28), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 720, y: 640 + 70 * (1 - out(f, E.name, E.name + 28)), anchor: "middle", size: 83, weight: 600, spacing: 1.5, children: "\u590F\u590F\u7684AI\u7075\u611F" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 720, y: 701, anchor: "middle", size: 25, fill: C.soft, spacing: 7, children: "\u628A\u7075\u611F\u505A\u6210\u4F5C\u54C1" })
      ] })
    ] });
  }
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "0 95 1440 800" }, /* @__PURE__ */ import_react2.default.createElement(Scene, { f }))));
  };
})();
