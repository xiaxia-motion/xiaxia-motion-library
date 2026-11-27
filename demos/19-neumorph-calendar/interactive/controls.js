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

boot(function calendar(a) {
  const m=a.model;m.day=13;let origin=null;let moved=false;
  function set(n){n=Math.round(a.clamp(n,1,30));if(n!==m.day){a.move('day',m.day,n,.17);m.day=n;a.say('11 月 '+n+' 日');}}
  function confirm(){a.fire();a.say('已确认 2026 年 11 月 '+m.day+' 日');}
  return {down(p){origin=null;if(p.y<85&&p.x>a.w-190)confirm();else if(p.x>=480&&p.x<=680&&p.y>=98&&p.y<=280){origin={y:p.y,day:m.day};moved=false;}},
    move(p){if(origin){const distance=origin.y-p.y;if(Math.abs(distance)>8)moved=true;if(moved)set(origin.day+Math.round(distance/25));}},
    up(){if(origin&&!moved)set(m.day+(origin.y<182?-1:1));origin=null;},wheel(delta){if(delta)set(m.day+Math.sign(delta));},
    key(k){if(k==='Enter'||k===' ')confirm();else if(k==='Home')set(1);else if(k==='End')set(30);else if(['ArrowUp','ArrowRight'].includes(k))set(m.day+1);else if(['ArrowDown','ArrowLeft'].includes(k))set(m.day-1);else return false;return true;},
    frame(){return [m.count?a.E.dateApply+Math.min(a.age(),.3):a.start,{date:a.value('day',m.day)}];}};
});
