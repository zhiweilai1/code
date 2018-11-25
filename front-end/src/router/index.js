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
import PersonalInformation from '@/page/personal-information'
import Resume from '@/page/resume'
import Application from '@/page/application'
import Historys from '@/page/history'

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
    },
    {
      path: '/personal-information',
      name: 'PersonalInformation',
      component: PersonalInformation
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/application',
      name: 'Application',
      component: Application
    },
    {
      path: '/history',
      name: 'History',
      component: Historys
    }
  ]
})
