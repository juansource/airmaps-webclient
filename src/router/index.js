// import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Three3DModel from '../views/Three3DModelView.vue';
import ExternalModelViewer from '../views/ModelDevView.vue'; 
import LeafLet from '../views/LeafletView.vue';
import annotation from '../views/AnnotationView.vue';
import Gallery from '../views/GalleryView.vue';
import DataBase from '../views/DataBaseView.vue';
import ProjectSelect from '../views/ProjectSelectView.vue';

import ProjectDetails from '../views/ProjectDetailsView.vue';

import store from '../store';
const routes = [
  {
    path: '/',
    component: ProjectSelect
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/three-3d-model',
    component: Three3DModel
  },
  {
    path: '/model-dev',
    component: ExternalModelViewer
  },
  {
    path: '/annotations',
    component: annotation
  },
  {
    path: '/leaflet',
    component: LeafLet
  },
  {
    path: '/gallery',
    component: Gallery
  },
  {
    path: '/database',
    component: DataBase
  },
  {
    path: '/project-select',
    component: ProjectSelect
  },
  {
    path: '/project/:id',
    component: ProjectDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  // Use store state here, for example:
  if (to.matched.some(record => record.meta.requiresProjectId)) {
    if (store.state.currentProjectId) {
      next();
      console.log('Before each route: currentProjectId is', store.state.currentProjectId); // For debugging
    } else {
      console.log('Before each route: currentProjectId is', store.state.currentProjectId); // For debugging
      next({ name: 'ProjectSelect' }); // Redirect to ProjectSelect if projectId is not set
    }
  } else {
    next(); // Proceed if no projectId is required
  }
});



export default router
