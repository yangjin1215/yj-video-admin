<template>
  <div>
    <commonJSX
      :config="config"
      :no-pagination="true"
      :dialog-entiy="dialogEntiy"
    >
      <template v-slot:dialogAdd>
        <videotype v-model="typename" />
      </template>
      <template v-slot:dialogEdit="{ row }">
        <videotype v-model="typename" :default-value="row" />
      </template>
    </commonJSX>
  </div>
</template>

<script>
import commonJSX from './components/commonJSX.vue'
import videotype from './components/videotypes/index.vue'
import { getVideotypes, addVideotypes, updateVideotypes, delVideotypes } from '@/api/videotype'

export default {
  name: 'VideoTypeManage',
  components: {
    commonJSX,
    videotype
  },
  data() {
    return {
      typename: '',
      dialogEntiy: '栏目'
    }
  },
  computed: {
    config() {
      return {
        addBtn: {
          text: '添加栏目',
          addClick: async() => {
            if (this.typename.trim()) {
              const rs = await addVideotypes(this.typename.trim())
              this.$message({
                type: rs.status ? 'success' : 'error',
                message: rs.status ? '添加成功' : '添加失败'
              })
              return rs.status
            } else {
              this.$message({
                type: 'warning',
                message: '请输入栏目名称'
              })
            }
            return false
          }
        },
        columns: [
          { type: 'index', label: '序号', width: '50', fixed: false },
          { prop: 'typename', label: '栏目标题', width: '200', fixed: false },
          { prop: 'videocount', label: '视频数量', width: '200', fixed: false },
          { prop: 'created_time', label: '创建时间', fixed: false }
        ],
        async getList(options) {
          return await getVideotypes(options)
        },
        async delRow(id) {
          return await delVideotypes(id)
        },
        editClick: async(row) => {
          if (this.typename.trim()) {
            const { status } = await updateVideotypes(row.id, this.typename.trim())
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
  }
}
</script>

<style lang="scss" scoped>
</style>
