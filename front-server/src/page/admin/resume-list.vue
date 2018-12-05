<template>
  <div class="OfficResume">
    <div class="company-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone" placeholder="公电话司账户" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resumeList()" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
    :data="resumeListData"
    :height="height"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.baseMsg.username }}</span>
          </el-form-item>
          <el-form-item label="年龄">
            <span>{{ props.row.baseMsg.number }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ props.row.baseMsg.sex }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ props.row.baseMsg.phone }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.baseMsg.status }}</span>
          </el-form-item>
          <div v-for="(item, index) in props.row.tecMsg" :key="index">
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
          <div v-for="(item, index) in props.row.workMsg" :key="index">
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
          <div v-for="(item, index) in props.row.projectMsg" :key="index">
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
        prop="id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="baseMsg.username"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="baseMsg.number"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="baseMsg.sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="baseMsg.phone"
        label="电话">
      </el-table-column>
  </el-table>
  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'OfficResume',
  data() {
    return {
      height: 300,
      formInline: {
        name: '',
        phone: ''
      },
      resumeListData: [],
      adResumeId: '',
    }
  },
  created() {
    this.height = window.innerHeight - 80
    let adResumeId = window.sessionStorage.getItem('adcompanyId')
    this.adResumeId = adResumeId
    let userName = JSON.parse(window.sessionStorage.getItem('userMsg'))
    // if (!userName) {
    //     this.$router.push({
    //         path: '/login'
    //     })
    // } else if (userName.type == 'company') {
    //     this.$router.push({
    //         path: '/'
    //     })
    // } else {
    this.resumeList()
    // }
  },
  methods: {
    resumeList: function() {
      service.get('/api/getResumeList', {}, {
        resume_id: this.adResumeId
      }).then((res) => {
        let arr = []
        if (!this.formInline.name && !this.formInline.phone) {
          arr = res.data
        } else if (this.formInline.name && !this.formInline.phone) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].baseMsg.username.indexOf(this.formInline.name) > -1) {
              arr.push(res.data[i])
            }
          }
        } else if (!this.formInline.name && this.formInline.phone) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].baseMsg.phone.toString().indexOf(this.formInline.phone) > -1) {
              arr.push(res.data[i])
            }
          }
        } else {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].baseMsg.phone.toString().indexOf(this.formInline.phone) > -1 && res.data[i].baseMsg.username.indexOf(this.formInline.name) > -1) {
              arr.push(res.data[i])
            }
          }
        }

        this.resumeListData = arr
      })
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
