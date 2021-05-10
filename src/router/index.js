import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import colleges from '../views/colleges.vue'
import courses from '../views/courses.vue'
import admin from '../views/admin.vue'
import adminDashboard from '../views/adminDashboard.vue'
import addcollege from '../views/addcollege.vue'
import addcourse from '../views/addcourse.vue'
import firebase from 'firebase'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:cont_id',
    name: 'colleges',
    component: colleges
  },
  {
    path: '/courses/:coll_id',
    name: 'courses',
    component:courses
  },
  {
    path: '/admin',
    name: 'admin',
    component:admin,
    meta:{
      requiresGuest: true
    }
  },
  {
    path: '/admindashboard',
    name: 'admindashboard',
    component:adminDashboard,
    meta:{
      requiresAuth: true
    }
    
  },
  {
    path: '/addcollege',
    name: 'addcollege',
    component:addcollege,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/addcourse',
    name: 'addcourse',
    component:addcourse,
    meta:{
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) =>{
  // check requred auth
  if(to.matched.some(record => record.meta.requiresAuth)){
      //check if not loged in
       if(!firebase.auth().currentUser){
         next({
           path:"/admin",
           query:{
             redirect: to.fullPath
           }
         })} else{
            // proceed to route
            next();
         }
       } else if(to.matched.some(record => record.meta.requiresGuest)){
        if(firebase.auth().currentUser){
          next({
            path:"/admindashboard",
            query:{
              redirect: to.fullPath
            }
          })} else{
             // proceed to route
             next();
          }
       }
       else{
        // proceed to route
        next();
     }
  })
export default router
