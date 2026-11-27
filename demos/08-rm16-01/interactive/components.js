// 所有页面和下载包共享这一入口；每个实例独立，离屏或切到后台就暂停。
(()=>{'use strict';
const colors={lilac:[.475,.443,.694],blue:[.31,.569,.663],rose:[.706,.525,.529]};
let instance=0;
function mount(host,id,options={}){
 if(host.motion)return host.motion;
 const plugin=window.XiaMotionPlugins?.[id];
 if(!plugin&&!['ring','flower','birds','fireworks','toggle','chart'].includes(id))throw Error('未知组件 '+id);
 const uid='xia-'+(++instance),visual=plugin?plugin.kind==='visual':!['toggle','chart'].includes(id),pref=matchMedia('(prefers-reduced-motion: reduce)');
 let engine,canvas,visible=false,userPaused=options.paused??(visual&&pref.matches),explicit=options.paused!==undefined,disposed=false,raf=0,last=0,elapsed=0,speed=options.speed??1,palette=options.palette??'lilac',mode='bar',selected=6,on=false,frameCount=0;
 const cleanup=[],business={};
 host.classList.add('motion-scene','scene-'+id);host.dataset.scene=id;
 function listen(target,name,fn){target.addEventListener(name,fn);cleanup.push(()=>target.removeEventListener(name,fn));}
 function running(){return (visual||typeof engine?.draw==='function')&&!disposed&&visible&&!document.hidden&&!userPaused;}
 function state(){return{...business,id,running:running(),paused:userPaused,visible,time:elapsed,speed,palette,mode:id==='toggle'?'toggle':id==='chart'?mode:engine?.state?.().mode||engine?.getState?.().mode||business.mode,selected:id==='chart'?selected:business.selected,on:id==='toggle'?on:business.on,frameCount,reducedMotion:pref.matches};}
 function emit(patch){if(patch)Object.assign(business,patch);host.dispatchEvent(new CustomEvent('motionstate',{detail:state()}));}
 function draw(dt=0){if(!engine)return;if(id==='ring')engine.seek(2.2+elapsed*.64);else engine.draw?.(plugin?elapsed:2.2+elapsed,dt);frameCount++;}
 // 操作反馈按前台实际时间结束；纯视觉限制步长以免卡顿后骤跳。恢复时sync重置last，不补算后台时间。
 function tick(stamp){raf=0;if(!running())return;if(!last)last=stamp;const dt=stamp-last;if(dt>=32){const step=(visual?Math.min(dt,80):dt)/1000*speed;elapsed+=step;last=stamp;draw(step);}raf=requestAnimationFrame(tick);}
 function createVisual(){
  if(engine||disposed)return;
  if(plugin){engine=plugin.create(host,{uid,emit,reducedMotion:()=>pref.matches});}
  else {
  canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');host.append(canvas);
  host.setAttribute('role','img');host.setAttribute('aria-label',({ring:'流光圆环，流动的粒子丝带',flower:'线网花开，三层花瓣缓慢舒展',birds:'金蓝粒子鸟群飞行',fireworks:'金色烟花绽放'})[id]);
  if(id==='ring'){engine=FlowRingNeu.mount(canvas,{appearance:{ink:colors[palette]},quality:{desktopCount:49152,mobileCount:24576},motion:{speed:.64},onStateChange:s=>{if(s.mode==='static')host.dataset.fallback='true';else delete host.dataset.fallback;}});engine.pause();}
  else engine=XiaParticles.create(canvas,id);
  const fallback=document.createElement('span');fallback.className='fallback-note';fallback.textContent='简化预览';host.append(fallback);


  }
  draw();
 }
 function releaseVisual(){if(!visual||!engine)return;engine.dispose?.();engine=null;canvas=null;host.replaceChildren();}
 function sync(){
  cancelAnimationFrame(raf);raf=0;last=0;
  if(visual){if(visible&&!document.hidden)createVisual();else releaseVisual();}
  const active=visible&&!document.hidden&&!userPaused;
  host.dataset.active=String(active);engine?.setActive?.(active);
  if(running())raf=requestAnimationFrame(tick);emit();
 }
 if(plugin&&!visual){engine=plugin.create(host,{uid,emit,reducedMotion:()=>pref.matches});engine.setActive?.(false);}
 else if(visual){host.setAttribute('role','img');host.setAttribute('aria-label',id+' 实时动效');
 }else if(id==='toggle'){
  host.innerHTML=`<div class="ice-toggle-demo"><span class="ice-label">灵感模式</span><button type="button" class="ice-toggle" role="switch" aria-checked="false" aria-label="灵感模式"><span class="ice-toggle-track"></span><span class="ice-toggle-cap"><i></i><i></i><i></i></span></button><span class="ice-toggle-state" aria-live="polite"><i></i><span>已关闭</span></span></div>`;
  listen(host.querySelector('button'),'click',()=>{on=!on;host.querySelector('button').setAttribute('aria-checked',String(on));host.querySelector('.ice-toggle-state span').textContent=on?'已开启':'已关闭';host.classList.toggle('is-on',on);emit();});
 }else{
  const values=[3400,5200,4600,6800,5600,7400,8640],days=['周一','周二','周三','周四','周五','周六','周日'];
  const xs=values.map((_,i)=>25+i*50),ys=values.map(v=>145-v/10000*116);
  // 平滑曲线与柱图使用同一组数据；没有外部数据服务。
  let curve=`M${xs[0]} ${ys[0]}`;
  for(let i=1;i<7;i++){const mid=(xs[i-1]+xs[i])/2;curve+=` C${mid} ${ys[i-1]} ${mid} ${ys[i]} ${xs[i]} ${ys[i]}`;}
  host.innerHTML=`<div class="ice-chart" data-mode="bar"><div class="ice-chart-top"><div><span class="ice-label">访问趋势 <small>示例数据</small></span><strong data-chart-value>8,640</strong></div><div class="chart-tabs" role="group" aria-label="图表类型"><button type="button" data-chart-mode="bar" aria-pressed="true">柱状</button><button type="button" data-chart-mode="line" aria-pressed="false">曲线</button></div></div><svg class="chart-plot" data-chart-plot viewBox="0 0 350 178" tabindex="0" role="slider" aria-label="选择日期，左右键切换" aria-valuemin="0" aria-valuemax="6" aria-valuenow="6" aria-valuetext="周日 8,640"><defs><linearGradient id="${uid}-bar" x2="1" y2="1"><stop stop-color="#e8fcff"/><stop offset=".4" stop-color="#b4eaff"/><stop offset="1" stop-color="#3985ad"/></linearGradient><linearGradient id="${uid}-area" x2="0" y2="1"><stop stop-color="#a0e0f6" stop-opacity=".7"/><stop offset="1" stop-color="#a0e0f6" stop-opacity="0"/></linearGradient></defs>${[29,87,145].map(y=>`<path d="M12 ${y}H340" stroke="#5c9eb9" stroke-opacity=".22"/>`).join('')}<g class="chart-bars">${values.map((v,i)=>`<rect data-bar="${i}" x="${xs[i]-15}" y="${ys[i]}" width="30" height="${145-ys[i]}" rx="6" fill="url(#${uid}-bar)" stroke="#6eaec6" stroke-width=".6"/>`).join('')}</g><g class="chart-lines"><path d="${curve} L325 145 L25 145Z" fill="url(#${uid}-area)"/><path d="${curve}" fill="none" stroke="#3187af" stroke-width="3.5" stroke-linecap="round"/><path d="${curve}" fill="none" stroke="#d6faff" stroke-width="1.1" stroke-linecap="round"/></g><path class="chart-guide" stroke="#327fa2" stroke-dasharray="3 4"/><circle class="chart-point" r="5" fill="#edfcff" stroke="#327fa2" stroke-width="2"/>${days.map((d,i)=>`<text x="${xs[i]}" y="169" text-anchor="middle">${d}</text>`).join('')}</svg><div class="chart-caption"><span data-chart-day>周日</span><span>移动或点按图表查看</span></div></div>`;
  const plot=host.querySelector('[data-chart-plot]');
  function select(n){selected=Math.max(0,Math.min(6,n));host.querySelector('[data-chart-value]').textContent=values[selected].toLocaleString('en-US');host.querySelector('[data-chart-day]').textContent=days[selected];plot.setAttribute('aria-valuenow',selected);plot.setAttribute('aria-valuetext',days[selected]+' '+values[selected].toLocaleString('en-US'));host.querySelector('.chart-guide').setAttribute('d',`M${xs[selected]} ${ys[selected]+8}V145`);const dot=host.querySelector('.chart-point');dot.setAttribute('cx',xs[selected]);dot.setAttribute('cy',ys[selected]);host.querySelectorAll('[data-bar]').forEach((r,i)=>r.setAttribute('opacity',i===selected?'1':'.58'));emit();}
  for(const button of host.querySelectorAll('[data-chart-mode]'))listen(button,'click',()=>{mode=button.dataset.chartMode;host.querySelector('.ice-chart').dataset.mode=mode;host.querySelectorAll('[data-chart-mode]').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));emit();});
  const point=e=>{const r=plot.getBoundingClientRect();select(Math.round(((e.clientX-r.left)/r.width*350-25)/50));};
  listen(plot,'pointermove',point);listen(plot,'pointerdown',point);
  listen(plot,'keydown',e=>{const keys={ArrowRight:selected+1,ArrowLeft:selected-1,Home:0,End:6};if(e.key in keys){e.preventDefault();select(keys[e.key]);}});select(6);
 }
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0});observer.observe(host);
 listen(document,'visibilitychange',sync);
 listen(pref,'change',()=>{if(!explicit)userPaused=visual&&pref.matches;sync();});
 const api={state,play(){explicit=true;userPaused=false;sync();},pause(){explicit=true;userPaused=true;sync();},seek(t){elapsed=Math.max(0,Number(t)||0);draw();emit();},setSpeed(v){speed=Math.max(.5,Math.min(1.5,Number(v)||1));emit();},setPalette(key){if(!colors[key])return;palette=key;engine?.setInk?.(colors[key]);emit();},capture(){return engine?.capture?.()||host.innerHTML;},dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(raf);observer.disconnect();cleanup.forEach(fn=>fn());engine?.setActive?.(false);engine?.dispose?.();engine=null;host.replaceChildren();delete host.motion;}};
 host.motion=api;return api;
}
window.XiaMotion={mount,colors};
})();
