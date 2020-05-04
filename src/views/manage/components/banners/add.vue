<template>
  <div>
    <el-row class="row">
      <span class="label"><i red>*</i>头图标题：</span>
      <el-input
        v-model="bannerData.title"
        placeholder="请输入头图标题"
        style="width: 50%"
      />
    </el-row>
    <el-row class="row">
      <span class="label"><i red>*</i>关联视频：</span>
      <el-select
        v-model="bannerData.video"
        style="width: 50%"
        :multiple="false"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关联的视频名称"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option
          v-for="item in VideoOptions"
          :key="item.id"
          :label="item.videoname"
          :value="{ videoid: item.id, videotypeid: item.videotype.id }"
        />
      </el-select>
    </el-row>
    <div class="upload">
      <span class="upload-label"><i red>*</i>上传头图：</span>
      <el-upload
        :headers="headers"
        :data="postData"
        :action="action"
        accept="image/*"
        list-type="picture-card"
        :file-list="files"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="success"
        :limit="1"
        :before-upload="beforeUpload"
        with-credentials
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="预览">
    </el-dialog>
  </div>
</template>

<script>
import { search } from '@/api/banner'
import { delfile } from '@/api/file'
import { authKey, bearer, csrfKey, BASEHOST } from '@/utils/config'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
export default {
  name: 'Banners',
  props: {
    value: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: Object,
      required: false,
      default: () => ({
        title: '',
        video: {
          videoid: '',
          videotypeid: ''
        },
        imgurl: ''
      })
    }
  },
  data() {
    return {
      files: [],
      loading: false,
      action: '/api/upload',
      dialogImageUrl: '',
      dialogVisible: false,
      VideoOptions: [],
      headers: {
        [csrfKey]: Cookies.get('csrfToken'),
        [authKey]: `${bearer} ${getToken()}`
      },
      postData: {
        type: 'banner'
      },
      bannerData: {
        title: '',
        video: {
          videoid: '',
          videotypeid: ''
        },
        imgurl: ''
      }
    }
  },
  watch: {
    bannerData: {
      handler(val) {
        this.$emit('input', this.bannerData)
      },
      deep: true
    }
  },
  mounted() {
    this.bannerData = {
      title: this.defaultValue.title,
      video: {
        videoid: this.defaultValue.videoid,
        videotypeid: this.defaultValue.videotypeid
      },
      imgurl: this.defaultValue.imgurl ? this.defaultValue.imgurl.replace(new RegExp(`${BASEHOST}`), '') : ''
    }
    this.VideoOptions = [{
      ...this.defaultValue.video,
      videotype: {
        id: this.defaultValue.video.videotypeid
      }
    }]
    this.files = this.defaultValue.imgurl ? [{
      type: 'banner',
      url: this.defaultValue.imgurl
    }] : []
  },
  methods: {
    beforeUpload(file) {
      if (!file.type.includes('image')) {
        this.$message({
          type: 'warning',
          message: '只能上传图片类型的文件'
        })
        return false
      }
      if (file.size > 5 * (1204 ** 2)) {
        this.$message({
          type: 'warning',
          message: '文件大小不能超过5MB'
        })
        return false
      }
      return true
    },
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        const data = this.handleRes(await search({ videoname: query }))
        this.VideoOptions = data || []
        this.loading = false
      } else {
        this.VideoOptions = []
      }
    },
    success(res) {
      const { status, resdata } = res
      if (status) {
        this.bannerData.imgurl = resdata.url
      }
    },
    async handleRemove(file, fileList) {
      const url = file.response ? file.response.resdata.httpurl : file.url
      if (!url || url.startsWith('blob:')) return
      const { status } = await delfile(url)
      if (status) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.bannerData.imgurl = ''
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  flex-direction: column;
}
.row {
  margin: 10px 0;
}
.label {
  margin-right: 10px;
}
.upload-label {
  margin: 10px 0;
}
i[red] {
  color: red;
  display: inline-block;
  margin: 0 5px;
}
</style>
