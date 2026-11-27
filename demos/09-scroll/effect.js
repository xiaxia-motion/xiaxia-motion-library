// 夏夏的AI灵感 · 滚屏续绘与人物追视。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
// 仅绘制随包示例页面。相同时间输入会得到相同画面。
(() => {
  const canvas=document.querySelector('#stage canvas'), g=canvas.getContext('2d');
  const mode=window.swarmMode, tau=2*Math.PI;
  const paper='#f5f1e7', ink='#24392e', red='#b94d3a';
  const colors=['#ba4e38','#49899b','#c69640','#5f895e','#985a87','#397b7b'];
  const clamp=x=>Math.max(0,Math.min(1,x));
  function step(t,a,b){const x=clamp((t-a)/(b-a));return x*x*(3-2*x);}
  const lerp=(a,b,u)=>a+(b-a)*u;
  function box(x,y,w,h,color,r=0){g.fillStyle=color;g.beginPath();g.roundRect(x,y,w,h,r);g.fill();}
  function line(points,color,width=2,dash=[]){g.beginPath();g.strokeStyle=color;g.lineWidth=width;g.setLineDash(dash);points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.setLineDash([]);}
  function label(s,x,y,size,color=ink){g.fillStyle=color;g.font='600 '+size+'px system-ui,sans-serif';g.fillText(s,x,y);}
  function cursor(x,y,i){g.save();g.translate(x,y);g.beginPath();g.moveTo(0,0);g.lineTo(22,15);g.lineTo(13,18);g.lineTo(9,27);g.closePath();g.fillStyle=colors[i%colors.length];g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();g.restore();}
  function head(){box(0,0,960,720,paper);line([[62,115],[898,115]],ink);label('纸上工作室',62,86,30);label('MOTION STUDIES',693,83,17);}
  function illustration(x,y,w,h,q=1){g.save();g.beginPath();g.rect(x,y,w*q,h);g.clip();box(x,y,w,h,'#d3dbce',8);g.fillStyle='#c08651';g.beginPath();g.arc(x+w*.68,y+h*.33,h*.16,0,tau);g.fill();g.fillStyle='#6a8470';g.beginPath();g.moveTo(x,y+h);g.lineTo(x+w*.36,y+h*.35);g.lineTo(x+w*.57,y+h*.68);g.lineTo(x+w*.77,y+h*.45);g.lineTo(x+w,y+h);g.fill();g.restore();}
  function avatar(x,y,lookX,lookY){box(x-69,y-65,138,135,ink,52);for(const dx of [-27,27]){g.fillStyle=paper;g.beginPath();g.ellipse(x+dx,y,19,27,0,0,tau);g.fill();const a=Math.atan2(lookY-y,lookX-x-dx);g.fillStyle=ink;g.beginPath();g.arc(x+dx+7*Math.cos(a),y+8*Math.sin(a),8,0,tau);g.fill();}}
  function outline(x,y,w,h,p){const corners=[[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]];let left=p*(2*w+2*h),tip=corners[0],pts=[tip];for(let i=1;i<corners.length;i++){const n=corners[i],len=Math.hypot(n[0]-tip[0],n[1]-tip[1]),u=clamp(left/len);tip=[lerp(tip[0],n[0],u),lerp(tip[1],n[1],u)];pts.push(tip);left-=len;if(left<=0)break;}line(pts,ink,2.5);return tip;}
  function draw(t){const pointers=[];for(let i=0;i<6;i++){
    const x=62+(i%3)*287,y=159+Math.floor(i/3)*239,p=step(t,.16+i*.17,2.2+i*.14);
    const [cx,cy]=outline(x,y,259,207,p);pointers.push([cx,cy,i]);const img=step(t,.64+i*.16,3.08+i*.08);illustration(x+14,y+13,231,120,img);pointers.push([x+14+231*img,y+68,i+6]);
    const title=['庭院微光','日落之后','山谷来信','雾中的树','沿岸散步','风经过时'][i],n=step(t,.86+i*.15,3.64+i*.11);const visible=title.slice(0,Math.ceil(n*title.length));label(visible,x+16,y+171,24);pointers.push([x+20+g.measureText(visible).width,y+175,i+12]);}pointers.forEach(v=>cursor(...v));}
  function tile(x,y){box(x,y,174,187,'#fffaf0',9);illustration(x+10,y+10,154,105);label('山野手记',x+15,y+152,23);}
  function snap(t){const y=262,x=100,p=step(t,.55,1.72),q=step(t,2.45,3.70);tile(x,y);if(t>.5)tile(lerp(x,x+285,p),y+Math.sin(p*Math.PI)*22);if(t>2.4)tile(lerp(x+285,x+570,q),y-Math.sin(q*Math.PI)*16);const pos=t<2.38?lerp(x,x+285,p):lerp(x+285,x+570,q);if((p>.65&&t<2.2)||q>.68){line([[70,y],[888,y]],'#d55491',1.5,[7,6]);line([[pos,y-54],[pos,y+225]],'#d55491',1.5,[7,6]);label('111 px',pos-96,y-13,16,'#b24379');}cursor(pos+40,y+24,0);label('⌥  拖动复制',103,553,21);}
  function scroll(t){const dy=320*step(t,1.5,3.7),cx=lerp(780,245,step(t,2.6,4.5)),cy=lerp(262,510,step(t,1,3.9));g.save();g.beginPath();g.rect(60,125,840,535);g.clip();g.translate(0,-dy);illustration(74,145,810,246,step(t,0,1));label('沿着纸面往下看',105,444,38);for(let i=0;i<3;i++){const y=490+i*126;const v=step(t,.7+i*.7,2.25+i*.82);outline(100,y,742,105,v);label(['山谷与湖','旅行札记','下一次出发'][i].slice(0,Math.ceil(5*v)),132,y+65,27);}g.restore();avatar(754,550,cx,cy);cursor(cx,cy,1);cursor(cx-77,cy+29,3);}
  function regroup(t){avatar(480,350,475+140*Math.cos(t),330+100*Math.sin(t));for(let i=0;i<18;i++){const a=i*tau/18+Math.max(0,t-1.35)*.86,u=step(t,.08+(i%3)*.06,1.46);const x=lerp(90+(i*173)%790,480+208*Math.cos(a),u);const y=lerp(149+(i*127)%430,349+170*Math.sin(a),u);cursor(x,y,i);}}
  window.drawEffect=t=>{head();({draw,snap,scroll,regroup})[mode](t);};
})();
