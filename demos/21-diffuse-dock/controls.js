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
    attach: () => dock
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
  function clickFace(ui, handle) {
    ui.canvas.addEventListener("click", (e) => handle(ui.point(e)));
  }
  function key(ui, handle) {
    ui.canvas.addEventListener("keydown", (e) => {
      if (handle(e.key)) {
        e.preventDefault();
      }
    });
  }
  function dock(ui) {
    let tab = 0, changed = -9, initial = { tab: 0, left: -110, right: -70 };
    function sample(t) {
      const elapsed = t - changed, dest = -90 + tab * 45, forward = tab >= initial.tab;
      const lead = ease(elapsed / 0.235), follow = ease((elapsed - 0.08) / 0.3);
      const tabBounds = { left: mix(initial.left, dest - 20, forward ? follow : lead), right: mix(initial.right, dest + 20, forward ? lead : follow) };
      return { tab: mix(initial.tab, tab, ease(elapsed / 0.33)), tabBounds, light: [tabBounds.left + 10, -20.5] };
    }
    function select(n) {
      const t = now(), s = sample(t);
      initial = { tab: s.tab, ...s.tabBounds };
      tab = clamp(n, 0, 4);
      changed = t;
      ui.actions.forEach((b, i) => b.setAttribute("aria-pressed", String(i === tab)));
      ui.status(ui.actions[tab].textContent);
    }
    buttonEvents(ui, (a) => select(Number(a)));
    clickFace(ui, (p) => {
      if (Math.abs(p.y) < 38) select(Math.round((p.x + 90) / 45));
    });
    key(ui, (k) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(k)) return false;
      select(k === "Home" ? 0 : k === "End" ? 4 : tab + (k === "ArrowRight" ? 1 : -1));
      return true;
    });
    return { sample };
  }
  return __toCommonJS(input_exports);
})();
