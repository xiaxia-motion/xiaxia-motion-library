// 夏夏的AI灵感 · 独立键盘组件预览与交互控制器（定稿演示 / 自己操作双模式，全面支持中文汉字输入法）。
(() => {
  const get = (id) => document.getElementById(id);
  const cfg = window.EFFECT_SETTINGS || {};
  const UI = window.KeyboardUI;
  const spec = UI.config;
  const canvas = get("stage");
  const ctx = canvas.getContext("2d", { alpha: false });
  const progress = get("time");
  const playButton = get("play");
  const modeButton = get("mode");
  const soundButton = get("sound");
  const actionsWrap = get("actions");
  const status = get("status");
  const readout = get("readout");

  // 嵌入展馆模式时自动精简外框，最大化舞台展示面积
  const params = new URLSearchParams(window.location.search);
  if (params.get("embed") === "1" || window.self !== window.top) {
    document.body.classList.add("is-embed");
  }

  // 动态注入中文/英文输入法输入框，确保桌面拼音与手机中文键盘均可直接打汉字
  let imeInput = get("imeInput");
  if (!imeInput && actionsWrap) {
    imeInput = document.createElement("input");
    imeInput.id = "imeInput";
    imeInput.type = "text";
    imeInput.autocomplete = "off";
    imeInput.spellcheck = false;
    imeInput.setAttribute("aria-label", "输入汉字或英文");
    imeInput.placeholder = "在此打汉字 / 英文（支持拼音与手机键盘）";
    actionsWrap.insertBefore(imeInput, actionsWrap.firstChild);
  }

  const first = spec.start;
  const last = spec.end;
  const length = (last - first) / 60;
  const speed = Number(cfg.speed) || 1;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const audio = window.KeyboardAudio ? window.KeyboardAudio.create() : null;
  const live = UI.createLive(audio);

  let mode = "demo";
  let running = false;
  let playTime = 0;
  let anchor = 0;
  let raf = 0;
  let paintedFrame = -1;
  let liveFrame = 0;
  let soundOn = false;
  let isComposing = false;
  const charQueue = [];
  let queueTimer = 0;

  function notifyParent() {
    if (window.self === window.top) return;
    try {
      window.parent.postMessage({
        type: "xiaxia-demo-state",
        hasMode: true,
        mode,
        hasSound: Boolean(audio && soundButton),
        soundOn,
        supportsChinese: true,
      }, "*");
    } catch {}
  }

  function canvasPoint(e) {
    const b = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - b.left) / Math.max(1, b.width)) * 1200,
      y: ((e.clientY - b.top) / Math.max(1, b.height)) * 900,
    };
  }

  function position() {
    if (!running) return playTime;
    return (playTime + ((performance.now() - anchor) / 1000) * speed) % length;
  }

  function draw() {
    if (mode === "demo") {
      const pos = position();
      const frame = Math.min(last - 1, first + Math.floor(pos * 60 + 1e-7));
      if (frame !== paintedFrame) {
        UI.renderDemo(ctx, frame);
        paintedFrame = frame;
      }
      progress.value = pos;
      readout.value = pos.toFixed(2) + " / " + length.toFixed(2) + " 秒";
    } else {
      liveFrame += 1;
      UI.renderLive(ctx, live.sample(liveFrame), liveFrame);
    }
  }

  function schedule() {
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        draw();
        if (running || mode === "live") schedule();
      });
    }
  }

  function pause() {
    playTime = position();
    running = false;
    playButton.textContent = "播放";
  }

  function play() {
    if (mode !== "demo") setMode("demo");
    if (running) return;
    if (playTime >= length) playTime = 0;
    anchor = performance.now();
    running = true;
    playButton.textContent = "暂停";
    schedule();
  }

  function seek(s) {
    if (mode !== "demo") setMode("demo");
    const was = running;
    pause();
    playTime = Math.min(length, Math.max(0, Number(s) || 0));
    paintedFrame = -1;
    draw();
    if (was) play();
  }

  function focusIme(allowMobile) {
    if (!imeInput || mode !== "live") return;
    const isTouch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (isTouch && !allowMobile) return;
    try {
      imeInput.focus({ preventScroll: true });
    } catch {
      imeInput.focus();
    }
  }

  function setMode(next, opts) {
    if (next === mode) return;
    pause();
    mode = next;
    const isLive = next === "live";
    get("timeline").hidden = isLive;
    actionsWrap.hidden = !isLive;
    modeButton.textContent = isLive ? "返回定稿演示" : "自己操作";
    modeButton.setAttribute("aria-pressed", String(isLive));
    status.textContent = isLive ? "支持中文汉字与英文：点击键盘或直接用输入法打字，点「开启声音」听音效。" : "";
    if (isLive) {
      if (!(opts && opts.skipFocus)) focusIme(false);
      schedule();
    } else {
      paintedFrame = -1;
      draw();
    }
    notifyParent();
  }

  function triggerKey(id) {
    if (mode !== "live") setMode("live", { skipFocus: true });
    const msg = live.pressKey(id, liveFrame);
    if (msg) status.textContent = msg;
    schedule();
  }

  // 将连续输入的中文词组按自然打字节奏逐字送入动效引擎
  function flushCharQueue() {
    queueTimer = 0;
    if (!charQueue.length) return;
    const ch = charQueue.shift();
    triggerKey(ch === " " ? "Space" : ch);
    if (charQueue.length) {
      queueTimer = window.setTimeout(flushCharQueue, 68);
    }
  }

  function commitText(str) {
    if (!str) return;
    const chars = Array.from(str).filter((c) => c !== "\r" && c !== "\n");
    if (!chars.length) return;
    if (mode !== "live") setMode("live", { skipFocus: true });
    if (chars.length === 1 && !charQueue.length) {
      triggerKey(chars[0] === " " ? "Space" : chars[0]);
      return;
    }
    chars.forEach((c) => charQueue.push(c));
    if (!queueTimer) flushCharQueue();
  }

  if (imeInput) {
    imeInput.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    imeInput.addEventListener("compositionend", (e) => {
      isComposing = false;
      const committed = e.data || imeInput.value;
      imeInput.value = "";
      commitText(committed);
    });
    imeInput.addEventListener("input", () => {
      if (isComposing) return;
      const val = imeInput.value;
      if (!val) return;
      imeInput.value = "";
      commitText(val);
    });
    imeInput.addEventListener("keydown", (e) => {
      if (isComposing || e.isComposing || e.keyCode === 229) return;
      if (e.key === "Backspace" && !imeInput.value) {
        e.preventDefault();
        triggerKey("Backspace");
      } else if (e.key === "Enter" && !imeInput.value) {
        e.preventDefault();
        triggerKey("Enter");
      }
    });
  }

  canvas.addEventListener("pointerdown", (e) => {
    const pt = canvasPoint(e);
    const hit = UI.hitTestKey(pt.x, pt.y);
    if (hit) {
      e.preventDefault();
      triggerKey(hit);
    } else if (mode === "live" && pt.y < 520) {
      // 点击屏幕上方输入展示区，主动拉起桌面/手机中文输入法
      focusIme(true);
    } else if (mode === "demo") {
      running ? pause() : play();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (mode !== "live") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.isComposing || isComposing || e.keyCode === 229) return;
    if (e.target === imeInput) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

    let id = null;
    if (e.key === "Backspace") id = "Backspace";
    else if (e.key === "Enter") id = "Enter";
    else if (e.key === " ") id = "Space";
    else if (e.key === "Shift") id = "Shift";
    else if (/^[a-zA-Z]$/.test(e.key)) id = e.key.toUpperCase();
    else if (Array.from(e.key).length === 1) id = e.key;

    if (id) {
      e.preventDefault();
      triggerKey(id);
    }
  });

  async function toggleSound() {
    if (!soundButton || !audio) return false;
    try {
      const on = await audio.toggle();
      soundOn = Boolean(on);
      soundButton.setAttribute("aria-pressed", String(soundOn));
      soundButton.textContent = soundOn ? "关闭声音" : "开启声音";
      notifyParent();
      return soundOn;
    } catch {
      status.textContent = "请直接点击画布下方的「开启声音」按钮启用音效。";
      return false;
    }
  }

  playButton.onclick = () => (running ? pause() : play());
  get("restart").onclick = () => {
    pause();
    seek(0);
    play();
  };
  progress.min = 0;
  progress.max = length;
  progress.step = 1 / 60;
  progress.oninput = () => {
    pause();
    seek(+progress.value);
  };
  modeButton.onclick = () => setMode(mode === "demo" ? "live" : "demo");

  Array.from(actionsWrap.querySelectorAll("button[data-act]")).forEach((btn) => {
    btn.onclick = () => {
      const act = btn.getAttribute("data-act");
      const msg = live.action(act, liveFrame);
      if (msg) status.textContent = msg;
      schedule();
    };
  });

  if (soundButton && audio) {
    soundButton.onclick = () => {
      toggleSound();
    };
  }

  // 接收展馆外框的联动控制指令
  window.addEventListener("message", (ev) => {
    const d = ev.data;
    if (!d || d.type !== "xiaxia-cmd") return;
    if (d.cmd === "toggle-mode") setMode(mode === "demo" ? "live" : "demo");
    else if (d.cmd === "set-mode" && (d.value === "live" || d.value === "demo")) setMode(d.value);
    else if (d.cmd === "toggle-sound") toggleSound();
    else if (d.cmd === "restart") {
      if (mode === "live") {
        live.action("clear", liveFrame);
        schedule();
      } else {
        pause();
        seek(0);
        play();
      }
    } else if (d.cmd === "focus-ime") {
      if (mode !== "live") setMode("live", { skipFocus: true });
      focusIme(true);
    } else if (d.cmd === "query-state") {
      notifyParent();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
  });
  window.addEventListener("pagehide", () => {
    pause();
    if (queueTimer) clearTimeout(queueTimer);
    audio && audio.dispose();
  });

  get("panel").disabled = false;
  draw();
  window.singleEffect = {
    seek,
    play,
    pause,
    setMode,
    pressKey: triggerKey,
    inputText: commitText,
    toggleSound,
    render: () => draw(),
    get frame() { return paintedFrame; },
    get liveState() { return live.sample(liveFrame); },
    get duration() { return length; },
    get mode() { return mode; },
    get soundOn() { return soundOn; },
  };
  notifyParent();
  if (params.get("mode") === "live") {
    setMode("live", { skipFocus: true });
  } else if (!reduce) {
    play();
  }
})();
