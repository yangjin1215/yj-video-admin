/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageRouter = {
  path: '/manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Manager',
  meta: {
    title: '管理专区',
    icon: 'manage'
  },
  children: [
    {
      path: 'banner',
      component: () => import('@/views/manage/banners'),
      name: 'Banner',
      meta: { title: '头图管理', icon: 'banner' }
    },
    {
      path: 'users',
      component: () => import('@/views/manage/users'),
      name: 'Users',
      meta: { title: '用户管理', icon: 'user-line' }
    },
    {
      path: 'videotype',
      component: () => import('@/views/manage/videotypes'),
      name: 'Videotypes',
      meta: { title: '栏目管理', icon: 'menu' }
    },
    {
      path: 'videos',
      component: () => import('@/views/manage/videos'),
      name: 'Videos',
      meta: { title: '视频管理', icon: 'video' }
    }
  ]
}

export default manageRouter
