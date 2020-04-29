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
          :key="item.value"
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
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="success"
        with-credentials
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { search } from '@/api/banner'
import { authKey, bearer, csrfKey } from '@/utils/config'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
  methods: {
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
