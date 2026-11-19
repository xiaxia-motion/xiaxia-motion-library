// 夏夏的AI灵感 · 球面木纹、大理石与行星扫换。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
// 离线兼容预览。把三维噪声烘成球面的经纬纹理，仍用局部 x 坐标连续扫换。
(() => {
  const T=window.THREE,canvas=document.querySelector('#stage canvas');
  const renderer=new T.WebGLRenderer({canvas,antialias:true,preserveDrawingBuffer:true});
  renderer.setSize(960,720,false);renderer.setClearColor(0x050912);renderer.outputColorSpace=T.SRGBColorSpace;
  const scene=new T.Scene(), cam=new T.PerspectiveCamera(36,4/3,.1,40);cam.position.set(.1,.18,3.6);cam.lookAt(0,0,0);
  const vertex='varying vec3 localPoint;varying vec3 surfaceNormal;void main(){localPoint=position;surfaceNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
  const fragment=[
    'varying vec3 localPoint;varying vec3 surfaceNormal;uniform float clock;',
    'float h(vec3 p){p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}',
    'float n(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z);}',
    'float fb(vec3 p){return .56*n(p)+.26*n(p*2.03)+.12*n(p*4.1)+.06*n(p*8.3);}',
    'void main(){vec3 p=localPoint;float noise=fb(p*3.9);float grain=.5+.5*sin((p.y*.73+p.x*.28+noise*.32)*59.);vec3 wood=mix(vec3(.18,.07,.027),vec3(.78,.49,.24),smoothstep(.08,.92,grain));',
    'float fissure=abs(sin(p.x*4.2+p.y*2.2+noise*10.5));vec3 marble=mix(vec3(.14,.21,.29),vec3(.82,.87,.9),smoothstep(.045,.21,fissure));marble*=.91+.13*fb(p*19.);',
    'float height=fb(p*2.9+vec3(1.1,3.,4.));vec3 ocean=mix(vec3(.055,.16,.29),vec3(.095,.48,.62),smoothstep(.25,.48,height));vec3 land=mix(vec3(.18,.33,.13),vec3(.55,.64,.33),smoothstep(.48,.69,height));vec3 planet=mix(ocean,land,smoothstep(.46,.485,height));planet=mix(planet,vec3(.86,.91,.91),smoothstep(.79,.98,abs(p.y)+.18*(noise-.5)));',
    'float first=mix(1.2,-1.2,smoothstep(21.85,22.55,clock)),second=mix(1.2,-1.2,smoothstep(23.25,23.95,clock));vec3 c=mix(mix(wood,marble,smoothstep(first-.06,first+.06,p.x)),planet,smoothstep(second-.06,second+.06,p.x));',
    'vec3 N=normalize(surfaceNormal),L=normalize(vec3(-.46,.68,.73));float light=.39+.74*max(0.,dot(N,L));float shine=pow(max(0.,dot(N,normalize(L+vec3(0,0,1)))),37.);gl_FragColor=vec4(c*light+vec3(.41)*shine,1.);}'
  ].join('\n');
  const material=new T.ShaderMaterial({vertexShader:vertex,fragmentShader:fragment,uniforms:{clock:{value:0}}});
  const sphere=new T.Mesh(new T.SphereGeometry(.88,96,64),material);scene.add(sphere);
  window.drawEffect=t=>{sphere.rotation.y=(t-19.8)*.35;material.uniforms.clock.value=t;renderer.render(scene,cam);};
})();
