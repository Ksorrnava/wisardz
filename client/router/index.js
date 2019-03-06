import Vue from 'vue'
import Router from 'vue-router'
import Courses from '../views/Courses'
import Students from '../views/Students'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Courses,
      name: 'courses',
      meta: {
        title: 'Courses',
      }
    },
    {
      path: '/students',
      component: Students,
      name: 'users',
      meta: {
        title: 'Users',
      }
    },
  ]
})
