/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: (resolve) => require(['@/views/table/dynamic-table/index'], resolve),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: (resolve) => require(['@/views/table/drag-table'], resolve),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: (resolve) => require(['@/views/table/inline-edit-table'], resolve),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      component: (resolve) => require(['@/views/table/complex-table'], resolve),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    }
  ]
}
export default tableRouter
