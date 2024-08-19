// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import { overlayGuard } from './overlayGuard';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    alias: '/home'
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(overlayGuard);
// router.beforeEach(overlayGuard);

export default router;
