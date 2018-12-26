<template>
  <div class="OfficResume" v-loading="resumeloading">
    <div class="company-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="电话">
          <el-input v-model="formInline.userPhone" placeholder="电话" size="small" @keyup.enter.native="resumeList(1)"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="resumeList(1)" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
    :data="resumeListData"
    border
    style="width: 100%">
    <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <div v-if="rowChildren.length > 0" v-for="(item, index) in rowChildren" :key="index">
            <div>
              <el-form-item label="姓名">
                <span>{{ item.user_name }}</span>
              </el-form-item>
              <el-form-item label="年龄">
                <span>{{ item.user_age }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ item.user_sex }}</span>
              </el-form-item>
              <el-form-item label="电话">
                <span>{{ item.tel_phone }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ item.user_status }}</span>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </template>
    </el-table-column> -->
    <el-table-column
    prop="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="nick_name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="user_sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="tel_phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
      width="210"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleTeachStu(scope.$index, scope.row)">查看关联学生</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
    @current-change="changePage"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确定删除？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteCompany()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'AdTeacher',
  data() {
    return {
      dialogVisible: false,
      total: 100,
      height: 300,
      resumeloading: false,
      formInline: {
        userPhone: ''
      },
      resumeListData: [],
      rowChildren: [],
      deletObj: {}
    }
  },
  created() {
    this.height = window.innerHeight - 80
    let userName = window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')) || undefined
    if (!userName) {
      this.$router.push({
        path: '/login'
      })
    } else if (userName.isIdentity == '1') {
      this.$router.push({
        path: '/'
      })
    } else {
      this.resumeList(1)
    }
  },
  methods: {
     handleDelete: function(index, row) {
      this.deletObj = row
      this.dialogVisible = true
    },
    deleteCompany: function () {
      this.axios({
        method: 'post',
        url: '/api/back/user/delete',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
           user_id: this.deletObj.id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          })
          this.resumeList(1)
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    changePage: function(currentPage) {
      this.resumeList(currentPage)
    },
    resumeList: function(page) {
      this.resumeloading = true
      this.axios({
        method: 'post',
        url: '/api/back/getTeacherList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: Object.assign({page: page}, this.formInline) 
      }).then((res) => {
        this.resumeloading = false
        if (res.data.code == 200) {
          this.total = res.data.data.total
          for (let i = 0; i < res.data.data.res.length; i++) {
            res.data.data.res[i].create_time = res.data.data.res[i].create_time.replace('T', ' ').replace('Z', '')
            res.data.data.res[i].index = i + 1 + (page - 1) * 10
          }
          this.resumeListData = res.data.data.res
          
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.resumeloading = false
        this.$message.error('请求失败，请重试')
      })
    },
    handleTeachStu: function (index, row) {
      window.sessionStorage.setItem('t2s', JSON.stringify(row))
      this.$router.push({
        path: '/Tost'
      })
    },
    resumeChild: function (row, expandedRows) {
      if (expandedRows.length > 0) {
        if (expandedRows.length > 1) {
          expandedRows.shift()
        }
        this.axios({
          method: 'post',
          url: '/api/back/getTecContactStu',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: row.id,
          }
        }).then((res) => {
          this.resumeloading = false
          if (res.data.code == 200) {
            if (res.data.data.length > 0) {
              this.rowChildren = res.data.data
            } else {
              this.rowChildren = []
              this.$message('该老师未有学生关联')
            }
            
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.resumeloading = false
          this.$message.error('请求失败，请重试')
        })
      }
    }
  }
}
</script>

<style>
.OfficResume {
  padding: 10px;
}
.offic-person {
  cursor: pointer;
  color: #409EFF;
}



 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.offic-person {
  cursor: pointer;
  color: #409EFF;
}
</style>
