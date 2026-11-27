// 开启声音后，只有正常向前播放跨过音符时才发声。
(() => {
  const button=document.querySelector('#tone');let context,enabled=false,previous=null;
  button.onclick=async()=>{context??=new AudioContext();await context.resume();enabled=!enabled;previous=null;button.textContent=enabled?'关闭节拍声音':'开启节拍声音';};
  window.scoreSound=t=>{
    if(enabled&&previous!==null&&t>previous&&t-previous<.15){
      for(const n of window.scoreData.notes){if(n.time<=previous||n.time>t)continue;
        const now=context.currentTime,f=440*2**((n.pitch-69)/12);
        for(const [ratio,gain] of [[1,.19],[n.kind==='bell'?2.71:2,.043],[4.12,.016]]){
          const osc=context.createOscillator(),env=context.createGain();osc.frequency.value=f*ratio;
          env.gain.setValueAtTime(.0001,now);env.gain.exponentialRampToValueAtTime(gain*n.velocity,now+.007);
          env.gain.exponentialRampToValueAtTime(.0001,now+n.duration);osc.connect(env).connect(context.destination);osc.start(now);osc.stop(now+n.duration+.015);
        }
      }
    }
    previous=t;
  };
})();
