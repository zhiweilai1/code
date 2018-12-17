<template>
  <div class="company-set">
    <h3>公司信息配置</h3>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="公司名称">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="公司方向">
          <el-input v-model="form.companyDet" placeholder="例如：电子商务，B2C"></el-input>
        </el-form-item>
        <el-form-item label="公司类型">
          <el-input v-model="form.companyType" placeholder="例如：私营"></el-input>
        </el-form-item>
        <el-form-item label="公司规模">
          <el-select v-model="form.companyPer" placeholder="请选择活动区域">
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
          <el-input v-model="form.welfareArr" placeholder="多种福利使用“，”隔开"></el-input>
        </el-form-item>
        <el-form-item label="宣传链接">
          <el-input v-model="form.companyUrl" placeholder="可选填如：http://www.baidu.com"></el-input>
        </el-form-item>
        <el-form-item label="公司地点">
          <el-input v-model="form.companyPlace"></el-input>
        </el-form-item>
        <el-form-item label="公司描述">
          <el-input type="textarea" v-model="form.companyIntru"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CompanySet',
  data() {
    return {
      offType: [],
      form: {
        companyName: '',
        companyDet: '',
        companyType: '',
        companyPer: '',
        companyPlace: '',
        companyUrl: '',
        companyPlace: '',
        companyIntru: '',
        welfareArr: ''
      }
    }
  },
  created() {
    let userName = window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')) || undefined
    this.userName = userName
    if (!userName) {
      this.$router.push({
        path: '/login'
      })
    } else {
      this.getOffType()
    }
  },
  methods: {
    onSubmit: function() {
      this.axios({
        method: 'post',
        url: '/api/back/postCompanyContent',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: Object.assign({
          companyId: window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')).userId
        }, this.form)
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success('更改成功')
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.$message.error('请求失败，请重试')
      })
    },
    getOffType: function () {
      this.axios({
        method: 'post',
        url: '/api/getCompany/detail',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          companyId: window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')).userId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.data.company
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.$message.error('请求失败，请重试')
      })
    },
  }
}
</script>
<style>
.company-set {
  padding: 10px;
}
</style>
