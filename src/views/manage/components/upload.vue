<template>
  <div>
    <div class="upload">
      <el-upload
        ref="upload"
        :headers="headers"
        :data="config.postData"
        :show-file-list="config.showlist"
        :action="action"
        :accept="
          Array.isArray(config.filetype)
            ? config.filetype.join(',')
            : `${config.filetype}/*`
        "
        :list-type="config.listType"
        :file-list="files"
        :on-remove="handleRemove"
        :on-success="success"
        :on-preview="handlePreview"
        :limit="1"
        :before-upload="beforeUpload"
        with-credentials
      >
        <template v-if="config.listType === 'text'">
          <div :class="{flex: config.btnflex}">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传
              {{
                Array.isArray(config.filetype)
                  ? config.filetype.join(',')
                  : `${config.filetype}`
              }}
              类型的文件，且不超过 {{ parseInt(config.maxsize / 1024 ** 2) }} MB
            </div>
          </div>
        </template>
        <i v-else class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="预览">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { delfile } from '@/api/file'
import { authKey, bearer, csrfKey } from '@/utils/config'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
export default {
  name: 'Upload',
  props: {
    value: {
      type: String,
      default: ''
    },
    httpshowback: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({
        filetype: 'video',
        maxsize: 1024 ** 3,
        showlist: true,
        listType: 'picture-card',
        postData: {
          type: 'video'
        }
      })
    }
  },
  data() {
    return {
      files: [],
      serviceLoading: {},
      dialogVisible: false,
      dialogImageUrl: '',
      action: '/api/upload',
      headers: {
        [csrfKey]: Cookies.get('csrfToken'),
        [authKey]: `${bearer} ${getToken()}`
      }
    }
  },
  mounted() {
    this.files = this.httpshowback
  },
  methods: {
    handlePreview(file) {
      if (this.config.preview) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    },
    beforeUpload(file) {
      const type = this.config.filetype
      const fileExt = /\.[^\.]+/.exec(file.name)[0]
      if (Array.isArray(type) && !type.includes(fileExt)) {
        this.$message({
          type: 'warning',
          message: `只能上传 ${type.join(',')} 类型的文件`
        })
        return false
      }
      if (!file.type.includes(type)) {
        this.$message({
          type: 'warning',
          message: `只能上传 ${type} 类型的文件`
        })
        return false
      }
      if (file.size > this.config.maxsize) {
        this.$message({
          type: 'warning',
          message: `文件大小不能超过${parseInt(
            this.config.maxsize / 1024 ** 2
          )}MB`
        })
        return false
      }
      this.$emit('beforeUpload', file, this.$refs.upload)
      return true
    },
    success(res) {
      const { status, resdata } = res
      if (status) {
        this.$emit('onsuccess', this.$refs.upload.uploadFiles)
        this.$emit('input', resdata.url)
      }
    },
    async handleRemove(file, fileList) {
      const url = file.response ? file.response.resdata.httpurl : file.url
      if (!url || url.startsWith('blob:')) return
      this.serviceLoading = this.$loading({
        lock: true,
        text: '正在删除中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const { status } = await delfile(url).then(rs => {
        this.serviceLoading.close()
        return rs
      })
      if (status) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.$emit('input', '')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.upload {
  display: flex;
  flex-direction: column;
}
.flex {
  display: flex;
  align-items: center;
  .el-upload__tip {
    margin-left: 5px;
  }
}
</style>
