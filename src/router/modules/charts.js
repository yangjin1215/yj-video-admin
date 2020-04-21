/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: (resolve) => require(['@/views/charts/keyboard'], resolve),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true }
    },
    {
      path: 'line',
      component: (resolve) => require(['@/views/charts/line'], resolve),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: (resolve) => require(['@/views/charts/mix-chart'], resolve),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    }
  ]
}

export default chartsRouter
