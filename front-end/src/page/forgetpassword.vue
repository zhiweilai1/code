<template>
  <div class="Forgetpassword">
    <div v-title>密码设置</div>
    <div class="login-tou">
      <img src="../../static/login-t.png" alt="">
    </div>
    <div class="reg-content">
        <!-- 学生 -->
        <div class="login-content">
          <div class="login-yan">
            <div class="login-yan-left">
              <input v-model="stutelphone" placeholder="请输入手机号" class="number-input" @blur="outPoint()" @focus="focusPoint()">
            </div>
            <div class="login-yan-right">
              <mt-button size="small" type="primary" :disabled="isPortStu" @click="getPortStu()">{{stuhuoContent}}</mt-button>
            </div>
          </div>
          <div class="login-tel">
            <input v-model="stuyanNum" placeholder="请输入验证码" class="number-input" @blur="outPoint()" @focus="focusPoint()">
          </div>
          <div class="login-tel">
            <input v-model="password" placeholder="请设置密码" class="number-input" @blur="outPoint()" @focus="focusPoint()">
          </div>
        </div>
        
      </div>
      <mt-button type="primary" class="registration-button" @click="registration()">修改密码</mt-button>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'Forgetpassword',
  data() {
    return{
      stutelphone: '',
      stuyanNum: '',
      password: '',
      stuhuoContent: '获取验证码',
      isPortStu: false
    }
  },
  methods: {
    getPortStu: function () {
      if (!this.stutelphone) {
        MessageBox('提示', '您还未输入手机号')
        return false
      } else {
        if(!(/^1[345789]\d{9}$/.test(this.stutelphone))){
          MessageBox('提示', '手机号码有误，请重填');
          return false;
        } else {
          this.isPortStu = true
          let num = 61
          let daojishi = setInterval(() => {
            num--
            this.stuhuoContent = num + 's后重新获取'
            if (num < 0) {
              clearInterval(daojishi)
              this.isPortStu = false
              this.stuhuoContent = '获取验证码'
            }
          }, 1000)
          this.axios({
            method: 'post',
            url: '/api/getVerificationCode',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              userPhone: this.stutelphone
            }
          }).then((res) => {
          })
        }
      }
    },
    registration: function () {
      if (!this.stutelphone || !this.stuyanNum || !this.password) {
        MessageBox('提示', '请输入完整')
      } else {
        if (this.password.length < 6) {
          MessageBox('提示', '密码必须在6位以上')
        } else {
          this.axios({
            method: 'post',
            url: '/api/change_password',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              tel_phone: this.stutelphone,
              sms_code: this.stuyanNum,
              password: this.password
            }
          }).then((res) => {
            if (res.data.code == 200 || res.data.code == '200') {
              MessageBox.alert('修改成功,请重新登录').then(action => {
                window.localStorage.removeItem('userMsg')
                this.$router.push({
                  path: '/login'
                })
              })
            } else {
              MessageBox('提示', res.data.msg)
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.Forgetpassword {
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
.registration-box {
  box-sizing: border-box;
  width: 80%;
  margin: auto;
}
.reg-shen {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid #e7e8ed;
}
.reg-shen-left, .reg-shen-right {
  float: left;
  width: 50%;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.reg-content {
  width: 80%;
  margin: auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 20px rgba(215, 215, 215, 1);
}

.click-show{
  color: #fff;
  background: #5dd5ca;
}

.login-content {
  width: 100%;
  box-sizing: border-box;
  margin: auto;
  border-radius: 10px;
}
.login-tel {
  height: 50px;
  box-sizing: border-box;
  /* margin-bottom: 10px; */
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

.registration-button {
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
}
.logon-jump {
  width: 100px;
  position: fixed;
  display: inline-block;
  bottom: 20px;
  text-decoration: none;
  color: #5dd5ca;
  text-align: center;
  left: calc(50% - 50px);
}
</style>
<style>
.region-popup{
    width: 100%;
  }
</style>
