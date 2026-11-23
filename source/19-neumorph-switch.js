// 夏夏的AI灵感 · 新拟物 UI。此文件包含该控件的原版绘图、灯光和动作。
(() => {
  const P = { bg: "#e7e7e3", ink: "#2f443b", muted: "#45534d", accent: "#376653", on: "#ffffff", well: "#d8dcd5", dark: "#344d42", light: "#f8faf5", line: "#b3beb4", tint: "#c4d8c7", surface: "#e7e7e3", contrast: "#c7cbc4" }, C = { events: window.SETTINGS.events, overview: { settled: 23.2 }, stages: [{}, { at: 0.5666666666666667 }], beat: (n) => Math.max(0, Math.round((-3e-3 + n * 60 / 128) * 60) / 60) }, E = C.events;
  const cl = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const ease = (n) => (n = cl(n), n * n * (3 - 2 * n)), ramp = (t, a, b) => ease((t - a) / (b - a)), f = (n) => Number(n.toFixed(4)), esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  function press(t, at) {
    return ramp(t, at - 1 / 60, at) - ramp(t, at + 1 / 60, at + 5 / 60);
  }
  function text(x, y, s, size = 32, role = "ink", anchor = "start", extra = "") {
    const color = P[role] || role, bg = role === "light" ? P.dark : role === "on" ? P.accent : P.contrast;
    return `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${color}" text-anchor="${anchor}" data-text="${esc(s)}" data-bg="${bg}" ${extra}>${esc(s)}</text>`;
  }
  const line = (x1, y1, x2, y2, color = P.line, width2 = 2, extra = "") => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" fill="none" stroke="${color}" stroke-width="${width2}" stroke-linecap="round" ${extra}/>`;
  function rect(x, y, w, h, fill = "url(#ice)", r = 14, stroke = "none", extra = "") {
    return `<rect x="${f(x)}" y="${f(y)}" width="${f(Math.max(0.01, w))}" height="${f(Math.max(0.01, h))}" rx="${f(Math.max(0, r))}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${extra}/>`;
  }
  const circle = (x, y, r, fill, stroke = "none", sw = 2, extra = "") => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
  function surface(w, h, r, main = !1) {
    let s = rect(-w / 2, -h / 2, w, h, "url(#ice)", r, "none", 'filter="url(#shadow)"');
    return s = rect(-w / 2 + 5, -h / 2 + 9, w, h, "#b4b9ae", r, "none", 'opacity=".50"') + rect(-w / 2 - 4, -h / 2 - 5, w, h, "#ffffff", r) + s, s += line(-w / 2 + r, -h / 2 + 2, w / 2 - r, -h / 2 + 2, "#fbfff8", 3), s;
  }
  function values(t) {
    const s = { t, mini: !1 };
    return s.toggle = ramp(t, E.toggleOn, E.toggleOn + 0.11) - ramp(t, E.toggleOff, E.toggleOff + 0.11), s;
  }
  function arcPath(cx, cy, r, a0, a1) {
    const pt = (a2) => [cx + r * Math.cos(a2 * Math.PI / 180), cy + r * Math.sin(a2 * Math.PI / 180)], a = pt(a0), b = pt(a1);
    return `M${f(a[0])} ${f(a[1])}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f(b[0])} ${f(b[1])}`;
  }
  function renderSwitch(w, h, s) {
    const q = s.toggle, at = s.mini ? C.beat(50) : s.t < E.toggleOff ? E.toggleOn : E.toggleOff;
    let out = "";
    {
      const p = press(s.t, at);
      out += circle(140, 125, 72, "url(#well)", P.light, 1) + circle(140, 125 + 3 * p, 58, q > 0.5 ? "url(#well)" : "url(#ice)", "none", 0, `filter="url(#${p > 0.4 ? "contactShadow" : "smallShadow"})"`), out += `<path d="${arcPath(140, 127, 27, -55, 235)}" fill="none" stroke="${q > 0.5 ? P.accent : P.muted}" stroke-width="5"/>` + line(140, 93, 140, 121, q > 0.5 ? P.accent : P.muted, 5) + text(255, 119, "电源", 35, "ink") + text(255, 161, q > 0.5 ? "已开启" : "待机中", 27, "muted");
    }
    return out;
  }
  const { width, height, radius } = window.SETTINGS, svg = document.getElementById("drawing");
  svg.innerHTML = `<defs>
<radialGradient id="back" cx="42%" cy="33%" r="84%"><stop offset="0.0" stop-color="#e7e7e3" /><stop offset="1.0" stop-color="#e7e7e3" /></radialGradient>
<linearGradient id="ice" x1=".12" y1="0" x2=".86" y2="1"><stop offset="0.0" stop-color="#ecece8" /><stop offset="0.5" stop-color="#e6e6e2" /><stop offset="1.0" stop-color="#dedfda" /></linearGradient>
<linearGradient id="lip" x1="0" y1="0" x2=".5" y2="1"><stop offset="0.0" stop-color="#f6f7f3" /><stop offset="1.0" stop-color="#8d9d97" /></linearGradient>
<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0.0" stop-color="#f6f7f3" /><stop offset="1.0" stop-color="#8d9d97" /></linearGradient>
<linearGradient id="chrome" x1="0" y1="0" x2="1" y2=".55"><stop offset="0.0" stop-color="#f0f0ec" /><stop offset="0.5" stop-color="#e5e6e1" /><stop offset="1.0" stop-color="#d8dbd5" /></linearGradient>
<linearGradient id="topshine" x1="0" y1="0" x2=".2" y2="1"><stop offset="0.0" stop-color="#f6f7f3" stop-opacity="0" /><stop offset="1.0" stop-color="#f6f7f3" stop-opacity="0" /></linearGradient>
<linearGradient id="well" x1=".05" y1="0" x2=".3" y2="1"><stop offset="0.0" stop-color="#c7cbc4" /><stop offset="0.5" stop-color="#dcdfd8" /><stop offset="1.0" stop-color="#eef0e9" /></linearGradient>
<linearGradient id="railLight" x1="0" y1="0" x2="0" y2="1"><stop offset="0.0" stop-color="#486f5e" /><stop offset="1.0" stop-color="#8d9d97" /></linearGradient>
<linearGradient id="disc" x1="0" y1="0" x2="1" y2="1"><stop offset="0.0" stop-color="#d7ded8" /><stop offset="0.5" stop-color="#f0f2eb" /><stop offset="1.0" stop-color="#bac8bf" /></linearGradient>
<radialGradient id="pool"><stop offset="0.0" stop-color="#8d9d97" stop-opacity="0" /><stop offset="1.0" stop-color="#e7e7e3" stop-opacity="0" /></radialGradient>
<filter id="shadow" x="-35%" y="-60%" width="170%" height="240%"><feDropShadow dx="-15" dy="-15" stdDeviation="10" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="15" dy="15" stdDeviation="11" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<filter id="smallShadow" x="-50%" y="-60%" width="220%" height="250%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<filter id="contactShadow" x="-50%" y="-60%" width="220%" height="250%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" id="contactDrop" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<filter id="pointerShadow" x="-60%" y="-50%" width="230%" height="240%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter>
<symbol id="playIcon" viewBox="0 0 48 48"><path d="M17 10Q14 8 14 12V36Q14 40 17 38L36 26Q39 24 36 22Z" fill="#3e4b48" /></symbol>
<symbol id="speaker" viewBox="0 0 48 48"><path d="M7 19H15L26 10V38L15 29H7Z" fill="#3e4b48" /><path d="M33 16Q42 24 33 32M38 10Q52 24 38 38" fill="none" stroke="#3e4b48" stroke-width="3.5" stroke-linecap="round" /></symbol>
<linearGradient id="chartBarFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0.0" stop-color="#f0f0ec" /><stop offset="0.5" stop-color="#e5e6e1" /><stop offset="1.0" stop-color="#d8dbd5" /></linearGradient><linearGradient id="chartAreaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0.0" stop-color="#486f5e" stop-opacity="0.28" /><stop offset="1.0" stop-color="#486f5e" stop-opacity="0" /></linearGradient><filter id="overviewShadow" x="-30%" y="-40%" width="160%" height="190%"><feDropShadow dx="-7.05" dy="-7.05" stdDeviation="4.699999999999999" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="7.05" dy="7.05" stdDeviation="5.17" flood-color="#a7afa5" flood-opacity="0.49" /></filter><filter id="overviewControlShadow" x="-50%" y="-60%" width="220%" height="250%"><feDropShadow dx="-5.25" dy="-5.25" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.94" /><feDropShadow dx="5.25" dy="5.25" stdDeviation="3.8499999999999996" flood-color="#a7afa5" flood-opacity="0.49" /></filter><linearGradient id="overviewWell" x1="0" y1="0" x2=".2" y2="1"><stop offset="0.0" stop-color="#c7cbc4" /><stop offset="0.5" stop-color="#dcdfd8" /><stop offset="1.0" stop-color="#eef0e9" /></linearGradient></defs><g id="housing"></g><g id="face"></g>`;
  const housing = svg.querySelector("#housing"), face = svg.querySelector("#face");
  housing.setAttribute("transform", "translate(" + width / 2 + " " + height / 2 + ")");
  housing.innerHTML = surface(width, height, radius, !0);
  function render(t, overrides = {}) {
    const s = Object.assign(values(t), overrides);
    return face.innerHTML = renderSwitch(width, height, s), s;
  }
  window.componentSource = { render };
})();
