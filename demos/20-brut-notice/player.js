// 离线播放器把组件内的秒数转换为一帧原始动作；录屏和代码调用共享同一入口。
(async function(){
  const cfg=window.EFFECT_SETTINGS,get=id=>document.getElementById(id);
  const canvas=get('picture'),ctx=canvas.getContext('2d'),range=get('time'),toggle=get('play'),status=get('status');
  const duration=cfg.end-cfg.start,role=cfg.control;
  let time=0,playing=false,last=0,live=false,raf=0,ready=false;
  const state={position:0,target:0,from:0,started:0,length:0,minutes:10,inputText:''};
  const limit=(v,a,b)=>Math.max(a,Math.min(b,v));
  function render(){
    ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.save();
    try{
      if(live)NeoEffect.operation(ctx,state.position,state);
      else NeoEffect.draw(ctx,cfg.start+Math.min(duration-1/cfg.fps,Math.round(time*cfg.fps)/cfg.fps));
    }finally{ctx.restore();}
    range.value=String(time);get('readout').value=time.toFixed(2)+' / '+duration.toFixed(2)+' 秒';
  }
  function schedule(){if(!raf&&ready)raf=requestAnimationFrame(tick);}
  function tick(stamp){
    raf=0;
    if(live){
      if(!state.length)return;
      const f=limit((stamp-state.started)/state.length,0,1);
      state.position=state.from+(state.target-state.from)*f*f*(3-2*f);
      if(f===1)state.length=0;render();if(f<1)schedule();return;
    }
    if(!playing)return;
    if(last)time=(time+(stamp-last)/1000*cfg.speed)%duration;
    last=stamp;render();schedule();
  }
  function pause(){playing=false;last=0;toggle.textContent='播放';}
  function play(){if(live)setMode(false);playing=true;last=0;toggle.textContent='暂停';schedule();}
  function seek(s){if(live)setMode(false);time=limit(Number(s)||0,0,duration);render();}
  function setMode(v){
    pause();live=!!v&&!!role;state.length=0;
    get('demo').hidden=live;get('actions').hidden=!live;if(role)get('mode').textContent=live?'返回原动作':'自己操作';
    canvas.style.cursor=live?'pointer':'default';
    if(live){state.position=state.target=0;state.minutes=10;state.inputText='';const field=get('value');if(field)field.value=role==='slider'?'10':'';status.textContent=cfg.hint;}
    else status.textContent='';
    if(ready)render();
  }
  function animate(target,ms=270,restart=false){
    if(restart)state.position=0;
    state.from=state.position;state.target=target;state.started=performance.now();state.length=ms;
    render();schedule();
  }
  function act(value){
    if(!live)return;
    if(role==='slider'){state.minutes=limit(Math.round(Number(value)),0,30);get('value').value=state.minutes;status.textContent='提前 '+state.minutes+' 分钟';render();return;}
    if(role==='search'){state.inputText=String(value).slice(0,7);get('value').value=state.inputText;state.position=1;status.textContent=state.inputText?'输入了「'+state.inputText+'」':'请输入乐队名称';render();return;}
    if(role==='select'){const next=value==='choose'?1:(state.target===0?.53:0);animate(next);status.textContent=next===1?'已选择主舞台':next?'已展开舞台列表':'已收起';return;}
    if(['notice','progress','button'].includes(role)){animate(1,role==='progress'?1050:500,true);status.textContent=cfg.response;return;}
    const next=value==='on'?1:value==='off'?0:state.target<.5?1:0;
    animate(next,role==='data'?440:260);status.textContent=next?cfg.response:cfg.defaultLabel;
  }
  function point(e){
    const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*1440,y=(e.clientY-r.top)/r.height*1080;
    if(role==='slider'){act((x-314)/753*30);return;}
    if(role==='search'){get('value').focus();return;}
    if(role==='tabs'||role==='radio'){act(x<720?'off':'on');return;}
    if(role==='select'){act(y>557&&state.target>0?'choose':'open');return;}
    act('toggle');
  }
  canvas.addEventListener('pointerdown',e=>{if(!live)return;if(role==='slider')canvas.setPointerCapture(e.pointerId);point(e);});
  canvas.addEventListener('pointermove',e=>{if(live&&role==='slider'&&canvas.hasPointerCapture(e.pointerId))point(e);});
  canvas.addEventListener('pointerup',e=>{if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);});
  const value=get('value');if(value)value.addEventListener('input',e=>act(e.target.value));
  for(const button of document.querySelectorAll('[data-act]'))button.addEventListener('click',()=>act(button.dataset.act));
  toggle.onclick=()=>playing?pause():play();get('reset').onclick=()=>seek(0);
  range.max=String(duration);range.step=String(1/cfg.fps);range.oninput=e=>{pause();seek(e.target.value);};
  if(role)get('mode').onclick=()=>setMode(!live);
  try{
    await NeoEffect.ready();ready=true;render();get('panel').disabled=false;
    window.singleEffect={seek,pause,play,operate:act,setMode,get time(){return time},get state(){return {...state}},get duration(){return duration}};
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)play();
  }catch(err){status.textContent='画面无法启动。'+(cfg.webgl?'请在支持 WebGL 2 的浏览器中开启图形加速后重试。':'请完整解压后重试。');console.error(err);}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)last=0;});
})();
