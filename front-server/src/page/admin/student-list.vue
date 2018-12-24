<template>
  <div class="OfficResume" v-loading="resumeloading">
    <div class="company-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formInline.keyword" placeholder="关键词" size="small" @keyup.enter.native="resumeList()"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.userAge" placeholder="年龄" size="small" @keyup.enter.native="resumeList()"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInline.userSex" placeholder="请选择" @change="resumeList()">
            <el-option
              label="全部"
              value="">
            </el-option>
            <el-option
              label="男"
              value="男">
            </el-option>
            <el-option
              label="女"
              value="女">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.user_status" placeholder="请选择" @change="resumeList()">
            <el-option
              label="全部状态"
              value="">
            </el-option>
            <el-option
              label="未实习-随时到岗"
              value="未实习-随时到岗">
            </el-option>
            <el-option
              label="实习中-考虑机会"
              value="实习中-考虑机会">
            </el-option>
            <el-option
              label="正式工作-考虑机会"
              value="正式工作-考虑机会">
            </el-option>
            <el-option
              label="已离职-随时到岗"
              value="已离职-随时到岗">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resumeList()" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
    :data="resumeListData"
    :height="height"
    @expand-change="resumeChild"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <div v-if="rowChildren.baseMsg">
            <el-form-item label="姓名">
              <span>{{ rowChildren.baseMsg.userName }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ rowChildren.baseMsg.userAge }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ rowChildren.baseMsg.userSex }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ rowChildren.baseMsg.userPhone }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ rowChildren.baseMsg.userStatus }}</span>
            </el-form-item>
          </div>

          <div v-if="rowChildren.tecMsg.length > 0" v-for="(item, index) in rowChildren.tecMsg" :key="index">
            <el-form-item  label="学校">
              <span>{{ item.userSchool }}</span>
            </el-form-item>
            <el-form-item  label="学历">
              <span>{{ item.schoolLevel }}</span>
            </el-form-item>
            <el-form-item  label="专业">
              <span>{{ item.userProfession }}</span>
            </el-form-item>
            <el-form-item  label="在校时间">
              <span>{{ item.beginTime }} - {{ item.endTime }}</span>
            </el-form-item>
            <el-form-item  label="在校表现">
              <span>{{ item.schoolDes }}</span>
            </el-form-item>
          </div>
          <div v-if="rowChildren.workMsg.length > 0" v-for="(item, index) in rowChildren.workMsg" :key="index">
            <el-form-item  label="公司名称">
              <span>{{ item.companyName }}</span>
            </el-form-item>
            <el-form-item  label="职位">
              <span>{{ item.userPosition }}</span>
            </el-form-item>
            <el-form-item  label="工作时间">
              <span>{{ item.beginTime }} - {{ item.endTime }}</span>
            </el-form-item>
            <el-form-item  label="工作职责">
              <span>{{ item.userDuties }}</span>
            </el-form-item>
          </div>
          <div v-if="rowChildren.projectMsg.length > 0" v-for="(item, index) in rowChildren.projectMsg" :key="index">
            <el-form-item  label="项目名称">
              <span>{{ item.projectName }}</span>
            </el-form-item>
            <el-form-item  label="项目职责">
              <span>{{ item.projectPosition }}</span>
            </el-form-item>
            <el-form-item  label="项目时间">
              <span>{{ item.begin }} - {{ item.end }}</span>
            </el-form-item>
            <el-form-item  label="项目描述">
              <span>{{ item.projectDesc }}</span>
            </el-form-item>
          </div>
          <div v-if="rowChildren.myDes.myDes">
            <el-form-item  label="自我评价">
              <span>{{ rowChildren.myDes.myDes }}</span>
            </el-form-item>
          </div>


        </el-form>
      </template>
    </el-table-column>
    <el-table-column
        prop="id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="user_age"
        label="年龄">
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
        prop="user_email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="user_status"
        label="状态">
      </el-table-column>
      <el-table-column
        label="关联老师">
         <template slot-scope="scope">
           {{scope.row.teacher && scope.row.teacher.nickName}} {{ scope.row.teacher && scope.row.teacher.telPhone ? '(' + scope.row.teacher.telPhone + ')' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
  </el-table>
  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'AdStudent',
  data() {
    return {
      height: 300,
      resumeloading: false,
      formInline: {
        keyword: '',
        userAge: '',
        userSex: '',
        user_status: ''
      },
      resumeListData: [],
      rowChildren: {}
    }
  },
  created() {
    this.height = window.innerHeight - 150
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
      this.resumeList()
    }
  },
  methods: {
    resumeList: function() {
      this.resumeloading = true
      this.axios({
        method: 'post',
        url: '/api/back/getAllStudent',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: this.formInline
      }).then((res) => {
        this.resumeloading = false
        if (res.data.code == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].create_time = res.data.data[i].create_time.replace('T', ' ').replace('Z', '')
          }
          this.resumeListData = res.data.data
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.resumeloading = false
        this.$message.error('请求失败，请重试')
      })
    },
    resumeChild: function (row, expandedRows) {
      if (expandedRows.length > 0) {
        if (expandedRows.length > 1) {
          expandedRows.shift()
        }
        this.axios({
          method: 'post',
          url: '/api/getMyResume',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: row.id,
          }
        }).then((res) => {
          this.resumeloading = false
          if (res.data.code == 200) {
            this.rowChildren = res.data.data
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.resumeloading = false
          this.$message.error('请求失败，请重试')
        })
      } else {
        this.$message('该老师未被学生关联')
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
</style>
