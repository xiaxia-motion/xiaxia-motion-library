// 夏夏的AI灵感 · 星云旋涡。原创代码采用 MIT；第三方署名及许可随完整源码包提供。
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
  var T7 = __toESM(require_three(), 1);
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
    constructor(resolution, strength = 1, radius2, threshold) {
      super();
      this.strength = strength;
      this.radius = radius2;
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
  var THREE = __toESM(require_three(), 1);
  var lyrics = [
    [0, 3.42, "\u6211\u66FE\u7ECF\u8D70\u8FC7\u591A\u9065\u8FDC\u7684\u8DEF"],
    [3.46, 6.94, "\u8DE8\u8D8A\u8FC7\u591A\u5C11\u6D77\u6D0B\u53BB\u770B\u4F60"],
    [6.96, 8.9, "\u5B64\u5355\u7684\u9ED1\u591C\u9014\u4E2D"],
    [9.02, 10.62, "\u53EA\u8981\u60F3\u7740\u4F60"],
    [10.72, 13.4, "\u6211\u5C31\u4E0D\u4F1A\u60F6\u6050"],
    [13.74, 17.04, "\u65F6\u5149\u7684\u5CB8\u4E0A\u4EBA\u6765\u4E86\u53C8\u8D70"],
    [17.16, 20.4, "\u79BB\u5F00\u65F6\u4F60\u4E0D\u7528\u8BF4\u6211\u90FD\u61C2"],
    [20.5, 22.3, "\u611F\u8C22\u4F60\u66FE\u8BA9\u6211"],
    [22.3, 25.6, "\u7559\u5728\u4F60\u773C\u4E2D"],
    [27.26, 30.6, "\u6211\u66FE\u7ECF\u8D70\u8FC7\u6700\u9065\u8FDC\u7684\u8DEF"],
    [30.72, 34.12, "\u60F3\u8981\u53BB\u62E5\u62B1\u672A\u6210\u771F\u7684\u68A6"],
    [34.18, 36.26, "\u8FF7\u5931\u7684\u9ED1\u591C\u9014\u4E2D"],
    [36.3, 37.98, "\u53EA\u8981\u60F3\u8D77\u4F60"],
    [38.04, 40.25, "\u5C31\u70B9\u4EAE\u4E86\u661F\u7A7A"],
    [40.94, 44.24, "\u6D41\u6D6A\u7684\u7EB8\u8239\u5FD8\u4E0D\u6389\u6E2F\u53E3"],
    [44.4, 47.78, "\u6E10\u706D\u7684\u82B1\u706B\u5272\u4E0D\u65AD\u5F69\u8679"],
    [47.8, 49.32, "\u4F60\u5C31\u662F\u6211\u5FC3\u4E2D"],
    [49.4, 52.55, "\u6C38\u6052\u7684\u5929\u7A7A"]
  ];
  var SHOT_CUES = Object.freeze({
    lost: lyrics[11][0],
    recall: lyrics[12][0],
    light: lyrics[13][0],
    boat: lyrics[14][0],
    dissolve: 37.05,
    pullback: 0.08
  });
  var SPACE_FLOW = Object.freeze({ wind: [-0.65, 0.16, 0.22], curlAmplitude: 2.4, farMultiplier: 3 });
  var SPACE_FLOW_GLSL = `
vec3 drift(vec3 p,float seed,float layer){
  float depthScale=mix(1.,${SPACE_FLOW.farMultiplier.toFixed(3)},1.-step(.5,layer));
  vec3 wind=vec3(${SPACE_FLOW.wind.map((x) => x.toFixed(3)).join(",")})*uTime;
  vec3 curl=vec3(sin(seed*17.+uTime*.44),cos(seed*31.+uTime*.36),sin(seed*11.+uTime*.39));
  return p+(wind+curl*${SPACE_FLOW.curlAmplitude.toFixed(3)})*depthScale;
}`;
  var LOADING_SWAY_GLSL = `
vec3 loadingSway(float t){
  float phase=t-37.7,weight=1.-e(${SHOT_CUES.boat.toFixed(3)},${(SHOT_CUES.boat + 1.4).toFixed(3)},t);
  return vec3(sin(phase*1.4)*1.1,sin(phase*1.9+.6)*.7,cos(phase*1.1)*.6)*weight;
}`;
  var ENDING = Object.freeze({
    typeAt: 49.05,
    typeStep: 0.105,
    sendAt: 50.7,
    failedAt: 51.55,
    quotaAt: 52.65,
    breakupAt: 54.75,
    freezeAt: 55.25,
    duration: 1664 / 30
  });
  var FOCUS = { openingParticleGain: 0.16, glassOpacity: 0.58, loadingClose: 0.34, loadingLift: 4.5, previewDim: 0.68, detailsDim: 0.38 };
  var SPACE = { seed: 51102, far: 21e3, clouds: 27e3, near: 4800, digits: 900 };
  function createDigitalSpace(scene) {
    let seed = SPACE.seed;
    const random = () => {
      seed = Math.imul(seed, 1664525) + 1013904223 | 0;
      return (seed >>> 0) / 4294967296;
    };
    const group = new THREE.Group();
    group.name = "\u6570\u5B57\u7C92\u5B50\u7A7A\u95F4";
    scene.add(group);
    const uniforms = { uTime: { value: 0 }, uGain: { value: 1 }, uKick: { value: 0 }, uHero: { value: new THREE.Vector3() } };
    const positions = [], seeds = [], sizes = [], layers = [];
    const add = (x, y, z, size, layer) => {
      positions.push(x, y, z);
      seeds.push(random());
      sizes.push(size);
      layers.push(layer);
    };
    for (let i = 0; i < SPACE.far; i++) {
      const a = random() * Math.PI * 2, y = random() * 2 - 1, r = 220 + Math.pow(random(), 0.75) * 1050, s = Math.sqrt(1 - y * y);
      add(Math.cos(a) * s * r, y * r, -230 + Math.sin(a) * s * r, 0.24 + random() * 0.76, 0);
    }
    const centers = [[-48, 30, -100], [66, -28, -190], [-78, -36, -290], [92, 50, -410], [-96, 72, -540], [44, -66, -705], [-48, 86, -885], [-100, 28, 75], [160, -12, -630], [-230, 65, -350], [-340, -95, -460], [-430, 120, -610]];
    const normal = () => random() + random() + random() - 1.5;
    for (let i = 0; i < SPACE.clouds; i++) {
      const c = centers[i % centers.length], u = normal(), v = normal(), w = normal();
      const x = c[0] + u * 74 + w * 34, y = c[1] + v * 48 + Math.sin(w * 2.4 + i % 3) * 10, z = c[2] + w * 185;
      add(x, y, z, 0.19 + random() * 0.48, 1);
    }
    for (let i = 0; i < SPACE.near; i++) {
      const a = random() * Math.PI * 2, r = 7 + Math.pow(random(), 1.6) * 80;
      add(Math.cos(a) * r, 5 + Math.sin(a) * r, 90 - random() * 760, 0.24 + random() * 0.95, 2);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.Float32BufferAttribute(seeds, 1));
    geo.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute("aLayer", new THREE.Float32BufferAttribute(layers, 1));
    const motion = `uniform vec3 uHero;
 ${SPACE_FLOW_GLSL}
 float clarity(vec4 clip,float nearLayer){vec2 p=clip.xy/max(.1,clip.w);vec4 hc=projectionMatrix*modelViewMatrix*vec4(uHero,1.);vec2 delta=(p-hc.xy/max(.1,hc.w))*vec2(1.77778,1.);float focus=1.-(.35+nearLayer*.45)*exp(-dot(delta,delta)/.024);vec2 rect=abs(p-vec2(0.,.128))-vec2(.56,.34);float panel=mix(${FOCUS.openingParticleGain.toFixed(3)},1.,smoothstep(-.04,.09,max(rect.x,rect.y)));return focus*mix(panel,1.,smoothstep(1.76,2.35,uTime));}`;
    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aSeed,aSize,aLayer;uniform float uTime,uGain,uKick;varying vec3 vColor;varying float vAlpha;varying float vNear;${motion}
  void main(){vec3 p=drift(position,aSeed,aLayer);vec4 mv=modelViewMatrix*vec4(p,1.);float depth=-mv.z;float nearFade=smoothstep(1.4,mix(12.,5.,step(1.5,aLayer)),depth);float twinkle=.66+.34*sin(aSeed*47.+uTime*(.4+aSeed*.3));float cloud=step(.5,aLayer)*(1.-step(1.5,aLayer));vNear=step(1.5,aLayer);
  vColor=mix(vec3(.22,.55,1.25),vec3(.6,1.5,2.6),aSeed)*(1.+twinkle*.36+uKick*.07)*(1.+cloud*.6);
  float fog=exp(-max(0.,depth-160.)*.00043);float size=aSize*810./max(3.,depth);gl_PointSize=clamp(size,mix(1.5,1.8,cloud),12.);
  gl_Position=projectionMatrix*mv;vAlpha=nearFade*fog*uGain*(.7+twinkle*.28)*(1.-cloud*.08)*(.8+.2*clamp(size,0.,1.))*(1.-vNear*.35)*clarity(gl_Position,vNear);}
  `,
      fragmentShader: `varying vec3 vColor;varying float vAlpha;varying float vNear;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float core=exp(-d*d*mix(17.,13.,vNear));gl_FragColor=vec4(vColor,core*vAlpha);}`
    });
    const points = new THREE.Points(geo, mat);
    points.name = "\u8FDC\u666F\u661F\u70B9\u3001\u4E2D\u666F\u6570\u636E\u4E91\u3001\u8FD1\u666F\u6563\u7C92";
    points.frustumCulled = false;
    group.add(points);
    const atlas = document.createElement("canvas");
    atlas.width = 256;
    atlas.height = 128;
    const ctx = atlas.getContext("2d");
    ctx.font = "76px monospace";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("0", 64, 66);
    ctx.fillText("1", 192, 66);
    const texture = new THREE.CanvasTexture(atlas);
    texture.generateMipmaps = true;
    const dp = [], ds = [], dz = [];
    for (let i = 0; i < SPACE.digits; i++) {
      const a = random() * Math.PI * 2, r = 12 + Math.pow(random(), 1.25) * 100;
      dp.push(Math.cos(a) * r, 5 + Math.sin(a) * r, 90 - random() * 780);
      ds.push(random());
      dz.push(0.9 + random() * 1.4);
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.Float32BufferAttribute(dp, 3));
    dg.setAttribute("aSeed", new THREE.Float32BufferAttribute(ds, 1));
    dg.setAttribute("aSize", new THREE.Float32BufferAttribute(dz, 1));
    const dm = new THREE.ShaderMaterial({
      uniforms: { ...uniforms, uAtlas: { value: texture } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aSeed,aSize;uniform float uTime,uGain;varying float vDigit,vAlpha;${motion}
  void main(){vec4 mv=modelViewMatrix*vec4(drift(position,aSeed,2.),1.);float depth=-mv.z;float size=aSize*640./max(3.,depth);gl_PointSize=clamp(size,2.,32.);vDigit=step(.5,aSeed);gl_Position=projectionMatrix*mv;vAlpha=smoothstep(2.,8.,depth)*smoothstep(2.,6.,size)*exp(-max(0.,depth-65.)*.006)*uGain*.72*clarity(gl_Position,1.);}`,
      fragmentShader: `uniform sampler2D uAtlas;varying float vDigit,vAlpha;void main(){vec2 uv=vec2((gl_PointCoord.x+vDigit)*.5,gl_PointCoord.y);float a=texture2D(uAtlas,uv).a;gl_FragColor=vec4(vec3(.3,1.,1.5),a*vAlpha);}`
    });
    const digits = new THREE.Points(dg, dm);
    digits.name = "\u60AC\u6D6E\u4E8C\u8FDB\u5236\u788E\u7247";
    digits.frustumCulled = false;
    group.add(digits);
    return { count: SPACE.far + SPACE.clouds + SPACE.near + SPACE.digits, group, update(t, kick, gain = 1, visible = true, hero) {
      uniforms.uTime.value = t;
      uniforms.uKick.value = kick;
      uniforms.uGain.value = gain;
      if (hero) uniforms.uHero.value.copy(hero);
      group.visible = visible;
    } };
  }
  var T = __toESM(require_three(), 1);
  var THREE4 = __toESM(require_three(), 1);
  var STORY = { start: 13.4, away: 19.8, return: 26.86, dream: 30.56, lost: SHOT_CUES.lost, recall: SHOT_CUES.recall, light: SHOT_CUES.light, boat: SHOT_CUES.boat, home: 47.44, send: 50.7, fail: 51.4, modal: 52.65 };
  var entry = [Math.sin(Math.PI * 1.15) * 2.5 * 0.75, 4.6 + Math.sin(Math.PI * 1.15 * 1.2) * 1.2, -342 + Math.cos(Math.PI * 1.15) * 2.5];
  var OPENING = Object.freeze({
    formStart: 0,
    formEnd: 1.9,
    panelFadeStart: 1.76,
    panelReady: 2.05,
    typeStart: 2.75,
    charInterval: 0.18,
    sendAt: 4.63,
    formationBackdrop: 0.5,
    convertStart: 4.75,
    convertEnd: 5.14,
    gatherStart: 5.01,
    gatherEnd: 5.82,
    gatherSoundAt: 5.48,
    departAt: 5.59,
    stages: Object.freeze([6.34, 7.195, 8.05]),
    orbitAt: 6.3,
    brakeAt: 8.89,
    arrivalAt: 10.48
  });
  var clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  var smooth = (a, b, t) => {
    const u = clamp((t - a) / (b - a));
    return u * u * (3 - 2 * u);
  };
  var STAGES = OPENING.stages;
  var SEND = OPENING.sendAt;
  var rampIntegral = (t, s, d = 0.36) => {
    const a = Math.max(0, t - s), u = Math.min(1, a / d);
    return a < d ? d * (u ** 3 - 0.5 * u ** 4) : a - d * 0.5;
  };
  var driven = (t) => 4 * rampIntegral(t, OPENING.departAt, 0.28) + 14 * rampIntegral(t, STAGES[0]) + 24 * rampIntegral(t, STAGES[1]) + 28 * rampIntegral(t, STAGES[2], 0.42);
  var finalDistance = driven(8.89) + 70 * (10.48 - 8.89) / 2;
  var OTHER_SIGNALS_START = lyrics.find((line) => line[2].includes("\u5CB8\u4E0A"))[0];
  var CODE_START = 16.6;
  var CODE_RUNS = [
    { file: "index.html", start: 16.6, end: 18.8, from: 0, to: 1, label: "\u642D\u5EFA\u8BB0\u5F55\u754C\u9762" },
    { file: "style.css", start: 23, end: 24.6, from: 0, to: 1, label: "\u6574\u7406\u5206\u7C7B\u6807\u7B7E" },
    { file: "app.js", start: 28.8, end: 30.4, from: 0, to: 0.7, label: "\u8865\u4E0A\u641C\u7D22\u4EA4\u4E92" },
    { file: "app.js", start: 34.7, end: 36, from: 0.7, to: 1, label: "\u63A5\u5165\u672C\u673A\u4FDD\u5B58" }
  ];
  var DIALOGUE = [
    {
      start: 11.25,
      end: 16.6,
      topic: "\u5148\u628A\u7075\u611F\u6536\u4E0B\u6765",
      questionAt: 11.25,
      answerAt: 13.7,
      question: "\u5148\u505A\u4E2A\u7F51\u9875\uFF0C\n\u5E2E\u6211\u628A\u7075\u611F\u8BB0\u4E0B\u6765\u3002",
      answer: "\u597D\uFF0C\u5148\u505A\u8F93\u5165\u6846\uFF0C\n\u518D\u628A\u7075\u611F\u5217\u51FA\u6765\u3002"
    },
    {
      start: 18.8,
      end: 23,
      kind: "request",
      step: 1,
      topic: "\u8FFD\u52A0\u8981\u6C42 \xB7 \u5206\u7C7B",
      questionAt: 18.8,
      answerAt: 20.1,
      question: "\u7B49\u7B49\uFF0C\u6211\u7684\u70B9\u5B50\u6709\u70B9\u4E71\u3002\n\u89C6\u9891\u3001\u5B66\u4E60\u3001\u5DE5\u5177\uFF0C\u5206\u5F00\u653E\u3002",
      answer: "\u597D\uFF0C\u5206\u597D\u7C7B\u3002\n\u4F60\u7EE7\u7EED\u60F3\uFF0C\u6211\u6765\u6574\u7406\u3002"
    },
    {
      start: 24.6,
      end: 28.8,
      kind: "request",
      step: 2,
      topic: "\u8FFD\u52A0\u8981\u6C42 \xB7 \u641C\u7D22",
      questionAt: 24.6,
      answerAt: 25.9,
      question: "\u8FD8\u6709\uFF0C\u6211\u603B\u8BB0\u4E0D\u4F4F\u653E\u54EA\u4E86\u3002\n\u52A0\u4E2A\u641C\u7D22\uFF0C\u597D\u4E0D\u597D\uFF1F",
      answer: "\u5F53\u7136\u3002\u8BB0\u5F97\u4E00\u4E2A\u8BCD\uFF0C\n\u5C31\u80FD\u628A\u5B83\u627E\u56DE\u6765\u3002"
    },
    {
      start: 30.4,
      end: 34.7,
      kind: "request",
      step: 3,
      topic: "\u8FFD\u52A0\u8981\u6C42 \xB7 \u4FDD\u5B58",
      questionAt: 30.4,
      answerAt: 31.7,
      question: "\u8FD8\u6709\u6700\u540E\u4E00\u4E2A\u9700\u6C42\uFF0C\n\u5237\u65B0\u4EE5\u540E\u4E5F\u522B\u4E22\u3002",
      answer: "\u597D\uFF0C\u8FD9\u6B21\u66FF\u4F60\u5B58\u597D\u3002\n\u4E0B\u6B21\u56DE\u6765\u8FD8\u5728\u3002"
    },
    {
      start: 42.05,
      end: 47.05,
      topic: "\u628A\u5199\u597D\u7684\u4EE3\u7801\uFF0C\u5E26\u56DE\u8EAB\u8FB9",
      questionAt: 42.05,
      answerAt: 44.05,
      question: "\u8BB0\u70B9\u5B50\u3001\u627E\u7075\u611F\uFF0C\n\u90FD\u80FD\u7528\u4E86\uFF1F",
      answer: "\u90FD\u80FD\u7528\u3002\u4E09\u4E2A\u6587\u4EF6\uFF0C\n\u4E00\u8D77\u5E26\u56DE\u6765\u4E86\u3002"
    }
  ];
  var clamp2 = (x) => Math.max(0, Math.min(1, x));
  var ease = (a, b, t) => {
    const u = clamp2((t - a) / (b - a));
    return u * u * u * (u * (u * 6 - 15) + 10);
  };
  var arrivalFocus = (t) => ease(10.48, 11.8, t);
  var generationActivity = (t) => {
    const working = Math.max(0, ...CODE_RUNS.map((p) => ease(p.start, p.start + 0.3, t) * (1 - ease(p.end, p.end + 0.3, t))));
    const received = Math.max(0, ...DIALOGUE.filter((p) => p.kind === "request").map((p) => ease(p.answerAt, p.answerAt + 0.2, t) * (1 - ease(p.answerAt + 0.65, p.answerAt + 1.15, t))));
    return ease(14, CODE_START, t) * (1 - ease(36.9, 39.4, t)) * (0.5 + 0.5 * Math.max(working, received));
  };
  var THREE2 = __toESM(require_three(), 1);
  var TRAFFIC = { start: OTHER_SIGNALS_START, end: 37.05, routes: 18, samples: 36, tail: 42 };
  var clamp3 = (x) => Math.max(0, Math.min(1, x));
  var ease2 = (a, b, t) => {
    const u = clamp3((t - a) / (b - a));
    return u * u * (3 - 2 * u);
  };
  function trafficEnvelope(t) {
    return ease2(TRAFFIC.start, TRAFFIC.start + 0.5, t) * (1 - ease2(36.65, TRAFFIC.end, t));
  }
  function routePhase(t, index) {
    const delay = index * 0.073, cycle = 3.9 + index % 3 * 0.28, travel = 1.65 + index % 4 * 0.12;
    const age = t - TRAFFIC.start - delay;
    return { phase: age < 0 ? -1 : age % cycle, cycle, travel };
  }
  function createNeuralTraffic(group, nodes, perCluster) {
    const targets = Array.from({ length: 9 }, (_, i) => nodes[i * perCluster].clone());
    const pulses = new Float32Array(9), uniforms = { uTraffic: { value: 0 }, uTrafficTime: { value: 0 }, uExternalTargets: { value: targets }, uExternalPulse: { value: pulses } };
    const sources = [], destinations = [], seeds = [], indices = [], lags = [], directions = [];
    const lp = [], li = [], lu = [];
    const center = new THREE2.Vector3(-9, 8, -356);
    const routes = [];
    for (let i = 0; i < TRAFFIC.routes; i++) {
      const a = i / TRAFFIC.routes * Math.PI * 2;
      const direction = new THREE2.Vector3(Math.cos(a), Math.sin(a), Math.sin(i * 2.17) * 0.85).normalize();
      const source = center.clone().addScaledVector(direction, 57 + i % 4 * 7);
      const target = targets[Math.floor(i / 2)], bend = new THREE2.Vector3(-direction.y, direction.x, Math.cos(a) * 0.3).multiplyScalar(6 + i % 3 * 3);
      routes.push({ source, target, bend });
      for (let d = 0; d < 2; d++) for (let j = 0; j < TRAFFIC.tail; j++) {
        sources.push(...source.toArray());
        destinations.push(...target.toArray());
        seeds.push(...bend.toArray());
        indices.push(i);
        lags.push(j * 48e-4);
        directions.push(d);
      }
      for (let j = 0; j < TRAFFIC.samples; j++) for (const u of [j / TRAFFIC.samples, (j + 1) / TRAFFIC.samples]) {
        const p = source.clone().lerp(target, u).addScaledVector(bend, Math.sin(u * Math.PI));
        lp.push(...p.toArray());
        li.push(i);
        lu.push(u);
      }
    }
    const geo = new THREE2.BufferGeometry();
    for (const [n, v, s] of [["position", sources, 3], ["aTarget", destinations, 3], ["aBend", seeds, 3], ["aRoute", indices, 1], ["aLag", lags, 1], ["aDirection", directions, 1]]) geo.setAttribute(n, new THREE2.Float32BufferAttribute(v, s));
    const material = new THREE2.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE2.AdditiveBlending,
      vertexShader: `attribute vec3 aTarget,aBend;attribute float aRoute,aLag,aDirection;uniform float uTraffic,uTrafficTime;varying float vAlpha;varying vec3 vColor;
  void main(){float age=uTrafficTime-aRoute*.073;float travel=1.65+mod(aRoute,4.)*.12;float phase=mod(max(0.,age),3.9+mod(aRoute,3.)*.28);float outbound=step(.5,aDirection);float duration=mix(travel,1.05,outbound);float local=(phase-outbound*(travel+.5))/duration-aLag;float u=mix(local,1.-local,outbound);vec3 p=mix(position,aTarget,clamp(u,0.,1.))+aBend*sin(clamp(u,0.,1.)*3.14159265);vec4 mv=modelViewMatrix*vec4(p,1.);vAlpha=uTraffic*step(0.,age)*step(0.,local)*(1.-step(1.,local))*exp(-aLag*14.)*mix(.96,.48,outbound);vColor=mix(vec3(.5,1.6,2.6),vec3(1.05,.7,1.8),outbound);gl_PointSize=clamp(mix(.28+exp(-aLag*90.)*.55,.16+exp(-aLag*90.)*.22,outbound)*650./max(4.,-mv.z),1.2,9.);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying float vAlpha;varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vColor,exp(-d*d*32.)*vAlpha);}`
    });
    const points = new THREE2.Points(geo, material);
    points.name = "\u6765\u81EA\u56DB\u9762\u516B\u65B9\u7684\u8BF7\u6C42\u4E0E\u54CD\u5E94";
    points.frustumCulled = false;
    group.add(points);
    const guideGeo = new THREE2.BufferGeometry();
    guideGeo.setAttribute("position", new THREE2.Float32BufferAttribute(lp, 3));
    guideGeo.setAttribute("aRoute", new THREE2.Float32BufferAttribute(li, 1));
    guideGeo.setAttribute("aU", new THREE2.Float32BufferAttribute(lu, 1));
    const guideMat = new THREE2.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE2.AdditiveBlending,
      vertexShader: `attribute float aRoute,aU;uniform float uTraffic,uTrafficTime;varying float vAlpha;void main(){vAlpha=uTraffic*.045*step(aRoute*.073,uTrafficTime)*smoothstep(0.,.18,aU);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying float vAlpha;void main(){gl_FragColor=vec4(.16,.48,.75,vAlpha);}`
    });
    const guides = new THREE2.LineSegments(guideGeo, guideMat);
    guides.name = "\u65C1\u652F\u8BF7\u6C42\u7684\u7A7A\u95F4\u8DEF\u5F84";
    guides.frustumCulled = false;
    group.add(guides);
    return { uniforms, pointCount: indices.length, routeCount: routes.length, update(t) {
      const visible = trafficEnvelope(t);
      points.visible = guides.visible = visible > 0;
      uniforms.uTraffic.value = visible;
      uniforms.uTrafficTime.value = t - TRAFFIC.start;
      pulses.fill(0);
      for (let i = 0; i < TRAFFIC.routes; i++) {
        const { phase, travel } = routePhase(t, i);
        const age = phase - travel;
        const activity = age >= 0 && age < 0.8 ? Math.sin(age / 0.8 * Math.PI) : 0;
        pulses[Math.floor(i / 2)] = Math.max(pulses[Math.floor(i / 2)], activity * visible);
      }
    } };
  }
  var THREE3 = __toESM(require_three(), 1);
  var CODE_FILES = [
    {
      "name": "index.html",
      "start": 16.6,
      "end": 18.8,
      "color": "#a8d3ff",
      "source": '<!doctype html>\n<html lang="zh-CN">\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>\u7075\u611F\u6536\u96C6\u7BB1</title>\n<link rel="stylesheet" href="style.css">\n<main>\n  <header>\n    <span class="mark">\u2726</span>\n    <div><h1>\u7075\u611F\u6536\u96C6\u7BB1</h1>\n      <p>\u5148\u8BB0\u4E0B\u6765\uFF0C\u8BA9\u597D\u70B9\u5B50\u7559\u4E0B\u6765\u3002</p></div>\n  </header>\n  <form id="idea-form">\n    <label class="sr" for="idea-title">\u65B0\u7075\u611F</label>\n    <input id="idea-title" maxlength="80"\n      placeholder="\u8BB0\u4E0B\u521A\u521A\u60F3\u5230\u7684\u70B9\u5B50\u2026" required>\n    <label class="sr" for="idea-tag">\u5206\u7C7B</label>\n    <select id="idea-tag">\n      <option>\u89C6\u9891</option><option>\u5B66\u4E60</option>\n      <option>\u5DE5\u5177</option>\n    </select>\n    <button type="submit">\u8BB0\u4E0B\u6765</button>\n  </form>\n  <section class="tools">\n    <div id="tag-filters" aria-label="\u6309\u6807\u7B7E\u7B5B\u9009"></div>\n    <label class="sr" for="search">\u641C\u7D22\u7075\u611F</label>\n    <input id="search" type="search"\n      placeholder="\u641C\u7D22\u7075\u611F\u2026">\n  </section>\n  <section id="ideas" aria-label="\u7075\u611F\u5217\u8868"></section>\n  <footer id="status" aria-live="polite"></footer>\n</main>\n<script type="module" src="app.js"><\/script>\n</html>\n',
      "sha256": "210c94dfda8f284342fe19bd4196341e92e583a7f7f891cac0b654875e12e31d"
    },
    {
      "name": "style.css",
      "start": 23,
      "end": 24.6,
      "color": "#c5baff",
      "source": "@font-face {\n  font-family: FilmChinese;\n  src: url('../assets/HiraginoSansGB.ttc');\n}\n* { box-sizing: border-box; }\nbody {\n  margin: 0; padding: 24px;\n  background: #edf2f0; color: #203e47;\n  font-family: FilmChinese, sans-serif;\n}\nmain { max-width: 960px; margin: auto; }\nheader { display: flex; gap: 18px; align-items: center; }\n.mark { font-size: 48px; color: #497c79; }\nh1 { margin: 0; font-size: 32px; }\np { margin: 8px 0 20px; color: #6b7f81; }\nform { display: flex; gap: 10px; margin: 12px 0 22px; }\ninput, select, button {\n  border: 1px solid #cbd9d5;\n  border-radius: 9px; padding: 12px 14px;\n  font: inherit; font-size: 17px;\n}\ninput { min-width: 0; background: #fff; }\n#idea-title { flex: 1; }\nbutton { cursor: pointer; }\nbutton[type=submit] {\n  background: #244e58; color: #fff;\n  border-color: #244e58;\n}\n.tools { display: flex; justify-content: space-between; gap: 18px; }\n#tag-filters { display: flex; gap: 8px; }\n#tag-filters button { background: transparent; padding: 9px 15px; }\n#tag-filters button[aria-pressed=true] {\n  background: #d8e7e0; border-color: #719a8f;\n}\n#search { width: 215px; }\n#ideas { display: grid; gap: 12px; margin-top: 20px; }\n.idea {\n  display: flex; align-items: center; gap: 18px;\n  background: #fff; border: 1px solid #d6e1dc;\n  border-radius: 12px; padding: 17px 20px;\n}\n.idea-tag {\n  color: #557b71; background: #e6f0e9;\n  padding: 5px 11px; border-radius: 6px;\n}\n.idea-title { margin: 0; font-size: 19px; }\nfooter { margin-top: 18px; font-size: 14px; color: #6f8183; }\n.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }\n@media (max-width: 620px) {\n  body { padding: 18px; }\n  form { flex-wrap: wrap; }\n  #idea-title { flex-basis: 100%; }\n  .tools { flex-direction: column; }\n  #search { width: 100%; }\n}\n",
      "sha256": "2dcae80cd3fddcb1de271c88e71a409a08d40e93cce747b06da5741e2dcd6623"
    },
    {
      "name": "app.js",
      "start": 28.8,
      "end": 36,
      "color": "#f1d398",
      "source": "// \u6570\u636E\u548C\u754C\u9762\u5206\u5F00\uFF0C\u4FDD\u5B58\u3001\u5206\u7C7B\u3001\u641C\u7D22\u53EF\u4EE5\u72EC\u7ACB\u68C0\u67E5\u3002\nexport const initialIdeas = [\n  { id: 'a', title: '\u628A\u6211\u7684\u60F3\u6CD5\u53D8\u6210\u4E00\u4E2A\u5C0F\u5DE5\u5177', tag: '\u5DE5\u5177' },\n  { id: 'b', title: '\u8BB0\u5F55\u6211\u548C AI \u4E00\u8D77\u521B\u4F5C\u7684\u8FC7\u7A0B', tag: '\u89C6\u9891' },\n  { id: 'c', title: '\u6BCF\u5929\u5B66\u4F1A\u4E00\u4E2A AI \u5C0F\u6280\u5DE7', tag: '\u5B66\u4E60' }\n];\nif (typeof document !== 'undefined') {\n  const byId = id => document.getElementById(id);\n  const film = new URLSearchParams(location.search).has('film');\n  // \u7247\u4E2D\u9884\u89C8\u4F7F\u7528\u56FA\u5B9A\u5185\u5BB9\uFF0C\u4E0D\u8BFB\u5199\u89C2\u4F17\u7684\u771F\u5B9E\u8BB0\u5F55\u3002\n  const store = film ? {\n    getItem: () => null, setItem: () => {}\n  } : localStorage;\n  const notebook = createNotebook(\n    store, 'xiaxia-inspiration-v1', initialIdeas\n  );\n  let activeTag = '\u5168\u90E8';\n  function render() {\n    const result = notebook.list(\n      byId('search').value, activeTag\n    );\n    const list = byId('ideas');\n    list.replaceChildren();\n    for (const idea of result) {\n      const row = document.createElement('article');\n      row.className = 'idea';\n      const tag = document.createElement('span');\n      tag.className = 'idea-tag';\n      tag.textContent = idea.tag;\n      const title = document.createElement('h2');\n      title.className = 'idea-title';\n      title.textContent = idea.title;\n      row.append(tag, title); list.append(row);\n    }\n    byId('status').textContent = result.length\n      ? `${result.length} \u6761\u7075\u611F \xB7 \u8BB0\u5F55\u4EC5\u4FDD\u5B58\u5728\u672C\u673A`\n      : '\u8FD8\u6CA1\u627E\u5230\uFF0C\u6362\u4E2A\u5173\u952E\u8BCD\u8BD5\u8BD5\u3002';\n  }\n  for (const tag of ['\u5168\u90E8', '\u89C6\u9891', '\u5B66\u4E60', '\u5DE5\u5177']) {\n    const button = document.createElement('button');\n    button.textContent = tag;\n    button.setAttribute('aria-pressed', tag === activeTag);\n    button.addEventListener('click', () => {\n      activeTag = tag;\n      for (const sibling of byId('tag-filters').children)\n        sibling.setAttribute('aria-pressed', sibling === button);\n      render();\n    });\n    byId('tag-filters').append(button);\n  }\n  byId('idea-form').addEventListener('submit', event => {\n    event.preventDefault();\n    try {\n      if (notebook.add(byId('idea-title').value,\n        byId('idea-tag').value)) {\n        byId('idea-title').value = '';\n        byId('search').value = ''; activeTag = '\u5168\u90E8';\n        for (const button of byId('tag-filters').children)\n          button.setAttribute('aria-pressed', button.textContent === '\u5168\u90E8');\n        render();\n      }\n    } catch {\n      byId('status').textContent = '\u6682\u65F6\u65E0\u6CD5\u4FDD\u5B58\uFF0C\u8BF7\u4FDD\u7559\u8F93\u5165\u540E\u91CD\u8BD5\u3002';\n    }\n  });\n  byId('search').addEventListener('input', render);\n  render();\n}\n\nexport function createNotebook(storage, key, seed = []) {\n  let ideas;\n  try { ideas = JSON.parse(storage.getItem(key)); }\n  catch { ideas = null; }\n  if (!Array.isArray(ideas)) ideas = seed;\n  ideas = ideas.filter(x => x &&\n    typeof x.title === 'string' &&\n    typeof x.tag === 'string');\n  return {\n    list(query = '', tag = '\u5168\u90E8') {\n      const word = query.trim().toLowerCase();\n      return ideas.filter(idea =>\n        (tag === '\u5168\u90E8' || idea.tag === tag) &&\n        idea.title.toLowerCase().includes(word)\n      ).map(idea => ({ ...idea }));\n    },\n    add(title, tag) {\n      title = title.trim().slice(0, 80);\n      if (!title) return false;\n      const next = [{ id: crypto.randomUUID(),\n        title, tag }, ...ideas];\n      storage.setItem(key, JSON.stringify(next));\n      ideas = next;\n      return true;\n    }\n  };\n}\n",
      "sha256": "fd4a26adee713baa5dd4b885b94a518e2438f426a17a569dbb41007934535545"
    }
  ];
  var CODE_PANEL = { left: 100, top: 130, width: 820, height: 720, dissolve: 37.05 };
  var MAIN_ROUTE = { samplesPerEdge: 8, tail: 0.19, codeWidth: 174, codeHeight: 29, outputX: CODE_PANEL.left + CODE_PANEL.width + 8, outputY: 480 };
  var clamp4 = (x) => Math.max(0, Math.min(1, x));
  var ease4 = (a, b, t) => {
    const u = clamp4((t - a) / (b - a));
    return u * u * u * (u * (u * 6 - 15) + 10);
  };
  var edgeKey = (a, b) => `${Math.min(a, b)}:${Math.max(a, b)}`;
  function graphRoute(nodes, edges, perCluster) {
    const graph = nodes.map(() => []);
    for (const [a, b] of edges) {
      const d = nodes[a].distanceTo(nodes[b]);
      graph[a].push([b, d]);
      graph[b].push([a, d]);
    }
    const nearest = (p, cluster) => {
      const start = cluster === void 0 ? 0 : cluster * perCluster, end = cluster === void 0 ? nodes.length - 1 : start + perCluster;
      let id = start, d = Infinity;
      for (let i = start; i < end; i++) {
        const n = nodes[i].distanceToSquared(p);
        if (n < d) {
          d = n;
          id = i;
        }
      }
      return id;
    };
    const anchors = [nodes.length - 1, nearest(new THREE3.Vector3(4, 10, -336), 8), nearest(new THREE3.Vector3(1, 22, -357), 2), nearest(new THREE3.Vector3(-12, 15, -375), 5), nearest(new THREE3.Vector3(-19, 20, -349), 1), nearest(new THREE3.Vector3(-22, 4, -337), 0)];
    const path = [anchors[0]];
    for (let k = 1; k < anchors.length; k++) {
      const from = path.at(-1), to = anchors[k], dist = nodes.map(() => Infinity), prev = nodes.map(() => -1), used = /* @__PURE__ */ new Set();
      dist[from] = 0;
      for (let step = 0; step < nodes.length; step++) {
        let best = -1;
        for (let i = 0; i < nodes.length; i++) if (!used.has(i) && (best < 0 || dist[i] < dist[best])) best = i;
        if (best < 0 || !Number.isFinite(dist[best])) throw new Error("\u4E3B\u8BF7\u6C42\u795E\u7ECF\u8DEF\u5F84\u4E0D\u8FDE\u901A");
        if (best === to) break;
        used.add(best);
        for (const [next, d] of graph[best]) if (dist[best] + d < dist[next]) {
          dist[next] = dist[best] + d;
          prev[next] = best;
        }
      }
      const segment = [];
      for (let p = to; p !== from; p = prev[p]) {
        if (p < 0) throw new Error("\u4E3B\u8BF7\u6C42\u8DEF\u5F84\u56DE\u6EAF\u5931\u8D25");
        segment.push(p);
      }
      path.push(...segment.reverse());
    }
    return path;
  }
  function createMainRequestFlow(group, nodes, edges, edgeCurves, perCluster, camera) {
    const path = graphRoute(nodes, edges, perCluster), points = [nodes[path[0]].clone()], nodeIndices = [0];
    for (let i = 1; i < path.length; i++) {
      const a = nodes[path[i - 1]], b = nodes[path[i]], bend = edgeCurves.get(edgeKey(path[i - 1], path[i]));
      if (!bend) throw new Error("\u91D1\u8272\u8DEF\u5F84\u8131\u79BB\u73B0\u6709\u7A81\u89E6");
      for (let j = 1; j <= MAIN_ROUTE.samplesPerEdge; j++) {
        const u = j / MAIN_ROUTE.samplesPerEdge;
        points.push(a.clone().lerp(b, u).addScaledVector(bend, Math.sin(u * Math.PI)));
      }
      nodeIndices.push(points.length - 1);
    }
    const lengths = [0];
    for (let i = 1; i < points.length; i++) lengths.push(lengths.at(-1) + points[i].distanceTo(points[i - 1]));
    const total = lengths.at(-1), uniforms = { uTime: { value: 0 }, uProgress: { value: 0 }, uVisible: { value: 0 }, uWorking: { value: 0 } };
    const common = `uniform float uTime,uProgress,uVisible,uWorking;attribute float aU;varying float vAlpha;varying vec3 vColor;
 vec3 living(vec3 p){return p+vec3(sin(p.y*.13+uTime*.42),sin(p.z*.11+uTime*.32),sin(p.x*.16+uTime*.27))*.16;}
 float pulse(){float head=exp(-pow((aU-uProgress)/.035,2.));float tail=smoothstep(-.01,.025,uProgress-aU)*(1.-smoothstep(.03,${MAIN_ROUTE.tail},uProgress-aU));float work=uWorking*pow(max(0.,sin(aU*24.-uTime*5.)),12.);return max(head+tail*.55,work*.55);}`;
    const routeGeometry = new THREE3.BufferGeometry().setFromPoints(points);
    routeGeometry.setAttribute("aU", new THREE3.Float32BufferAttribute(lengths.map((x) => x / total), 1));
    const lineMaterial = new THREE3.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE3.AdditiveBlending,
      vertexShader: `${common}void main(){float p=pulse();vColor=mix(vec3(1.1,.34,.045),vec3(3.,1.55,.34),p);vAlpha=uVisible*(.22+p*.78);gl_Position=projectionMatrix*modelViewMatrix*vec4(living(position),1.);}`,
      fragmentShader: "varying float vAlpha;varying vec3 vColor;void main(){gl_FragColor=vec4(vColor,vAlpha);}"
    });
    const line = new THREE3.Line(routeGeometry, lineMaterial);
    line.name = "\u590F\u590F\u7684\u91D1\u8272\u8BF7\u6C42 \xB7 \u5B9E\u9645\u7A81\u89E6\u8DEF\u5F84";
    line.frustumCulled = false;
    group.add(line);
    const nodeGeometry = new THREE3.BufferGeometry().setFromPoints(path.map((i) => nodes[i]));
    nodeGeometry.setAttribute("aU", new THREE3.Float32BufferAttribute(nodeIndices.map((i) => lengths[i] / total), 1));
    const nodeMaterial = new THREE3.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE3.AdditiveBlending,
      vertexShader: `${common}void main(){float p=pulse();vColor=vec3(3.,1.75,.55);vAlpha=uVisible*(.1+p*.9);vec4 mv=modelViewMatrix*vec4(living(position),1.);gl_PointSize=clamp((.25+p*.65)*690./max(2.,-mv.z),2.,13.);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: "varying float vAlpha;varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vColor,exp(-d*d*30.)*vAlpha);}"
    });
    const activeNodes = new THREE3.Points(nodeGeometry, nodeMaterial);
    activeNodes.name = "\u4E3B\u8BF7\u6C42\u9010\u7EA7\u70B9\u4EAE\u7684\u795E\u7ECF\u5143";
    activeNodes.frustumCulled = false;
    group.add(activeNodes);
    const outputGroup = new THREE3.Group();
    outputGroup.name = "\u795E\u7ECF\u51FA\u53E3\u5230\u771F\u5B9E\u4EE3\u7801\u7F16\u8F91\u5668";
    group.add(outputGroup);
    const bridgeArray = new Float32Array(65 * 3), bridgeGeometry = new THREE3.BufferGeometry();
    bridgeGeometry.setAttribute("position", new THREE3.BufferAttribute(bridgeArray, 3));
    const bridgeMaterial = new THREE3.LineBasicMaterial({ color: new THREE3.Color(1.45, 0.64, 0.13), transparent: true, opacity: 0, depthWrite: false, blending: THREE3.AdditiveBlending });
    const bridge = new THREE3.Line(bridgeGeometry, bridgeMaterial);
    bridge.frustumCulled = false;
    outputGroup.add(bridge);
    const fragments = CODE_FILES.map((file) => {
      const lines = file.source.split("\n").map((x) => x.trim()).filter((x) => x.length > 14);
      return [0, 0.4, 0.75].map((fraction, i) => {
        const text = lines[Math.min(lines.length - 1, Math.floor(lines.length * fraction))].slice(0, 24);
        const canvas = document.createElement("canvas");
        canvas.width = 384;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        ctx.font = "27px monospace";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffe1a6";
        ctx.fillText(text, 8, 32);
        const texture = new THREE3.CanvasTexture(canvas);
        texture.colorSpace = THREE3.SRGBColorSpace;
        const material = new THREE3.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false, toneMapped: false });
        const sprite = new THREE3.Sprite(material);
        sprite.name = `\u771F\u5B9E\u4EE3\u7801\u6D41 ${file.name} ${i + 1}`;
        sprite.renderOrder = 3;
        sprite.userData.source = text;
        outputGroup.add(sprite);
        return sprite;
      });
    });
    const codeAt = CODE_RUNS.map((run, i) => ({ ...run, requestAt: i === 0 ? 10.48 : DIALOGUE.filter((p) => p.kind === "request")[i - 1].questionAt }));
    const from = new THREE3.Vector3(), to = new THREE3.Vector3(), mid = new THREE3.Vector3(), forward = new THREE3.Vector3(), cameraSpace = new THREE3.Vector3();
    const pointAt = (u, out) => out.copy(from).multiplyScalar((1 - u) * (1 - u)).addScaledVector(mid, 2 * u * (1 - u)).addScaledVector(to, u * u);
    const diagnostics = { pathNodeIds: path, pathEdges: path.slice(1).map((id, i) => [path[i], id]), nodeCount: path.length, pointCount: points.length, length: total, fragments: fragments.flat().map((s) => s.userData.source) };
    return { diagnostics, update(t, gain) {
      const index = Math.max(0, codeAt.findLastIndex((run2) => t >= run2.requestAt)), run = codeAt[index];
      const visible = ease4(10.48, 10.78, t) * (1 - ease4(36.2, 37.05, t)) * gain;
      const working = ease4(run.start, run.start + 0.15, t) * (1 - ease4(run.end - 0.15, run.end, t));
      uniforms.uTime.value = t;
      uniforms.uVisible.value = visible;
      uniforms.uProgress.value = ease4(run.requestAt, run.start, t);
      uniforms.uWorking.value = working;
      line.visible = activeNodes.visible = visible > 1e-3;
      outputGroup.visible = working > 1e-3;
      bridgeMaterial.opacity = working * 0.48;
      fragments.flat().forEach((sprite) => {
        sprite.visible = false;
      });
      if (!outputGroup.visible) return;
      from.copy(nodes[path.at(-1)]);
      from.add(new THREE3.Vector3(Math.sin(from.y * 0.13 + t * 0.42), Math.sin(from.z * 0.11 + t * 0.32), Math.sin(from.x * 0.16 + t * 0.27)).multiplyScalar(0.16));
      forward.set(0, 0, -1).applyQuaternion(camera.quaternion);
      to.set(MAIN_ROUTE.outputX / 1920 * 2 - 1, 1 - MAIN_ROUTE.outputY / 1080 * 2, 0.5).unproject(camera).sub(camera.position).normalize();
      to.multiplyScalar(28 / to.dot(forward)).add(camera.position);
      mid.copy(from).lerp(to, 0.55);
      mid.y += 4;
      for (let i = 0; i < 65; i++) pointAt(i / 64, cameraSpace).toArray(bridgeArray, i * 3);
      bridgeGeometry.attributes.position.needsUpdate = true;
      const fileIndex = CODE_FILES.findIndex((file) => file.name === run.file);
      fragments[fileIndex].forEach((sprite, i) => {
        const cycle = (t - run.start) * 1.25;
        if (i !== Math.floor(cycle) % 3) return;
        const u = cycle % 1;
        pointAt(u, sprite.position);
        sprite.visible = true;
        sprite.material.opacity = working * ease4(0, 0.12, u) * (1 - ease4(0.82, 1, u));
        cameraSpace.copy(sprite.position).applyMatrix4(camera.matrixWorldInverse);
        const unit2 = 2 * Math.max(1, -cameraSpace.z) * Math.tan(THREE3.MathUtils.degToRad(camera.fov / 2)) / 1080;
        sprite.scale.set(MAIN_ROUTE.codeWidth * unit2, MAIN_ROUTE.codeHeight * unit2, 1);
      });
    } };
  }
  var NEURAL = { seed: 11937, center: [-9, 8, -356], scale: [23, 24, 29], perCluster: 74, neighbors: 4, curveSteps: 8 };
  function createNeuralNetwork(scene, entry2, camera) {
    let state = NEURAL.seed;
    const rand = () => {
      state = Math.imul(state, 1664525) + 1013904223 | 0;
      return (state >>> 0) / 4294967296;
    };
    const clusters = [[0.12, 0.12, 0.72], [-0.48, 0.5, 0.24], [0.46, 0.51, -0.05], [-0.4, -0.44, 0.12], [0.41, -0.4, -0.4], [-0.12, 0.3, -0.63], [0.04, -0.1, -0.05], [-0.68, 0.04, -0.28], [0.62, 0.02, 0.35]];
    const nodes = [];
    for (let c = 0; c < clusters.length; c++) for (let i = 0; i < NEURAL.perCluster; i++) {
      const r = Math.cbrt(rand()) * 0.37, z = rand() * 2 - 1, a = rand() * Math.PI * 2, h = Math.sqrt(1 - z * z);
      const v = [Math.cos(a) * h * r, z * r, Math.sin(a) * h * r];
      nodes.push(new THREE4.Vector3(...v.map((x, k) => NEURAL.center[k] + (clusters[c][k] + x) * NEURAL.scale[k])));
    }
    nodes.push(entry2.clone());
    const edgeSet = /* @__PURE__ */ new Set(), edges = [];
    const connect = (a, b) => {
      const key = [Math.min(a, b), Math.max(a, b)].join(":");
      if (a !== b && !edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([a, b]);
      }
    };
    for (let i = 0; i < nodes.length; i++) {
      const nearest = nodes.map((p, j) => ({ j, d: j === i ? Infinity : p.distanceToSquared(nodes[i]) })).sort((a, b) => a.d - b.d);
      for (let j = 0; j < NEURAL.neighbors; j++) connect(i, nearest[j].j);
    }
    for (let c = 1; c < clusters.length; c++) for (let k = 0; k < 12; k++) {
      const a = c * NEURAL.perCluster + k * 5;
      const candidates = nodes.slice(0, c * NEURAL.perCluster).map((p, j) => ({ j, d: p.distanceToSquared(nodes[a]) })).sort((a2, b) => a2.d - b.d);
      connect(a, candidates[k % 3].j);
    }
    const positions = [], seeds = [], sizes = [];
    for (const p of nodes) {
      positions.push(p.x, p.y, p.z);
      seeds.push(rand());
      sizes.push(0.3 + rand() * 0.4);
    }
    const linePositions = [], lineSeeds = [], lineDistances = [];
    const edgeCurves = /* @__PURE__ */ new Map();
    const starts = [], ends = [], bends = [], flowSeeds = [], flowDistances = [], flowClusters = [], lags = [];
    for (const [ai, bi] of edges) {
      const a = nodes[ai], b = nodes[bi], seed = rand(), bend = new THREE4.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(Math.min(2.5, a.distanceTo(b) * 0.23));
      edgeCurves.set(`${Math.min(ai, bi)}:${Math.max(ai, bi)}`, bend.clone());
      const point = (u) => a.clone().lerp(b, u).addScaledVector(bend, Math.sin(u * Math.PI));
      for (let j = 0; j < 4; j++) {
        starts.push(...a.toArray());
        ends.push(...b.toArray());
        bends.push(...bend.toArray());
        flowSeeds.push(seed);
        flowDistances.push(a.distanceTo(entry2));
        flowClusters.push(Math.min(8, Math.floor(ai / NEURAL.perCluster)));
        lags.push(j * 0.028);
      }
      for (let j = 0; j < NEURAL.curveSteps; j++) for (const u of [j / NEURAL.curveSteps, (j + 1) / NEURAL.curveSteps]) {
        const p = point(u);
        linePositions.push(p.x, p.y, p.z);
        lineSeeds.push(seed);
        lineDistances.push(p.distanceTo(entry2));
      }
    }
    const group = new THREE4.Group();
    group.name = "GPT \u5DE8\u578B\u795E\u7ECF\u7F51\u7EDC";
    scene.add(group);
    const traffic = createNeuralTraffic(group, nodes, NEURAL.perCluster);
    const mainRequest = createMainRequestFlow(group, nodes, edges, edgeCurves, NEURAL.perCluster, camera);
    const uniforms = { ...traffic.uniforms, uTime: { value: 0 }, uReveal: { value: 0 }, uFocus: { value: 0 }, uCompute: { value: 0 }, uEntry: { value: entry2.clone() } };
    const field = `
 uniform float uTime,uReveal,uFocus,uCompute;uniform vec3 uEntry;
 uniform vec3 uExternalTargets[9];uniform float uExternalPulse[9];
 vec3 living(vec3 p){return p+vec3(sin(p.y*.13+uTime*.42),sin(p.z*.11+uTime*.32),sin(p.x*.16+uTime*.27))*.16;}
 float computation(vec3 p){float front=mod(max(0.,uTime-14.)*22.,72.);return uCompute*exp(-pow((length(p-uEntry)-front)/5.5,2.));}
 float arrival(vec3 p){float age=uTime-10.48;return step(0.,age)*exp(-pow((length(p-uEntry)-age*22.)/4.5,2.));}
 float externalActivity(vec3 p,float cluster){int i=int(cluster);return uExternalPulse[i]*exp(-dot(p-uExternalTargets[i],p-uExternalTargets[i])*.013);}
 `;
    const lineGeo = new THREE4.BufferGeometry();
    lineGeo.setAttribute("position", new THREE4.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("aSeed", new THREE4.Float32BufferAttribute(lineSeeds, 1));
    lineGeo.setAttribute("aDistance", new THREE4.Float32BufferAttribute(lineDistances, 1));
    const lineMat = new THREE4.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE4.AdditiveBlending,
      vertexShader: `attribute float aSeed,aDistance;varying vec3 vColor;varying float vAlpha;${field}
  void main(){vec3 p=living(position);vec4 mv=modelViewMatrix*vec4(p,1.);float pulse=pow(max(0.,sin(aDistance*.63-uTime*3.8+aSeed*18.)),24.);float wave=arrival(position)+computation(position)*.7;float depth=exp(-max(0.,-mv.z-26.)*.025);vColor=mix(vec3(.09,.42,.52),vec3(.22,1.02,.93),uFocus);vColor=mix(vColor,vec3(.6,2.2,1.7),min(1.,pulse*.65+wave*.48));vAlpha=uReveal*depth*(.10+uFocus*.14+pulse*.15+wave*.32);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor;varying float vAlpha;void main(){gl_FragColor=vec4(vColor,vAlpha);}`
    });
    const links = new THREE4.LineSegments(lineGeo, lineMat);
    links.name = "\u7A81\u89E6\u8FDE\u63A5\u4E0E\u4F20\u64AD\u4FE1\u53F7";
    links.frustumCulled = false;
    group.add(links);
    const nodeGeo = new THREE4.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE4.Float32BufferAttribute(positions, 3));
    nodeGeo.setAttribute("aSeed", new THREE4.Float32BufferAttribute(seeds, 1));
    nodeGeo.setAttribute("aSize", new THREE4.Float32BufferAttribute(sizes, 1));
    nodeGeo.setAttribute("aCluster", new THREE4.Float32BufferAttribute(nodes.map((_, i) => Math.min(8, Math.floor(i / NEURAL.perCluster))), 1));
    const nodeMat = new THREE4.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE4.AdditiveBlending,
      vertexShader: `attribute float aSeed,aSize,aCluster;varying vec3 vColor;varying float vAlpha;${field}
  void main(){vec3 p=living(position);vec4 mv=modelViewMatrix*vec4(p,1.);float fire=pow(max(0.,sin(uTime*2.6-aSeed*33.)),18.);float wave=arrival(position)+computation(position)*.7+externalActivity(position,aCluster)*.9;float light=fire*.35+wave*.5+uFocus*.18;vColor=mix(mix(vec3(.14,.65,.75),vec3(.35,1.5,1.35),uFocus),vec3(.7,2.5,2.),min(1.,light));vAlpha=uReveal*exp(-max(0.,-mv.z-25.)*.017)*(.65+light*.35);gl_PointSize=clamp((aSize+light*.35)*(1.+uFocus*.5)*550./max(2.,-mv.z),1.2,12.);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=exp(-d*d*27.)*.55+exp(-d*d*110.)*.55;gl_FragColor=vec4(vColor,a*vAlpha);}`
    });
    const neurons = new THREE4.Points(nodeGeo, nodeMat);
    neurons.name = "\u795E\u7ECF\u5143";
    neurons.frustumCulled = false;
    group.add(neurons);
    const flowGeo = new THREE4.BufferGeometry();
    for (const [name, values, size] of [["position", starts, 3], ["aEnd", ends, 3], ["aBend", bends, 3], ["aSeed", flowSeeds, 1], ["aDistance", flowDistances, 1], ["aCluster", flowClusters, 1], ["aLag", lags, 1]]) flowGeo.setAttribute(name, new THREE4.Float32BufferAttribute(values, size));
    const flowMat = new THREE4.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE4.AdditiveBlending,
      vertexShader: `attribute vec3 aEnd,aBend;attribute float aSeed,aDistance,aCluster,aLag;varying vec3 vColor;varying float vAlpha;${field}
 void main(){float u=fract((uTime-14.)*.72-aDistance*.027+aSeed*.1-aLag);vec3 p=mix(position,aEnd,u)+aBend*sin(u*3.14159265);float wave=max(computation(p),externalActivity(p,aCluster));vColor=mix(vec3(.3,1.9,2.4),vec3(1.8,2.8,2.3),wave);vAlpha=uReveal*uCompute*(.07+wave*.5)*(1.-aLag*7.)*smoothstep(0.,.1,u)*(1.-smoothstep(.9,1.,u));vec4 mv=modelViewMatrix*vec4(living(p),1.);gl_PointSize=clamp((.12+wave*.17)*650./max(2.,-mv.z),1.,7.);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 vColor;varying float vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vColor,exp(-d*d*26.)*vAlpha);}`
    });
    const flow = new THREE4.Points(flowGeo, flowMat);
    flow.name = "\u795E\u7ECF\u5143\u8BA1\u7B97\u65F6\u6CBF\u7A81\u89E6\u524D\u8FDB\u7684\u4FE1\u53F7";
    flow.frustumCulled = false;
    group.add(flow);
    return { mainRequest: mainRequest.diagnostics, count: nodes.length, signalPoints: flowSeeds.length, externalSignalPoints: traffic.pointCount, externalRoutes: traffic.routeCount, edges: edges.length, bounds: new THREE4.Box3().setFromPoints(nodes), update(t, gain = 1) {
      group.visible = t >= 7.65;
      traffic.update(t);
      mainRequest.update(t, gain);
      uniforms.uTime.value = t;
      uniforms.uFocus.value = arrivalFocus(t);
      uniforms.uCompute.value = generationActivity(t);
      uniforms.uReveal.value = smooth(7.65, 9.15, t) * gain;
    } };
  }
  var FILM = { width: 1440, height: 1080, fps: 60, duration: 25, finalDistance: 72, fov: 40 };
  var clamp5 = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  function smooth2(a, b, x) {
    const u = clamp5((x - a) / (b - a));
    return u * u * (3 - 2 * u);
  }
  function ease5(a, b, x) {
    const u = clamp5((x - a) / (b - a));
    return u * u * u * (10 + u * (-15 + 6 * u));
  }
  function randomFrom(seed) {
    return () => {
      seed = Math.imul(seed, 1664525) + 1013904223 >>> 0;
      return seed / 4294967296;
    };
  }
  var markBox = { x: 528, y: 352, w: 384, h: 192 };
  var markPaths = [
    "M146 106 A62 62 0 1 1 270 106 C246 111 226 108 203 97 C188 89 179 87 169 95 Z",
    "M23 143 C62 139 91 123 127 104 C154 88 168 76 183 78 C197 80 207 92 226 99 C264 114 321 113 375 98 C344 120 291 135 247 127 C214 123 194 106 177 103 C162 100 144 111 124 119 C88 136 57 146 23 147 Z",
    "M68 158 C104 147 142 139 177 137 C209 135 240 147 272 148 C299 149 329 142 348 133 C329 150 300 159 265 161 C227 162 200 151 171 149 C138 148 100 154 68 161 Z"
  ];
  function sampleMark(count, rng) {
    const c = document.createElement("canvas");
    c.width = 400;
    c.height = 200;
    const g = c.getContext("2d", { willReadFrequently: true });
    const pools = [];
    for (const d of markPaths) {
      g.clearRect(0, 0, 400, 200);
      g.fillStyle = "white";
      g.fill(new Path2D(d));
      const pixels = g.getImageData(0, 0, 400, 200).data, list = [];
      for (let y = 1; y < 199; y++) for (let x = 1; x < 399; x++) if (pixels[(y * 400 + x) * 4 + 3] > 170) list.push(y * 400 + x);
      pools.push(list);
    }
    const target = new Float32Array(count * 3), kind = new Float32Array(count);
    const unit2 = 2 * FILM.finalDistance * Math.tan(FILM.fov * Math.PI / 360) / FILM.height;
    for (let i = 0; i < count; i++) {
      const v = rng(), k = v < 0.48 ? 0 : v < 0.83 ? 1 : 2, pool = pools[k], pixel = pool[Math.floor(rng() * pool.length)];
      const sx = markBox.x + (pixel % 400 + rng()) * markBox.w / 400;
      const sy = markBox.y + (Math.floor(pixel / 400) + rng()) * markBox.h / 200;
      target[i * 3] = (sx - FILM.width / 2) * unit2;
      target[i * 3 + 1] = (FILM.height / 2 - sy) * unit2;
      target[i * 3 + 2] = (rng() - 0.5) * 0.09;
      kind[i] = k;
    }
    return { target, kind };
  }
  var turn = new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), -Math.PI / 2);
  var centre = new T.Vector3(...NEURAL.center);
  var localise = (p) => p.clone().sub(centre).applyQuaternion(turn);
  var byPosition = (p) => [p.x, p.y, p.z].map((n) => Math.round(n * 1e3)).join(",");
  var read = (a, i) => new T.Vector3().fromBufferAttribute(a, i);
  function makeForks(scene, nodes, mesh, trunk, events) {
    const lookup = new Map(nodes.map((p, i) => [byPosition(p), i]));
    const connected = nodes.map(() => []), edgePoints = [];
    const a = mesh.geometry.getAttribute("position"), perEdge = NEURAL.curveSteps * 2;
    for (let i = 0; i < a.count; i += perEdge) {
      const u = lookup.get(byPosition(read(a, i))), v = lookup.get(byPosition(read(a, i + perEdge - 1)));
      if (u === void 0 || v === void 0) continue;
      const samples = Array.from({ length: NEURAL.curveSteps + 1 }, (_, j) => localise(read(a, i + Math.min(2 * j, perEdge - 1))));
      const edge = edgePoints.push(samples) - 1;
      connected[u].push({ to: v, edge, reverse: false });
      connected[v].push({ to: u, edge, reverse: true });
    }
    const out = [], birth = [], seed = [], rng = randomFrom(4129761);
    const primary = new Set(trunk.map((p) => lookup.get(byPosition(p))).filter((i) => i !== void 0));
    for (const [anchor, trigger] of events) {
      let start = 0;
      nodes.forEach((p, i) => {
        if (p.distanceToSquared(anchor) < nodes[start].distanceToSquared(anchor)) start = i;
      });
      const visited = /* @__PURE__ */ new Set([start]), queue = [{ id: start, time: trigger, level: 0 }];
      for (let k = 0; k < queue.length && k < 38; k++) {
        const cur = queue[k];
        if (cur.level >= 5) continue;
        const next = connected[cur.id].filter((c) => !visited.has(c.to) && !primary.has(c.to)).sort((a2, b) => a2.to - b.to);
        for (const c of next.slice(0, cur.level < 2 ? 3 : 2)) {
          visited.add(c.to);
          const curve = c.reverse ? [...edgePoints[c.edge]].reverse() : edgePoints[c.edge];
          const duration = 0.11 + curve[0].distanceTo(curve.at(-1)) * 0.041, phase = rng();
          for (let j = 0; j < curve.length - 1; j++) for (const n of [j, j + 1]) {
            out.push(...curve[n].toArray());
            birth.push(cur.time + duration * n / (curve.length - 1));
            seed.push(phase);
          }
          queue.push({ id: c.to, level: cur.level + 1, time: cur.time + duration });
        }
      }
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.Float32BufferAttribute(out, 3));
    geo.setAttribute("birth", new T.Float32BufferAttribute(birth, 1));
    geo.setAttribute("seed", new T.Float32BufferAttribute(seed, 1));
    const uni = { t: { value: 0 } };
    const mat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      uniforms: uni,
      vertexShader: `attribute float birth,seed;uniform float t;varying float a;varying vec3 tint;void main(){float age=t-birth;float spark=exp(-pow((age-.08)/.20,2.));float tail=exp(-max(age,0.)*1.65);a=smoothstep(-.075,.035,age)*tail*(1.-smoothstep(8.7,9.45,t));tint=mix(vec3(.85,.38,.045),vec3(2.7,1.65,.51),spark)*(.72+.28*seed);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying float a;varying vec3 tint;void main(){gl_FragColor=vec4(tint,a*.9);}`
    });
    const line = new T.LineSegments(geo, mat);
    line.frustumCulled = false;
    scene.add(line);
    return { update(t) {
      uni.t.value = t;
      line.visible = t > 3.65 && t < 9.48;
    }, segments: out.length / 6 };
  }
  function makeSignal(scene) {
    const rng = randomFrom(14833), pos = [], size = [], seed = [];
    for (let i = 0; i < 720; i++) {
      const a = rng() * 2 * Math.PI, z = rng() * 2 - 1, rr = Math.cbrt(rng()), v = rr * Math.sqrt(1 - z * z);
      pos.push(v * Math.cos(a), v * Math.sin(a), rr * z);
      size.push(0.6 + rng() * 1.5);
      seed.push(rng());
    }
    const geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
    geo.setAttribute("sz", new T.Float32BufferAttribute(size, 1));
    geo.setAttribute("seed", new T.Float32BufferAttribute(seed, 1));
    const u = { t: { value: 0 }, gain: { value: 0 }, head: { value: new T.Vector3() }, tangent: { value: new T.Vector3() } };
    const mat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      uniforms: u,
      vertexShader: `attribute float sz,seed;uniform float t,gain;uniform vec3 head,tangent;varying vec3 tint;varying float alpha;
    void main(){float k=pow(seed,1.7);float a=t*(1.+seed)+seed*19.;vec3 off=position*(.13+.45*k);off.xy=mat2(cos(a),-sin(a),sin(a),cos(a))*off.xy;
    vec3 p=head+off-tangent*pow(seed,3.)*2.8;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
    gl_PointSize=clamp(sz*67./max(3.,-mv.z),1.,5.);tint=mix(vec3(3.0,1.39,.33),vec3(1.6,.49,.068),seed);
    alpha=gain*(.15+.48*(1.-seed));}`,
      fragmentShader: `varying vec3 tint;varying float alpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(tint,alpha*exp(-d*d*18.));}`
    });
    const points = new T.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);
    return u;
  }
  function buildNetwork(scene, camera) {
    const legacyLayer = new T.Group();
    legacyLayer.quaternion.copy(turn);
    legacyLayer.position.copy(centre).applyQuaternion(turn).negate();
    scene.add(legacyLayer);
    const source = createNeuralNetwork(legacyLayer, new T.Vector3(0, 4, -342), camera);
    const network = legacyLayer.getObjectByName("GPT \u5DE8\u578B\u795E\u7ECF\u7F51\u7EDC");
    const lines = network.getObjectByName("\u7A81\u89E6\u8FDE\u63A5\u4E0E\u4F20\u64AD\u4FE1\u53F7"), neurons = network.getObjectByName("\u795E\u7ECF\u5143");
    const main = network.getObjectByName("\u590F\u590F\u7684\u91D1\u8272\u8BF7\u6C42 \xB7 \u5B9E\u9645\u7A81\u89E6\u8DEF\u5F84");
    const attrs = neurons.geometry.getAttribute("position"), nodes = Array.from({ length: attrs.count }, (_, i) => read(attrs, i));
    const routeAttrs = main.geometry.getAttribute("position"), routeU = main.geometry.getAttribute("aU");
    const nativeRoute = Array.from({ length: routeAttrs.count }, (_, i) => read(routeAttrs, i)), route = nativeRoute.map(localise);
    const unit2 = Array.from(routeU.array);
    const signal = makeSignal(scene), scratch = new T.Vector3();
    let endIndex = 0, best = Infinity;
    for (let i = 0; i < route.length; i++) if (unit2[i] > 0.6 && unit2[i] < 0.93) {
      const score = route[i].lengthSq() + (1 - unit2[i]) * 6;
      if (score < best) {
        best = score;
        endIndex = i;
      }
    }
    const endU = unit2[endIndex] || 0.82, origin = route[endIndex].clone();
    const progressAt = (t) => endU * (0.025 + 0.975 * (0.18 * clamp5((t - 1.74) / 6.86) + 0.82 * smooth2(1.74, 8.6, t)));
    const events = [8, 11, 14].map((b) => b * 60 / 126).map((t) => {
      const u = progressAt(t), index = unit2.findIndex((v) => v >= u);
      return [nativeRoute[Math.max(0, index)], t];
    });
    const forks = makeForks(scene, nodes, lines, nativeRoute, events);
    function pointAt(u, out = new T.Vector3()) {
      const value = clamp5(u);
      let left = 0, right = unit2.length - 1;
      while (right - left > 1) {
        const mid = left + right >> 1;
        if (unit2[mid] < value) left = mid;
        else right = mid;
      }
      return out.copy(route[left]).lerp(route[right], clamp5((value - unit2[left]) / Math.max(1e-6, unit2[right] - unit2[left])));
    }
    const head = new T.Vector3();
    return {
      nodes: nodes.map(localise),
      origin,
      head,
      headAt: (t) => pointAt(progressAt(t)),
      sourceCount: source.count,
      edgeCount: source.edges,
      forkSegments: forks.segments,
      update(t) {
        const progress = progressAt(t);
        pointAt(progress, head);
        const oldTime = 10.52 + 5.9 * smooth2(1.64, 8.6, t);
        const gain = (0.32 + 0.68 * smooth2(1.6, 2.75, t)) * (1 - 0.94 * ease5(8.67, 10.08, t)) * (1 - ease5(11.8, 14.12, t));
        source.update(oldTime, gain);
        network.visible = gain > 1e-3;
        main.material.uniforms.uProgress.value = progress;
        main.material.uniforms.uVisible.value = gain * 0.94 * (1 - ease5(8.75, 9.63, t));
        const code = network.getObjectByName("\u795E\u7ECF\u51FA\u53E3\u5230\u771F\u5B9E\u4EE3\u7801\u7F16\u8F91\u5668");
        if (code) code.visible = false;
        for (const n of ["\u6765\u81EA\u56DB\u9762\u516B\u65B9\u7684\u8BF7\u6C42\u4E0E\u54CD\u5E94", "\u65C1\u652F\u8BF7\u6C42\u7684\u7A7A\u95F4\u8DEF\u5F84"]) {
          const o = network.getObjectByName(n);
          if (o && t > 8.6) o.visible = false;
        }
        signal.t.value = t;
        signal.head.value.copy(head);
        pointAt(progress + 4e-3, scratch);
        signal.tangent.value.copy(scratch.sub(head)).normalize();
        signal.gain.value = smooth2(1.35, 1.9, t) * (1 + 1.35 * smooth2(8.3, 8.86, t)) * (1 - ease5(9.1, 9.86, t));
        forks.update(t);
      }
    };
  }
  var T5 = __toESM(require_three(), 1);
  var T2 = __toESM(require_three(), 1);
  var PATCH_START = 1112 / 60;
  var PATCH_END = 1362 / 60;
  var unit = 2 * FILM.finalDistance * Math.tan(FILM.fov * Math.PI / 360) / FILM.height;
  function makeTargets() {
    const raster = document.createElement("canvas");
    raster.width = 400;
    raster.height = 200;
    const ctx = raster.getContext("2d", { willReadFrequently: true });
    const columns = markPaths.map((path) => {
      ctx.clearRect(0, 0, 400, 200);
      ctx.fill(new Path2D(path));
      const pixels = ctx.getImageData(0, 0, 400, 200).data;
      const values = [];
      for (let x = 0; x < 400; x++) for (let y = 0; y < 200; y++) if (pixels[(y * 400 + x) * 4 + 3] > 128) values.push([x, y]);
      return values;
    });
    return (uvx, uvy, rnd) => {
      const r = Math.hypot(uvx, uvy), theta = Math.atan2(uvy, uvx);
      const phase = theta + 3.28 * Math.log(r + 0.085);
      const kind = r < 0.365 + 0.058 * Math.sin(phase * 2) + 0.022 * (rnd() - 0.5) ? 0 : Math.sin(phase) > 0 ? 1 : 2;
      const sorted = columns[kind];
      const spread = kind === 0 ? 0.4 : 0.16;
      const lane = 0.5 + 0.5 * Math.sin(theta + (kind === 0 ? 0.6 : -0.85) + r * 2.1);
      const u = Math.max(1e-5, Math.min(0.99998, lane * (1 - spread) + rnd() * spread));
      const [x, y] = sorted[Math.floor(u * sorted.length)];
      return [
        (markBox.x + markBox.w * (x + rnd()) / 400 - FILM.width / 2) * unit,
        (FILM.height / 2 - markBox.y - markBox.h * (y + rnd()) / 200) * unit,
        kind
      ];
    };
  }
  var recoilShader = `
  const vec3 sunCentre=vec3(.37,4.85,0.);
  float sourceAngle(vec2 xy,float time){
    float r=length(xy);return atan(xy.y,xy.x)+(time-15.9)*(.076+.133*exp(-3.1*r));
  }
  vec3 originalDust(vec2 xy,float h,float time){
    float r=length(xy),a=sourceAngle(xy,time);
    float bow=(.16+1.10*r)*sin(3.*a+r*9.+time*.13);
    return diskCentre+diskBasis*vec3(vec2(cos(a),sin(a))*r*41.,h+bow);
  }
  // \u91CA\u653E\u6CBF\u539F\u4E91\u76D8\u4ECE\u5916\u5411\u5185\u63A8\u8FDB\uFF1B\u968F\u673A\u91CF\u53EA\u5F71\u54CD\u5C0F\u56E2\u5757\uFF0C\u4E91\u5E26\u672C\u8EAB\u4ECD\u8FDE\u8D2F\u3002
  vec2 recoilClock(vec2 xy,float seed,float kind){
    float r=length(xy),a=atan(xy.y,xy.x);
    float patches=.10*sin(3.*a+7.*r)+.048*cos(7.*a-9.*r);
    float late=smoothstep(.47,.93,r)*smoothstep(.10,.89,sin(2.*a+7.*r));
    float start=18.67+.83*(1.-smoothstep(.12,.91,r))+patches+.15*seed+.23*late;
    float order=clamp(.52+.30*sin(a-r*3.)+.17*(seed-.5),.04,.97);
    float end=kind<.5?21.46+.47*order:21.71+.30*(kind-1.)+.44*order+.10*late;
    return vec2(start,end);
  }
  vec3 toMark(vec2 xy,float h,float seed,vec3 target,float kind,float time,mat4 anchor,out vec3 stepState){
    float r=length(xy),a=sourceAngle(xy,time);vec2 times=recoilClock(xy,seed,kind);
    float u=smoothstep(times.x,times.y,time);
    float exposed=smoothstep(times.x,times.x+.49,time);
    float last=smoothstep(mix(.46,.58,step(.5,kind)),1.,u);stepState=vec3(u,exposed,last);
    vec3 original=originalDust(xy,h,time);
    if(time<=times.x)return original;
    vec3 goal=(anchor*vec4(target,1.)).xyz;
    if(time>=times.y)return goal;
    vec3 sun=(anchor*vec4(sunCentre,1.)).xyz;
    float carry=smoothstep(18.82,21.68,time);
    vec3 centre=mix(diskCentre,sun,carry);
    float phase=atan(xy.y,xy.x)+3.28*log(r+.085);
    float arm=sin(phase)>.0?1.:0.;
    float reference=1.43+arm*3.141593-3.28*log(r+.085);
    float originalAngle=atan(xy.y,xy.x);
    float offset=atan(sin(originalAngle-reference),cos(originalAngle-reference));
    // \u5728\u539F\u65CB\u81C2\u5185\u90E8\u9010\u6E10\u5411\u4E2D\u7EBF\u9760\u62E2\uFF1B\u9760\u8FD1\u8F74\u5FC3\u65F6\u52A0\u5FEB\u8F6C\u8FC7\u7684\u89D2\u5EA6\u3002
    float tighten=.66*sin(3.141593*u);
    float angle=a-offset*tighten+u*(2.28+1.24*(1.-min(1.,r)))+.26*sin(3.141593*u);
    float radius=r*41.*(1.-.89*pow(u,mix(.92,1.24,step(.5,kind))));
    float bow=(.16+1.10*r)*sin(3.*a+r*9.+time*.13);
    float tiltHeight=(h+bow)*(1.-u)+sin(3.141593*u)*(.72*sin(phase*2.+r*5.)+.36*(seed-.5));
    vec3 funnel=centre+diskBasis*vec3(cos(angle)*radius,sin(angle)*radius,tiltHeight);
    // \u6700\u540E\u7684\u901F\u5EA6\u6CBF\u7740\u7B14\u753B\u65B9\u5411\u8F6C\u5165\u843D\u70B9\uFF0C\u800C\u4E0D\u662F\u4E24\u5F20\u56FE\u505A\u900F\u660E\u5EA6\u53E0\u5316\u3002
    vec3 approach=(anchor*vec4(target+vec3((kind<.5?.53:1.3)*sin(phase),.34*(1.-kind),.55),1.)).xyz;
    vec3 dest=mix(approach,goal,last);
    return mix(funnel,dest,last);
  }
