<script>
export default {
  name: 'Common',
  props: {
    noPagination: {
      type: Boolean,
      default: false
    },
    dialogEntiy: {
      type: String,
      default: '用户'
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
  computed: {
    dialogTitle() {
      let title
      switch (this.type) {
        case 'add':
          title = `添加${this.dialogEntiy}`
          break
        case 'edit':
          title = `编辑${this.dialogEntiy}`
          break
        default: this.dialogEntiy
          break
      }
      return title
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
      return p(this.currentRows)
        .then(rs => {
          this.$emit('on-ok', this.currentRows)
          return rs
        })
        .then(rs => {
          if (rs) { this.getList() }
          // 添加 或者 修改成功后 刷新列表

          // rs 为校验结果，true 为通过，关闭 dialog， false 为不通过，不关闭 dialog
          this.dialogFormVisible = !rs
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
    },
    isCustomOrStandard(item, i) {
      if (item.render) {
        return (
          <el-table-column
            key={item.sort.toString() || i.toString()}
            align='center'
            fixed={item.fixed}
            label={item.label}
            width={item.width}
          >
            {
              scope => item.render(scope.row, this.list)
            }
          </el-table-column>
        )
      } else {
        return (
          <el-table-column
            key={item.sort.toString() || i.toString()}
            align='center'
            prop={item.prop}
            fixed={item.fixed}
            label={item.label}
            width={item.width}
          />
        )
      }
    },
    isloadingOrTable() {
      if (this.laoding) {
        return (
          <div class='loading'>
            <i class='el-icon-loading' />
            <span>加载中...</span>
          </div>
        )
      } else {
        return (
          <el-table data={this.list} border style='width: 100%'>
            {
              this.config.columns.map((item, i) => this.isCustomOrStandard(item, i))
            }
            <el-table-column
              align='center'
              fixed='right'
              label='操作'
              width='100'
            >
              {
                scope => (
                  <el-row>
                    {
                      this.$scopedSlots.rowsBtn && this.$scopedSlots.rowsBtn({
                        row: scope.row
                      })
                    }
                    <el-button type='text' size='small' onClick={() => this.handleClickEdit(scope.row)}>编辑</el-button>
                    <el-button type='text' size='small' onClick={() => this.handleClickDelete(scope.row)}>删除</el-button>
                  </el-row>
                )
              }
            </el-table-column>
          </el-table>
        )
      }
    },
    isDialogSlot() {
      if (this.type === 'add') {
        return (
          <div>
            {
              this.$scopedSlots.dialogAdd && this.$scopedSlots.dialogAdd()
            }
          </div>
        )
      }
      if (this.type === 'edit') {
        return (
          <div>
            {
              this.$scopedSlots.dialogEdit && this.$scopedSlots.dialogEdit({
                row: this.currentRows
              })
            }
          </div>
        )
      }
    },
    isDialog() {
      if (this.dialogFormVisible) {
        return (
          <el-dialog
            title={this.dialogTitle}
            append-to-body
            destroy-on-close
            close-on-click-modal={false}
            visible={this.dialogFormVisible}
            {...{ on: { 'update:visible': rs => { this.dialogFormVisible = rs } }} }
          >
            {this.isDialogSlot()}
            <div slot='footer' class='dialog-footer'>
              <el-button onClick={() => { this.dialogFormVisible = false }}>取 消</el-button>
              <el-button type='primary' disabled={this.loading} onClick={() => this.ok()}>
                { this.loading ? '正在执行中...' : '确定' }
              </el-button>
            </div>
          </el-dialog>
        )
      }
    },
    isPagination() {
      if (!this.noPagination) {
        return (
          <el-pagination
            page-size={this.pages.pageSize}
            pager-count={11}
            layout='prev, pager, next'
            total={this.pages.total}
            current-page={this.pages.currentPage}
            onCurrent-change={ page => this.onChange(page) }
          />
        )
      }
    }
  },
  render() {
    return (
      <div class='common'>
        <el-row class='tools-btn'>
          <el-button type='primary' size='mini' onClick={() => this.openAdd()}>
            {this.config.addBtn.text}
          </el-button>
          {
            this.$scopedSlots.toolsBtn && this.$scopedSlots.toolsBtn({
              row: this.currentRows
            })
          }
        </el-row>
        { this.isloadingOrTable() }
        { this.isPagination() }
        { this.isDialog() }
      </div>
    )
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
<style lang="scss">
.common .el-icon-circle-close {
  color: #fff;
}
</style>
