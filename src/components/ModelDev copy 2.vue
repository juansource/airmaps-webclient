<template>
  <div id="app">
    <model-viewer
      v-if="modelSrc"
      :src="modelSrc"
      camera-controls
      orbit="0deg 0deg 0m"
      style="width: 100%; height: 100vh;"
      ar
      ar-modes="webxr scene-viewer quick-look"
      ar-scale="fixed"
      tone-mapping="commerce"
      ref="modelViewer">
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
      modelSrc: 'https://project-kiwi-temp.s3.us-west-2.amazonaws.com/odm_textured_model_geo.glb' // This will hold the model source URL
    };
  },
  mounted() {
    //this.fetchModelSrc();
  },
  methods: {
    fetchModelSrc() {
      axios.get('http://localhost:3000/3dmodels')
        .then(response => {
          // Assume the response has a data array and you need the first item's filepath
          if(response.data.length > 0 && response.data[0].ModelName) {
            this.modelSrc = response.data[0].ModelName;
            console.log("model found")
            console.log(this.modelSrc)
          } else {
            console.error('Model filepath not found in the response');
          }
        })
        .catch(error => {
          console.error('There was an error fetching the model src:', error);
        });
    },
    zoomIn() {
      this.adjustZoom(1.0); 
    },
    zoomOut() {
      this.adjustZoom(-1.0); 
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
