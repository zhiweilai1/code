<template>
  <div class="AdcompanySet">
    <div style="margin-bottom: 10px">
      <el-button type="default" size="mini" icon="el-icon-back" @click="() => {this.$router.back(-1)}">返回</el-button>
      <span style="display: inline-block; margin-left: 10px;">
        公司配置
      </span>
    </div>
    <div>
      
      <div class="set-company">
        <div>
          <div class="com-update">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/postsdas/"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传宽长之比是4：3 或者3：2图片，否则公司背景图片会错乱，谢谢！</div>
            </el-upload>
          </div>
        </div>
        <div class="com-update com-img-rele">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/postsdas/"
            :show-file-list="false"
            :before-upload="beforeAvatarUploadtwo">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传宽正方形logo，否则公司logo展示会受影响，谢谢！
          </div>
          </el-upload>
          <img :src="companyImg" alt="" class="company-logo-set">
        </div>
        <div>
          <div style="margin-top: 30px;">

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
                <el-input v-model="form.welfareArr" placeholder="多种福利使用中文格式的；隔开"></el-input>
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
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="show-company">
        <div class="show-phone">
          <div class="banner-img-box">
            <img :src="backImg" alt="" class="company-back-img">
            <div class="company-name">{{form.companyName}}</div>
          </div>
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">公司概况</mt-tab-item>
            <mt-tab-item id="2">热招职位</mt-tab-item>
          </mt-navbar>
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <div class="company-card">
                <!-- 公司简介 -->
                <div class="company-card-title">公司简介</div>
                <div class="company-part-box">
                  <div class="company-part">
                    <div class="company-part-child" style="margin-right: 5px;">
                      <img src="../../../static/qiu-icon.png" alt class="company-part-icon">
                    </div>
                    <div class="company-part-child">{{form.companyDet}}</div>
                  </div>
                  <div class="company-part">
                    <div class="company-part-child" style="margin-right: 5px;">
                      <img src="../../../static/lou-icon.png" alt class="company-part-icon">
                    </div>
                    <div class="company-part-child">{{form.companyType}}</div>
                  </div>
                  <div class="company-part">
                    <div class="company-part-child" style="margin-right: 5px;">
                      <img src="../../../static/per-icon.png" alt class="company-part-icon">
                    </div>
                    <div class="company-part-child">{{form.companyPer}}</div>
                  </div>
                </div>
                <div class="company-intra">{{form.companyIntru}}</div>
              </div>
              <div class="company-card">
                <!-- 工作地点 -->
                <div class="company-card-title">工作地点</div>
                <div>{{form.companyPlace}}</div>
              </div>
              <div class="company-card">
                <!-- 企业福利 -->
                <div class="company-card-title">企业福利</div>
                <div>
                  <span class="company-welfare" v-for="item in showwel" :key="item">
                    <mt-badge size="normal">{{item}}</mt-badge>
                  </span>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
        
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdcompanySet',
  watch: {
    form: {
      handler(newContext) {
        if (newContext.welfareArr) {
          this.showwel = newContext.welfareArr.split(' ')
        }
      }
    }
  },
  data() {
    return {
      companyId: '',
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
      backImg: '',
      companyImg: '',
      selected: '1',
      showwel: []
    }
  },
  created() {
    if (window.sessionStorage.getItem('adSetCompany')) {
      this.companyId = window.sessionStorage.getItem('adSetCompany')
      this.getCompanyMsg()
    } else {
      this.$router.back(-1)
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
        this.updateImg(_base64, 0) 
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
        this.updateImg(_base64, 1)      
      }

      reader.readAsDataURL(file)
    },
    updateImg: function(base, data) {
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

        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((err) => {
        this.$message.error(err.data.msg)
      })
    },
    getCompanyMsg: function() {
      this.axios({
        method: 'post',
        url: '/api/getCompany/detail',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          companyId: this.companyId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.backImg = res.data.data.company.backImg
          this.companyImg = res.data.data.company.companyImg
          this.form = res.data.data.company
          this.showwel = this.form.welfareArr &&this.form.welfareArr.split(' ')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onSubmit: function() {
      this.axios({
        method: 'post',
        url: '/api/back/postCompanyContent',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: Object.assign({
          companyId: this.companyId
        }, this.form, {backImg: this.backImg,
          companyImg: this.companyImg})
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
  }
}
</script>
<style>
.com-img-rele {
  position: relative;
}
.company-logo-set {
  position: absolute;
  left: calc(50% + 150px);
  top: calc(50% - 50px);
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
}
.AdcompanySet {
  padding: 10px;
}
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
  .set-company {
    float: left;
    width: 60%;
  }
  .show-company {
    float: left;
    width: 37%;
    padding-left: 30px;
  }
  .show-phone {
    border: 1px solid #999;
    width: 375px;
    height: 667px;
    background-color: #f5f5f5;
  }
  .banner-img-box {
  width: 100%;
  height: 200px;
  /* background-image: url('../../static/banner1.jpg'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  background-color: #5dd5ca;
  color: #fff;
}
.company-back-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.company-name {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 0px;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  padding: 10px;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 18px;
  color: #4a4c5b;
}
.company-card {
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.company-card-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.company-part {
  display: inline-block;
  width: calc(50% - 10px);
  padding-bottom: 5px;
  overflow: hidden;
}

.company-part-icon {
  width: 25px;
}
.company-part-child {
  float: left;
}

.company-intra {
  border-top: 1px solid rgb(197, 196, 196);
  padding-top: 10px;
  text-indent: 2em;
  text-align: justify;
  line-height: 1.5em;
}

.company-welfare {
  display: inline-block;
  margin: 3px;
}

.company-off {
  padding: 10px;
  padding-top: 0;
}

.company-list-box {
  background-color: #fff;
  padding: 10px;
  padding-bottom: 0px;
  padding-top: 0px;
  box-sizing: border-box;
}

.company-off-card {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(197, 196, 196);
}
.company-off-card-title {
  overflow: hidden;
  padding-bottom: 5px;
}
.company-off-card-title-left {
  float: left;
  font-size: 16px;
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
}
.company-off-card-title-right {
  float: right;
  max-width: 30%;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
  font-size: 17px;
  color: #fc6c38;
}
.company-off-card-place {
  font-size: 14px;
  color: #888;
}
.company-off-card-time {
  font-size: 14px;
  color: #888;
}
</style>
<style>
.mint-tab-container {
  margin-top: 10px!important;
}
.mint-tab-item-label {
  font-size: 16px;
}
.mint-navbar .mint-tab-item.is-selected {
  color: #5dd5ca;
  border-bottom: 3px solid #5dd5ca;
}
.mint-badge.is-primary, .mint-button--primary {
  background-color: #5dd5ca;
}
</style>
