var DiffuseInput = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // input.js
  var input_exports = {};
  __export(input_exports, {
    attach: () => dial
  });
  var clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  var now = () => performance.now() / 1e3;
  function key(ui, handle) {
    ui.canvas.addEventListener("keydown", (e) => {
      if (handle(e.key)) {
        e.preventDefault();
      }
    });
  }
  function drag(ui, down, move, up) {
    let pointer = null;
    ui.canvas.addEventListener("pointerdown", (e) => {
      if (pointer !== null || e.button !== 0) return;
      ui.canvas.focus({ preventScroll: true });
      pointer = e.pointerId;
      ui.canvas.setPointerCapture(pointer);
      down(ui.point(e));
    });
    ui.canvas.addEventListener("pointermove", (e) => {
      if (pointer === e.pointerId) move(ui.point(e));
    });
    function release(e, cancel) {
      if (pointer !== e.pointerId) return;
      pointer = null;
      up(ui.point(e), cancel);
    }
    ui.canvas.addEventListener("pointerup", (e) => release(e, false));
    ui.canvas.addEventListener("pointercancel", (e) => release(e, true));
    ui.canvas.addEventListener("lostpointercapture", (e) => release(e, true));
  }
  function dial(ui) {
    let target = -12, anchor = 0, base = target, direct = target, released = -9, velocity = 0;
    const value = (t) => clamp(target + velocity * Math.exp(-8 * (t - released)) * Math.sin(19 * (t - released)), -18, 12);
    function set(n, release = false) {
      const old = target;
      target = clamp(n, -18, 12);
      direct = target;
      velocity = release ? Math.sign(target - old || 1) * 1.45 : 0;
      released = now();
      ui.field.value = String(target);
      ui.status(target.toFixed(1) + " dB");
    }
    ui.field.oninput = () => set(+ui.field.value, true);
    drag(ui, (p) => {
      anchor = p.x - 0.6 * p.y;
      base = target;
      velocity = 0;
    }, (p) => set(base + (p.x - 0.6 * p.y - anchor) * 0.19), (p) => {
      released = now();
      velocity = clamp((direct - base) * 0.22, -2.8, 2.8);
    });
    key(ui, (k) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(k)) return false;
      set(target + (["ArrowRight", "ArrowUp"].includes(k) ? 1 : -1), true);
      return true;
    });
    return { sample(t) {
      const gain = value(t), a = 0.74 * Math.PI + 1.52 * Math.PI * (gain + 18) / 30;
      return { gain, light: [115 * Math.cos(a), 115 * Math.sin(a)] };
    } };
  }
  return __toCommonJS(input_exports);
})();
