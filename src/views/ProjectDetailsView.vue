<template>
    <div>
      
      <p>Project ID: {{ $route.params.id }}</p>
      <!-- <h1>Project Details</h1>Add more details here -->
    </div>
</template>
  
<script>
import { ref } from 'vue';
export default {
  name: 'ProjectDetailsView',
  data() {
    return{
      images: ref(),
      projectId: ""
    }
  },
  mounted() {
    // console.log('Project ID from store:', this.$store.state.currentProjectId);
  },
  created() {
    // for fetching the galleryImage
    console.log("fetching galleryImages start");
    fetch("http://localhost:3000/GalleryImages?projectId=" + this.$store.state.currentProjectId)
      .then(response => response.json())
      .then(data => {
        this.images.value = data;
        console.log("data: ", data);
      })
      .catch(error => console.error('Error:', error));
    console.log("fetching galleryImages done");
    console.log("images: ", this.images)
  }
};
</script>
  