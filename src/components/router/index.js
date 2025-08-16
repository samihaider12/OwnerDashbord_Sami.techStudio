 
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase'; // firebase.js se import
import { onAuthStateChanged } from 'firebase/auth';

import login from '../login.vue';
import Signup from '../Signup.vue';
import Dashbord from '../Dashbord.vue';
import User from '../User.vue';
import charts from '../charts.vue';
import Setting from '../Setting.vue';
const routes = [
  { path: '/login', component: login },
  { path: '/signup', component: Signup },
  {
    path: '/Dashbord',
    component: Dashbord,
    meta: { requiresAuth: true }
  },
  {
    path:'/Setting',
    component:Setting,
meta: { requiresAuth: true }
  },
  {
     path:'/charts',
     component:charts,
     meta: { requiresAuth: true }
  },
  {
     path: '/User',
     component: User,
     meta: { requiresAuth: true }
  },

  { path: '/:pathMatch(.*)*', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next('/signup');
    } else if ((to.path === '/login' || to.path === '/signup') && user) {
      next('/Dashbord');
    } else {
      next();
    }
  });
});

export default router;
