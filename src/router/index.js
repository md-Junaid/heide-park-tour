import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/views/HomePage';
import Login from '@/views/Login';
import Attractions from '@/views/Attractions';
import TourPlanner from '@/views/TourPlanner';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/admin',
    name: 'Login',
    component: Login
  },
  {
    path: '/attractions',
    name: 'Attractions',
    component: Attractions
  },
  {
    path: '/planner',
    name: 'TourPlanner',
    component: TourPlanner
  }
];

const router = new VueRouter({
  routes
});

export default router;
