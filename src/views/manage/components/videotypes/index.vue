<template>
  <div class="videotype">
    <span class="label"><i red>*</i>视频类型标题/栏目名称：</span>
    <el-input
      v-model="typename"
      placeholder="请输入视频类型标题/栏目名称"
      style="width: 100%"
    />
  </div>
</template>

<script>

export default {
  name: 'Videotype',
  props: {
    value: {
      type: String,
      required: true
    },
    defaultValue: {
      type: Object,
      required: false,
      default: () => ({ typename: '' })
    }
  },
  data() {
    return {
      typename: ''
    }
  },
  watch: {
    typename(val) {
      this.$emit('input', this.typename)
    }
  },
  mounted() {
    this.typename = this.defaultValue.typename || this.value
  }
}
</script>

<style lang="scss" scoped>
.videotype {
  display: flex;
  flex-direction: column;
}
.label {
  margin: 10px 0;
}
i[red] {
  color: red;
  display: inline-block;
  margin: 0 5px;
}
</style>
