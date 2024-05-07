<!--<template>
  <div>
    
  </div>
</template>

<script>
// eslint-disable-next-line
let projects;
let num_projects = 10; // Correct declaration with 'let' for block scope
const requestOptions = {
  method: "GET"
};
fetch("http://localhost:3000/Projects", requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data.length);
    num_projects = data.length;
    projects = data;
    console.log(num_projects);
    projects.forEach(project => console.log(project.projectId));
  })
</script>
-->
<template>
  <div class="page-name">
    <h1>Your Projects</h1>
  </div>
  <div>
    <div v-for="project in projects" :key="project.projectId" @click="goToProject(project.projectId)" class="card"> 
      <h3>{{ project.projectId }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log('Project ID from store:', this.$store.state.currentProjectId);
  },
  data() {
    return {
      projects: []
    };
  },
  created() {
    // for fetching the project IDs
    fetch("http://localhost:3000/Projects")
      .then(response => response.json())
      .then(data => {
        this.projects = data;
      })
      .catch(error => console.error('Error:', error));
    //console.log("project: ", this.projects);
  },
  
  methods: {
    // When a project is selected
    goToProject(projectId) {
      this.$store.dispatch('selectProject', projectId);
      this.$router.push(`/project/${projectId}`);
      // console.log('Project selected:', this.$store.state.currentProjectId);
    },
  }
};
</script>

<style>
.card {
  cursor: pointer;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 300px;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
</style>
