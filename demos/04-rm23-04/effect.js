// 夏夏的AI灵感 · 悬浮专注。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
      arrive: 154
    },
    outro: {
      start: 1400,
      mark: 1460,
      name: 1470
    },
    chapters: [
      146,
      430,
      754,
      1084
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
        const divisor = 10 ** (digits - i - 1), raw = value / divisor, fraction = value - Math.floor(value), carry = Math.floor(value) % divisor === divisor - 1, q = carry && fraction > 0.8 ? (fraction - 0.8) / 0.2 : 0, base = Math.floor(raw) % 10;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(x + i * size * 0.64, y - q * size * 1.15), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 0, y: 0, size, mono: true, fill, children: base }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 0, y: size * 1.15, size, mono: true, fill, children: (base + 1) % 10 })
        ] }, i);
      }) })
    ] });
  }
  var import_jsx_runtime3 = __toESM(require_jsx_runtime());
  var at = (f, keys) => {
    if (f <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (f <= keys[i][0]) return mix(keys[i - 1][1], keys[i][1], sm(f, keys[i - 1][0], keys[i][0]));
    }
    return keys[keys.length - 1][1];
  };
  var TAU = Math.PI * 2;
  function state(f) {
    const wave = sm(f, 746, 818) * (1 - sm(f, 1064, 1144)), mini = sm(f, 1200, 1270), end = sm(f, 1394, 1464);
    const x = at(f, [[94, 720], [164, 470], [376, 470], [488, 1185], [676, 1185], [818, 720], [1200, 720], [1270, 1115], [1394, 1115], [1464, 720]]);
    const y = at(f, [[94, 585], [164, 520], [676, 520], [818, 505], [1144, 510], [1200, 510], [1270, 285], [1394, 285], [1464, 450]]);
    const w = at(f, [[94, 640], [152, 632], [220, 570], [376, 570], [488, 288], [676, 288], [818, 1150], [1064, 1150], [1144, 480], [1200, 480], [1270, 430], [1394, 430], [1464, 164]]);
    const h = at(f, [[94, 1], [152, 632], [220, 570], [376, 570], [488, 288], [676, 288], [818, 395], [1064, 395], [1144, 480], [1200, 480], [1270, 110], [1394, 110], [1464, 164]]);
    const rr = at(f, [[94, 1], [152, 316], [220, 285], [376, 285], [488, 144], [676, 144], [818, 60], [1064, 60], [1144, 240], [1200, 240], [1270, 55], [1394, 55], [1464, 82]]);
    const cx = at(f, [[94, 720], [164, 470], [376, 470], [488, 1185], [676, 1185], [818, 720], [944, 720], [978, 760], [1014, 720], [1064, 720], [1144, 720], [1200, 720], [1270, 970], [1394, 970], [1464, 720]]);
    const cyBase = at(f, [[94, 585], [164, 520], [676, 520], [818, 637], [1064, 637], [1144, 510], [1200, 510], [1270, 285], [1394, 285], [1464, 450]]);
    const cy = cyBase - 88 * Math.sin(Math.PI * sm(f, 746, 818)) - 50 * Math.sin(Math.PI * sm(f, 1064, 1144));
    const turn = sm(f, 94, 164) * (1 - wave);
    const len = at(f, [[94, 640], [152, TAU * 282], [220, TAU * 254], [376, TAU * 254], [488, TAU * 121], [676, TAU * 121], [818, 1e3], [944, 1e3], [978, 1080], [1014, 1e3], [1064, 1e3], [1144, TAU * 209], [1200, TAU * 209], [1270, TAU * 26], [1394, TAU * 26], [1464, TAU * 63]]);
    const fraction = at(f, [[76, 0], [94, 1], [164, 25 / 60], [236, 25 / 60], [334, 0.75], [746, 0.75], [818, 0.18], [850, 0.18], [944, 1], [978, 1], [1014, 0.8], [1064, 0.8], [1144, 0.75], [1394, 0.75], [1464, 0.86]]);
    const minutes = 25 + 20 * sm(f, 236, 334), elapsed = Math.max(0, Math.floor((f - 1152) / 60)), seconds = f < 1152 ? 0 : (60 - elapsed % 60) % 60;
    const min = f < 1152 ? minutes : 45 - Math.ceil(elapsed / 60);
    const numx = at(f, [[94, 470], [376, 470], [488, 1185], [676, 1185], [818, 1140], [1064, 1140], [1110, 720], [1144, 720], [1200, 720], [1270, 1115], [1394, 1115], [1464, 720]]);
    const numy = at(f, [[94, 533], [676, 533], [818, 371], [1064, 371], [1110, 515], [1144, 515], [1200, 515], [1270, 302], [1394, 302], [1464, 459]]);
    const font = at(f, [[94, 104], [376, 104], [488, 54], [676, 54], [818, 43], [1064, 43], [1110, 94], [1144, 94], [1200, 94], [1270, 50], [1394, 50], [1464, 20]]);
    return { x, y, w, h, rr, cx, cy, turn, len, fraction, wave, mini, end, minutes, min, seconds, numx, numy, font };
  }
  function stadium(x, y, w, h, t) {
    const r = h / 2, d = Math.max(0, w - h);
    let z = clamp(t) * (2 * d + TAU * r);
    if (z <= d / 2) return { x: x - z, y: y + r };
    z -= d / 2;
    if (z <= Math.PI * r) {
      const a = Math.PI / 2 + z / r;
      return { x: x - d / 2 + r * Math.cos(a), y: y + r * Math.sin(a) };
    }
    z -= Math.PI * r;
    if (z <= d) return { x: x - d / 2 + z, y: y - r };
    z -= d;
    if (z <= Math.PI * r) {
      const a = -Math.PI / 2 + z / r;
      return { x: x + d / 2 + r * Math.cos(a), y: y + r * Math.sin(a) };
    }
    z -= Math.PI * r;
    return { x: x + d / 2 - z, y: y + r };
  }
  function arc(s, t) {
    const a = s.turn * TAU;
    let p;
    if (a < 1e-4) p = { x: s.cx + (t - 0.5) * s.len, y: s.cy };
    else {
      const r = s.len / a, z = (t - 0.5) * a;
      p = { x: s.cx + r * Math.sin(z), y: s.cy + r * (1 - Math.cos(z)) - 0.5 * r * (1 - Math.cos(a / 2)) };
    }
    const q = s.mini * (1 - s.end), c = stadium(s.x, s.y, s.w - 30, s.h - 30, t);
    return { x: mix(p.x, c.x, q), y: mix(p.y, c.y, q) };
  }
  var points = (s, end = 1) => Array.from({ length: 101 }, (_, i) => arc(s, i / 100 * end));
  var path = (ps) => ps.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(3)} ${p.y.toFixed(3)}`).join(" ");
  var knobAt = (f) => {
    const s = state(f), p = arc(s, s.fraction), q = s.mini * (1 - s.end);
    return { x: mix(p.x, 1284, q), y: mix(p.y, 285, q) };
  };
  var interpPoint = (f, keys) => ({ x: at(f, keys.map((k) => [k[0], k[1]])), y: at(f, keys.map((k) => [k[0], k[2]])) });
  function pointer(f) {
    const a = knobAt(236), b = knobAt(334), c = knobAt(850), d = knobAt(1014), e = knobAt(1144);
    if (f >= 1326 && f <= 1367) return { x: 274, y: 678 - 120 * sm(f, 1280, 1385), down: 0.9 * Math.sin(Math.PI * u(f, 1348, 1362)) };
    if (f >= 236 && f <= 334 || f >= 850 && f <= 1014) return { ...knobAt(f), down: 0.8 };
    const p = interpPoint(f, [[94, 1240, 860], [202, 1120, 740], [236, a.x, a.y], [334, b.x, b.y], [362, b.x + 30, b.y + 30], [470, 245, 410], [492, 245, 410], [558, 570, 460], [608, 570, 460], [650, 570, 460], [714, 790, 700], [850, c.x, c.y], [1014, d.x, d.y], [1064, 1170, 750], [1144, e.x, e.y], [1152, e.x, e.y], [1180, e.x + 65, e.y + 65], [1270, 1030, 680], [1326, 274, 678 - 120 * sm(1326, 1280, 1385)], [1367, 274, 678 - 120 * sm(1367, 1280, 1385)], [1394, 470, 730], [1460, 1400, 880]]);
    const down = Math.sin(Math.PI * u(f, 606, 621)) + 0.95 * Math.sin(Math.PI * u(f, 1148, 1162)) + 0.9 * Math.sin(Math.PI * u(f, 1348, 1362));
    return { ...p, down };
  }
  function Materials({ s }) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "ceramic", x1: "0", y1: "0", x2: ".8", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: colorMix("#fffdf6", "#506653", s.wave) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".48", stopColor: colorMix("#efeadf", "#2e4936", s.wave) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: colorMix("#ddd6c8", "#183024", s.wave) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "metal", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#c4bba9" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".25", stopColor: "#fffdf5" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".54", stopColor: "#b9b09e" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".76", stopColor: "#f5efe0" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#aaa28e" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "knob", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#eb6c51" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: ".5", stopColor: "#be3329" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#842321" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "taskface", x1: "0", y1: "0", x2: ".6", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#fffdf7" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#ece6d8" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("linearGradient", { id: "selected", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#3c5640" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#1f3528" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("radialGradient", { id: "shadow", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { stopColor: "#3e392b", stopOpacity: ".19" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("stop", { offset: "1", stopColor: "#3e392b", stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("filter", { id: "lift", x: "-40%", y: "-40%", width: "180%", height: "200%", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("feDropShadow", { dx: "0", dy: "19", stdDeviation: "16", floodColor: "#413c2c", floodOpacity: ".16" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("filter", { id: "knobshadow", x: "-80%", y: "-80%", width: "260%", height: "280%", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("feDropShadow", { dx: "1", dy: "7", stdDeviation: "5", floodColor: "#283220", floodOpacity: ".3" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("clipPath", { id: "stage", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "25", y: "157", width: "1390", height: "728", rx: "8" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("clipPath", { id: "face", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2 + 13, y: s.y - s.h / 2 + 13, width: Math.max(1, s.w - 26), height: Math.max(1, s.h - 26), rx: Math.max(0, s.rr - 13) }) })
    ] });
  }
  function Tasks({ f }) {
    const open = sm(f, 388, 488), fold = sm(f, 676, 778), pick = sm(f, 606, 636);
    if (f < 388 || f > 804) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { children: [0, 2, 1].map((i) => {
      const hover = i === 0 ? sm(f, 446, 472) * (1 - sm(f, 502, 535)) : i === 1 ? sm(f, 548, 580) * (1 - pick) : 0;
      const lift = (i === 1 ? pick : 0) + hover * 0.6;
      const cx = mix(470, [260, 580, 879][i], open), cy = mix(520, [516, 477, 532][i], open), ang = mix(0, [-15 + hover * 8, 0, 14][i], open) * (1 - fold);
      const x = mix(cx, 720, fold), y = mix(cy - 24 * lift, 505, fold), sc = mix(0.25, 1, open) * (1 + 0.12 * lift) * (1 - 0.45 * fold);
      const names = [["\u6574\u7406", "\u521B\u4F5C\u7D20\u6750"], ["\u5B8C\u6210\u4E00\u9875", "\u8BBE\u8BA1"], ["\u68B3\u7406", "\u660E\u65E5\u8BA1\u5212"]][i];
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(x, y) + ` rotate(${ang}) scale(${sc})`, filter: "url(#lift)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "-195", y: "-155", width: "390", height: "310", rx: "28", fill: i === 1 && pick > 0.5 ? "url(#selected)" : "url(#taskface)", stroke: i === 1 ? colorMix("#c9c3b5", C.red, pick) : "#cdc6b7", strokeWidth: 1 + pick * 2 }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { fill: i === 1 && pick > 0.5 ? C.cream : C.ink, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: -157, y: -111, size: 22, fill: i === 1 && pick > 0.5 ? "#b5c7ae" : C.soft, children: [
            "TASK / 0",
            i + 1
          ] }),
          names.map((t, k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: -157, y: -23 + k * 57, size: 46, weight: 600, fill: i === 1 && pick > 0.5 ? C.cream : C.ink, children: t }, k)),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: -156, y: 74, x2: 156, y2: 74, color: i === 1 && pick > 0.5 ? "#7b8d75" : "#c7c0b2" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: -157, y: 119, size: 25, fill: i === 1 && pick > 0.5 ? "#b7c6ac" : C.soft, children: i === 1 ? "45 \u5206\u949F \xB7 \u6DF1\u5EA6\u5DE5\u4F5C" : i === 0 ? "15 \u5206\u949F \xB7 \u51C6\u5907" : "20 \u5206\u949F \xB7 \u6574\u7406" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "145", cy: "-115", r: "16", stroke: i === 1 && pick > 0.5 ? "#d8e4c9" : "#a7ad9d", fill: i === 1 ? colorMix("#f9f6ee", C.red, pick) : "none", strokeWidth: "1.5" }),
          i === 1 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M136-115l6 6 12-14", fill: "none", stroke: C.cream, strokeWidth: "2.7", pathLength: "1", strokeDasharray: `${pick} 1` }) : null
        ] })
      ] }, i);
    }) });
  }
  function Document({ f }) {
    const q = sm(f, 1205, 1280), e = sm(f, 1394, 1450), scroll = 120 * sm(f, 1280, 1385), check = sm(f, 1348, 1365);
    if (f < 1205 || e >= 1) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(720, 585 + 400 * (1 - q) - 135 * e) + ` rotate(${-8 * e}) scale(${1 - 0.92 * e}) translate(-720 -585)`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "147", y: "330", width: "1146", height: "780", rx: "30", fill: "#fcfaf3", stroke: "#cdc7b8", strokeWidth: "1.4" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 199, y: 388, size: 24, fill: C.soft, children: "\u4E00\u523B / \u521B\u4F5C\u8349\u7A3F" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: 196, y: 416, x2: 1244, y2: 416 }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("clipPath", { id: "document-content", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "197", y: "434", width: "1045", height: "675" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { clipPath: "url(#document-content)", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(0, -scroll), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 230, y: 520, size: 69, weight: 600, children: "\u5B8C\u6210\u4E00\u9875\u8BBE\u8BA1" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 232, y: 576, size: 28, fill: C.soft, children: "\u5148\u505A\u597D\u773C\u524D\u8FD9\u4E00\u4EF6\u4E8B\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(258, 687), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "0", y: "-25", width: "32", height: "32", rx: "8", fill: colorMix("#f5f1e7", C.ink, check), stroke: "#7d8a74" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M7-10l7 7 12-15", fill: "none", stroke: C.cream, strokeWidth: "3", pathLength: "1", strokeDasharray: `${check} 1` }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 58, y: 1, size: 35, children: "\u786E\u5B9A\u4FE1\u606F\u5C42\u7EA7" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: "translate(258 768)", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "0", y: "-25", width: "32", height: "32", rx: "8", fill: "none", stroke: "#7d8a74" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 58, y: 1, size: 35, children: "\u5B8C\u6210\u9996\u5C4F\u4E0E\u4EA4\u4E92\u7EC6\u8282" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: "translate(850 565)", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { width: "330", height: "295", rx: "18", fill: "#e5e5d8" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "170", cy: "140", r: "96", fill: "#a2ab90" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "200", cy: "100", r: "73", fill: "#c5cbb7" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "24", y: "231", width: "186", height: "12", rx: "6", fill: C.ink }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "24", y: "255", width: "118", height: "8", rx: "4", fill: "#88987d" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: 254, y: 837, x2: 724, y2: 837 }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 258, y: 906, size: 28, fill: C.soft, children: "\u7D20\u6750\u4E0E\u7075\u611F" })
      ] }) })
    ] });
  }
  function Wave({ f, s }) {
    if (s.wave === 0) return null;
    const amp = 0.3 + 0.7 * clamp(s.fraction), center = arc(s, s.fraction).x;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: s.wave, clipPath: "url(#face)", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 202, y: 369, size: 37, fill: C.cream, weight: 600, children: "\u7EC6\u96E8" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 305, y: 369, size: 25, fill: "#bdc7b0", children: "\u73AF\u5883\u97F3" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: 1241, y: 681, size: 22, anchor: "end", fill: "#aebda2", children: [
        Math.round(clamp(s.fraction) * 100),
        "%"
      ] }),
      Array.from({ length: 49 }, (_, i) => {
        const x = 218 + i * 20.5, spread = out(f, 770 + i * 0.85, 808 + i * 0.85), envelope = Math.exp(-(((x - center) / 430) ** 2)), hh = (14 + 112 * (0.2 + 0.8 * envelope) * amp * (0.64 + 0.36 * Math.sin(i * 0.53 + f * 0.06))) * spread * (1 - sm(f, 1064, 1092));
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(x, 493), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: -4, y: -hh, width: "8", height: Math.max(0.1, 2 * hh), rx: "4", fill: i % 6 === 0 ? "#d2ac7c" : "#dce5cc", opacity: 0.35 + 0.55 * envelope }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: `M0 ${-hh + 5}V${hh - 5}`, stroke: "#f5f5dd", strokeWidth: "1", opacity: ".2" })
        ] }, i);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: Array.from({ length: 150 }, (_, i) => {
        const x = 213 + i * 6.9, env = Math.sin(Math.PI * i / 149), yy = 493 + 26 * amp * env * Math.sin(i * 0.11 - f * 0.05);
        return `${i ? "L" : "M"}${x} ${yy}`;
      }).join(" "), fill: "none", stroke: "#a8b99c", strokeWidth: "1", opacity: ".45" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 207, y: 680, size: 22, fill: "#aebda2", children: "\u8F7B" })
    ] });
  }
  function Time({ f, s }) {
    const q = out(f, 166, 192) * (1 - sm(f, 1414, 1444)), font = s.font;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(s.numx, s.numy), opacity: q, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Odo, { x: -font * 1.52, y: 0, value: s.min, size: font, fill: s.wave > 0.5 ? C.cream : C.ink, id: "minutes" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: -font * 0.21, y: 0, size: font, mono: true, fill: s.wave > 0.5 ? C.cream : C.ink, children: [
        ":",
        String(s.seconds).padStart(2, "0")
      ] })
    ] });
  }
  function Extra({ f, s }) {
    const first = sm(f, 176, 209) * (1 - sm(f, 376, 426)), mode = sm(f, 488, 512) * (1 - sm(f, 716, 756)), start = sm(f, 1105, 1135) * (1 - sm(f, 1200, 1235));
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: first, transform: tx(22 * (1 - first), 0), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 858, y: 343, size: 30, fill: C.soft, children: "\u4E13\u6CE8\u65F6\u957F" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: 850, y: 482, size: 122, weight: 500, children: [
          Math.round(s.minutes),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tspan", { fontSize: "32", dx: "15", fill: C.soft, children: "\u5206\u949F" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: 860, y: 531, x2: 1292, y2: 531 }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 860, y: 594, size: 29, fill: C.soft, children: "\u65CB\u8F6C\uFF0C\u7ED9\u4EFB\u52A1\u4E00\u4E2A\u65F6\u95F4\u3002" }),
        [15, 25, 45].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(860 + i * 144, 649), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { width: "124", height: "62", rx: "31", fill: Math.abs(v - s.minutes) < 1 ? C.ink : "#eae4d7" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(T, { x: 62, y: 41, size: 27, anchor: "middle", fill: Math.abs(v - s.minutes) < 1 ? C.cream : C.soft, children: [
            v,
            " min"
          ] })
        ] }, v))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: first, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 470, y: 425, size: 24, anchor: "middle", fill: C.soft, spacing: 6, children: "\u4E00 \u523B" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 470, y: 601, size: 28, anchor: "middle", fill: C.soft, children: "\u4E13\u6CE8\u8BA1\u65F6" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: mode, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 1185, y: 473, size: 22, anchor: "middle", fill: C.soft, children: "\u4E13\u6CE8\u65F6\u957F" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 1185, y: 589, size: 22, anchor: "middle", fill: C.soft, children: "\u5DF2\u5173\u8054\u4EFB\u52A1" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: start, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 720, y: 401, size: 26, fill: C.soft, anchor: "middle", children: "\u5B8C\u6210\u4E00\u9875\u8BBE\u8BA1" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 720, y: 585, size: 32, weight: 500, anchor: "middle", children: f < 1152 ? "\u5F00\u59CB\u4E13\u6CE8" : "\u4E13\u6CE8\u8FDB\u884C\u4E2D" })
      ] })
    ] });
  }
  var prompts = [["\u4F7F\u7528 Remotion \u5236\u4F5C\u65CB\u8F6C\u62E8\u76D8\uFF0C", "\u7528\u5206\u5C42\u9634\u5F71\u3001\u6EDA\u52A8\u6570\u5B57\u54CD\u5E94\u62D6\u62FD\u3002"], ["\u8BA9\u4EFB\u52A1\u5361\u6247\u5F62\u5C55\u5F00\u5E76\u62AC\u5347\u5438\u9644\uFF0C", "\u9009\u4E2D\u72B6\u6001\u4FDD\u7559\u540C\u4E00\u5361\u7247\u7684\u8FD0\u52A8\u3002"], ["\u5706\u73AF\u5C55\u5F00\u4E3A\u5E26\u5F39\u6027\u7684\u97F3\u91CF\u8F68\u9053\uFF0C", "\u62D6\u52A8\u5706\u94AE\uFF0C\u8BA9\u58F0\u6CE2\u968F\u5F3A\u5EA6\u4F38\u7F29\u3002"], ["\u8BA1\u65F6\u5668\u8FDE\u7EED\u7F29\u6210\u60AC\u6D6E\u80F6\u56CA\uFF0C", "\u9875\u9762\u6EDA\u52A8\u65F6\uFF0C\u4ECD\u4FDD\u6301\u4E13\u6CE8\u8FDB\u5EA6\u3002"]];
  function Labels({ f }) {
    const starts = [156, 430, 754, 1084], names = ["\u65CB\u8F6C\u62E8\u76D8", "\u78C1\u5438\u4EFB\u52A1", "\u5F39\u6027\u58F0\u573A", "\u60AC\u6D6E\u4E13\u6CE8"];
    const i = starts.reduce((a, k, j) => f >= k ? j : a, 0), q = out(f, starts[i], starts[i] + 18), show = sm(f, 150, 172) * (1 - sm(f, 1390, 1410));
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: show, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: tx(0, 12 * (1 - q)), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 69, y: 123, size: 54, mono: true, fill: C.red, weight: 700, children: String(i + 1).padStart(2, "0") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M153 82V127", stroke: "#aaa593" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 179, y: 123, size: 49, weight: 600, children: names[i] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 1367, y: 119, size: 25, anchor: "end", fill: C.soft, children: "\u4E00\u523B \xB7 \u756A\u8304\u65F6\u949F" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Line, { x: 66, y: 896, x2: 1374, y2: 896, color: "#bdb6a7" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 70, y: 956, size: 37, fill: C.red, weight: 600, children: "\u63D0\u793A\u8BCD" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M216 924V1018", stroke: "#b3a893" }),
      prompts[i].map((t, j) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 252, y: 956 + 60 * j, size: 44, spacing: -0.5, children: t }, j))
    ] });
  }
  function camera(f) {
    const z = at(f, [[94, 1], [164, 1.28], [228, 1], [280, 1.08], [376, 1], [510, 1.02], [640, 1.075], [746, 1], [900, 1], [978, 1.035], [1064, 1], [1144, 1.12], [1200, 1.08], [1270, 1]]), cx = at(f, [[94, 720], [164, 470], [376, 470], [510, 580], [746, 720]]);
    return tx(cx, 520) + ` scale(${z}) translate(${-cx} -520)`;
  }
  function Scene({ f }) {
    const s = state(f), open = out(f, 112, 154), p = knobAt(f), cursor = pointer(f), physical = 1 - s.wave, compact = sm(f, 1200, 1270), logo = sm(f, 1414, 1464), start = sm(f, 1152, 1166);
    const ticks = sm(f, 138, 202) * (1 - s.wave) * (1 - compact) * (1 - logo), numR = s.len / TAU;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Materials, { s }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { clipPath: "url(#stage)", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { transform: camera(f), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Document, { f }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Tasks, { f }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: Math.sin(Math.PI * u(f, 130, 224)) * 0.8, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ellipse", { cx: s.x, cy: s.y - 70 * Math.sin(Math.PI * u(f, 130, 224)), rx: s.w / 2 + 18, ry: s.h / 2 + 18, fill: "none", stroke: "url(#metal)", strokeWidth: "6" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ellipse", { cx: s.x, cy: s.y + 35 * Math.sin(Math.PI * u(f, 130, 224)), rx: s.w / 2 + 29, ry: s.h / 2 + 29, fill: "none", stroke: "#c9bd9f", strokeWidth: "1.5" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { "data-continuous": "timer-body", opacity: open, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ellipse", { cx: s.x + 6, cy: s.y + s.h / 2 + 18, rx: s.w * 0.57, ry: Math.min(55, s.h * 0.1), fill: "url(#shadow)" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2, y: s.y - s.h / 2 + 10, width: s.w, height: s.h, rx: s.rr, fill: "#b7af9e" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2, y: s.y - s.h / 2, width: s.w, height: s.h, rx: s.rr, fill: "url(#ceramic)", stroke: "url(#metal)", strokeWidth: "3" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: s.x - s.w / 2 + 8, y: s.y - s.h / 2 + 8, width: Math.max(1, s.w - 16), height: Math.max(1, s.h - 16), rx: Math.max(0, s.rr - 8), fill: "none", stroke: "#fffef6", strokeOpacity: 0.6 * (1 - s.wave), strokeWidth: "2" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: ticks, children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: s.cx, cy: s.cy, r: Math.max(1, numR - 33), fill: "none", stroke: "#cec7b8", strokeWidth: "1" }),
            Array.from({ length: 60 }, (_, i) => {
              const theta = i * TAU / 60 + (0.75 - s.fraction) * 0.5, rr = numR - 13, dx = Math.sin(theta), dy = -Math.cos(theta), a = i % 5 ? 7 : 16;
              return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: `M${s.cx + dx * rr} ${s.cy + dy * rr}l${-dx * a} ${-dy * a}`, stroke: i % 5 ? "#9b9f8d" : C.ink, strokeWidth: i % 5 ? 1.5 : 2.7, strokeLinecap: "round" }, i);
            })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Wave, { f, s })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Extra, { f, s }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Time, { f, s }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { "data-continuous": "red-rule-ring-track", d: path(points(s)), stroke: f < 130 ? C.red : colorMix("#d2c9b7", "#829172", s.wave), strokeWidth: f < 130 ? 6 : 4, fill: "none", strokeLinecap: "round", pathLength: "1", strokeDasharray: `${out(f, 22, 42)} 1` }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: path(points(s, s.fraction)), fill: "none", stroke: C.red, strokeWidth: 6 - 2 * compact, strokeLinecap: "round", opacity: out(f, 76, 90) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { "data-continuous": "red-control-knob", transform: tx(p.x, p.y), opacity: out(f, 76, 90), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { r: mix(22, 10, logo) - 2 * cursor.down, fill: "url(#knob)", stroke: "#f08b71", strokeWidth: "1.3", filter: "url(#knobshadow)" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M-8-6Q-1-12 8-5", fill: "none", stroke: "#fff7de", strokeWidth: "1.6", opacity: 0.7 * (1 - logo) * (1 - compact) * (1 - sm(f, 1100, 1130)) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M-6-9L9 0-6 9Z", fill: C.cream, opacity: sm(f, 1105, 1130) * (1 - sm(f, 1152, 1164)) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M-6-7V7M7-7V7", stroke: C.cream, strokeWidth: "3.4", strokeLinecap: "round", opacity: sm(f, 1152, 1164) * (1 - logo) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: logo, transform: tx(s.cx, s.cy), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: `M0 0L${32 * Math.sin(-1.2 * logo)} ${-32 * Math.cos(-1.2 * logo)}M0 0L${32 * Math.sin(1.7 * logo)} ${-32 * Math.cos(1.7 * logo)}`, stroke: C.ink, strokeWidth: "5", strokeLinecap: "round" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { r: "5", fill: C.red })
        ] }),
        f >= 1152 && f < 1198 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: p.x, cy: p.y, r: 26 + 50 * out(f, 1152, 1198), fill: "none", stroke: C.red, strokeWidth: "2", opacity: 0.6 * (1 - out(f, 1152, 1198)) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Mouse, { x: cursor.x, y: cursor.y, down: cursor.down, color: C.ink, opacity: sm(f, 194, 214) * (1 - sm(f, 1394, 1422)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Labels, { f }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("g", { opacity: out(f, 1465, 1493), children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(T, { x: 720, y: 640 + 70 * (1 - out(f, 1465, 1493)), anchor: "middle", size: 83, weight: 600, spacing: 1.5, children: "\u590F\u590F\u7684AI\u7075\u611F" }),
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
