// 夏夏的AI灵感 · 双面板聚合为深色收音机。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
/* 复用modal-morph的首尾几何插值：直接一分二、二合一、外壳直变，不设中间形状。 */
window.createDirectMorph=({camera,primary,boxes,styles})=>{
 const whiteControl=document.querySelector('.white-controls');
 const cs=getComputedStyle(whiteControl),controlStyle={background:cs.background,boxShadow:cs.boxShadow,border:cs.border};
 const secondary={node:whiteControl,box:{x:777,y:336,w:447,h:560,r:32},style:controlStyle,scene:0};
 const cards=primary.map((node,i)=>({node,box:boxes[i],style:styles[i],scene:i}));
 const root=document.createElement('div');root.className='direct-morph-layer';root.style.cssText='position:absolute;inset:0;z-index:8;pointer-events:none;opacity:0';camera.append(root);
 const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
 const lerp=(a,b,q)=>a+(b-a)*q,rect=(a,b,q)=>Object.fromEntries(['x','y','w','h','r'].map(k=>[k,lerp(a[k],b[k],q)]));
 const whole=c=>({card:c,cut:{...c.box},corners:[c.box.r,c.box.r,c.box.r,c.box.r]});
 function half(c,right){const b=c.box;return{card:c,cut:{...b,x:b.x+(right?b.w/2:0),w:b.w/2},corners:right?[0,b.r,b.r,0]:[b.r,0,0,b.r]};}
 function pairs(from,to){
  if(from===3&&to===0)return [[half(cards[3],false),whole(cards[0])],[half(cards[3],true),whole(secondary)]];
  if(from===0&&to===1)return [[whole(cards[0]),half(cards[1],false)],[whole(secondary),half(cards[1],true)]];
  return [[whole(cards[from]),whole(cards[to])]];
 }
 function sanitize(original){const clone=original.cloneNode(true);for(const el of [clone,...clone.querySelectorAll('*')]){const originalId=el.id;for(const name of el.getAttributeNames())if(name==='id'||name.startsWith('data-'))el.removeAttribute(name);el.removeAttribute('tabindex');if(originalId)el.dataset.morphId=originalId;}return clone;}
 function layer(part){
  const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;overflow:visible;border-radius:inherit;';
  const skin=document.createElement('div');skin.style.cssText='position:absolute;inset:0;border-radius:inherit;';skin.style.background=part.card.style.background;skin.style.border=part.card.style.border;
  const b=part.card.box,c=part.cut,offsetX=c.x-b.x,offsetY=c.y-b.y;
  skin.style.backgroundSize=`${b.w/c.w*100}% ${b.h/c.h*100}%`;skin.style.backgroundPosition=`${b.w===c.w?0:offsetX/(b.w-c.w)*100}% ${b.h===c.h?0:offsetY/(b.h-c.h)*100}%`;
  if(c.w<b.w)skin.style[offsetX===0?'borderRightWidth':'borderLeftWidth']='0px';
  const body=document.createElement('div');body.className=['scene-white','scene-dark','scene-metal','scene-blue','scene-wood','scene-calc','scene-fusion'][part.card.scene];body.style.cssText='position:absolute;inset:0;';const clone=sanitize(part.card.node);body.append(clone);if(c.w<b.w)body.style.clipPath='inset(-60px 0 -60px 0)';wrap.append(skin,body);
  const shadow=document.createElement('div');shadow.style.cssText='position:absolute;inset:0;border-radius:inherit;';const shadowPaint=document.createElement('div');shadowPaint.style.cssText='position:absolute;left:0;top:0;transform-origin:0 0';shadowPaint.style.boxShadow=part.card.style.boxShadow;shadow.append(shadowPaint);
  if(c.w<b.w)shadow.style.clipPath=offsetX===0?'inset(-120px 0 -120px -120px)':'inset(-120px -120px -120px 0)';
  const src=[part.card.node,...part.card.node.querySelectorAll('*')],dst=[clone,...clone.querySelectorAll('*')];
  function sync(pose){
   const sx=part.card===secondary?1:b.w/1000,sy=part.card===secondary?1:b.h/600,rx=pose.w/c.w,ry=pose.h/c.h;shadowPaint.style.width=b.w*rx/sx+'px';shadowPaint.style.height=b.h*ry/sy+'px';shadowPaint.style.transform=`translate(${-offsetX*rx}px,${-offsetY*ry}px) scale(${sx},${sy})`;shadowPaint.style.borderRadius=c.w<b.w?`${b.r*rx/sx}px / ${b.r*ry/sy}px`:pose.corners.map(r=>r/sx+'px').join(' ')+' / '+pose.corners.map(r=>r/sy+'px').join(' ');

   src.forEach((a,i)=>{const e=dst[i];if(i){e.style.cssText=a.style.cssText;e.setAttribute('class',a.getAttribute('class')||'');}
    for(const k of ['aria-pressed','aria-checked'])if(a.hasAttribute(k))e.setAttribute(k,a.getAttribute(k));
    if(!a.children.length&&a.textContent!==e.textContent)e.textContent=a.textContent;
   });
   clone.style.cssText=`position:absolute;left:0;top:0;width:${b.w}px;height:${b.h}px;transform-origin:0 0;transform:translate(${-offsetX*pose.w/c.w}px,${-offsetY*pose.h/c.h}px) scale(${pose.w/c.w},${pose.h/c.h});opacity:1;scale:1;translate:0 0;background:transparent;box-shadow:none;border-color:transparent;filter:none;`;
  }
  return {wrap,skin,body,shadow,sync};
 }
 const cloneRules=document.createElement('style');const copiedRules=[];
 for(const sheet of document.styleSheets){try{for(const rule of sheet.cssRules){if(rule.selectorText&&rule.selectorText.includes('#calc-'))copiedRules.push(rule.selectorText.replace(/#([A-Za-z][\w-]*)/g,'[data-morph-id="$1"]')+'{'+rule.style.cssText+'}');}}catch{}}cloneRules.textContent=copiedRules.join('\n');document.head.append(cloneRules);
 const cache=new Map();
 function make(from,to){const list=pairs(from,to).map(([a,b])=>{const el=document.createElement('div');el.className='direct-panel-piece';el.style.cssText='position:absolute;left:0;top:0;width:1000px;height:600px;transform-origin:0 0;pointer-events:none';const x=layer(a),y=layer(b);el.append(x.shadow,y.shadow,x.wrap,y.wrap);root.append(el);return{a,b,el,x,y};});cache.set(`${from}-${to}`,list);return list;}
 function sample(from,to,q){return pairs(from,to).map(([a,b])=>({...rect(a.cut,b.cut,q),corners:a.corners.map((v,i)=>lerp(v,b.corners[i],q)),source:a.cut,target:b.cut}));}
 function render(v){root.style.opacity=v.mode==='morph'?'1':'0';for(const list of cache.values())for(const p of list)p.el.style.opacity=0;if(v.mode!=='morph')return;
  const list=cache.get(`${v.from}-${v.to}`)||make(v.from,v.to),poses=sample(v.from,v.to,v.q);
  list.forEach((p,i)=>{const b=poses[i],corners=b.corners;p.el.style.opacity=1;const overlap=i===0&&list.length===2?(v.to===1?v.q:1-v.q)*1.25:0;p.el.style.width=(b.w+overlap)+'px';p.el.style.height=b.h+'px';p.el.style.transform=`translate(${b.x}px,${b.y}px)`;p.el.style.borderRadius=corners.map(r=>r+'px').join(' ');p.x.sync(b);p.y.sync(b);p.x.wrap.style.opacity=1;p.y.wrap.style.opacity=1;p.x.skin.style.opacity=1-smooth((v.q-.85)/.15);p.y.skin.style.opacity=v.q;p.x.body.style.opacity=1-smooth((v.q-.12)/.42);p.y.body.style.opacity=smooth((v.q-.40)/.48);p.x.shadow.style.opacity=1-v.q;p.y.shadow.style.opacity=v.q;});
 }
 return{render,sample,cards,secondary};
};

const stage=document.querySelector('#stage'),design=document.querySelector('#design');function fit(){design.style.transform='scale('+stage.clientWidth/1440+')'}new ResizeObserver(fit).observe(stage);fit();
 const selectors=['.white-player','.dark-radio','.metal-panel','.blue-panel','.wood-radio','.calculator','.fusion-board'];
 const boxes=[{x:200,y:290,w:480,h:650,r:43},{x:164,y:326,w:1112,h:572,r:37},{x:167,y:308,w:1106,h:608,r:29},{x:257.5,y:354,w:925,h:486,r:44},{x:154,y:332,w:1132,h:526,r:35},{x:458,y:284,w:524,h:665,r:39},{x:117,y:302,w:1206,h:620,r:35}];
 const primary=selectors.map(s=>document.querySelector(s));
 const styles=primary.map((p,i)=>{const c=getComputedStyle(i===4?p.querySelector('.wood-rim'):p);return{background:c.background,boxShadow:c.boxShadow,border:c.border};});
const camera=document.querySelector('#morph-camera');const morph=window.createDirectMorph({camera,primary,boxes,styles});const pairs=[[0, 1]];window.drawEffect=t=>{const i=Math.min(pairs.length-1,Math.floor(t/1.65)),local=t-i*1.65,v=Math.max(0,Math.min(1,(local-.14)/1.28)),q=v*v*(3-2*v);morph.render({mode:'morph',from:pairs[i][0],to:pairs[i][1],q});};