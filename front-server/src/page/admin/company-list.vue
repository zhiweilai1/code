<template>
  <div class="company-list" v-loading="comLoad">
    <div class="title">
      <div class="title-content" style="padding-top: 2px;">公司列表</div>
      <div class="title-right">
        <el-button type="primary" size="mini" @click="addCompany()">添加公司</el-button>
      </div>
    </div>
    <div class="company-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="公司名称">
          <el-input v-model="formInline.companyName" placeholder="公司名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公司账户">
          <el-input v-model="formInline.accountNumber" placeholder="公司账户" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="companyList()" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableList"
      :height="height"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="accountNumber"
        label="公司账户">
      </el-table-column>
      <el-table-column
        prop="password"
        label="账户密码">
      </el-table-column>
      <el-table-column
        label="职位情况">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleOffic(scope.$index, scope.row)">点击查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="isShow"
        label="允许查看联系方式">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="isShowEditor($event, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加公司" :visible.sync="isAddCompany">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="ruleForm.companyName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公司账户" prop="accountNumber">
          <el-input v-model="ruleForm.accountNumber" size="small"></el-input>
        </el-form-item>
        <el-form-item label="初始密码" prop="password">
          <el-input v-model="ruleForm.password" disabled size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="isAddCompany = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitAddCompanyForm('ruleForm')" size="small">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="公司详情" :visible.sync="detailVisible">
      <el-row>
        <el-col :span="4">
          ID
        </el-col>
        <el-col :span="20">
          {{companyDetail.id}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          公司名称
        </el-col>
        <el-col :span="20">
          {{companyDetail.companyName}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          公司账户
        </el-col>
        <el-col :span="20">
          {{companyDetail.accountNumber}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          账户密码
        </el-col>
        <el-col :span="20">
          {{companyDetail.password}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          公司类型
        </el-col>
        <el-col :span="20">
          {{companyDetail.companyType}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          公司方向
        </el-col>
        <el-col :span="20">
          {{companyDetail.companydet}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          公司规模
        </el-col>
        <el-col :span="20">
          {{companyDetail.companyPer}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          公司地址
        </el-col>
        <el-col :span="20">
          {{companyDetail.companyPlace}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          公司介绍
        </el-col>
        <el-col :span="20">
          {{companyDetail.companyIntru}}
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="修改信息" :visible.sync="editorVisible">
      <el-form :model="editorFrom" :rules="rules" ref="editorFrom">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="editorFrom.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公司账户" prop="accountNumber">
          <el-input v-model="editorFrom.accountNumber" size="small"></el-input>
        </el-form-item>
        <el-form-item label="账户密码" prop="password">
          <el-input v-model="editorFrom.password" disabled size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="editorVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitEditorForm('editorFrom')" size="small">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'CompanyList',
  data() {
    return {
      comLoad: false,
      height: 300,
      isAddCompany: false,
      ruleForm: {
        companyName: '',
        accountNumber: '',
        password: '666666'
      },
      formLabelWidth: '120px',
      rules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        accountNumber: [
          { required: true, message: '请填写公司账户', trigger: 'blur' }
        ]
      },
      formInline: {
        companyName: '',
        accountNumber: ''
      },
      tableList: [],
      companyDetail: {},
      detailVisible: false,
      editorVisible: false,
      editorFrom: {
        id: '',
        name: '',
        accountNumber: '',
        password: ''
      }
    }
  },
  created() {
    this.height = window.innerHeight - 120
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
    this.companyList()
    // }
  },
  methods: {
    addCompany: function() {
      this.isAddCompany = true
    },
    submitAddCompanyForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          service.post('/api/addCompany', {}, this.ruleForm).then(res => {
            if (res && res.data.isSave) {
              this.$message({
                message: '恭喜您，添加成功',
                type: 'success'
              })
              this.companyList()
              this.isAddCompany = false
            }
          })
        } else {
          return false
        }
      })
    },

    submitEditorForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          service.post('/api/updateCompany', {}, this.editorFrom).then(res => {
            if (res && res.data.isSave) {
              this.$message({
                message: '恭喜您，修改成功',
                type: 'success'
              })
              this.companyList()
              this.editorVisible = false
            }
          })
        } else {
          return false
        }
      })
    },

    companyList: function() {
      this.comLoad = true
      let self = this
      service.get('/api/getCompanyList').then(res => {      self.comLoad = false
        let suitArr = []
        if (!self.formInline.companyName && !self.formInline.accountNumber) {
          suitArr = res.data
        } else if (self.formInline.companyName && !self.formInline.accountNumber) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].companyName.indexOf(self.formInline.companyName) > -1) {
              suitArr.push(res.data[i])
            }
          }
        } else if (!self.formInline.companyName && self.formInline.accountNumber) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].accountNumber.indexOf(self.formInline.accountNumber) > -1) {
              suitArr.push(res.data[i])
            }
          }
        } else {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].accountNumber.indexOf(self.formInline.accountNumber) > -1 && res.data[i].companyName.indexOf(self.formInline.companyName) > -1) {
              suitArr.push(res.data[i])
            }
          }
        }
        self.tableList = suitArr
      })
    },
    handleEdit: function(index, row) {
      this.editorFrom = {
        id: row.id,
        name: row.companyName,
        accountNumber: row.accountNumber,
        password: row.password
      }
      this.editorVisible = true
    },
    handleDelete: function(index, row) {
      service.get('/api/deleteCompany', {}, {
        id: row.id
      }).then((res) => {
        if (res.data) {
          this.$message({
            message: '恭喜您，删除成功',
            type: 'success'
          })
          this.companyList()
        }
      })
      
    },
    handleDetail: function(index, row) {
      this.companyDetail = row
      this.detailVisible = true
    },
    handleOffic: function(index, row) {
      window.sessionStorage.setItem('adcompanyId', row.id)
      this.$router.push({
        path: '/AdOfficList'
      })
    },
    isShowEditor: function(e, row) {
      service.post('/api/isShow', {}, {
        isShow: e,
        id: row.id
      }).then((res) => {
        if (res.data) {
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          })
          this.companyList()
        }
      })
    }
  }
}
</script>
<style>
.company-list {
  padding: 10px;
}
</style>

<style>
.el-button+.el-button {
  margin-left: 0;
  margin-bottom: 5px;
}
</style>