`;
  var varying = `varying vec2 chipCoord;varying vec3 transport;varying vec3 seedAndClock;`;
  function chipGeometry(grid, layerIndex, targetAt) {
    const base = new T2.InstancedBufferGeometry();
    base.setIndex([0, 1, 2, 2, 1, 3]);
    base.setAttribute("position", new T2.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0], 3));
    const cells = [], goals = [], trails = [], rng = randomFrom(93411 + layerIndex * 318);
    for (let y = 0; y < grid; y++) for (let x = 0; x < grid; x++) {
      const px = (x + 0.5) * 2 / grid - 1, py = (y + 0.5) * 2 / grid - 1;
      if (Math.hypot(px, py) > 1.075) continue;
      const seed = rng(), goal = targetAt(px, py, rng);
      cells.push(px, py, 1 / grid, seed);
      goals.push(...goal);
      if (layerIndex === 3 && seed > 0.947 && Math.hypot(px, py) < 0.97) trails.push({ x: px, y: py, seed, goal });
    }
    base.setAttribute("chip", new T2.InstancedBufferAttribute(new Float32Array(cells), 4));
    base.setAttribute("landing", new T2.InstancedBufferAttribute(new Float32Array(goals), 3));
    base.instanceCount = goals.length / 3;
    return { base, trails };
  }
  function makeLightTrails(scene, records, map, sourceUniforms, common) {
    const geo = new T2.BufferGeometry(), origin = [], dest = [], steps = [];
    for (const chip of records) for (let i = 0; i < 8; i++) for (const j of [i, i + 1]) {
      origin.push(chip.x, chip.y, chip.seed);
      dest.push(...chip.goal);
      steps.push(j / 8);
    }
    geo.setAttribute("position", new T2.Float32BufferAttribute(origin, 3));
    geo.setAttribute("landing", new T2.Float32BufferAttribute(dest, 3));
    geo.setAttribute("lag", new T2.Float32BufferAttribute(steps, 1));
    const mat = new T2.ShaderMaterial({
      uniforms: sourceUniforms,
      depthWrite: false,
      transparent: true,
      blending: T2.AdditiveBlending,
      vertexShader: `attribute vec3 landing;attribute float lag;uniform sampler2D emission;uniform mat4 anchor;
      varying vec3 tint;varying float shine;${common}${recoilShader}
      void main(){
        vec3 state;float seed=position.z;
        float time=sec-lag*(.065+.155*seed);vec2 xy=position.xy;
        vec3 p=toMark(xy,-.09,seed,vec3(landing.xy,0.),landing.z,time,anchor,state);
        vec3 col=texture2D(emission,xy*.5+.5).rgb;
        float light=max(col.r,max(col.g,col.b));vec3 aimed=landing.z<.5?vec3(1.56,.73,.22):vec3(.16,.76,.95);
        tint=mix(pow(col,vec3(1.35))*2.65,aimed,state.z*.68);
        shine=smoothstep(.06,.32,state.x)*(1.-smoothstep(.75,.97,state.x))*(1.-lag)*(.06+.28*light);
        gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);
      }`,
      fragmentShader: `varying vec3 tint;varying float shine;void main(){gl_FragColor=vec4(tint,shine);}`
    });
    const traces = new T2.LineSegments(geo, mat);
    traces.frustumCulled = false;
    traces.renderOrder = 1;
    scene.add(traces);
    return traces;
  }
  function makeRecoil(scene, layers, map, common) {
    const targetAt = makeTargets(), objects = [];
    let total = 0, streaks = 0;
    for (const [index, entry2] of layers.entries()) {
      const { base, trails } = chipGeometry(index === 3 ? 190 : 112, index, targetAt);
      total += base.instanceCount;
      const original = entry2.mesh.material;
      const uniforms = { ...original.uniforms, anchor: { value: new T2.Matrix4() } };
      const frag = original.fragmentShader.replace("varying vec2 local;", varying + "varying vec2 local;").replace("float opacity=awaken*vanish;", "float opacity=awaken;").replace("gl_FragColor=vec4((body+fineGas+coal*pocket)*opacity*dim,clamp(absorb*.42+crisp*(1.-bright)*.12+(1.-pocket)*.64,0.,.90)*opacity);", `
          vec3 raw=(body+fineGas+coal*pocket)*opacity*dim;
          float dustAlpha=clamp(absorb*.42+crisp*(1.-bright)*.12+(1.-pocket)*.64,0.,.90)*opacity;
          float cut=transport.y,arriving=transport.z;
          float sprite=exp(-2.6*dot(chipCoord,chipCoord))*(1.-smoothstep(.82,1.23,length(chipCoord)));
          float shape=mix(1.,sprite,cut);
          float radiant=max(raw.r,max(raw.g,raw.b));
          vec3 gold=vec3(1.25,.59,.16),ice=vec3(.14,.81,.89);
          float cooling=.90*smoothstep(.36,.98,transport.x);
          vec3 grain=mix(raw,(seedAndClock.y<.5?gold:ice)*radiant,cooling);
          float concentrating=1.+cut*mix(.92,3.4,seedAndClock.x)*(1.-.63*arriving);
          // \u675F\u8170\u8D8A\u7EC6\uFF0C\u5355\u4F4D\u753B\u9762\u5185\u53E0\u52A0\u7684\u5149\u7C92\u8D8A\u591A\uFF0C\u6309\u5176\u6536\u7F29\u9762\u79EF\u8865\u507F\u66DD\u5149\uFF0C\u4FDD\u7559\u53EF\u6570\u7684\u4EAE\u70B9\u3002
          concentrating/=1.+1.64*pow(transport.x,1.65)+2.55*arriving;
          // \u989C\u6599\u5B8C\u5168\u968F\u51E0\u4F55\u98DE\u884C\u3002\u5DF2\u7ECF\u78B0\u5230\u592A\u9633\u6216\u5C71\u7EBF\u7684\u661F\u7C92\u624D\u628A\u4EAE\u5EA6\u4EA4\u7ED9\u540C\u4F4D\u7F6E\u7684\u6210\u6807\u7C92\u5B50\u3002
          float landed=1.-smoothstep(seedAndClock.z+.085,min(22.685,seedAndClock.z+.59),sec);
          gl_FragColor=vec4(grain*concentrating*shape*landed,dustAlpha*shape*(1.-cut)*landed);`);
      const vert = `uniform float height;uniform mat4 anchor;attribute vec4 chip;attribute vec3 landing;
      varying vec2 local;varying float heightMod;${varying}${common}${recoilShader}
      vec2 jitterCorner(vec2 p){
        vec2 i=floor(p+.5);return fract(sin(vec2(dot(i,vec2(131.3,47.9)),dot(i,vec2(73.1,197.1))))*42367.)-.5;
      }
      void main(){
        vec2 centre=chip.xy,corner=position.xy;
        vec2 uv=centre+corner*chip.z;
        uv+=jitterCorner((uv+1.)/(2.*chip.z))*chip.z*.48;
        local=uv;chipCoord=corner;
        float centreHeight=.58+.5*length(centre)+.21*sin(centre.x*6.-centre.y*4.+height*.43);
        heightMod=.58+.5*length(uv)+.21*sin(uv.x*6.-uv.y*4.+height*.43);
        vec3 goal=vec3(landing.xy,0.);float seed=chip.w,kind=landing.z;
        vec3 p=toMark(centre,height*centreHeight,seed,goal,kind,sec,anchor,transport);
        vec3 aux;vec3 prior=toMark(centre,height*centreHeight,seed,goal,kind,sec-.045,anchor,aux);
        vec4 view=viewMatrix*vec4(p,1.);vec4 prev=viewMatrix*vec4(prior,1.);
        vec2 shift=view.xy/max(.1,-view.z)-prev.xy/max(.1,-prev.z);
        vec2 direction=normalize(shift+vec2(.000001,0.));
        vec2 perpendicular=vec2(-direction.y,direction.x);
        float worldPixel=max(.1,-view.z)*.000674019;
        float streak=min(5.2,length(shift)*350.)*sin(transport.x*3.141593);
        vec2 sprite=(direction*corner.x*(1.20+1.21*seed+streak)+perpendicular*corner.y*(.83+1.14*seed))*worldPixel;
        vec3 delta=originalDust(uv,height*heightMod,sec)-originalDust(centre,height*centreHeight,sec);
        view.xyz+=mix(mat3(viewMatrix)*delta,vec3(sprite,0.),transport.y);
        seedAndClock=vec3(seed,kind,recoilClock(centre,seed,kind).y);
        gl_Position=projectionMatrix*view;
      }`;
      const mat = original.clone();
      mat.uniforms = uniforms;
      mat.vertexShader = vert;
      mat.fragmentShader = frag;
      const mesh = new T2.Mesh(base, mat);
      mesh.name = "\u968F\u6D41\u56DE\u6536\u7684\u661F\u4E91\u788E\u7247 " + index;
      mesh.frustumCulled = false;
      mesh.renderOrder = entry2.mesh.renderOrder;
      scene.add(mesh);
      objects.push({ mesh, uniforms });
      if (trails.length) {
        const tail = makeLightTrails(scene, trails, map, uniforms, common);
        objects.push({ mesh: tail, uniforms });
        streaks += trails.length;
      }
    }
    return { total, streaks, update(t, anchor) {
      const active = t >= PATCH_START && t < PATCH_END;
      for (const { mesh, uniforms } of objects) {
        mesh.visible = active;
        uniforms.sec.value = t;
        if (active) uniforms.anchor.value.copy(anchor);
      }
      return active;
    } };
  }
  var T4 = __toESM(require_three(), 1);
  var T3 = __toESM(require_three(), 1);
  var beat = 60 / 126;
  var hit = 19 * beat;
  var discCentre = new T3.Vector3(1.6, 2.8, -4.2);
  var discU = new T3.Vector3(0.918, 0.397, 0.011).normalize();
  var discV = new T3.Vector3(-0.194, 0.425, -0.885).addScaledVector(discU, -new T3.Vector3(-0.194, 0.425, -0.885).dot(discU)).normalize();
  var discN = new T3.Vector3().crossVectors(discU, discV).normalize();
  var basis = new T3.Matrix3().set(discU.x, discV.x, discN.x, discU.y, discV.y, discN.y, discU.z, discV.z, discN.z);
  function channel(keys, t) {
    let i = 0;
    while (i + 2 < keys.length && t > keys[i + 1][0]) i++;
    const first = keys[i], second = keys[i + 1], left = keys[Math.max(0, i - 1)], right = keys[Math.min(keys.length - 1, i + 2)];
    const dt = second[0] - first[0], f = clamp5((t - first[0]) / dt), sq = f * f, cu = sq * f;
    const start = (second[1] - left[1]) / (second[0] - left[0]);
    const end = (right[1] - first[1]) / (right[0] - first[0]);
    return (2 * cu - 3 * sq + 1) * first[1] + (cu - 2 * sq + f) * dt * start + (-2 * cu + 3 * sq) * second[1] + (cu - sq) * dt * end;
  }
  function track(rows) {
    return [1, 2, 3].map((col) => rows.map((row) => [row[0], row[col]]));
  }
  function vector(keys, t, out) {
    return out.set(channel(keys[0], t), channel(keys[1], t), channel(keys[2], t));
  }
  var radii = [[hit, 0], [10.48, 18.2], [11.65, 27.9], [12.62, 32.9], [13.4, 33.2], [14.71, 29], [15.7, 18], [16.47, 8], [17.35, 4.1], [18.9, 3], [20.8, 1.8]];
  var angles = [[hit, 0.075], [10.5, 0.085], [11.68, -0.12], [12.61, -0.51], [13.48, -1.02], [14.76, -2.1], [15.68, -3.07], [16.48, -4.32], [17.4, -5.57], [19.05, -7.48], [20.8, -8.65]];
  function lightAt(origin, t, out = new T3.Vector3()) {
    if (t <= hit) return out.copy(origin);
    const r = channel(radii, t), a = channel(angles, t), centre2 = smooth2(10.15, 13.18, t);
    const height = 3.6 * Math.exp(-Math.pow((t - 14.63) / 0.78, 2)) + 0.4 * Math.sin(a * 3) * centre2;
    return out.copy(origin).lerp(discCentre, centre2).addScaledVector(discU, r * Math.cos(a)).addScaledVector(discV, r * Math.sin(a)).addScaledVector(discN, height);
  }
  var shot = track([
    [-1, -30, -1, 31],
    [0, -28, 0, 31.2],
    [2, -22, 3, 35],
    [3.2, -17, 5, 39],
    [4.65, -5, 10, 44],
    [6.4, 12, 12, 56],
    [8.5, 17, 9, 57],
    [9.6, 16.6, 6.8, 56],
    [11.25, 14.4, 4.2, 49],
    [12.7, 7, 1.8, 47],
    [13.8, -2.5, -1.4, 43],
    [14.75, -9.8, -2.6, 45],
    [15.75, -16, 0, 45],
    [16.8, -18, 3, 65],
    [18.38, -15, 8, 73],
    [19.9, -8.7, 10.1, 65],
    [21.4, 1.2, 9, 59.4],
    [23, 9, 6.7, 64],
    [25.2, 16.4, 2.9, 70],
    [26, 18.6, 1.1, 72.6]
  ]);
  var aim = track([
    [-1, -14, -0.3, 7.9],
    [0, -14.4, -0.55, 7.5],
    [2, -14, -1, 8],
    [3.14, -15.2, 2.8, 11.6],
    [4.25, -2.8, 7.3, 8.1],
    [5.35, 5.7, 8.9, 4.6],
    [6.62, 8.4, 5.72, -4],
    [8.5, 0.24, 5.9, -8.3],
    [9.6, 1.55, 6.1, -8],
    [11.25, 7.7, 6.5, -6.4],
    [12.78, 9.6, 3.92, -2],
    [13.88, 4.2, 1.1, 1],
    [14.75, -2.8, -1, 1.6],
    [15.75, -4.8, 0.4, -0.5],
    [16.8, -0.65, 2.72, -3],
    [18.35, 1.1, 2.7, -3.8],
    [20.15, 1.5, 2.85, -2.5],
    [21.66, 2.15, 2.85, -0.65],
    [23.4, 2.6, 2.3, 0.35],
    [26, 3.3, 1.1, 1.3]
  ]);
  var roll = [[-1, -2], [0, -1.5], [3, 0.6], [6, 2.4], [8.5, 1.4], [10.5, -1.2], [13, -3.8], [14.75, -5.9], [16.8, -2.3], [19, 1.1], [22, 2.3], [26, 0.1]];
  function makeFlight(camera, origin) {
    const eye = new T3.Vector3(), focus = new T3.Vector3(), packet = new T3.Vector3(), up = new T3.Vector3(0, 1, 0);
    return (time) => {
      vector(shot, time, eye);
      vector(aim, time, focus);
      const follow = 0.77 * smooth2(9.5, 12.43, time) * (1 - smooth2(14.88, 16.8, time));
      focus.lerp(lightAt(origin, time, packet), follow);
      camera.position.copy(eye);
      camera.up.copy(up);
      camera.lookAt(focus);
      camera.rotateZ(channel(roll, time) * Math.PI / 180);
      camera.updateMatrixWorld(true);
      return { eye: eye.toArray(), focus: focus.toArray(), roll: channel(roll, time) };
    };
  }
  function screenAnchor(t) {
    const p = smooth2(19.1, 22.15, t);
    return { x: p * (10 + 17 * Math.sin((t - 22) * 0.3)), y: p * (4 + 7 * Math.sin((t - 21) * 0.37)), scale: 1 + p * 0.012 * (t - 22) };
  }
  var fieldUrl = window.cloudMap["nebula-field"];
  var emissionUrl = window.cloudMap["nebula-emission"];
  var diskShader = `
  uniform mat3 diskBasis;
  uniform vec3 diskCentre;
  uniform float sec;
  const float discRadius=41.;
  mat2 spin(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}
  float orbit(float r){return (sec-15.9)*(.076+.133*exp(-3.1*r));}
  float contraction(){return 1.-.79*smoothstep(18.64,21.65,sec);}
  vec3 diskPoint(vec2 xy,float altitude){
    float r=length(xy);
    vec2 face=spin(orbit(r))*xy;
    float bending=(.16+1.10*r)*sin(atan(face.y,face.x)*3.+r*9.+sec*.13);
    return diskCentre+diskBasis*vec3(face*discRadius,altitude+bending)*contraction();
  }
  float litFront(vec2 xy){
    float t=sec;float turn=atan(xy.y,xy.x);
    float clockAngle=mod(-turn+6.2831853+.11,6.2831853);
    float delayAngle=min(clockAngle*.51,(6.2831853-clockAngle)*1.23);
    float start=11.49+delayAngle+.72*(1.-min(1.,length(xy)));
    float local=smoothstep(start,start+1.10,t);
    return max(local,.64*smoothstep(13.56,15.62,t))*smoothstep(11.30,12.64,t);
  }
