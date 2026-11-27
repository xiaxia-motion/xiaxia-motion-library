// 浏览器展示同包 C++ 源码实际生成的帧。更新源码后运行 render.py。
const spec=window.atlasInfo, ctx=document.getElementById('frames').getContext('2d');
const sheets=Array.from({length:Math.ceil(spec.count/spec.block)},(_,i)=>{const img=new Image();img.src='atlas-'+i+'.webp';return img;});
window.effectReady=Promise.all(sheets.map(img=>img.decode())).then(()=>{
 window.drawEffect=t=>{const f=Math.min(spec.count-1,Math.max(0,Math.floor((t-(5.94))*spec.fps+.00001)));const i=f%spec.block;
 ctx.drawImage(sheets[Math.floor(f/spec.block)],i%spec.cols*spec.width,Math.floor(i/spec.cols)*spec.height,spec.width,spec.height,0,0,spec.width,spec.height);};});