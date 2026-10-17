// ============================================================================
// ABHISHEK G L — SUBTLE 3D WATER BUBBLES ENGINE + 3D AVATAR + 3D BLENDER VIEWER
// ============================================================================

(function () {
  const container = document.getElementById("webgl-container");
  if (!container || typeof THREE === "undefined") return;

  // --- 1. Fullscreen Background Scene (Subtle 3D Water Bubbles) ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const state = {
    mouseNDC: new THREE.Vector2(0, 0),
    targetMouseNDC: new THREE.Vector2(0, 0),
    mouseWorld: new THREE.Vector3(999, 999, 0),
    cursorActive: false,
    scrollY: 0,
    maxScroll: 1,
    bubbleCount: 580, // Increased density of subtle small star-bubbles
    repulsionRadius: 2.1,
    floatSpeed: 1.0,
    returnStrength: 1.0,
    avatarPoseMode: "cube", // 'cube' | 'front' | 'auto'
  };
  window.portfolio3DState = state;

  // --- Custom GLSL 3D Water Bubble Shader (Mathematical Sphere + Fresnel Rim + Specular Glint) ---
  const MAX_BUBBLES = 1400;
  const bubbleGeo = new THREE.PlaneGeometry(1, 1);

  const bubbleMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uMouseNDC: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vInstanceId;
      void main() {
        vUv = uv;
        vInstanceId = float(gl_InstanceID);
        vec4 worldPosition = instanceMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uMouseNDC;
      varying vec2 vUv;
      varying float vInstanceId;

      void main() {
        // Map UV to (-1, 1) unit circle
        vec2 p = vUv * 2.0 - 1.0;
        float r2 = dot(p, p);
        if (r2 > 1.0) discard;

        float r = sqrt(r2);
        // Reconstruct true 3D sphere normal z = sqrt(1 - x^2 - y^2)
        float z = sqrt(max(0.0, 1.0 - r2));
        vec3 normal = normalize(vec3(p.x, p.y, z));

        // Fresnel effect: transparent center, glowing refractive water rim
        float fresnel = pow(1.0 - z, 2.4);
        float outerSoftEdge = smoothstep(1.0, 0.88, r);

        // Primary top-left specular highlight dot (shifts slightly with cursor)
        vec3 lightDir1 = normalize(vec3(-0.45 + uMouseNDC.x * 0.15, 0.52 + uMouseNDC.y * 0.15, 0.72));
        float spec1 = pow(max(0.0, dot(normal, lightDir1)), 42.0);

        // Secondary soft bottom-right internal water reflection
        vec3 lightDir2 = normalize(vec3(0.42, -0.48, 0.65));
        float spec2 = pow(max(0.0, dot(normal, lightDir2)), 16.0) * 0.35;

        // Subtle iridescent cyan/violet water tint
        float hueShift = fract(vInstanceId * 0.13 + uTime * 0.05);
        vec3 tintCyan = vec3(0.15, 0.88, 1.0);
        vec3 tintViolet = vec3(0.58, 0.45, 0.98);
        vec3 rimColor = mix(tintCyan, tintViolet, sin(vInstanceId + uTime * 0.6) * 0.5 + 0.5);

        vec3 color = rimColor * (fresnel * 0.85 + 0.08) + vec3(1.0) * (spec1 * 0.95 + spec2);

        // Keep overall alpha very subtle and clean (transparent body, crisp rim & glint)
        float alpha = (fresnel * 0.38 + spec1 * 0.75 + spec2 * 0.25 + 0.025) * outerSoftEdge;

        gl_FragColor = vec4(color, alpha * 0.72);
      }
    `,
  });

  const instancedBubbles = new THREE.InstancedMesh(bubbleGeo, bubbleMat, MAX_BUBBLES);
  instancedBubbles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(instancedBubbles);

  // Subtle Water Ripple Ring around Cursor
  const rippleGeo = new THREE.RingGeometry(0.95, 1.0, 64);
  const rippleMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.0,
  });
  const cursorRipple = new THREE.Mesh(rippleGeo, rippleMat);
  scene.add(cursorRipple);

  // Bubble Physics Arrays
  const posX = new Float32Array(MAX_BUBBLES);
  const posY = new Float32Array(MAX_BUBBLES);
  const posZ = new Float32Array(MAX_BUBBLES);
  const velX = new Float32Array(MAX_BUBBLES);
  const velY = new Float32Array(MAX_BUBBLES);
  const homeX = new Float32Array(MAX_BUBBLES);
  const homeY = new Float32Array(MAX_BUBBLES);
  const baseScale = new Float32Array(MAX_BUBBLES);
  const phase = new Float32Array(MAX_BUBBLES);

  function initBubbles() {
    for (let i = 0; i < MAX_BUBBLES; i++) {
      const hx = (Math.random() - 0.5) * 17.5;
      const hy = (Math.random() - 0.5) * 10.5;
      const hz = (Math.random() - 0.5) * 2.5 - 1.0;

      homeX[i] = hx;
      homeY[i] = hy;
      posX[i] = hx;
      posY[i] = hy;
      posZ[i] = hz;
      velX[i] = 0;
      velY[i] = 0;

      // Rich mix of small star-bubbles (82%) and soft medium water bubbles (18%)
      const r = Math.random();
      baseScale[i] = r < 0.82 ? 0.055 + Math.random() * 0.09 : 0.18 + Math.random() * 0.18;
      phase[i] = Math.random() * Math.PI * 2;
    }
  }
  initBubbles();

  window.portfolio3DAPI = {
    triggerBurst: () => {
      for (let i = 0; i < MAX_BUBBLES; i++) {
        velX[i] += (Math.random() - 0.5) * 0.25;
        velY[i] += (Math.random() - 0.5) * 0.25;
      }
    },
  };

  // --- Mouse & Scroll Listeners ---
  const raycaster = new THREE.Raycaster();
  const intersectPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.8);

  window.addEventListener("pointermove", (e) => {
    state.targetMouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
    state.targetMouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    state.cursorActive = true;

    raycaster.setFromCamera(state.targetMouseNDC, camera);
    raycaster.ray.intersectPlane(intersectPlane, state.mouseWorld);

    update3DAvatarRig(state.targetMouseNDC.x, state.targetMouseNDC.y);
  });

  window.addEventListener("scroll", () => {
    state.scrollY = window.scrollY;
    state.maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    updateAvatarScroll(state.scrollY);
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ==========================================================================
  // PART 2: NANO BANANA 3D AVATAR INTERACTIVE RIG (CURSOR & SCROLL REACTIVE)
  // ==========================================================================
  function update3DAvatarRig(mx, my) {
    const card = document.getElementById("portrait-3d-rig");
    const lightGlow = document.getElementById("portrait-cursor-glow");
    const bgRings = document.getElementById("portrait-bg-rings");
    const imgWrap = document.getElementById("portrait-subject-layer");
    const cubeImg = document.getElementById("avatar-3d-cube-img");
    const frontImg = document.getElementById("avatar-3d-front-img");

    if (card) {
      const rotY = mx * 15;
      const rotX = -my * 11;
      card.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    }
    if (imgWrap) {
      imgWrap.style.transform = `translate3d(${(mx * 12).toFixed(1)}px, ${(-my * 9).toFixed(1)}px, 32px)`;
    }
    if (bgRings) {
      bgRings.style.transform = `translate3d(${(-mx * 16).toFixed(1)}px, ${(my * 12).toFixed(1)}px, -20px) rotate(${(mx * 18).toFixed(1)}deg)`;
    }
    if (lightGlow) {
      const gx = 50 + mx * 40;
      const gy = 45 - my * 40;
      lightGlow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(0, 240, 255, 0.28) 0%, rgba(139, 92, 246, 0.14) 42%, transparent 72%)`;
    }

    // In 'auto' mode, smoothly crossfade between 3/4 Cube Pose and Front Gaze based on cursor X!
    if (state.avatarPoseMode === "auto" && cubeImg && frontImg) {
      if (mx < -0.05) {
        cubeImg.style.opacity = "1";
        frontImg.style.opacity = "0";
      } else {
        cubeImg.style.opacity = "0";
        frontImg.style.opacity = "1";
      }
    }
  }

  function updateAvatarScroll(scrollY) {
    const stage = document.getElementById("hero-avatar-stage");
    if (!stage) return;
    const progress = Math.min(1, scrollY / 700);
    const rotY = progress * -8;
    const translateY = progress * 32;
    stage.style.transform = `translateY(${translateY.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg)`;
  }

  // --- Main 60 FPS Water Bubbles Animation Loop ---
  const dummy = new THREE.Object3D();
  const clock = new THREE.Clock();
  let frameCount = 0;
  let lastFpsUpdate = performance.now();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    state.mouseNDC.lerp(state.targetMouseNDC, 0.08);

    bubbleMat.uniforms.uTime.value = elapsed;
    bubbleMat.uniforms.uMouseNDC.value.copy(state.mouseNDC);

    const activeCount = Math.min(MAX_BUBBLES, state.bubbleCount);
    instancedBubbles.count = activeCount;

    const mx = state.mouseWorld.x;
    const my = state.mouseWorld.y;
    const repelR = state.repulsionRadius;
    const repelR2 = repelR * repelR;
    const springK = state.returnStrength * 0.014;

    if (state.cursorActive) {
      cursorRipple.position.set(mx, my, -0.8);
      const pulse = 1.0 + Math.sin(elapsed * 3.0) * 0.05;
      cursorRipple.scale.setScalar(repelR * 0.55 * pulse);
      rippleMat.opacity = THREE.MathUtils.lerp(rippleMat.opacity, 0.09, 0.08);
    }

    for (let i = 0; i < activeCount; i++) {
      // Gentle upward buoyancy drift + sine wave bobbing on the home anchor
      homeY[i] += 0.0035 * state.floatSpeed;
      if (homeY[i] > 5.6) homeY[i] = -5.6;

      const targetX = homeX[i] + Math.sin(elapsed * 0.8 + phase[i]) * 0.18;
      const targetY = homeY[i] + Math.cos(elapsed * 0.7 + phase[i]) * 0.12;

      let px = posX[i];
      let py = posY[i];
      let vx = velX[i];
      let vy = velY[i];

      // Fluid spring back toward floating path
      vx += (targetX - px) * springK;
      vy += (targetY - py) * springK;

      // FLUID CURSOR REPULSION (Water bubbles parting smoothly around cursor)
      let scaleBoost = 1.0;
      if (state.cursorActive) {
        const dx = px - mx;
        const dy = py - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < repelR2 && d2 > 0.0001) {
          const d = Math.sqrt(d2);
          const falloff = Math.pow(1.0 - d / repelR, 1.8);
          const push = falloff * 0.065;
          vx += (dx / d) * push;
          vy += (dy / d) * push;
          scaleBoost = 1.0 + falloff * 0.35; // Bubbles gently swell as they glide away
        }
      }

      // Smooth water drag damping
      vx *= 0.90;
      vy *= 0.90;

      px += vx;
      py += vy;

      posX[i] = px;
      posY[i] = py;
      velX[i] = vx;
      velY[i] = vy;

      dummy.position.set(px, py, posZ[i]);
      dummy.rotation.set(0, 0, 0);
      const s = baseScale[i] * scaleBoost * (1.0 + Math.sin(elapsed * 1.5 + phase[i]) * 0.06);
      dummy.scale.set(s, s, 1);
      dummy.updateMatrix();
      instancedBubbles.setMatrixAt(i, dummy.matrix);
    }

    instancedBubbles.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);

    frameCount++;
    const now = performance.now();
    if (now - lastFpsUpdate >= 600) {
      const fps = Math.min(60, Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
      const fpsEl = document.getElementById("telemetry-fps");
      if (fpsEl) {
        fpsEl.textContent = `${state.bubbleCount} WATER BUBBLES · ${fps} FPS`;
      }
      frameCount = 0;
      lastFpsUpdate = now;
    }
  }

  animate();
})();

