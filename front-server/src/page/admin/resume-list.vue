<template>
  <div class="OfficResume" v-loading="resumeloading">
    <div>
      <el-button type="default" size="mini" icon="el-icon-back" @click="() => {this.$router.back(-1)}">返回</el-button>
      <span style="display: inline-block; margin-left: 10px;">
        简历管理
      </span>
    </div>
    <div class="company-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="formInline.keyword" placeholder="关键词" size="small" @keyup.enter.native="resumeList(1)"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.userAge" placeholder="年龄" size="small" @keyup.enter.native="resumeList(1)"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInline.userSex" placeholder="请选择" @change="resumeList(1)">
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
          <el-select v-model="formInline.user_status" placeholder="请选择" @change="resumeList(1)">
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
          <el-button type="primary" @click="resumeList(1)" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
    :data="resumeListData"
    border
    :height="height"
    @expand-change="resumeChild"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
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
            <span>{{  rowChildren.baseMsg.userPhone}}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ rowChildren.baseMsg.userStatus }}</span>
          </el-form-item>
          <div v-if="rowChildren.tecMsg.length > 0" v-for="(item, index) in rowChildren.tecMsg" :key="index">
            <el-form-item  label="学校">
              <span>{{ item.school }}</span>
            </el-form-item>
            <el-form-item  label="学历">
              <span>{{ item.level }}</span>
            </el-form-item>
            <el-form-item  label="专业">
              <span>{{ item.profession }}</span>
            </el-form-item>
            <el-form-item  label="在校时间">
              <span>{{ item.begin }} - {{ item.end }}</span>
            </el-form-item>
            <el-form-item  label="在校表现">
              <span>{{ item.dec }}</span>
            </el-form-item>
          </div>
          <div v-if="rowChildren.workMsg.length > 0" v-for="(item, index) in rowChildren.workMsg" :key="index">
            <el-form-item  label="公司名称">
              <span>{{ item.company }}</span>
            </el-form-item>
            <el-form-item  label="职位">
              <span>{{ item.position }}</span>
            </el-form-item>
            <el-form-item  label="工作时间">
              <span>{{ item.begin }} - {{ item.end }}</span>
            </el-form-item>
            <el-form-item  label="工作职责">
              <span>{{ item.duties }}</span>
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
          
          
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
        prop="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="userAge"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="userSex"
        label="性别">
      </el-table-column>
      <el-table-column
        label="电话">
        <template slot-scope="scope">
          <!-- {{this.userName.userType == 'company' && this.userName.isRead == '0' ? '***' : ''}} -->
        </template>
      </el-table-column>
      <el-table-column
        prop="userEmail"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="userStatus"
        label="状态">
      </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
    @current-change="changePage"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'OfficResume',
  data() {
    return {
      total: 300,
      height: 300,
      resumeloading: false,
      formInline: {
        keyword: '',
        userAge: '',
        userSex: '',
        user_status: ''
      },
      resumeListData: [],
      adResumeId: '',
      rowChildren: {},
      userName: {
        userType: '',
        isRead: ''
      }
    }
  },
  created() {
    this.height = window.innerHeight - 200
    let adResumeId = window.sessionStorage.getItem('adOffic')
    this.adResumeId = adResumeId
    let userName = window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')) || undefined
    this.userName = userName
    if (!userName) {
      this.$router.push({
        path: '/login'
      })
    } else {
      this.resumeList(1)
    }
  },
  methods: {
    changePage: function(currentPage) {
      this.resumeList(currentPage)
    },
    resumeList: function(page) {
      this.resumeloading = true
      this.axios({
        method: 'post',
        url: '/api/back/getResumeList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: Object.assign({
          page: page,
          officeId: this.adResumeId
        }, this.formInline)
      }).then((res) => {
        this.resumeloading = false
        if (res.data.code == 200) {
          this.total = res.data.data.total
          if (this.userName.userType == 'company' && this.userName.isRead == '0') {
            for (let i = 0; i < res.data.data.res.length; i++) {
              res.data.data.res[i].telPhone = '***'
              res.data.data.res[i].userEmail = '***'
            }
          }
          for (let i = 0; i < res.data.data.res.length; i++) {
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
            if (res.data.data.baseMsg) {
              if (this.userName.userType == 'company' && this.userName.isRead == '0') {
                res.data.data.baseMsg.userPhone = '***'
                res.data.data.baseMsg.userEmail = '***'
              }
              this.rowChildren = res.data.data
            } else {
              this.$message('该用户暂无简历')
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
</style>
