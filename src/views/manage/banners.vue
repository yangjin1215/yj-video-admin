<template>
  <div>
    <common :config="config" />
  </div>
</template>

<script>
import common from './components/common.vue'
import { getBanner, delBanner } from '@/api/banner'

export default {
  name: 'BannerManage',
  components: {
    common
  },
  data() {
    return {
      config: {
        addBtn: {
          text: '添加头图',
          async addClick() {
            return await true
          }
        },
        columns: [
          {
            label: '头图',
            sort: 1,
            width: '200',
            render: row => `<img src="${row.imgurl}" width="150" />`
          },
          { prop: 'title', label: '头图标题', width: '200', fixed: false, sort: 2 },
          { prop: 'video.videoname', label: '视频标题', fixed: false, sort: 3 },
          { prop: 'videotype.typename', label: '视频类型', fixed: false, sort: 4 },
          { prop: 'created_time', label: '创建时间', fixed: false, sort: 5 }
        ],
        async getList(options) {
          return await getBanner(options)
        },
        async delRow(id) {
          return await delBanner(id)
        },
        async editClick(row) {
          return await row
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
