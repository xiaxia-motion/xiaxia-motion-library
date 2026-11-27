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
  const circle = (x, y, r, fill, stroke = "none", sw = 2, extra = "") => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`, group = (s, tr = "", extra = "") => `<g transform="${tr}" ${extra}>${s}</g>`;
  const searchIcon = (x, y, col = P.ink) => circle(x, y, 12, "none", col, 3) + line(x + 9, y + 9, x + 20, y + 20, col, 3);
  function cap(x, y, w, h, label, t, at, opts = {}) {
    const p = press(t, at), b = 0, r = 22, fill = opts.dark ? P.dark : "url(#chrome)", role = opts.dark ? "light" : "ink", stroke = "none", shadow = `filter="url(#${p > 0.4 ? "contactShadow" : "smallShadow"})"`;
    return group(rect(-w / 2, -h / 2, w, h, fill, r, stroke, shadow) + text(0, 11, label, opts.size || 30, role, "middle", 'font-weight="700"'), `translate(${x + w / 2} ${y + h / 2 + 8 * p}) scale(1 ${1 - 0.085 * p})`);
  }
  function surface(w, h, r, main = !1) {
    let s = rect(-w / 2, -h / 2, w, h, "url(#ice)", r, "none", 'filter="url(#shadow)"');
    return s = rect(-w / 2 + 5, -h / 2 + 9, w, h, "#b4b9ae", r, "none", 'opacity=".50"') + rect(-w / 2 - 4, -h / 2 - 5, w, h, "#ffffff", r) + s, s += line(-w / 2 + r, -h / 2 + 2, w / 2 - r, -h / 2 + 2, "#fbfff8", 3), s;
  }
  function values(t) {
    const s = { t, mini: !1 };
    return s.query = t < E.key1 ? "" : t < E.key2 ? "数" : "数据", s;
  }
  function searchBox(w, y, h, s, result = !1) {
    const bg = "url(#well)", content = s.query || "搜索组件";
    let out = rect(35, y, w - 70, h, bg, 25, "none");
    return out += searchIcon(72, y + h / 2 - 3, P.ink) + text(110, y + h / 2 + 11, content, 33, "ink"), s.query && s.t * 3 % 1 < 0.58 && (out += line(112 + s.query.length * 34, y + 25, 112 + s.query.length * 34, y + h - 25, P.ink, 2)), out += cap(w - 174, y + 13, 122, h - 26, "搜索", s.t, s.mini ? C.beat(51) : E.submit, { size: 27 }), out;
  }
  function renderSearch(w, h, s, result = !1) {
    if (!result) return searchBox(w, 30, h - 60, s);
    let out = "";
    out += searchBox(w, 28, 86, s, !0);
    const y0 = 166;
    return (s.rows ?? ["访问趋势", "访问统计", "来源分析"]).forEach((label, i) => {
      const selected = s.mini ? Math.floor((s.t - C.overview.settled) * 1.5) % 3 : i === 0 && s.t >= E.choose;
      let chosen = s.selection == null ? s.mini ? selected === i : selected : s.selection === i;
      const y = y0 + i * 78, span = chosen && s.selection != null ? s.reveal ?? 1 : chosen && !s.mini ? ramp(s.t, E.choose, E.choose + 0.14) : 1;
      out += rect(35, y - 38, (w - 70) * span, 67, chosen ? P.tint : "none", 6);
      const role = "ink";
      out += text(65, y + 6, label, s.mini ? 38 : 31, role), out += text(w - 70, y + 5, i === 0 ? "↗" : i === 1 ? "≡" : "◷", 31, role, "end");
    }), out;
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
    return face.innerHTML = renderSearch(width, height, s), s;
  }
  window.componentSource = { render };
})();
