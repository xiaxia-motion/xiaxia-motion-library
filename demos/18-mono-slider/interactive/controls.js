// 使用与演示相同的绘图函数，直接处理图上的指针及键盘输入。
(() => {
  const cfg=window.SETTINGS, key=cfg.id, ice=cfg.style==='ice', art=document.getElementById('drawing');
  const editor=document.getElementById('query'), feedback=document.getElementById('feedback');
  const bound=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), now=()=>performance.now()/1000;
  const model={choice:key==='radio'||key==='dropdown'?1:0,focused:0,lower:20,upper:90,level:key==='knob'?64:96,
    day:ice?18:14,checks:ice?[true,true,false]:[false,false,false],radio:0,open:true,confirmed:false,query:key==='results'?'数据':'',
    matches:0,playing:key==='loader'&&ice,position:ice?137/160:.32,angle:0,movingSeconds:0,on:false,trend:0,started:-20,count:0};
  const animated={}, answer=(s)=>{if(feedback.textContent!==s)feedback.textContent=s;};
  function smooth(x){x=bound(x);return x*x*(3-2*x);}
  function move(name,value){const current=valueOf(name,value);animated[name]={from:current,to:value,at:now()};}
  function valueOf(name,initial){const a=animated[name];return a?a.from+(a.to-a.from)*smooth((now()-a.at)/.16):initial;}
  const fire=()=>{model.started=now();model.count++;};
  const clampChoice=(n,max=2)=>bound(Math.round(n),0,max);
  const picture=(t,patch)=>window.componentSource.render(t,patch);
  function choice(n){move('choice',model.choice);animated.choice.from=valueOf('choice',model.choice);animated.choice.to=clampChoice(n);model.choice=clampChoice(n);answer('已选第 '+(model.choice+1)+' 项');}
  function setOn(){move('on',Number(model.on));animated.on.to=Number(!model.on);model.on=!model.on;answer(model.on?'已开启':'已关闭');}
  function durationPulse(t){return t<0||t>.16?0:t<.033?t/.033:1-smooth((t-.033)/.127);}
  function time(){return Math.max(0,now()-model.started);}
  function rangeEdit(x,edge){const v=Math.round(bound((x-89)/(cfg.width-174))*100);if(edge==='lower')model.lower=Math.min(v,model.upper);else model.upper=Math.max(v,model.lower);syncRanges();answer(model.lower+' — '+model.upper);}
  function syncRanges(){const a=document.getElementById('low'),b=document.getElementById('high');if(a&&b){a.value=model.lower;b.value=model.upper;}}
  function setChecks(i){model.checks[i]=!model.checks[i];model.focused=i;syncChecks();answer('第 '+(i+1)+' 项'+(model.checks[i]?'已勾选':'已取消'));}
  function syncChecks(){document.querySelectorAll('[data-check]').forEach((el,i)=>el.checked=model.checks[i]);document.querySelectorAll('[data-radio]').forEach((el,i)=>el.checked=model.radio===i);}
  function setDay(n){model.day=bound(Math.round(n),ice?1:14,ice?30:20);answer('11 月 '+model.day+' 日');}
  function setPlay(){model.playing=!model.playing;answer(model.playing?'正在播放':'已暂停');}
  function seek(v){model.position=bound(v);answer('播放位置 '+Math.round(model.position*160)+' 秒');}
  function submit(){const list=['数据概览','数据趋势','数据来源','设置声音','设置保存','设置画质','设置主题','设置提醒'];
    model.matches=model.query?list.filter(s=>s.includes(model.query)).length:0;fire();answer('「'+model.query+'」找到 '+model.matches+' 个本地示例结果');}
  function confirm(yes){model.confirmed=yes;fire();answer(yes?'设置已保存':'已返回，可再次确认');}
  function action(p){
    const x=p.x,y=p.y;
    switch(key){
    case 'button':case 'toast':case 'progress':fire();answer('第 '+model.count+' 次'+(key==='progress'?'加载':key==='toast'?'提示':'按压'));break;
    case 'loader':if(ice){setPlay();}else{fire();answer('正在加载');}break;
    case 'player':
      if(ice&&y>150&&x<119)seek(model.position-.0625);
      else if(ice&&y>150&&x>175)seek(model.position+.0625);
      else setPlay();break;
    case 'switch':setOn();break;
    case 'tabs': choice(Math.floor(ice?(x-14)/88:(x-40)/((cfg.width-80)/3)));break;
    case 'date':{const col=Math.round((x-32)/38),row=Math.round((y-141)/33),n=row*7+col-5;if(col>=0&&col<=6&&row>=0&&n>=1&&n<=30)setDay(n);break;}
    case 'calendar':if(y>210)answer('已确认 11 月 '+model.day+' 日');else if(y>=76)setDay(14+Math.floor((x-40)/((cfg.width-80)/7)));break;
    case 'dropdown':if(y<61){model.open=!model.open;answer(model.open?'菜单已展开':'菜单已收起');}else if(model.open)choice(Math.round((y-83)/37));break;
    case 'menu':if(y>=90)choice(Math.floor((y-92)/((cfg.height-117)/3)));break;
    case 'checkbox':if(y>=51)setChecks(clampChoice((y-73)/42));break;
    case 'radio':if(y>=51)choice(clampChoice((y-73)/42));break;
    case 'choices':if(y>=cfg.height-74){answer('已应用 '+model.checks.filter(Boolean).length+' 项，提醒档位 '+(model.radio+1));}else if(y>=90){const i=clampChoice((y-124)/76);if(x<cfg.width*.51)setChecks(i);else{model.radio=i;syncChecks();answer('提醒档位 '+(i+1));}}break;
    case 'modal':case 'dialog':if(y>cfg.height*.57)confirm(x>cfg.width/2);break;
    case 'results':if(y>120){choice((y-166)/78);fire();}else editor?.focus();break;
    case 'search':if(x>=(ice?542:cfg.width-183))submit();else editor?.focus();break;
    }
  }
  function adjust(p,edge,start){
    if(key==='knob'){model.level=bound(Math.round(drag.level+(drag.y-p.y)*.75),0,100);answer('强度 '+model.level);}
    if(key==='slider'&&ice){model.level=Math.round(bound((p.x-70)/154)*96);answer('音量 '+model.level);}
    if(key==='slider'&&!ice)rangeEdit(p.x,edge);
    if(key==='chart'){const a=ice?(p.x-105)/407:(p.x-58)/(cfg.width-112);model.trend=bound(a);answer(ice?'趋势值 '+Math.round(8640+1320*model.trend).toLocaleString('en-US'):'访问量 '+Math.round(window.IceCurve.valueAt(390+660*model.trend)).toLocaleString('en-US'));}
    if(key==='player'&&edge==='seek')seek(ice?(p.x-30)/236:(p.x-70)/(cfg.width-140));
  }
  function local(e){const pt=new DOMPoint(e.clientX,e.clientY).matrixTransform(art.getScreenCTM().inverse());return{x:pt.x,y:pt.y};}
  let drag=null,previous=now();
  art.addEventListener('pointerdown',e=>{
    const p=local(e);e.preventDefault();art.focus();art.setPointerCapture(e.pointerId);
    let edge=null;
    if(key==='player'&&(ice?(p.y>=96&&p.y<=150):Math.abs(p.y-(cfg.height-74))<29))edge='seek';
    if(key==='slider'){const v=100*bound((p.x-89)/(cfg.width-174));edge=ice?'value':Math.abs(v-model.lower)<Math.abs(v-model.upper)?'lower':'upper';}
    if(key==='knob'||key==='chart')edge='value';
    drag={edge,y:p.y,level:model.level,id:e.pointerId};if(edge)adjust(p,edge,true);else action(p);
    render(0);
  });
  art.addEventListener('pointermove',e=>{if(drag?.id===e.pointerId&&drag.edge)adjust(local(e),drag.edge,false);else if(key==='chart'&&!drag)adjust(local(e),'value',false);});
  const release=e=>{if(drag?.id===e.pointerId)drag=null;};art.addEventListener('lostpointercapture',release);art.addEventListener('pointercancel',release);art.addEventListener('pointerup',release);
  art.addEventListener('keydown',e=>{
    const k=e.key,delta=['ArrowRight','ArrowDown'].includes(k)?1:['ArrowLeft','ArrowUp'].includes(k)?-1:0;
    if(delta){
      if(['tabs','menu','dropdown','radio','results'].includes(key))choice(model.choice+delta);
      else if(key==='checkbox'){model.focused=clampChoice(model.focused+delta);answer('第 '+(model.focused+1)+' 项，按空格勾选');}
      else if(key==='player')seek(model.position+delta/32);
      else if(key==='date'||key==='calendar')setDay(model.day+delta*(key==='date'&&['ArrowUp','ArrowDown'].includes(k)?7:1));
      else if(key==='chart'){model.trend=bound(model.trend+delta/10);adjust({x:ice?105+407*model.trend:58+(cfg.width-112)*model.trend},'value',false);}
      else if(key==='slider'||key==='knob'){if(ice){model.level=bound(model.level+delta,0,key==='knob'?100:96);answer('当前值 '+model.level);}else{model.upper=bound(model.upper+delta,model.lower,100);syncRanges();answer(model.lower+' — '+model.upper);}}
      else return;
    }else if(k==='Escape'&&['modal','dialog'].includes(key))confirm(false);
    else if(k==='Enter'||k===' '){
      if(key==='checkbox')setChecks(model.focused);
      else if(key==='modal'||key==='dialog')confirm(true);
      else if(key==='search')editor?.focus();
      else if(key==='results'){fire();answer('已确认第 '+(model.choice+1)+' 项');}
      else if(key==='date'||key==='calendar')answer('已确认 11 月 '+model.day+' 日');
      else if(key==='dropdown'){model.open=!model.open;answer(model.open?'菜单已展开':'菜单已收起');}
      else if(['button','toast','loader','progress','switch','player'].includes(key))action({x:cfg.width/2,y:cfg.height/2});
      else return;
    }else return;
    e.preventDefault();render(0);
  });
  if(editor){
    editor.value=model.query;
    editor.addEventListener('input',()=>{model.query=editor.value;model.matches=0;answer('已输入 '+model.query);render(0);});
    editor.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();submit();render(0);}});
  }
  for(const [id,other] of [['low','lower'],['high','upper']]){const input=document.getElementById(id);if(input)input.addEventListener('input',()=>{const n=Number(input.value);model[other]=other==='lower'?Math.min(n,model.upper):Math.max(n,model.lower);syncRanges();render(0);answer(model.lower+' — '+model.upper);});}
  document.querySelectorAll('[data-check]').forEach((el,i)=>el.addEventListener('change',()=>{setChecks(i);render(0);}));
  document.querySelectorAll('[data-radio]').forEach((el,i)=>el.addEventListener('change',()=>{model.radio=i;syncChecks();render(0);answer('提醒档位 '+(i+1));}));
  syncChecks();syncRanges();
  function render(dt){
    if(model.playing){model.movingSeconds+=dt;model.angle=(model.angle+dt*(key==='loader'?400:145))%360;if(key==='player')model.position=(model.position+dt/160)%1;}
    const age=time(), pulse=durationPulse(age), q=valueOf('choice',model.choice), toggle=valueOf('on',Number(model.on));
    let t=cfg.start,patch={};
    switch(key){
    case 'button':if(ice)patch.button=pulse;else t=cfg.events.button+Math.min(age,.5);break;
    case 'loader':if(ice)patch.loader=model.angle;else t=Math.min(cfg.end,cfg.start+age);break;
    case 'player':if(ice)patch={position:model.position,disc:model.angle,playing:model.playing};else{t=cfg.events.play+.2+model.movingSeconds;patch={play:Number(model.playing),music:model.position};}break;
    case 'slider':if(ice)patch.slider=model.level;else patch={low:model.lower,high:model.upper};break;
    case 'knob':patch.knob=model.level;break;
    case 'switch':patch.toggle=toggle;break;
    case 'tabs':patch=ice?{tabs:14+88*q,tabSelected:model.choice}:{tab:q};break;
    case 'date':patch.day=model.day;break;
    case 'calendar':patch.date=model.day;break;
    case 'dropdown':patch={choice:model.choice,menuOffset:q,open:model.open};break;
    case 'menu':patch.menu=q;break;
    case 'radio':patch={choice:model.choice,radioOffset:q};break;
    case 'checkbox':patch={firstCheck:Number(model.checks[0]),checkB:Number(model.checks[1]),checkC:Number(model.checks[2])};break;
    case 'choices':patch={checks:model.checks.map(Number),radio:model.radio};break;
    case 'search':case 'results':{
      const characters=Array.from(model.query),limit=ice?12:16;
      const visibleQuery=characters.length>limit?'…'+characters.slice(1-limit).join(''):model.query;
      if(ice)patch={searchQuery:visibleQuery,searchResult:model.matches,searchPress:pulse,caret:editor===document.activeElement?1:0};
      else{t=cfg.end;patch={query:visibleQuery,selection:model.choice,reveal:model.count&&age<.16?smooth(age/.16):1};}
      break;}
    case 'chart':patch=ice?{chart:model.trend}:{chart:1,hover:model.trend};break;
    case 'dialog':case 'modal':if(ice)patch={confirmed:model.confirmed,modal:pulse};else{t=cfg.events.confirm+Math.min(age,.35);patch.confirmed=model.confirmed;}break;
    case 'progress':if(ice)patch.progress=model.count?smooth(age/1.5):0;else t=model.count?Math.min(cfg.end,cfg.events.progressStart+age):cfg.start;break;
    case 'toast':patch={toast:model.count?smooth(age/.29):1,toastPulse:model.count?.12*Math.sin(Math.PI*bound(age/.45)):0};break;
    }
    picture(t,patch);
  }
  // 休眠标签不补算长时间动画，组件恢复时从当前状态继续。
  let raf=null;
  function tick(stamp){const n=stamp/1000;render(Math.min(.1,Math.max(0,n-previous)));previous=n;raf=requestAnimationFrame(tick);}
  function visibility(){if(raf!==null)cancelAnimationFrame(raf);raf=null;previous=now();if(!document.hidden)raf=requestAnimationFrame(tick);}
  document.addEventListener('visibilitychange',visibility);window.addEventListener('pagehide',()=>{if(raf!==null)cancelAnimationFrame(raf);});window.addEventListener('pageshow',visibility);
  window.liveComponent={state:()=>structuredClone(model)};render(0);visibility();
})();
