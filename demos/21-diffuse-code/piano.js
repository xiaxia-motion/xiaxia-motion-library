// 浏览器合成高音钢琴反馈。六个音的触发帧、音高和按住时长来自正式输入时表。
(() => {
  const frames=[1467,1479,1490,1502,1515,1529];
  const midi=[77,81,84,86,84,89],held=[.078,.074,.081,.078,.085,.190];
  function voice(ctx,i,start,destination){
    if(i<0||i>=midi.length)return [];
    const hz=440*2**((midi[i]-69)/12),release=i===5?.23:.115;
    const end=start+held[i]+release,nodes=[];
    for(const [harmonic,level,decay] of [[1,.21,4.1],[2,.085,8],[3,.042,13],[4,.024,21],[6,.009,32]]){
      const oscillator=ctx.createOscillator(),gain=ctx.createGain();oscillator.type='sine';
      oscillator.frequency.value=hz*harmonic*(1+.00008*(harmonic*harmonic-1));
      gain.gain.setValueAtTime(.000001,start);gain.gain.exponentialRampToValueAtTime(level,start+.0025);
      gain.gain.exponentialRampToValueAtTime(level*Math.exp(-held[i]*decay),start+held[i]);
      gain.gain.exponentialRampToValueAtTime(.000001,end);
      oscillator.connect(gain);gain.connect(destination);oscillator.start(start);oscillator.stop(end+.009);
      oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};nodes.push(oscillator);
    }return nodes;
  }
  function create(){
    let ctx=null,enabled=false,nodes=[];
    function cancel(){for(const osc of nodes){try{osc.stop();}catch{}}nodes=[];}
    function strike(i,when){if(!enabled||!ctx)return;nodes=nodes.filter(n=>n.__ends>ctx.currentTime);
      for(const osc of voice(ctx,i,when,ctx.destination)){osc.__ends=when+held[i]+.26;nodes.push(osc);}}
    return {get enabled(){return enabled;},async toggle(){
      if(enabled){enabled=false;cancel();return false;}
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio)throw Error('当前浏览器没有音频合成功能');ctx=ctx||new Audio();await ctx.resume();enabled=true;return true;
    },cancel,play(i,delay=0){if(ctx)strike(i,ctx.currentTime+.008+Math.max(0,delay));},
    timeline(frame,speed){cancel();if(!ctx||!enabled)return;const base=ctx.currentTime+.002;
      frames.forEach((cue,i)=>{if(cue>=frame)strike(i,base+(cue-frame)/(60*speed));});},
    dispose(){cancel();if(ctx)ctx.close();}};
  }
  window.DiffusePiano={create,voice,frames,midi,held};
})();
