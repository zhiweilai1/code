<template>
    <div class="resume">
        <div v-title>我的简历</div>
        <div class="resume-base-msg">
            <div class="resume-base-msg-left">
                <img :src="userMsg.headImgurl" alt="">
            </div>
            <div class="resume-base-msg-right">
                <div>
                    {{data.baseMsg.userName}}&nbsp;<img src="../../static/re-icon.png" alt="" class="resume-icon" @click="modify()">
                </div>
                <div class="litle-title" style="font-weight: 200">
                    {{data.baseMsg.userSex}}&nbsp;|&nbsp;{{data.baseMsg.userAge}}&nbsp;|&nbsp;{{data.baseMsg.userStatus}}
                </div>
            </div>
            <div class="resume-base-left">
                <div style="overflow: hidden">
                    <div style="float: left">
                        <img src="../../static/phone-icon.png" alt="" class="resume-icon">
                    </div>
                    <div style="float: left;">
                        &nbsp;{{msg.telPhone}}
                    </div>
                    
                </div>
                <div style="overflow: hidden">
                    <div style="float: left">
                        <img src="../../static/email-icon.png" alt="" class="resume-icon">
                    </div>
                    <div style="float: left;">
                        &nbsp;{{data.baseMsg.userEmail}}
                    </div>
                </div>
            </div>
        </div>
        <div class="resume-tec-msg">
            <div class="resume-title big-title">
                教育经历
            </div>
            <div class="resume-tec-card" v-if="data.tecMsg &&data.tecMsg.length > 0" v-for="(item, index) in data.tecMsg" :key="index" @click="editTec(item)">
                <div class="resume-tec-title">
                    <div class="resume-tec-school" style="font-size: 16px; color: #666">
                        {{item.userSchool}}
                    </div>
                    <div class="resume-tec-time">
                        <div class="resume-tec-time" >
                            <img src="../../static/turn-icon.png" alt="" style="width: 20px;">
                        </div>
                        <div class="resume-tec-time" style="font-size: 14px; color: #999; margin-right: 5px;">
                            {{item.beginTime}} - {{item.endTime}}
                        </div>
                    </div>
                </div>
                <div class="resume-tec-zhuan">
                    {{item.schoolLevel}} - {{item.userProfession}}
                </div>
                <div class="resume-tes-dec">
                    {{item.schoolDes}}
                </div>
            </div>
            <mt-button type="default" class="add-button" @click="jumpToAddTec()">添加教育经历</mt-button>
        </div>
        <!-- 实习经历 -->
        <div class="resume-tec-msg">
            <div class="resume-title big-title">
                工作经历
            </div>
            <div class="resume-tec-card" v-if="data.workMsg &&data.workMsg.length > 0" v-for="(item, index) in data.workMsg" :key="index" @click="editWork(item)">
                <div class="resume-tec-title">
                    <div class="resume-tec-school ellipsis-1" style="font-size: 16px; color: #666; width: 40%">
                        {{item.companyName}}
                    </div>
                    <div class="resume-tec-time ellipsis-1">
                        <div class="resume-tec-time" >
                            <img src="../../static/turn-icon.png" alt="" style="width: 20px;">
                        </div>
                        <div class="resume-tec-time" style="font-size: 14px; color: #999; margin-right: 5px;">
                            {{item.beginTime}} - {{item.endTime}}
                        </div>
                    </div>
                </div>
                <div class="resume-tec-zhuan">
                    {{item.userPosition}}
                </div>
                <div class="resume-tes-dec">
                    {{item.userDuties}}
                </div>
            </div>
            <mt-button type="default" class="add-button" @click="jumpToAddWork()">添加工作经历</mt-button>
        </div>
        <!-- 项目经历 -->
        <div class="resume-tec-msg" style="display: none">
            <div class="resume-title big-title">
                项目经历
            </div>
            <div class="resume-tec-card" v-if="data.projectMsg &&data.projectMsg.length > 0" v-for="(item, index) in data.projectMsg" :key="index" @click="editProject(item)">
                <div class="resume-tec-title">
                    <div class="resume-tec-school ellipsis-1" style="font-size: 16px; color: #666; width: 40%">
                        {{item.projectName}}
                    </div>
                    <div class="resume-tec-time ellipsis-1">
                        <div class="resume-tec-time" >
                            <img src="../../static/turn-icon.png" alt="" style="width: 20px;">
                        </div>
                        <div class="resume-tec-time" style="font-size: 14px; color: #999; margin-right: 5px;">
                            {{item.beginTime}} - {{item.endTime}}
                        </div>
                    </div>
                </div>
                <div class="resume-tec-zhuan">
                    {{item.projectPosition}}
                </div>
                <div class="resume-tes-dec">
                    {{item.projectDesc}}
                </div>
            </div>
            <mt-button type="default" class="add-button" @click="jumpToAddProject()">添加项目经历</mt-button>
        </div>
        <!-- 自我评价 -->
        <div class="resume-tec-msg">
            <div class="resume-title big-title">
                自我评价
            </div>
            <div class="resume-tec-card" v-if="data.myDes" @click="jumpToAddEvaluation()">
                <div class="resume-tec-title">
                    <div class="resume-tec-school ellipsis-1" style="font-size: 16px; color: #666; width: 90%">
                        {{data.myDes.myDes}}
                    </div>
                    <div class="resume-tec-time ellipsis-1">
                        <div class="resume-tec-time" >
                            <img src="../../static/turn-icon.png" alt="" style="width: 20px;">
                        </div>
                    </div>
                </div>
                
            </div>
            <mt-button v-else type="default" class="add-button" @click="jumpToAddEvaluation()">添加自我评价</mt-button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: "Resume",
  data() {
    return {
        data: {},
        userMsg: {},
        msg: {}
    }
  },
  created() {
    if (window.localStorage.getItem('userMsg')) {
        let userMsg = JSON.parse(window.localStorage.getItem('userMsg'))
        console.log(userMsg)
        this.msg = userMsg
        this.axios({
          method: 'post',
          url: '/api/getUserMsg',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: userMsg.id
          }
        }).then((res) => {
          this.userMsg = res.data.data
        })

        this.axios({
          method: 'post',
          url: '/api/getMyResume',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: userMsg.id
          }
        }).then((res) => {
          if (res.data.code == 200 && res.data.data.baseMsg) {
            this.data = res.data.data
          } else {
            MessageBox({
                title: '提示',
                message: '您还未有简历，是否去创建?',
                showCancelButton: true
            }).then((action) => {
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
          }
          
        })
    } else {
      this.$router.push({
        path: '/login'
      }) 
    }
  },
  methods: {
      modify: function() {
        window.sessionStorage.setItem('modify', JSON.stringify(this.data.baseMsg))
        this.$router.push({
            path: '/addResume'
        }) 
      },
      jumpToAddTec: function() {
        this.$router.push({
            path: '/addTec'
        }) 
      },
      editTec: function(index) {
        window.sessionStorage.setItem('tecIndex', JSON.stringify(index))
        this.$router.push({
            path: '/addTec'
        })
      },
      jumpToAddWork: function() {
        this.$router.push({
            path: '/addWorkResume'
        }) 
      },
      editWork: function(index) {
        window.sessionStorage.setItem('workIndex', JSON.stringify(index))
        this.$router.push({
            path: '/addWorkResume'
        })
      },
      jumpToAddProject: function() {
        this.$router.push({
            path: '/addProjectResume'
        })
      },
      editProject: function(index) {
        window.sessionStorage.setItem('projectIndex', JSON.stringify(index))
        this.$router.push({
            path: '/addProjectResume'
        }) 
      },
      jumpToAddEvaluation: function() {
        window.sessionStorage.setItem('myDes', JSON.stringify(this.data.myDes) || '')
        this.$router.push({
          path: '/addEvaluationResume'
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
    width: 100%;
    box-sizing: border-box;
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

.resume-tec-msg {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
}
.resume-title {
    margin-bottom: 20px;
}
.resume-tec-title {
    overflow: hidden;
}
.resume-tec-school {
    float: left;
}

.resume-tec-time {
    float: right;
    text-align: right;
}
.resume-tec-zhuan {
    font-size: 12px;
    color: rgb(197, 196, 196);
}
.resume-tes-dec {
    font-size: 14px;
    color: #999;
}
.resume-tec-card {
    margin-bottom: 10px;
}
.add-button {
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
}
</style>

