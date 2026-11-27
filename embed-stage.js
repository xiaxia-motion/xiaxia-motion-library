(() => {
  const params = new URLSearchParams(window.location.search);
  const isEmbed = params.get("embed") === "1" || window.self !== window.top;
  if (!isEmbed) return;

  const docEl = document.documentElement;
  docEl.classList.add("xiaxia-embed");

  // 判断当前页是否已有自带桥接的键盘控制器（避免重复触发指令）
  const hasNativeBridge = Boolean(document.querySelector('script[src*="viewer.js"]') && window.KeyboardUI);

  function getStageEl() {
    const main = document.querySelector("main");
    if (!main) return null;
    return (
      main.querySelector(":scope > #stage") ||
      main.querySelector(":scope > .stage") ||
      main.querySelector(":scope > canvas#picture") ||
      main.querySelector(":scope > figure") ||
      main.querySelector(":scope > .demo")
    );
  }

  function detectAspect(stage) {
    if (!stage) return null;
    if (stage.tagName === "CANVAS" && stage.width > 0 && stage.height > 0) {
      return stage.width / stage.height;
    }
    const cvs = stage.querySelector("canvas");
    if (cvs && cvs.width > 0 && cvs.height > 0) {
      return cvs.width / cvs.height;
    }
    const cs = window.getComputedStyle(stage);
    const ar = cs.aspectRatio;
    if (ar && ar !== "auto") {
      const m = ar.match(/([\d.]+)\s*(?:\/\s*([\d.]+))?/);
      if (m) {
        const a = parseFloat(m[1]);
        const b = m[2] ? parseFloat(m[2]) : 1;
        if (a > 0 && b > 0) return a / b;
      }
    }
    return null;
  }

  let tallMode = false;

  function fitLayout() {
    const main = document.querySelector("main");
    if (!main) return;
    const stage = getStageEl();
    const vh = window.innerHeight || 600;
    const vw = main.clientWidth || window.innerWidth || 800;

    // 重置上一次精确盒尺寸，先计算除舞台外其余控件总高度
    if (stage && stage.classList.contains("xiaxia-fit-box")) {
      stage.classList.remove("xiaxia-fit-box");
      stage.style.removeProperty("--xx-fit-w");
      stage.style.removeProperty("--xx-fit-h");
    }

    const csMain = window.getComputedStyle(main);
    const padY = (parseFloat(csMain.paddingTop) || 0) + (parseFloat(csMain.paddingBottom) || 0);
    const padX = (parseFloat(csMain.paddingLeft) || 0) + (parseFloat(csMain.paddingRight) || 0);
    const gap = parseFloat(csMain.rowGap || csMain.gap) || 7;

    let otherH = padY;
    let visibleCount = 0;
    Array.from(main.children).forEach((el) => {
      const cs = window.getComputedStyle(el);
      if (cs.display === "none") return;
      visibleCount += 1;
      if (el === stage) return;
      otherH += el.getBoundingClientRect().height;
    });
    if (visibleCount > 1) otherH += gap * (visibleCount - 1);

    const availW = Math.max(180, vw - padX);
    const availH = Math.max(140, vh - otherH - 2);

    // 1. 固定画布比例的舞台（canvas / #stage / .stage）：按可用高宽严格等比缩放至 100% 落入一屏
    const isDomDemo = stage && stage.classList.contains("demo");
    const isFigure = stage && stage.tagName === "FIGURE";
    const ratio = !isDomDemo && !isFigure ? detectAspect(stage) : null;

    if (stage && ratio && !stage.querySelector("canvas#stage[width='1440']") && stage.tagName !== "CANVAS") {
      let fitW = availW;
      let fitH = fitW / ratio;
      if (fitH > availH) {
        fitH = availH;
        fitW = fitH * ratio;
      }
      stage.classList.add("xiaxia-fit-box");
      stage.style.setProperty("--xx-fit-w", Math.floor(fitW) + "px");
      stage.style.setProperty("--xx-fit-h", Math.floor(fitH) + "px");
    } else if (stage && stage.tagName === "CANVAS" && ratio) {
      let fitW = availW;
      let fitH = fitW / ratio;
      if (fitH > availH) {
        fitH = availH;
        fitW = fitH * ratio;
      }
      stage.classList.add("xiaxia-fit-box");
      stage.style.setProperty("--xx-fit-w", Math.floor(fitW) + "px");
      stage.style.setProperty("--xx-fit-h", Math.floor(fitH) + "px");
    }

    // 2. 检测 DOM 交互页（如折叠展开/多卡堆叠）或极端矮屏是否仍需上下滚动
    docEl.classList.remove("xiaxia-tall");
    const needScroll =
      (isDomDemo && stage.scrollHeight > availH + 22) ||
      main.scrollHeight > vh + 24;

    tallMode = Boolean(needScroll);
    if (tallMode) {
      docEl.classList.add("xiaxia-tall");
    }
    reportState();
  }

  function getScrollInfo() {
    const maxScroll = Math.max(0, Math.round(docEl.scrollHeight - window.innerHeight));
    const scrollTop = Math.max(0, Math.round(window.scrollY || docEl.scrollTop || 0));
    return {
      scrollable: tallMode && maxScroll > 20,
      scrollTop,
      maxScroll,
    };
  }

  function getControlState() {
    const modeBtn = document.getElementById("mode");
    const soundBtn = document.getElementById("sound");
    const imeInput = document.getElementById("imeInput");
    const isLive = modeBtn ? modeBtn.getAttribute("aria-pressed") === "true" : false;
    const soundOn = soundBtn ? soundBtn.getAttribute("aria-pressed") === "true" : false;
    return {
      hasMode: Boolean(modeBtn),
      mode: isLive ? "live" : "demo",
      hasSound: Boolean(soundBtn),
      soundOn,
      supportsChinese: Boolean(imeInput || window.KeyboardUI),
    };
  }

  function reportState() {
    try {
      window.parent.postMessage(
        Object.assign({ type: "xiaxia-demo-state" }, getControlState(), getScrollInfo()),
        "*"
      );
    } catch {}
  }

  window.addEventListener("message", (ev) => {
    const d = ev.data;
    if (!d || d.type !== "xiaxia-cmd") return;
    if (d.cmd === "query-state") {
      fitLayout();
      return;
    }
    if (d.cmd === "scroll-down") {
      window.scrollBy({ top: Math.round(window.innerHeight * 0.65), behavior: "smooth" });
      return;
    }
    if (d.cmd === "scroll-top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (hasNativeBridge) return;
    if (d.cmd === "toggle-mode") {
      const btn = document.getElementById("mode");
      if (btn) btn.click();
    } else if (d.cmd === "set-mode") {
      const btn = document.getElementById("mode");
      const wantLive = d.value === "live";
      if (btn && (btn.getAttribute("aria-pressed") === "true") !== wantLive) btn.click();
    } else if (d.cmd === "toggle-sound") {
      const btn = document.getElementById("sound");
      if (btn) btn.click();
    } else if (d.cmd === "restart") {
      const btn = document.getElementById("restart") || document.getElementById("reset");
      if (btn) btn.click();
    }
    setTimeout(reportState, 80);
  });

  window.addEventListener("resize", fitLayout, { passive: true });
  window.addEventListener("scroll", reportState, { passive: true });
  document.addEventListener("click", () => setTimeout(() => { fitLayout(); }, 60), true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      fitLayout();
      setTimeout(fitLayout, 180);
      setTimeout(fitLayout, 520);
    });
  } else {
    fitLayout();
    setTimeout(fitLayout, 180);
    setTimeout(fitLayout, 520);
  }
})();
