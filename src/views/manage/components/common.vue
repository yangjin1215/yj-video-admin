<template>
  <div class="common">
    <el-row class="tools-btn">
      <el-button type="primary" size="mini" @click="openAdd">
        {{ config.addBtn.text }}
      </el-button>
      <slot name="tools-btn" />
    </el-row>
    <div v-if="loading && list.length === 0" class="loading">
      <i class="el-icon-loading" />
      <span>加载中...</span>
    </div>
    <el-table v-else :data="list" border style="width: 100%">
      <div
        v-for="(item, i) in config.columns"
        :key="item.sort || i"
      >
        <el-table-column
          v-if="!item.render"
          align="center"
          :fixed="item.fixed"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
        <el-table-column
          v-if="item.render"
          align="center"
          :fixed="item.fixed"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div v-html="item.render(scope.row)" />
          </template>
        </el-table-column>
      </div>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <slot name="rows-btn" :row="scope.row" />
          <el-button type="text" size="small" @click="handleClickEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleClickDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!noPagination"
      :page-size="pages.pageSize"
      :pager-count="11"
      layout="prev, pager, next"
      :total="pages.total"
      :current-page="pages.currentPage"
      @current-change="onChange"
    />
    <el-dialog
      v-if="dialogFormVisible"
      title="添加用户"
      :visible.sync="dialogFormVisible"
      append-to-body
      destroy-on-close
      :close-on-click-modal="false"
    >
      <slot name="dialog" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="loading" @click="ok">
          {{ loading ? '正在执行中...' : '确定' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Common',
  props: {
    noPagination: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => ({
        addBtn: {
          text: '添加用户',
          async addClick() {
            return await true
          }
        },
        columns: [
          { prop: 'id', label: '用户id', width: '150', fixed: false },
          { prop: 'username', label: '用户名', width: '200', fixed: false },
          { prop: 'created_time', label: '注册时间', fixed: false }
        ],
        async getList(options) {
          return await []
        },
        async delRow(id) {
          return await true
        },
        async editClick(row) {
          return await row
        }
      })
    }
  },
  data() {
    return {
      type: 'add',
      currentRows: {},
      loading: false,
      dialogFormVisible: false,
      list: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleClickEdit(row) {
      this.type = 'edit'
      this.currentRows = row
      this.dialogFormVisible = true
    },
    openAdd() {
      this.type = 'add'
      this.currentRows = {}
      this.dialogFormVisible = true
    },
    ok() {
      const { addBtn, editClick } = this.config
      const p = this.type === 'add'
        ? addBtn.addClick
        : this.type === 'edit'
          ? editClick : Promise.resolve(true)
      return p()
        .then(() => {
          this.$emit('on-ok', this.currentRows)
        })
        .then(() => {
          this.dialogFormVisible = false
        })
    },
    onChange(current) {
      if (this.pages.currentPage === current) {
        return
      }
      this.pages.currentPage = current
      this.getList()
    },
    async getList() {
      this.loading = true
      const offset = this.pages.currentPage - 1 < 0 ? 0 : (this.pages.currentPage - 1) * this.pages.pageSize
      const list = await this.config.getList(this.noPagination ? undefined : {
        offset: offset === 0 ? '0' : offset,
        limit: this.pages.pageSize
      })
      this.pages.total = list.count
      this.list = this.handleRes(list) || []
      this.loading = false
    },
    init() {
      this.getList()
    },
    handleClickDelete(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.config.delRow(row.id)
      }).then(rs => {
        if (rs) {
          this.$message({
            type: 'successs',
            message: '删除成功'
          })
          this.getList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.common {
  width: 100%;
  padding: 20px;
  .tools-btn {
    margin: 10px 0;
  }
  .loading {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
    i {
      margin-right: 10px;
    }
  }
}
</style>