`;
  function diskUniforms() {
    return { sec: { value: 0 }, diskBasis: { value: basis }, diskCentre: { value: discCentre } };
  }
  async function densityTexture() {
    const loader = new T4.TextureLoader();
    const [density, emission] = await Promise.all([loader.loadAsync(fieldUrl), loader.loadAsync(emissionUrl)]);
    for (const tex of [density, emission]) {
      tex.colorSpace = T4.NoColorSpace;
      tex.anisotropy = 8;
    }
    return { density, emission };
  }
  function makeGas(scene, map) {
    const geom = new T4.PlaneGeometry(2, 2, 92, 92);
    const layers = [];
    for (const [index, h] of [-2.5, -1.5, -0.77, -0.13, 0.46, 1.24, 2.19].entries()) {
      const uniforms = { ...diskUniforms(), map: { value: map.density }, emission: { value: map.emission }, height: { value: h }, layer: { value: index } };
      const mat = new T4.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        side: T4.DoubleSide,
        forceSinglePass: true,
        blending: T4.CustomBlending,
        blendSrc: T4.OneFactor,
        blendDst: T4.OneMinusSrcAlphaFactor,
        blendEquation: T4.AddEquation,
        vertexShader: `varying vec2 local;uniform float height;varying float heightMod;${diskShader}
        void main(){
          local=position.xy;
          float r=length(local);heightMod=.58+.50*r+.21*sin(local.x*6.-local.y*4.+height*.43);
          vec3 world=diskPoint(local,height*heightMod);
          gl_Position=projectionMatrix*viewMatrix*vec4(world,1.);
        }`,
        fragmentShader: `uniform sampler2D map,emission;uniform float height,layer;varying vec2 local;varying float heightMod;${diskShader}
        void main(){
          float r=length(local);if(r>1.06)discard;
          vec2 d=normalize(local+vec2(.0001));
          vec2 q=local+height*.005*vec2(d.y,-d.x)+height*.004*vec2(sin(local.y*13.+sec*.12),cos(local.x*11.-sec*.09));
          vec3 tex=texture2D(map,q*.5+.5).rgb;
          // \u4E2D\u5C42\u7ED9\u51FA\u6E05\u6670\u7684\u4E91\u58C1\u548C\u6697\u5DF7\uFF1B\u5176\u4F59\u5C42\u6CBF\u539A\u5EA6\u504F\u79FB\uFF0C\u7ECF\u8FC7\u955C\u5934\u65F6\u4EA7\u751F\u89C6\u5DEE\u3002
          vec2 uv=local*.5+.5+height*.0015*vec2(d.y,-d.x);
          vec3 pigment=texture2D(emission,uv).rgb;
          vec3 radiance=pow(pigment,vec3(2.15));
          float bright=max(radiance.r,max(radiance.g,radiance.b));
          float bluePatch=smoothstep(.91,1.19,pigment.b/max(.023,pigment.r));
          radiance*=mix(vec3(1.82,1.02,.49),vec3(.61,1.10,1.86),bluePatch);
          float crisp=1.-step(.1,abs(layer-3.));
          float depthWeight=.075+.13*exp(-height*height*.64)+1.58*crisp;
          float micro=dot(radiance,vec3(.27,.59,.14));
          float hot=(exp(tex.r*2.564949)-1.)*.25;
          float cool=tex.g*tex.g*1.1;
          float dust=tex.b;
          float core=exp(-pow((r-.11)/.115,2.));
          float hole=smoothstep(.042,.094,r);
          float plane=exp(-height*height*.65);
          float outer=exp(-height*height*.27);
          float absorb=clamp(dust*(.25+.30*outer)+.22*(1.-hole)*plane,0.,.72);
          float aglow=(.55+1.80*core)*hot*hot+.12*hot;
          vec3 bronze=vec3(1.04,.253,.047);
          vec3 cream=mix(vec3(1.32,.61,.15),vec3(1.55,1.21,.67),clamp(aglow*.77+core*.4,0.,1.));
          vec3 heat=mix(bronze,cream,clamp(hot*.75+core*.24,0.,1.))*aglow;
          float blue=smoothstep(.16,.61,r)*(.60+.62*max(0.,-d.x))+.15;
          vec3 gas=heat*(.19+.70*plane)*vec3(1.12,1.,.93)+vec3(.16,.51,1.19)*(cool*(.76+.62*cool))*blue*(.38+.58*outer);
          gas+=vec3(.42,.22,.48)*cool*dust*.22;
          float awaken=litFront(local);
          float vanish=1.-smoothstep(18.72+.65*r,20.76+.56*r,sec);
          float opacity=awaken*vanish;
          float dim=1.-.23*smoothstep(21.,22.,sec);
          float pocket=smoothstep(.047,.130,r);
          vec3 body=radiance*depthWeight*(1.07+.60*core)*mix(.035,1.,pocket)*(1.+.31*smoothstep(.26,.83,micro));
          vec3 fineGas=gas*(.023+.14*bright)*pocket;
          vec3 coal=vec3(.78,.17,.026)*pow(bright,1.7)*core*.52*crisp;
          gl_FragColor=vec4((body+fineGas+coal*pocket)*opacity*dim,clamp(absorb*.42+crisp*(1.-bright)*.12+(1.-pocket)*.64,0.,.90)*opacity);
        }`
      });
      const mesh = new T4.Mesh(geom, mat);
      mesh.frustumCulled = false;
      mesh.renderOrder = -35 + index;
      mesh.name = "\u661F\u4E91\u6C14\u4F53\u5C42 " + index;
      scene.add(mesh);
      layers.push({ mesh, uniforms });
    }
    const recoil = makeRecoil(scene, layers, map, diskShader);
    return { total: recoil.total, trails: recoil.streaks, update(t, anchor) {
      const replacing = recoil.update(t, anchor);
      for (const { mesh, uniforms } of layers) {
        mesh.visible = !replacing && t > 11.3 && t < 21.6;
        uniforms.sec.value = t;
      }
    } };
  }
  function trajectory(origin) {
    const count = 800, a = new Float32Array(count * 4), scratch = new T4.Vector3();
    for (let i = 0; i < count; i++) {
      lightAt(origin, 8.6 + 12.3 * i / (count - 1), scratch);
      a.set([scratch.x, scratch.y, scratch.z, 1], i * 4);
    }
    const t = new T4.DataTexture(a, count, 1, T4.RGBAFormat, T4.FloatType);
    t.needsUpdate = true;
    return t;
  }
  function makeGuide(scene, origin) {
    const count = 13500, rng = randomFrom(61329), coords = [], keys = [];
    for (let i = 0; i < count; i++) {
      const fraction = rng(), strand = Math.floor(rng() * 39), scatter = () => rng() + rng() + rng() - 1.5;
      coords.push(Math.pow(fraction, 1.6), scatter(), scatter());
      keys.push(rng(), strand / 39, rng(), rng());
    }
    const geom = new T4.BufferGeometry();
    geom.setAttribute("position", new T4.Float32BufferAttribute(coords, 3));
    geom.setAttribute("seed", new T4.Float32BufferAttribute(keys, 4));
    const uniforms = { sec: { value: 0 }, table: { value: trajectory(origin) }, ratio: { value: 1 } };
    const material = new T4.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: T4.AdditiveBlending,
      vertexShader: `uniform float sec,ratio;uniform sampler2D table;attribute vec4 seed;varying vec3 color;varying float strength;
    vec3 posAt(float t){
      float at=clamp((t-8.6)/12.3,0.,1.)*799.;float ix=floor(at);
      return mix(texture2D(table,vec2((ix+.5)/800.,.5)).xyz,texture2D(table,vec2((min(799.,ix+1.)+.5)/800.,.5)).xyz,fract(at));
    }
    void main(){
      float trail=position.x, start=9.047619,tail=mix(.45,1.43,smoothstep(10.85,13.78,sec));
      float tt=sec-trail*tail;
      vec3 p=posAt(max(start,tt)),vel=normalize(posAt(max(start+.05,tt)+.025)-posAt(max(start+.05,tt)-.025)+vec3(.00001));
      vec3 axis=normalize(cross(vel,vec3(0.,1.,.11))),second=cross(axis,vel);
      float braid=seed.y*6.283+trail*(6.8+2.*sin(seed.y*35.))+sec*(.62+.16*seed.y);
      float widen=(.08+1.54*pow(trail,.65))*(.28+.72*smoothstep(9.31,13.32,sec))*(1.-.45*smoothstep(15.18,16.68,sec));
      float cloud=.17+pow(seed.w,3.)*.9;
      p+=axis*widen*(.73*cos(braid)+position.y*cloud)+second*widen*(.83*sin(braid)+position.z*cloud);
      float head=exp(-trail*15.);
      vec3 bead=vec3(position.y+.32*cos(seed.y*47.),position.z+.35*sin(seed.x*30.),sin(seed.z*24.));
      p+=head*(axis*bead.x*.25+second*bead.y*.24+vel*bead.z*.38);
      float pre=1.-smoothstep(start,start+.24,sec);
      p+=vec3(position.y,position.z,sin(seed.x*36.))*.25*pre;
      float charging=smoothstep(8.45,9.02,sec);
      float birth=sec<start?charging*(1.-trail)*.88:smoothstep(start-.04,start+.065,tt);
      strength=birth*.69*pow(1.-trail,1.26)*(1.-smoothstep(16.65,18.38,sec))*(.10+.40*seed.x+.26*pow(1.-trail,4.))*(.82+.18*sin(braid*5.+sec));
      color=mix(vec3(1.30,.40,.068),vec3(2.45,1.32,.37),seed.x);
      color=mix(color,vec3(3.10,2.65,1.65),pow(1.-trail,6.)*.84);
      vec4 v=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*v;
      gl_PointSize=clamp((1.05+seed.z*1.48)*66./max(5.,-v.z),.85,7.)*ratio;
    }`,
      fragmentShader: `varying vec3 color;varying float strength;void main(){vec2 p=gl_PointCoord-.5;float d=dot(p,p);if(d>.25)discard;gl_FragColor=vec4(color,strength*exp(-d*19.));}`
    });
    const ribbon = new T4.Points(geom, material);
    ribbon.frustumCulled = false;
    ribbon.renderOrder = 2;
    scene.add(ribbon);
    const track2 = [];
    for (let k = 0; k < 15; k++) for (let j = 0; j < 144; j++) for (const index of [j, j + 1]) {
      track2.push(index / 144, k / 15, 0);
    }
    const fibers = new T4.BufferGeometry();
    fibers.setAttribute("position", new T4.Float32BufferAttribute(track2, 3));
    const fiberMaterial = new T4.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: T4.AdditiveBlending,
      vertexShader: `uniform float sec;uniform sampler2D table;varying float alpha;
      vec3 at(float t){
        float s=clamp((t-8.6)/12.3,0.,1.)*799.;float k=floor(s);
        return mix(texture2D(table,vec2((k+.5)/800.,.5)).xyz,texture2D(table,vec2((min(k+1.,799.)+.5)/800.,.5)).xyz,fract(s));
      }
      void main(){
        float q=position.x,j=position.y,elapsed=sec-q*mix(.55,3.03,smoothstep(9.48,11.65,sec));
        vec3 p=at(elapsed);float phase=j*6.283+q*10.;
        float w=(.09+.56*q)*sin(q*3.14159);
        p+=w*vec3(cos(phase),sin(phase*1.07),sin(phase));
        alpha=smoothstep(9.03,9.35,elapsed)*(1.-q)*(.09+.20*sin(phase*2.)*sin(phase*2.))*(1.-smoothstep(14.96,16.32,sec));
        gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);
      }`,
      fragmentShader: `varying float alpha;void main(){gl_FragColor=vec4(1.57,.57,.105,alpha);}`
    });
    const fibersObject = new T4.LineSegments(fibers, fiberMaterial);
    fibersObject.frustumCulled = false;
    fibersObject.renderOrder = 1;
    scene.add(fibersObject);
    return (t, scale) => {
      fibersObject.visible = t > 9.03 && t < 16.32;
      uniforms.sec.value = t;
      uniforms.ratio.value = scale;
      ribbon.visible = t > 8.45 && t < 18.39;
    };
  }
  var spriteFrag = `varying vec3 tint;varying float brightness;void main(){
  vec2 dc=gl_PointCoord-.5;float d=dot(dc,dc);if(d>.25)discard;
  gl_FragColor=vec4(tint,brightness*(exp(-d*27.)+.14*exp(-d*6.)));
}`;
  function createCloud(scene, nodes, origin, map) {
    const rng = randomFrom(987319), count = 82900;
    const p = new Float32Array(3 * count), shell = new Float32Array(3 * count), key = new Float32Array(4 * count), orbit = new Float32Array(3 * count);
    const mark = sampleMark(count, rng);
    const normal = () => rng() + rng() + rng() - 1.5;
    for (let i = 0; i < count; i++) {
      const n = nodes[Math.floor(rng() * nodes.length)], near = 0.12 + rng() ** 2 * 1.9;
      p.set([n.x + normal() * near, n.y + normal() * near, n.z + normal() * near], 3 * i);
      const s = rng(), a = rng(), b = rng(), c = rng();
      key.set([s, a, b, c], 4 * i);
      const r = 0.028 + 0.965 * Math.pow(rng(), 0.79);
      const disperse = rng();
      const arm = i % 3 === 0 ? 2 * Math.PI / 3 : Math.PI * (i % 2);
      const theta = disperse < 0.47 ? rng() * 2 * Math.PI : arm - 3.65 * Math.log(r + 0.095) + normal() * (0.37 + 1.1 * r) + 0.18 * Math.sin(arm + r * 7);
      orbit.set([r * Math.cos(theta), r * Math.sin(theta), normal() * (0.36 + 2.22 * r) * (disperse < 0.14 ? 2.7 : 1)], 3 * i);
      const az = rng() * 2 * Math.PI, z = rng() * 2 - 1, h = Math.sqrt(1 - z * z);
      const sr = 2 + Math.cbrt(rng()) * (20.8 + 3.3 * Math.cos(az * 3 + z));
      shell.set([sr * h * Math.cos(az) * 1.12, sr * z * 0.86, sr * h * Math.sin(az)], 3 * i);
    }
    const geo = new T5.BufferGeometry();
    for (const [name, arr, n] of [["position", p, 3], ["shell", shell, 3], ["key", key, 4], ["orbitData", orbit, 3], ["logo", mark.target, 3], ["logoKind", mark.kind, 1]]) geo.setAttribute(name, new T5.BufferAttribute(arr, n));
    const u = { ...diskUniforms(), ratio: { value: 1 }, origin: { value: origin }, map: { value: map.density }, emission: { value: map.emission }, anchor: { value: new T5.Matrix4() } };
    const material = new T5.ShaderMaterial({
      uniforms: u,
      transparent: true,
      depthWrite: false,
      blending: T5.AdditiveBlending,
      vertexShader: `attribute vec3 shell,orbitData,logo;attribute vec4 key;attribute float logoKind;
      uniform float ratio;uniform vec3 origin;uniform sampler2D map,emission;uniform mat4 anchor;
      varying vec3 tint;varying float brightness;${diskShader}${recoilShader}
      float bell(float x,float w){return exp(-x*x/(w*w));}
      void main(){
        float t=sec,s=key.x,r=length(orbitData.xy);
        float loose=smoothstep(8.73+key.y*.60,10.68+key.z*.44,t);
        vec3 pos=mix(position,shell,loose);
        vec3 dir=normalize(pos-origin+vec3(.0001));
        float dist=distance(pos,origin);
        float first=bell(dist-(t-9.04762)*12.75,1.14)*smoothstep(9.015,9.15,t);
        float two=bell(dist-(t-10.95238)*13.1,1.16)*smoothstep(10.89,11.12,t);
        float three=bell(dist-(t-12.38095)*13.8,.91)*smoothstep(12.33,12.54,t);
        float wave=max(first,max(.88*two,.64*three));
        vec3 wavePos=pos+dir*(first*1.44+two*.92+three*.68);
        vec3 orbitPos=diskPoint(orbitData.xy,orbitData.z);
        float lift=litFront(orbitData.xy);
        float turn=smoothstep(11.80+key.x*.79+(1.-lift)*.22,14.53+key.y*.65,t);
        float sway=sin(turn*3.141593);
        pos=mix(wavePos,orbitPos,turn)+sway*vec3(-wavePos.y*.36,wavePos.x*.32,2.5*key.y);
        vec3 sampleMap=texture2D(map,orbitData.xy*.5+.5).rgb;
        float hot=(exp(sampleMap.r*2.564949)-1.)*.25,cold=sampleMap.g*sampleMap.g;
        vec3 cloudColor=texture2D(emission,orbitData.xy*.5+.5).rgb;
        float bright=max(cloudColor.r,max(cloudColor.g,cloudColor.b));
        float luminous=clamp(.31*hot+.18*cold+1.19*pow(bright,1.27),0.,1.7);
        float fleck=step(.975,key.w);
        float coldStar=clamp((smoothstep(.18,.74,r)*cold*2.2+.25*step(.86,key.z))*(1.-.57*hot),0.,1.);
        vec3 gold=mix(vec3(1.40,.445,.086),vec3(2.40,1.65,.77),clamp(hot*.78+key.z*.27,0.,1.));
        coldStar=clamp(.64*smoothstep(.87,1.22,cloudColor.b/max(.035,cloudColor.r))+.42*coldStar,0.,1.);
        vec3 star=mix(gold,mix(vec3(.26,.67,1.39),vec3(.91,1.42,2.27),s),coldStar);
        vec3 base=mix(vec3(.09,.42,.59),vec3(.39,1.05,1.19),key.w);
        vec3 activated=mix(vec3(.31,1.55,1.80),vec3(2.62,1.35,.32),first*.80+.18*key.y);
        vec3 color=mix(mix(base,activated,wave),star,turn);
        float glint=.72+.28*sin(2.*t+key.y*65.);
        float before=(.026+.13*key.w+wave*.97+fleck*.18)*(.22+.78*loose)*glint;
        float disk=(.012+.54*pow(luminous,1.46))*mix(.24,1.15,pow(key.y,1.4))+fleck*(.19+.61*luminous);
        disk*=smoothstep(.036,.084,r)*(.65+.35*glint);
        brightness=mix(before,disk,turn);
        // \u7B2C\u4E00\u6279\u661F\u5C18\u5148\u63CF\u51FA\u65E5\u51FA\u3002\u5C3E\u6279\u9006\u7740\u626B\u7EBF\u5230\u8FBE\u4E0B\u65B9\u5C71\u810A\uFF0C\u63A5\u7740\u7531\u5B9E\u7EBF\u5B57\u6807\u63A5\u4F4F\u3002
        float tail=step(.972,key.x);
        float end=mix(20.18+key.x*2.18,22.32+.53*key.y,tail);
        float form=smoothstep(18.36+.99*key.x,end,t);
        vec3 dest=(anchor*vec4(logo,1.)).xyz;
        vec3 tang=diskBasis*vec3(normalize(vec2(-orbitData.y,orbitData.x)+.0001),.24);
        pos=mix(pos,dest,form)+sin(form*3.141593)*(tang*(6.+7.*key.z)+vec3(0.,1.,2.5));
        vec3 markColor=logoKind<.5?mix(vec3(1.64,.68,.15),vec3(2.48,1.54,.47),key.z):mix(vec3(.14,.76,.72),vec3(.53,1.71,1.50),key.y);
        tint=mix(color,markColor,form);
        float travel=(.08+.39*pow(key.y,2.)+fleck*.75)*glint;
        brightness=mix(brightness,travel,smoothstep(18.55,20.17,t));
        float landing=(.14+.20*key.z)*(1.-.81*smoothstep(22.48,23.24,t));
        brightness=mix(brightness,landing,smoothstep(.90,1.,form))*smoothstep(8.48,9.20,t);
        // \u6B64\u6BB5\u4E0E\u4E91\u7247\u4F7F\u7528\u540C\u4E00\u6761\u6536\u675F\u66F2\u7EBF\u3002\u672B\u5E27\u9010\u7C92\u5F52\u56DE\u5DF2\u786E\u8BA4\u7684\u843D\u6B3E\u3002
        if(t>=18.5333333&&t<22.7){
          float useFlow=smoothstep(18.5333333,18.75,t)*(1.-smoothstep(22.40,22.685,t));
          vec3 measured;vec3 gathered=toMark(orbitData.xy,orbitData.z,key.x,logo,logoKind,t,anchor,measured);
          float a=measured.x,at=measured.z;
          pos=mix(pos,gathered,useFlow);
          tint=mix(tint,mix(star,markColor,at),useFlow);
          float captured=mix(disk,(.035+.15*key.y+fleck*.34+min(.42,disk*.82))*glint,measured.y*.82);
          float landingGain=(.14+.20*key.z)*(1.-.81*smoothstep(22.48,23.24,t));
          brightness=mix(brightness,mix(captured,landingGain,smoothstep(.85,1.,a)),useFlow);
        }
        vec4 mv=modelViewMatrix*vec4(pos,1.);
        float size=mix(.85+key.y*.91+fleck*1.45+wave*1.20,.74+key.y*1.54+fleck*(1.25+1.55*luminous),turn);
        size=mix(size,.82+key.y*1.00+fleck*.5,form);
        gl_PointSize=clamp(size*(68./max(15.,-mv.z))*ratio,.76*ratio,7.7*ratio);
        gl_Position=projectionMatrix*mv;
      }`,
      fragmentShader: spriteFrag
    });
    const stars = new T5.Points(geo, material);
    stars.frustumCulled = false;
    stars.renderOrder = 1;
    scene.add(stars);
    return { count, update(t, ratio, anchor) {
      stars.visible = t > 8.47;
      u.sec.value = t;
      u.ratio.value = ratio;
      u.anchor.value.copy(anchor);
    } };
  }
  function createWaveSkin(scene, origin) {
    const rng = randomFrom(86641), dirs = [], props = [], count = 18400;
    for (let i = 0; i < count; i++) {
      const z = rng() * 2 - 1, a = rng() * 2 * Math.PI, h = Math.sqrt(1 - z * z);
      dirs.push(h * Math.cos(a), z, h * Math.sin(a));
      props.push(rng(), rng(), rng());
    }
    const g = new T5.BufferGeometry();
    g.setAttribute("position", new T5.Float32BufferAttribute(dirs, 3));
    g.setAttribute("key", new T5.Float32BufferAttribute(props, 3));
    const u = { t: { value: 0 }, origin: { value: origin }, ratio: { value: 1 } };
    const m = new T5.ShaderMaterial({
      uniforms: u,
      transparent: true,
      depthWrite: false,
      blending: T5.AdditiveBlending,
      vertexShader: `attribute vec3 key;uniform vec3 origin;uniform float t,ratio;varying float brightness;varying vec3 tint;
    void main(){float second=step(.57,key.y);float age=t-mix(9.04762,10.95238,second);
    float rad=max(0.,age)*mix(12.75,13.1,second);
    float lon=atan(position.z,position.x),lat=asin(clamp(position.y,-1.,1.));
    float ripple=.048*sin(lon*4.+lat*5.+t*.36)+.025*cos(lon*7.-lat*4.7);
    float ridge=smoothstep(-.30,.54,.63*sin(lon*4.+lat*4.8)+.34*cos(lon*7.2-lat*6.2+t*.23));
    vec3 p=origin+position*(rad*(1.+ripple)+(key.z-.5)*(.85+rad*.087));
    vec4 mv=modelViewMatrix*vec4(p,1.);vec3 vN=normalize(mat3(modelViewMatrix)*position);
    float rim=pow(max(0.,1.-abs(dot(vN,normalize(-mv.xyz)))),2.5);
    brightness=smoothstep(.01,.18,age)*(1.-smoothstep(18.,34.,rad))*(.09+.69*rim)*(.15+.85*ridge)*(.3+.7*key.x);
    tint=mix(vec3(.20,1.12,1.5),vec3(.69,1.80,1.82),rim);float warmth=(1.-second)*(.92-.48*smoothstep(.65,2.30,age))+.12*second; tint=mix(tint,mix(vec3(2.4,.93,.13),vec3(3.1,1.80,.57),rim),warmth);
    gl_Position=projectionMatrix*mv;gl_PointSize=clamp((1.15+key.x*1.95)*70./max(12.,-mv.z),1.,5.2)*ratio;}`,
      fragmentShader: spriteFrag
    });
    const shell = new T5.Points(g, m);
    shell.name = "\u63A8\u8FDB\u4E2D\u7684\u7403\u5F62\u6CE2\u9762";
    shell.frustumCulled = false;
    scene.add(shell);
    return (t, ratio) => {
      shell.visible = t > 9.04762 && t < 13.55;
      u.t.value = t;
      u.ratio.value = ratio;
    };
  }
  function createPulseCrests(scene, origin) {
    const sphere = new T5.SphereGeometry(1, 112, 72);
    const layers = [9.04762, 10.95238, 12.38095].map((start, i) => {
      const u = { intensity: { value: 0 }, phase: { value: 0 }, echo: { value: i } };
      const mat = new T5.ShaderMaterial({
        uniforms: u,
        transparent: true,
        depthWrite: false,
        blending: T5.AdditiveBlending,
        side: T5.FrontSide,
        vertexShader: `uniform float phase,echo;varying vec3 normalV,viewV,coord;void main(){
        coord=position;float lon=atan(position.z,position.x),lat=asin(clamp(position.y,-1.,1.));
        float ripple=.048*sin(lon*4.+lat*5.+(phase+9.04762+echo*1.68)*.36)+.025*cos(lon*7.-lat*4.7);
        vec4 mv=modelViewMatrix*vec4(position*(1.+ripple),1.);
        normalV=normalize(normalMatrix*normal);viewV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `uniform float intensity,phase,echo;varying vec3 normalV,viewV,coord;void main(){
        vec3 n=normalize(coord);float facing=max(0.,dot(normalize(normalV),normalize(viewV)));
        float rim=1.-facing;float lon=atan(n.z,n.x);float lat=asin(clamp(n.y,-1.,1.));
        float islands=smoothstep(-.08,.63,.63*sin(lon*4.+lat*4.8)+.34*cos(lon*7.2-lat*6.2+phase*.23));
        float edge=pow(rim,8.)*.44+pow(rim,3.7)*.024;
        float echoRim=exp(-pow((facing-.16-.04*sin(lon*7.))/.028,2.))*.14;
        float sparks=.10+.90*smoothstep(-.47,.68,sin(lon*116.+lat*75.+sin(lon*12.+lat*18.)*2.3));
        float light=(edge+echoRim)*islands*sparks*intensity;
        vec3 col=mix(vec3(.18,1.07,1.34),vec3(.75,2.25,1.75),clamp(edge*1.4,0.,1.));
        float warmth=(1.-step(.5,echo))*(.91-.42*smoothstep(.55,2.4,phase));col=mix(col,vec3(2.6,1.36,.27),warmth); gl_FragColor=vec4(col,light);}`
      });
      const m = new T5.Mesh(sphere, mat);
      m.position.copy(origin);
      m.name = "\u7531\u540C\u4E00\u8282\u70B9\u53D1\u51FA\u7684\u7A7A\u95F4\u6CE2\u524D";
      m.frustumCulled = false;
      scene.add(m);
      return { start, m, u };
    });
    return (t) => {
      for (const [i, r] of layers.entries()) {
        const age = t - r.start, rad = age * (i === 0 ? 12.75 : i === 1 ? 13.1 : 13.8);
        r.m.visible = age > 0 && rad < 35 && t < 13.78;
        if (!r.m.visible) continue;
        r.m.scale.setScalar(Math.max(0.015, rad));
        r.u.phase.value = age;
        r.u.intensity.value = Math.min(1, age / 0.18) * (1 - Math.max(0, Math.min(1, (rad - 19) / 16))) * (1 - Math.max(0, Math.min(1, (t - 13.24) / 0.54))) * (i === 0 ? 1 : i === 1 ? 0.86 : 0.64);
      }
    };
  }
  function createWaveTraces(scene, origin) {
    const rng = randomFrom(728439), dir = [], key = [];
    for (let i = 0; i < 330; i++) {
      const z = rng() * 2 - 1, a = rng() * 2 * Math.PI, h = Math.sqrt(1 - z * z);
      const v = [h * Math.cos(a), z, h * Math.sin(a)], phase = rng(), shape = rng();
      for (let j = 0; j < 7; j++) for (const n of [j, j + 1]) {
        dir.push(...v);
        key.push(phase, shape, n / 7);
      }
    }
    const g = new T5.BufferGeometry();
    g.setAttribute("position", new T5.Float32BufferAttribute(dir, 3));
    g.setAttribute("data", new T5.Float32BufferAttribute(key, 3));
    const u = { time: { value: 0 }, src: { value: origin } };
    const mat = new T5.ShaderMaterial({
      uniforms: u,
      blending: T5.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexShader: `uniform float time;uniform vec3 src;attribute vec3 data;varying float alpha;varying vec3 tint;
   void main(){float start=data.x<.52?9.04762:(data.x<.79?10.95238:12.38095);
   float age=time-start-.06-data.y*.19;float tail=data.z*(.045+.12*data.y);
   float lapse=max(0.,age-tail);float r=lapse*(11.2+data.y*4.9);
   vec3 bend=vec3(position.y,-position.x,position.z*.22)*sin(lapse*1.17+data.x*17.)*.045*r;
   vec3 p=src+position*r+bend;float k=1.-smoothstep(16.,33.,r);
   alpha=smoothstep(.02,.23,age)*k*(1.-data.z*.92)*(.13+.34*data.y)*(1.-smoothstep(13.2,13.74,time));
   tint=mix(vec3(.31,1.45,1.59),vec3(2.1,1.25,.45),smoothstep(.79,.90,data.y));gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader: "varying float alpha;varying vec3 tint;void main(){gl_FragColor=vec4(tint,alpha);}"
    });
    const traces = new T5.LineSegments(g, mat);
    traces.frustumCulled = false;
    scene.add(traces);
    return (time) => {
      traces.visible = time > 9.04762 && time < 13.74;
      u.time.value = time;
    };
  }
  function buildParticleField(scene, nodes, origin, map) {
    const cloud = createCloud(scene, nodes, origin, map), skin = createWaveSkin(scene, origin), crests = createPulseCrests(scene, origin), traces = createWaveTraces(scene, origin);
    return { count: cloud.count, update(t, ratio, anchor) {
      cloud.update(t, ratio, anchor);
      skin(t, ratio);
      crests(t);
      traces(t);
    } };
  }
  var import_three8 = __toESM(require_three(), 1);
  function makeFramedFlight(camera, origin) {
    const originalFlight = makeFlight(camera, origin);
    const target = new import_three8.Vector3();
    return (time) => {
      const original = originalFlight(time);
      const wave = ease5(8.52, 10.32, time) * (1 - ease5(11.25, 12.88, time));
      const cloud = ease5(12.22, 14.48, time) * (1 - ease5(16.12, 19.35, time));
      const reveal = ease5(15.45, 17.02, time) * (1 - ease5(18.22, 20.12, time));
      const recoil = ease5(17.45, 20.15, time) * (1 - ease5(20.85, 22.65, time));
      const distanceFactor = 1 + 0.14 * wave + 0.12 * cloud + 0.08 * reveal + 0.1 * recoil;
      const verticalShiftPixels = 20 * wave - 14 * cloud + 40 * reveal + 36 * recoil;
      target.fromArray(original.focus);
      camera.position.sub(target).multiplyScalar(distanceFactor).add(target);
      camera.setViewOffset(FILM.width, FILM.height, 0, verticalShiftPixels, FILM.width, FILM.height);
      camera.updateMatrixWorld(true);
      return { ...original, originalEye: original.eye, eye: camera.position.toArray(), distanceFactor, verticalShiftPixels };
    };
  }
  var T6 = __toESM(require_three(), 1);
  function makeReferenceStars(scene) {
    const rng = randomFrom(2791), p = [], style = [];
    for (let i = 0; i < 2100; i++) {
      const depth = -162 + 198 * rng();
      p.push((rng() - 0.5) * 188, (rng() - 0.5) * 129, depth);
      style.push(rng(), rng(), rng(), rng());
    }
    const geo = new T6.BufferGeometry();
    geo.setAttribute("position", new T6.Float32BufferAttribute(p, 3));
    geo.setAttribute("seed", new T6.Float32BufferAttribute(style, 4));
    const uniforms = { sec: { value: 0 }, ratio: { value: 1 }, gain: { value: 1 } };
    const mat = new T6.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: T6.AdditiveBlending,
      vertexShader: `uniform float sec,ratio,gain;attribute vec4 seed;varying vec3 color;varying float intensity,ray;
      void main(){
        vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;
        ray=smoothstep(.87,1.,seed.x);float depth=-mv.z;
        float width=clamp((2.5+ray*9.5)*58./max(12.,depth),1.45,15.);
        gl_PointSize=width*ratio;
        intensity=(.24+.84*ray)*(.8+.20*sin(sec*(.65+seed.y)+seed.z*43.))*gain*smoothstep(4.,17.,depth);
        color=mix(vec3(.34,.62,1.22),vec3(1.78,1.06,.46),smoothstep(.46,.72,seed.w));
      }`,
      fragmentShader: `varying vec3 color;varying float intensity,ray;void main(){
      vec2 p=2.*gl_PointCoord-1.;float r=dot(p,p);if(r>1.)discard;
      float core=exp(-r*13.9),halo=.13*exp(-r*3.3);
      float flare=ray*ray*.16*(exp(-abs(p.x+p.y*.18)*26.-abs(p.y)*3.8)+exp(-abs(p.y-p.x*.18)*26.-abs(p.x)*3.8));
      gl_FragColor=vec4(color,intensity*(core+halo+flare));
    }`
    });
    const stars = new T6.Points(geo, mat);
    stars.renderOrder = -41;
    stars.frustumCulled = false;
    scene.add(stars);
    return (t, r) => {
      uniforms.sec.value = t;
      uniforms.ratio.value = r;
      uniforms.gain.value = 0.3 + 0.57 * smooth2(9, 14, t) - 0.23 * smooth2(20, 23, t);
    };
  }
  function createSky(scene) {
    const uniforms = { uTime: { value: 0 }, gain: { value: 1 } };
    const mat = new T7.ShaderMaterial({
      uniforms,
      depthWrite: false,
      depthTest: false,
      vertexShader: `varying vec2 xy;void main(){xy=position.xy;gl_Position=vec4(position.xy,.99,1.);}`,
      fragmentShader: `uniform float uTime,gain;varying vec2 xy;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
    void main(){vec2 p=xy+vec2(uTime*.001,.0);
      float grain=noise(p*3.1)*.57+noise(p*6.7)*.28+noise(p*14.9)*.12;
      float bank=exp(-pow((p.y+.14-p.x*.36+.19*sin(p.x*4.3))*1.70,2.));
      float edge=1.-smoothstep(.45,1.6,length(xy*vec2(.84,1.)));
      vec3 c=vec3(.0017,.0046,.0125)+grain*bank*vec3(.0038,.0085,.018)+edge*vec3(.0011,.0016,.005);
      gl_FragColor=vec4(c*gain,1.);}`
    });
    const sky = new T7.Mesh(new T7.PlaneGeometry(2, 2), mat);
    sky.frustumCulled = false;
    sky.renderOrder = -100;
    scene.add(sky);
    return uniforms;
  }
  async function buildFilm(worldCanvas, overlayCanvas, options = {}) {
    const ratio = clamp5(options.scale ?? 0.6, 0.3, 1);
    const map = await densityTexture();
    const renderer = new T7.WebGLRenderer({ canvas: worldCanvas, alpha: false, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true });
    renderer.setPixelRatio(1);
    renderer.setSize(Math.round(FILM.width * ratio), Math.round(FILM.height * ratio), false);
    renderer.outputColorSpace = T7.SRGBColorSpace;
    renderer.toneMapping = T7.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.13;
    renderer.setClearColor(198933, 1);
    overlayCanvas.width = Math.round(FILM.width * ratio);
    overlayCanvas.height = Math.round(FILM.height * ratio);
    const scene = new T7.Scene(), camera = new T7.PerspectiveCamera(FILM.fov, 4 / 3, 0.15, 2100);
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const glow = new UnrealBloomPass(new T7.Vector2(FILM.width * ratio, FILM.height * ratio), 0.46, 0.43, 0.72);
    composer.addPass(glow);
    composer.addPass(new OutputPass());
    const sky = createSky(scene), space = createDigitalSpace(scene), network = buildNetwork(scene, camera);
    const digits = space.group.getObjectByName("\u60AC\u6D6E\u4E8C\u8FDB\u5236\u788E\u7247");
    digits.material.uniforms.uGain = { value: 0.2 };
    const stars = space.group.getObjectByName("\u8FDC\u666F\u661F\u70B9\u3001\u4E2D\u666F\u6570\u636E\u4E91\u3001\u8FD1\u666F\u6563\u7C92").material;
    stars.uniforms.uPixelRatio = { value: ratio };
    stars.vertexShader = "uniform float uPixelRatio;\n" + stars.vertexShader.replace("void main()", "void sourceMain()") + "\nvoid main(){sourceMain();float nearLayer=step(1.5,aLayer);gl_PointSize*=uPixelRatio*mix(.92,.68,nearLayer);vAlpha*=mix(.91,.36,nearLayer)*smoothstep(.18,.36,aSeed);}";
    const field = buildParticleField(scene, network.nodes, network.origin, map), overlay = () => null;
    const flight = makeFramedFlight(camera, network.origin), gas = makeGas(scene, map), guide = makeGuide(scene, network.origin), reference = makeReferenceStars(scene);
    flight(2.86);
    const introTargets = network.nodes.map((p, index) => ({ index, p: p.clone().project(camera) })).filter(({ p }) => p.z < 1 && Math.abs(p.x) < 0.86 && p.y > -0.56 && p.y < 0.76).sort((a, b) => a.p.x - b.p.x).map((x) => x.index);
    function introGeometry(t) {
      const convert = (p) => {
        const q = p.clone().project(camera);
        return { x: (q.x + 1) * FILM.width / 2, y: (1 - q.y) * FILM.height / 2 };
      };
      return { head: convert(network.headAt(t)), nodes: introTargets.map((i) => convert(network.nodes[i])) };
    }
    const anchor = new T7.Matrix4(), local = new T7.Matrix4(), scale = new T7.Matrix4(), pivot = new T7.Matrix4();
    const unit2 = 2 * FILM.finalDistance * Math.tan(FILM.fov * Math.PI / 360) / FILM.height, centreY = (FILM.height / 2 - 452) * unit2;
    function draw(time) {
      const t = clamp5(time, 0, FILM.duration);
      const pose2 = flight(t);
      network.update(t);
      const sign = screenAnchor(t);
      local.makeTranslation(sign.x * unit2, centreY - sign.y * unit2, -FILM.finalDistance);
      scale.makeScale(sign.scale, sign.scale, 1);
      pivot.makeTranslation(0, -centreY, 0);
      anchor.copy(camera.matrixWorld).multiply(local).multiply(scale).multiply(pivot);
      sky.uTime.value = t;
      sky.gain.value = 1 - 0.19 * smooth2(18.4, 23, t);
      space.update(t + 10.65, 0, 0.335 - 0.15 * smooth2(8.2, 10.2, t) - 0.066 * smooth2(20, 23, t), true, network.head);
      digits.material.uniforms.uGain.value = 0.23 * (1 - smooth2(8.75, 11.85, t));
      digits.visible = t < 11.85;
      field.update(t, ratio, anchor);
      gas.update(t, anchor);
      guide(t, ratio);
      reference(t, ratio);
      glow.strength = 0.37 + 0.07 * smooth2(8.65, 9.05, t) - 0.26 * smooth2(11.7, 15, t) - 0.03 * smooth2(20, 23, t);
      if (t > 1.2) composer.render(0);
      else renderer.clear();
      return overlay(t, { ...sign, y: sign.y - pose2.verticalShiftPixels }, t < 3.2 ? introGeometry(t) : void 0);
    }
    function pose(t) {
      const p = flight(t), head = t <= 9.047619 ? network.headAt(t) : lightAt(network.origin, t);
      const screen = head.clone().project(camera);
      return { ...p, light: head.toArray(), screen: [(screen.x + 1) / 2, (1 - screen.y) / 2] };
    }
    draw(0);
    return { draw, pose, introGeometry, metrics: { nodes: network.sourceCount, edges: network.edgeCount, forming: field.count, background: space.count, gasLayers: 7, releasedCloudChips: gas.total, trackedTrails: gas.trails, fps: 60 } };
  }
  window.effectReady = buildFilm(document.getElementById("world"), document.createElement("canvas"), { scale: 0.6 }).then((scene) => {
    window.drawEffect = (t) => scene.draw(t);
  });
})();
