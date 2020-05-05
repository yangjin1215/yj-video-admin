<template>
  <div>
    <div class="flex upload">
      <span class="label"><i red>*</i>上传视频：</span>  //管理视频组件
      <upload
        v-model="innerValue.videourl"
        :config="videoConfig"
        :httpshowback="defaultValue.videourl ? [{
          type: 'video',
          name: defaultValue.videourl.split('/').pop(),
          url: defaultValue.videourl
        }]: []"
        @onsuccess="success"
      />
    </div>
    <div class="flex justify-space-between">
      <div class="flex-column w45">
        <span class="label"><i red>*</i>视频标题：</span>
        <el-input
          v-model="innerValue.videoname"
          placeholder="请输入视频标题"
          style="width: 100%"
        />
      </div>
      <div class="flex-column w45">
        <span class="label"><i red>*</i>选择栏目：</span>
        <el-select
          v-model="innerValue.videotypeid"
          style="width: 100%"
          :multiple="false"
          placeholder="选择栏目"
        >
          <el-option
            v-for="item in videoTypes"
            :key="item.id"
            :label="item.typename"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
    <div class="upload">
      <span class="label"><i red>*</i>上传视频封面图：</span>
      <upload
        v-model="innerValue.videocover"
        :config="videoCoverConfig"
        :httpshowback="defaultValue.videocover ? [{
          type: 'videocover',
          name: defaultValue.videocover.split('/').pop(),
          url: defaultValue.videocover
        }] : []"
      />
    </div>
    <div class="timesize">
      <span class="label">视频时长：{{ innerValue.videotime }}</span>
      <span class="label">视频大小：{{ innerValue.videosize }}</span>
    </div>
  </div>
</template>

<script>
import { BASEHOST } from '@/utils/config'
import { getVideotypes } from '@/api/videotype'
import upload from '../upload.vue'
export default {
  name: 'Videos',
  components: {
    upload
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: Object,
      required: false,
      default: () => ({
        videoname: '',
        videourl: '',
        videotypeid: '',
        videocover: '',
        videotime: '00:00:00',
        videosize: '0MB'
      })
    }
  },
  data() {
    return {
      videoConfig: {
        filetype: 'video',
        maxsize: 1024 ** 3,
        listType: 'text',
        btnflex: true,
        showlist: true,
        preview: false,
        postData: {
          type: 'video'
        }
      },
      videoCoverConfig: {
        filetype: 'image',
        maxsize: 5 * 1024 ** 2,
        listType: 'picture-card',
        preview: true,
        showlist: true,
        postData: {
          type: 'videocover'
        }
      },
      videoTypes: [],
      innerValue: {
        videoname: '',
        videourl: '',
        videotypeid: '',
        videocover: '',
        videotime: '00:00:00',
        videosize: '0MB'
      }
    }
  },
  watch: {
    innerValue: {
      handler(val) {
        this.$emit('input', this.innerValue)
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  async created() {
    this.videoTypes = this.defaultValue.videotype ? [this.defaultValue.videotype] : []
    const { resdata = [] } = await getVideotypes()
    this.videoTypes = resdata
  },
  methods: {
    async init() {
      this.innerValue = this.defaultValue.videourl ? this.defaultValue : this.value
      this.innerValue = {
        ...this.innerValue,
        videocover: this.innerValue.videocover.replace(new RegExp(`${BASEHOST}`), ''),
        videourl: this.innerValue.videourl.replace(new RegExp(`${BASEHOST}`), '')
      }
    },
    addZeor(str) {
      return String(str).length > 1 ? str : `0${str}`
    },
    async success(files) {
      if (files && files.length > 0) {
        const video = document.createElement('video')
        const size = (files[0].size / 1024 ** 2).toFixed(2)
        video.src = URL.createObjectURL(files[0].raw)
        video.oncanplaythrough = () => {
          const hour = parseInt((video.duration) / 3600)
          const minute = parseInt((video.duration % 3600) / 60)
          const second = Math.ceil(video.duration % 60)
          this.innerValue.videotime = `${this.addZeor(hour)}:${this.addZeor(minute)}:${this.addZeor(second)}`
          this.innerValue.videosize = `${size}MB`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  display: block;
  margin: 10px 0;
}
i[red] {
  color: red;
  display: inline-block;
  margin: 0 5px;
}
.timesize {
  display: flex;
  justify-content: space-between;
}
.flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.justify-space-between {
  justify-content: space-between;
}
.upload {
  margin-bottom: 10px;
}
.w45 {
  width: 45%;
}
</style>
