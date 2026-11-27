/* 暖纸浮层的网页适配：真实事件、本地状态、独立实例，无视频时间轴或外部依赖。 */
(() => {
  'use strict';
  const registry = window.XiaMotionPlugins ||= {};
  let serial = 0;
  const paths = {
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    note: '<path d="M7 3h8l4 4v14H5V3Z"/><path d="M14 3v5h5M8 12h8M8 16h6"/>',
    trash: '<path d="M4 7h16M9 3h6l1 4M6 7l1 14h10l1-14M10 10v7M14 10v7"/>',
    save: '<path d="M5 3h12l3 3v15H4V3Z"/><path d="M8 3v6h8V3M8 21v-8h8v8"/>',
    undo: '<path d="M9 5 4 10l5 5M4 10h10a6 6 0 0 1 0 12" transform="translate(1 -2)"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.1"/>',
    dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.1M4 12h.1M4 18h.1"/>',
    settings: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
    text: '<path d="M5 5h14M12 5v14M8 19h8M5 5v3M19 5v3"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="16" cy="9" r="1.5"/><path d="m3 16 5-5 6 6 3-3 4 4"/>',
    audio: '<path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/>',
    video: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/>'
  };
  const icon = name => `<svg class="xfb-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || paths.note}</svg>`;
  const button = (label, action, symbol, extra = '') => `<button type="button" class="xfb-button" ${action} ${extra}>${symbol ? icon(symbol) : ''}<span>${label}</span></button>`;
  const closeButton = attr => `<button type="button" class="xfb-icon-button" ${attr} aria-label="关闭">${icon('close')}</button>`;
  const paper = (content, extra = '') => `<div class="xfb-paper" ${extra}><div class="xfb-paper-kicker">${icon('note')}<span>灵感便签</span><i aria-hidden="true"></i></div>${content}</div>`;

  function base(host, ctx, type, markup) {
    const doc = host.ownerDocument;
    const win = doc.defaultView;
    const uid = `xfb-${String(ctx.uid || ++serial).replace(/[^a-zA-Z0-9_-]/g, '-')}`;
    const root = doc.createElement('div');
    root.className = `xfb xfb-demo-${type}`;
    root.dataset.active = 'true';
    root.dataset.reduced = String(!!ctx.reducedMotion?.());
    root.innerHTML = typeof markup === 'function' ? markup(uid) : markup;
    host.append(root);
    let active = true, disposed = false;
    const removers = [], ticks = [], activity = [];
    const state = {};
    const emit = patch => {
      if (disposed) return;
      Object.assign(state, patch);
      ctx.emit?.(patch);
    };
    const listen = (node, type, fn, options) => {
      node.addEventListener(type, fn, options);
      removers.push(() => node.removeEventListener(type, fn, options));
    };
    const api = {
      draw(_time, dt) {
        if (!active || disposed) return;
        root.dataset.reduced = String(!!ctx.reducedMotion?.());
        const delta = Number.isFinite(dt) ? Math.max(0, dt) : 0;
        ticks.forEach(tick => tick(delta));
      },
      setActive(value) {
        if (disposed) return;
        active = !!value;
        root.dataset.active = String(active);
        activity.forEach(fn => fn(active));
      },
      capture: () => root.outerHTML,
      dispose() {
        if (disposed) return;
        disposed = true;
        removers.reverse().forEach(remove => remove());
        root.remove();
      }
    };
    return {root, doc, win, uid, state, api, emit, listen, ticks, activity, cleanup: fn => removers.push(fn), $: selector => root.querySelector(selector)};
  }

  // 所有自动消失只消耗宿主传来的活动时间；悬停或聚焦操作区时留住提示。
  function countdown(part, notice, duration, expire) {
    let left = 0, hovered = false;
    part.listen(notice, 'pointerenter', () => { hovered = true; });
    part.listen(notice, 'pointerleave', () => { hovered = false; });
    const render = () => notice.style.setProperty('--xfb-progress', String(Math.max(0, left / duration)));
    part.ticks.push(dt => {
      if (left <= 0 || hovered || notice.contains(part.doc.activeElement)) return;
      left = Math.max(0, left - dt);
      render();
      if (left === 0) expire();
    });
    return {
      restart() { left = duration; hovered = false; render(); },
      stop() { left = 0; hovered = false; render(); }
    };
  }

  registry.toast = {kind: 'interactive', create(host, ctx) {
    const part = base(host, ctx, 'toast', `<span class="xfb-caption">一个轻轻的回应</span>${paper('<h3>留住一个好点子</h3><p>先把灵感记下来，慢慢让它成形。</p><div class="xfb-paper-bottom"><span data-xfb-result>草稿 · 今天</span>'+button('保存灵感', 'data-xfb-trigger', 'save')+'</div>')}<div class="xfb-toast" data-xfb-notice role="status" aria-live="polite" aria-atomic="true" hidden><span class="xfb-success">${icon('check')}</span><span data-xfb-message>灵感已保存</span>${closeButton('data-xfb-dismiss')}<i class="xfb-life" aria-hidden="true"></i></div>`);
    const notice = part.$('[data-xfb-notice]');
    const dismiss = () => { notice.hidden = true; timer.stop(); part.emit({open: false}); };
    const timer = countdown(part, notice, 3, dismiss);
    let savedCount = 0;
    part.listen(part.$('[data-xfb-trigger]'), 'click', () => {
      savedCount += 1;
      notice.hidden = false;
      part.$('[data-xfb-message]').textContent = savedCount === 1 ? '灵感已保存' : `已再次保存 · ${savedCount}`;
      part.$('[data-xfb-result]').textContent = '已保存 · 刚刚';
      timer.restart();
      part.emit({open: true, savedCount});
    });
    part.listen(part.$('[data-xfb-dismiss]'), 'click', () => {
      const returnFocus = notice.contains(part.doc.activeElement);
      dismiss();
      if (returnFocus) part.$('[data-xfb-trigger]').focus({preventScroll: true});
    });
    part.emit({open: false, savedCount: 0});
    return part.api;
  }};

  registry.snackbar = {kind: 'interactive', create(host, ctx) {
    const part = base(host, ctx, 'snackbar', `<span class="xfb-caption">给操作留一次反悔</span><div class="xfb-list"><div class="xfb-list-heading"><strong>今天的灵感</strong><span data-xfb-count>1 条便签</span></div><div class="xfb-list-item" data-xfb-item><span class="xfb-note-symbol">${icon('note')}</span><div><strong>一个新开场</strong><small>从一句话开始</small></div><button type="button" class="xfb-icon-button" data-xfb-delete aria-label="删除一个新开场">${icon('trash')}</button></div><div class="xfb-empty" data-xfb-empty hidden><span>便签已移除</span>${button('恢复示例', 'data-xfb-reset', 'undo')}</div></div><div class="xfb-snackbar" data-xfb-notice hidden><span role="status" aria-live="polite">已移除 1 条便签</span><button type="button" class="xfb-undo" data-xfb-undo>${icon('undo')}撤销</button>${closeButton('data-xfb-dismiss')}<i class="xfb-life" aria-hidden="true"></i></div>`);
    const notice = part.$('[data-xfb-notice]'), item = part.$('[data-xfb-item]');
    let deleted = false, undoAvailable = false;
    const finish = () => {
      const returnFocus = notice.contains(part.doc.activeElement);
      notice.hidden = true; undoAvailable = false; timer.stop();
      part.emit({open: false, undoAvailable: false});
      if (returnFocus) part.$('[data-xfb-reset]').focus({preventScroll: true});
    };
    const timer = countdown(part, notice, 6, finish);
    const render = () => {
      item.hidden = deleted;
      part.$('[data-xfb-empty]').hidden = !deleted;
      part.$('[data-xfb-count]').textContent = deleted ? '0 条便签' : '1 条便签';
      part.emit({deleted, undoAvailable});
    };
    const restore = () => {
      finish(); deleted = false; render();
      part.$('[data-xfb-delete]').focus({preventScroll: true});
    };
    part.listen(part.$('[data-xfb-delete]'), 'click', () => {
      if (deleted) return;
      deleted = true; undoAvailable = true; notice.hidden = false;
      render(); timer.restart(); part.emit({open: true});
      // 删除按钮随便签消失，将焦点移到稳定位置，撤销按钮仍可用Tab访问。
      part.$('[data-xfb-reset]').focus({preventScroll: true});
    });
    part.listen(part.$('[data-xfb-undo]'), 'click', () => {
      if (deleted && undoAvailable && !notice.hidden) restore();
    });
    part.listen(part.$('[data-xfb-reset]'), 'click', restore);
    part.listen(part.$('[data-xfb-dismiss]'), 'click', finish);
    part.emit({open: false, deleted: false, undoAvailable: false});
    return part.api;
  }};

  // 原生顶层dialog负责页面级焦点隔离；几何范围仍严格贴合当前预览卡片。
  function localDialog(part, trigger, dialog, initialFocus) {
    let opened = false;
    const syncBounds = () => {
      if (!opened) return;
      const rect = part.root.getBoundingClientRect();
      Object.assign(dialog.style, {left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`});
    };
    const restoreFocus = () => {
      if (trigger.isConnected && !trigger.disabled) trigger.focus({preventScroll: true});
    };
    const close = (restore = true) => {
      if (!opened) return;
      opened = false;
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
      dialog.hidden = true;
      part.emit({open: false});
      if (restore) restoreFocus();
    };
    const open = () => {
      if (opened) return;
      opened = true; dialog.hidden = false; syncBounds();
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else {
        dialog.setAttribute('open', '');
        dialog.setAttribute('aria-modal', 'false');
      }
      part.emit({open: true});
      (initialFocus() || dialog).focus({preventScroll: true});
    };
    part.listen(trigger, 'click', open);
    part.listen(dialog, 'cancel', event => { event.preventDefault(); close(); });
    part.listen(dialog, 'close', () => {
      // 原生close事件异步到达；不能让上次关闭误伤已重新打开的新一轮。
      if (dialog.open || !opened) return;
      opened = false; dialog.hidden = true; part.emit({open: false}); restoreFocus();
    });
    part.listen(dialog, 'click', event => { if (event.target === dialog) close(); });
    part.listen(dialog, 'keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }
      if (event.key !== 'Tab') return;
      const targets = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex="0"]')].filter(node => !node.closest('[hidden]'));
      const first = targets[0], last = targets.at(-1);
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      if ((event.shiftKey && part.doc.activeElement === first) || (!event.shiftKey && part.doc.activeElement === last)) {
        event.preventDefault(); (event.shiftKey ? last : first).focus();
      } else if (!dialog.contains(part.doc.activeElement)) {
        event.preventDefault(); first.focus();
      }
    });
    part.listen(part.win, 'resize', syncBounds);
    part.listen(part.doc, 'scroll', syncBounds, true);
    if (typeof part.win.ResizeObserver === 'function') {
      const observer = new part.win.ResizeObserver(syncBounds);
      observer.observe(part.root); part.cleanup(() => observer.disconnect());
    }
    part.activity.push(active => { if (!active) close(false); });
    part.cleanup(() => { if (dialog.open && typeof dialog.close === 'function') dialog.close(); });
    part.listen(part.$('[data-xfb-close]'), 'click', () => close());
    return {open, close};
  }

  registry.modal = {kind: 'interactive', create(host, ctx) {
    const part = base(host, ctx, 'modal', uid => `<span class="xfb-caption">重要一步，先确认</span>${paper('<h3>留住一个好点子</h3><p data-xfb-result>这条便签仍在你的灵感列表中。</p><div class="xfb-paper-bottom">'+button('还原示例', 'data-xfb-reset')+button('归档便签', 'data-xfb-trigger', 'note')+'</div>')}<dialog class="xfb-layer xfb-modal-layer" aria-modal="true" aria-labelledby="${uid}-title" aria-describedby="${uid}-description" tabindex="-1" hidden><div class="xfb-dialog-panel"><div class="xfb-dialog-heading"><span class="xfb-dialog-mark">${icon('note')}</span>${closeButton('data-xfb-close')}</div><h3 id="${uid}-title">归档这条灵感？</h3><p id="${uid}-description">先收进归档，给新的想法腾出位置。</p><div class="xfb-dialog-actions">${button('取消', 'data-xfb-cancel')}${button('确认归档', 'data-xfb-confirm')}</div></div></dialog>`);
    const controller = localDialog(part, part.$('[data-xfb-trigger]'), part.$('dialog'), () => part.$('[data-xfb-cancel]'));
    part.listen(part.$('[data-xfb-cancel]'), 'click', () => controller.close());
    part.listen(part.$('[data-xfb-confirm]'), 'click', () => {
      part.$('[data-xfb-result]').textContent = '已放入归档 · 可以恢复示例';
      part.root.dataset.archived = 'true'; part.emit({archived: true}); controller.close();
    });
    part.listen(part.$('[data-xfb-reset]'), 'click', () => {
      part.$('[data-xfb-result]').textContent = '这条便签仍在你的灵感列表中。';
      part.root.dataset.archived = 'false'; part.emit({archived: false});
    });
    part.emit({open: false, archived: false});
    return part.api;
  }};

  registry.drawer = {kind: 'interactive', create(host, ctx) {
    const part = base(host, ctx, 'drawer', uid => `<span class="xfb-caption">让设置从边上进来</span>${paper('<h3>灵感簿，随心一点</h3><p data-xfb-result>标准视图 · 提醒开启</p><div class="xfb-paper-bottom"><span>你的工作节奏</span>'+button('打开设置', 'data-xfb-trigger', 'settings')+'</div>')}<dialog class="xfb-layer xfb-drawer-layer" aria-modal="true" aria-labelledby="${uid}-title" aria-describedby="${uid}-description" tabindex="-1" hidden><div class="xfb-drawer-panel"><div class="xfb-drawer-heading"><h3 id="${uid}-title">灵感簿设置</h3>${closeButton('data-xfb-close')}</div><p id="${uid}-description">留一个适合自己的创作空间。</p><div class="xfb-setting"><span><strong>专注视图</strong><small>收起次要信息</small></span><button type="button" class="xfb-switch" data-xfb-switch="focus" role="switch" aria-checked="false" aria-label="专注视图"><i></i></button></div><div class="xfb-setting"><span><strong>声音提醒</strong><small>保留轻量提醒</small></span><button type="button" class="xfb-switch" data-xfb-switch="sound" role="switch" aria-checked="true" aria-label="声音提醒"><i></i></button></div><div class="xfb-drawer-bottom"><span>设置仅用于此示例</span>${button('完成', 'data-xfb-done', 'check')}</div></div></dialog>`);
    const controller = localDialog(part, part.$('[data-xfb-trigger]'), part.$('dialog'), () => part.$('[data-xfb-close]'));
    let focusMode = false, soundEnabled = true;
    const update = () => {
      part.$('[data-xfb-switch="focus"]').setAttribute('aria-checked', String(focusMode));
      part.$('[data-xfb-switch="sound"]').setAttribute('aria-checked', String(soundEnabled));
      part.$('[data-xfb-result]').textContent = `${focusMode ? '专注' : '标准'}视图 · 提醒${soundEnabled ? '开启' : '关闭'}`;
      part.root.dataset.focusMode = String(focusMode);
      part.emit({focusMode, soundEnabled});
    };
    part.listen(part.$('[data-xfb-switch="focus"]'), 'click', () => { focusMode = !focusMode; update(); });
    part.listen(part.$('[data-xfb-switch="sound"]'), 'click', () => { soundEnabled = !soundEnabled; update(); });
    part.listen(part.$('[data-xfb-done]'), 'click', () => controller.close());
    part.emit({open: false}); update();
    return part.api;
  }};

  registry.tooltip = {kind: 'interactive', create(host, ctx) {
    const part = base(host, ctx, 'tooltip', uid => `<span class="xfb-caption">需要时，再多说一句</span>${paper('<h3>一点小小的说明</h3><p>悬停说明按钮，或按 Tab 聚焦。</p><div class="xfb-paper-bottom"><span>我的私人灵感</span><div class="xfb-tooltip-anchor"><button type="button" class="xfb-icon-button xfb-info" data-xfb-trigger aria-label="查看便签说明">'+icon('info')+'</button><div class="xfb-tooltip-bubble" role="tooltip" id="'+uid+'-tooltip" hidden>这条便签仅你可见。<i aria-hidden="true"></i></div></div></div>')}`);
    const trigger = part.$('[data-xfb-trigger]'), tooltip = part.$('[role="tooltip"]');
    let hovered = false, focused = false, dismissed = false;
    const update = () => {
      const open = (hovered || focused) && !dismissed;
      tooltip.hidden = !open;
      if (open) trigger.setAttribute('aria-describedby', tooltip.id);
      else trigger.removeAttribute('aria-describedby');
      part.emit({open});
    };
    part.listen(trigger, 'pointerenter', () => { hovered = true; dismissed = false; update(); });
    part.listen(trigger, 'pointerleave', () => { hovered = false; if (!focused) dismissed = false; update(); });
    part.listen(trigger, 'focus', () => { focused = true; dismissed = false; update(); });
    part.listen(trigger, 'blur', () => { focused = false; if (!hovered) dismissed = false; update(); });
    part.listen(part.doc, 'keydown', event => {
      if (event.key === 'Escape' && !tooltip.hidden && (hovered || focused)) {
        event.preventDefault(); dismissed = true; update();
      }
    });
    part.activity.push(active => { if (!active) { hovered = false; dismissed = true; update(); } });
    part.emit({open: false});
    return part.api;
  }};

  function menuControl(part, trigger, menu, choose) {
    const items = [...menu.querySelectorAll('[role="menuitem"]')];
    let open = false;
    const focusAt = index => {
      const n = (index + items.length) % items.length;
      items.forEach((item, i) => { item.tabIndex = i === n ? 0 : -1; });
      items[n].focus({preventScroll: true});
    };
    const close = (restore = true) => {
      if (!open) return;
      open = false; menu.hidden = true; part.root.dataset.open = 'false';
      trigger.setAttribute('aria-expanded', 'false');
      items.forEach(item => { item.tabIndex = -1; });
      part.emit({open: false});
      if (restore && trigger.isConnected) trigger.focus({preventScroll: true});
    };
    const show = (index = 0) => {
      open = true; menu.hidden = false; part.root.dataset.open = 'true';
      trigger.setAttribute('aria-expanded', 'true'); part.emit({open: true}); focusAt(index);
    };
    part.listen(trigger, 'click', () => { if (open) close(); else show(); });
    part.listen(trigger, 'keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); show(event.key === 'ArrowDown' ? 0 : items.length - 1);
      } else if (event.key === 'Escape' && open) {
        event.preventDefault(); close();
      }
    });
    part.listen(menu, 'keydown', event => {
      if (!open) return;
      const index = items.indexOf(part.doc.activeElement);
      const targets = {ArrowDown: index + 1, ArrowRight: index + 1, ArrowUp: index - 1, ArrowLeft: index - 1, Home: 0, End: items.length - 1};
      if (Object.hasOwn(targets, event.key)) { event.preventDefault(); focusAt(targets[event.key]); }
      else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
      else if (event.key === 'Tab') close();
    });
    items.forEach((item, index) => {
      part.listen(item, 'click', () => { if (open) { choose(item.dataset.xfbValue, index); close(); } });
    });
    part.listen(part.doc, 'pointerdown', event => {
      if (open && !menu.contains(event.target) && !trigger.contains(event.target)) close(false);
    });
    part.listen(part.doc, 'focusin', event => {
      if (open && !menu.contains(event.target) && !trigger.contains(event.target)) close(false);
    });
    part.activity.push(active => { if (!active) close(false); });
    part.emit({open: false});
    return {show, close};
  }

  registry.popover = {kind: 'interactive', create(host, ctx) {
    const part = base(host, ctx, 'popover', uid => `<span class="xfb-caption">顺手打开，就近完成</span>${paper('<h3 data-xfb-outside>给灵感做个标记</h3><p data-xfb-result>未标记 · 等一个新想法</p><div class="xfb-paper-bottom"><span>一个新开场</span><div class="xfb-popover-anchor"><button type="button" class="xfb-icon-button" data-xfb-trigger id="'+uid+'-trigger" aria-label="打开便签操作" aria-haspopup="menu" aria-controls="'+uid+'-menu" aria-expanded="false">'+icon('dots')+'</button><div class="xfb-popover-menu" id="'+uid+'-menu" role="menu" aria-labelledby="'+uid+'-trigger" hidden><span class="xfb-menu-heading" aria-hidden="true">这条灵感</span><button type="button" role="menuitem" tabindex="-1" data-xfb-value="starred">'+icon('star')+'标为收藏</button><button type="button" role="menuitem" tabindex="-1" data-xfb-value="todo">'+icon('list')+'标为待办</button><button type="button" role="menuitem" tabindex="-1" data-xfb-value="none">'+icon('undo')+'恢复默认</button><i class="xfb-menu-arrow" aria-hidden="true"></i></div></div></div>')}`);
    const names = {starred: '已收藏 · 留给下一次灵感', todo: '待办 · 给想法一个开始', none: '未标记 · 等一个新想法'};
    menuControl(part, part.$('[data-xfb-trigger]'), part.$('[role="menu"]'), selected => {
      part.$('[data-xfb-result]').textContent = names[selected];
      part.root.dataset.selected = selected; part.emit({selected});
    });
    part.emit({selected: 'none'});
    return part.api;
  }};

  registry['radial-menu'] = {kind: 'interactive', create(host, ctx) {
    const choices = [
      {value: 'text', label: '文字', icon: 'text', x: '0px', y: 'calc(-1 * var(--xfb-radius))'},
      {value: 'image', label: '图片', icon: 'image', x: 'var(--xfb-radius)', y: '0px'},
      {value: 'audio', label: '音频', icon: 'audio', x: '0px', y: 'var(--xfb-radius)'},
      {value: 'video', label: '视频', icon: 'video', x: 'calc(-1 * var(--xfb-radius))', y: '0px'}
    ];
    const part = base(host, ctx, 'radial', uid => `<span class="xfb-caption">一个加号，四种可能</span><div class="xfb-orbit"><div class="xfb-orbit-guide" aria-hidden="true"></div><div class="xfb-radial-menu" role="menu" id="${uid}-menu" aria-labelledby="${uid}-trigger" hidden>${choices.map((item, index) => `<button type="button" class="xfb-ray xfb-ray-${index}" role="menuitem" tabindex="-1" data-xfb-value="${item.value}" style="--xfb-x:${item.x};--xfb-y:${item.y};--xfb-delay:${index * 45}ms">${icon(item.icon)}<span>${item.label}</span></button>`).join('')}</div><button type="button" class="xfb-plus" data-xfb-trigger id="${uid}-trigger" aria-label="新建灵感" aria-haspopup="menu" aria-controls="${uid}-menu" aria-expanded="false">${icon('plus')}</button></div><span class="xfb-radial-result" data-xfb-result role="status" aria-live="polite">点一下，展开你的灵感</span>`);
    menuControl(part, part.$('[data-xfb-trigger]'), part.$('[role="menu"]'), (selected, index) => {
      part.$('[data-xfb-result]').textContent = `已选择${choices[index].label} · 可以再选一次`;
      part.root.dataset.selected = selected; part.emit({selected});
    });
    part.emit({selected: null});
    return part.api;
  }};
})();
