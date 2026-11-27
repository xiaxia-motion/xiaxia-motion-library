// 独立网页组件共用工具：事件可释放，动画可替换，时钟只由宿主推进。
(()=>{'use strict';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),mix=(a,b,p)=>a+(b-a)*p,smooth=p=>{p=clamp(p);return p*p*(3-2*p);},esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// 这里只限制视觉插值步长；计时器、按住时长和音频仍使用宿主原始时间。
function timeline(reduced=()=>false){
 const jobs=new Map();let active=true,dead=false;
 return {tween(key,from,to,duration,update,finish){if(dead)return;jobs.delete(key);if(reduced()||duration<=0){update(to);finish?.();return;}const job={from,to,duration,update,finish,t:0};jobs.set(key,job);update(from);},
 stop(key){jobs.delete(key);},draw(dt){if(dead||!active||!Number.isFinite(dt)||dt<0)return;for(const [key,j] of [...jobs]){if(jobs.get(key)!==j)continue;j.t+=Math.min(dt,.08);const p=reduced()?1:clamp(j.t/j.duration);j.update(mix(j.from,j.to,smooth(p)));if(p>=1&&jobs.get(key)===j){jobs.delete(key);j.finish?.();}}},setActive(v){active=!!v;},dispose(){dead=true;jobs.clear();}};
}
function art(kind=0){const palettes=[['#eee8d8','#dc9a69','#a9b5a2','#496454'],['#e6eced','#d7ba79','#99a9b1','#3c586b'],['#e7e1d4','#d77c58','#b4a18b','#665d50']];const c=palettes[((kind%3)+3)%3];return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="${c[0]}"/><circle cx="${420-kind*60}" cy="115" r="55" fill="${c[1]}"/><path d="M0 290L110 118 260 270 360 180 600 320V400H0Z" fill="${c[2]}"/><path d="M0 350L160 240 300 335 480 190 600 295V400H0Z" fill="${c[3]}"/><path d="M250 400Q410 325 350 310T390 285" fill="none" stroke="${c[0]}" stroke-width="8" opacity=".65"/></svg>`);}
function shell(host,ctx,{name,body,actions='',note='',className=''}={}){
 const root=document.createElement('div');root.className='rm-shell '+className;root.dataset.active='true';
 root.innerHTML=`<div class="rm-stage" aria-label="${esc(name||'交互预览')}">${body||''}</div><div class="rm-actions">${actions}</div><div class="rm-status" role="status" aria-live="polite">${esc(note)}</div>`;host.append(root);
 const cleanup=[],cancelPointers=[],clock=timeline(ctx.reducedMotion);let active=true,dead=false;
 const k={root,stage:root.querySelector('.rm-stage'),actions:root.querySelector('.rm-actions'),status:root.querySelector('.rm-status'),$:s=>root.querySelector(s),$$:s=>[...root.querySelectorAll(s)],
 on(el,event,fn){if(typeof el==='string')el=k.$(el);if(!el)throw Error('缺少事件目标 '+event);el.addEventListener(event,fn);const off=()=>el.removeEventListener(event,fn);cleanup.push(off);return off;},
 emit(patch){if(!dead)ctx.emit(patch);},say(s){if(!dead)k.status.textContent=s;},
 tween:(...args)=>clock.tween(...args),stop:key=>clock.stop(key),draw:(time,dt)=>clock.draw(dt),
 setActive(v){active=!!v;root.dataset.active=String(active);clock.setActive(active);if(!active)cancelPointers.forEach(fn=>fn());},get active(){return active;},
 dispose(){if(dead)return;dead=true;clock.dispose();cleanup.splice(0).forEach(f=>f());root.remove();},
 range(label,min,max,step,value,fn){const wrap=document.createElement('label');wrap.className='rm-range';const text=document.createElement('span');text.textContent=label;const input=document.createElement('input');Object.assign(input,{type:'range',min:String(min),max:String(max),step:String(step),value:String(value)});input.setAttribute('aria-label',label);wrap.append(text,input);k.actions.append(wrap);k.on(input,'input',()=>fn(Number(input.value)));return input;},
 button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;k.actions.append(b);k.on(b,'click',fn);return b;},
 pointer(el,move,end){if(typeof el==='string')el=k.$(el);let down=false,pid=null,sx=0,sy=0,last=null;
  const pack=(event,start=false,cancelled=false)=>{const r=el.getBoundingClientRect();return {event,x:event.clientX-r.left,y:event.clientY-r.top,nx:r.width?(event.clientX-r.left)/r.width:0,ny:r.height?(event.clientY-r.top)/r.height:0,dx:event.clientX-sx,dy:event.clientY-sy,down,start,cancelled};};
  const finish=(e,cancelled)=>{if(!down||e.pointerId!==pid)return;down=false;const p=pack(e,false,cancelled);last=null;try{el.releasePointerCapture(pid);}catch{}pid=null;end?.(p);};
  cancelPointers.push(()=>{if(down&&last)finish(last,true);});
  k.on(el,'pointerdown',e=>{if(down||e.button!==0)return;down=true;pid=e.pointerId;sx=e.clientX;sy=e.clientY;last=e;try{el.setPointerCapture(pid);}catch{}move(pack(e,true));});
  k.on(el,'pointermove',e=>{if(!down||e.pointerId!==pid)return;last=e;move(pack(e));});k.on(el,'pointerup',e=>finish(e,false));k.on(el,'pointercancel',e=>finish(e,true));k.on(el,'lostpointercapture',e=>finish(e,true));
  cleanup.push(()=>{if(down&&last){down=false;try{el.releasePointerCapture(pid);}catch{}end?.(pack(last,false,true));}pid=null;});
 }
 };return k;
}
window.XiaRM={clamp,mix,smooth,esc,art,timeline,shell};
})();
