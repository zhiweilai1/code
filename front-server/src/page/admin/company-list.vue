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
          <el-input v-model="formInline.companyName" placeholder="公司名称" size="small" @keyup.enter.native="companyList()"></el-input>
        </el-form-item>
        <el-form-item label="公司账户">
          <el-input v-model="formInline.accountNumber" placeholder="公司账户" size="small" @keyup.enter.native="companyList()"></el-input>
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
        prop="companyId"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="公司账户">
      </el-table-column>
      <el-table-column
        prop="userPassword"
        label="账户密码">
      </el-table-column>
      <el-table-column
        label="职位情况">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleOffic(scope.$index, scope.row)">点击查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="设置首页热门公司">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isHot"
            :on-value="1"
            :off-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <el-input style="margin-top: 10px" v-model="scope.row.companyUrl" placeholder="(选填)宣传url" size="mini"></el-input>
          <el-button
            size="mini"
            type="primary"
            style="margin-top: 10px"
            @click="handleHotOffic(scope.$index, scope.row)">提交热门
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="允许查看联系方式">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isRead"
            :on-value="1"
            :off-value="0"
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
            @click="handleCompanySet(scope.$index, scope.row)">添加公司配置</el-button>
          <el-button
            size="mini"
            @click="handleOfficSet(scope.$index, scope.row)">添加职位</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加公司" :visible.sync="isAddCompany" :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="ruleForm.companyName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公司账户" prop="userName">
          <el-input v-model="ruleForm.userName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="初始密码" prop="userPassword">
          <el-input v-model="ruleForm.userPassword" disabled size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="isAddCompany = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitAddCompanyForm('ruleForm')" size="small">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="公司详情" :visible.sync="detailVisible" :close-on-click-modal="false">
      <el-row>
        <el-col :span="4">
          ID
        </el-col>
        <el-col :span="20">
          {{companyDetail.companyId}}
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
          {{companyDetail.userName}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          账户密码
        </el-col>
        <el-col :span="20">
          {{companyDetail.userPassword}}
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
          {{companyDetail.companyDet}}
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
          公司福利
        </el-col>
        <el-col :span="20">
          {{companyDetail.welfareArr}}
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

    <el-dialog title="修改信息" :visible.sync="editorVisible" :close-on-click-modal="false">
      <el-form :model="editorFrom" :rules="rules" ref="editorFrom">
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="editorFrom.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="公司账户" prop="userName">
          <el-input v-model="editorFrom.userName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="账户密码" prop="userPassword">
          <el-input v-model="editorFrom.userPassword" disabled size="small"></el-input>
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
export default {
  name: 'CompanyList',
  data() {
    return {
      comLoad: false,
      height: 300,
      isAddCompany: false,
      ruleForm: {
        companyName: '',
        userName: '',
        userPassword: '666666'
      },
      formLabelWidth: '120px',
      rules: {
        companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        userName: [
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
        companyId: '',
        name: '',
        userName: '',
        userPassword: ''
      }
    }
  },
  created() {
    this.height = window.innerHeight - 120
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
      this.companyList()
    }
  },
  methods: {
    addCompany: function() {
      this.isAddCompany = true
    },
    submitAddCompanyForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            method: 'post',
            url: '/api/back/addCompany',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: this.ruleForm
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: '恭喜您，添加成功',
                type: 'success'
              })
              this.companyList()
              this.isAddCompany = false
            } else {
              this.$message.error('请求失败，请重试')
            }
          }).catch(() => {
            this.$message.error('请求失败，请重试')
          })
        } else {
          return false
        }
      })
    },

    submitEditorForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          this.axios({
            method: 'post',
            url: '/api/back/updateCompany',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              userName: this.editorFrom.userName,
              companyName: this.editorFrom.name,
              userPassword: this.editorFrom.userPassword,
              companyId: this.editorFrom.companyId
            }
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: '恭喜您，修改成功',
                type: 'success'
              })
              this.companyList()
              this.editorVisible = false
            } else {
              this.$message.error('请求失败，请重试')
            }
          }).catch(() => {
            this.$message.error('请求失败，请重试')
          })
        } else {
          return false
        }
      })
    },

    companyList: function() {
      this.comLoad = true
      let self = this

      this.axios({
        method: 'post',
        url: '/api/back/getCompanyList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          companyName: this.formInline.companyName,
          userName: this.formInline.accountNumber
        }
      }).then((res) => {
        this.comLoad = false
        if (res.data.code == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].isHot = res.data.data[i].isHot == '1' ? true : false
            res.data.data[i].isRead = res.data.data[i].isRead == '1' ? true : false
          }
          this.tableList = res.data.data
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.$message.error('请求失败，请重试')
      })

    },
    handleCompanySet: function(index, row) {
      window.sessionStorage.setItem('adSetCompany', row.companyId)
      this.$router.push({
        path: '/AdcompanySet'
      })
    },
    handleOfficSet: function(index, row) {
      window.sessionStorage.setItem('adSetOffic', row.companyId)
      this.$router.push({
        path: '/AdofficSet'
      })
    },
    handleHotOffic: function(index, row) {
      this.axios({
        method: 'post',
        url: '/api/back/setHotCompany',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          companyId: row.companyId,
          isHot: row.isHot ? '1' : '0',
          companyUrl: row.companyUrl
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          })
          this.companyList()
        } else {
          this.$message.error('提交失败，请重试')
        }
      }).catch(() => {
        this.$message.error('提交失败，请重试')
      })
    },
    handleEdit: function(index, row) {
      this.editorFrom = {
        companyId: row.companyId,
        name: row.companyName,
        userName: row.userName,
        userPassword: row.userPassword
      }
      this.editorVisible = true
    },
    handleDelete: function(index, row) {
      this.axios({
        method: 'post',
        url: '/api/back/deleteCompany',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          companyId: row.companyId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          })
          this.companyList()
        } else {
          this.$message.error('提交失败，请重试')
        }
      }).catch(() => {
        this.$message.error('提交失败，请重试')
      })
      
    },
    handleDetail: function(index, row) {
      this.companyDetail = row
      this.detailVisible = true
    },
    handleOffic: function(index, row) {
      window.sessionStorage.setItem('adcompanyId', row.companyId)
      this.$router.push({
        path: '/AdOfficList'
      })
    },
    isShowEditor: function(e, row) {

      this.axios({
        method: 'post',
        url: '/api/back/isShow',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          isRead: e ? '1' : '0',
          companyId: row.companyId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          })
          this.companyList()
        } else {
          this.$message.error('提交失败，请重试')
        }
      }).catch(() => {
        this.$message.error('提交失败，请重试')
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



