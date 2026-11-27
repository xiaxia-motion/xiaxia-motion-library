// 预览与独立操作共用同一份控件绘图。时间定位使用定稿的整数帧。
(() => {
  const get=id=>document.getElementById(id),cfg=window.EFFECT_SETTINGS,settings=DiffuseUI.config;
  const surface=get('stage'),glow=get('glow'),live=get('live'),liveCtx=live.getContext('2d');
  const flat=new URLSearchParams(location.search).get('view')==='flat';
  const stage=DiffuseUI.create(surface,glow,{flat}),piano=window.DiffusePiano?.create();
  const first=settings.start,last=settings.end,length=(last-first)/60;
  const progress=get('time'),playButton=get('play'),range=get('value'),status=get('status'),sound=get('sound');
  let mode='demo',running=false,playTime=0,anchor=0,raf=0,lastLoop=0,snapshot={},paintedFrame=-1;
  let speed=Number(cfg.speed)||1;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scale=Math.min(live.width/370,live.height/302);
  const ui={canvas:live,field:range,file:get('audio-file'),media:get('audio'),actions:Array.from(get('actions').querySelectorAll('button[data-act]')),
    status:s=>{status.textContent=s;},note:(i,delay)=>piano?.play(i,delay),point:e=>{const b=live.getBoundingClientRect();
      return {x:((e.clientX-b.left)/b.width-.5)*live.width/scale,y:((e.clientY-b.top)/b.height-.5)*live.height/scale};}};
  const handler=DiffuseInput.attach(ui);
  function position(){if(!running)return playTime;return (playTime+(performance.now()-anchor)/1000*speed)%length;}
  function draw(t){
    if(mode==='demo'){
      const pos=position(),frame=Math.min(last-1,first+Math.floor(pos*60+1e-7));
      if(frame!==paintedFrame){stage.render(frame);paintedFrame=frame;}
      progress.value=pos;get('readout').value=pos.toFixed(2)+' / '+length.toFixed(2)+' 秒';
      if(running){const loops=Math.floor((playTime+(performance.now()-anchor)/1000*speed)/length);
        if(loops!==lastLoop){lastLoop=loops;piano?.timeline(frame,speed);}}
    }else{
      const local=handler.sample(t/1000);
      snapshot={...DiffuseUI.stateAt(first),t:t/1000,spatial:false,contact:undefined,...local};
      const light=local.light;if(light)snapshot.contact={x:light[0],y:light[1],hue:.53+.066*snapshot.t};
      liveCtx.setTransform(1,0,0,1,0,0);liveCtx.fillStyle='#090a10';liveCtx.fillRect(0,0,live.width,live.height);
      liveCtx.translate(live.width/2,live.height/2);liveCtx.scale(scale,scale);
      DiffuseUI.drawLive(liveCtx,snapshot,light);
    }
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(t=>{raf=0;draw(t);if(running||mode==='live')schedule();});}
  function pause(){playTime=position();running=false;playButton.textContent='播放';piano?.cancel();}
  function play(){if(mode!=='demo')setMode('demo');if(running)return;if(playTime>=length)playTime=0;anchor=performance.now();lastLoop=0;running=true;playButton.textContent='暂停';piano?.timeline(first+playTime*60,speed);schedule();}
  function seek(s){if(mode!=='demo')setMode('demo');const was=running;pause();playTime=Math.min(length,Math.max(0,Number(s)||0));draw(performance.now());if(was)play();}
  function setMode(next){
    if(next===mode)return;pause();handler.leave?.();mode=next;
    const isLive=next==='live';live.hidden=!isLive;surface.hidden=isLive;glow.hidden=isLive;
    get('timeline').hidden=isLive;get('actions').hidden=!isLive;get('mode').textContent=isLive?'返回定稿演示':'自己操作';
    get('mode').setAttribute('aria-pressed',String(isLive));status.textContent=isLive?cfg.hint:'';
    if(isLive){live.focus({preventScroll:true});schedule();}else{paintedFrame=-1;draw(performance.now());}
  }
  playButton.onclick=()=>running?pause():play();get('restart').onclick=()=>{pause();seek(0);play();};
  progress.min=0;progress.max=length;progress.step=1/60;progress.oninput=()=>{pause();seek(+progress.value);};
  get('mode').onclick=()=>setMode(mode==='demo'?'live':'demo');
  if(sound)sound.onclick=async()=>{try{const yes=await piano.toggle();sound.setAttribute('aria-pressed',String(yes));sound.textContent=yes?'关闭琴声':'开启琴声';if(yes&&running)piano.timeline(first+position()*60,speed);}catch{status.textContent='此浏览器无法启用声音，画面可继续操作。';}};
  document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();handler.leave?.();}});
  window.addEventListener('pagehide',e=>{pause();handler.leave?.();if(!e.persisted){handler.dispose?.();piano?.dispose();stage.dispose();}});
  get('panel').disabled=false;draw(performance.now());
  window.singleEffect={seek,play,pause,setMode,render:()=>draw(performance.now()),
    get frame(){return paintedFrame;},get state(){return {...snapshot};},get renderer(){return stage.mode;},get duration(){return length;},get mode(){return mode;}};
  if(!reduce)play();
})();
