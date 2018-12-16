<template>
  <div class="OfficResume" v-loading="resumeloading">
    <div class="company-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="电话">
          <el-input v-model="formInline.userPhone" placeholder="电话" size="small"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="resumeList()" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
    :data="resumeListData"
    @expand-change="resumeChild"
    :height="height"
    style="width: 100%">
    <el-table-column type="expand">
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
                <span>{{ item.user_phone }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ item.user_status }}</span>
              </el-form-item>
            </div>
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
        prop="nick_name"
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
  </el-table>
  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'AdTeacher',
  data() {
    return {
      height: 300,
      resumeloading: false,
      formInline: {
        userPhone: ''
      },
      resumeListData: [],
      rowChildren: []
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
      this.resumeList()
    }
  },
  methods: {
    resumeList: function() {
      this.resumeloading = true
      this.axios({
        method: 'post',
        url: '/api/back/getTeacherList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: this.formInline
      }).then((res) => {
        this.resumeloading = false
        if (res.data.code == 200) {
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
            this.rowChildren = res.data.data
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
