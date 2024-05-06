<template>
  <div id="app">
    <model-viewer
      v-if="isMounted"
      :src="src"
      camera-controls
      orbit="0deg 0deg 0m"
      style="width: 100%; height: 100vh;"
      ar
      ar-modes="webxr scene-viewer quick-look"
      ar-scale="fixed"
      tone-mapping="commerce"
      ref="modelViewer">
      <!-- <button class="hotspot" slot="hotspot-visor" data-position="0 1.75 0.35" data-normal="0 0 1"></button> this line has slot attrabut: causes error -->
      <!-- <button class="hotspot" slot="hotspot-hand" data-position="-0.54 0.93 0.1" data-normal="-0.73 0.05 0.69"> this line has slot attrabut: causes error -->
        <!-- <div class="annotation">This hotspot disappears completely</div> -->
      <!-- </button> -->
      <!-- <button class="hotspot" slot="hotspot-foot" data-position="0.16 0.1 0.17" data-normal="-0.07 0.97 0.23" data-visibility-attribute="visible"></button> this line has slot attrabut: causes error -->
      <!--<div class="annotation">This annotation is fixed in screen-space</div>-->
    </model-viewer>
    <button class="button zoom-in-button" @click="zoomIn">Zoom In</button>
    <button class="button zoom-out-button" @click="zoomOut">Zoom Out</button>
    <button class="button reset-button" @click="resetModel">Reset Model</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  
  name: "app",
  data() {
    return {
      isMounted: false,
      src: ''
    };
  },
  mounted() {
    this.isMounted = true;
    this.loadComponent();
    this.fetchModelSrc();
  },
  computed: {
    loadComponent() {
      return () => import('@google/model-viewer');
    }
  },
  methods: {
    fetchModelSrc() { // turns on on loading of page
      axios.get('http://localhost:3000/3dmodels')
        .then(response => {
          // Assume the response has a data array and you need the first item's filepath
          if(response.data.length > 0 && response.data[0].FilePath) {
            this.src = response.data[0].FilePath;
            console.log("model found")
            console.log(this.src)
          } else {
            console.error('Model filepath not found in the response');
          }
        })
        .catch(error => {
          console.error('There was an error fetching the model src:', error);
        });
    },
    zoomIn() {
      this.adjustZoom(1.0); // You can adjust the factor based on your preference
    },
    zoomOut() {
      this.adjustZoom(-1.0); // You can adjust the factor based on your preference
    },
    adjustZoom(keyPresses) {
      const modelViewer = this.$refs.modelViewer;
      if (modelViewer) {
        modelViewer.zoom(keyPresses);
      }
    },
    resetModel() {
      const modelViewer = this.$refs.modelViewer;
      if (modelViewer) {
        modelViewer.cameraOrbit = "auto auto auto"; // Adjust the values accordingly
        modelViewer.cameraTarget = "auto auto auto";
      }
    }
  }
};
</script>

<style scoped>
.button {
  position: absolute;
  z-index: 1;
  padding: 10px;
  cursor: pointer;
}

.zoom-in-button {
  top: 10px;
  left: 10px;
}

.zoom-out-button {
  top: 50px; /* Adjust the vertical position as needed */
  left: 10px;
}

.reset-button {
  top: 10px;
  right: 10px;
}

.hotspot{
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: none;
    background-color: blue;
    box-sizing: border-box;
    pointer-events: none;
  }

  .hotspot[slot="hotspot-hand"]{
    --min-hotspot-opacity: 0;
    background-color: red;
  }

  .hotspot[slot="hotspot-foot"]:not([data-visible]) {
    background-color: transparent;
    border: 3px solid blue;
  }

  .annotation{
    background-color: #888888;
    position: absolute;
    transform: translate(10px, 10px);
    border-radius: 10px;
    padding: 10px;
  }
  /* This keeps child nodes hidden while the element loads */
  :not(:defined) > * {
    display: none;
  }
</style>
