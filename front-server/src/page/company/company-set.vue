<template>
  <div class="company-set">
    <h3>公司信息配置</h3>
    <div>

      <el-steps :active="active" finish-status="success">
        <el-step title="上传背景图片" ></el-step>
        <el-step title="上传公司logo" ></el-step>
        <el-step title="填写公司信息"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="back">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      <div v-show="active == 0" class="com-update">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/postsdas/"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="backImg" :src="backImg" class="avatar">
          <div slot="tip" class="el-upload__tip">只能上传宽长之比是4：3 或者3：2图片，否则公司背景图片会错乱，谢谢！</div>
        </el-upload>
      </div>
      <div v-show="active == 1" class="com-update">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/postsdas/"
          :show-file-list="false"
          :before-upload="beforeAvatarUploadtwo">
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <img v-if="companyImg" :src="companyImg" class="avatar">
          <div slot="tip" class="el-upload__tip">只能上传宽正方形logo，否则公司logo展示会受影响，谢谢！
        </div>
        </el-upload>
      </div>
      <div v-show="active == 2" style="margin-top: 30px;">

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
            <el-input v-model="form.welfareArr" placeholder="多种福利使用英文格式的;隔开"></el-input>
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
      <div v-show="active == 3" style="margin-top: 30px;">

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="公司名称">
            <el-input v-model="form.companyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司方向">
            <el-input v-model="form.companyDet" disabled placeholder="例如：电子商务，B2C"></el-input>
          </el-form-item>
          <el-form-item label="公司类型">
            <el-input v-model="form.companyType" disabled placeholder="例如：私营"></el-input>
          </el-form-item>
          <el-form-item label="公司规模">
            <el-select v-model="form.companyPer" placeholder="请选择活动区域" disabled>
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
            <el-input v-model="form.welfareArr" placeholder="多种福利使用英文格式的;隔开" disabled></el-input>
          </el-form-item>
          <el-form-item label="背景图片">
            <el-input v-model="backImg" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司logo">
            <el-input v-model="companyImg" disabled></el-input>
          </el-form-item>
          <el-form-item label="宣传链接">
            <el-input v-model="form.companyUrl" placeholder="可选填如：http://www.baidu.com" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司地点">
            <el-input v-model="form.companyPlace" disabled></el-input>
          </el-form-item>
          <el-form-item label="公司描述">
            <el-input type="textarea" v-model="form.companyIntru" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
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
      },
      active: 0,
      backImg: '',
      companyImg: ''
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
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      
      this.fileName = file.name
      let reader = new FileReader()
      reader.onload = () => {
        let _base64 = reader.result       
        this.updateImg(_base64, 0, 1) 
      }

      reader.readAsDataURL(file)
    },
    beforeAvatarUploadtwo(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      
      this.fileName = file.name
      let reader = new FileReader()
      reader.onload = () => {
        let _base64 = reader.result  
        this.updateImg(_base64, 1, 2)      
      }

      reader.readAsDataURL(file)
    },
    updateImg: function(base, data, active) {
      let self = this
      this.axios({
        method: 'post',
        url: '/api/back/upload',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          baseString: base.split('base64,')[1],
          fileName: this.fileName
        }
      }).then((res) => {
        if (res.data.code == 200) {
          if (data == 0) {
            self.backImg = res.data.data
          } else {
            self.companyImg = res.data.data
          }
          this.active = active

        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((err) => {
        this.$message.error(err.data.msg)
      })
    },
    next() {
      this.active++
      if (this.active > 2) {
        this.active = 3
      }
      // if (this.active++ > 2) this.active = 0;
    },
    back() {
      this.active--
      if (this.active < 0) {
        this.active = 0
      }
    },
    onSubmit: function() {
      this.axios({
        method: 'post',
        url: '/api/back/postCompanyContent',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: Object.assign({
          companyId: window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')).userId
        }, this.form, {backImg: this.backImg,
          companyImg: this.companyImg})
      }).then((res) => {
        if (res.data.code == 200) {
          this.active = 3
          this.getOffType()
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
          this.backImg = res.data.data.company.backImg
          this.companyImg = res.data.data.company.companyImg
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
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    display: block;
  }
  .com-update {
    text-align: center;
    margin-top: 50px;
  }
</style>
