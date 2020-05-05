<template>
  <div class="user"> // 用户管理界面
    <el-row class="tools-btn">
      <el-button type="primary" size="mini" @click="openAddUser">添加用户</el-button>
    </el-row>
    <div v-if="loading && list.length === 0" class="loading">
      <i class="el-icon-loading" />
      <span>加载中...</span>
    </div>
    <el-table v-else :data="list" border style="width: 100%">
      <el-table-column
        v-for="(item, i) in columns"
        :key="i"
        align="center"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClickDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
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
      <el-form
        ref="ruleForm"
        :rules="rules"
        status-icon
        :model="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="ruleForm.repassword" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">重置</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="loading" @click="submitForm('ruleForm')">
          {{ loading ? '正在注册中...' : '确定' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, registerUser, delUser } from '@/api/user'

export default {
  name: 'UserManage',
  data() {
    const validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.repassword !== '') {
          this.$refs.ruleForm.validateField('repassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogFormVisible: false,
      list: [],
      columns: [
        { prop: 'id', label: '用户id', width: '150', fixed: false },
        { prop: 'username', label: '用户名', width: '200', fixed: false },
        { prop: 'created_time', label: '注册时间', fixed: false }
      ],
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      ruleForm: {
        password: '',
        repassword: '',
        username: ''
      },
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async delUser(id) {
      const rs = await delUser(id)
      if (rs.status) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const status = await this.addUser()
          if (status) this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.ruleForm = {
        password: '',
        repassword: '',
        username: ''
      }
    },
    openAddUser() {
      this.dialogFormVisible = true
    },
    async addUser() {
      let status = false
      this.loading = true
      const { username, password } = this.ruleForm
      const rs = await registerUser({ username, password })
      if (rs.status) {
        this.$message({ message: '添加用户成功', type: 'success' })
        this.getList()
        this.resetForm()
        status = true
      }
      this.loading = false
      return status
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
      const list = await getUsers({
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delUser(row.id)
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
.user {
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
