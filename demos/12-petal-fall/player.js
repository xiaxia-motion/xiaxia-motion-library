// 每个入口只挂载一个动效。拖动时暂停，可反复查看同一个动作。
(() => {
  const settings = window.effectSettings;
  const span = settings.end - settings.start;
  const play = document.querySelector('#play');
  const restart = document.querySelector('#restart');
  const scrub = document.querySelector('#scrub');
  const status = document.querySelector('#status');
  const clock = document.querySelector('#clock');
  let position = 0;
  let stamp = null;
  let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFrame = -1;
  function controls() { play.textContent = playing ? '暂停' : '播放'; }
  function draw() {
    const frame = Math.min(Math.ceil(span * settings.fps) - 1, Math.floor(position * settings.fps));
    if (lastFrame !== frame) window.drawEffect(settings.start + frame / settings.fps);
    lastFrame = frame;
    scrub.value = Math.round(position / span * 1000);
    clock.value = position.toFixed(2) + ' / ' + span.toFixed(2) + ' 秒';
  }
  function seek(time) {
    position = Math.min(span, Math.max(0, time));
    stamp = null;
    draw();
  }
  function tick(now) {
    if (playing && !document.hidden && stamp !== null) {
      position = (position + Math.min(.1,(now - stamp)/1000)*settings.speed) % span;
      draw();
    }
    stamp = document.hidden ? null : now;
    requestAnimationFrame(tick);
  }
  window.addEventListener('error', event => { status.textContent = '加载出错：' + event.message; });
  Promise.resolve(window.effectReady).then(() => {
    if (typeof window.drawEffect !== 'function') throw Error('找不到绘制入口，请完整解压下载包。');
    window.singleEffect = {seek, seconds:span, pause(){playing=false;controls()}, play(){playing=true;stamp=null;controls()}};
    play.onclick = () => { playing = !playing; stamp = null; controls(); };
    restart.onclick = () => { seek(0); playing = true; controls(); };
    scrub.oninput = () => { playing = false; controls(); seek(Number(scrub.value)/1000*span); };
    status.textContent=''; controls(); draw(); requestAnimationFrame(tick);
  }).catch(error => {status.textContent = '无法预览：'+error.message;});
})();
