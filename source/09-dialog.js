// 夏夏的AI灵感 · 对话浮入与自动确认。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
/* 沿用账号四式粒子与HUD落款的原日出山形，不重新设计Logo。 */
window.SwarmBrand={"markPaths": ["M146 106 A62 62 0 1 1 270 106 C246 111 226 108 203 97 C188 89 179 87 169 95 Z", "M23 143 C62 139 91 123 127 104 C154 88 168 76 183 78 C197 80 207 92 226 99 C264 114 321 113 375 98 C344 120 291 135 247 127 C214 123 194 106 177 103 C162 100 144 111 124 119 C88 136 57 146 23 147 Z", "M68 158 C104 147 142 139 177 137 C209 135 240 147 272 148 C299 149 329 142 348 133 C329 150 300 159 265 161 C227 162 200 151 171 149 C138 148 100 154 68 161 Z"], "palette": {"ink": "#233728", "red": "#bd302b", "paper": "#f6f2e9", "soft": "#7b8475"}};

/* 自动点击确认：按钮点燃烟花，同一批火花变形成绘制用的真实指针。 */
(() => {
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=(t,a,b)=>{const x=clamp((t-a)/(b-a));return x*x*x*(10+x*(-15+6*x));};
  const out=(t,a,b)=>1-Math.pow(1-clamp((t-a)/(b-a)),3);
  const mix=(a,b,k)=>a+(b-a)*k,point=(x,y)=>'translate('+x+' '+y+')';
  const C=window.SwarmBrand.palette;
  const textStyle='font-family:SiteCJK,Helvetica Neue,sans-serif';
  const attr=(el,props)=>{for(const [k,v] of Object.entries(props))el.setAttribute(k,String(v));};
  const rectPath=(x,y,w,h,r)=>'M'+(x+r)+' '+y+'H'+(x+w-r)+'Q'+(x+w)+' '+y+' '+(x+w)+' '+(y+r)+'V'+(y+h-r)+'Q'+(x+w)+' '+(y+h)+' '+(x+w-r)+' '+(y+h)+'H'+(x+r)+'Q'+x+' '+(y+h)+' '+x+' '+(y+h-r)+'V'+(y+r)+'Q'+x+' '+y+' '+(x+r)+' '+y+'Z';
  const button={x:736,y:658,w:216,h:78,cx:844,cy:697};
  const starts=[[747,669],[790,658],[898,658],[941,669],[952,697],[941,725],[898,736],[790,736],[747,725],[736,697]];
  const ink=[C.red,'#c99231',C.ink,'#b45f43'];
  const color=(a,b,k)=>'#'+[1,3,5].map(j=>Math.round(mix(parseInt(a.slice(j,j+2),16),parseInt(b.slice(j,j+2),16),k)).toString(16).padStart(2,'0')).join('');
  const cubic=(a,b,c,d,k)=>{const u=1-k;return u*u*u*a+3*u*u*k*b+3*u*k*k*c+k*k*k*d;};
  function flight(t,i,count){
    const origin=starts[i%starts.length],birth=2.8666666667+(i%6)*.018;
    const a=-Math.PI*.95+(i/(count-1))*Math.PI*1.9;
    const target={x:220+((i*.61803398875)%1)*1000,y:150+((i*.41421356237)%1)*710};
    const bloom={x:origin[0]+Math.sin(a)*(205+(i%3)*48),y:origin[1]-Math.cos(a)*(170+(i%4)*31)-78};
    const launch=out(t,birth,3.46+(i%3)*.03);
    let x=mix(origin[0],bloom.x,launch),y=mix(origin[1],bloom.y,launch);
    const settle=ease(t,3.46+(i%3)*.03,4.8),side=(i%2?1:-1);
    if(settle>0){x=cubic(bloom.x,bloom.x+side*95,target.x+side*65,target.x,settle);y=cubic(bloom.y,bloom.y-100,target.y-125,target.y,settle);}
    return {x,y,birth,morph:ease(t,3.3333333333+(i%4)*.02,3.8333333333+(i%4)*.02),opacity:out(t,birth,birth+.07),size:mix(1.55,1,ease(t,3.7,4.8)),angle:mix(a*180/Math.PI,0,ease(t,3.2,4.7))};
  }
  const markup=`<svg width="1440" height="1080" viewBox="0 0 1440 1080" style="${textStyle}">
  <defs>
    <pattern id="opening-paper" width="1440" height="1080" patternUnits="userSpaceOnUse"><image href="assets/account-paper.png" width="1440" height="1080" preserveAspectRatio="none"/></pattern>
    <filter id="dialog-lift" x="-40%" y="-60%" width="180%" height="240%"><feDropShadow dx="0" dy="18" stdDeviation="23" flood-color="#233728" flood-opacity=".12"/></filter>
    <clipPath id="dialog-cut"><path class="window-clip"/></clipPath>
    <mask id="opening-bloom" maskUnits="userSpaceOnUse" x="-10" y="-10" width="1460" height="1100"><rect x="-10" y="-10" width="1460" height="1100" fill="white"/><circle class="bloom-hole" cx="844" cy="697" r="0" fill="black"/></mask>
  </defs>
  <g class="opening-scene" mask="url(#opening-bloom)">
    <rect x="-10" y="-10" width="1460" height="1100" fill="url(#opening-paper)"/>
    <g class="dialog-entry">
      <path class="surface-shadow" fill="#fcfaf3" filter="url(#dialog-lift)"/><path class="surface" fill="#fcfaf3" stroke="#d1caba" stroke-width="1.6"/>
      <g clip-path="url(#dialog-cut)"><g class="dialog-content">
        <g class="dialog-bar"><circle cx="204" cy="292" r="6" fill="${C.red}"/><text x="224" y="302" fill="${C.ink}" font-size="26" font-weight="600">Agent</text><path d="M160 326H1280" stroke="#ded8cb" stroke-width="1.4"/></g>
        <g class="human"><rect x="771" y="357" width="449" height="92" rx="24" fill="#e8ebdf"/><text x="996" y="419" text-anchor="middle" font-size="43" font-weight="500" fill="${C.ink}">帮我做一个网站</text></g>
        <g class="reply"><rect x="215" y="482" width="920" height="112" rx="24" fill="${C.ink}"/><text x="250" y="554" font-size="41" font-weight="500" fill="${C.paper}">收到，是否启动 Agent 集群</text></g>
      </g></g>
    </g>
  </g>
  <g class="confirm-panel"><rect x="450" y="626" width="540" height="142" rx="24" fill="#fcfaf3" stroke="#d1caba" stroke-width="1.6" filter="url(#dialog-lift)"/></g>
  <g class="cancel-visual"><rect x="488" y="658" width="216" height="78" rx="18" fill="#eeeade" stroke="#c6cabb" stroke-width="1.5"/><text x="596" y="708" text-anchor="middle" font-size="34" font-weight="600" fill="${C.ink}">取消</text></g>
  <g class="confirm-visual"><rect class="confirm-shape" x="736" y="658" width="216" height="78" rx="18" fill="${C.red}"/><text class="confirm-label" x="844" y="708" text-anchor="middle" font-size="34" font-weight="600" fill="#fffaf0">确认</text></g>
  <g class="auto-click-ring" fill="none" stroke="#bd302b" stroke-width="2"><circle cx="844" cy="697" r="12"/></g>
  <g class="auto-click-pointer"><path d="M0 0L0 27L7 21L13 32L18 29L12 19L24 18Z" fill="${C.ink}" stroke="#fffaf0" stroke-width="2.3" stroke-linejoin="round"/></g>
  <g class="burst-rays" stroke-linecap="round"></g><g class="cursor-trails" fill="none" stroke-linecap="round"></g>
  </svg>`;
  const camera=()=>({scale:1,dx:0,dy:0});
  window.SwarmOpening={
    clickTime:2.75,
    create(view){
      const node=document.createElement('div');node.className='opening';
      node.style.cssText='position:absolute;inset:0;z-index:50;pointer-events:none;overflow:hidden';
      node.innerHTML=markup;view.root.appendChild(node);
      node.parts=Object.fromEntries([...node.querySelectorAll('[class]')].map(el=>[el.getAttribute('class'),el]));
      node.parts['burst-rays'].innerHTML=Array.from({length:72},(_,i)=>'<path stroke="'+ink[i%ink.length]+'" stroke-width="'+(i%3===0?2.6:1.6)+'"/>').join('');
      node.parts['cursor-trails'].innerHTML=Array.from({length:18},()=>'<path stroke-width="2.2"/>').join('');
      
      return node;
    },
    camera,entryCamera:()=>({scale:1,dx:0,dy:0}),
    introCursor:flight,
    engineSeed:(i,count)=>({x:720+(i-(count-1)/2)*27,y:853+Math.sin(i*.78)*24}),
    // 每次让原引擎先更新指针，再在同一个SVG内变形；不另造一批假指针替换。
    restoreCursors(view){for(const el of view.cursorEls.values()){if(el._introSVG!==undefined){el.firstChild.innerHTML=el._introSVG;delete el._introSVG;}el.firstChild.style.overflow='';el.style.opacity='1';el.style.translate='0px 0px';}},
    renderCursors(view,engine,t){
      
      if(t>=4.8){
        if(t<5.25){const k=1-ease(t,4.8,5.25);engine.cursors.forEach((c,i)=>{const el=view.cursorEls.get(c.id),a=flight(4.8,i,engine.cursors.length),b=this.engineSeed(i,engine.cursors.length);el.style.translate=(a.x-b.x)*k+'px '+(a.y-b.y)*k+'px';});}
        return;
      }
      engine.cursors.forEach((c,i)=>{
        const el=view.cursorEls.get(c.id),svg=el.firstChild,q=flight(t,i,engine.cursors.length);
        el._introSVG=svg.innerHTML;
        if(!el._arrowPoints){const p=svg.querySelector('path'),len=p.getTotalLength();el._arrowPoints=Array.from({length:64},(_,j)=>{const a=p.getPointAtLength(len*j/64);return [a.x,a.y];});}
        const pts=el._arrowPoints.map(([x,y],j)=>{const a=-2.35+j*Math.PI*2/64,r=3.3+10.2*Math.pow(Math.abs(Math.cos(a*2)),9);return [mix(5+Math.cos(a)*r,x,q.morph),mix(3.5+Math.sin(a)*r,y,q.morph)];});
        const d=pts.map(([x,y],j)=>(j?'L':'M')+x.toFixed(3)+' '+y.toFixed(3)).join('')+'Z';
        svg.innerHTML='<path d="'+d+'" fill="'+color(ink[i%ink.length],c.color,q.morph)+'" stroke="#fff" stroke-width="'+(q.morph*1.5)+'" stroke-linejoin="round"/>';
        svg.style.overflow='visible';svg.style.transform='translate(-5px,-3.5px) rotate('+q.angle+'deg) scale('+q.size+')';el.style.opacity=String(q.opacity);
      });
    },
    render(node,t,style,cursors){
      const p=node.parts,hu=out(t,.7166666667,.9666666667),ai=out(t,1.6666666667,1.9166666667),modal=out(t,2.2,2.3833333333);
      const expansion=ease(t,4.2833333333,5.7333333333),cut=ease(t,3.8333333333,6.2);
      const surface=rectPath(mix(160,-30,expansion),mix(246,-30,expansion),mix(1120,1500,expansion),mix(588,1140,expansion),mix(28,0,expansion));
      attr(p.surface,{d:surface});attr(p['surface-shadow'],{d:surface,opacity:1-ease(t,4.7,5.5)});attr(p['window-clip'],{d:surface});
      // 首个落点对齐原曲0.365秒，随后按检测拍点接两句对话和双按钮。
      const arrival=out(t,0,.3666666667),settle=ease(t,.3666666667,.55),entryScale=mix(.86,1.014,arrival)-.014*settle;
      attr(p['dialog-entry'],{opacity:out(t,0,.13),transform:'translate(720 '+(540+64*(1-arrival))+') scale('+entryScale+') translate(-720 -540)'});
      attr(p['bloom-hole'],{r:Math.pow(cut,1.45)*1700});
      attr(p.human,{opacity:hu,transform:point(28*(1-hu),15*(1-hu))});attr(p.reply,{opacity:ai,transform:point(-28*(1-ai),15*(1-ai))});
      attr(p['dialog-content'],{transform:point(0,-68*expansion)});
      const condense=ease(t,2.86,3.44),scale=mix(.88,1,modal)*(1-condense);
      attr(p['confirm-panel'],{opacity:modal,transform:'translate(844 '+(697+18*(1-modal))+') scale('+scale+') translate(-844 -697)'});
      attr(p['cancel-visual'],{opacity:modal*(1-ease(t,2.8666666667,3.25)),transform:'translate(720 697) scale('+mix(.94,1,modal)+') translate(-720 -697)'});
      const push=ease(t,2.7,2.8)*(1-ease(t,2.8,2.94)),burn=ease(t,2.9,3.32),s=(1-.055*push)*(1-.3*burn);
      attr(p['confirm-visual'],{opacity:modal*(1-burn),transform:'translate(844 697) scale('+s+') translate(-844 -697)'});
      // 视频里的单个鼠标按音乐拍点完成确认，播放不等待真实点击。
      const travel=ease(t,2.2,2.7),pointerX=mix(1055,844,travel),pointerY=mix(870,697,travel);
      const clickScale=1-.16*push;
      attr(p['auto-click-pointer'],{opacity:out(t,2.2,2.32)*(1-ease(t,2.87,3.06)),transform:'translate('+pointerX+' '+pointerY+') scale('+clickScale+')'});
      attr(p['auto-click-ring'],{opacity:out(t,2.73,2.78)*(1-ease(t,2.8,3.08))});
      attr(p['auto-click-ring'].firstChild,{r:mix(9,42,ease(t,2.73,3.08))});
      [...p['burst-rays'].children].forEach((el,i)=>{
        const seed=starts[(i*3)%starts.length],a=i*2.39996,delay=2.8666666667+(i%7)*.014,u=clamp((t-delay)/.76),r=18+(86+(i%5)*13)*(1-Math.pow(1-u,3)),tail=(1-u)*(9+i%8);
        const x=seed[0]+Math.cos(a)*r,y=seed[1]+Math.sin(a)*r+42*u*u;
        attr(el,{d:'M'+x+' '+y+'l'+(-Math.cos(a)*tail)+' '+(-Math.sin(a)*tail),opacity:t<delay?0:Math.pow(1-u,1.8)});
      });
      [...p['cursor-trails'].children].forEach((el,i)=>{
        const q=flight(t,i,18),pts=Array.from({length:9},(_,j)=>flight(t-j*.014,i,18));
        attr(el,{d:pts.map((v,j)=>(j?'L':'M')+v.x+' '+v.y).join(''),stroke:ink[i%ink.length],opacity:q.opacity*.6*(1-ease(t,3.8,4.6))});
      });
      node.style.opacity=t>=6.4?'0':'1';
      
    }
  };
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
