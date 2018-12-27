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
      style="width: calc(100% - 20px); margin-left: 10px;margin-right: 10px">
      <el-table-column
        prop="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司名称"
        >
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
        prop="create_time"
        label="创建时间">
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
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            style="margin-bottom: 5px;"
            size="mini"
            type="primary"
            @click="handleDetail(scope.$index, scope.row)">公司详情</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleCompanySet(scope.$index, scope.row)">添加公司配置</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleOfficSet(scope.$index, scope.row)">职位详情</el-button>
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="companyDetail.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="companyDetail.companyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司方向">
          <el-input v-model="companyDetail.companyDet" disabled placeholder="例如：电子商务，B2C"></el-input>
        </el-form-item>
        <el-form-item label="公司类型">
          <el-input v-model="companyDetail.companyType" disabled placeholder="例如：私营"></el-input>
        </el-form-item>
        <el-form-item label="公司规模">
          <el-select v-model="companyDetail.companyPer" disabled placeholder="请选择活动区域">
            <el-option label="20人以下" value="20人以下"></el-option>
            <el-option label="20-50人" value="20-50人"></el-option>
            <el-option label="50-100人" value="50-100人"></el-option>
            <el-option label="100-500人" value="100-500人"></el-option>
            <el-option label="500-1000人" value="500-1000人"></el-option>
            <el-option label="1000-5000人" value="1000-5000人"></el-option>
            <el-option label="5000-10000人" value="5000-10000人"></el-option>
            <el-option label="10000人以上" value="10000人以上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司福利">
          <el-input v-model="companyDetail.welfareArr" disabled placeholder="多种福利使用中文格式；隔开"></el-input>
        </el-form-item>
        <el-form-item label="宣传链接">
          <el-input v-model="companyDetail.companyUrl" disabled placeholder="可选填如：http://www.baidu.com"></el-input>
        </el-form-item>
        <el-form-item label="公司地点">
          <el-input v-model="companyDetail.companyPlace" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司描述">
          <el-input type="textarea" v-model="companyDetail.companyIntru" disabled></el-input>
        </el-form-item>
      </el-form>

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
export default {
  name: 'CompanyList',
  data() {
    return {
      dialogVisible: false,
      deletObj: {},
      total: 200,
      page: 1,
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
    this.height = window.innerHeight - 230
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
    changePage: function(currentPage) {
      this.page = currentPage
      this.companyList()
    },
    addCompany: function() {
      this.isAddCompany = true
    },
    submitAddCompanyForm: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!(/^1[345789]\d{9}$/.test(this.ruleForm.userName))) {
            this.$message({
              message: '公司账号必须是手机号哟'
            })
            return
          }
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
              this.page = 1
              this.companyList()
              this.isAddCompany = false
            } else {
              this.$message.error(res.data.msg)
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
              this.$message.error(res.data.msg)
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

      this.axios({
        method: 'post',
        url: '/api/back/getCompanyList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          companyName: this.formInline.companyName,
          userName: this.formInline.accountNumber,
          page: this.page
        }
      }).then((res) => {
        this.comLoad = false
        if (res.data.code == 200) {
          this.total = res.data.data.total
          for (let i = 0; i < res.data.data.res.length; i++) {
            res.data.data.res[i].isHot = res.data.data.res[i].isHot == '1' ? true : false
            res.data.data.res[i].isRead = res.data.data.res[i].isRead == '1' ? true : false
            res.data.data.res[i].index = i + 1 + (this.page - 1) * 10
            if (res.data.data.res[i].create_time) {
              res.data.data.res[i].create_time = res.data.data.res[i].create_time.replace('T', ' ').replace('Z', '')
            }
          }
          this.tableList = res.data.data.res
        } else {
          this.$message.error(res.data.msg)
        }
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
          this.$message.error(res.data.msg)
        }
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
    deleteCompany: function () {
      this.axios({
        method: 'post',
        url: '/api/back/deleteCompany',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          companyId: this.deletObj.companyId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜您，修改成功',
            type: 'success'
          })
          this.companyList()
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleDelete: function(index, row) {
      this.deletObj = row
      this.dialogVisible = true

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
          this.$message.error(res.data.msg)
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



