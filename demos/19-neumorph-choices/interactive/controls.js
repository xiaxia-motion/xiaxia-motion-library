// 图上的指针命中与键盘动作交给本组控件。坐标始终换算成原片使用的 SVG 单位。
function boot(setup) {
  const svg=document.getElementById('drawing');
  const output=document.getElementById('feedback');
  const cfg=window.SETTINGS;
  const model={count:0};
  const now=()=>performance.now()/1000;
  const clamp=(v,low=0,high=1)=>Math.max(low,Math.min(high,v));
  const smooth=t=>{const q=clamp(t);return q*q*(3-2*q);};
  const curves=new Map();
  let started=-Infinity, lastFrame=null, lastPicture='', raf=null, pointer=null;
  const api={
    model,w:cfg.width,h:cfg.height,E:cfg.events,start:cfg.start,end:cfg.end,clamp,smooth,
    age:()=>now()-started,
    fire(){started=now();model.count++;},
    say(text){if(output.textContent!==text)output.textContent=text;},
    value(key,initial) {
      const anim=curves.get(key);
      return anim?anim.from+(anim.to-anim.from)*smooth((now()-anim.at)/anim.seconds):initial;
    },
    move(key,from,to,seconds=.16){curves.set(key,{from:api.value(key,from),to,at:now(),seconds});},
    editor:document.getElementById('query'),
    visibleQuery(query){const letters=Array.from(query);return letters.length>14?'…'+letters.slice(-13).join(''):query;},
    catalogue(query) {
      const q=query.trim();
      return [['访问趋势','数据 访问 趋势'],['访问统计','数据 访问 统计'],['来源分析','数据 来源 分析']].filter(row=>!q||row.some(s=>s.includes(q))).map(row=>row[0]);
    },
  };
  const control=setup(api);
  function draw(dt=0) {
    const [time,overrides={}]=control.frame(dt);
    const next=JSON.stringify([time,overrides]);
    if(next!==lastPicture){window.componentSource.render(time,overrides);lastPicture=next;}
  }
  function local(e) {const pt=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());return {x:pt.x,y:pt.y};}
  svg.addEventListener('pointerdown',e=>{
    if(e.button!==0||pointer!==null)return;
    e.preventDefault();svg.focus();pointer=e.pointerId;svg.setPointerCapture(pointer);control.down?.(local(e));draw();
  });
  svg.addEventListener('pointermove',e=>{if(pointer===null)control.hover?.(local(e));else if(pointer===e.pointerId)control.move?.(local(e));});
  const release=e=>{if(pointer===e.pointerId){pointer=null;control.up?.();draw();}};
  for(const name of ['pointerup','pointercancel','lostpointercapture'])svg.addEventListener(name,release);
  if(control.wheel)svg.addEventListener('wheel',e=>{e.preventDefault();control.wheel(e.deltaY);draw();},{passive:false});
  svg.addEventListener('keydown',e=>{if(control.key?.(e.key)){e.preventDefault();draw();}});
  if(api.editor) {
    api.editor.value=model.query||'';
    api.editor.addEventListener('input',()=>{control.type?.(api.editor.value);draw();});
    api.editor.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();control.submit?.();draw();}});
  }
  function tick(stamp){const dt=lastFrame===null?0:clamp((stamp-lastFrame)/1000,0,.1);lastFrame=stamp;draw(dt);raf=requestAnimationFrame(tick);}
  function stop(){if(raf!==null)cancelAnimationFrame(raf);raf=null;lastFrame=null;}
  function resume(){stop();if(!document.hidden)raf=requestAnimationFrame(tick);}
  document.addEventListener('visibilitychange',resume);window.addEventListener('pagehide',stop);window.addEventListener('pageshow',resume);
  window.liveComponent={state:()=>structuredClone(model)};draw();resume();
}

boot(function choices(a) {
  const m=a.model;Object.assign(m,{checks:[false,false,false],radio:0});
  const checks=[...document.querySelectorAll('[data-check]')],radios=[...document.querySelectorAll('[data-radio]')];
  function check(i,v){m.checks[i]=v;checks[i].checked=v;a.say(checks[i].parentElement.textContent+(v?'已勾选':'已取消'));}
  function radio(i){m.radio=i;radios.forEach((el,n)=>el.checked=n===i);a.say('提醒强度 '+radios[i].parentElement.textContent);}
  checks.forEach((el,i)=>el.onchange=()=>check(i,el.checked));radios.forEach((el,i)=>el.onchange=()=>radio(i));radios[0].checked=true;
  function apply(){a.fire();a.say('已应用 '+m.checks.filter(Boolean).length+' 项设置');}
  return {down(p){if(p.y>=a.h-80&&p.x>a.w-190)apply();else if(p.y>90&&p.y<310){const i=a.clamp(Math.round((p.y-124)/76),0,2);if(p.x<a.w/2)check(i,!m.checks[i]);else radio(i);}},
    key(k){if(k!=='Enter'&&k!==' ')return false;apply();return true;},
    frame(){return [m.count?a.E.choicesApply+Math.min(a.age(),.3):a.start,{checks:m.checks.map(Number),radio:m.radio}];}};
});
