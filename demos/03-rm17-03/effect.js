// 夏夏的AI灵感 · 共享展开。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var import_react = __toESM(require_react());

  // shim:remotion
  var staticFile = (name) => (window.effectAssets || {})[name] || (/paper|grain/.test(name) ? "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cfilter%20id%3D%22p%22%3E%3CfeTurbulence%20baseFrequency%3D%22.8%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Cpath%20fill%3D%22%23f7f1e4%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3Cpath%20filter%3D%22url(%23p)%22%20opacity%3D%22.075%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3C%2Fsvg%3E" : "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22s%22%20x2%3D%22.5%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7ded2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9aa71%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23s)%22%20d%3D%22M0%200h600v400H0z%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22149%22%20r%3D%2251%22%20fill%3D%22%23eea464%22%2F%3E%3Cpath%20d%3D%22M0%20283l100-77%2054%2022%2087-78%20194%20124%2095-58%2070%2044v140H0%22%20fill%3D%22%237b958a%22%2F%3E%3Cpath%20d%3D%22M0%20308l141-53%2078%2021%2099-54%20151%2071%20131-29v136H0%22%20fill%3D%22%23365a54%22%2F%3E%3C%2Fsvg%3E");
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
  function Arrow({ x, y, color = C.ink, size = 1 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-15 0H15M5-10l10 10-10 10", fill: "none", stroke: color, strokeWidth: "2.7", strokeLinecap: "round", strokeLinejoin: "round", transform: tx(x, y) + ` scale(${size})` });
  }
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
  function colorMix(a, b, t) {
    const n = (s, i) => parseInt(s.slice(i * 2 + 1, i * 2 + 3), 16);
    return "#" + [0, 1, 2].map((i) => Math.round(mix(n(a, i), n(b, i), clamp(t))).toString(16).padStart(2, "0")).join("");
  }
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var CX = 860;
  var CY = 555;
  var CW = 660;
  var CH = 440;
  var pulse = (f, a, b, c) => sm(f, a, b) * (1 - sm(f, b, c));
  function Mark({ x, y, s = 1 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(x, y) + ` scale(${s})`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M-15-23H15V25L0 16-15 25Z", fill: C.red }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M-6-10H6M0-16V-4", stroke: C.cream, strokeWidth: "2", strokeLinecap: "round" })
    ] });
  }
  function Card({ x = -CW / 2, y = -CH / 2, w = CW, h = CH, art = 0, lift = 0, spot = 0, detail = 0, reveal = 1, logo = 0, back = 0, children }) {
    const photoH = mix(h * 0.69, h - 32, detail), photoW = mix(w - 30, 580, detail), textX = mix(x + 30, x + 628, detail), textY = mix(y + h - 66, y + 111, detail), radius = mix(15, 12, logo), ink = colorMix("#fffdf7", back === 1 ? "#e7dec9" : back === 2 ? C.ink : C.red, logo);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { "data-card": art, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x + 5 * (1 - logo), y: y + 14 * (1 - logo), width: w, height: h, rx: radius, fill: "#1d3027", opacity: 0.09 * (1 - logo) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x, y, width: w, height: h, rx: radius, fill: ink, stroke: colorMix("#c8c5b8", C.paper, logo), strokeWidth: 1 + logo }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: 1 - sm(logo, 0, 0.65), children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(-lift * 0.5, -lift), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x + 15, y: y + 15, width: photoW, height: photoH, rx: "7", fill: "#394b3f" }),
          art < 2 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("image", { href: asset(art === 0 ? "light.jpg" : "sunrise.jpg"), x: x + 15, y: y + 15, width: photoW, height: photoH, opacity: reveal, preserveAspectRatio: "xMidYMid slice" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x + 15, y: y + 15, width: photoW, height: photoH, fill: C.ink }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: x + w * 0.66, cy: y + photoH * 0.54, r: photoH * 0.38, fill: "#c4bda9" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: `M${x + 15} ${y + photoH}L${x + w * 0.45} ${y + 40}L${x + w - 15} ${y + photoH}Z`, fill: C.red, opacity: ".88" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 46, y: y + photoH * 0.61, size: 78, fill: C.cream, weight: 600, children: "FORM" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x + 15, y: y + 15, width: photoW, height: photoH, fill: "url(#cards-light)", opacity: spot * 0.55 }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(T, { x: x + 39, y: y + 54, size: 16, spacing: 2.5, fill: C.cream, opacity: reveal, children: [
            "COLLECTION / 0",
            art + 1
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(-lift * 0.7, -lift * 0.55), opacity: reveal, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: textX, y: textY, size: mix(34, 46, detail), weight: 600, children: ["\u5149\u7684\u79E9\u5E8F", "\u5C71\u6D77\u4E4B\u95F4", "\u5F62\u72B6\u7EC3\u4E60"][art] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: textX + 1, y: mix(y + h - 29, textY + 42, detail), size: mix(18, 19, detail), fill: C.soft, children: ["PHOTOGRAPHY \xB7 12 \u5F20", "LANDSCAPE \xB7 8 \u5F20", "VISUAL STUDY \xB7 6 \u5F20"][art] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + w / 2, y: y + h / 2, size: 51, weight: 600, fill: C.cream, anchor: "middle", opacity: 1 - reveal, children: "\u7247" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: out(detail, 0.4, 1), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 628, y: y + 230, size: 25, children: "\u6355\u6349\u57CE\u5E02\u91CC\u77ED\u6682\u7684\u5149\uFF0C" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 628, y: y + 272, size: 25, children: "\u8BA9\u6BCF\u4E2A\u666E\u901A\u7247\u523B\u6709\u8FF9\u53EF\u5FAA\u3002" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Line, { x: x + 628, y: y + 315, x2: x + w - 78, y2: y + 315 }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 628, y: y + 359, size: 19, fill: C.soft, children: "\u6700\u8FD1\u6574\u7406" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + w - 78, y: y + 359, size: 21, anchor: "end", children: "11\u670806\u65E5" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: x + 628, y: y + 414, width: "280", height: "67", rx: "33.5", fill: C.red }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: x + 764, y: y + 457, size: 26, fill: C.cream, anchor: "middle", children: "\u8FDB\u5165\u9879\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Arrow, { x: x + 871, y: y + 448, color: C.cream, size: 0.65 }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: x + w - 35, cy: y + 35, r: "18", fill: "#edeae0" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: `M${x + w - 41} ${y + 29}l12 12m0-12-12 12`, stroke: C.ink, strokeWidth: "2" })
        ] }),
        children,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Mark, { x: mix(x + w - 43, x + photoW - 12, detail), y: y + 26, s: mix(0.45, 0.86, clamp((w - 148) / (660 - 148))) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: (1 - detail) * reveal, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Arrow, { x: x + w - 44, y: y + h - 48, color: C.red, size: 0.7 }) })
      ] }),
      back === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: sm(logo, 0.55, 1), children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M-25 4H25M-25 20H9", stroke: C.cream, strokeWidth: "4", strokeLinecap: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "-14", cy: "-24", r: "10", fill: C.cream })
      ] }) : null
    ] });
  }
  function Sidebar({ mode }) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 125, y: 334, size: 17, fill: C.red, spacing: 2.8, children: "VISUAL LIBRARY" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 123, y: 395, size: 40, weight: 600, children: "\u503C\u5F97\u505C\u7559" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 123, y: 449, size: 40, weight: 600, children: "\u7684\u4E00\u5F20\u5361\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 126, y: 505, size: 22, fill: C.soft, children: "\u5C06\u7075\u611F\u6574\u7406\u6210\u4F5C\u54C1\u96C6" }),
      ["\u5168\u90E8\u7D20\u6750", "\u7CBE\u9009\u6536\u85CF", "\u6700\u8FD1\u7F16\u8F91"].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "119", y: 554 + i * 64, width: "250", height: "48", rx: "8", fill: i === 1 ? "#e8e5dc" : "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "142", cy: 578 + i * 64, r: "4", fill: i === 1 ? C.red : C.soft }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 160, y: 586 + i * 64, size: 22, fill: i === 1 ? C.ink : C.soft, children: n }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 344, y: 585 + i * 64, size: 18, anchor: "end", fill: C.soft, children: [26, 12, 4][i] })
      ] }, n)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Line, { x: 125, y: 770, x2: 365, y2: 770 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 126, y: 807, size: 17, fill: C.soft, children: "ARCHIVE / 2026" })
    ] });
  }
  function Defs() {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("defs", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "cards-light", x1: "0", y1: "0", x2: "1", y2: ".9", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { stopColor: "#fffaf0", stopOpacity: ".65" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: ".4", stopColor: "#fffaf0", stopOpacity: "0" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: ".66", stopColor: "#fffaf0", stopOpacity: ".24" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "1", stopColor: "#fffaf0", stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("linearGradient", { id: "cards-bottom", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { stopColor: C.ink, stopOpacity: ".55" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("stop", { offset: "1", stopColor: C.ink })
      ] })
    ] });
  }
  var deckPose = (f) => {
    const c = sm(f, 48, 106) - sm(f, 143, 202);
    return { x: CX + 760 * Math.sin(c * Math.PI), y: CY + 65 * Math.sin(c * Math.PI) - 26 * c, a: 23 * Math.sin(c * Math.PI), s: 1 - 0.07 * c, c };
  };
  var tiltPointer = (f) => track(f, [[0, 1255, 798], [20, 1060, 435], [55, 1168, 394], [96, 631, 681], [138, 1010, 492], [176, 980, 522], [225, 1260, 801], [300, 1260, 801]]);
  function grabbed(f, x, y) {
    const p = deckPose(f), a = p.a * Math.PI / 180;
    return { x: p.x + (x * Math.cos(a) - y * Math.sin(a)) * p.s, y: p.y + (x * Math.sin(a) + y * Math.cos(a)) * p.s };
  }
  function deckPointer(f) {
    if (f >= 48 && f <= 60) return grabbed(f, 250, 118);
    if (f >= 143 && f <= 156) return grabbed(f, 222, -205);
    const p = grabbed(60, 250, 118), a = grabbed(143, 222, -205), b = grabbed(156, 222, -205);
    return track(f, [[0, 1260, 801], [24, 1110, 673], [48, 1110, 673], [60, p.x, p.y], [90, 1300, 805], [120, 1300, 805], [143, a.x, a.y], [156, b.x, b.y], [185, 1260, 805], [300, 1260, 805]]);
  }
  var expandPointer = (f) => track(f, [[0, 1260, 805], [40, 1108, 695], [64, 1108, 695], [100, 1279, 321], [239, 1279, 321], [278, 1260, 805], [300, 1260, 805]]);
  var directionPointer = (f) => track(f, [[0, 1260, 805], [15, 484, 530], [36, 566, 530], [70, 850, 540], [104, 1246, 540], [132, 1226, 813], [143, 881, 811], [157, 881, 646], [179, 881, 540], [215, 1106, 540], [246, 1106, 540], [278, 1258, 808], [300, 1258, 808]]);
  function pointer(f) {
    const i = Math.min(3, Math.floor(f / 300)), s = f - i * 300;
    return [tiltPointer, deckPointer, expandPointer, directionPointer][i](s);
  }
  function DirectionLayer({ f }) {
    const left = sm(f, 30, 66), leave = sm(f, 98, 116), bottom = sm(f, 157, 192);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("clipPath", { id: "cards-direction", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: -CW / 2 + 15, y: -CH / 2 + 15, width: CW - 30, height: CH * 0.69 }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { clipPath: "url(#cards-direction)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(-CW * (1 - left) + CW * leave, 0), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: -CW / 2 + 15, y: -CH / 2 + 15, width: CW - 30, height: CH * 0.69, fill: C.ink, opacity: ".87" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -250, y: -83, size: 18, fill: "#aeb8a2", spacing: 2, children: "SELECTED WORK / 01" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -250, y: -14, size: 45, fill: C.cream, weight: 600, children: "\u8BA9\u76EE\u5149\u505C\u7559" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Line, { x: -250, y: 30, x2: 249, y2: 30, color: "#829174" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -250, y: 76, size: 23, fill: C.cream, children: "\u5411\u5185\u63A2\u7D22 \xB7 \u67E5\u770B\u5B8C\u6574\u9879\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Arrow, { x: 251, y: 68, color: C.cream })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(0, CH * 0.69 * (1 - bottom)), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: -CW / 2 + 15, y: -CH / 2 + 15, width: CW - 30, height: CH * 0.69, fill: "url(#cards-bottom)" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -250, y: -25, size: 18, fill: "#dfdbce", spacing: 2, children: "LIGHT IN EVERYDAY LIFE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -250, y: 37, size: 43, fill: C.cream, weight: 600, children: "\u5149\u7684\u79E9\u5E8F" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: -250, y: 84, size: 23, fill: C.cream, children: f >= 240 ? "\u5DF2\u9009\u4E2D \xB7 \u5149\u7684\u79E9\u5E8F" : "\u67E5\u770B\u9879\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Arrow, { x: 251, y: 72, color: C.cream })
        ] })
      ] })
    ] });
  }
  function Overlay({ f }) {
    if (f < 78) return null;
    const bf = clamp(f - 150, 0, 1200), mode = Math.min(3, Math.floor(bf / 300)), s = bf - mode * 300, ending = f >= 1350 ? out(f - 1350, 0, 38) : 0, fan = sm(f - 1350, 22, 47), intro = f < 150, land = out(f, 124, 150), gather = sm(f, 78, 101), d = mode === 1 ? deckPose(s) : { x: CX, y: CY, a: 0, s: 1, c: 0 }, q = mode === 2 ? sm(s, 52, 108) * (1 - sm(s, 238, 278)) : 0;
    let x = intro ? mix(mix(657, 667.5, sm(f, 99, 122)), CX, land) : mix(d.x, 720, q), y = intro ? mix(mix(694, 608.5, sm(f, 99, 122)), CY, land) : mix(d.y, 550, q), w = intro ? mix(148, CW, land) : mix(CW, 1188, q), h = intro ? mix(196, CH, land) : mix(CH, 528, q), angle = intro ? -5 * sm(f, 99, 122) * (1 - land) : d.a;
    x = mix(x, 701, ending);
    y = mix(y, 441, ending);
    w = mix(w, 100, ending);
    h = mix(h, 126, ending);
    angle = mix(angle, -17 * fan, ending);
    const tp = tiltPointer(s), active = mode === 0 && !intro ? sm(s, 14, 35) * (1 - sm(s, 206, 245)) : 0, dx = (tp.x - CX) / 300 * active, dy = (tp.y - CY) / 210 * active;
    const master = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { "data-hero": "collection-card", style: { transform: `perspective(1400px) rotateX(${-dy * 9}deg) rotateY(${dx * 11}deg)`, transformOrigin: `${CX}px ${CY}px` }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { transform: tx(x, y - 14 * active) + ` rotate(${angle}) scale(${d.s})`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { x: -w / 2, y: -h / 2, w, h, lift: 24 * active, spot: active, detail: q, reveal: intro ? sm(f, 125, 149) : 1, logo: ending, children: mode === 3 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: 1 - ending, transform: `scale(${w / CW} ${h / CH})`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DirectionLayer, { f: s }) }) : null }) }) }, "master");
    const spread = sm(bf, 270, 300) * (1 - sm(bf, 570, 600));
    const layers = [2, 1].map((i) => {
      const extra = mode === 1 && i === 1 ? d.c : 0, cx = mix(CX, CX + 18 * i * (1 - extra), spread), cy = mix(CY, CY - 19 * i * (1 - extra), spread), sc = mix(1, 1 - 0.035 * i + 0.035 * extra, spread);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: Math.max(spread, ending), transform: tx(mix(cx, 720 + (i - 1) * 19, ending), mix(cy, 444 + (i - 1) * 3, ending)) + ` rotate(${mix(2.5 * i * spread * (1 - extra), (i - 1) * 17 * fan, ending)}) scale(${mix(sc, 1, ending)})`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Card, { x: -mix(CW, 100, ending) / 2, y: -mix(CH, 126, ending) / 2, w: mix(CW, 100, ending), h: mix(CH, 126, ending), art: i, logo: ending, back: i }) }, i);
    });
    const back = mode === 1 && s >= 77 && s < 173;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Defs, {}),
      intro ? [0, 2, 3].map((i) => {
        const p = sm(f, 99, 122), cx = mix(mix(530 + i * 127, 720 + (i - 1.5) * 105, p), 720 + (i - 1.5) * 320, land), cy = mix(mix(694, 600 + Math.abs(i - 1.5) * 17, p), 1250, land);
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { transform: tx(cx, cy) + ` rotate(${(i - 1.5) * 10 * p * (1 - land)})`, opacity: gather, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "-74", y: "-98", width: "148", height: "196", rx: "8", fill: "#fffdf7", stroke: "#b7b6a7" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "-59", y: "-83", width: "118", height: "135", fill: i % 2 ? C.ink : C.red }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 0, y: 0, size: 51, weight: 600, fill: C.cream, anchor: "middle", children: "\u5361\u7247\u4EA4\u4E92"[i] })
        ] }, i);
      }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: intro ? gather : 1, clipPath: intro ? void 0 : "url(#body-boundary)", children: [
        mode === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ellipse", { cx: CX, cy: "790", rx: 250 + 16 * active, ry: 22 + 5 * active, fill: "#293927", opacity: 0.09 * sm(f, 129, 150) * (1 - sm(bf, 270, 300)) }) : null,
        intro ? master : back ? [master, ...layers] : [...layers, master]
      ] })
    ] });
  }
  var Body = ({ f }) => {
    const mode = Math.min(3, Math.floor(f / 300)), s = f - mode * 300, q = mode === 2 ? sm(s, 52, 108) * (1 - sm(s, 238, 278)) : 0;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Window, { title: "\u7075\u611F\u7D20\u6750\u5E93", tag: "ARCHIVE / COLLECTION", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Sidebar, { mode }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "65", y: "248", width: "1310", height: "618", fill: C.ink, opacity: q * 0.13 }),
      mode === 1 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { opacity: pulse(s, 109, 126, 172), children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "699", y: "794", width: "310", height: "40", rx: "20", fill: "#e6e4db" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(T, { x: 854, y: 821, size: 18, anchor: "middle", fill: C.soft, children: "\u6293\u4F4F\u4E0A\u7F18\uFF0C\u5C06\u539F\u5361\u5E26\u56DE\u6765" })
      ] }) : null
    ] }) });
  };
  function Cursor({ f }) {
    const bf = clamp(f - 150, 0, 1200), p = f < 150 ? track(f, [[0, 1480, 850], [123, 1480, 850], [150, 1255, 798]]) : f >= 1350 ? track(f, [[1350, 1258, 808], [1380, 1480, 880]]) : pointer(bf), down = bf >= 348 && bf <= 360 || bf >= 443 && bf <= 456 || bf >= 652 && bf <= 659 || bf >= 838 && bf <= 845 || bf >= 1140 && bf <= 1147;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Mouse, { ...p, down: down ? 1 : 0 });
  }
  var Enter = ({ f, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: 1 - sm(f, 78, 105), children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: out(f, 129, 150), children: body })
  ] });
  var End = ({ f, body }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { opacity: 1 - sm(f, 0, 24), children: body });
  var episode = {
    id: "cards",
    num: 17,
    title: "\u5361\u7247\u4EA4\u4E92",
    context: "\u7075\u611F\u7D20\u6750\u5E93",
    accent: C.red,
    Body,
    Enter,
    End,
    Overlay,
    Cursor,
    prompts: [
      { name: "\u60AC\u6D6E\u5206\u5C42", lines: ["\u7528Remotion\u505A\u5206\u5C42\u60AC\u6D6E\u5361\u7247", "\u6307\u9488\u7275\u52A8\u900F\u89C6\uFF0C\u56FE\u7247\u6587\u5B57\u5206\u522B\u62AC\u8D77"], full: "\u7528 Remotion \u5236\u4F5C\u539F\u7EB8\u98CE\u7075\u611F\u7D20\u6750\u5E93\uFF0C\u5DE6\u4FA7\u662F\u7D20\u6750\u5206\u7C7B\uFF0C\u53F3\u4FA7\u540C\u4E00\u5F20\u6444\u5F71\u4F5C\u54C1\u5361\u7247\u3002\u9F20\u6807\u8FDB\u5165\u540E\u5361\u7247\u5728\u900F\u89C6\u7A7A\u95F4\u7ED5X/Y\u8F74\u968F\u6307\u9488\u503E\u659C\uFF0C\u56FE\u7247\u3001\u6807\u9898\u3001\u6731\u7EA2\u4E66\u7B7E\u6309\u4E0D\u540C\u9AD8\u5EA6\u62AC\u8D77\uFF0C\u6295\u5F71\u968F\u5361\u7247\u53D8\u5316\uFF0C\u659C\u9762\u9AD8\u5149\u53EA\u5728\u60AC\u505C\u65F6\u51FA\u73B0\u3002\u9F20\u6807\u4ECE\u53F3\u4E0A\u79FB\u5230\u5DE6\u4E0B\u518D\u56DE\u5230\u4E2D\u5FC3\uFF0C\u8BA9\u5206\u5C42\u89C6\u5DEE\u6E05\u6670\u53EF\u89C1\uFF1B\u79BB\u5F00\u540E\u6240\u6709\u5C42\u56DE\u5230\u539F\u4F4D\u3002\u4FDD\u6301\u7C73\u767D\u3001\u58A8\u7EFF\u3001\u6731\u7EA2\uFF0C\u56FE\u7247\u4F7F\u7528\u5DF2\u6709\u6388\u6743\u7D20\u6750\uFF0C\u4E0D\u4F9D\u8D56\u968F\u673A\u6570\u6216CSS\u52A8\u753B\u3002", reference: "https://ui.aceternity.com/components/3d-card-effect" },
      { name: "\u53E0\u5361\u6362\u4F4D", lines: ["\u62D6\u52A8\u524D\u5361\u6CBF\u5F27\u7EBF\u7529\u5230\u724C\u5806\u540E", "\u540E\u5361\u987A\u52BF\u8865\u4F4D\uFF0C\u518D\u628A\u539F\u5361\u5E26\u56DE\u6765"], full: "\u5728\u540C\u4E00\u7D20\u6750\u5E93\u91CC\u628A\u6444\u5F71\u5361\u7247\u6392\u6210\u6709\u8F7B\u5FAE\u65CB\u8F6C\u548C\u900F\u89C6\u7684\u4E09\u5C42\u724C\u5806\u3002\u6307\u9488\u6293\u4F4F\u524D\u5361\u5411\u53F3\u4E0B\u7529\u51FA\uFF0C\u524D\u5361\u6CBF\u8FDE\u7EED\u66F2\u7EBF\u79BB\u5F00\u724C\u5806\uFF0C\u7ECF\u8FC7\u906E\u6321\u540E\u5F52\u5165\u540E\u5C42\uFF0C\u7B2C\u4E8C\u5F20\u5361\u81EA\u7136\u8865\u4F4D\u3002\u968F\u540E\u5C06\u539F\u5361\u5E26\u56DE\u524D\u5C42\uFF0C\u8BA9\u6731\u7EA2\u4E66\u7B7E\u548C\u539F\u5C01\u9762\u7EE7\u7EED\u4E32\u8054\u4E0B\u4E00\u6BB5\u3002\u8FD0\u52A8\u5177\u5907\u60EF\u6027\u548C\u8870\u51CF\uFF0C\u724C\u5806\u7684\u5C42\u7EA7\u5207\u6362\u53EA\u80FD\u53D1\u751F\u5728\u4E0D\u88AB\u89C2\u5BDF\u7684\u906E\u6321\u65F6\u523B\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8DF3\u5E27\u6D88\u5931\u3002", reference: "https://reactbits.dev/components/card-swap" },
      { name: "\u5171\u4EAB\u5C55\u5F00", lines: ["\u70B9\u51FB\u5361\u7247\uFF0C\u5C01\u9762\u8FDE\u7EED\u6269\u6210\u8BE6\u60C5", "\u56FE\u7247\u4FDD\u7559\u4F4D\u7F6E\u611F\uFF0C\u6587\u5B57\u987A\u52BF\u91CD\u6392"], full: "\u5236\u4F5C\u5171\u4EAB\u5143\u7D20\u5361\u7247\u5C55\u5F00\uFF1A\u70B9\u51FB\u300A\u5149\u7684\u79E9\u5E8F\u300B\u5361\u7247\u540E\uFF0C\u539F\u5C01\u9762\u548C\u5361\u6846\u8FDE\u7EED\u6269\u6210\u6A2A\u5411\u5927\u8BE6\u60C5\u9762\u677F\uFF0C\u56FE\u7247\u4ECE\u4E0A\u65B9\u5361\u9762\u79FB\u52A8\u5230\u5DE6\u4FA7\u5927\u56FE\uFF0C\u6807\u9898\u79FB\u52A8\u5230\u53F3\u4FA7\u4E0A\u65B9\uFF0C\u63CF\u8FF0\u3001\u65E5\u671F\u548C\u8FDB\u5165\u9879\u76EE\u6309\u94AE\u9519\u5F00\u51FA\u73B0\u3002\u5361\u7247\u8EAB\u4EFD\u3001\u7167\u7247\u548C\u6731\u7EA2\u4E66\u7B7E\u4FDD\u6301\u4E00\u81F4\uFF0C\u80CC\u666F\u8F7B\u5EA6\u538B\u6697\uFF0C\u5173\u95ED\u65F6\u6CBF\u76F8\u540C\u8F68\u8FF9\u6062\u590D\u539F\u5361\uFF0C\u7981\u6B62\u7528\u6574\u9875\u6DE1\u5165\u66FF\u4EE3\u51E0\u4F55\u8FDE\u7EED\u5F62\u53D8\u3002", reference: "https://ui.aceternity.com/components/expandable-card" },
      { name: "\u65B9\u5411\u63ED\u5E55", lines: ["\u906E\u7F69\u4ECE\u9F20\u6807\u8FDB\u5165\u7684\u90A3\u4E00\u4FA7\u6ED1\u6765", "\u79BB\u5F00\u6CBF\u539F\u65B9\u5411\u9000\uFF0C\u5E95\u90E8\u518D\u63ED\u5F00\u8BE6\u60C5"], full: "\u7ED9\u540C\u4E00\u6444\u5F71\u5361\u7247\u52A0\u5165\u65B9\u5411\u611F\u77E5\u7684\u60AC\u505C\u906E\u7F69\u3002\u7B2C\u4E00\u904D\u9F20\u6807\u4ECE\u5DE6\u4FA7\u8FDB\u5165\uFF0C\u6DF1\u58A8\u7EFF\u4FE1\u606F\u5C42\u4ECE\u5DE6\u8FB9\u6ED1\u5165\uFF1B\u5411\u53F3\u79BB\u5F00\u65F6\u906E\u7F69\u5411\u53F3\u9000\u8D70\u3002\u7B2C\u4E8C\u904D\u4ECE\u5E95\u90E8\u8FDB\u5165\uFF0C\u5E95\u90E8\u6E10\u53D8\u4FE1\u606F\u5C42\u81EA\u4E0B\u5411\u4E0A\u63ED\u5F00\u4F5C\u54C1\u6807\u9898\u4E0E\u67E5\u770B\u9879\u76EE\u7BAD\u5934\u3002\u52A8\u4F5C\u4E25\u683C\u7ED1\u5B9A\u6307\u9488\u8FC7\u8FB9\u754C\u7684\u4F4D\u7F6E\uFF0C\u7167\u7247\u4ECD\u5728\u539F\u4F4D\u4E14\u7565\u6709\u89C6\u5DEE\uFF0C\u6731\u7EA2\u4E66\u7B7E\u59CB\u7EC8\u4FDD\u7559\u3002\u6700\u540E\u5361\u7247\u6536\u6210\u4E09\u5F20\u6247\u5F00\u7684\u54C1\u724C\u5361\u7247\u6807\u8BB0\u3002", reference: "https://ui.aceternity.com/components/direction-aware-hover" }
    ],
    cues: [{ f: 28, type: "soft" }, { f: 96, type: "slide", gain: 0.35 }, { f: 228, type: "snap", gain: 0.5 }, { f: 348, type: "click" }, { f: 375, type: "page" }, { f: 403, type: "snap" }, { f: 443, type: "click" }, { f: 478, type: "page" }, { f: 502, type: "snap" }, { f: 652, type: "click" }, { f: 673, type: "stretch" }, { f: 708, type: "reveal" }, { f: 838, type: "click" }, { f: 868, type: "page" }, { f: 930, type: "slide" }, { f: 1004, type: "slide" }, { f: 1057, type: "reveal" }, { f: 1140, type: "click" }],
    introCues: [{ f: 82, type: "tick" }, { f: 101, type: "page" }, { f: 122, type: "snap" }, { f: 145, type: "reveal" }],
    outroCues: [{ f: 9, type: "page" }, { f: 34, type: "flip" }, { f: 47, type: "snap" }, { f: 55, type: "chime", gain: 0.4 }],
    checks: (f) => ({ section: Math.min(3, Math.floor(f / 300)), localFrame: f % 300, identity: "\u5149\u7684\u79E9\u5E8F + \u6731\u7EA2\u4E66\u7B7E", cardCenter: [CX, CY], allActionsFrameBased: true })
  };
  var cards_default = episode;
  var Body2 = cards_default.Body;
  var Cursor2 = cards_default.Cursor;
  var Overlay2 = cards_default.Overlay;
  var root = window.createEffectRoot(document.getElementById("mount"));
  window.drawEffect = (seconds) => {
    const f = Math.round(seconds * 60);
    window.effectFrame = f;
    window.flushEffect(() => root.render(/* @__PURE__ */ import_react2.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", viewBox: "35 135 1370 780" }, /* @__PURE__ */ import_react2.default.createElement("defs", null, /* @__PURE__ */ import_react2.default.createElement("clipPath", { id: "body-boundary" }, /* @__PURE__ */ import_react2.default.createElement("rect", { x: "65", y: "170", width: "1310", height: "696", rx: "25" }))), /* @__PURE__ */ import_react2.default.createElement(Body2, { f }), Overlay2 && /* @__PURE__ */ import_react2.default.createElement(Overlay2, { f: f + 150 }), " ", Cursor2 && /* @__PURE__ */ import_react2.default.createElement(Cursor2, { f: f + 150 }))));
  };
})();
