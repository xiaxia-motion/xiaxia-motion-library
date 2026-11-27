// 导出按钮按压反馈的真实输入与状态。
(() => {
  const installComponent = function exported({ model: m, actions: a, show }) {
    m.frame = a[0] - 8;
    m.running = false;
    function start() {
      m.frame = a[0] - 4;
      m.running = true;
      show("正在导出");
    }
    return {
      step(dt) {
        if (!m.running) return false;
        m.frame = Math.min(a[1] + 12, m.frame + dt * 60);
        if (m.frame >= a[1] + 12) {
          m.running = false;
          show("已导出");
        }
        return m.running;
      },
      down(x, y) {
        if (x >= 335 && x <= 793 && y >= 335 && y <= 437) start();
      },
      key(k) {
        if (k !== "Enter" && k !== " ") return false;
        start();
        return true;
      }
    };
  };
  (() => {
    const { config, draw } = window.geometryScene;
    const canvas = document.querySelector("canvas");
    const status = document.querySelector("#feedback");
    const model = { frame: config.frames[0] };
    let last = 0, raf = 0, activePointer = null;
    const tweens = /* @__PURE__ */ new Map();
    const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
    function inverseSmooth(v) {
      let left = 0, right = 1;
      for (let i = 0; i < 20; i++) {
        const x = (left + right) / 2;
        if (x * x * (3 - 2 * x) < v) left = x;
        else right = x;
      }
      return v <= 0 ? 0 : v >= 1 ? 1 : (left + right) / 2;
    }
    function setPosition(key, value) {
      tweens.delete(key);
      model[key] = value;
    }
    function tween(key, to, frames) {
      tweens.set(key, { from: model[key], to, frames, age: 0 });
      wake();
    }
    function show(message) {
      if (status.textContent !== message) status.textContent = message;
    }
    function wake() {
      if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
    }
    function tick(now) {
      raf = 0;
      const dt = last ? Math.min(0.1, (now - last) / 1e3) : 0;
      last = now;
      for (const [key, t] of tweens) {
        t.age += dt * config.fps;
        const u = clamp(t.age / t.frames);
        model[key] = t.from + (t.to - t.from) * u * u * (3 - 2 * u);
        if (u === 1) tweens.delete(key);
      }
      const advancing = driver.step?.(dt);
      paint();
      if (advancing || tweens.size) wake();
      else last = 0;
    }
    function paint() {
      draw(driver.frame ? driver.frame() : model.frame, model);
    }
    const actions = config.scene.slice(5);
    const api = { model, config, actions, clamp, setPosition, tween, show, wake, inverseSmooth };
    const driver = installComponent(api);
    function coords(e) {
      const rect = canvas.getBoundingClientRect(), [x, y, w, h] = config.view;
      return [x + (e.clientX - rect.left) * w / rect.width, y + (e.clientY - rect.top) * h / rect.height];
    }
    canvas.addEventListener("pointerdown", (e) => {
      if (activePointer !== null || e.button !== 0) return;
      e.preventDefault();
      activePointer = e.pointerId;
      canvas.setPointerCapture(e.pointerId);
      canvas.focus();
      driver.down?.(...coords(e));
      paint();
      wake();
    });
    canvas.addEventListener("pointermove", (e) => {
      if (activePointer !== null && e.pointerId !== activePointer) return;
      if (activePointer !== null || driver.hover) {
        driver.move?.(...coords(e));
        paint();
      }
    });
    canvas.addEventListener("pointerup", (e) => {
      if (activePointer !== e.pointerId) return;
      activePointer = null;
      driver.up?.(...coords(e));
      paint();
      wake();
    });
    canvas.addEventListener("lostpointercapture", (e) => {
      if (activePointer === e.pointerId) {
        activePointer = null;
        driver.cancel?.();
        paint();
        wake();
      }
    });
    canvas.addEventListener("keydown", (e) => {
      if (driver.key?.(e.key)) {
        e.preventDefault();
        paint();
        wake();
      }
    });
    document.addEventListener("visibilitychange", () => {
      last = 0;
      if (!document.hidden) wake();
    });
    window.geometryDemo = { snapshot: () => ({ ...model }), redraw: paint };
    paint();
    wake();
  })();
})();
