<template>
  <div class="hello">
    <!-- Button to fetch model names -->
    <button @click="getModelName">Get Model Name</button>
    <p v-if="modelName">Model Name: {{ modelName }}</p>
    <button @click="getFilePath">Get File Path</button>
    <p v-if="filepath">File Path: {{ filepath }}</p>
    <!-- Display the fetched model name -->
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    projectId() {
      return this.$store.state.currentProjectId;
    }
  },
  mounted() {
    console.log('Project ID from the store:', this.projectId); // This should log the updated ID
  },
  name: 'HelloWorld',
  data() {
    return {
      modelName: '',  // Store the fetched model name
      filepath: '',
    };
  },
  methods: {
    getModelName() {
      axios.get('http://localhost:3001/3dmodels')
        .then(response => {
          if (response.data.length > 0) {
            // Assuming the response data is an array of objects with a 'ModelName' property
            this.modelName = response.data[0].ModelName;  // Display the name of the first model
            console.log("modelname:")
            console.log(this.modelName)
          } else {
            console.error('No models found in the database.');
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    getFilePath() {
      axios.get('http://localhost:3001/3dmodels')
        .then(response => {
          if (response.data.length > 0) {
            // Assuming the response data is an array of objects with a 'ModelName' property
            this.filepath = response.data[0].FilePath;  // Display the name of the first model
            console.log("filepath:")
            console.log(this.filepath)
          } else {
            console.error('No file path found in the database.');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  margin: 20px 0;
}
</style>
