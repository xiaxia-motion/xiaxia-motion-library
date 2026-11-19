// 夏夏的AI灵感 · 光标烟花聚字落款。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
/* 沿用账号四式粒子与HUD落款的原日出山形，不重新设计Logo。 */
window.SwarmBrand={"markPaths": ["M146 106 A62 62 0 1 1 270 106 C246 111 226 108 203 97 C188 89 179 87 169 95 Z", "M23 143 C62 139 91 123 127 104 C154 88 168 76 183 78 C197 80 207 92 226 99 C264 114 321 113 375 98 C344 120 291 135 247 127 C214 123 194 106 177 103 C162 100 144 111 124 119 C88 136 57 146 23 147 Z", "M68 158 C104 147 142 139 177 137 C209 135 240 147 272 148 C299 149 329 142 348 133 C329 150 300 159 265 161 C227 162 200 151 171 149 C138 148 100 154 68 161 Z"], "palette": {"ink": "#233728", "red": "#bd302b", "paper": "#f6f2e9", "soft": "#7b8475"}};

/* 片尾：真实指针原位爆开，固定字形取样点汇成账号名，头像保留在中央。 */
(() => {
  const C=window.SwarmBrand.palette,paths=window.SwarmBrand.markPaths;
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=(t,a,b)=>{const x=clamp((t-a)/(b-a));return x*x*x*(10+x*(-15+6*x));};
  const mix=(a,b,k)=>a+(b-a)*k;
  // 首屏人物完整绘制后再下滚，后半段整体顺延130帧，保留原动作间隔。
  const endingShift=130/60;
  const timing=Object.fromEntries(Object.entries({returnAt:13.65,centerAt:16.65,burst:17.6333333333,form:18.1166666667,settled:19.0666666667,duration:21}).map(([key,t])=>[key,t+endingShift]));
  // 归位后的环绕从3秒缩为2秒；归位时点保持，随后片尾整体提前60帧。
  for(const key of ["centerAt","burst","form","settled","duration"]) timing[key]-=1;
  const BURST=timing.burst,FORM=timing.form,SETTLED=timing.settled;
  const color=(a,b,k)=>'#'+[1,3,5].map(j=>Math.round(mix(parseInt(a.slice(j,j+2),16),parseInt(b.slice(j,j+2),16),k)).toString(16).padStart(2,'0')).join('');
  const cubic=(a,b,c,d,k)=>{const u=1-k;return u*u*u*a+3*u*u*k*b+3*u*k*k*c+k*k*k*d;};
  function camera(t,center){const k=ease(t,timing.centerAt,BURST),s=mix(1,.86,k);return {scale:s,dx:(720-center.x*s)*k,dy:(450-center.y*s)*k,mask:mix(1900,190,ease(t,timing.centerAt,BURST))};}
  function create(view){
    const node=document.createElement('div');node.className='brand-closing';node.style.cssText='position:absolute;inset:0;z-index:58;pointer-events:none';
    node.innerHTML='<canvas class="name-particles" width="1440" height="1080" aria-label="烟花粒子组成夏夏的AI灵感" style="position:absolute;inset:0;width:1440px;height:1080px"></canvas><svg width="1440" height="1080" viewBox="0 0 1440 1080" style="position:absolute;inset:0;font-family:SiteCJK,Helvetica Neue,sans-serif"><text class="account-name" x="720" y="776" text-anchor="middle" font-size="96" font-weight="600" fill="'+C.ink+'">夏夏的AI灵感</text><g class="brand-seal" transform="translate(650 848) scale(.35)">'+paths.map((d,i)=>'<path d="'+d+'" fill="'+(i===0?C.red:C.ink)+'"/>').join('')+'</g><text class="closing-line" x="720" y="951" text-anchor="middle" font-size="23" letter-spacing="6" fill="'+C.soft+'">把灵感做成作品</text></svg>';
    view.root.appendChild(node);node.canvas=node.querySelector('canvas');node.ctx=node.canvas.getContext('2d');
    // 沿用共享库与particle-text-dissolve：字形只取样一次，随机表固定，寻帧不积累状态。
    const glyph=document.createElement('canvas');glyph.width=1440;glyph.height=1080;
    const g=glyph.getContext('2d',{willReadFrequently:true});g.font='600 96px SiteCJK,Helvetica Neue,sans-serif';g.textAlign='center';g.textBaseline='alphabetic';g.fillStyle='#fff';g.fillText('夏夏的AI灵感',720,776);
    const pixels=g.getImageData(0,0,1440,1080).data,points=[];let seed=0x9d1550f7;
    const rand=()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;};
    for(let y=665;y<800;y+=4)for(let x=350;x<1090;x+=4)if(pixels[(y*1440+x)*4+3]>128)points.push({x,y,j:rand(),angle:rand(),speed:rand(),delay:rand()*.105,size:rand()});
    node.points=points;node.canvas.dataset.particleCount=String(points.length);node.canvas.dataset.account='夏夏的AI灵感';return node;
  }
  function renderCursors(view,engine,t){
    const k=ease(t,BURST,BURST+.18),vanish=ease(t,BURST+.07,BURST+.24);
    engine.cursors.forEach((c,i)=>{
      const el=view.cursorEls.get(c.id);if(!el)return;
      if(t>=BURST+.24){el.style.opacity='0';return;}
      const svg=el.firstChild,p=svg.querySelector('path');el._introSVG=svg.innerHTML;
      if(!el._arrowPoints){const len=p.getTotalLength();el._arrowPoints=Array.from({length:64},(_,j)=>{const q=p.getPointAtLength(len*j/64);return [q.x,q.y];});}
      const d=el._arrowPoints.map(([x,y],j)=>{const a=-2.35+j*Math.PI*2/64,r=3.3+10.2*Math.pow(Math.abs(Math.cos(a*2)),9);return (j?'L':'M')+mix(x,5+Math.cos(a)*r,k).toFixed(3)+' '+mix(y,3.5+Math.sin(a)*r,k).toFixed(3);}).join('')+'Z';
      svg.innerHTML='<path d="'+d+'" fill="'+c.color+'" stroke="#fff" stroke-width="'+(1.5*(1-k))+'"/>';svg.style.overflow='visible';el.style.opacity=String(1-vanish);
    });
  }
  function render(node,t,cursors){
    const g=node.ctx;g.clearRect(0,0,1440,1080);
    const clean=ease(t,SETTLED-.32,SETTLED),logo=ease(t,SETTLED,SETTLED+.48);node.querySelector('.account-name').setAttribute('opacity',String(clean));node.canvas.style.opacity=String(1-clean);node.querySelector('.brand-seal').setAttribute('opacity',String(logo));node.querySelector('.closing-line').setAttribute('opacity',String(logo));
    node.canvas.dataset.formation=String(ease(t,FORM,SETTLED));
    if(t<BURST||!cursors?.length)return;
    g.save();g.beginPath();g.rect(0,0,1440,1080);g.moveTo(868,450);g.arc(720,450,148,0,Math.PI*2);g.clip('evenodd');
    for(let i=0;i<node.points.length;i++){
      const p=node.points[i],source=cursors[i%cursors.length],birth=BURST+p.delay,live=clamp((t-birth)/.12);if(live===0)continue;
      const a=Math.atan2(source.y-450,source.x-720)+(p.angle-.5)*2.35;
      const spread=1-Math.pow(1-clamp((t-birth)/.51),3),r=(56+p.speed*150)*spread;
      const burst={x:source.x+Math.cos(a)*r,y:source.y+Math.sin(a)*r+24*spread*spread};
      const target={x:p.x,y:p.y},k=ease(t,FORM+p.delay,SETTLED),side=source.x>=720?1:-1;
      const x=cubic(burst.x,burst.x+side*100,target.x+side*42,target.x,k),y=cubic(burst.y,burst.y+50,target.y-110,target.y,k);
      const settle=ease(t,FORM+.35,SETTLED);g.fillStyle=color(source.color,C.ink,settle);g.strokeStyle=g.fillStyle;g.globalAlpha=live*mix(.55+.45*p.j,1,settle);
      const size=mix(.85+p.size*1.25,2.18,settle);
      if(t<FORM+.05&&spread>.04){g.globalAlpha*=.36;g.lineWidth=size*.8;g.beginPath();g.moveTo(x-Math.cos(a)*mix(8,2,spread),y-Math.sin(a)*mix(8,2,spread));g.lineTo(x,y);g.stroke();g.globalAlpha=live*(.55+.45*p.j);}
      g.beginPath();g.arc(x,y,size,0,Math.PI*2);g.fill();
    }
    g.restore();
  }
  window.SwarmEnding={timing,create,render,renderCursors,camera,burstTime:BURST,settledAt:SETTLED};
})();

