import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/page/index'
import AdCompanyList from '@/page/admin/company-list'
import AdOfficList from '@/page/admin/offic-list'
import OfficResume from '@/page/admin/resume-list'
import AdStudent from '@/page/admin/student-list'
import Login from '@/page/login'
import AdTeacher from '@/page/admin/teacher-list'
import Banner from '@/page/admin/banner'
import AdContact from '@/page/admin/contact-type'
import CoOfficList from '@/page/company/office-list'
import CoSet from '@/page/company/company-set'
import Forget from '@/page/Forget'
import AdcompanySet from '@/page/admin/AdcompanySet'
import AdofficSet from '@/page/admin/AdofficSet'
import Tost from '@/page/admin/Tost'
import Staff from '@/page/admin/Staff'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/AdCompanyList',
      name: 'AdCompanyList',
      component: AdCompanyList
    },
    {
      path: '/AdOfficList',
      name: 'AdOfficList',
      component: AdOfficList
    },
    {
      path: '/OfficResume',
      name: 'OfficResume',
      component: OfficResume
    },
    {
      path: '/AdStudent',
      name: 'AdStudent',
      component: AdStudent
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/AdTeacher',
      name: 'AdTeacher',
      component: AdTeacher
    },
    {
      path: '/Banner',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/AdContact',
      name: 'AdContact',
      component: AdContact
    },
    {
      path: '/CoOfficList',
      name: 'CoOfficList',
      component: CoOfficList
    },
    {
      path: '/CoSet',
      name: 'CoSet',
      component: CoSet
    },
    {
      path: '/Forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/AdcompanySet',
      name: 'AdcompanySet',
      component: AdcompanySet
    },
    {
      path: '/AdofficSet',
      name: 'AdofficSet',
      component: AdofficSet
    },{
      path: '/Tost',
      name: 'Tost',
      component: Tost
    },{
      path: '/Staff',
      name: 'Staff',
      component: Staff
    }
  ]
})
