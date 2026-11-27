// 夏夏的AI灵感 · 边缘回执。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
    frames: 1470,
    bodyStart: 150,
    bodyEnd: 1350,
    section: 300,
    titleReveal: [
      0,
      65
    ],
    opening: [
      78,
      166
    ],
    ending: [
      1350,
      1470
    ]
  };
  var import_react = __toESM(require_react());

  // shim:remotion
  var staticFile = (name) => (window.effectAssets || {})[name] || (/paper|grain/.test(name) ? "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cfilter%20id%3D%22p%22%3E%3CfeTurbulence%20baseFrequency%3D%22.8%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Cpath%20fill%3D%22%23f7f1e4%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3Cpath%20filter%3D%22url(%23p)%22%20opacity%3D%22.075%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3C%2Fsvg%3E" : "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22s%22%20x2%3D%22.5%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7ded2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9aa71%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23s)%22%20d%3D%22M0%200h600v400H0z%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22149%22%20r%3D%2251%22%20fill%3D%22%23eea464%22%2F%3E%3Cpath%20d%3D%22M0%20283l100-77%2054%2022%2087-78%20194%20124%2095-58%2070%2044v140H0%22%20fill%3D%22%237b958a%22%2F%3E%3Cpath%20d%3D%22M0%20308l141-53%2078%2021%2099-54%20151%2071%20131-29v136H0%22%20fill%3D%22%23365a54%22%2F%3E%3C%2Fsvg%3E");
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  var TIMING = timeline_default;
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
  var asset = (n) => staticFile(n);
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
  function Window({ title, children, bg = C.page, dark = false, tag }) {
    const ink = dark ? C.cream : C.ink;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "65", y: "170", width: "1310", height: "696", rx: "25", fill: bg }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "65", y: "170", width: "1310", height: "78", fill: dark ? "#252d26" : "#faf8f2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M65 248H1375", stroke: dark ? "#465044" : "#dddbd1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: "translate(112 209)", stroke: C.red, strokeWidth: "3", strokeLinecap: "round", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-10 0H10M0-10V10" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { x: 146, y: 219, size: 27, weight: 600, fill: ink, children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { x: 1310, y: 218, size: 22, fill: dark ? "#9ba992" : "#89907f", anchor: "end", children: tag || "\u590F\u590F\u7684AI\u7075\u611F" }),
      children
    ] });
  }
  function Button({ x, y, w = 240, h = 74, label, active = false, down = 0, fill, ink }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: tx(x + w / 2, y + h / 2) + ` scale(${1 - 0.025 * down}) translate(${-x - w / 2} ${-y - h / 2})`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x, y: y + 3, width: w, height: h, rx: h / 2, fill: "#263a25", opacity: ".08" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x, y, width: w, height: h, rx: h / 2, fill: fill || (active ? C.dark : "#faf8f2"), stroke: active ? C.dark : "#bbc0b1", strokeWidth: "1.4" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T, { x: x + w / 2, y: y + h / 2 + 10, size: 28, weight: 500, anchor: "middle", fill: ink || (active ? C.cream : C.ink), children: label })
    ] });
  }
  function colorMix(a, b, t) {
    const n = (s, i) => parseInt(s.slice(i * 2 + 1, i * 2 + 3), 16);
    return "#" + [0, 1, 2].map((i) => Math.round(mix(n(a, i), n(b, i), clamp(t))).toString(16).padStart(2, "0")).join("");
  }
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var S = TIMING.section;
  var B = { expand: 28, read: 158, spread: 323, mark: 452, save: 625, toast: 648, undo: 744, archive: 930, arrive: 1004 };
  function Defs() {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "no-ink", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { stopColor: "#3f5740" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: ".5", stopColor: "#243d2c" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "1", stopColor: "#14291f" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "no-paper", x1: "0", x2: "1", y1: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { stopColor: "#fffdf5" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "1", stopColor: "#e9e2d1" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "no-edge", x1: "0", x2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { stopColor: "#dbbb88" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: ".4", stopColor: "#f3ecd6" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "1", stopColor: "#9aaa8b" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("pattern", { id: "no-grain", width: "7", height: "7", patternUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "1", cy: "1", r: ".55", fill: "#e1e6cc", opacity: ".13" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "5", cy: "4", r: ".5", fill: "#111f14", opacity: ".17" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("filter", { id: "no-shadow", x: "-45%", y: "-60%", width: "190%", height: "230%", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feDropShadow", { dx: "0", dy: "17", stdDeviation: "15", floodColor: "#213623", floodOpacity: ".19" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("filter", { id: "no-blur", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("feGaussianBlur", { stdDeviation: "4" }) })
    ] });
  }
  function Bell({ x, y, s = 1, ring = 0, fill = C.red }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(x, y) + ` scale(${s})`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { r: "29", fill }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: `rotate(${ring} 0 -9)`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M-14 8H14L10 2V-6Q10-17 0-17Q-10-17-10-6V2Z", stroke: C.cream, strokeWidth: "2.4", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M-4 13Q0 19 4 13M0-21V-18", stroke: C.cream, strokeWidth: "2.4", fill: "none", strokeLinecap: "round" })
      ] })
    ] });
  }
  function TinyCover({ x, y, w = 122, h = 80, id = "no-cover" }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("clipPath", { id, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x, y, width: w, height: h, rx: "10" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("image", { x, y, width: w, height: h, href: asset("sunrise.jpg"), preserveAspectRatio: "xMidYMid slice", clipPath: `url(#${id})` })
    ] });
  }
  function Workspace({ dim = 0.38 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: dim, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 147, y: 307, size: 30, weight: 600, children: "\u5C71\u91CE\u4F5C\u54C1\u96C6" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 1297, y: 307, size: 22, anchor: "end", fill: C.soft, children: "\u6700\u8FD1\u66F4\u65B0 \xB7 \u521A\u521A" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "145", y: "350", width: "1150", height: "427", rx: "25", fill: "#e8e7db", stroke: "#d5d9c8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TinyCover, { x: 182, y: 389, w: 416, h: 250, id: "no-workcover" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 642, y: 426, size: 29, weight: 600, children: "\u4ECE\u5C71\u91CE\uFF0C\u627E\u5230\u65B0\u7684\u7075\u611F" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 642, y: 470, size: 23, fill: C.soft, children: "\u9879\u76EE\u5C01\u9762 / \u4F5C\u54C1\u518C / \u89C6\u89C9\u6807\u8BB0" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Line, { x: 642, y: 499, x2: 1247, y2: 499 }),
      ["\u9879\u76EE\u7D20\u6750", "\u534F\u4F5C\u8BB0\u5F55", "\u7248\u672C\u5386\u53F2"].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: 642 + i * 205, y: "533", width: "184", height: "78", rx: "13", fill: "#f6f4e9" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 734 + i * 205, y: 581, size: 25, anchor: "middle", children: v })
      ] }, v)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "184", y: "674", width: "270", height: "39", rx: "19", fill: "#dce2cf" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 319, y: 701, size: 20, anchor: "middle", fill: C.soft, children: "3 \u9879\u7D20\u6750 \xB7 \u79C1\u6709\u9879\u76EE" })
    ] });
  }
  var messages = [["\u4F5C\u54C1\u96C6\u5DF2\u540C\u6B65", "24 \u9875\u5185\u5BB9\u4E0E 3 \u9879\u7D20\u6750\u5DF2\u4FDD\u5B58", "\u521A\u521A"], ["\u5C01\u9762\u6536\u5230\u65B0\u8BC4\u8BBA", "\u6709 2 \u6761\u5EFA\u8BAE\uFF0C\u7B49\u5F85\u4F60\u7684\u67E5\u770B", "2 \u5206\u949F"], ["\u7248\u672C\u5DF2\u5F52\u6863", "\u4E0A\u4E00\u7248\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u968F\u65F6\u56DE\u770B", "5 \u5206\u949F"]];
  function StackScene({ f }) {
    const spread = sm(f, B.spread, B.spread + 49), read = sm(f, B.mark, B.mark + 23);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 147, y: 307, size: 31, weight: 600, children: "\u76F8\u5173\u6D88\u606F\uFF0C\u4E00\u53E0\u5C55\u5F00" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { x: 1093, y: 280, w: 200, h: 55, label: spread > 0.8 ? "\u6536\u8D77\u6D88\u606F" : "\u5C55\u5F00\u6D88\u606F", active: spread > 0.8 }),
      [2, 1].map((i) => {
        const q = sm(f, B.spread + i * 8, B.spread + 42 + i * 8), y = mix(392 + i * 23, 383 + i * 135, q), x = mix(316 + i * 24, 300, q), w = mix(808 - i * 48, 840, q), a = (i - 1) * -4 * (1 - q);
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(720, y + 59) + ` rotate(${a}) translate(-720 ${-y - 59})`, opacity: mix(1 - i * 0.1, 1, q), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x, y, width: w, height: "118", rx: "22", fill: i === 0 ? "#fffdf4" : "url(#no-paper)", stroke: i === 1 && read > 0.5 ? C.red : "#d4ccba", strokeWidth: i === 1 && read > 0.5 ? 1.8 : 1.2, filter: "url(#no-shadow)" }),
          i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x + 25, y: y + 29, width: "59", height: "59", rx: "17", fill: i === 1 ? "#d7dfc7" : "#e8dcc5" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: i === 1 ? "M-13-10H13V8H-3L-10 16V8H-13Z" : "M-13-12H13V13H-13ZM-7-5H7M-7 2H5", transform: tx(x + 54, y + 58), fill: "none", stroke: C.ink, strokeWidth: "2", strokeLinejoin: "round" })
          ] }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 108, y: y + 48, size: 30, weight: 600, children: messages[i][0] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 108, y: y + 86, size: 23, fill: C.soft, children: messages[i][1] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + w - 28, y: y + 45, size: 21, anchor: "end", fill: C.soft, children: i === 1 && read > 0.5 ? "\u5DF2\u8BFB" : messages[i][2] }),
          i === 1 && read > 0.5 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m-10 0 7 7 15-17", transform: tx(x + w - 48, y + 80), stroke: C.red, strokeWidth: "3", fill: "none", strokeLinecap: "round" }) : null
        ] }, i);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 1295, y: 809, size: 22, anchor: "end", fill: C.soft, children: read > 0.5 ? "\u5DF2\u8BFB\u6D88\u606F\u4ECD\u4FDD\u7559\u5728\u8BB0\u5F55\u4E2D" : "3 \u6761\u9879\u76EE\u6D88\u606F" })
    ] });
  }
  function OrbitScene({ f }) {
    const open = sm(f, B.archive, B.archive + 34);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 147, y: 307, size: 31, weight: 600, children: "\u6D88\u606F\u6CBF\u65F6\u95F4\u7EBF\uFF0C\u5B89\u9759\u5F52\u4F4D" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 1295, y: 307, size: 22, anchor: "end", fill: C.soft, children: "\u5C71\u91CE\u9879\u76EE / \u6D88\u606F\u8BB0\u5F55" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M385 396C610 290 646 382 746 426M385 543C568 543 622 561 746 561M385 682C603 786 647 695 746 696", stroke: "#c4ccb9", strokeWidth: "1.5", fill: "none", strokeDasharray: "4 8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "385", cy: "543", r: "148", fill: "none", stroke: "#d3d6c7" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "385", cy: "543", r: "126", fill: "none", stroke: "#e1e0d1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "385", cy: "543", r: "92", fill: "url(#no-ink)", stroke: "#74876a", strokeWidth: "1.5", filter: "url(#no-shadow)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 385, y: mix(606, 554, sm(f, 940, 990)), size: 36, weight: 600, anchor: "middle", fill: C.cream, children: "\u5C71\u91CE" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 385, y: 592, opacity: sm(f, 960, 990), size: 20, anchor: "middle", fill: "#a9b99a", children: "\u9879\u76EE\u6D88\u606F" }),
      Array.from({ length: 24 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M385 385V391", stroke: i % 3 === 0 ? "#a6b397" : "#d2d6c6", strokeWidth: "1.4", transform: `rotate(${i * 15} 385 543)` }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M681 426V696", stroke: "#b9c5a9", strokeWidth: "2", opacity: open }),
      [1, 2].map((i) => {
        const p = sm(f, 928 + i * 15, 1004 + i * 15), cx = mix(385, 1002, p), cy = mix(543, 426 + i * 135, p) + Math.sin(p * Math.PI) * (i === 0 ? -133 : i === 1 ? 0 : 117), w = mix(52, 590, p), h = mix(52, 118, p), vis = sm(p, 0.45, 0.86);
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "681", cy: 426 + i * 135, r: 5 + 3 * p, fill: i === 0 ? C.red : "#819673", opacity: p }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(cx, cy) + ` rotate(${(1 - p) * (i - 1) * 22})`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: -w / 2, y: -h / 2, width: w, height: h, rx: mix(26, 19, p), fill: i === 0 ? "#fffcf3" : "#eeeadd", stroke: i === 0 ? "#cc775e" : "#c9d0bb", strokeWidth: "1.2", filter: "url(#no-shadow)" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: vis, children: [
              i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: -244, cy: "0", r: "23", fill: i === 1 ? "#d5dfc7" : "#e3d8bf" }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -198, y: -10, size: 29, weight: 600, children: messages[i][0] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -198, y: 29, size: 22, fill: C.soft, children: messages[i][1] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 261, y: -11, size: 20, fill: C.soft, anchor: "end", children: i === 1 ? "\u5DF2\u8BFB" : messages[i][2] })
            ] })
          ] })
        ] }, i);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 385, y: 773, size: 23, anchor: "middle", fill: C.soft, children: "\u66F4\u65B0\u6709\u8FF9\u53EF\u5FAA" })
    ] });
  }
  var blend = (a, b, t) => Object.fromEntries(Object.keys(a).map((k) => [k, mix(a[k], b[k], t)]));
  var notch = (f) => {
    const p = sm(f, 28, 72);
    return { x: mix(470, 300, p), y: mix(354, 330, p), w: mix(500, 840, p), h: mix(86, 306, p), r: mix(43, 31, p), a: 0, dark: 1, bx: mix(520, 350, p), by: mix(397, 374, p), bs: 1 };
  };
  var stack = (f) => {
    const p = sm(f, 323, 365), x = mix(316, 300, p), y = mix(392, 383, p);
    return { x, y, w: mix(808, 840, p), h: 118, r: 22, a: 4 * (1 - p), dark: 0, bx: x + 54, by: y + 59, bs: 1 };
  };
  var edge = (f) => {
    const p = out(f, 648, 688);
    return { x: mix(1322, 260, p), y: 452, w: mix(8, 930, p), h: 151, r: mix(4, 23, p), a: 0, dark: 0, bx: mix(1322, 320, p), by: 526, bs: 1 };
  };
  var orbit = (f) => {
    const p = sm(f, 928, 1004), cx = mix(385, 1002, p), cy = mix(543, 426, p) - Math.sin(p * Math.PI) * 133, w = mix(52, 590, p), h = mix(52, 118, p);
    return { x: cx - w / 2, y: cy - h / 2, w, h, r: mix(26, 19, p), a: -22 * (1 - p), dark: 0, bx: cx - 244 * p, by: cy, bs: 1 };
  };
  var notice = (f) => f < 270 ? notch(f) : f < 300 ? blend(notch(270), stack(300), sm(f, 270, 300)) : f < 570 ? stack(f) : f < 600 ? blend(stack(570), edge(600), sm(f, 570, 600)) : f < 870 ? edge(f) : f < 900 ? blend(edge(870), orbit(900), sm(f, 870, 900)) : orbit(f);
  function Notice({ f, opening = -1, ending = -1 }) {
    let p = notice(f);
    if (opening >= 0) {
      const q = sm(opening, 78, 112), m = sm(opening, 112, 150);
      p = { x: mix(387, 470, m), y: mix(585 - mix(3.4, 86, q) / 2, 354, m), w: mix(666, 500, m), h: mix(3.4, 86, q), r: mix(1.7, 43, q), a: 0, dark: q, bx: mix(437, 520, m), by: mix(585, 397, m), bs: q };
    }
    const ep = ending < 0 ? 0 : out(ending, 0, 47);
    if (ending >= 0) p = blend(p, { x: 652, y: 376, w: 136, h: 136, r: 68, a: 0, dark: 1, bx: 720, by: 444, bs: 2.35 }, ep);
    const { x, y, w, h, r, a } = p, notchOp = (1 - sm(f, 270, 292)) * (opening < 0 ? 1 : sm(opening, 112, 142)), stackOp = sm(f, 282, 302) * (1 - sm(f, 570, 585)), edgeOp = sm(f, 663, 684) * (1 - sm(f, 870, 886)), orbitOp = sm(f, 960, 997), contentOp = 1 - sm(ending, 0, 22);
    const read = sm(f, 158, 183), unread = f > 183 ? "2 \u6761\u672A\u8BFB" : "3 \u6761\u65B0\u6D88\u606F", ink = colorMix("#fffdf4", "#243d2c", p.dark);
    const bx = p.bx, by = p.by;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { "data-hero": "notification", transform: `rotate(${a} ${x + w / 2} ${y + h / 2})`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("clipPath", { id: "no-content", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x + 12, y: y + 5, width: Math.max(0, w - 24), height: Math.max(0, h - 10), rx: r }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x, y, width: w, height: h, rx: r, fill: opening >= 0 ? colorMix(C.red, ink, sm(opening, 78, 107)) : ink, stroke: colorMix("#d4ccba", "#657d57", p.dark), strokeWidth: "1.2", filter: "url(#no-shadow)" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x, y, width: w, height: h, rx: r, fill: "url(#no-grain)", opacity: p.dark }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: `M${x + Math.min(32, w / 3)} ${y + 1.5}H${x + w - Math.min(32, w / 3)}`, stroke: "url(#no-edge)", opacity: p.dark * 0.58 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { clipPath: "url(#no-content)", opacity: contentOp, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: notchOp, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: bx + 48, y: by + 9, size: 26, fill: C.cream, children: "\u5C71\u91CE\u9879\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + w - 45, y: by + 9, size: 23, anchor: "end", fill: "#b7c5a4", children: unread }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: sm(f, 51, 79), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 348, y: 464, size: 38, weight: 600, fill: C.cream, children: "\u4F5C\u54C1\u96C6\u5DF2\u540C\u6B65" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 348, y: 511, size: 25, fill: "#bdc8ae", children: "24 \u9875\u5185\u5BB9\u4E0E 3 \u9879\u7D20\u6750\uFF0C\u5DF2\u4FDD\u5B58\u5230\u9879\u76EE\u3002" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TinyCover, { x: 958, y: 413, w: 132, h: 86, id: "no-main-cover" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M349 542H1092", stroke: "#54714d" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { x: 894, y: 565, w: 200, h: 52, label: read > 0.5 ? "\u5DF2\u67E5\u770B" : "\u67E5\u770B\u4F5C\u54C1", active: true, fill: read > 0.5 ? "#314c35" : C.cream, ink: read > 0.5 ? "#b9c8a9" : C.ink }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 348, y: 600, size: 22, fill: "#92a783", children: read > 0.5 ? "\u7EE7\u7EED\u4E13\u6CE8\uFF0C\u4F60\u7684\u66F4\u65B0\u5DF2\u59A5\u5584\u4FDD\u5B58" : "\u521A\u521A \xB7 \u6765\u81EA\u9879\u76EE\u540C\u6B65" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: stackOp, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 108, y: y + 48, size: 30, weight: 600, children: "\u4F5C\u54C1\u96C6\u5DF2\u540C\u6B65" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 108, y: y + 86, size: 23, fill: C.soft, children: "24 \u9875\u5185\u5BB9\u4E0E 3 \u9879\u7D20\u6750\u5DF2\u4FDD\u5B58" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + w - 28, y: y + 45, size: 21, anchor: "end", fill: C.soft, children: "\u5DF2\u8BFB" }),
          f >= 183 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m-10 0 7 7 15-17", transform: tx(x + w - 48, y + 80), stroke: C.red, strokeWidth: "3", fill: "none" }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: edgeOp, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 373, y: 508, size: 33, weight: 600, children: f >= 769 ? "\u5DF2\u6062\u590D\u4E0A\u4E00\u7248" : "\u5C01\u9762\u8C03\u6574\u5DF2\u4FDD\u5B58" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 373, y: 551, size: 24, fill: C.soft, children: f >= 769 ? "\u64CD\u4F5C\u5DF2\u64A4\u9500\uFF0C\u9879\u76EE\u7D20\u6750\u5B8C\u6574\u4FDD\u7559\u3002" : "\u5C71\u91CE\u4F5C\u54C1\u96C6 \xB7 \u53EF\u4EE5\u7EE7\u7EED\u5B89\u5FC3\u521B\u4F5C\u3002" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "1030", y: "492", width: "117", height: "65", rx: "19", fill: f >= 769 ? "#dce2ce" : C.ink }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 1089, y: 534, size: 27, anchor: "middle", fill: f >= 769 ? C.ink : C.cream, children: f >= 769 ? "\u5B8C\u6210" : "\u64A4\u9500" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: `M285 583H${285 + 882 * (1 - sm(Math.min(f, 744), 688, 818))}`, stroke: f >= 769 ? "#9caa8f" : C.red, strokeWidth: "2", opacity: ".75" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: orbitOp, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 97, y: y + 49, size: 29, weight: 600, children: "\u5DF2\u6062\u590D\u4E0A\u4E00\u7248" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 97, y: y + 88, size: 22, fill: C.soft, children: "\u5C01\u9762\u8C03\u6574\u5DF2\u64A4\u9500\uFF0C\u7D20\u6750\u5B8C\u6574\u4FDD\u7559" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + w - 34, y: y + 48, size: 20, fill: C.soft, anchor: "end", children: "\u521A\u521A" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Bell, { x: bx, y: by, s: p.bs, ring: f >= 28 && f < 95 ? Math.sin((f - 28) * 0.42) * 8 * (1 - sm(f, 28, 95)) : 0, fill: colorMix(colorMix(C.red, C.ink, sm(f, 158, 183) * (1 - sm(f, 570, 590))), C.ink, ep) }),
      ending >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: bx + 22 * p.bs, cy: by - 20 * p.bs, r: 7 * ep * p.bs, fill: C.red }) : null
    ] });
  }
  function EdgePage({ f }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Workspace, { dim: 0.6 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, { x: 1062, y: 722, w: 233, h: 61, label: f < 625 ? "\u4FDD\u5B58\u8C03\u6574" : f >= 769 ? "\u5DF2\u6062\u590D" : "\u4FDD\u5B58\u6210\u529F", active: f >= 625 })
    ] });
  }
  function Backdrop({ i, f }) {
    return i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Workspace, { dim: 0.22 }) : i === 1 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StackScene, { f }) : i === 2 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EdgePage, { f }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(OrbitScene, { f });
  }
  function Body({ f }) {
    const i = Math.min(3, Math.floor(f / 300)), q = sm(f - i * 300, 270, 300);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Defs, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Window, { title: "\u5C71\u91CE \xB7 \u534F\u4F5C\u5DE5\u4F5C\u53F0", tag: "\u6D88\u606F\u4E2D\u5FC3 / \u9879\u76EE\u66F4\u65B0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Backdrop, { i, f }),
        i < 3 && q > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("clipPath", { id: "no-reveal", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: 1375 - 1310 * q, y: "249", width: 1310 * q, height: "617" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { clipPath: "url(#no-reveal)", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "65", y: "249", width: "1310", height: "617", fill: C.page }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Backdrop, { i: i + 1, f: (i + 1) * 300 })
          ] })
        ] }) : null
      ] })
    ] });
  }
  function Overlay({ f }) {
    if (f < 78) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Defs, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Notice, { f: Math.max(0, Math.min(1200, f - 150)), opening: f < 150 ? f : -1, ending: f >= 1350 ? f - 1350 : -1 })
    ] });
  }
  var pointer = (f) => track(f, [[0, 683, 471], [10, 683, 471], [28, 710, 397], [42, 710, 397], [70, 1088, 662], [138, 1088, 662], [158, 996, 592], [170, 996, 592], [190, 1225, 764], [283, 1225, 764], [313, 1206, 307], [332, 1206, 307], [359, 1172, 772], [428, 1172, 772], [452, 1084, 562], [464, 1084, 562], [486, 1271, 803], [593, 1271, 803], [619, 1187, 757], [633, 1187, 757], [656, 1188, 654], [717, 1188, 654], [744, 1089, 524], [755, 1089, 524], [778, 1230, 796], [889, 1230, 796], [924, 439, 570], [939, 439, 570], [967, 1062, 790], [1200, 1062, 790]]);
  function Cursor({ f }) {
    const b = Math.max(0, Math.min(1200, f - 150)), p = f < 150 ? track(f, [[0, 1480, 850], [117, 1480, 850], [150, 683, 471]]) : f >= 1350 ? track(f, [[1350, 1062, 790], [1380, 1480, 880]]) : pointer(b);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Mouse, { ...p, down: [28, 158, 323, 452, 625, 744, 930].some((v) => b >= v && b < v + 7) ? 1 : 0 });
  }
  function Enter({ f, title, body }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: sm(f, 126, 150), children: body }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: 1 - sm(f, 78, 105), transform: tx(0, -45 * sm(f, 78, 114)), children: title })
    ] });
  }
  function End({ f, body }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: 1 - sm(f, 0, 32), children: body });
  }
  var bell = (f) => ({ x: notice(f).bx, y: notice(f).by });
  var episode = {
    id: "notify",
    num: 16,
    title: "\u901A\u77E5\u6D88\u606F",
    context: "\u9879\u76EE\u534F\u4F5C\u5DE5\u4F5C\u53F0 \xB7 \u540C\u4E00\u901A\u77E5\u6807\u8BB0\u56DB\u79CD\u5448\u73B0\u65B9\u5F0F",
    accent: C.red,
    Body,
    Enter,
    End,
    Overlay,
    Cursor,
    prompts: [
      { name: "\u6D41\u4F53\u901A\u77E5\u5C9B", lines: ["\u8BF7\u7528Remotion\u505A\u6D41\u4F53\u901A\u77E5\u5C9B", "\u7D27\u51D1\u80F6\u56CA\u5C55\u5F00\uFF0C\u64CD\u4F5C\u540E\u66F4\u65B0\u672A\u8BFB\u6570"], full: "\u8BF7\u7528 Remotion \u5236\u4F5C\u6D41\u4F53\u901A\u77E5\u5C9B\u7EC4\u4EF6\uFF1A\u7D27\u51D1\u80F6\u56CA\u663E\u793A\u9879\u76EE\u540D\u3001\u901A\u77E5\u6807\u8BB0\u548C\u672A\u8BFB\u6570\uFF0C\u70B9\u51FB\u540E\u628A\u540C\u4E00\u4E2A\u5BB9\u5668\u7684\u5BBD\u3001\u9AD8\u3001\u5706\u89D2\u4E0E\u4F4D\u7F6E\u540C\u6B65\u63D2\u503C\u6210\u6D88\u606F\u5361\uFF1B\u5185\u5BB9\u7A0D\u665A\u8FDB\u5165\uFF0C\u6587\u5B57\u4FDD\u6301\u6E05\u6670\uFF0C\u4E0D\u968F\u5E95\u5F62\u62C9\u4F38\u3002\u5C55\u5F00\u5361\u5305\u542B\u6807\u9898\u3001\u8BF4\u660E\u3001\u7F29\u7565\u56FE\u4E0E\u4E3B\u64CD\u4F5C\uFF0C\u64CD\u4F5C\u786E\u8BA4\u540E\u66F4\u65B0 unreadCount \u548C\u5DF2\u8BFB\u72B6\u6001\u3002\u771F\u5B9E React \u63A7\u4EF6\u652F\u6301\u952E\u76D8\u5C55\u5F00\u3001aria-expanded\u3001\u7126\u70B9\u8FD4\u56DE\u4E0E\u51CF\u5C11\u8FD0\u52A8\u3002Remotion \u7248\u4F7F\u7528\u540C\u4E00\u5E27\u65F6\u95F4\u8868\u9A71\u52A8\u901A\u77E5\u5F62\u53D8\u3001\u64CD\u4F5C\u548C\u58F0\u97F3cue\u3002", reference: "https://ui.aceternity.com/interactions/fluid-notch" },
      { name: "\u7EB8\u5361\u5806\u6808", lines: ["\u628A\u591A\u6761\u6D88\u606F\u53E0\u6210\u5E26\u666F\u6DF1\u7684\u7EB8\u5361", "\u70B9\u51FB\u9010\u5F20\u5C55\u5F00\uFF0C\u5DF2\u8BFB\u72B6\u6001\u7559\u5728\u539F\u4F4D"], full: "\u5236\u4F5C\u7EB8\u5361\u5806\u6808\u901A\u77E5\u7EC4\u4EF6\uFF1A\u6BCF\u6761\u6D88\u606F\u6709\u7A33\u5B9A id\u3001title\u3001body\u3001time\u3001read \u72B6\u6001\u3002\u6536\u8D77\u65F6\u7528\u9010\u5C42\u4F4D\u79FB\u3001\u8F7B\u7F29\u653E\u548C\u9634\u5F71\u8868\u793A\u5806\u53E0\uFF1B\u70B9\u51FB\u5C55\u5F00\u540E\u5361\u7247\u6309\u987A\u5E8F\u8FDB\u5165\u72EC\u7ACB\u884C\uFF0C\u4FDD\u6301\u9605\u8BFB\u987A\u5E8F\u3002\u70B9\u51FB\u6D88\u606F\u53EA\u66F4\u65B0\u8BE5\u6761\u5DF2\u8BFB\u72B6\u6001\uFF0C\u5361\u7247\u4F4D\u7F6E\u4FDD\u6301\u7A33\u5B9A\uFF0C\u907F\u514D\u8BEF\u70B9\u3002\u672A\u5C55\u5F00\u7684\u9690\u85CF\u6D88\u606F\u4E0D\u8FDB\u5165\u952E\u76D8\u7126\u70B9\uFF1B\u6298\u53E0\u6309\u94AE\u63D0\u4F9B aria-expanded\u3002Remotion \u7248\u4F7F\u7528\u56FA\u5B9A\u5E27\u8FDB\u5EA6\u548C\u5206\u5C42\u51E0\u4F55\uFF0C\u6587\u5B57\u4E0D\u53D8\u5F62\uFF0C\u4FDD\u7559\u7ED3\u679C\u9605\u8BFB\u65F6\u95F4\u3002", reference: "https://movin.design/components/cards/notifications/" },
      { name: "\u8FB9\u7F18\u56DE\u6267", lines: ["\u8BA9\u4FDD\u5B58\u56DE\u6267\u6CBF\u7A97\u53E3\u8FB9\u7F18\u5C55\u5F00", "\u5012\u8BA1\u65F6\u4E0E\u64A4\u9500\u6309\u94AE\u5171\u7528\u771F\u5B9E\u72B6\u6001"], full: "\u5236\u4F5C\u8FB9\u7F18\u5C55\u5F00\u7684\u64CD\u4F5C\u56DE\u6267\uFF1A\u7528\u6237\u4FDD\u5B58\u540E\uFF0C\u7531\u7A97\u53E3\u8FB9\u7F18\u7684\u4E00\u6761\u7EC6\u6807\u8BB0\u5C55\u5F00\u6210\u53EF\u8BFB\u7684\u6A2A\u5411 toast\uFF0C\u5305\u542B\u660E\u786E\u72B6\u6001\u3001\u9879\u76EE\u540D\u548C\u64A4\u9500\u6309\u94AE\u3002\u5C55\u5F00\u7528\u5BB9\u5668\u906E\u7F69\u4E0E\u8F7B\u5FAE\u5F62\u53D8\uFF0C\u6B63\u6587\u72EC\u7ACB\u663E\u793A\u3002\u5012\u8BA1\u65F6\u3001\u60AC\u505C\u6682\u505C\u3001\u64A4\u9500\u548C\u5173\u95ED\u7531\u540C\u4E00\u72B6\u6001\u673A\u7BA1\u7406\uFF1B\u64A4\u9500\u5B8C\u6210\u540E\u66FF\u6362\u56DE\u6267\u5185\u5BB9\u5E76\u6062\u590D\u6570\u636E\u3002\u771F\u5B9E\u4E1A\u52A1\u4E0D\u80FD\u4EC5\u64AD\u653E\u6210\u529F\u52A8\u753B\u4EE3\u66FF\u4FDD\u5B58\u7ED3\u679C\u3002Remotion \u6F14\u793A\u56FA\u5B9A\u72B6\u6001\u8282\u70B9\uFF0C\u6309\u94AE\u70B9\u51FB\u3001\u56DE\u6267\u548C\u58F0\u97F3cue\u4E25\u683C\u540C\u5E27\u3002", reference: "https://uiverse.io/uiverse-astronaut/silent-zebra-63" },
      { name: "\u8F68\u9053\u5F52\u6863", lines: ["\u628A\u6D88\u606F\u4ECE\u9879\u76EE\u8282\u70B9\u9001\u5165\u65F6\u95F4\u7EBF", "\u5361\u7247\u6CBF\u5F27\u7EBF\u5F52\u4F4D\uFF0C\u8BB0\u5F55\u4FDD\u6301\u53EF\u8FFD\u6EAF"], full: "\u5236\u4F5C\u9879\u76EE\u6D88\u606F\u5F52\u6863\u7EC4\u4EF6\uFF1A\u9879\u76EE\u8282\u70B9\u4F5C\u4E3A\u8D77\u70B9\uFF0C\u901A\u77E5\u5361\u6CBF\u53EF\u914D\u7F6E\u8D1D\u585E\u5C14\u5F27\u7EBF\u4F9D\u6B21\u8FDB\u5165\u53F3\u4FA7\u65F6\u95F4\u7EBF\uFF1B\u5361\u7247\u7531\u7D27\u51D1\u6807\u8BB0\u5C55\u5F00\u4E3A\u6807\u9898\u3001\u8BF4\u660E\u548C\u65F6\u95F4\uFF0C\u53D8\u5F62\u53EA\u4F5C\u7528\u4E8E\u5E95\u677F\uFF0C\u6587\u672C\u5728\u843D\u4F4D\u524D\u6DE1\u5165\u3002\u6D88\u606F\u4F7F\u7528\u7A33\u5B9A id \u4E0E\u65F6\u95F4\u6392\u5E8F\uFF0C\u5F52\u6863\u540E\u4E0D\u81EA\u52A8\u6D88\u5931\uFF0C\u7528\u6237\u53EF\u70B9\u51FB\u67E5\u770B\u4E0A\u4E0B\u6587\u3002\u63D0\u4F9B\u4E0D\u8FD0\u52A8\u7684\u666E\u901A\u5217\u8868\u7248\u672C\u4E0E\u952E\u76D8\u8BBF\u95EE\u3002Remotion \u7248\u6309\u56FA\u5B9A\u5E27\u8BA1\u7B97\u8DEF\u5F84\u3001\u5361\u7247\u5C3A\u5BF8\u3001\u900F\u660E\u5EA6\u548C\u8282\u70B9\u6807\u8BB0\uFF0C\u4E0D\u4F7F\u7528\u968F\u673A\u6570\u6216CSS\u52A8\u753B\u3002", reference: "https://movin.design/components/cards/notifications/" }
    ],
    cues: [{ f: 28, type: "click" }, { f: 42, type: "stretch" }, { f: 76, type: "soft" }, { f: 158, type: "click" }, { f: 183, type: "success" }, { f: 295, type: "page", gain: 0.6 }, { f: 323, type: "click" }, { f: 338, type: "page", gain: 0.5 }, { f: 354, type: "page", gain: 0.5 }, { f: 371, type: "snap" }, { f: 452, type: "click" }, { f: 478, type: "tick" }, { f: 596, type: "page", gain: 0.6 }, { f: 625, type: "click" }, { f: 648, type: "slide" }, { f: 690, type: "chime", gain: 0.7 }, { f: 744, type: "click" }, { f: 770, type: "soft" }, { f: 895, type: "page", gain: 0.6 }, { f: 930, type: "click" }, { f: 957, type: "slide", gain: 0.65 }, { f: 1004, type: "snap" }, { f: 1021, type: "soft" }, { f: 1037, type: "success" }],
    introCues: [{ f: 83, type: "stretch" }, { f: 118, type: "soft" }, { f: 149, type: "chime", gain: 0.65 }],
    outroCues: [{ f: 10, type: "slide" }, { f: 44, type: "snap" }, { f: 62, type: "chime", gain: 0.65 }],
    checks: (f) => ({ section: Math.min(3, Math.floor(f / S)), bell: bell(f), pointer: pointer(f), expanded: f >= B.expand, read: f >= B.read, spread: f >= B.spread, undone: f >= B.undo, archived: f >= B.arrive })
  };
  var notify_default = episode;
  var Body2 = notify_default.Body;
  var Cursor2 = notify_default.Cursor;
  var Overlay2 = notify_default.Overlay;
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "35 135 1370 780" }, /* @__PURE__ */ import_react2.default.createElement("defs", null, /* @__PURE__ */ import_react2.default.createElement("clipPath", { id: "body-boundary" }, /* @__PURE__ */ import_react2.default.createElement("rect", { x: "65", y: "170", width: "1310", height: "696", rx: "25" }))), /* @__PURE__ */ import_react2.default.createElement(Body2, { f }), Overlay2 && /* @__PURE__ */ import_react2.default.createElement(Overlay2, { f: f + 150 }), " ", Cursor2 && /* @__PURE__ */ import_react2.default.createElement(Cursor2, { f: f + 150 }))));
  };
})();
