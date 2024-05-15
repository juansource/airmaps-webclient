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
    fetch('https://52.12.227.98:3000/Projects')
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
