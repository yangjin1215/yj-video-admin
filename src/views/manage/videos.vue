<template>
  <div>
    <commonJSX
      :config="config"
      :dialog-entiy="dialogEntiy"
    >
      <template v-slot:dialogAdd>
        <videoComponent v-model="video" />
      </template>
      <template v-slot:dialogEdit="{ row }">
        <videoComponent v-model="video" :default-value="row" />
      </template>
    </commonJSX>
  </div>
</template>

<script>
import commonJSX from './components/commonJSX.vue'
import videoComponent from './components/videos/index.vue'
import { getVideos, addVideo, updateVideo, delVideos, search } from '@/api/video'

export default {
  name: 'VideoManage',
  components: {
    commonJSX,
    videoComponent
  },
  data() {
    return {
      video: {
        videoname: '',
        videourl: '',
        videotypeid: '',
        videocover: '',
        videotime: '',
        videosize: ''
      },
      dialogEntiy: '视频'
    }
  },
  computed: {
    config() {
      return {
        addBtn: {
          text: '上传视频',
          addClick: async() => {
            const isNotEmpty = this.isNotEmpty([
              { title: '视频名称', value: this.video.videoname },
              { title: '视频', value: this.video.videourl },
              { title: '视频栏目', value: this.video.videotypeid },
              { title: '视频封面', value: this.video.videocover },
              { title: '视频时长', value: this.video.videotime },
              { title: '视频大小', value: this.video.videosize }
            ])
            if (isNotEmpty) {
              const rs = await addVideo(this.video)
              this.$message({
                type: rs.status ? 'success' : 'error',
                message: rs.status ? '添加成功' : '添加失败'
              })
              return rs.status
            }
            return false
          }
        },
        columns: [
          { type: 'index', label: '序号', width: '50', fixed: false },
          {
            label: '视频封面图',
            sort: 1,
            width: '200',
            render: (row, list) => (
              <el-image
                style='width: 150px;height: 50px;'
                fit='cover'
                src={row.videocover}
                preview-src-list={list.map(e => e.videocover)}
              >
              </el-image>
            )
          },
          { prop: 'videoname', label: '视频名称', width: '200', fixed: false },
          { prop: 'videotype.typename', label: '视频栏目', width: '200', fixed: false },
          { prop: 'videotime', label: '视频时长', width: '120', fixed: false },
          { prop: 'videosize', label: '视频大小', width: '120', fixed: false },
          { prop: 'created_time', label: '创建时间', fixed: false }
        ],
        queryParams: {},
        search,
        async getList(options) {
          return await getVideos(options)
        },
        async delRow(id) {
          return await delVideos(id)
        },
        editClick: async(row) => {
          const isNotEmpty = this.isNotEmpty([
            { title: '视频名称', value: this.video.videoname },
            { title: '视频', value: this.video.videourl },
            { title: '视频栏目', value: this.video.videotypeid },
            { title: '视频封面', value: this.video.videocover },
            { title: '视频时长', value: this.video.videotime },
            { title: '视频大小', value: this.video.videosize }
          ])
          if (isNotEmpty) {
            const { status } = await updateVideo(this.video)
            this.$message({
              type: status ? 'success' : 'error',
              message: status ? '修改成功' : '修改失败'
            })
            return status
          } else {
            this.$message({
              type: 'warning',
              message: '请输入栏目名称'
            })
          }
          return false
        }
      }
    }
  },
  methods: {
    isNotEmpty(array) {
      for (const items of array) {
        if (!items.value) {
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
