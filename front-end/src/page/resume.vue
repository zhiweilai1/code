<template>
    <div class="resume">
        <div class="resume-base-msg">
            <div class="resume-base-msg-left">
                <img :src="userMsg.imgUrl" alt="">
            </div>
            <div class="resume-base-msg-right">
                <div>
                    {{data.baseMsg.username}}&nbsp;<img src="../../static/re-icon.png" alt="" class="resume-icon" @click="modify()">
                </div>
                <div class="litle-title" style="font-weight: 200">
                    {{data.baseMsg.sex}}&nbsp;|&nbsp;{{data.baseMsg.number}}&nbsp;|&nbsp;{{data.baseMsg.status}}
                </div>
            </div>
            <div class="resume-base-left">
                <div style="overflow: hidden">
                    <div style="float: left">
                        <img src="../../static/phone-icon.png" alt="" class="resume-icon">
                    </div>
                    <div style="float: left;">
                        &nbsp;{{data.baseMsg.phone}}
                    </div>
                    
                </div>
                <div style="overflow: hidden">
                    <div style="float: left">
                        <img src="../../static/email-icon.png" alt="" class="resume-icon">
                    </div>
                    <div style="float: left;">
                        &nbsp;{{data.baseMsg.email}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui';
export default {
  name: "Resume",
  data() {
    return {
        data: {},
        userMsg: {}
    }
  },
  created() {
    let userMsg = JSON.parse(window.sessionStorage.getItem('userMsg'))
    this.userMsg = userMsg
    let self = this
    service.get('/api/getResume', {}, {
        username: userMsg.userName
    }).then((res) => {
        console.log(res)
        if (Object.keys(res.data).length == 0) {
            MessageBox({
                title: '提示',
                message: '您还未有简历，是否去创建?',
                showCancelButton: true
            }).then((action) => {
                console.log(action)
                if (action == 'cancel') {
                    this.$router.push({
                        path: '/person'
                    })
                } else {
                    this.$router.push({
                        path: '/addResume'
                    }) 
                }
            })
        } else {
            self.data = res.data
        }
    })
  },
  methods: {
      modify: function() {
            window.sessionStorage.setItem('modify', this.data.baseMsg.username)
            this.$router.push({
                path: '/addResume'
            }) 
      }
  }
}
</script>

<style scoped>
.resume-base-msg {
    background-color: #fff;
    padding: 10px;
    padding-top: 30px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    overflow: hidden;
    width: 100%
}
.resume-base-msg-left {
    width: 70px;
    float: left;
    padding-bottom: 10px;
}
.resume-base-msg-left img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
}

.resume-base-msg-right {
    font-size: 24px;
    font-weight: 600;
    float: left;
    width: 70%;
}
.resume-base-left {
    border-top: 1px solid rgb(197, 196, 196);
    padding-top: 10px;
    width: 100%;
    float: left;
}
.resume-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
}
</style>

