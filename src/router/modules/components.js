/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  hidden: true,
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: (resolve) => require(['@/views/components-demo/tinymce'], resolve),
      name: 'TinymceDemo',
      meta: { title: 'Tinymce' }
    },
    {
      path: 'markdown',
      component: (resolve) => require(['@/views/components-demo/markdown'], resolve),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
    {
      path: 'json-editor',
      component: (resolve) => require(['@/views/components-demo/json-editor'], resolve),
      name: 'JsonEditorDemo',
      meta: { title: 'JSON Editor' }
    },
    {
      path: 'split-pane',
      component: (resolve) => require(['@/views/components-demo/split-pane'], resolve),
      name: 'SplitpaneDemo',
      meta: { title: 'SplitPane' }
    },
    {
      path: 'avatar-upload',
      component: (resolve) => require(['@/views/components-demo/avatar-upload'], resolve),
      name: 'AvatarUploadDemo',
      meta: { title: 'Upload' }
    },
    {
      path: 'dropzone',
      component: (resolve) => require(['@/views/components-demo/dropzone'], resolve),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone' }
    },
    {
      path: 'sticky',
      component: (resolve) => require(['@/views/components-demo/sticky'], resolve),
      name: 'StickyDemo',
      meta: { title: 'Sticky' }
    },
    {
      path: 'count-to',
      component: (resolve) => require(['@/views/components-demo/count-to'], resolve),
      name: 'CountToDemo',
      meta: { title: 'Count To' }
    },
    {
      path: 'mixin',
      component: (resolve) => require(['@/views/components-demo/mixin'], resolve),
      name: 'ComponentMixinDemo',
      meta: { title: 'Component Mixin' }
    },
    {
      path: 'back-to-top',
      component: (resolve) => require(['@/views/components-demo/back-to-top'], resolve),
      name: 'BackToTopDemo',
      meta: { title: 'Back To Top' }
    },
    {
      path: 'drag-dialog',
      component: (resolve) => require(['@/views/components-demo/drag-dialog'], resolve),
      name: 'DragDialogDemo',
      meta: { title: 'Drag Dialog' }
    },
    {
      path: 'drag-select',
      component: (resolve) => require(['@/views/components-demo/drag-select'], resolve),
      name: 'DragSelectDemo',
      meta: { title: 'Drag Select' }
    },
    {
      path: 'dnd-list',
      component: (resolve) => require(['@/views/components-demo/dnd-list'], resolve),
      name: 'DndListDemo',
      meta: { title: 'Dnd List' }
    },
    {
      path: 'drag-kanban',
      component: (resolve) => require(['@/views/components-demo/drag-kanban'], resolve),
      name: 'DragKanbanDemo',
      meta: { title: 'Drag Kanban' }
    }
  ]
}

export default componentsRouter
