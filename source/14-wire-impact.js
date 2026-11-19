// 夏夏的AI灵感 · 线球撞散二十个空心方块。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // shim3:three
  var require_three = __commonJS({
    "shim3:three"(exports, module) {
      module.exports = window.THREE;
    }
  });
  var THREE2 = __toESM(require_three(), 1);
  var import_three3 = __toESM(require_three());
  var CopyShader = {
    name: "CopyShader",
    uniforms: {
      "tDiffuse": { value: null },
      "opacity": { value: 1 }
    },
    vertexShader: (
      /* glsl */
      `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
    ),
    fragmentShader: (
      /* glsl */
      `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
    )
  };
  var import_three2 = __toESM(require_three(), 1);
  var import_three = __toESM(require_three(), 1);
  var Pass = class {
    /**
     * Constructs a new pass.
     */
    constructor() {
      this.isPass = true;
      this.enabled = true;
      this.needsSwap = true;
      this.clear = false;
      this.renderToScreen = false;
    }
    /**
     * Sets the size of the pass.
     *
     * @abstract
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize() {
    }
    /**
     * This method holds the render logic of a pass. It must be implemented in all derived classes.
     *
     * @abstract
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render() {
      console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the pass is no longer used in your app.
     *
     * @abstract
     */
    dispose() {
    }
  };
  var _camera = new import_three.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var FullscreenTriangleGeometry = class extends import_three.BufferGeometry {
    constructor() {
      super();
      this.setAttribute("position", new import_three.Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
      this.setAttribute("uv", new import_three.Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
    }
  };
  var _geometry = new FullscreenTriangleGeometry();
  var FullScreenQuad = class {
    /**
     * Constructs a new full screen quad.
     *
     * @param {?Material} material - The material to render te full screen quad with.
     */
    constructor(material) {
      this._mesh = new import_three.Mesh(_geometry, material);
    }
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the instance is no longer used in your app.
     */
    dispose() {
      this._mesh.geometry.dispose();
    }
    /**
     * Renders the full screen quad.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     */
    render(renderer) {
      renderer.render(this._mesh, _camera);
    }
    /**
     * The quad's material.
     *
     * @type {?Material}
     */
    get material() {
      return this._mesh.material;
    }
    set material(value) {
      this._mesh.material = value;
    }
  };
  var ShaderPass = class extends Pass {
    /**
     * Constructs a new shader pass.
     *
     * @param {Object|ShaderMaterial} [shader] - A shader object holding vertex and fragment shader as well as
     * defines and uniforms. It's also valid to pass a custom shader material.
     * @param {string} [textureID='tDiffuse'] - The name of the texture uniform that should sample
     * the read buffer.
     */
    constructor(shader, textureID = "tDiffuse") {
      super();
      this.textureID = textureID;
      this.uniforms = null;
      this.material = null;
      if (shader instanceof import_three2.ShaderMaterial) {
        this.uniforms = shader.uniforms;
        this.material = shader;
      } else if (shader) {
        this.uniforms = import_three2.UniformsUtils.clone(shader.uniforms);
        this.material = new import_three2.ShaderMaterial({
          name: shader.name !== void 0 ? shader.name : "unspecified",
          defines: Object.assign({}, shader.defines),
          uniforms: this.uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader
        });
      }
      this._fsQuad = new FullScreenQuad(this.material);
    }
    /**
     * Performs the shader pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer, writeBuffer, readBuffer) {
      if (this.uniforms[this.textureID]) {
        this.uniforms[this.textureID].value = readBuffer.texture;
      }
      this._fsQuad.material = this.material;
      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
        this._fsQuad.render(renderer);
      } else {
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        this._fsQuad.render(renderer);
      }
    }
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the pass is no longer used in your app.
     */
    dispose() {
      this.material.dispose();
      this._fsQuad.dispose();
    }
  };
  var MaskPass = class extends Pass {
    /**
     * Constructs a new mask pass.
     *
     * @param {Scene} scene - The 3D objects in this scene will define the mask.
     * @param {Camera} camera - The camera.
     */
    constructor(scene, camera) {
      super();
      this.scene = scene;
      this.camera = camera;
      this.clear = true;
      this.needsSwap = false;
      this.inverse = false;
    }
    /**
     * Performs a mask pass with the configured scene and camera.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer, writeBuffer, readBuffer) {
      const context = renderer.getContext();
      const state = renderer.state;
      state.buffers.color.setMask(false);
      state.buffers.depth.setMask(false);
      state.buffers.color.setLocked(true);
      state.buffers.depth.setLocked(true);
      let writeValue, clearValue;
      if (this.inverse) {
        writeValue = 0;
        clearValue = 1;
      } else {
        writeValue = 1;
        clearValue = 0;
      }
      state.buffers.stencil.setTest(true);
      state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
      state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 4294967295);
      state.buffers.stencil.setClear(clearValue);
      state.buffers.stencil.setLocked(true);
      renderer.setRenderTarget(readBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
      state.buffers.color.setLocked(false);
      state.buffers.depth.setLocked(false);
      state.buffers.color.setMask(true);
      state.buffers.depth.setMask(true);
      state.buffers.stencil.setLocked(false);
      state.buffers.stencil.setFunc(context.EQUAL, 1, 4294967295);
      state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
      state.buffers.stencil.setLocked(true);
    }
  };
  var ClearMaskPass = class extends Pass {
    /**
     * Constructs a new clear mask pass.
     */
    constructor() {
      super();
      this.needsSwap = false;
    }
    /**
     * Performs the clear of the currently defined mask.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer) {
      renderer.state.buffers.stencil.setLocked(false);
      renderer.state.buffers.stencil.setTest(false);
    }
  };
  var EffectComposer = class {
    /**
     * Constructs a new effect composer.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} [renderTarget] - This render target and a clone will
     * be used as the internal read and write buffers. If not given, the composer creates
     * the buffers automatically.
     */
    constructor(renderer, renderTarget) {
      this.renderer = renderer;
      this._pixelRatio = renderer.getPixelRatio();
      if (renderTarget === void 0) {
        const size = renderer.getSize(new import_three3.Vector2());
        this._width = size.width;
        this._height = size.height;
        renderTarget = new import_three3.WebGLRenderTarget(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: import_three3.HalfFloatType });
        renderTarget.texture.name = "EffectComposer.rt1";
      } else {
        this._width = renderTarget.width;
        this._height = renderTarget.height;
      }
      this.renderTarget1 = renderTarget;
      this.renderTarget2 = renderTarget.clone();
      this.renderTarget2.texture.name = "EffectComposer.rt2";
      this.writeBuffer = this.renderTarget1;
      this.readBuffer = this.renderTarget2;
      this.renderToScreen = true;
      this.passes = [];
      this.copyPass = new ShaderPass(CopyShader);
      this.copyPass.material.blending = import_three3.NoBlending;
      this.clock = new import_three3.Clock();
    }
    /**
     * Swaps the internal read/write buffers.
     */
    swapBuffers() {
      const tmp = this.readBuffer;
      this.readBuffer = this.writeBuffer;
      this.writeBuffer = tmp;
    }
    /**
     * Adds the given pass to the pass chain.
     *
     * @param {Pass} pass - The pass to add.
     */
    addPass(pass) {
      this.passes.push(pass);
      pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    /**
     * Inserts the given pass at a given index.
     *
     * @param {Pass} pass - The pass to insert.
     * @param {number} index - The index into the pass chain.
     */
    insertPass(pass, index) {
      this.passes.splice(index, 0, pass);
      pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    /**
     * Removes the given pass from the pass chain.
     *
     * @param {Pass} pass - The pass to remove.
     */
    removePass(pass) {
      const index = this.passes.indexOf(pass);
      if (index !== -1) {
        this.passes.splice(index, 1);
      }
    }
    /**
     * Returns `true` if the pass for the given index is the last enabled pass in the pass chain.
     *
     * @param {number} passIndex - The pass index.
     * @return {boolean} Whether the pass for the given index is the last pass in the pass chain.
     */
    isLastEnabledPass(passIndex) {
      for (let i = passIndex + 1; i < this.passes.length; i++) {
        if (this.passes[i].enabled) {
          return false;
        }
      }
      return true;
    }
    /**
     * Executes all enabled post-processing passes in order to produce the final frame.
     *
     * @param {number} deltaTime - The delta time in seconds. If not given, the composer computes
     * its own time delta value.
     */
    render(deltaTime) {
      if (deltaTime === void 0) {
        deltaTime = this.clock.getDelta();
      }
      const currentRenderTarget = this.renderer.getRenderTarget();
      let maskActive = false;
      for (let i = 0, il = this.passes.length; i < il; i++) {
        const pass = this.passes[i];
        if (pass.enabled === false) continue;
        pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
        pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);
        if (pass.needsSwap) {
          if (maskActive) {
            const context = this.renderer.getContext();
            const stencil = this.renderer.state.buffers.stencil;
            stencil.setFunc(context.NOTEQUAL, 1, 4294967295);
            this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
            stencil.setFunc(context.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        if (MaskPass !== void 0) {
          if (pass instanceof MaskPass) {
            maskActive = true;
          } else if (pass instanceof ClearMaskPass) {
            maskActive = false;
          }
        }
      }
      this.renderer.setRenderTarget(currentRenderTarget);
    }
    /**
     * Resets the internal state of the EffectComposer.
     *
     * @param {WebGLRenderTarget} [renderTarget] - This render target has the same purpose like
     * the one from the constructor. If set, it is used to setup the read and write buffers.
     */
    reset(renderTarget) {
      if (renderTarget === void 0) {
        const size = this.renderer.getSize(new import_three3.Vector2());
        this._pixelRatio = this.renderer.getPixelRatio();
        this._width = size.width;
        this._height = size.height;
        renderTarget = this.renderTarget1.clone();
        renderTarget.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
      }
      this.renderTarget1.dispose();
      this.renderTarget2.dispose();
      this.renderTarget1 = renderTarget;
      this.renderTarget2 = renderTarget.clone();
      this.writeBuffer = this.renderTarget1;
      this.readBuffer = this.renderTarget2;
    }
    /**
     * Resizes the internal read and write buffers as well as all passes. Similar to {@link WebGLRenderer#setSize},
     * this method honors the current pixel ration.
     *
     * @param {number} width - The width in logical pixels.
     * @param {number} height - The height in logical pixels.
     */
    setSize(width, height) {
      this._width = width;
      this._height = height;
      const effectiveWidth = this._width * this._pixelRatio;
      const effectiveHeight = this._height * this._pixelRatio;
      this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
      this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
      for (let i = 0; i < this.passes.length; i++) {
        this.passes[i].setSize(effectiveWidth, effectiveHeight);
      }
    }
    /**
     * Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output.
     * Setting the pixel ratio will automatically resize the composer.
     *
     * @param {number} pixelRatio - The pixel ratio to set.
     */
    setPixelRatio(pixelRatio) {
      this._pixelRatio = pixelRatio;
      this.setSize(this._width, this._height);
    }
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the composer is no longer used in your app.
     */
    dispose() {
      this.renderTarget1.dispose();
      this.renderTarget2.dispose();
      this.copyPass.dispose();
    }
  };
  var import_three4 = __toESM(require_three());
  var RenderPass = class extends Pass {
    /**
     * Constructs a new render pass.
     *
     * @param {Scene} scene - The scene to render.
     * @param {Camera} camera - The camera.
     * @param {?Material} [overrideMaterial=null] - The override material. If set, this material is used
     * for all objects in the scene.
     * @param {?(number|Color|string)} [clearColor=null] - The clear color of the render pass.
     * @param {?number} [clearAlpha=null] - The clear alpha of the render pass.
     */
    constructor(scene, camera, overrideMaterial = null, clearColor = null, clearAlpha = null) {
      super();
      this.scene = scene;
      this.camera = camera;
      this.overrideMaterial = overrideMaterial;
      this.clearColor = clearColor;
      this.clearAlpha = clearAlpha;
      this.clear = true;
      this.clearDepth = false;
      this.needsSwap = false;
      this._oldClearColor = new import_three4.Color();
    }
    /**
     * Performs a beauty pass with the configured scene and camera.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer, writeBuffer, readBuffer) {
      const oldAutoClear = renderer.autoClear;
      renderer.autoClear = false;
      let oldClearAlpha, oldOverrideMaterial;
      if (this.overrideMaterial !== null) {
        oldOverrideMaterial = this.scene.overrideMaterial;
        this.scene.overrideMaterial = this.overrideMaterial;
      }
      if (this.clearColor !== null) {
        renderer.getClearColor(this._oldClearColor);
        renderer.setClearColor(this.clearColor, renderer.getClearAlpha());
      }
      if (this.clearAlpha !== null) {
        oldClearAlpha = renderer.getClearAlpha();
        renderer.setClearAlpha(this.clearAlpha);
      }
      if (this.clearDepth == true) {
        renderer.clearDepth();
      }
      renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
      if (this.clear === true) {
        renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
      }
      renderer.render(this.scene, this.camera);
      if (this.clearColor !== null) {
        renderer.setClearColor(this._oldClearColor);
      }
      if (this.clearAlpha !== null) {
        renderer.setClearAlpha(oldClearAlpha);
      }
      if (this.overrideMaterial !== null) {
        this.scene.overrideMaterial = oldOverrideMaterial;
      }
      renderer.autoClear = oldAutoClear;
    }
  };
  var import_three6 = __toESM(require_three());
  var import_three5 = __toESM(require_three(), 1);
  var LuminosityHighPassShader = {
    name: "LuminosityHighPassShader",
    uniforms: {
      "tDiffuse": { value: null },
      "luminosityThreshold": { value: 1 },
      "smoothWidth": { value: 1 },
      "defaultColor": { value: new import_three5.Color(0) },
      "defaultOpacity": { value: 0 }
    },
    vertexShader: (
      /* glsl */
      `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
    ),
    fragmentShader: (
      /* glsl */
      `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
    )
  };
  var UnrealBloomPass = class _UnrealBloomPass extends Pass {
    /**
     * Constructs a new Unreal Bloom pass.
     *
     * @param {Vector2} [resolution] - The effect's resolution.
     * @param {number} [strength=1] - The Bloom strength.
     * @param {number} radius - The Bloom radius.
     * @param {number} threshold - The luminance threshold limits which bright areas contribute to the Bloom effect.
     */
    constructor(resolution, strength = 1, radius, threshold) {
      super();
      this.strength = strength;
      this.radius = radius;
      this.threshold = threshold;
      this.resolution = resolution !== void 0 ? new import_three6.Vector2(resolution.x, resolution.y) : new import_three6.Vector2(256, 256);
      this.clearColor = new import_three6.Color(0, 0, 0);
      this.needsSwap = false;
      this.renderTargetsHorizontal = [];
      this.renderTargetsVertical = [];
      this.nMips = 5;
      let resx = Math.round(this.resolution.x / 2);
      let resy = Math.round(this.resolution.y / 2);
      this.renderTargetBright = new import_three6.WebGLRenderTarget(resx, resy, { type: import_three6.HalfFloatType });
      this.renderTargetBright.texture.name = "UnrealBloomPass.bright";
      this.renderTargetBright.texture.generateMipmaps = false;
      for (let i = 0; i < this.nMips; i++) {
        const renderTargetHorizontal = new import_three6.WebGLRenderTarget(resx, resy, { type: import_three6.HalfFloatType });
        renderTargetHorizontal.texture.name = "UnrealBloomPass.h" + i;
        renderTargetHorizontal.texture.generateMipmaps = false;
        this.renderTargetsHorizontal.push(renderTargetHorizontal);
        const renderTargetVertical = new import_three6.WebGLRenderTarget(resx, resy, { type: import_three6.HalfFloatType });
        renderTargetVertical.texture.name = "UnrealBloomPass.v" + i;
        renderTargetVertical.texture.generateMipmaps = false;
        this.renderTargetsVertical.push(renderTargetVertical);
        resx = Math.round(resx / 2);
        resy = Math.round(resy / 2);
      }
      const highPassShader = LuminosityHighPassShader;
      this.highPassUniforms = import_three6.UniformsUtils.clone(highPassShader.uniforms);
      this.highPassUniforms["luminosityThreshold"].value = threshold;
      this.highPassUniforms["smoothWidth"].value = 0.01;
      this.materialHighPassFilter = new import_three6.ShaderMaterial({
        uniforms: this.highPassUniforms,
        vertexShader: highPassShader.vertexShader,
        fragmentShader: highPassShader.fragmentShader
      });
      this.separableBlurMaterials = [];
      const kernelSizeArray = [3, 5, 7, 9, 11];
      resx = Math.round(this.resolution.x / 2);
      resy = Math.round(this.resolution.y / 2);
      for (let i = 0; i < this.nMips; i++) {
        this.separableBlurMaterials.push(this._getSeparableBlurMaterial(kernelSizeArray[i]));
        this.separableBlurMaterials[i].uniforms["invSize"].value = new import_three6.Vector2(1 / resx, 1 / resy);
        resx = Math.round(resx / 2);
        resy = Math.round(resy / 2);
      }
      this.compositeMaterial = this._getCompositeMaterial(this.nMips);
      this.compositeMaterial.uniforms["blurTexture1"].value = this.renderTargetsVertical[0].texture;
      this.compositeMaterial.uniforms["blurTexture2"].value = this.renderTargetsVertical[1].texture;
      this.compositeMaterial.uniforms["blurTexture3"].value = this.renderTargetsVertical[2].texture;
      this.compositeMaterial.uniforms["blurTexture4"].value = this.renderTargetsVertical[3].texture;
      this.compositeMaterial.uniforms["blurTexture5"].value = this.renderTargetsVertical[4].texture;
      this.compositeMaterial.uniforms["bloomStrength"].value = strength;
      this.compositeMaterial.uniforms["bloomRadius"].value = 0.1;
      const bloomFactors = [1, 0.8, 0.6, 0.4, 0.2];
      this.compositeMaterial.uniforms["bloomFactors"].value = bloomFactors;
      this.bloomTintColors = [new import_three6.Vector3(1, 1, 1), new import_three6.Vector3(1, 1, 1), new import_three6.Vector3(1, 1, 1), new import_three6.Vector3(1, 1, 1), new import_three6.Vector3(1, 1, 1)];
      this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
      this.copyUniforms = import_three6.UniformsUtils.clone(CopyShader.uniforms);
      this.blendMaterial = new import_three6.ShaderMaterial({
        uniforms: this.copyUniforms,
        vertexShader: CopyShader.vertexShader,
        fragmentShader: CopyShader.fragmentShader,
        blending: import_three6.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true
      });
      this._oldClearColor = new import_three6.Color();
      this._oldClearAlpha = 1;
      this._basic = new import_three6.MeshBasicMaterial();
      this._fsQuad = new FullScreenQuad(null);
    }
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the pass is no longer used in your app.
     */
    dispose() {
      for (let i = 0; i < this.renderTargetsHorizontal.length; i++) {
        this.renderTargetsHorizontal[i].dispose();
      }
      for (let i = 0; i < this.renderTargetsVertical.length; i++) {
        this.renderTargetsVertical[i].dispose();
      }
      this.renderTargetBright.dispose();
      for (let i = 0; i < this.separableBlurMaterials.length; i++) {
        this.separableBlurMaterials[i].dispose();
      }
      this.compositeMaterial.dispose();
      this.blendMaterial.dispose();
      this._basic.dispose();
      this._fsQuad.dispose();
    }
    /**
     * Sets the size of the pass.
     *
     * @param {number} width - The width to set.
     * @param {number} height - The height to set.
     */
    setSize(width, height) {
      let resx = Math.round(width / 2);
      let resy = Math.round(height / 2);
      this.renderTargetBright.setSize(resx, resy);
      for (let i = 0; i < this.nMips; i++) {
        this.renderTargetsHorizontal[i].setSize(resx, resy);
        this.renderTargetsVertical[i].setSize(resx, resy);
        this.separableBlurMaterials[i].uniforms["invSize"].value = new import_three6.Vector2(1 / resx, 1 / resy);
        resx = Math.round(resx / 2);
        resy = Math.round(resy / 2);
      }
    }
    /**
     * Performs the Bloom pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
      renderer.getClearColor(this._oldClearColor);
      this._oldClearAlpha = renderer.getClearAlpha();
      const oldAutoClear = renderer.autoClear;
      renderer.autoClear = false;
      renderer.setClearColor(this.clearColor, 0);
      if (maskActive) renderer.state.buffers.stencil.setTest(false);
      if (this.renderToScreen) {
        this._fsQuad.material = this._basic;
        this._basic.map = readBuffer.texture;
        renderer.setRenderTarget(null);
        renderer.clear();
        this._fsQuad.render(renderer);
      }
      this.highPassUniforms["tDiffuse"].value = readBuffer.texture;
      this.highPassUniforms["luminosityThreshold"].value = this.threshold;
      this._fsQuad.material = this.materialHighPassFilter;
      renderer.setRenderTarget(this.renderTargetBright);
      renderer.clear();
      this._fsQuad.render(renderer);
      let inputRenderTarget = this.renderTargetBright;
      for (let i = 0; i < this.nMips; i++) {
        this._fsQuad.material = this.separableBlurMaterials[i];
        this.separableBlurMaterials[i].uniforms["colorTexture"].value = inputRenderTarget.texture;
        this.separableBlurMaterials[i].uniforms["direction"].value = _UnrealBloomPass.BlurDirectionX;
        renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
        renderer.clear();
        this._fsQuad.render(renderer);
        this.separableBlurMaterials[i].uniforms["colorTexture"].value = this.renderTargetsHorizontal[i].texture;
        this.separableBlurMaterials[i].uniforms["direction"].value = _UnrealBloomPass.BlurDirectionY;
        renderer.setRenderTarget(this.renderTargetsVertical[i]);
        renderer.clear();
        this._fsQuad.render(renderer);
        inputRenderTarget = this.renderTargetsVertical[i];
      }
      this._fsQuad.material = this.compositeMaterial;
      this.compositeMaterial.uniforms["bloomStrength"].value = this.strength;
      this.compositeMaterial.uniforms["bloomRadius"].value = this.radius;
      this.compositeMaterial.uniforms["bloomTintColors"].value = this.bloomTintColors;
      renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
      renderer.clear();
      this._fsQuad.render(renderer);
      this._fsQuad.material = this.blendMaterial;
      this.copyUniforms["tDiffuse"].value = this.renderTargetsHorizontal[0].texture;
      if (maskActive) renderer.state.buffers.stencil.setTest(true);
      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
        this._fsQuad.render(renderer);
      } else {
        renderer.setRenderTarget(readBuffer);
        this._fsQuad.render(renderer);
      }
      renderer.setClearColor(this._oldClearColor, this._oldClearAlpha);
      renderer.autoClear = oldAutoClear;
    }
    // internals
    _getSeparableBlurMaterial(kernelRadius) {
      const coefficients = [];
      for (let i = 0; i < kernelRadius; i++) {
        coefficients.push(0.39894 * Math.exp(-0.5 * i * i / (kernelRadius * kernelRadius)) / kernelRadius);
      }
      return new import_three6.ShaderMaterial({
        defines: {
          "KERNEL_RADIUS": kernelRadius
        },
        uniforms: {
          "colorTexture": { value: null },
          "invSize": { value: new import_three6.Vector2(0.5, 0.5) },
          // inverse texture size
          "direction": { value: new import_three6.Vector2(0.5, 0.5) },
          "gaussianCoefficients": { value: coefficients }
          // precomputed Gaussian coefficients
        },
        vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
        fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
      });
    }
    _getCompositeMaterial(nMips) {
      return new import_three6.ShaderMaterial({
        defines: {
          "NUM_MIPS": nMips
        },
        uniforms: {
          "blurTexture1": { value: null },
          "blurTexture2": { value: null },
          "blurTexture3": { value: null },
          "blurTexture4": { value: null },
          "blurTexture5": { value: null },
          "bloomStrength": { value: 1 },
          "bloomFactors": { value: null },
          "bloomTintColors": { value: null },
          "bloomRadius": { value: 0 }
        },
        vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
        fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
      });
    }
  };
  UnrealBloomPass.BlurDirectionX = new import_three6.Vector2(1, 0);
  UnrealBloomPass.BlurDirectionY = new import_three6.Vector2(0, 1);
  var import_three7 = __toESM(require_three());
  var OutputShader = {
    name: "OutputShader",
    uniforms: {
      "tDiffuse": { value: null },
      "toneMappingExposure": { value: 1 }
    },
    vertexShader: (
      /* glsl */
      `
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
    ),
    fragmentShader: (
      /* glsl */
      `

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`
    )
  };
  var OutputPass = class extends Pass {
    /**
     * Constructs a new output pass.
     */
    constructor() {
      super();
      this.uniforms = import_three7.UniformsUtils.clone(OutputShader.uniforms);
      this.material = new import_three7.RawShaderMaterial({
        name: OutputShader.name,
        uniforms: this.uniforms,
        vertexShader: OutputShader.vertexShader,
        fragmentShader: OutputShader.fragmentShader
      });
      this._fsQuad = new FullScreenQuad(this.material);
      this._outputColorSpace = null;
      this._toneMapping = null;
    }
    /**
     * Performs the output pass.
     *
     * @param {WebGLRenderer} renderer - The renderer.
     * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
     * destination for the pass.
     * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
     * previous pass from this buffer.
     * @param {number} deltaTime - The delta time in seconds.
     * @param {boolean} maskActive - Whether masking is active or not.
     */
    render(renderer, writeBuffer, readBuffer) {
      this.uniforms["tDiffuse"].value = readBuffer.texture;
      this.uniforms["toneMappingExposure"].value = renderer.toneMappingExposure;
      if (this._outputColorSpace !== renderer.outputColorSpace || this._toneMapping !== renderer.toneMapping) {
        this._outputColorSpace = renderer.outputColorSpace;
        this._toneMapping = renderer.toneMapping;
        this.material.defines = {};
        if (import_three7.ColorManagement.getTransfer(this._outputColorSpace) === import_three7.SRGBTransfer) this.material.defines.SRGB_TRANSFER = "";
        if (this._toneMapping === import_three7.LinearToneMapping) this.material.defines.LINEAR_TONE_MAPPING = "";
        else if (this._toneMapping === import_three7.ReinhardToneMapping) this.material.defines.REINHARD_TONE_MAPPING = "";
        else if (this._toneMapping === import_three7.CineonToneMapping) this.material.defines.CINEON_TONE_MAPPING = "";
        else if (this._toneMapping === import_three7.ACESFilmicToneMapping) this.material.defines.ACES_FILMIC_TONE_MAPPING = "";
        else if (this._toneMapping === import_three7.AgXToneMapping) this.material.defines.AGX_TONE_MAPPING = "";
        else if (this._toneMapping === import_three7.NeutralToneMapping) this.material.defines.NEUTRAL_TONE_MAPPING = "";
        else if (this._toneMapping === import_three7.CustomToneMapping) this.material.defines.CUSTOM_TONE_MAPPING = "";
        this.material.needsUpdate = true;
      }
      if (this.renderToScreen === true) {
        renderer.setRenderTarget(null);
        this._fsQuad.render(renderer);
      } else {
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        this._fsQuad.render(renderer);
      }
    }
    /**
     * Frees the GPU-related resources allocated by this instance. Call this
     * method whenever the pass is no longer used in your app.
     */
    dispose() {
      this.material.dispose();
      this._fsQuad.dispose();
    }
  };
  function randomFrom(seed) {
    return () => {
      seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
      return seed / 4294967296;
    };
  }
  var NAMES = ["\u9526\u9CA4", "\u7FBD\u6BDB", "\u94F6\u674F\u53F6", "\u96EA\u82B1", "\u84B2\u516C\u82F1"];
  var TAU = Math.PI * 2;
  var add = (a, b) => a.map((v, i) => v + b[i]);
  var mul = (a, s) => a.map((v) => v * s);
  var mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  var norm = (a) => mul(a, 1 / Math.hypot(...a));
  var cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  function makeShape(kind) {
    const rand = randomFrom(20261114 + kind * 19);
    const points = { p: [], m: [], c: [], s: [] }, lines = { p: [], m: [], c: [], s: [] };
    function emit(dst, p, delay = 0, light = 0.55, group = 0, phase = 0, center = [0, 0, 0], seed = [40, 1, 0, 0]) {
      dst.p.push(...p);
      dst.m.push(delay, light, group, phase);
      dst.c.push(...center);
      dst.s.push(...seed);
    }
    function dot2(p, delay = 0, light = 0.55, group = 0, phase = rand() * TAU, center, seed) {
      emit(points, p, delay, light, group, phase, center, seed);
    }
    function edge(a, b, delay = 0, light = 0.35, group = 0, phase = 0, center, seed) {
      emit(lines, a, delay, light, group, phase, center, seed);
      emit(lines, b, delay, light, group, phase, center, seed);
    }
    function path(fn, n, delay = 0, light = 0.35, group = 0, phase = 0, center, seed) {
      for (let i = 0; i < n; i++) edge(fn(i / n), fn((i + 1) / n), typeof delay === "function" ? delay(i / n) : delay, light, group, phase, center, seed);
    }
    if (kind === 0) {
      let radius = function(u, k) {
        let i = 0;
        while (i < profile.length - 2 && u > profile[i + 1][0]) i++;
        const a = profile[i], b = profile[i + 1];
        let s = (u - a[0]) / (b[0] - a[0]);
        s = s * s * (3 - 2 * s);
        return a[k] + (b[k] - a[k]) * s;
      }, body = function(u, a) {
        return [2.28 - u * 4.45, Math.cos(a) * radius(u, 1), Math.sin(a) * radius(u, 2)];
      }, tail = function(r, v) {
        const w = Math.abs(v);
        return [-2.17 - r * (0.59 + 0.83 * Math.pow(w, 0.65)), r * v * (1.12 + 0.14 * Math.sin(w * 4)), 0.07 * Math.sin(v * 5 + r * 3) * r];
      };
      const profile = [[0, 0.11, 0.1], [0.08, 0.36, 0.3], [0.2, 0.57, 0.46], [0.35, 0.61, 0.47], [0.52, 0.48, 0.37], [0.7, 0.29, 0.22], [0.87, 0.12, 0.11], [1, 0.055, 0.08]];
      for (let i = 0; i < 22e3; i++) {
        const u = rand(), a = rand() * TAU;
        dot2(body(u, a), 0.12 + u * 1.65, 0.2 + rand() * 0.57);
      }
      for (let j = 0; j < 42; j++) for (let k = 0; k < 22; k++) {
        const u = 0.12 + j * 0.018, a = TAU * (k + j % 2 * 0.5) / 22;
        path((q) => body(u + 0.012 * Math.sin(q * Math.PI), a + (q - 0.5) * 0.23), 5, 0.12 + u * 1.65, 0.16);
      }
      for (const side of [-1, 1]) {
        let pectoral = function(r, v) {
          return [1.08 - r * (0.55 + v * 0.76), -0.12 - r * (0.45 + 0.2 * Math.sin(v * Math.PI)), side * (0.37 + r * (0.6 + 0.5 * Math.sin(v * Math.PI)))];
        };
        for (let j = 0; j < 50; j++) path((r) => pectoral(r, j / 49), 36, 0.95 + j * 7e-3, side > 0 ? 0.3 : 0.13, 1, j * 0.5);
        for (let i = 0; i < 1100; i++) dot2(pectoral(rand(), rand()), 1.2, 0.22, 1);
        const eye = [1.84, 0.23, side * 0.296];
        if (side > 0) {
          path((q) => [eye[0] + 0.09 * Math.cos(q * TAU), eye[1] + 0.09 * Math.sin(q * TAU), eye[2]], 34, 0.25, 1.6);
          dot2([eye[0] + 0.025, eye[1] + 0.024, eye[2] + side * 0.012], 0.25, 2.2);
        }
        path((q) => [2.22 - q * 0.5, -0.055 - 0.17 * Math.sin(q * Math.PI * 0.7), side * (0.11 + 0.42 * q)], 36, 0.35, 0.8);
        path((q) => body(0.22 + 0.03 * Math.sin(q * Math.PI), side * (0.35 + q * 2.2)), 45, 0.6, 0.65);
      }
      for (let j = 0; j < 54; j++) {
        const u = 0.27 + j / 53 * 0.43, root = body(u, 0), height = 0.64 * Math.pow(Math.sin(j / 53 * Math.PI), 0.75);
        path((q) => [root[0] - 0.18 * q, root[1] + height * q, 0.055 * Math.sin(q * 4 + j * 0.1) * q], 22, 1 + u, 0.34, 1, j * 0.2);
      }
      for (let j = 0; j < 100; j++) path((r) => tail(r, -1 + j / 99 * 2), 42, 1.8 + j * 3e-3, 0.49, 1, j * 0.05);
      for (let j = 0; j < 2200; j++) dot2(tail(rand(), rand() * 2 - 1), 2, 0.32, 1);
      for (const side of [-1, 1]) path((q) => tail(1, q * side), 60, 2, 0.72, 1);
    }
    if (kind === 1) {
      let barb = function(u, q, side) {
        const p = shaft(u), width = 1.25 * Math.pow(Math.sin(Math.PI * Math.max(0, (u - 0.1) / 0.9)), 0.72) * (side < 0 ? 1 : 0.78);
        return [p[0] + side * width * q, p[1] + (0.62 + 0.25 * u) * q * Math.sqrt(1 - u) - 0.1 * q * q * (1 - u), p[2] + 0.18 * Math.sin(q * Math.PI) + side * 0.09 * q];
      };
      const shaft = (u) => [0.34 * Math.sin(u * 2.8) - 0.16, -2.8 + 5.65 * u, 0.17 * Math.sin(u * 3.5)];
      for (let k = 0; k < 5; k++) path((u) => add(shaft(u), [(k - 2) * 0.012, 0, 0]), 180, (u) => 0.05 + u * 2.65, 0.58);
      for (let side of [-1, 1]) for (let j = 0; j < 108; j++) {
        const u = 0.12 + j / 108 * 0.865, phase = rand() * TAU, delay = 0.2 + u * 2.7;
        path((q) => barb(u, q, side), 35, delay, 0.35 + rand() * 0.18, 0, phase);
        for (let k = 2; k < 17; k++) {
          const q = k / 18;
          edge(barb(u, q, side), barb(Math.min(0.993, u + 8e-3), Math.min(1, q + 0.075), side), delay, 0.16, 0, phase);
        }
        for (let k = 0; k < 24; k++) dot2(barb(u, rand(), side), delay, 0.25 + rand() * 0.5);
      }
      for (let j = 0; j < 160; j++) {
        const u = 0.06 + rand() * 0.22, side = j % 2 ? 1 : -1, len = 0.2 + rand() * 0.55, phase = rand() * TAU, p = shaft(u);
        path((q) => [p[0] + side * len * q, p[1] + 0.3 * q + 0.12 * Math.sin(q * 3 + phase) * q, p[2] + 0.19 * Math.sin(q * 5 + phase) * q], 18, 0.1 + u * 2.3, 0.22, 1, phase);
      }
    }
    if (kind === 2) {
      let leaf = function(a, r) {
        const radius = 3.15 * (1 - 0.23 * Math.exp(-a * a / 0.033)) * (1 + 0.045 * Math.sin(5 * a) + 0.025 * Math.sin(13 * a));
        return [Math.sin(a) * radius * r, -1.55 + Math.cos(a) * radius * r, 0.28 * r * r + 0.1 * Math.sin(a * 26) * r + 0.11 * Math.cos(a * 3) * r];
      };
      for (let j = 0; j < 170; j++) {
        const a = -1.34 + j / 169 * 2.68;
        path((r) => leaf(a, r), 70, (r) => 0.3 + r * 2.8, 0.24 + (j % 5 === 0 ? 0.28 : 0), 0, a);
      }
      path((q) => leaf(-1.34 + q * 2.68, 1), 320, 3.05, 0.85);
      for (const a of [-1.34, 1.34]) path((r) => leaf(a, r), 70, (r) => 0.3 + r * 2.8, 0.68);
      for (let i = 0; i < 21e3; i++) {
        const a = rand() * 2.68 - 1.34, r = Math.sqrt(rand());
        dot2(leaf(a, r), 0.3 + r * 2.8, 0.13 + rand() * 0.42);
      }
      for (let j = 0; j < 5; j++) path((u) => [(j - 2) * 0.012 + 0.18 * Math.sin(u * 2), -1.55 - u * 1.5, -0.08 * u], 60, 0.08, 0.65);
      for (let i = 0; i < 130; i++) {
        const a = rand() * 2.68 - 1.34, r = Math.sqrt(rand()), p = leaf(a, r), sz = 0.035 + rand() * 0.045;
        path((u) => add(p, [Math.sin(-1.2 + u * 2.4) * sz, Math.cos(-1.2 + u * 2.4) * sz, 0]), 8, 0.3 + r * 2.8, 0.55, 1, i);
      }
    }
    if (kind === 3) {
      let snowEdge = function(a, b, level = 0) {
        const len = Math.hypot(...a.map((v, i) => b[i] - v)), n = Math.max(2, Math.ceil(len * 32));
        path((q) => mix(a, b, q), n, (q) => 0.15 + Math.hypot(...mix(a, b, q)) * 0.82, level === 0 ? 0.9 : 0.48);
        for (let j = 0; j < n; j++) {
          const p = mix(a, b, (j + rand()) / n);
          for (let k = 0; k < 3; k++) dot2(add(p, [(rand() - 0.5) * 0.026, (rand() - 0.5) * 0.026, (rand() - 0.5) * 0.1]), 0.15 + Math.hypot(...p) * 0.82, 0.28 + rand() * 0.62);
        }
      }, radial = function(r, a, z = 0) {
        return [Math.sin(a) * r, Math.cos(a) * r, z];
      };
      for (let k = 0; k < 6; k++) {
        const a = k * TAU / 6;
        snowEdge([0, 0, 0], radial(3.15, a));
        for (let j = 1; j <= 8; j++) {
          const r = 0.38 + j * 0.3, len = 0.76 * Math.pow(Math.sin(j / 9 * Math.PI), 0.9), p = radial(r, a);
          for (const side of [-1, 1]) {
            const angle = a + side * Math.PI / 3, end = add(p, radial(len, angle));
            snowEdge(p, end, 1);
            for (let m = 1; m <= 4; m++) {
              const q = m / 5, b = mix(p, end, q), l = 0.13 * (1 - q) + 0.055;
              snowEdge(b, add(b, radial(l, a)), 2);
              snowEdge(b, add(b, radial(l, a + side * TAU / 3)), 2);
            }
          }
        }
        for (const r of [0.38, 0.68, 1.18]) {
          snowEdge(radial(r, a, 0.05), radial(r, a + TAU / 6, 0.05), 1);
          snowEdge(radial(r, a, -0.05), radial(r, a + TAU / 6, -0.05), 1);
        }
        for (const side of [-1, 1]) {
          const p = radial(2.94, a);
          snowEdge(p, add(p, radial(0.2, a + side * Math.PI / 3)), 1);
        }
      }
      for (let i = 0; i < 420; i++) {
        const a = rand() * TAU, r = 3.7 + rand() * 3.8;
        dot2([Math.cos(a) * r, Math.sin(a) * r, (rand() - 0.5) * 5], 2.2 + rand() * 1.2, 0.13 + rand() * 0.3, 2, rand() * TAU);
      }
    }
    if (kind === 4) {
      const center = [-0.65, 0.55, 0], count = 112;
      for (let k = 0; k < 6; k++) path((u) => [-0.65 + 0.19 * u * u + (k - 2.5) * 9e-3, 0.55 - 3.6 * u, 0.1 * Math.sin(u * 2.2)], 100, 0.05, 0.47, 3);
      for (let i = 0; i < 950; i++) {
        const z = rand() * 2 - 1, a = rand() * TAU, r = 0.25 + rand() * 0.06;
        dot2(add(center, [r * Math.sqrt(1 - z * z) * Math.cos(a), r * z, r * Math.sqrt(1 - z * z) * Math.sin(a)]), 0.05, 0.22, 3);
      }
      for (let i = 0; i < count; i++) {
        const h = 1 - 2 * (i + 0.5) / count, a = i * 2.399963229728653, n = [Math.cos(a) * Math.sqrt(1 - h * h), h, Math.sin(a) * Math.sqrt(1 - h * h)];
        const tangent = norm(cross(n, Math.abs(h) < 0.9 ? [0, 1, 0] : [1, 0, 0])), bitangent = cross(n, tangent);
        const root = add(center, mul(n, 0.27)), cap = add(center, mul(n, 1.43 + 0.045 * Math.sin(i * 4.7)));
        const delay = 0.12 + (1 - h) * 0.85, release = i % 7 === 0 || n[0] < -0.62 ? 30 : 5.533333 + rand() * 3.1, seed = [release, 0.7 + rand() * 0.55, rand() * TAU, i];
        path((q) => mix(root, cap, q), 20, delay, 0.4, 4, i, cap, seed);
        path((q) => add(root, mul(n, q * 0.14)), 6, delay, 0.9, 4, i, cap, seed);
        const radius = 0.25 + rand() * 0.055;
        for (let j = 0; j < 28; j++) {
          const theta = j / 28 * TAU, wing = add(mul(tangent, Math.cos(theta)), mul(bitangent, Math.sin(theta)));
          const filament = (q) => add(cap, add(mul(wing, radius * q), mul(n, -0.06 * q + 0.12 * q * q)));
          path(filament, 9, delay + 0.18, 0.29, 4, i, cap, seed);
          dot2(filament(1), delay + 0.18, 0.62, 4, i, cap, seed);
        }
      }
    }
    const total = points.p.length / 3 + lines.p.length / 3;
    for (const channel of [points, lines]) for (const values of Object.values(channel)) if (values.some((v) => !Number.isFinite(v))) throw new Error("\u51E0\u4F55\u4E2D\u51FA\u73B0\u975E\u6709\u9650\u6570\u503C");
    return { points, lines, summary: { name: NAMES[kind], points: points.p.length / 3, segments: lines.p.length / 6, vertices: total } };
  }
  function makeDetailedBirdPoint(rng) {
    const part = rng(), side = rng() < 0.5 ? -1 : 1, u = rng(), v = rng(), w = rng();
    const tau = Math.PI * 2;
    const ellipsoid = (cx, cy, cz, rx, ry, rz) => {
      const h = u * 2 - 1, r = Math.sqrt(1 - h * h), a = v * tau;
      return [cx + rx * r * Math.cos(a), cy + ry * r * Math.sin(a), cz + rz * h, 0, 1.05];
    };
    if (part < 0.15) {
      const p = ellipsoid(0, 0.015, -0.025, 0.116, 0.132, 0.365);
      p[0] *= 0.83 + 0.17 * Math.sin((u * 0.76 + 0.14) * Math.PI);
      return p;
    }
    if (part < 0.185) return ellipsoid(0, 0.065, 0.285, 0.079, 0.091, 0.145);
    if (part < 0.205) return ellipsoid(0, 0.108, 0.425, 0.101, 0.096, 0.112);
    if (part < 0.217) {
      const radius = 0.044 * (1 - u);
      return [radius * Math.cos(v * tau), 0.096 + radius * 0.55 * Math.sin(v * tau), 0.505 + u * 0.177, 0, 1.65];
    }
    if (part < 0.22) return [side * 0.083, 0.133 + (u - 0.5) * 0.016, 0.465 + (v - 0.5) * 0.024, 0, 2.1];
    const feather = (root, tip, width, wing, arc = 0.035) => {
      const along = Math.pow(u, 0.88), dx = tip[0] - root[0], dz = tip[2] - root[2], len = Math.hypot(dx, dz);
      let across = v * 2 - 1;
      const quill = w < 0.23, edge = w > 0.84;
      if (quill) across *= 0.055;
      else if (edge) across = Math.sign(across) * 0.96;
      const breadth = width * Math.pow(Math.sin(Math.PI * along), 0.72) * (1 - 0.2 * along);
      return [side * (root[0] + dx * along - dz / len * across * breadth), root[1] + (tip[1] - root[1]) * along + arc * Math.sin(Math.PI * along) + 0.012 * (1 - across * across), root[2] + dz * along + dx / len * across * breadth, wing, quill ? 1.65 : edge ? 1.22 : 0.78];
    };
    if (part < 0.31) {
      const k2 = Math.min(5, Math.floor(rng() * 6)), f2 = k2 / 5;
      return feather([0.025 + 0.055 * f2, 0.025, -0.26], [0.045 + 0.25 * f2, -0.018, -0.7 - 0.24 * f2 * f2], 0.052, -1, 0.018);
    }
    if (part < 0.48) {
      const x = 0.095 + u * 0.71, front = 0.18 + 0.065 * Math.sin(u * Math.PI), back = -0.21 - 0.05 * u;
      const z = back + (front - back) * v, layer = Math.floor(v * 5) / 5;
      return [side * x, 0.075 + 0.055 * Math.sin(u * Math.PI) + 0.012 * Math.cos(layer * 31), z, 1, w < 0.18 ? 1.25 : 0.82];
    }
    if (part < 0.72) {
      const k2 = Math.min(8, Math.floor(rng() * 9)), f2 = k2 / 8;
      return feather([0.14 + 0.47 * f2, 0.09 + 0.035 * Math.sin(f2 * Math.PI), 0.12 + 0.035 * f2], [0.18 + 0.51 * f2, 0.015, -0.38 - 0.16 * f2], 0.061, 1, 0.035);
    }
    const k = Math.min(8, Math.floor(rng() * 9)), f = k / 8;
    return feather([0.6 + 0.26 * f, 0.105 - 0.035 * f, 0.16 - 0.1 * f], [0.72 + 0.65 * f, -0.035 - 0.025 * f, -0.59 + 0.32 * f], 0.06 - 0.012 * f, 1, 0.045);
  }
  var birdDeformGLSL = (
    /* glsl */
    `
vec4 birdFrame(vec3 x,vec3 y,vec3 z){
 float trace=x.x+y.y+z.z;vec4 q;
 if(trace>0.){float s=sqrt(trace+1.)*2.;q=vec4((y.z-z.y)/s,(z.x-x.z)/s,(x.y-y.x)/s,s*.25);}
 else if(x.x>y.y&&x.x>z.z){float s=sqrt(1.+x.x-y.y-z.z)*2.;q=vec4(s*.25,(y.x+x.y)/s,(z.x+x.z)/s,(y.z-z.y)/s);}
 else if(y.y>z.z){float s=sqrt(1.+y.y-x.x-z.z)*2.;q=vec4((y.x+x.y)/s,s*.25,(z.y+y.z)/s,(z.x-x.z)/s);}
 else{float s=sqrt(1.+z.z-x.x-y.y)*2.;q=vec4((z.x+x.z)/s,(z.y+y.z)/s,s*.25,(x.y-y.x)/s);}
 return normalize(q);
}
vec4 blendBirdFrame(vec4 a,vec4 b,float t){
 float c=dot(a,b);if(c<0.){b=-b;c=-c;}if(c>.9995)return normalize(mix(a,b,t));
 float angle=acos(clamp(c,-1.,1.));return (sin((1.-t)*angle)*a+sin(t*angle)*b)/sin(angle);
}
vec3 turnBird(vec4 q,vec3 p){return p+2.*cross(q.xyz,cross(q.xyz,p)+q.w*p);}
vec3 articulateBird(vec4 samplePoint,float flap){
 vec3 p=samplePoint.xyz;
 if(samplePoint.w>.5){
   float side=sign(p.x),span=max(0.,abs(p.x)-.095);
   float inner=min(span,.46),outer=max(0.,span-.46);
   float wrist=flap*.62-.055+.10*sin(flap*1.4);
   p.x=side*(.095+inner*cos(flap)+outer*cos(wrist));
   p.y+=inner*sin(flap)+outer*sin(wrist);
   p.z-=.055*pow(span/1.28,2.)*abs(sin(flap));
 }else if(samplePoint.w<-.5){
   p.y+=.035*sin(flap)*sm(.28,.90,-p.z);
 }
 return p;
}
`
  );
  var BLOOM_SPEED = 1.42;
  var CUES = { launch: 7, snow: 586 / 60, gather: 835 / 60, gatherEnd: 14.35, release: 19.86, fire: [1208 / 60, 1291 / 60, 1374 / 60] };
  var PETALS = [[-8, 2.62, 0.79, 0.42, 0.28, -0.2], [27, 2.91, 0.86, 0.67, 0.12, 0.24], [71, 2.55, 0.7, 0.86, 0.5, -0.32], [106, 3.03, 0.87, 0.53, -0.18, 0.18], [149, 2.73, 1.02, 0.62, 0.38, -0.25], [185, 2.46, 0.75, 0.31, -0.25, 0.38], [219, 2.86, 0.93, 0.4, 0.15, -0.14], [257, 2.35, 0.82, 0.71, 0.4, 0.3], [291, 2.71, 0.64, 0.57, -0.1, -0.32], [329, 2.49, 0.9, 0.35, 0.2, 0.21], [11, 2.1, 0.61, 0.91, 0.75, -0.48], [58, 1.74, 0.72, 1.04, 0.39, 0.42], [115, 2.28, 0.56, 0.78, 0.56, -0.36], [157, 1.89, 0.67, 0.62, -0.1, 0.57], [202, 2.03, 0.52, 0.97, 0.7, -0.42], [249, 1.72, 0.7, 0.83, 0.35, 0.36], [294, 2.17, 0.58, 1.06, 0.8, -0.27], [341, 1.82, 0.59, 0.61, 0.28, 0.52], [33, 1.29, 0.39, 1.11, 0.58, 0.44], [79, 1.52, 0.41, 0.91, 0.83, -0.45], [134, 1.23, 0.46, 1.24, 0.62, 0.39], [178, 1.43, 0.33, 0.98, 0.47, -0.31], [237, 1.12, 0.44, 1.31, 0.7, 0.6], [282, 1.47, 0.36, 1.06, 0.55, -0.49], [336, 1.19, 0.4, 1.22, 0.76, 0.35]];
  var BIRDS = 25;
  var smooth = (a, b, t) => {
    const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return x * x * x * (x * (x * 6 - 15) + 10);
  };
  var hash = (n) => {
    const v = Math.sin(n * 12.9898 + 4.8) * 43758.5453;
    return v - Math.floor(v);
  };
  var add2 = (a, b) => a.map((v, i) => v + b[i]);
  var sub = (a, b) => a.map((v, i) => v - b[i]);
  var mul2 = (a, s) => a.map((v) => v * s);
  var norm2 = (a) => mul2(a, 1 / (Math.hypot(...a) || 1));
  function turnY(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return [p[0] * c + p[2] * s, p[1], p[2] * c - p[0] * s];
  }
  var launchAt = (g) => CUES.launch + hash(g + 30) * 0.022;
  function flowerOrigin(g) {
    const [angle, length, width, lift, fold, curl] = PETALS[g], u = 0.6, t = 2.2 + 0.32 * (CUES.launch * 1.22), az = angle * Math.PI / 180 + 0.1 * Math.sin(u * 2.6 + g) * u;
    const radial = length * Math.sin(u * (1.45 - 0.1 * (g < 10 ? 0 : g < 18 ? 1 : 2))) - fold * 0.4 * u ** 4;
    const high = length * (lift * u - 0.43 * u * u) + fold * u ** 4 + 0.07 * Math.sin(t * 1.6 + g * 1.9) * u * u;
    const side = curl * 0.38 * u * u, q = [radial * Math.cos(az) + side * Math.cos(az + 1.57), high, radial * Math.sin(az) + side * Math.sin(az + 1.57)];
    const tilted = [q[0], Math.cos(0.9) * q[1] - Math.sin(0.9) * q[2], Math.sin(0.9) * q[1] + Math.cos(0.9) * q[2]];
    const p = turnY(tilted, -0.3 + 0.065 * Math.sin(t * 0.9));
    p[0] -= 0.072;
    p[1] += 0.84;
    return add2(mul2(sub(p, [0, 0.12, 0]), 0.72), [0, 0.12, 0]);
  }
  function flightDirection(g) {
    const p = flowerOrigin(g);
    return norm2([p[0], 0.4 * (p[1] - 0.65) + 0.2, p[2]]);
  }
  function birdCenter(g, t) {
    const age = Math.max(0, t - launchAt(g)), p = flowerOrigin(g), d = flightDirection(g);
    const radial0 = Math.hypot(p[0], p[2]), phase = Math.atan2(p[2], p[0]);
    const outward = (4.3 + 2.15 * hash(g + 12)) * (1 - Math.exp(-age / 0.24));
    const curl = (0.25 + 0.18 * hash(g + 8)) * (1 - Math.exp(-age / 0.35));
    const theta = phase - curl - (0.27 + 0.14 * hash(g + 24)) * age + 0.055 * (Math.sin(age * 0.64 + g) - Math.sin(g));
    const weave = smooth(0.35, 1.45, age), crossing = g % 6 === 1 ? 0.35 : 0;
    const radius = (radial0 + outward) * (1 - crossing * smooth(1.3, 3, age)) + 0.38 * (Math.sin(age * 0.61 + g * 1.2) - Math.sin(g * 1.2)) * weave;
    const y = p[1] + d[1] * (1.4 + 0.8 * hash(g + 21)) * (1 - Math.exp(-age / 0.28)) + 0.48 * (Math.sin(age * 0.8 + g) - Math.sin(g)) * weave;
    return [Math.cos(theta) * radius + 0.24 * (Math.sin(age * 0.7 + g) - Math.sin(g)) * weave, y, Math.sin(theta) * radius + 0.27 * (Math.cos(age * 0.6 + g) - Math.cos(g)) * weave];
  }
  function birdVelocity(g, t) {
    const start = launchAt(g), a = Math.max(start, t - 2e-3), b = Math.max(start, t) + 2e-3;
    return mul2(sub(birdCenter(g, b), birdCenter(g, a)), 1 / (b - a));
  }
  var snowBirth = Array.from({ length: BIRDS }, (_, g) => ({ p: birdCenter(g, CUES.snow), v: birdVelocity(g, CUES.snow) }));
  var BIRDS2 = 25;
  var smooth2 = (a, b, t) => {
    const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return x * x * x * (x * (x * 6 - 15) + 10);
  };
  var hash2 = (n) => {
    const v = Math.sin(n * 12.9898 + 4.8) * 43758.5453;
    return v - Math.floor(v);
  };
  var add3 = (a, b) => a.map((v, i) => v + b[i]);
  var sub2 = (a, b) => a.map((v, i) => v - b[i]);
  var mul3 = (a, s) => a.map((v) => v * s);
  var norm3 = (a) => mul3(a, 1 / (Math.hypot(...a) || 1));
  var cross2 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  var dot = (a, b) => a.reduce((v, x, i) => v + x * b[i], 0);
  function direction(i, n = BIRDS2) {
    const y = 1 - 2 * (i + 0.5) / n, a = i * 2.399963229728653, r = Math.sqrt(1 - y * y);
    return [r * Math.cos(a), y, r * Math.sin(a)];
  }
  function turnY2(p, a) {
    const c = Math.cos(a), s = Math.sin(a);
    return [p[0] * c + p[2] * s, p[1], p[2] * c - p[0] * s];
  }
  var launchAt2 = (g) => CUES.launch + hash2(g + 30) * 0.022;
  var originFor = (g) => flowerOrigin2(g);
  var morphStart = (g) => launchAt2(g) + 8e-3 + g * 0.381966 % 1 * 0.014;
  var formation = (g, t) => smooth2(morphStart(g), morphStart(g) + 0.2, t);
  function flowerOrigin2(g) {
    const [angle, length, width, lift, fold, curl] = PETALS[g], u = 0.6, t = 2.2 + 0.32 * (CUES.launch * BLOOM_SPEED), az = angle * Math.PI / 180 + 0.1 * Math.sin(u * 2.6 + g) * u;
    const radial = length * Math.sin(u * (1.45 - 0.1 * (g < 10 ? 0 : g < 18 ? 1 : 2))) - fold * 0.4 * u ** 4;
    const high = length * (lift * u - 0.43 * u * u) + fold * u ** 4 + 0.07 * Math.sin(t * 1.6 + g * 1.9) * u * u;
    const side = curl * 0.38 * u * u, q = [radial * Math.cos(az) + side * Math.cos(az + 1.57), high, radial * Math.sin(az) + side * Math.sin(az + 1.57)];
    const tilted = [q[0], Math.cos(0.9) * q[1] - Math.sin(0.9) * q[2], Math.sin(0.9) * q[1] + Math.cos(0.9) * q[2]];
    const p = turnY2(tilted, -0.3 + 0.065 * Math.sin(t * 0.9));
    p[0] -= 0.072;
    p[1] += 0.84;
    return add3(mul3(sub2(p, [0, 0.12, 0]), 0.72), [0, 0.12, 0]);
  }
  function flightDirection2(g) {
    const p = flowerOrigin2(g);
    return norm3([p[0], 0.4 * (p[1] - 0.65) + 0.2, p[2]]);
  }
  function perchFrame(g) {
    const forward = flightDirection2(g), right = norm3(cross2([0, 1, 1e-3], forward)), up = cross2(forward, right);
    return { center: flowerOrigin2(g), rotation: quaternion(right, up, forward), size: 0.3 + 0.07 * hash2(g + 14) };
  }
  function birdCenter2(g, t) {
    const age = Math.max(0, t - launchAt2(g)), p = flowerOrigin2(g), d = flightDirection2(g);
    const radial0 = Math.hypot(p[0], p[2]), phase = Math.atan2(p[2], p[0]);
    const outward = 1.35 * (4.3 + 2.15 * hash2(g + 12)) * (1 - Math.exp(-age / 0.22));
    const curl = (0.25 + 0.18 * hash2(g + 8)) * (1 - Math.exp(-age / 0.35));
    const theta = phase - curl - (0.27 + 0.14 * hash2(g + 24)) * age + 0.055 * (Math.sin(age * 0.64 + g) - Math.sin(g));
    const weave = smooth2(0.35, 1.45, age), crossing = g % 6 === 1 ? 0.35 : 0;
    const radius = (radial0 + outward) * (1 - crossing * smooth2(1.3, 3, age)) + 0.38 * (Math.sin(age * 0.61 + g * 1.2) - Math.sin(g * 1.2)) * weave;
    const y = p[1] + d[1] * (1.4 + 0.8 * hash2(g + 21)) * (1 - Math.exp(-age / 0.28)) + 0.48 * (Math.sin(age * 0.8 + g) - Math.sin(g)) * weave;
    return [Math.cos(theta) * radius + 0.24 * (Math.sin(age * 0.7 + g) - Math.sin(g)) * weave, y, Math.sin(theta) * radius + 0.27 * (Math.cos(age * 0.6 + g) - Math.cos(g)) * weave];
  }
  function birdVelocity2(g, t) {
    const start = launchAt2(g), a = Math.max(start, t - 2e-3), b = Math.max(start, t) + 2e-3;
    return mul3(sub2(birdCenter2(g, b), birdCenter2(g, a)), 1 / (b - a));
  }
  function quaternion(x, y, z) {
    const trace = x[0] + y[1] + z[2];
    let q, s;
    if (trace > 0) {
      s = Math.sqrt(trace + 1) * 2;
      q = [(y[2] - z[1]) / s, (z[0] - x[2]) / s, (x[1] - y[0]) / s, s * 0.25];
    } else if (x[0] > y[1] && x[0] > z[2]) {
      s = Math.sqrt(1 + x[0] - y[1] - z[2]) * 2;
      q = [s * 0.25, (y[0] + x[1]) / s, (z[0] + x[2]) / s, (y[2] - z[1]) / s];
    } else if (y[1] > z[2]) {
      s = Math.sqrt(1 + y[1] - x[0] - z[2]) * 2;
      q = [(y[0] + x[1]) / s, s * 0.25, (z[1] + y[2]) / s, (z[0] - x[2]) / s];
    } else {
      s = Math.sqrt(1 + z[2] - x[0] - y[1]) * 2;
      q = [(z[0] + x[2]) / s, (z[1] + y[2]) / s, s * 0.25, (x[1] - y[0]) / s];
    }
    return norm3(q);
  }
  function blendFrame(a, b, t) {
    let c = dot(a, b);
    if (c < 0) {
      b = mul3(b, -1);
      c = -c;
    }
    if (c > 0.9995) return norm3(a.map((v, i) => v + (b[i] - v) * t));
    const angle = Math.acos(Math.max(-1, Math.min(1, c))), sn = Math.sin(angle);
    return a.map((v, i) => (Math.sin((1 - t) * angle) * v + Math.sin(t * angle) * b[i]) / sn);
  }
  function birdPose(g, t) {
    const forward = norm3(birdVelocity2(g, t)), next = norm3(birdVelocity2(g, t + 0.08));
    let right = norm3(cross2([0, 1, 1e-3], forward)), up = cross2(forward, right);
    const bank = Math.max(-0.8, Math.min(0.8, cross2(forward, next)[1] * 4.2)) + 0.12 * Math.sin(t * 0.78 + g);
    right = add3(mul3(right, Math.cos(bank)), mul3(up, Math.sin(bank)));
    up = norm3(cross2(forward, right));
    const seed = hash2(g + 14), glide = 0.25 + 0.75 * smooth2(-0.5, 0.65, Math.sin(t * 0.9 + g * 0.86));
    const flap = Math.sin(t * (8.4 + seed * 3.2) + g * 2.39) * (0.55 + seed * 0.24) * glide;
    const base = { center: birdCenter2(g, t), rotation: quaternion(right, up, forward), size: 0.46 + seed * 0.18, flap };
    const age = t - launchAt2(g);
    if (age >= 0.85) return base;
    const perch = perchFrame(g, t), fold = formation(g, t), downstroke = 0.57 * smooth2(0.16, 0.87, fold) - 0.9 * smooth2(0, 0.2, age);
    base.rotation = blendFrame(perch.rotation, base.rotation, smooth2(0, 0.24, age));
    base.size = perch.size + (base.size - perch.size) * smooth2(0, 0.22, age);
    base.flap = downstroke + (base.flap - downstroke) * smooth2(0.2, 0.52, age);
    return base;
  }
  var snowBirth2 = Array.from({ length: BIRDS2 }, (_, g) => ({ p: birdCenter2(g, CUES.snow), v: birdVelocity2(g, CUES.snow) }));
  function lineCoordinates() {
    const uv = [], kind = [], weave = [];
    const vertex = (u, v, id, w, k, s) => {
      uv.push(u, v, id, w);
      kind.push(k);
      weave.push(s);
    };
    const line = (u, v, uu, vv, id, k = 0, w = 0, s = 0) => {
      vertex(u, v, id, w, k, s);
      vertex(uu, vv, id, w, k, s);
    };
    for (let id = 0; id < 25; id++) {
      const U = 38, V = 14;
      for (let i = 0; i < U; i++) for (let j = 0; j < V; j++) {
        const u = Math.max(1e-3, i / U), uu = Math.min(0.999, (i + 1) / U), v = j / V * 2 - 1, vv = (j + 1) / V * 2 - 1;
        line(u, v, uu, v, id);
        line(u, v, u, vv, id, 0, 0, 1);
        line(u, v, uu, vv, id, 0, 0, 2);
        if (j === V - 1) line(u, vv, uu, vv, id);
      }
      for (let i = 0; i < 110; i++) {
        const u = Math.max(1e-3, i / 110), uu = Math.min(0.999, (i + 1) / 110);
        line(u, -1, uu, -1, id, 1);
        line(u, 1, uu, 1, id, 1);
        if (id < 10) line(u, 0, uu, 0, id, 1);
      }
    }
    for (let a = 0; a < 8; a++) for (let i = 0; i < 120; i++) line(i / 120, a / 4 - 1, (i + 1) / 120, a / 4 - 1, 0, 3, 1);
    for (let a = 0; a < 8; a++) for (let i = 0; i < 50; i++) line(i / 50, a / 4 - 1, (i + 1) / 50, a / 4 - 1, 0, 3, 2);
    return { uv: new Float32Array(uv), kind: new Float32Array(kind), weave: new Float32Array(weave), vertices: kind.length };
  }
  var aFlowerGLSL = (
    /* glsl */
    `
float layerBirth(float id){return id<9.5?4.38:(id<17.5?6.45:8.53);}
float headGrowth(float clock){return .72*sm(4.38,6.76,clock);}
float aShapeClock(){return 2.2+.32*max(0.,min(uClock,14.62)-4.38);}
vec3 openingFold(vec3 q,float u,float unfold){
 float budHeight=2.35*sin(u*1.24)+.20*sin(PI*u);
 float budRadius=.075+.14*sin(PI*u);
 vec2 direction=q.xz/max(.00001,length(q.xz));
 vec3 closed=vec3(direction.x*budRadius*sm(0.,.2,u),budHeight,direction.y*budRadius*sm(0.,.2,u));
 vec3 p=mix(closed,q,unfold);
 float curl=(1.-unfold)*sin(PI*unfold)*pow(u,3.);
 p.xz-=direction*.42*curl;p.y+=.38*curl;return p;
}

void flowerSpec(float id,out vec4 shape,out vec2 fold){
 shape=vec4(0.,2.,.6,.6);fold=vec2(0.);
 if(id<0.5){shape=vec4(-8.00000,2.62000,0.79000,0.42000);fold=vec2(0.28000,-0.20000);return;}
 if(id<1.5){shape=vec4(27.00000,2.91000,0.86000,0.67000);fold=vec2(0.12000,0.24000);return;}
 if(id<2.5){shape=vec4(71.00000,2.55000,0.70000,0.86000);fold=vec2(0.50000,-0.32000);return;}
 if(id<3.5){shape=vec4(106.00000,3.03000,0.87000,0.53000);fold=vec2(-0.18000,0.18000);return;}
 if(id<4.5){shape=vec4(149.00000,2.73000,1.02000,0.62000);fold=vec2(0.38000,-0.25000);return;}
 if(id<5.5){shape=vec4(185.00000,2.46000,0.75000,0.31000);fold=vec2(-0.25000,0.38000);return;}
 if(id<6.5){shape=vec4(219.00000,2.86000,0.93000,0.40000);fold=vec2(0.15000,-0.14000);return;}
 if(id<7.5){shape=vec4(257.00000,2.35000,0.82000,0.71000);fold=vec2(0.40000,0.30000);return;}
 if(id<8.5){shape=vec4(291.00000,2.71000,0.64000,0.57000);fold=vec2(-0.10000,-0.32000);return;}
 if(id<9.5){shape=vec4(329.00000,2.49000,0.90000,0.35000);fold=vec2(0.20000,0.21000);return;}
 if(id<10.5){shape=vec4(11.00000,2.10000,0.61000,0.91000);fold=vec2(0.75000,-0.48000);return;}
 if(id<11.5){shape=vec4(58.00000,1.74000,0.72000,1.04000);fold=vec2(0.39000,0.42000);return;}
 if(id<12.5){shape=vec4(115.00000,2.28000,0.56000,0.78000);fold=vec2(0.56000,-0.36000);return;}
 if(id<13.5){shape=vec4(157.00000,1.89000,0.67000,0.62000);fold=vec2(-0.10000,0.57000);return;}
 if(id<14.5){shape=vec4(202.00000,2.03000,0.52000,0.97000);fold=vec2(0.70000,-0.42000);return;}
 if(id<15.5){shape=vec4(249.00000,1.72000,0.70000,0.83000);fold=vec2(0.35000,0.36000);return;}
 if(id<16.5){shape=vec4(294.00000,2.17000,0.58000,1.06000);fold=vec2(0.80000,-0.27000);return;}
 if(id<17.5){shape=vec4(341.00000,1.82000,0.59000,0.61000);fold=vec2(0.28000,0.52000);return;}
 if(id<18.5){shape=vec4(33.00000,1.29000,0.39000,1.11000);fold=vec2(0.58000,0.44000);return;}
 if(id<19.5){shape=vec4(79.00000,1.52000,0.41000,0.91000);fold=vec2(0.83000,-0.45000);return;}
 if(id<20.5){shape=vec4(134.00000,1.23000,0.46000,1.24000);fold=vec2(0.62000,0.39000);return;}
 if(id<21.5){shape=vec4(178.00000,1.43000,0.33000,0.98000);fold=vec2(0.47000,-0.31000);return;}
 if(id<22.5){shape=vec4(237.00000,1.12000,0.44000,1.31000);fold=vec2(0.70000,0.60000);return;}
 if(id<23.5){shape=vec4(282.00000,1.47000,0.36000,1.06000);fold=vec2(0.55000,-0.49000);return;}
 if(id<24.5){shape=vec4(336.00000,1.19000,0.40000,1.22000);fold=vec2(0.76000,0.35000);return;}
}
float trait(float id,float salt){return .5+.5*sin(id*2.39996323+salt*1.61803399);}
vec3 flowerToWorld(vec3 q,float tilt,float yaw,float t){
 q=vec3(q.x,cos(tilt)*q.y-sin(tilt)*q.z,sin(tilt)*q.y+cos(tilt)*q.z);
 q=rotY(yaw+.065*sin(t*.9))*q;
 q.y+=.12;return q;
}
vec3 systemaPoint(vec4 a,float t,float reach,float widthGrowth,float unfold){
 float id=a.z,u=a.x*reach,v=a.y*widthGrowth;
 vec4 shape;vec2 fold;flowerSpec(id,shape,fold);
 float length=shape.y,width=shape.z,layer=id<9.5?0.:(id<17.5?1.:2.);
 float open=sm(.10+trait(id,4.)*.13,1.38+layer*.13,t);
 float az=shape.x*PI/180.+.10*sin(u*2.6+id)*u;
 float radial=length*sin(u*(1.45-.10*layer))*(.94+.06*open);
 radial-=fold.x*.40*pow(u,4.);
 float across=v*width*pow(max(.0001,sin(PI*u)),.62);
 across*=1.+.17*v+.045*sin(u*11.+id);
 float high=length*(shape.w*u-.43*u*u)+fold.x*pow(u,4.);
 high+=.42*v*v*width*sin(PI*u)+fold.y*v*sin(PI*u);
 high+=(1.-open)*.19*pow(u,3.)+.07*sin(t*1.6+id*1.9)*u*u;
 float curl=fold.y*.38*u*u;
 vec3 q=vec3(radial*cos(az)-across*sin(az)+curl*cos(az+1.57),high,radial*sin(az)+across*cos(az)+curl*sin(az+1.57));
 return flowerToWorld(openingFold(q,u,unfold),.90,-.30,t);
}

vec3 stemPoint(float u,float angle){return vec3(.12*u+1.20*u*u+.022*cos(angle),.12-3.40*u,-.18*u+.022*sin(angle));}
vec3 branchPoint(vec4 a,float progress){
 if(a.w>1.5){float h=.72*a.x*progress;return vec3(-.10*h,.12+h,0.);}
 return stemPoint(a.x*progress,(a.y+1.)*PI*6.);
}
vec2 petalGrowth(vec4 a,float clock){
 float birth=layerBirth(a.z);
 return vec2(.001+.999*sm(birth,birth+2.75,clock),sm(birth+.72+.55*a.x,birth+3.45+.55*a.x,clock));
}
vec3 aFlowerSurface(vec4 a,float t,float reach,float widthGrowth,float unfold,float head){
 vec3 p;
 if(a.w>.5)p=branchPoint(a,1.);
 else p=systemaPoint(a,aShapeClock(),reach,widthGrowth,unfold)+vec3(-head*.10,head,0.);
 return vec3(0.,.12,0.)+(p-vec3(0.,.12,0.))*flowerSqueeze(t);
}
vec3 flowerPoint(vec4 a,float t){return aFlowerSurface(a,t,1.,1.,1.,.72);}
vec3 grownPetal(vec4 a,float t,float clock){
 if(a.w>.5){
  float front=a.w>1.5?sm(4.38,6.76,clock):(.28*sm(4.38,5.41,clock)+.72*sm(4.38,7.84,clock));
  return vec3(0.,.12,0.)+(branchPoint(a,front)-vec3(0.,.12,0.))*flowerSqueeze(t);
 }
 float birth=layerBirth(a.z);vec2 growth=petalGrowth(a,clock);
 float widthGrowth=.045+.955*sm(birth+.50+.45*a.x,birth+3.05+.55*a.x,clock);
 return aFlowerSurface(a,t,growth.x,widthGrowth,growth.y,headGrowth(clock));
}
float bloomClock(float semanticTime,float clock){return semanticTime;}
`
  );
  var TAU2 = Math.PI * 2;
  var add4 = (a, b) => a.map((v, i) => v + b[i]);
  var lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  function snowEdges() {
    const edges = [], rad = (r, a, z = 0) => [Math.sin(a) * r, Math.cos(a) * r, z];
    const edge = (a, b, w = 0.52) => edges.push([a.map((x) => x / 3.15), b.map((x) => x / 3.15), w]);
    for (let k = 0; k < 6; k++) {
      const a = k * TAU2 / 6;
      edge([0, 0, 0], rad(3.15, a), 1);
      for (let j = 1; j <= 6; j++) {
        const r = 0.4 + j * 0.39, l = 0.79 * Math.pow(Math.sin(j / 7 * Math.PI), 0.9), p = rad(r, a);
        for (const side of [-1, 1]) {
          const b = add4(p, rad(l, a + side * Math.PI / 3));
          edge(p, b, 0.65);
          for (const q of [0.32, 0.67]) {
            const c = lerp(p, b, q), s = 0.17 * (1 - q) + 0.07;
            edge(c, add4(c, rad(s, a)), 0.36);
            edge(c, add4(c, rad(s, a + side * TAU2 / 3)), 0.36);
          }
        }
      }
      for (const r of [0.38, 0.68, 1.18]) edge(rad(r, a, 0.035), rad(r, a + TAU2 / 6, 0.035), 0.55);
      for (const side of [-1, 1]) edge(rad(2.93, a), add4(rad(2.93, a), rad(0.2, a + side * Math.PI / 3)), 0.72);
    }
    return edges;
  }
  function birdEdges() {
    const out = [], seg = (a, b, w = 0.4) => out.push([a, b, w]);
    const path = (fn, n, w = 0.4) => {
      for (let j = 0; j < n; j++) seg(fn(j / n), fn((j + 1) / n), w);
    };
    const sphere = (c, r) => {
      for (let k = 0; k < 8; k++) {
        const a = k * TAU2 / 8;
        path((t) => {
          const p = (t - 0.5) * Math.PI;
          return [c[0] + r[0] * Math.cos(p) * Math.cos(a), c[1] + r[1] * Math.cos(p) * Math.sin(a), c[2] + r[2] * Math.sin(p), 0];
        }, 16, 0.26);
      }
    };
    sphere([0, 0.015, -0.025], [0.116, 0.132, 0.365]);
    sphere([0, 0.108, 0.425], [0.101, 0.096, 0.112]);
    for (const side of [-1, 1]) {
      path((t) => [side * 0.083, 0.133 + 0.02 * Math.cos(t * TAU2), 0.465 + 0.02 * Math.sin(t * TAU2), 0], 12, 1.1);
      for (const s of [-1, 1]) path((t) => [side * 0.04 * (1 - t), 0.096 + s * 0.018 * (1 - t), 0.505 + t * 0.177, 0], 4, 0.8);
      const feather = (root, tip, width, part) => {
        for (const border of [-1, 0, 1]) path((t) => {
          const dx = tip[0] - root[0], dz = tip[2] - root[2], len = Math.hypot(dx, dz), w = width * Math.pow(Math.sin(Math.PI * t), 0.72) * (1 - 0.2 * t) * border;
          return [side * (root[0] + dx * t - dz / len * w), root[1] + (tip[1] - root[1]) * t + 0.035 * Math.sin(t * Math.PI), root[2] + dz * t + dx / len * w, part];
        }, 6, border === 0 ? 0.56 : 0.33);
      };
      for (let k = 0; k < 6; k++) {
        const f = k / 5;
        feather([0.025 + 0.055 * f, 0.025, -0.26], [0.045 + 0.25 * f, -0.018, -0.7 - 0.24 * f * f], 0.052, -1);
      }
      for (let k = 0; k < 9; k++) {
        const f = k / 8;
        feather([0.14 + 0.47 * f, 0.09 + 0.035 * Math.sin(f * Math.PI), 0.12 + 0.035 * f], [0.18 + 0.51 * f, 0.015, -0.38 - 0.16 * f], 0.061, 1);
      }
      for (let k = 0; k < 9; k++) {
        const f = k / 8;
        feather([0.6 + 0.26 * f, 0.105 - 0.035 * f, 0.16 - 0.1 * f], [0.72 + 0.65 * f, -0.035 - 0.025 * f, -0.59 + 0.32 * f], 0.06 - 0.012 * f, 1);
      }
    }
    return out;
  }
  function makeTransitionGeometry() {
    const original = makeShape(4), r = randomFrom(981471), snow = snowEdges(), birds = birdEdges();
    const channels = { points: {}, lines: {} };
    const attr = { position: 3, aSeed: 4, aFlower: 4, aBird: 4, aMorphBird: 4, aMorphEnergy: 1, aSnow: 3, aMeta: 4, aRandom: 4 };
    for (const c of Object.values(channels)) for (const key of Object.keys(attr)) c[key] = [];
    const seedGroups = Array.from({ length: BIRDS2 }, () => []);
    const ds = Array.from({ length: BIRDS2 }, (_, i) => direction(i));
    const groupForSeed = [];
    for (let i = 0; i < 112; i++) {
      const n = direction(i, 112);
      let winner = 0, score = -2;
      for (let g = 0; g < BIRDS2; g++) {
        const dot2 = n.reduce((v, x, k) => v + x * ds[g][k], 0);
        if (dot2 > score) {
          score = dot2;
          winner = g;
        }
      }
      groupForSeed.push(winner);
    }
    const stem = { position: [], aMeta: [] };
    for (let i = 0; i < original.lines.p.length / 3; i += 2) {
      if (original.lines.m[i * 4 + 2] === 4) seedGroups[groupForSeed[Math.round(original.lines.s[i * 4 + 3])]].push(i);
      else for (let k = 0; k < 2; k++) {
        const j = i + k;
        stem.position.push(original.lines.p[j * 3] + 0.65, original.lines.p[j * 3 + 1] + 0.25, original.lines.p[j * 3 + 2]);
        stem.aMeta.push(original.lines.m[j * 4 + 1]);
      }
    }
    function put(c, source, bird, crystal, g, shard, sourceLight, targetLight, random, seedIndex) {
      c.position.push(source[0] + 0.65, source[1] + 0.25, source[2]);
      c.aBird.push(...bird.slice(0, 4));
      c.aSnow.push(...crystal);
      c.aSeed.push(original.lines.c[seedIndex * 3] + 0.65, original.lines.c[seedIndex * 3 + 1] + 0.25, original.lines.c[seedIndex * 3 + 2], original.lines.s[seedIndex * 4 + 3]);
      c.aMeta.push(g, shard, sourceLight, targetLight);
      c.aRandom.push(...random);
    }
    for (let g = 0; g < BIRDS2; g++) {
      const pool = seedGroups[g];
      if (!pool.length) throw new Error("\u79CD\u5B50\u5206\u7EC4\u4E3A\u7A7A");
      for (let j = 0; j < snow.length * 3; j++) {
        const k = pool[Math.floor(j / (snow.length * 3) * pool.length)], crystal = snow[j % snow.length], bird = birds[j % birds.length], shard = Math.floor(j / snow.length), rand = [r(), r(), r(), r()];
        for (let end = 0; end < 2; end++) {
          const src = original.lines.p.slice((k + end) * 3, (k + end) * 3 + 3);
          put(channels.lines, src, bird[end], crystal[end], g, shard, original.lines.m[(k + end) * 4 + 1], bird[2], rand, k);
        }
      }
      for (let j = 0; j < 2400; j++) {
        const k = pool[Math.floor(r() * pool.length)], q = r(), src = lerp(original.lines.p.slice(k * 3, k * 3 + 3), original.lines.p.slice((k + 1) * 3, (k + 1) * 3 + 3), q);
        const bird = makeDetailedBirdPoint(r), edge = snow[Math.floor(r() * snow.length)], flake = lerp(edge[0], edge[1], r());
        flake[2] += (r() - 0.5) * 0.018;
        put(channels.points, src, bird, flake, g, j % 3, 0.23, bird[4], [r(), r(), r(), r()], k);
      }
    }
    const flower = lineCoordinates(), petalLines = Array.from({ length: BIRDS2 }, () => []);
    for (let i = 0; i < flower.vertices; i += 2) if (flower.kind[i] < 2) petalLines[Math.round(flower.uv[i * 4 + 2])].push(i);
    for (const [name, c] of Object.entries(channels)) {
      const stride = name === "lines" ? 2 : 1, seen = Array(BIRDS2).fill(0), total = c.position.length / 3 / BIRDS2 / stride;
      for (let i = 0; i < c.position.length / 3; i += stride) {
        const g = c.aMeta[i * 4], pool = petalLines[g], k = pool[Math.min(pool.length - 1, Math.floor(seen[g]++ / total * pool.length))];
        if (stride === 2) for (let e = 0; e < 2; e++) c.aFlower.push(flower.uv[(k + e) * 4], flower.uv[(k + e) * 4 + 1], g, flower.kind[k] === 1 ? 1.5 : 0.65);
        else {
          const u = 4e-3 + 0.992 * r(), v = r() * 2 - 1;
          c.aFlower.push(u, v, g, 0.45);
        }
      }
    }
    for (const [name, c] of Object.entries(channels)) {
      const stride = name === "lines" ? 2 : 1, count = c.position.length / 3;
      c.aMorphBird = Array(c.aBird.length).fill(0);
      c.aMorphEnergy = Array(count).fill(0);
      for (let g = 0; g < BIRDS2; g++) {
        let pair = function(a, b, depth) {
          if (a.length === 1) {
            for (let e = 0; e < stride; e++) {
              const i = a[0] + e, j = b[0] + e;
              c.aMorphBird.splice(i * 4, 4, ...c.aBird.slice(j * 4, j * 4 + 4));
              c.aMorphEnergy[i] = c.aMeta[j * 4 + 3];
            }
            return;
          }
          const axis = depth % 2;
          a.sort((x, y) => src(x, axis) - src(y, axis) || x - y);
          b.sort((x, y) => dst(x, axis) - dst(y, axis) || x - y);
          const half = Math.floor(a.length / 2);
          pair(a.slice(0, half), b.slice(0, half), depth + 1);
          pair(a.slice(half), b.slice(half), depth + 1);
        };
        const f = direction(g), side = [f[2], 0, -f[0]], len = Math.hypot(...side) || 1;
        side.forEach((v, i) => side[i] = v / len);
        const ids = [];
        for (let i = 0; i < count; i += stride) if (c.aMeta[i * 4] === g) ids.push(i);
        const src = (i, axis) => {
          let value = 0;
          for (let e = 0; e < stride; e++) value += c.aFlower[(i + e) * 4 + (axis === 0 ? 1 : 0)];
          return value / stride;
        };
        const dst = (i, axis) => {
          let value = 0;
          for (let e = 0; e < stride; e++) value += c.aBird[(i + e) * 4 + (axis === 0 ? 0 : 2)];
          return value / stride;
        };
        pair(ids, ids.slice(), 0);
      }
    }
    for (const channel of Object.values(channels)) for (const [key, values] of Object.entries(channel)) if (values.some((x) => !Number.isFinite(x))) throw new Error(key + "\u51FA\u73B0\u65E0\u6548\u5750\u6807");
    return { channels, attr, stem, summary: { birds: BIRDS2, snowflakes: BIRDS2 * 3, points: channels.points.position.length / 3, lineSegments: channels.lines.position.length / 6, stemSegments: stem.position.length / 6, sourceSeeds: 112, flowerPetals: BIRDS2 } };
  }
  var clamp = (x) => Math.max(0, Math.min(1, x));
  var sm = (a, b, t) => {
    const u = clamp((t - a) / (b - a));
    return u * u * u * (u * (u * 6 - 15) + 10);
  };
  var mix2 = (a, b, u) => a + (b - a) * u;
  var vecmix = (a, b, u) => a.map((x, i) => mix2(x, b[i], u));
  var hash3 = (x) => {
    const v = Math.sin(x * 127.1 + 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  function physicsAt(data, t) {
    const f = Math.max(0, Math.min(data.frames.length - 1, (t - data.launch) * data.simScale * data.fps)), i = Math.floor(f), u = f - i;
    return data.frames[i].map((p, j) => p.map((v, k) => mix2(v, data.frames[Math.min(i + 1, data.frames.length - 1)][j][k], u)));
  }
  function cameraAt(t, ball, end, track) {
    const flower = [0.6 + Math.sin(Math.min(t, 4.7) * 0.36) * 0.8, 1.6, 10.8], flight = [1.4, 3.2, 16.5], physics = [4.3, 5.8, 17.8];
    let position = vecmix(flower, [1.8, 4.5, 26], sm(5.22, 6.1, t)), target = [0, 0.65, 0], offset = vecmix([-205, 115], [0, 110], sm(5.22, 6.1, t)), fov = 43;
    position = vecmix(position, flight, sm(6.15, 8.05, t));
    offset = vecmix(offset, [-110, 115], sm(6.15, 8.05, t));
    position = vecmix(position, physics, sm(11.7, 14.45, t));
    target = vecmix(target, [-0.5, 2.1, 0], sm(11.7, 14.45, t));
    offset = vecmix(offset, [-80, 110], sm(11.7, 14.45, t));
    const follow = sm(15.45, 18.3, t), close = sm(17.8, 21.1, t), relative = vecmix([3, 3.3, 12.5], [0.5, 1.35, 4.2], close);
    position = vecmix(position, ball.slice(0, 3).map((v, k) => v + relative[k]), follow);
    target = vecmix(target, ball.slice(0, 3), follow);
    offset = vecmix(offset, [-215, 125], follow);
    const sheet = sm(24.45, 25.825, t);
    if (track) {
      const distance = 0.57, aimZ = track.z - 0.65;
      position = vecmix(position, [track.x + 0.65 - 5.85 * distance, 9.3 * distance, aimZ + 13.85 * distance], sheet);
      target = vecmix(target, [track.x + 0.65, 0, aimZ], sheet);
      offset = vecmix(offset, [0, 145], sheet);
    }
    fov = mix2(43, 42, sheet);
    return { position, target, offset, fov };
  }
  async function createScore(scene, end) {
    return { first: [end[0], 0.167, 1], render() {
    }, camera() {
      return null;
    } };
  }
  var THREE = __toESM(require_three(), 1);
  var TAU3 = Math.PI * 2;
  var JOIN = 6.04;
  var END = 14.7;
  var RATE = 240;
  var DT = 1 / RATE;
  var arrival = (g) => 14.15 + hash3(g + 23) * 0.43;
  var targetFor = (g) => g < 20 ? [1.6 + (g % 4 - 1.5) * 0.79, 0.39 + Math.floor(g / 4) * 0.79, 0] : [-5.4 + Math.cos((g - 20) / 5 * TAU3) * 0.52, 5.2 + Math.sin((g - 20) / 5 * TAU3) * 0.52, 0];
  var slot = (g) => [(g % 5 - 2) * 1.48, 0.8 + (2 - Math.floor(g / 5)) * 0.72, Math.sin(g * 0.7) * 0.3];
  var ring = (g) => {
    const a = g / 25 * TAU3;
    return [Math.cos(a) * 3.8, 0.8 + Math.sin(a) * 2.25, Math.sin(a) * 0.35];
  };
  var wave = (g) => [(g - 12) * 0.38, 0.8 + Math.sin(g * 0.32) * 1.62, Math.cos(g * 0.19) * 0.65];
  function travel(a, b, q, g) {
    const u = clamp(q), s = u * u * (3 - 2 * u), arch = Math.sin(Math.PI * u), h = hash3(g + 77);
    return vecmix(a, b, s).map((x, k) => x + (k === 0 ? Math.sin(u * TAU3 + g) * 0.28 : k === 1 ? 1 + h * 0.6 : Math.cos(g * 1.4) * 0.85) * arch * arch);
  }
  function createBirdMotion() {
    const nodes = Array.from({ length: 25 }, () => ({ p: 0 })), runs = nodes.map((n) => anime.animate(n, { p: [0, 1], duration: 1180, ease: "inOutSine", autoplay: false }));
    const tweenNode = { p: 0 }, tween = new TWEEN.Tween(tweenNode).to({ p: 1 }, 1530).easing(TWEEN.Easing.Cubic.InOut);
    const joins = Array.from({ length: 25 }, (_, g) => {
      const a = birdPose(g, JOIN + 1.62).center;
      return { a, v: birdPose(g, JOIN + 1.622).center.map((x, k) => (x - a[k]) / 2e-3), land: 7.78 + hash3(g + 43) * 0.22 };
    });
    function position(g, t) {
      if (t < JOIN) return birdPose(g, t + 1.62).center;
      if (t < 8.3) {
        const { a, v, land } = joins[g], b = slot(g), u = clamp((t - JOIN) / (land - JOIN)), h = land - JOIN;
        return a.map((x, k) => (2 * u ** 3 - 3 * u * u + 1) * x + (u ** 3 - 2 * u * u + u) * h * v[k] + (-2 * u ** 3 + 3 * u * u) * b[k]);
      }
      if (t < 10.1) {
        runs[g].seek(Math.max(0, (t - 8.3) * 1e3 - g * 19));
        return vecmix(slot(g), ring(g), nodes[g].p);
      }
      if (t < 11.8) {
        tweenNode.p = 0;
        tween.start(0);
        tween.update(Math.min(1530, Math.max(0, (t - 10.1) * 1e3)));
        return vecmix(ring(g), wave(g), tweenNode.p);
      }
      const start = 11.8 + hash3(g + 2) * 0.18;
      return travel(wave(g), targetFor(g), (t - start) / (arrival(g) - start), g);
    }
    const count = Math.ceil((END - JOIN) * RATE) + 1, tables = [], forward = new THREE.Vector3(), right = new THREE.Vector3(), up = new THREE.Vector3(), worldUp = new THREE.Vector3(0, 1, 0), localZ = new THREE.Vector3(0, 0, 1), basis = new THREE.Matrix4();
    for (let g = 0; g < 25; g++) {
      const q = new THREE.Quaternion().fromArray(birdPose(g, JOIN + 1.62).rotation).normalize(), target = q.clone(), bankQ = new THREE.Quaternion(), table = new Float32Array(count * 4);
      let heading = new THREE.Vector3(0, 0, 1).applyQuaternion(q);
      heading.y = 0;
      heading.normalize();
      for (let i = 0; i < count; i++) {
        const t = JOIN + i * DT, before = position(g, t - 0.07), after = position(g, t + 0.13);
        forward.fromArray(after).sub(new THREE.Vector3(...before));
        if (forward.length() > 4e-3) {
          const horizontal = Math.hypot(forward.x, forward.z), pitch = Math.atan2(forward.y, horizontal), limited = Math.max(-0.91, Math.min(0.91, pitch));
          const next = horizontal > 6e-3 ? new THREE.Vector3(forward.x / horizontal, 0, forward.z / horizontal) : heading.clone();
          const turn = Math.atan2(heading.z * next.x - heading.x * next.z, heading.dot(next)), bank = Math.max(-0.24, Math.min(0.24, -turn * 15));
          heading.copy(next);
          forward.set(next.x * Math.cos(limited), Math.sin(limited), next.z * Math.cos(limited));
          right.crossVectors(worldUp, forward).normalize();
          up.crossVectors(forward, right).normalize();
          basis.makeBasis(right, up, forward);
          target.setFromRotationMatrix(basis);
          bankQ.setFromAxisAngle(localZ, bank);
          target.multiply(bankQ).normalize();
        }
        if (i) {
          const angle = q.angleTo(target), fraction = Math.min(1 - Math.exp(-10 * DT), Math.PI * DT / Math.max(angle, 1e-9));
          q.slerp(target, fraction).normalize();
        }
        table.set(q.toArray(), i * 4);
      }
      tables.push(table);
    }
    function rotation(g, t) {
      if (t <= JOIN) return birdPose(g, t + 1.62).rotation;
      const f = Math.min(count - 1, (t - JOIN) * RATE), i = Math.floor(f), a = new THREE.Quaternion().fromArray(tables[g], i * 4), b = new THREE.Quaternion().fromArray(tables[g], Math.min(count - 1, i + 1) * 4);
      return a.slerp(b, f - i).normalize().toArray();
    }
    return { position, rotation, sample(g, t) {
      return { position: position(g, t), rotation: rotation(g, t) };
    }, runs, rate: RATE, maximumTurnRadiansPerSecond: Math.PI };
  }
  var TAU4 = Math.PI * 2;
  async function createWorld(canvas) {
    const physics = window.rigidCache, end = physics.frames.at(-1).at(-1), renderer = new THREE2.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(2 / 3);
    renderer.setSize(1440, 1080, false);
    renderer.setClearColor(0, 1);
    renderer.toneMapping = THREE2.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.03;
    const scene = new THREE2.Scene(), camera = new THREE2.PerspectiveCamera(43, 4 / 3, 0.1, 140), composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE2.Vector2(1440, 1080), 0.31, 0.3, 0.88));
    composer.addPass(new OutputPass());
    const poses = new Float32Array(25 * 16), texture = new THREE2.DataTexture(poses, 25, 4, THREE2.RGBAFormat, THREE2.FloatType), uniform = { uClock: { value: 4.2 }, uTime: { value: 0 }, uPose: { value: texture } };
    texture.needsUpdate = true;
    const common = `const float PI=3.14159265359;uniform float uClock,uTime;uniform sampler2D uPose;float sm(float a,float b,float x){float u=clamp((x-a)/(b-a),0.,1.);return u*u*(3.-2.*u);}mat3 rotY(float a){return mat3(cos(a),0.,-sin(a),0.,1.,0.,sin(a),0.,cos(a));}float flowerSqueeze(float t){return 1.-.28*sm(4.70,5.26,uTime);}vec4 pose(float row,float id){return texture2D(uPose,vec2((id+.5)/25.,(row+.5)/4.));}vec3 turn(vec4 q,vec3 p){return p+2.*cross(q.xyz,cross(q.xyz,p)+q.w*p);}`;
    const vertex = common + birdDeformGLSL + aFlowerGLSL + `attribute vec4 aFlower,aMorphBird,aMeta;attribute float aMorphEnergy;attribute vec3 aTarget;uniform float uPoint;varying vec3 vColor;varying float vAlpha;void main(){float g=aMeta.x;vec4 p0=pose(0.,g),p2=pose(2.,g),p3=pose(3.,g);float morph=p3.z,dock=p3.w;vec3 f=grownPetal(vec4(aFlower.xyz,0.),min(uTime,p2.w),uClock);f+=(p0.xyz-p2.xyz)*sm(p2.w,p2.w+.24,uTime);vec3 bird=p0.xyz+turnBird(pose(1.,g),articulateBird(aMorphBird,p3.y))*p3.x;vec3 p=mix(mix(f,bird,morph),aTarget,dock);float white=1.-sm(.05,.9,aFlower.x);vColor=mix(vec3(.13,.41,1.2),vec3(.95,1.1,1.38),white*.8);vColor=mix(vColor,vec3(.45,.85,1.55),morph);vAlpha=mix(mix(.13,.10,uPoint)*aFlower.w,mix(.35,.30,uPoint)*aMorphEnergy,morph);vAlpha*=mix(1.,mix(.015,.05,uPoint),dock)*p0.w;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(2.0/3.0)*(dock>.2?1.4:1.9)*min(1.8,14./-mv.z);}`;
    const fragment = `uniform float uPoint;varying vec3 vColor;varying float vAlpha;void main(){float a=vAlpha;if(uPoint>.5){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;a*=1.-d*d;}gl_FragColor=vec4(vColor,a);}`;
    const data = makeTransitionGeometry(), flowerGroup = new THREE2.Group();
    scene.add(flowerGroup);
    for (const [name, c] of Object.entries(data.channels)) {
      const geo = new THREE2.BufferGeometry(), num = c.position.length / 3, targets = new Float32Array(num * 3), stride = name === "lines" ? 2 : 1;
      for (const key of ["position", "aFlower", "aMorphBird", "aMeta", "aMorphEnergy"]) geo.setAttribute(key, new THREE2.Float32BufferAttribute(c[key], data.attr[key]));
      for (let i = 0; i < num; i++) {
        const g = c.aMeta[i * 4], j = Math.floor(i / stride), e = stride === 2 ? i % 2 : hash3(i);
        let p;
        if (g < 20) {
          const edge = j % 12, axis = Math.floor(edge / 4), side = edge % 4, a = (side & 1 ? 1 : -1) * 0.38, b = (side & 2 ? 1 : -1) * 0.38, v = (e * 2 - 1) * 0.38;
          p = axis === 0 ? [v, a, b] : axis === 1 ? [a, v, b] : [a, b, v];
          p = p.map((x, k) => x + targetFor(g)[k]);
        } else {
          const angle = (j % 100 + e) / 100 * TAU4, az = (g - 20) / 5 * Math.PI;
          p = [-5.4 + Math.cos(angle) * Math.cos(az) * 0.88, 5.2 + Math.sin(angle) * 0.88, Math.cos(angle) * Math.sin(az) * 0.88];
        }
        targets.set(p, i * 3);
      }
      geo.setAttribute("aTarget", new THREE2.BufferAttribute(targets, 3));
      const mat = new THREE2.ShaderMaterial({ uniforms: { ...uniform, uPoint: { value: name === "points" ? 1 : 0 } }, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthWrite: false, blending: THREE2.AdditiveBlending });
      const mesh = name === "points" ? new THREE2.Points(geo, mat) : new THREE2.LineSegments(geo, mat);
      mesh.frustumCulled = false;
      flowerGroup.add(mesh);
    }
    const stemData = lineCoordinates(), uv = [];
    for (let i = 0; i < stemData.vertices; i++) if (stemData.kind[i] === 3) uv.push(...stemData.uv.slice(i * 4, i * 4 + 4));
    const sg = new THREE2.BufferGeometry();
    sg.setAttribute("position", new THREE2.Float32BufferAttribute(new Float32Array(uv.length / 4 * 3), 3));
    sg.setAttribute("aFlower", new THREE2.Float32BufferAttribute(uv, 4));
    const stemMat = new THREE2.ShaderMaterial({ uniforms: { ...uniform, uAlpha: { value: 1 } }, vertexShader: common + aFlowerGLSL + `attribute vec4 aFlower;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(grownPetal(aFlower,0.,uClock),1.);}`, fragmentShader: `uniform float uAlpha;void main(){gl_FragColor=vec4(.25,.48,1.,.17*uAlpha);}`, transparent: true, depthWrite: false, blending: THREE2.AdditiveBlending });
    const stem = new THREE2.LineSegments(sg, stemMat);
    scene.add(stem);
    const cubeGeo = new THREE2.EdgesGeometry(new THREE2.BoxGeometry(0.76, 0.76, 0.76)), ballGeo = wireSphere(0.88), objects = physics.items.map((o) => {
      const m = new THREE2.LineSegments(o.type === "sphere" ? ballGeo : cubeGeo, new THREE2.LineBasicMaterial({ color: new THREE2.Color(o.type === "sphere" ? 0.75 : 0.58, o.type === "sphere" ? 1.15 : 1, o.type === "sphere" ? 1.65 : 1.9), transparent: true, opacity: 0, blending: THREE2.AdditiveBlending }));
      scene.add(m);
      return m;
    });
    const floor = new THREE2.Group();
    scene.add(floor);
    for (let k = 0; k < 15; k++) {
      const v = k - 7;
      for (const axis of [0, 1]) {
        const geo = new THREE2.BufferGeometry().setFromPoints(axis ? [new THREE2.Vector3(-10, -0.02, v), new THREE2.Vector3(10, -0.02, v)] : [new THREE2.Vector3(v, -0.02, -7), new THREE2.Vector3(v, -0.02, 7)]);
        const l = new THREE2.Line(geo, new THREE2.LineBasicMaterial({ color: 2180972, transparent: true, opacity: 0.1 }));
        floor.add(l);
      }
    }
    const score = await createScore(scene, end), birds = createBirdMotion();
    window.__hfAnime = birds.runs;
    let lastState;
    function render(t) {
      const states = physicsAt(physics, t), ball = states.at(-1), cam = cameraAt(t, ball, end, score.camera(t));
      camera.position.fromArray(cam.position);
      camera.lookAt(...cam.target);
      camera.fov = cam.fov;
      camera.setViewOffset(1440, 1080, ...cam.offset, 1440, 1080);
      camera.updateProjectionMatrix();
      uniform.uClock.value = t < 4.7 ? mix2(4.38, 12.53, clamp(t / 4.7)) : mix2(12.53, 14.62, sm(4.7, 5.38, t));
      uniform.uTime.value = t;
      flowerGroup.visible = t < 14.7;
      stem.visible = t < 5.85;
      stemMat.uniforms.uAlpha.value = 1 - sm(5.38, 5.78, t);
      for (let g = 0; g < 25; g++) {
        const original = birdPose(g, t + 1.62), center = birds.position(g, t), rotation = birds.rotation(g, t);
        const dock = sm(arrival(g) - 0.46, arrival(g), t), alpha = 1 - sm(arrival(g) - 0.1, arrival(g) + 0.04, t), flap = mix2(original.flap, Math.sin(t * (8.4 + hash3(g) * 3.2) + g * 2.39) * 0.65, sm(6.04, 6.5, t)) * (1 - dock), start = launchAt2(g) - 1.62;
        poses.set([...center, alpha], g * 4);
        poses.set(rotation, (25 + g) * 4);
        poses.set([...originFor(g), start], (50 + g) * 4);
        poses.set([mix2(original.size, 0.48, sm(6.04, 7.8, t)), flap, sm(start + 8e-3, start + 0.28, t), dock], (75 + g) * 4);
      }
      texture.needsUpdate = true;
      const coating = sm(19.8, 20.7, t), uncoat = sm(24.65, 25.35, t);
      objects.forEach((o, i) => {
        o.position.fromArray(states[i]);
        o.quaternion.fromArray(states[i], 3).normalize();
        o.visible = t < 25.85;
        o.material.opacity = i < 20 ? sm(arrival(i) - 0.1, arrival(i) + 0.04, t) * (1 - sm(18.2, 20.2, t)) * 0.9 : sm(14.1, 14.63, t) * (0.82 * (1 - coating) + uncoat * 0.82);
      });
      const hero = objects.at(-1);
      hero.scale.setScalar(1);
      if (t >= 24.65) {
        const n = score.first;
        hero.position.fromArray(vecmix(ball.slice(0, 3), n, sm(24.65, 25.825, t)));
        hero.position.y += Math.sin(Math.PI * sm(24.65, 25.825, t)) * 0.55;
        hero.scale.setScalar(mix2(1, 0.19, sm(24.65, 25.6, t)));
        hero.visible = t < 25.825;
      }
      floor.visible = t > 12.8 && t < 21;
      floor.children.forEach((o) => o.material.opacity = 0.16 * sm(12.8, 14.5, t) * (1 - sm(19, 21, t)));
      score.render(t);
      composer.render();
      lastState = { t, ball, cam, coating, uncoat, physics: states };
      return lastState;
    }
    return { render, renderer, scene, camera, physics, end, birds, get state() {
      return lastState;
    }, project(p) {
      const v = new THREE2.Vector3(...p).project(camera);
      return [720 + v.x * 720, 540 - v.y * 540];
    }, score };
  }
  function wireSphere(r) {
    const pts = [];
    for (let k = 0; k < 12; k++) for (let j = 0; j < 72; j++) for (let e = 0; e < 2; e++) {
      const a = (j + e) / 72 * TAU4, b = k / 12 * Math.PI;
      pts.push(Math.cos(a) * Math.cos(b) * r, Math.sin(a) * r, Math.cos(a) * Math.sin(b) * r);
    }
    for (let k = 1; k < 6; k++) for (let j = 0; j < 72; j++) for (let e = 0; e < 2; e++) {
      const a = (j + e) / 72 * TAU4, b = k / 6 * Math.PI;
      pts.push(Math.cos(a) * Math.sin(b) * r, Math.cos(b) * r, Math.sin(a) * Math.sin(b) * r);
    }
    const g = new THREE2.BufferGeometry();
    g.setAttribute("position", new THREE2.Float32BufferAttribute(pts, 3));
    return g;
  }
  window.effectReady = createWorld(document.querySelector("canvas")).then((world) => {
    window.drawEffect = (t) => world.render(t);
  });
})();
