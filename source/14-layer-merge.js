// 夏夏的AI灵感 · 画面、边框、文字与声纹合层。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var import_react5 = __toESM(require_react());
  var import_react4 = __toESM(require_react(), 1);

  // shim:remotion
  var staticFile = (name) => (window.effectAssets || {})[name] || (/paper|grain/.test(name) ? "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cfilter%20id%3D%22p%22%3E%3CfeTurbulence%20baseFrequency%3D%22.8%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Cpath%20fill%3D%22%23f7f1e4%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3Cpath%20filter%3D%22url(%23p)%22%20opacity%3D%22.075%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3C%2Fsvg%3E" : "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22s%22%20x2%3D%22.5%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7ded2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9aa71%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23s)%22%20d%3D%22M0%200h600v400H0z%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22149%22%20r%3D%2251%22%20fill%3D%22%23eea464%22%2F%3E%3Cpath%20d%3D%22M0%20283l100-77%2054%2022%2087-78%20194%20124%2095-58%2070%2044v140H0%22%20fill%3D%22%237b958a%22%2F%3E%3Cpath%20d%3D%22M0%20308l141-53%2078%2021%2099-54%20151%2071%20131-29v136H0%22%20fill%3D%22%23365a54%22%2F%3E%3C%2Fsvg%3E");
  var Img = "img";
  var import_react3 = __toESM(require_react(), 1);
  var import_react2 = __toESM(require_react(), 1);
  var import_react = __toESM(require_react(), 1);
  var clamp = (n, a = 0, z = 1) => Math.max(a, Math.min(z, n));
  var mix = (a, d, u2) => a + (d - a) * u2;
  var u = (v, a, z) => clamp((v - a) / (z - a));
  var soft = (v, a, z) => {
    const t = u(v, a, z);
    return t * t * t * (t * (t * 6 - 15) + 10);
  };
  var rnd = (n) => {
    const k = Math.sin(n * 78.233 + 29.11) * 38714.147;
    return k - Math.floor(k);
  };
  var C = { bg: "#03070d", panel: "#09111d", ink: "#f2f8ff", muted: "#91a6c2", blue: "#80c9ff", line: "#35516d", ice: "#b9e5ff" };
  var FONT = '"Sans","Chinese",sans-serif';
  var Artwork = ({ t, title = ["\u5373\u523B", "\u51FA\u7247"], density = 18, motif = 0, layer = "all", portrait = false }) => {
    const id = (0, import_react2.useId)().replace(/:/g, "");
    const h = portrait ? 1e3 : 562.5;
    const cy = portrait ? 430 : 282;
    const all = layer === "all";
    const g = all || layer === "graphics", ty = all || layer === "title", fr = all || layer === "frame", wv = layer === "wave";
    const points = Array.from({ length: 48 }, (_, i) => [rnd(i + 7) * 1e3, rnd(i + 33) * h]);
    return /* @__PURE__ */ import_react2.default.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 1000 " + h, style: { display: "block", overflow: "hidden" } }, /* @__PURE__ */ import_react2.default.createElement("defs", null, /* @__PURE__ */ import_react2.default.createElement("radialGradient", { id: id + "bg" }, /* @__PURE__ */ import_react2.default.createElement("stop", { stopColor: "#102a43" }), /* @__PURE__ */ import_react2.default.createElement("stop", { offset: "1", stopColor: C.bg })), /* @__PURE__ */ import_react2.default.createElement("linearGradient", { id: id + "line" }, /* @__PURE__ */ import_react2.default.createElement("stop", { stopColor: "#315e85" }), /* @__PURE__ */ import_react2.default.createElement("stop", { offset: ".42", stopColor: "#b5e4ff" }), /* @__PURE__ */ import_react2.default.createElement("stop", { offset: ".65", stopColor: "#78b5e3" }), /* @__PURE__ */ import_react2.default.createElement("stop", { offset: "1", stopColor: "#285277" })), /* @__PURE__ */ import_react2.default.createElement("filter", { id: id + "glow", x: "-40%", y: "-40%", width: "180%", height: "180%" }, /* @__PURE__ */ import_react2.default.createElement("feGaussianBlur", { stdDeviation: "2.8" }))), g && /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("rect", { width: "1000", height: h, fill: "url(#" + id + "bg)" }), points.map(([x, y], i) => /* @__PURE__ */ import_react2.default.createElement("circle", { key: i, cx: x, cy: y + Math.sin(t * 0.4 + i) * 4, r: i % 7 === 0 ? 1.6 : 0.7, fill: C.ice, opacity: 0.15 + 0.12 * Math.sin(t + i) })), /* @__PURE__ */ import_react2.default.createElement("g", { transform: "translate(500 " + cy + ")", fill: "none" }, motif === 0 && Array.from({ length: 24 }, (_, i) => {
      const op = clamp(density - i), a = i * Math.PI / 24 + t * 0.22, rx = 210;
      return /* @__PURE__ */ import_react2.default.createElement("g", { key: i, opacity: op * 0.8, transform: "rotate(" + (-21 + Math.sin(t * 0.4) * 9) + ")" }, /* @__PURE__ */ import_react2.default.createElement("ellipse", { rx, ry: 26 + Math.abs(Math.sin(a)) * 178, stroke: "url(#" + id + "line)", strokeWidth: "1.7", transform: "rotate(" + (i * 7.5 + t * 3) + ")" }));
    }), motif === 1 && Array.from({ length: 23 }, (_, i) => {
      const y = (i - 11) * 10, phase = t * 1.2 + i * 0.1;
      const d = "M-460 " + (y + Math.sin(phase) * 20) + " C-240 " + (y - 180 * Math.sin(phase + 0.5)) + " -140 " + (y + 160) + " 0 " + y + " S260 " + (y - 170 * Math.cos(phase)) + " 460 " + (y + 30);
      return /* @__PURE__ */ import_react2.default.createElement("path", { key: i, d, stroke: "url(#" + id + "line)", strokeWidth: i % 4 === 0 ? 2.2 : 1.2, opacity: 0.3 + i % 4 * 0.18 });
    }), motif === 2 && Array.from({ length: 21 }, (_, i) => {
      const a = i * 2.4 + t * 0.16, r = 74 + Math.sqrt(i) * 43, x = Math.cos(a) * r, y = Math.sin(a) * r * 0.68, s = 17 + i % 3 * 8;
      return /* @__PURE__ */ import_react2.default.createElement("g", { key: i, transform: "translate(" + x + " " + y + ") rotate(" + (i * 17 + t * (i % 2 ? 6 : -4)) + ")", stroke: i % 3 ? C.blue : C.ink, strokeWidth: "1.6", opacity: 0.4 + i % 4 * 0.12 }, /* @__PURE__ */ import_react2.default.createElement("path", { d: "M" + -s + " " + -s * 0.5 + " L0 " + -s + " L" + s + " " + -s * 0.5 + " V" + s * 0.55 + " L0 " + s + " L" + -s + " " + s * 0.55 + "Z M" + -s + " " + -s * 0.5 + " L0 0 L" + s + " " + -s * 0.5 + " M0 0 V" + s }));
    }))), fr && /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("rect", { x: "27", y: "27", width: "946", height: h - 54, rx: "7", fill: "none", stroke: C.blue, strokeOpacity: ".3", strokeWidth: "1" }), /* @__PURE__ */ import_react2.default.createElement("path", { d: "M27 73V27H73 M927 27H973V73 M27 " + (h - 73) + "V" + (h - 27) + "H73 M927 " + (h - 27) + "H973V" + (h - 73), fill: "none", stroke: C.ice, strokeWidth: "2" }), all && /* @__PURE__ */ import_react2.default.createElement("text", { x: "52", y: "64", fill: C.ice, fontFamily: FONT, fontSize: "14", letterSpacing: "4" }, "MOTION STUDY"), /* @__PURE__ */ import_react2.default.createElement("text", { x: "946", y: h - 45, textAnchor: "end", fill: C.muted, fontFamily: FONT, fontSize: "14" }, "0", motif + 1, " / REACT")), ty && /* @__PURE__ */ import_react2.default.createElement("g", { fontFamily: FONT, textAnchor: "middle", fill: C.ink, fontWeight: "700", style: { paintOrder: "stroke" }, stroke: C.bg, strokeWidth: "2" }, title.map((s, i) => /* @__PURE__ */ import_react2.default.createElement("text", { key: i, x: "500", y: cy - 8 + i * 124, fontSize: portrait ? 132 : 118, letterSpacing: "10" }, s))), wv && /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("rect", { width: "1000", height: h, fill: "#03070d", fillOpacity: ".08" }), /* @__PURE__ */ import_react2.default.createElement("g", { stroke: C.blue, strokeWidth: "4", strokeLinecap: "round" }, Array.from({ length: 74 }, (_, i) => {
      const a = 9 + Math.abs(Math.sin(i * 0.72) + Math.sin(i * 0.29 + 1)) * 23;
      return /* @__PURE__ */ import_react2.default.createElement("path", { key: i, d: "M" + (65 + i * 12) + " " + (h * 0.74 - a) + " v" + a * 2, opacity: 0.42 + 0.5 * rnd(i) });
    }))));
  };
  var sec = (t, a, b) => soft(t, a, b);
  var box = (x, y, w, h) => ({ position: "absolute", left: x, top: y, width: w, height: h });
  var panel = { background: "linear-gradient(135deg,#101e2c,#050a11)", border: "1px solid #36546e", borderRadius: 18, boxShadow: "0 15px 55px #0008,0 0 32px #68bfff09", overflow: "hidden" };
  var label = { fontSize: 26, color: C.muted, letterSpacing: 1 };
  var Mono = ({ children, style = {} }) => /* @__PURE__ */ import_react4.default.createElement("div", { style: { fontFamily: '"SFMono-Regular",Menlo,monospace', ...style } }, children);
  var Media = ({ src }) => {
    const t = window.previewTime || 0;
    const raw = Math.max(0, t - 6.55), v = src.includes("cut") ? 1 + Math.min(2, Math.floor(t - 9.7)) * 4 + (t - 9.7) % 1 : raw;
    return /* @__PURE__ */ import_react4.default.createElement(Artwork, { t: v, motif: Math.min(2, Math.floor(v / 4)), title: ["\u7075\u611F", "\u6210\u5F62"] });
  };
  var VariantC = ({ t, metrics }) => {
    const merge = sec(t, 2.9, 5.2), grow = sec(t, 5.2, 6.1);
    const shrink = sec(t, 6.55, 7.7), cut = sec(t, 8.15, 9.55);
    const bx = mix(mix(295, 170, grow), 400, shrink), by = mix(mix(218, 155, grow), 135, shrink);
    const bw = mix(mix(850, 1100, grow), 640, shrink), bh = bw * 0.5625;
    const layerNames = ["\u753B\u9762", "\u8FB9\u6846", "\u6587\u5B57", "\u58F0\u97F3"];
    return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, t < 6.55 && ["graphics", "frame", "title", "wave"].map((layer, i) => {
      const arrive = sec(t, 0.1 + i * 0.25, 0.8 + i * 0.25), spacing = (i - 1.5) * 100 * (1 - merge);
      const lx = bx + spacing, ly = by + (i - 1.5) * 72 * (1 - merge), focus = sec(t, 0.1 + i * 0.45, 0.5 + i * 0.45) * (1 - sec(t, 0.7 + i * 0.45, 1.2 + i * 0.45));
      return /* @__PURE__ */ import_react4.default.createElement("div", { key: layer, style: { ...box(lx, ly, bw, bh), opacity: 1, transform: "perspective(1600px) rotateX(" + mix(11, 0, merge) + "deg) rotateY(" + mix(-19, 0, merge) + "deg) translateY(0px)", transformOrigin: "center", border: "1px solid rgba(135,202,247," + (0.55 + focus * 0.4) * (1 - merge) + ")", borderRadius: 14 * merge, boxShadow: "0 10px 40px rgba(0,0,0," + 0.3 * (1 - merge) + ")", background: layer === "graphics" ? C.bg : "rgba(5,13,21," + 0.25 * (1 - merge) + ")", overflow: "hidden" } }, /* @__PURE__ */ import_react4.default.createElement("div", { style: { width: "100%", height: "100%", opacity: arrive * (layer === "wave" ? 1 - merge : 1), filter: "brightness(" + (1 + focus * 0.22) + ")" } }, /* @__PURE__ */ import_react4.default.createElement(Artwork, { t: t - 6.55, title: ["\u7075\u611F", "\u6210\u5F62"], layer })), i === 0 && /* @__PURE__ */ import_react4.default.createElement("div", { style: { position: "absolute", left: "50%", top: "50%", width: 6, height: 6, margin: -3, borderRadius: "50%", background: C.ice, boxShadow: "0 0 18px " + C.blue, opacity: 1 - sec(t, 0.1, 0.6) } }), /* @__PURE__ */ import_react4.default.createElement(Mono, { style: { position: "absolute", top: 20, left: 22, fontSize: 32, fontWeight: 700, color: C.ice, opacity: arrive * (1 - merge) } }, layerNames[i]));
    }), t >= 6.55 && /* @__PURE__ */ import_react4.default.createElement("div", { style: { ...box(bx, by, bw, bh), ...panel, borderRadius: 14 } }, t < 9.7 ? /* @__PURE__ */ import_react4.default.createElement(Media, { src: "input/c-source.mp4", duration: 12, from: 6.55 }) : /* @__PURE__ */ import_react4.default.createElement(Media, { src: "output/c-cut.mp4", duration: 3, from: 9.7 })), /* @__PURE__ */ import_react4.default.createElement("div", { style: { ...box(115, 550, 1210, 210), opacity: sec(t, 6.75, 7.65) } }, /* @__PURE__ */ import_react4.default.createElement(Mono, { style: { fontSize: 30, marginBottom: 20, color: C.ice } }, cut < 0.5 ? "source.mp4" : "cut.mp4", " ", /* @__PURE__ */ import_react4.default.createElement("span", { style: { float: "right", color: C.ink, fontSize: 34 } }, (metrics.c?.inputDuration ?? 12).toFixed(1), " s ", /* @__PURE__ */ import_react4.default.createElement("span", { style: { color: C.blue, margin: "0 12px" } }, "\u2192"), /* @__PURE__ */ import_react4.default.createElement("span", { style: { opacity: cut } }, (metrics.c?.outputDuration ?? 3).toFixed(1), " s"))), /* @__PURE__ */ import_react4.default.createElement("div", { style: { position: "relative", height: 108, background: "#07111a", borderRadius: 12, overflow: "hidden", border: "1px solid #35516d" } }, [0, 1, 2].map((i) => {
      const originalX = i * 403, selectedX = originalX + 100.75, finalX = 150 + i * 303;
      return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, { key: i }, /* @__PURE__ */ import_react4.default.createElement("div", { style: { ...box(originalX, 0, 403, 106), opacity: 1 - cut, overflow: "hidden" } }, /* @__PURE__ */ import_react4.default.createElement(Img, { src: staticFile("output/c-thumb-" + i + ".jpg"), style: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 } }), /* @__PURE__ */ import_react4.default.createElement("div", { style: { position: "absolute", bottom: 7, left: 13, fontSize: 23 } }, i * 4, "\u2013", i * 4 + 4, " s")), /* @__PURE__ */ import_react4.default.createElement("div", { style: { ...box(mix(selectedX, finalX, cut), 0, mix(100.75, 303, cut), 106), border: "2px solid " + C.blue, borderRadius: 7, overflow: "hidden", boxShadow: "0 0 18px #74beff44" } }, /* @__PURE__ */ import_react4.default.createElement(Img, { src: staticFile("output/c-thumb-" + i + ".jpg"), style: { width: "100%", height: "100%", objectFit: "cover" } }), /* @__PURE__ */ import_react4.default.createElement("div", { style: { position: "absolute", bottom: 7, left: 12, fontSize: 22, textShadow: "0 2px 5px black" } }, i * 4 + 1, "\u2013", i * 4 + 2, " s")));
    }), t >= 9.7 && /* @__PURE__ */ import_react4.default.createElement("div", { style: { position: "absolute", left: 150 + clamp((t - 9.7) / 3) * 909, top: 0, width: 3, height: "100%", background: C.ink, boxShadow: "0 0 12px " + C.ice } })), /* @__PURE__ */ import_react4.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 24, color: C.muted, marginTop: 14 } }, /* @__PURE__ */ import_react4.default.createElement("span", null, cut > 0.95 ? "3 \xD7 1.0 s" : "12.0 s / 3 clips"), /* @__PURE__ */ import_react4.default.createElement("span", null, cut > 0.95 ? "MP4 \xB7 \u5DF2\u8F93\u51FA" : "00:00 \u2013 00:12"))));
  };
  var design = document.querySelector("#design");
  var stage = document.querySelector("#stage");
  function size() {
    design.style.transform = "scale(" + stage.clientWidth / 1440 + ")";
  }
  new ResizeObserver(size).observe(stage);
  size();
  var reactRoot = window.createEffectRoot(design);
  window.effectAssets = {};
  window.drawEffect = (t) => {
    window.previewTime = t;
    window.flushEffect(() => reactRoot.render(/* @__PURE__ */ import_react5.default.createElement(VariantC, { t, metrics: { c: { inputDuration: 12, outputDuration: 3 } } })));
  };
})();
