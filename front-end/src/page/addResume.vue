<template>
    <div class="addResume">
        <div v-title>基础信息</div>
        <div class="form-box">
            <mt-field label="姓名" placeholder="请输入姓名" v-model="userName"></mt-field>
            <mt-radio
                title="性别"
                v-model="userSex"
                :options="['男', '女']">
            </mt-radio>
            <mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="userAge"></mt-field>
            
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="userEmail"></mt-field>
            <mt-radio
                title="求职状态"
                v-model="userStatus"
                :options="['未实习-随时到岗', '实习中-考虑机会', '正式工作-考虑机会', '已离职-随时到岗']">
            </mt-radio>
        </div>
        <div class="offic-push" @click="pushbaseInfo()">
            <div class="off-box off-push">
                立即保存
            </div>
        </div>
    </div>
</template>
<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui';
export default {
    name: 'AddResume',
    data() {
        return {
            userName: '',
            userAge: '',
            userSex: '男',
            userStatus: '未实习-随时到岗',
            userPhone: '',
            userEmail: '',
            userId: '',
        }
    },
    created() {
      let userMsg = JSON.parse(window.localStorage.getItem('userMsg'))
      this.userPhone = userMsg.telPhone
      
        let baseMsg = window.sessionStorage.getItem('modify') && JSON.parse(window.sessionStorage.getItem('modify')) || undefined
        let self = this
        if (baseMsg) {
          self.userName = baseMsg.userName
          self.userAge = baseMsg.userAge
          self.userSex = baseMsg.userSex
          self.userStatus = baseMsg.userStatus
          self.userPhone = baseMsg.userPhone
          self.userEmail = baseMsg.userEmail
        }
    },
    methods: {
      validateEmail: function (email) { 
            //验证邮箱正则
        var re = /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
      },
      pushbaseInfo: function() {
        if (this.userName) {
          if (this.userName.length == 1) {
            MessageBox.alert('姓名禁止输入一个字')
          } else { 
            if (this.validateEmail(this.userEmail)) {
              if (!(/^1[345789]\d{9}$/.test(this.userPhone))) {
                MessageBox('提示', '手机号码格式有误，请重填') 
              } else {
                this.submit()
              }
            } else {
              MessageBox.alert('您未填写邮箱，或填写邮箱格式有误')
            } 
          }
        } else {
          MessageBox.alert('您还未输入姓名')
        }
        
      },
      submit: function () {
        this.axios({
          method: 'post',
          url: '/api/makeUserInfo',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: JSON.parse(window.localStorage.getItem('userMsg')).id,
            userName: this.userName,
            userAge: this.userAge,
            userSex: this.userSex,
            userStatus: this.userStatus,
            userPhone: this.userPhone,
            userEmail: this.userEmail
          }
        }).then((res) => {
          if (res.data.code == 200 || res.data.code == '200') {
            MessageBox.alert('保存成功').then(action => {
              this.$router.back(-1)
            })
          } else {
            MessageBox({
              title: '提示',
              message: res.data.msg,
              showCancelButton: true
            })
          }
        })
      }
    }
}
</script>
<style scoped>
.addResume {
    margin-bottom: 55px;
}

.offic-push {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  background-color: #5dd5ca;
  text-align: center;
}
.off-box {
  display: inline-block;
}
.off-push {
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: 16px;
  left: calc(50% - 36px);
}
</style>


