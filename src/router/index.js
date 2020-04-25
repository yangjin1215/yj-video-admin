import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
import manageRouter from './modules/manage'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect/index'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login/index'], resolve),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: (resolve) => require(['@/views/login/auth-redirect'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error-page/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error-page/401'], resolve),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/manage/home'], resolve),
        name: 'home',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/documentation/index'], resolve),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/guide/index'], resolve),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  manageRouter,
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   hidden: true,
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: (resolve) => require(['@/views/permission/page'], resolve),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: (resolve) => require(['@/views/permission/directive'], resolve),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: (resolve) => require(['@/views/permission/role'], resolve),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/icons/index'], resolve),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // {
  //   path: '/example',
  //   component: Layout,
  //   hidden: true,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: (resolve) => require(['@/views/example/create'], resolve),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: (resolve) => require(['@/views/example/edit'], resolve),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: (resolve) => require(['@/views/example/list'], resolve),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/tab/index'], resolve),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: (resolve) => require(['@/views/error-page/401'], resolve),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: (resolve) => require(['@/views/error-page/404'], resolve),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/error-log/index'], resolve),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   hidden: true,
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: (resolve) => require(['@/views/excel/export-excel'], resolve),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: (resolve) => require(['@/views/excel/select-excel'], resolve),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: (resolve) => require(['@/views/excel/merge-header'], resolve),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: (resolve) => require(['@/views/excel/upload-excel'], resolve),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   hidden: true,
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: (resolve) => require(['@/views/zip/index'], resolve),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   hidden: true,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/pdf/index'], resolve),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   hidden: true,
  //   component: (resolve) => require(['@/views/pdf/download'], resolve)
  // },

  // {
  //   path: '/theme',
  //   hidden: true,
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/theme/index'], resolve),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   hidden: true,
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/clipboard/index'], resolve),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
