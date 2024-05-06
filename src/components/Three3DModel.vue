<template>
  <div class="container">
    <div ref="modelContainer" class="model-container"></div>
    <!-- Add a button to re-home the camera as an overlay on the right side -->
    <button @click="reHomeCamera" class="overlay-button">Re-Home Camera</button>
    <!-- Add zoom in and zoom out buttons next to each other at the bottom right -->
    <div class="zoom-buttons">
      <button @click="zoomIn" class="zoom-button">Zoom In</button>
      <button @click="zoomOut" class="zoom-button">Zoom Out</button>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default {
  data() {
    return {
      camera: null,
      controls: null,
    };
  },
  mounted() {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 0, 100);

    // Create a renderer container with relative position
    const rendererContainer = document.createElement('div');
    rendererContainer.style.position = 'relative';
    this.$refs.modelContainer.appendChild(rendererContainer);

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.antialias = true;
    rendererContainer.appendChild(renderer.domElement);

    // Load the 3D model with MTL file
    const mtlLoader = new MTLLoader();
    mtlLoader.load('odm_texturing/odm_textured_model.mtl', (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('odm_texturing/odm_textured_model_geo.obj', (object) => {
        scene.add(object);
      });
    });

    // Add ambient light and directional light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add camera controls
    // this.controls = new TrackballControls(this.camera, renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      renderer.render(scene, this.camera);
    };

    // Start the animation loop
    animate();
  },
  methods: {
    reHomeCamera() {
      // Reset the camera position to its initial values
      this.camera.position.set(0, 0, 100);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
    },
    zoomIn() {
      // Implement zoom in logic
      this.camera.position.z -= 20;
      this.controls.update();
    },
    zoomOut() {
      // Implement zoom out logic
      this.camera.position.z += 20;
      this.controls.update();
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
}

.model-container {
  width: 100%;
  height: 100%;
}

.overlay-button,
.zoom-buttons {
  position: absolute;
  z-index: 1; /* Ensure the buttons are on top of the 3D model */
}

.overlay-button {
  top: 10px;
  right: 10px;
  padding: 5px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  cursor: pointer;
}

.zoom-buttons {
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
}

.zoom-button {
  margin-bottom: 5px;
  padding: 5px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  cursor: pointer;
}
</style>
