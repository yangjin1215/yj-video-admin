<template>
  <div> // 视频管理评论管理的页面
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
      <template v-slot:rowsBtn="{ row }">
        <el-button size="small" type="text" @click="seeComment(row)">查看评论</el-button>
      </template>
    </commonJSX>
    <el-dialog title="视频评论" fullscreen :visible.sync="commentShow" @closed="closeComment">
      <el-table :data="comments">
        <el-table-column property="content" label="评论内容" />
        <el-table-column property="user.username" label="用户名称" width="100" />
        <el-table-column property="created_time" label="评论时间" width="200" />
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="{ row }">
            <el-button type="text" size="small" style="color:red;" @click="delComment(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import commonJSX from './components/commonJSX.vue'
import videoComponent from './components/videos/index.vue'
import { getVideos, addVideo, updateVideo, delVideos, search, delComment } from '@/api/video'

export default {
  name: 'VideoManage',
  components: {
    commonJSX,
    videoComponent
  },
  data() {
    return {
      commentShow: false,
      comments: [],
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
            const { status } = await updateVideo({
              id: row.id,
              ...this.video
            })
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
    delComment(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.serviceLoading = this.$loading({
          lock: true,
          text: '正在删除中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        return delComment(row.id)
      }).then(rs => {
        if (rs && rs.status) {
          this.comments.splice(this.comments.findIndex(e => e.id === row.id), 1)
          this.$message({
            type: 'successs',
            message: '删除成功'
          })
        }
        this.serviceLoading.close()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    closeComment() {
      this.comments = []
    },
    seeComment(row) {
      if (row.comments.length < 1) {
        this.$message({
          message: '该视频暂无评论',
          type: 'warning'
        })
      } else {
        this.comments = row.comments
        this.commentShow = true
      }
    },
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