// ============================================================================
// PART 3: INTERACTIVE 3D BLENDER HOUSE VIEWER (30x40 DUPLEX REV-002 .GLB)
// ============================================================================
(function () {
  window.initBlender3DViewer = function () {
    const mount = document.getElementById("blender-3d-canvas-wrap");
    if (!mount || typeof THREE === "undefined" || !THREE.GLTFLoader) return;

    const width = mount.clientWidth || 560;
    const height = mount.clientHeight || 360;

    const bScene = new THREE.Scene();
    bScene.background = new THREE.Color(0x080c16);

    const bCamera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    bCamera.position.set(14, 10, 16);

    const bRenderer = new THREE.WebGLRenderer({ antialias: true });
    bRenderer.setSize(width, height);
    bRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bRenderer.shadowMap.enabled = true;
    mount.innerHTML = "";
    mount.appendChild(bRenderer.domElement);

    const controls = new THREE.OrbitControls(bCamera, bRenderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 3.2, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    const hemiLight = new THREE.HemisphereLight(0xe2f1ff, 0x1e293b, 1.15);
    bScene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.35);
    dirLight.position.set(18, 28, 22);
    bScene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x00f0ff, 0.45);
    rimLight.position.set(-16, 12, -14);
    bScene.add(rimLight);

    const grid = new THREE.GridHelper(28, 28, 0x00f0ff, 0x1e293b);
    grid.position.y = -0.05;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    bScene.add(grid);

    let currentModel = null;
    let isWireframe = false;
    const loader = new THREE.GLTFLoader();

    function loadBuildingGLB(glbPath) {
      const statusEl = document.getElementById("glb-loading-status");
      if (statusEl) {
        statusEl.style.display = "block";
        statusEl.textContent = "Loading 3D Blender BIM Mesh...";
      }

      loader.load(
        glbPath,
        (gltf) => {
          if (currentModel) bScene.remove(currentModel);
          currentModel = gltf.scene;

          const box = new THREE.Box3().setFromObject(currentModel);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          currentModel.position.x -= center.x;
          currentModel.position.z -= center.z;
          currentModel.position.y -= box.min.y;

          currentModel.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material.wireframe = isWireframe;
            }
          });

          bScene.add(currentModel);
          controls.target.set(0, size.y * 0.42, 0);
          const maxDim = Math.max(size.x, size.y, size.z);
          bCamera.position.set(maxDim * 1.15, maxDim * 0.85, maxDim * 1.35);
          controls.update();

          if (statusEl) statusEl.style.display = "none";
        },
        undefined,
        (err) => {
          console.error("Error loading GLB:", err);
          if (statusEl) statusEl.textContent = "Error loading 3D model";
        }
      );
    }

    loadBuildingGLB("assets/renders/duplex_rev002.glb");

    window.blenderViewerAPI = {
      loadModel: (glbPath) => loadBuildingGLB(glbPath),
      toggleWireframe: () => {
        isWireframe = !isWireframe;
        if (currentModel) {
          currentModel.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material.wireframe = isWireframe;
            }
          });
        }
        return isWireframe;
      },
      resetCamera: () => {
        bCamera.position.set(14, 10, 16);
        controls.target.set(0, 3.2, 0);
        controls.update();
      },
    };

    window.addEventListener("resize", () => {
      if (!mount.clientWidth) return;
      bCamera.aspect = mount.clientWidth / mount.clientHeight;
      bCamera.updateProjectionMatrix();
      bRenderer.setSize(mount.clientWidth, mount.clientHeight);
    });

    function renderLoop() {
      requestAnimationFrame(renderLoop);
      controls.update();
      bRenderer.render(bScene, bCamera);
    }
    renderLoop();
  };
})();
