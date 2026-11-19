// 夏夏的AI灵感 · 成片画框缩成工具卡。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var import_react4 = __toESM(require_react());
  var import_react3 = __toESM(require_react(), 1);

  // shim:remotion
  var staticFile = (name) => (window.effectAssets || {})[name] || (/paper|grain/.test(name) ? "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cfilter%20id%3D%22p%22%3E%3CfeTurbulence%20baseFrequency%3D%22.8%22%20numOctaves%3D%223%22%2F%3E%3C%2Ffilter%3E%3Cpath%20fill%3D%22%23f7f1e4%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3Cpath%20filter%3D%22url(%23p)%22%20opacity%3D%22.075%22%20d%3D%22M0%200h80v80H0z%22%2F%3E%3C%2Fsvg%3E" : "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22s%22%20x2%3D%22.5%22%20y2%3D%221%22%3E%3Cstop%20stop-color%3D%22%23d7ded2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e9aa71%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23s)%22%20d%3D%22M0%200h600v400H0z%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22149%22%20r%3D%2251%22%20fill%3D%22%23eea464%22%2F%3E%3Cpath%20d%3D%22M0%20283l100-77%2054%2022%2087-78%20194%20124%2095-58%2070%2044v140H0%22%20fill%3D%22%237b958a%22%2F%3E%3Cpath%20d%3D%22M0%20308l141-53%2078%2021%2099-54%20151%2071%20131-29v136H0%22%20fill%3D%22%23365a54%22%2F%3E%3C%2Fsvg%3E");
  var Img = "img";
  var import_react2 = __toESM(require_react(), 1);
  var import_react = __toESM(require_react(), 1);
  var clamp = (n, a = 0, z = 1) => Math.max(a, Math.min(z, n));
  var mix = (a, d, u2) => a + (d - a) * u2;
  var u = (v, a, z) => clamp((v - a) / (z - a));
  var soft = (v, a, z) => {
    const t = u(v, a, z);
    return t * t * t * (t * (t * 6 - 15) + 10);
  };
  var C = { bg: "#03070d", panel: "#09111d", ink: "#f2f8ff", muted: "#91a6c2", blue: "#80c9ff", line: "#35516d", ice: "#b9e5ff" };
  var Outro = ({ t }) => {
    const u2 = soft(t, 0, 0.72), text = soft(t, 0.35, 0.95), fade = 1 - soft(t, 3.3, 3.8);
    const names = [["Three.js", "\u4E09\u7EF4\u573A\u666F"], ["Anime.js", "\u52A8\u4F5C\u7F16\u6392"], ["Tween.js", "\u7F13\u52A8\u8FC7\u6E21"], ["Ammo.js", "\u7269\u7406\u6A21\u62DF"], ["TSL Textures", "\u8868\u9762\u7EB9\u7406"], ["SuperCollider", "\u58F0\u97F3\u5408\u6210"], ["Remotion", "\u4EE3\u7801\u5236\u7247"], ["FFmpeg", "\u5904\u7406\u4E0E\u5BFC\u51FA"]];
    const x = mix(400, 172, u2), y = mix(135, 250, u2), w = mix(640, 190, u2), h = mix(360, 232, u2);
    return /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", inset: 0, opacity: fade } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 42%,#10263c66,transparent 66%)," + C.bg, opacity: soft(t, 0, 0.3) } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: x, top: y, width: w, height: h, borderRadius: mix(14, 18, u2), overflow: "hidden", border: "1px solid #8bb5d966", boxShadow: "0 0 60px #66bfff18", transform: "perspective(1600px) rotateY(" + -8 * u2 + "deg) rotateZ(" + -4 * u2 + "deg)" } }, /* @__PURE__ */ import_react3.default.createElement(Img, { src: staticFile("output/c-end.jpg"), style: { width: "100%", height: "100%", objectFit: "cover", opacity: 1 - soft(t, 0.25, 0.65) } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(130deg,#fff,#e4e9f1 60%,#b7c4d7)", opacity: soft(t, 0.25, 0.65), color: "#122035", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 146, fontWeight: 700, lineHeight: 1 } }, "8"), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 17, letterSpacing: 5, marginTop: 10 } }, "TOOLS"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 418, top: 264, opacity: text, transform: "translateY(" + 18 * (1 - text) + "px)" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 22, letterSpacing: 4, color: C.blue } }, "VIBECODING TOOLKIT"), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 75, fontWeight: 700, letterSpacing: -2, lineHeight: 1.25, marginTop: 15 } }, "\u8BA9\u7075\u611F\uFF0C\u6210\u4E3A\u4F5C\u54C1"), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 30, color: "#a4bbd4", marginTop: 20 } }, "\u4E09\u7EF4 \xB7 \u52A8\u6548 \xB7 \u7269\u7406 \xB7 \u7EB9\u7406 \xB7 \u58F0\u97F3 \xB7 \u5236\u7247")), names.map(([name, use], i) => {
      const v = soft(t, 0.35 + i * 0.045, 0.85 + i * 0.045), col = i % 2, row = Math.floor(i / 2);
      return /* @__PURE__ */ import_react3.default.createElement("div", { key: name, style: { position: "absolute", left: 116 + col * 612, top: 525 + row * 96 + 22 * (1 - v), width: 594, height: 80, opacity: v, border: "1px solid #6d99be44", borderRadius: 13, background: "linear-gradient(140deg,#13223566,#07101b99)", padding: "15px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 39, fontWeight: 700, letterSpacing: -0.6, color: "#ebf5ff" } }, name), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: 31, color: "#b5c9df", marginTop: 0 } }, use));
    }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 116, right: 116, top: 939, height: 1, background: "linear-gradient(90deg,transparent,#7ba7ce88,transparent)", opacity: text } }));
  };
  var design = document.querySelector("#design");
  var stage = document.querySelector("#stage");
  function size() {
    design.style.transform = "scale(" + stage.clientWidth / 1440 + ")";
  }
  new ResizeObserver(size).observe(stage);
  size();
  var reactRoot = window.createEffectRoot(design);
  window.effectAssets = { "output/c-end.jpg": "c-end.jpg" };
  window.drawEffect = (t) => {
    window.previewTime = t;
    window.flushEffect(() => reactRoot.render(/* @__PURE__ */ import_react4.default.createElement(Outro, { t, metrics: { c: { inputDuration: 12, outputDuration: 3 } } })));
  };
})();
