<template>
  <div class="registration">
    <div v-title>注册</div>
    <div class="login-tou">
      <img src="../../static/login-t.png" alt="">
    </div>
    <div class="registration-box">
      <div class="reg-shen">
        <div class="reg-shen-left" :class="[regShen == '0' ? 'click-show' : '']" @click="changeShen(0)">学生</div>
        <div class="reg-shen-right" :class="[regShen == '1' ? 'click-show' : '']" @click="changeShen(1)">教师</div>
      </div>
      <div class="reg-content" v-if="regShen == '0'">
        <!-- 学生 -->
        <div class="login-content">
          <div class="login-yan">
            <div class="login-yan-left">
              <input type="number" v-model="stutelphone" placeholder="请输入手机号">
            </div>
            <div class="login-yan-right">
              <mt-button size="small" type="primary" :disabled="isPortStu" @click="getPortStu()">{{stuhuoContent}}</mt-button>
            </div>
          </div>
          <div class="login-tel">
            <input type="number" v-model="stuyanNum" placeholder="请输入验证码">
          </div>
        </div>
        <div class="login-tel">
          <input type="text" placeholder="请选择学校" v-model="region" maxlength="80" readonly="readonly" @click="showAddressPicker" />
          <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
            <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker>
          </mt-popup>
        </div>
        <div class="login-tel">
          <input type="number" v-model="guantea" placeholder="关联老师手机号（选填）">
        </div>
      </div>
      <div class="reg-content" v-else>
        <!-- 老师 -->
        <div class="login-content">
          <div class="login-yan">
            <div class="login-yan-left">
              <input type="number" v-model="teatelphone" placeholder="请输入手机号">
            </div>
            <div class="login-yan-right">
              <mt-button size="small" type="primary" :disabled="isPortTea" @click="getPortTea()">{{teahuoContent}}</mt-button>
            </div>
          </div>
          <div class="login-tel">
            <input type="number" v-model="teayanNum" placeholder="请输入验证码">
          </div>
        </div>
      </div>
      
    </div>
    <mt-button type="primary" class="registration-button" @click="registration()">注册</mt-button>
  </div>
</template>
<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui'
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import colleges from '../../static/college.json'
export default {
  name: 'Registration',
  data() {
    return {
      regShen: 0,
      isPortStu: false,
      isPortTea: false,
      stuhuoContent: '获取验证码',
      teahuoContent: '获取验证码',
      yanNum:'',
      stutelphone: '',
      teatelphone: '',
      stuyanNum: '',
      teayanNum: '',
      popupVisible: '',
      region: '',
      regionVisible: false,
      myAddressSlots: [
          //省
        {
          flex: 1,
          values: this.getProvinceArr(), //省份数组
          className: 'slot1',
          textAlign: 'center'
        },
           //分隔符
        {
          divider: true,
          content: '',
          className: 'slot2'
        },
          //市
        {
          flex: 1,
          values: this.getCityArr("北京"),
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      regionInit:false,
      guantea: ''
    }
  },
  methods: {
    changeShen: function(regShen) {
      this.regShen = regShen
    },
    showAddressPicker: function() {
      this.regionVisible = true;
    },
    getPortStu: function() {
      if (!this.stutelphone) {
        MessageBox('提示', '您还未输入手机号')
        return false
      } else {
        if(!(/^1[34578]\d{9}$/.test(this.stutelphone))){ 
          MessageBox('提示', '手机号码有误，请重填');  
          return false;
        } else {
          this.isPortStu = true
          let num = 61
          let daojishi = setInterval(() => {
            num--
            this.stuhuoContent = num
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
    getPortTea: function() {
      if (!this.teatelphone) {
        MessageBox('提示', '您还未输入手机号')
        return false
      } else {
        if(!(/^1[34578]\d{9}$/.test(this.teatelphone))){ 
          MessageBox('提示', '手机号码有误，请重填') 
          return false;
        } else {
          this.isPortTea = true
          let num = 61
          let daojishi = setInterval(() => {
            num--
            this.teahuoContent = num
            if (num < 0) {
              clearInterval(daojishi)
              this.isPortTea = false
              this.teahuoContent = '获取验证码'
            }
          }, 1000)
          this.axios({
            method: 'post',
            url: '/api/getVerificationCode',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              userPhone: this.teatelphone
            }
          }).then((res) => {
          })
        }
      }
    },
    addressChange(picker, values){
      if (this.regionInit){
        this.region = values[1]["name"]
        picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
      }else {
        this.regionInit = true;
      }
    },
    getProvinceArr() {
      let provinceArr = []
      for (let i = 0; i < colleges.campus.length; i++) {
        for (let key in colleges.campus[i]) {
          provinceArr.push({
            name: key
          })
        }
      }
      return provinceArr;
    },
    getCityArr(city) {
      let cityArr = [];
      for (let i = 0; i < colleges.campus.length; i++) {
        for (let key in colleges.campus[i]) {
          if (key == city) {
            for (let j = 0; j < colleges.campus[i][key].length; j++) {
              cityArr.push({
                name: colleges.campus[i][key][j]
              })
            }
          }
          
        }
      }
      return cityArr;
    },
    registration: function() {
      let params = {}
      if (this.egShen == 0) {
        params = {
          Identity: 0,
          telPhone: this.stutelphone,
          smsCode: this.stuyanNum,
          userSchool: this.region,
          userTeacher: this.guantea
        }
      } else {
        params = {
          Identity: 1,
          telPhone: this.teatelphone,
          smsCode: this.teayanNum
        }
      }


      this.axios({
        method: 'post',
        url: '/api/registration',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: params
      }).then((res) => {
        if (res.data.code == 200 || res.data.code == '200') {
          MessageBox.alert('注册成功').then(action => {
            this.$router.push({
              path: '/login'
            })
          })
        } else {
          MessageBox('提示', '注册失败，请重试')
        }
      }).catch((err) => {
        MessageBox('提示', '注册失败，请重试')
      })
    }
  }
}
</script>
<style scoped>
.registration {
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
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  box-shadow: 0 10px 20px rgba(215, 215, 215, 1);
}

.click-show{
  color: #fff;
  background: #26a2ff;
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

.registration-button {
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
}

</style>
<style>
.region-popup{
    width: 100%;
  }
</style>


