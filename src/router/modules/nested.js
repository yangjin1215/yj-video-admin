/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  hidden: true,
  name: 'Nested',
  meta: {
    title: 'Nested Routes',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: (resolve) => require(['@/views/nested/menu1/index'], resolve), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menu 1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: (resolve) => require(['@/views/nested/menu1/menu1-1'], resolve),
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1' }
        },
        {
          path: 'menu1-2',
          component: (resolve) => require(['@/views/nested/menu1/menu1-2'], resolve),
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: 'Menu 1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: (resolve) => require(['@/views/nested/menu1/menu1-2/menu1-2-1'], resolve),
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: (resolve) => require(['@/views/nested/menu1/menu1-2/menu1-2-2'], resolve),
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: (resolve) => require(['@/views/nested/menu1/menu1-3'], resolve),
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: (resolve) => require(['@/views/nested/menu2/index'], resolve),
      meta: { title: 'Menu 2' }
    }
  ]
}

export default nestedRouter
