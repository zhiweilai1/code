<template>
  <div class="Forget">
    <div class=" login-contents">
      <div class="login-yan">
        <div class="login-yan-left">
          <input v-model="telphone" placeholder="请输入手机号">
        </div>
        <div class="login-yan-right">
          <el-button size="small" type="primary" :disabled="isPort" @click="getPort()">{{huoContent}}</el-button>
        </div>
      </div>
      <div class="login-tel">
        <input v-model="yanNum" placeholder="请输入验证码" style="width: 100%">
      </div>
      <div class="login-tel">
        <input v-model="userPassword" placeholder="请输入新密码" style="width: 100%">
      </div>
      <el-button type="primary" class="login-button" @click="login()">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Forget',
  data() {
    return {
      telphone: '',
      yanNum: '',
      isPort: false,
      huoContent: '获取验证码',
      userPassword: ''
    }
  },
  methods: {
    getPort: function() {
      if (!this.telphone) {
        this.$message('您还未输入手机号')
        return false
      } else {
        if(!(/^1[34578]\d{9}$/.test(this.telphone))){ 
          this.$message.error('手机号码有误，请重填');  
          return false;
        } else {
          this.isPort = true
          let num = 61
          let daojishi = setInterval(() => {
            num--
            this.huoContent = num
            if (num < 0) {
              clearInterval(daojishi)
              this.isPort = false
              this.huoContent = '获取验证码'
            }
          }, 1000)
          this.axios({
            method: 'post',
            url: '/api/getVerificationCode',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              userPhone: this.telphone
            }
          }).then((res) => {
          })
        }
      }
    },
    login: function() {
      if (this.telphone && this.yanNum) {
        this.axios({
          method: 'post',
          url: '/api/back/changePassword',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userName: this.telphone,
            smsCode: this.yanNum,
            userPassword: this.userPassword
          }
        }).then((res) => {
          if (res.data.code == 200 || res.data.code == '200') {
            this.$message({
              message: '恭喜你，修改成功',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push({
                path: '/login'
              })
            }, 1000);
            
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  }
}
</script>
<style>
.Forget {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: rebeccapurple;
  background-image: url("../../static/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.login-contents {
  width: 400px;
  height: 260px;
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 150px);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 20px #666;

  box-sizing: border-box;
  margin: auto;
}
.login-tou {
  padding-top: 40px;
  margin: auto;
  text-align: center;
  padding-bottom: 40px;
}
.login-tou img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(215, 215, 215, 1);
}
.login-tel {
  box-sizing: border-box;
  padding-top: 10px;
}
.login-tel input {
  border: 1px solid #e7e8ed;
  border-radius: 10px;
  padding: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 16px;
  outline:none;
}
.login-yan {
  height: 50px;
  box-sizing: border-box;
  border: 1px solid #e7e8ed;
  border-radius: 10px;
  padding-left: 10px;
  overflow: hidden;
}
.login-yan-left {
  float: left;
  height: 100%;
  width: 60%
}
.login-yan-left input {
  height: 100%;
  width: 100%;
  font-size: 16px;
  outline:none;
  border: none
}
.login-yan-right {
  float: right;
  padding-right: 5px;
  width: 110px;
  text-align: right;
  margin-top: 10px;
}
.login-button {
  width: 100%;
  margin-top: 10px;
}
.registration {
  width: 100px;
  position: fixed;
  display: inline-block;
  bottom: 20px;
  text-decoration: none;
  color: #26a2ff;
  text-align: center;
  left: calc(50% - 50px);
}
</style>

