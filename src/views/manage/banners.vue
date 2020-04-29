<template>
  <div>
    <commonJSX
      :config="config"
      :no-pagination="true"
      :dialog-entiy="dialogEntiy"
    >
      <template v-slot:dialogAdd>
        <banner v-model="bannerInfo" />
      </template>
      <template v-slot:dialogEdit="{ row }">
        {{ row }}
      </template>
    </commonJSX>
  </div>
</template>

<script>
import commonJSX from './components/commonJSX.vue'
import banner from './components/banners/add.vue'
import { getBanner, delBanner } from '@/api/banner'

export default {
  name: 'BannerManage',
  components: {
    commonJSX,
    banner
  },
  data() {
    return {
      bannerInfo: {},
      dialogEntiy: '头图'
    }
  },
  computed: {
    config() {
      return {
        addBtn: {
          text: '添加头图',
          addClick: async() => {
            const { title = '', video = {}, imgurl = '' } = this.bannerInfo
            const status = this.isEmpty([
              {
                value: title,
                title: '头图标题'
              },
              {
                value: video,
                title: '关联视频'
              },
              {
                value: imgurl,
                title: '头图文件'
              }
            ])
            return await status
          }
        },
        columns: [
          {
            label: '头图',
            sort: 1,
            width: '200',
            render: (row, list) => (
              <el-image
                style='width: 150px;'
                fit='cover'
                src={row.imgurl}
                preview-src-list={list.map(e => e.imgurl)}
              >
              </el-image>
            )
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
  },
  methods: {
    isEmpty(array) {
      for (const items of array) {
        if (!items.value || items.title === '关联视频' && !items.value.videoid) {
          this.$message({
            type: 'warning',
            message: `${items.title}不能为空`
          })
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
