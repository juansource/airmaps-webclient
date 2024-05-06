<template>
  <div style="height:44vw; width:99vw">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.70601705924626, -122.14219459757434]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-tile-layer
        url="http://127.0.0.1:8000/cog/tiles/{z}/{x}/{y}?tileMatrixSetId=WebMercatorQuad&scale=1&url=https%3A%2F%2Fproject-kiwi-temp.s3.us-west-2.amazonaws.com%2Fodm_orthophoto.tif&unscale=false&resampling=nearest&reproject=nearest&return_mask=true"
        layer-type="base"
        name="pictureLayer"
      ></l-tile-layer>
        
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      zoom: 17,
    };
  },
};

</script>

<style></style>