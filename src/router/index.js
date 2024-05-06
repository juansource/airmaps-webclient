// import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Three3DModel from '../views/Three3DModelView.vue';
import ExternalModelViewer from '../views/ModelDevView.vue'; 
import LeafLet from '../views/LeafletView.vue';
import annotation from '../views/AnnotationView.vue';
import Gallery from '../views/GalleryView.vue';
import DataBase from '../views/DataBaseView.vue';
const routes = [
  {
    path: '/',
    component: HomeView
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
