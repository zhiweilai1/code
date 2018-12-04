import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/page/index'
import AdCompanyList from '@/page/admin/company-list'
import AdOfficList from '@/page/admin/offic-list'

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
    }
  ]
})