(() => {
  const root = document.querySelector('#sheet');
  const stage = document.querySelector('#stage');
  function fit(){root.style.transform='scale('+stage.clientWidth/1440+')';}
  new ResizeObserver(fit).observe(stage); fit();
  const colors=['#cf4b40','#4d799f','#d09b3b','#699270','#9b668f','#4e9990'];
  const view={root,cursorEls:new Map()};
  const cursors=Array.from({length:18},(_,i)=>{
    const el=document.createElement('div');el.className='pointer';
    const color=colors[i%colors.length];
    el.innerHTML='<svg width="34" height="42" viewBox="0 0 34 42" style="overflow:visible"><path d="M2 2L28 20l-12 2-5 13Z" fill="'+color+'" stroke="white" stroke-width="2"/></svg>';
    view.cursorEls.set(i,el);root.appendChild(el);return{id:i,color,x:0,y:0};
  });
  const ending=window.swarmMode==='signature';
  const action=ending?window.SwarmEnding:window.SwarmOpening;
  const node=action.create(view);
  const original=cursors.map(c=>view.cursorEls.get(c.id).firstChild.innerHTML);
  if(ending){
    const face=document.createElement('div');face.style.cssText='position:absolute;inset:340px auto auto 610px;width:220px;height:220px;border-radius:46%;background:#263f32;color:#f7f4ed;display:grid;place-items:center;font:bold 64px system-ui';face.textContent='◕ ◕';root.appendChild(face);
  }
  window.drawEffect=t=>{
    cursors.forEach((c,i)=>{
      const el=view.cursorEls.get(i),svg=el.firstChild;svg.innerHTML=original[i];svg.style.transform='';el.style.opacity='1';
      let pos;
      if(ending){const a=2*Math.PI*i/18+Math.min(t-18.55,.25)*.8;pos={x:720+230*Math.cos(a),y:450+205*Math.sin(a)};}
      else pos=action.introCursor(t,i,18);
      c.x=pos.x;c.y=pos.y;el.style.transform='translate('+c.x+'px,'+c.y+'px)';
    });
    if(ending){action.render(node,t,cursors);if(t>=action.burstTime)action.renderCursors(view,{cursors},t);}
    else{action.render(node,t,{},cursors);action.renderCursors(view,{cursors},t);}
  };
})();
