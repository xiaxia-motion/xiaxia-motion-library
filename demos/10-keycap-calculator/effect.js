// 夏夏的AI灵感 · 实体键帽计算。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
// 原版单控件的尺寸和动作参数。
const motion={"target": ".calculator", "key": "calcKey", "type": "calc", "fromValue": 0, "toValue": 1, "start": 1.4, "end": 3.4};
const device=document.querySelector(motion.target);device.classList.add('chosen');
const stage=document.getElementById('stage');
function fit(){const ratio=Math.min(stage.clientWidth/(device.offsetWidth+82),stage.clientHeight/(device.offsetHeight+72));device.style.setProperty('--fit',ratio);}
new ResizeObserver(fit).observe(stage);fit();
const all=s=>Array.from(device.querySelectorAll(s));
const one=(sel,fn)=>{const el=device.querySelector(sel);if(el)fn(el);};
const text=(sel,val)=>one(sel,el=>el.textContent=val);
const clamp=x=>Math.min(1,Math.max(0,x));
const ease=x=>(x=clamp(x),x*x*(3-2*x));
function knob(key,value){
 one('[data-knob="'+key+'"]',el=>{el.style.setProperty('--angle',(-135+2.7*value)+'deg');el.style.setProperty('--arc',(2.7*value)+'deg');el.setAttribute('aria-valuenow',Math.round(value));});
 text('[data-value="'+key+'"]',Math.round(value));
 if(key==='darkTune'){text('[data-frequency="darkTune"]',(88+value*.2).toFixed(1));text('[data-dark-station]',value<27?'清晨与风':value<62?'夜色漫游':value<82?'城市爵士':'深夜留声');}
 if(key==='woodTune'){text('[data-frequency="woodTune"]',(88+value*.2).toFixed(1));one('.dial-pointer',e=>e.style.left=(6+value*.88)+'%');}
 if(key==='metalLight'){one('.light-cone',e=>e.style.opacity=.15+value*.0085);one('.lamp-preview',e=>e.style.setProperty('--light',value/100));}
}
function setSwitch(on,travel){one('[data-toggle="'+motion.key+'"]',e=>e.setAttribute('aria-checked',String(on)));one('.ice-thumb',e=>e.style.transform='translateX('+(208*travel)+'px)');text('[data-blue-status]',on?'已开启':'已关闭');}
function mode(label){all('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===label)));}
function focus(on,age){one('[data-toggle="fusionFocus"]',e=>{e.setAttribute('aria-pressed',String(on));e.textContent=on?'暂停专注':'开始专注';});const remaining=on?1499-Math.floor(Math.max(0,age)):1500;text('[data-focus-min]',String(Math.floor(remaining/60)).padStart(2,'0'));text('[data-focus-sec]',String(remaining%60).padStart(2,'0'));}
function keypress(key,symbol,expression){text('#calc-result',symbol);text('#calc-expression',expression);all('[data-key]').forEach(b=>b.classList.toggle('pressed',b.dataset.key===key));}
let focusTimer=null;
function stopFocusTimer(){if(focusTimer!==null){clearInterval(focusTimer);focusTimer=null;}}
function toggleFocus(on){stopFocusTimer();focus(on,0);if(on){const started=performance.now();focusTimer=setInterval(()=>{const elapsed=(performance.now()-started)/1000;if(elapsed>=1499){stopFocusTimer();focus(false,0);}else focus(true,elapsed);},150);}}
window.drawEffect=t=>{stopFocusTimer();const q=clamp((t-motion.start)/(motion.end-motion.start)),s=ease(q);
 switch(motion.type){
 case 'knob':knob(motion.key,motion.fromValue+(motion.toValue-motion.fromValue)*s);break;
 case 'switch':setSwitch(q>0,1+2.4*(q-1)**3+1.4*(q-1)**2);break;
 case 'mode':mode(t>=3.7?'温暖':'清澈');break;
 case 'focus':focus(q>0,t-motion.start);break;
 case 'calc':{const i=Math.floor((t-1.4)/.6),keys=['8','×','6','='],k=Math.max(0,Math.min(3,i));keypress(i>=0&&t<(1.4+k*.6+.18)?keys[k]:'',i<0?'0':['8','8','6','48'][k],i<1?'':['','8 ×','8 ×','8 × 6 ='][k]);break;}
 }};
function intervene(){window.singleEffect?.pause();}
all('[data-toggle]').forEach(b=>b.onclick=()=>{intervene();const on=b.getAttribute('aria-pressed')!=='true'&&b.getAttribute('aria-checked')!=='true';if(b.dataset.toggle==='bluePower')setSwitch(on,on?1:0);else if(b.dataset.toggle==='fusionFocus')toggleFocus(on);else{b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-checked',String(on));}});
all('[data-mode]').forEach(b=>b.onclick=()=>{intervene();mode(b.dataset.value);});
all('[data-knob]').forEach(b=>{let y,value;b.onpointerdown=e=>{intervene();b.setPointerCapture(e.pointerId);y=e.clientY;value=Number(b.getAttribute('aria-valuenow')||motion.fromValue);};b.onpointermove=e=>{if(y!==undefined)knob(b.dataset.knob,100*clamp((value+y-e.clientY)/100));};b.onpointerup=b.onpointercancel=()=>{y=undefined;};b.onkeydown=e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){intervene();e.preventDefault();knob(b.dataset.knob,100*clamp((Number(b.getAttribute('aria-valuenow'))+(['ArrowUp','ArrowRight'].includes(e.key)?1:-1))/100));}};});
let number='0',prev=null,op=null,replace=true;
function calc(k){if(k==='AC'){number='0';prev=null;op=null;replace=true;}else if(/^[0-9.]$/.test(k)){if(k==='.'&&!replace&&number.includes('.'))return;number=replace?(k==='.'?'0.':k):number+k;replace=false;}else if(k==='±')number=String(-Number(number));else if(k==='%')number=String(Number(number)/100);else{if(op&&prev!==null&&!replace){const a=prev,b=Number(number),actions={'+':()=>a+b,'−':()=>a-b,'×':()=>a*b,'÷':()=>b===0?NaN:a/b};let n=actions[op]?.();number=Number.isFinite(n)?String(Number(n.toPrecision(10))):'错误';}prev=Number(number);op=k==='='?null:k;replace=true;}keypress(k,number,op?String(prev)+' '+op:'');setTimeout(()=>keypress('',number,op?String(prev)+' '+op:''),160);}
all('[data-key]').forEach(b=>b.onclick=()=>{intervene();calc(b.dataset.key);});
all('input[type=range]').forEach(b=>b.oninput=()=>{intervene();text('[data-value="'+b.dataset.range+'"]',b.value);one('[data-fill="'+b.dataset.range+'"]',f=>f.style.width=b.value+'%');});

