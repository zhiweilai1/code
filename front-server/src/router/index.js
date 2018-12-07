import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/page/index'
import AdCompanyList from '@/page/admin/company-list'
import AdOfficList from '@/page/admin/offic-list'
import OfficResume from '@/page/admin/resume-list'
import AdStudent from '@/page/admin/student-list'

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
    }
  ]
})
