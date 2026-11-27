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
    attach: () => pass
  });
  var clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  var ease = (x) => {
    x = clamp(x);
    return x * x * (3 - 2 * x);
  };
  var mix = (a, b, t) => a + (b - a) * t;
  var now = () => performance.now() / 1e3;
  function buttonEvents(ui, handle) {
    ui.actions.forEach((b) => b.addEventListener("click", () => handle(b.dataset.act)));
  }
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
  function pass(ui) {
    let tilt = 0, saved = false, changed = -9, from = 0;
    const collect = (t) => mix(from, Number(saved), ease((t - changed) / 0.2));
    function set(v) {
      tilt = clamp(v, -1, 1);
      ui.field.value = String(tilt);
    }
    function toggle() {
      const t = now();
      from = collect(t);
      saved = !saved;
      changed = t;
      ui.status(saved ? "已收藏" : "已取消收藏");
    }
    ui.field.oninput = () => set(+ui.field.value);
    buttonEvents(ui, toggle);
    ui.canvas.addEventListener("pointermove", (e) => set(ui.point(e).x / 93));
    let down = null;
    drag(ui, (p) => {
      down = p;
    }, (p) => set(p.x / 93), (p, cancel) => {
      if (!cancel && down && Math.hypot(p.x - down.x, p.y - down.y) < 6) toggle();
      down = null;
    });
    key(ui, (k) => {
      if (k === " " || k === "Enter") {
        toggle();
        return true;
      }
      if (["ArrowRight", "ArrowLeft"].includes(k)) {
        set(tilt + (k === "ArrowRight" ? 0.12 : -0.12));
        return true;
      }
      return false;
    });
    return { sample: (t) => ({ spatial: false, tilt, foilTurn: tilt, collected: collect(t) }) };
  }
  return __toCommonJS(input_exports);
})();
