<template>
  <div class="login">
    <div v-title>登录</div>
    <div class="login-tou">
      <img src="../../static/login-t.png" alt="">
    </div>
    <div class="login-content">
      
      <div class="login-yan">
        <div class="login-yan-left">
          <input type="number" v-model="telphone" placeholder="请输入手机号">
        </div>
        <div class="login-yan-right">
          <mt-button size="small" type="primary" :disabled="isPort" @click="getPort()">{{huoContent}}</mt-button>
        </div>
      </div>
      <div class="login-tel">
        <input type="number" v-model="yanNum" placeholder="请输入验证码">
      </div>
    </div>
    <mt-button type="primary" class="login-button" @click="login()">登录</mt-button>
    <span class="registration" @click="jumpTo()">注册</span>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'login',
  data() {
    return {
      isPort: false,
      huoContent: '获取验证码',
      yanNum:'',
      telphone: ''
    }
  },
  methods: {
    getPort: function() {
      if (!this.telphone) {
        MessageBox('提示', '您还未输入手机号')
        return false
      } else {
        if(!(/^1[34578]\d{9}$/.test(this.telphone))){ 
          MessageBox('提示', '手机号码有误，请重填');  
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
    jumpTo: function() {
      this.$router.push({
        path: '/registration'
      })
    },
    login: function() {
      if (this.telphone && this.yanNum) {
        this.axios({
          method: 'post',
          url: '/api/getVerificationCode',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            telPhone: this.telphone,
            smsCode: this.yanNum
          }
        }).then((res) => {
          if (res.data.code == 200 || res.data.code == '200') {
            window.sessionStorage.setItem('userMsg', JSON.stringify(res.data.data))
            this.$router.push({
              path: '/home'
            })
          } else {
            MessageBox({
              title: '小提示',
              message: '登录失败，请重试'
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
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

.login-content {
  width: 80%;
  box-sizing: border-box;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(215, 215, 215, 1);
}
.login-tel {
  height: 50px;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding-top: 10px;
}
.login-tel input {
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  border-bottom: 1px solid #e7e8ed;
  font-size: 16px;
  outline:none;
}
.login-yan {
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e8ed;
  overflow: hidden;
  padding-top: 10px;
}
.login-yan-left {
  float: left;
  width: 50%;
  height: 100%
}
.login-yan-left input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  outline:none;
}
.login-yan-right {
  float: right;
  padding-right: 5px;
  width: 45%;
  text-align: right;
}
.login-button {
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
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

