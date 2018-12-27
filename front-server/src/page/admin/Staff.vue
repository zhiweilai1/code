<template>
  <div class="Staff">
    <el-table
      :data="data"
      :height="height"
      border
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="账号"
      >
      </el-table-column>
      <el-table-column
        prop="userPassword"
        label="密码"
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    
      
    </el-table>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
 >
  <span>确定删除？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteCompany()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Staff',
  data() {
    return {
      data: [],
      height: 300,
      dialogVisible: false,
      deletObj: {}
    }
  },
  created() {
    this.height = window.innerHeight - 30
    this.getList()
  },
  methods: {
    handleDelete: function(index, row) {
      this.deletObj = row
      this.dialogVisible = true
    },
    deleteCompany: function () {
      this.axios({
        method: 'post',
        url: '/api/back/employee',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
           employee_id: this.deletObj.id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          })
          this.getList()
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getList: function () {
      this.axios({
          method: 'post',
          url: '/api/back/employee/list',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userName: this.telphone,
            smsCode: this.yanNum,
            userPassword: this.userPassword
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.data = res.data.data
          }
        })
    }
  }
}
</script>
<style>
.Staff {
  padding: 10px;
}
</style>

