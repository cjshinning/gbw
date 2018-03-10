import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Layout from '@/views/Layout'
import Card from '@/views/card/Card'
import Platform from '@/views/platform/Platform'
import Record from '@/views/record/Record'
import ActivityRecord from '@/views/record/ActivityRecord'
import TestRecord from '@/views/record/TestRecord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      name: '卡券',
      children: [{ path: '/card', component: Card, name: '卡券列表'}]
    },
    {
      path: '/',
      component: Layout,
      name: '平台',
      children: [{ path: '/platform', component: Platform, name: '平台列表'}]
    },
    {
      path: '/',
      component: Layout,
      name: '记录',
      children: [
        { path: '/record', component: Record, name: '所有记录列表'},
        { path: '/activityRecord', component: ActivityRecord, name: '当前活动记录'},
        { path: '/testRecord', component: TestRecord, name: '活动测试记录'}
      ]
    }
  ]
})
