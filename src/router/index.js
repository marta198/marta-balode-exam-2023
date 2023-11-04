import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'
import Songs from '../views/Songs.vue'
import Albums from '../views/Albums.vue'
import About from '../views/About.vue'

const routes = [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            component: Songs
        },
        {
            path: '/albums',
            component: Albums
        },
        {
            path: '/about',
            component: About
        }
    ];
  
    const router = createRouter({
      history: createWebHistory(),
      routes
    });

router.beforeEach((to, from, next) => {
  const isLoggedIn = useAuthStore().authenticated;

  if (!isLoggedIn && to.path !== '/login') {
    next('/login'); 
  } else if (isLoggedIn && to.path === '/login') {
    next('/');
  } else {
    next();
  }
});


export default router;
