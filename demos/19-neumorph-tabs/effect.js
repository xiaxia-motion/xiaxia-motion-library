// 夏夏的AI灵感 · 新拟物 UI。此文件包含该控件的原版绘图、灯光和动作。
(() => {
  const P = { bg: "#e7e7e3", ink: "#2f443b", muted: "#45534d", accent: "#376653", on: "#ffffff", well: "#d8dcd5", dark: "#344d42", light: "#f8faf5", line: "#b3beb4", tint: "#c4d8c7", surface: "#e7e7e3", contrast: "#c7cbc4" }, C = { events: window.SETTINGS.events, overview: { settled: 23.2 }, stages: [{}, { at: 0.5666666666666667 }], beat: (n) => Math.max(0, Math.round((-3e-3 + n * 60 / 128) * 60) / 60) }, E = C.events;
  const cl = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n)), mix = (a, b, u) => a + (b - a) * u, ease = (n) => (n = cl(n), n * n * (3 - 2 * n)), ramp = (t, a, b) => ease((t - a) / (b - a)), f = (n) => Number(n.toFixed(4)), esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
  function text(x, y, s, size = 32, role = "ink", anchor = "start", extra = "") {
    const color = P[role] || role, bg = role === "light" ? P.dark : role === "on" ? P.accent : P.contrast;
    return `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${color}" text-anchor="${anchor}" data-text="${esc(s)}" data-bg="${bg}" ${extra}>${esc(s)}</text>`;
  }
  const line = (x1, y1, x2, y2, color = P.line, width2 = 2, extra = "") => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" fill="none" stroke="${color}" stroke-width="${width2}" stroke-linecap="round" ${extra}/>`;
  function rect(x, y, w, h, fill = "url(#ice)", r = 14, stroke = "none", extra = "") {
    return `<rect x="${f(x)}" y="${f(y)}" width="${f(Math.max(0.01, w))}" height="${f(Math.max(0.01, h))}" rx="${f(Math.max(0, r))}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${extra}/>`;
  }
  const group = (s, tr = "", extra = "") => `<g transform="${tr}" ${extra}>${s}</g>`;
  function surface(w, h, r, main = !1) {
    let s = rect(-w / 2, -h / 2, w, h, "url(#ice)", r, "none", 'filter="url(#shadow)"');
    return s = rect(-w / 2 + 5, -h / 2 + 9, w, h, "#b4b9ae", r, "none", 'opacity=".50"') + rect(-w / 2 - 4, -h / 2 - 5, w, h, "#ffffff", r) + s, s += line(-w / 2 + r, -h / 2 + 2, w / 2 - r, -h / 2 + 2, "#fbfff8", 3), s;
  }
  function values(t) {
    const s = { t, mini: !1 };
    return s.tab = ramp(t, E.tabMiddle, E.tabMiddle + 0.11) + ramp(t, E.tabRight, E.tabRight + 0.11), s;
  }
  function materialTabs(w, h, s, labels) {
    const span = (w - 80) / 3, y = h / 2, at = [-10, E.tabMiddle, E.tabRight], grad = (id, stops, radial = !1) => {
      const tag = radial ? "radialGradient" : "linearGradient", axis = radial ? 'cx="52%" cy="42%" r="63%"' : 'x1="0" y1="0" x2=".2" y2="1"';
      return "<" + tag + ' id="' + id + '" ' + axis + ">" + stops.map(([off, col]) => '<stop offset="' + off + '" stop-color="' + col + '"/>').join("") + "</" + tag + ">";
    }, blend = (c, d, u) => "rgb(" + c.map((v, i) => Math.round(mix(v, d[i], u))).join(",") + ")";
    let out = "";
    return labels.forEach((label, i) => {
      const t = s.t, hit = at[i], x = 40 + (i + 0.5) * span, select = Math.max(0, 1 - Math.abs(s.tab - i)), contact = s.contactIndex == null ? ramp(t, hit - 0.06, hit) * (1 - ramp(t, hit + 0.035, hit + 0.13)) : s.contactIndex === i ? s.contact : 0, id = "physical-tab-" + i;
      let mark = "";
      {
        const d = cl(0.78 * select + 0.35 * contact), width2 = span - 24, height2 = 88, lift = 7 * (1 - d), top = blend([250, 251, 245], [151, 169, 155], d), bottom = blend([167, 177, 165], [247, 249, 240], d), face1 = blend([247, 249, 241], [183, 200, 186], d), face2 = blend([213, 220, 210], [220, 232, 216], d);
        mark = "<defs>" + grad(id + "r", [[0, top], [0.48, face2], [1, bottom]]) + grad(id + "f", [[0, face1], [0.45, face2], [1, face2]]) + "</defs>", mark += rect(-width2 / 2 + 2, -height2 / 2 + 5 + lift, width2, height2, "#aab3a8", 25), mark += rect(-width2 / 2, -height2 / 2, width2, height2, "url(#" + id + "r)", 25);
        const inset = 4 + 5 * d, faceY = -height2 / 2 + inset + 2 * d;
        mark += rect(-width2 / 2 + inset, faceY, width2 - 2 * inset, height2 - 2 * inset, "url(#" + id + "f)", 20), mark += text(0, 9 + 5 * d, label, 33, "ink", "middle", 'font-weight="650"'), mark += line(-15, 24 + 5 * d, 15, 24 + 5 * d, blend([208, 216, 204], [72, 111, 89], select), 2 + select), out += group(mark, "translate(" + x + " " + (y - 5 + 7 * d) + ")");
      }
    }), out;
  }
  function renderTabs(w, h, s) {
    const labels = ["舒适", "专注", "睡眠"];
    if (!s.mini) return materialTabs(w, h, s, labels);
    let out = "", x = 40, span = (w - 80) / 3, sel = Math.round(s.tab), y = h / 2;
    return labels.forEach((a, i) => {
      let xx = x + i * span, q = Math.max(0, 1 - Math.abs(s.tab - i));
      out += rect(xx + 6, 52, span - 12, 96, q > 0.5 ? "url(#well)" : "url(#ice)", 28, "none", q > 0.5 ? "" : 'filter="url(#smallShadow)"') + text(xx + span / 2, 112, a, 33, "ink", "middle", `font-weight="${i === sel ? 700 : 400}"`);
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
    return face.innerHTML = renderTabs(width, height, s), s;
  }
  window.componentSource = { render };
})();
