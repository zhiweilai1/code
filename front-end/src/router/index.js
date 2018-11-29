import Vue from 'vue'
import Router from 'vue-router'
import Indexpage from '@/page/index'
import Hire from '@/page/hire'
import Person from '@/page/person'
import Company from '@/page/company'
import Office from '@/page/office'
import Login from '@/page/login'
import About from '@/page/about'
import Lian from '@/page/lian'
import Registration from '@/page/registration'
import PersonalInformation from '@/page/personal-information'
import Resume from '@/page/resume'
import Application from '@/page/application'
import Historys from '@/page/history'
import AddResume from '@/page/addResume'
import AddTec from '@/page/addTec'
import AddWorkResume from '@/page/addWorkResume'
import AddProjectResume from '@/page/addProjectResume'
import AddEvaluationResume from '@/page/addEvaluationResume'

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
    },
    {
      path: '/addResume',
      name: 'AddResume',
      component: AddResume
    },
    {
      path: '/addTec',
      name: 'AddTec',
      component: AddTec
    },
    {
      path: '/addWorkResume',
      name: 'AddWorkResume',
      component: AddWorkResume
    },
    {
      path: '/addProjectResume',
      name: 'AddProjectResume',
      component: AddProjectResume
    },
    {
      path: '/addEvaluationResume',
      name: 'AddEvaluationResume',
      component: AddEvaluationResume
    }
  ]
})
