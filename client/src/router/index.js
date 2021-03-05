import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Login from '../views/login/Login.vue';
import Register from '../views/register/Register.vue';
import FormTimeSpent from '../views/Forms/FormTimeSpent.vue';
import HomePage from '../views/Home/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/time-spent-entry',
      name: 'timespententry',
      component: FormTimeSpent
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
