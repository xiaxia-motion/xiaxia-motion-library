// 单个组件从零计时。原片动作由同目录的 effect.js 按绝对秒计算。
(() => {
  const cfg=window.SETTINGS, total=cfg.end-cfg.start, range=document.getElementById('scrub'), clock=document.getElementById('clock'), button=document.getElementById('play');
  let elapsed=0, previous=null, raf=null, playing=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  function paint(){window.componentSource.render(cfg.start+elapsed);range.value=Math.round(1000*elapsed/total);clock.textContent=elapsed.toFixed(2)+' / '+total.toFixed(2)+' 秒';button.textContent=playing?'暂停':'播放';}
  function stopClock(){if(raf!==null)cancelAnimationFrame(raf);raf=null;previous=null;}
  function frame(stamp){raf=null;if(!playing||document.hidden)return;if(previous!==null)elapsed=(elapsed+Math.min(.12,(stamp-previous)/1000))%total;previous=stamp;paint();raf=requestAnimationFrame(frame);}
  function startClock(){stopClock();if(playing&&!document.hidden)raf=requestAnimationFrame(frame);}
  function seek(n){elapsed=Math.max(0,Math.min(total,Number(n)||0));previous=null;paint();}
  function play(){playing=true;paint();startClock();}
  function pause(){playing=false;stopClock();paint();}
  button.onclick=()=>playing?pause():play();document.getElementById('restart').onclick=()=>{seek(0);play();};
  range.oninput=()=>seek(Number(range.value)*total/1000);
  document.addEventListener('visibilitychange',startClock);window.addEventListener('pagehide',stopClock);window.addEventListener('pageshow',startClock);
  window.singleEffect={seek,play,pause,state:()=>({elapsed,duration:total,playing})};paint();startClock();
})();
