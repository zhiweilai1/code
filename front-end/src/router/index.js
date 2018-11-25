import Vue from 'vue'
import Router from 'vue-router'
import Indexpage from '@/page/index'
import Hire from '@/page/hire'
import Person from '@/page/person'
import Company from '@/page/company'
import Office from '@/page/office'
import Deliveryrecord from '@/page/deliveryrecord'
import Login from '@/page/login'
import About from '@/page/about'
import Lian from '@/page/lian'
import Registration from '@/page/registration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Indexpage',
      component: Indexpage
    },
    {
      path: '/home',
      name: 'Indexpage',
      component: Indexpage
    },
    {
      path: '/hire',
      name: 'Hire',
      component: Hire
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/company',
      name: 'Company',
      component: Company
    },
    {
      path: '/office',
      name: 'Office',
      component: Office
    },
    {
      path: '/deliveryrecord',
      name: 'Deliveryrecord',
      component: Deliveryrecord
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/lian',
      name: 'Lian',
      component: Lian
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    }
  ]
})
