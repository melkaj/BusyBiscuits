import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../projects/bbtt/views/login/Login.vue';
import Register from '../projects/bbtt/views/register/Register.vue';
import HomePage from '../projects/bbtt/views/Home/Home.vue';
import LandingPage from '../views/LandingPage/LandingPage.vue';

Vue.use(VueRouter);

const routes = [
  /**
   * BUSYBISCUITS PORTFOLIO
   */
  {
    path: '/',
    name: 'port-home',  
    component: LandingPage     
  },

  

  /**
   * BUSYBISCUITS TIME TRACKER 
   */
  {
    path: '/bbtt/register',
    name: 'bbtt-register',
    component: Register
  },
  {
    path: '/bbtt/login',
    name: 'bbtt-login',
    component: Login
  },
  {
    path: '/bbtt/home',
    name: 'bbtt-home',
    component: HomePage
  },



  //   /**
  //  * BUSYBISCUITS PORTFOLIO
  //  */
  // {
  //   path: '/portfolio/home',
  //   name: 'port-home',  
  //   component: LandingPage     
  // },
  // {
  //   path: '/portfolio/register',
  //   name: 'port-register',
  //   component: Register
  // },
  // {
  //   path: '/portfolio/login',
  //   name: 'port-login',
  //   component: Login
  // },


  // {
  //   path: '/bbtt/login',
  //   name: 'bbtt-login',
  //   component: Login
  // },
  // {
  //   path: '/bbtt/home',
  //   name: 'bbtt-home',
  //   component: HomePage
  // },
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
