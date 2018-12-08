<template>
  <div class="offic">
    <div v-title>职位详情</div>
    <div class="offic-main">
      <div class="offic-main-title">
        <!-- 名称及位置 -->
        <div class="company-off-card-title">
          <div class="company-off-card-title-left">{{data.offName}}</div>
          <div class="company-off-card-title-right">{{data.money}}</div>
        </div>
        <div class="company-off-card-place">
          {{data.isshi ? '实习' : '全职'}}&nbsp;|&nbsp;{{data.place}}&nbsp;|&nbsp;{{data.experience}}&nbsp;|&nbsp;{{data.education}}
        </div>
        <div>
          <div style="display: inline-block; color: #888">职位福利:</div>
          <div style="display: inline-block">
            <span class="company-welfare" v-for="item in data.welfareArr" :key="item">
              <mt-badge size="normal">{{item}}</mt-badge>
            </span>
          </div>
        </div>
      </div>
      <div class="offic-main-title">
        <!-- 公司信息 -->
        <div class="offic-main-company" @click="jumpToCompany(data.companyId)">
          <div class="off-main-company-img">
            <img :src="data.companyImg" alt="" class="img company-img">
          </div>
          <div class="off-main-company-title">
            <div class="ellipsis-1 normal-title">
              {{data.companyName}}
            </div>
            <div class="ellipsis-1 litle-title">
              {{data.companydet}}&nbsp;|&nbsp;{{data.companyType}}&nbsp;|&nbsp;{{data.companyPer}}
            </div>
          </div>
          <img src="../../static/turn-icon.png" alt="" class="offic-main-turn">
        </div>
        <div class="offic-main-company-place litle-title">
          {{data.companyPlace}}
        </div>
      </div>
      <div class="offic-main-title">
        <!-- 职位信息 -->
        <div class="zhi-title">
          职位描述
        </div>
        <div class="offic-zhize">
          <div class="litle-title">岗位职责:</div>
          <p class="litle-title zhi-content" v-for="(item, index) in data.Responsibilities" :key="index">
            {{index + 1}}、{{item}}
          </p>
        </div>
        <div class="offic-yaoqiu">
          <div class="litle-title">任职要求:</div>
          <p class="litle-title zhi-content" v-for="(item, index) in data.requirements" :key="index">
            {{index + 1}}、{{item}}
          </p>
        </div>
      </div>
    </div>
    <div class="offic-push" @click="pushOffic()">
      <div class="off-icon off-box">
        <img src="../../static/off-icon.png" alt="">
      </div>
      <div class="off-box off-push">
        立即投递
      </div>
    </div>
  </div>
</template>

<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui'
export default {
  name: 'Office',
  data() {
    return {
      data: {}
    }
  },
  created() {
    let self = this
    let params = {
      officeId: window.sessionStorage.getItem('office')
    }
    service.get('/api/getOfficContent', {}, params).then((res) => {
      self.data = res.data
    })
  },
  methods: {
    jumpToCompany: function (cId) {
      window.sessionStorage.setItem('compony', cId)
      this.$router.push({
        path: '/company'
      })
    },
    pushOffic: function () {
      if (window.sessionStorage.getItem('userMsg')) {
        service.post('/api/submit/resume', {}, {
          officeId: this.data.id,
          userId: window.sessionStorage.getItem('userMsg').userId
        }).then((res) => {
          if (res.data.isSub) {
            MessageBox({
              title: '小提示',
              message: '您已投递成功,点击确定查看投递记录',
            }).then(() => {
              this.$router.push({
                path: '/application'
              })

            });
          } else {
            MessageBox({
              title: '小提示',
              message: '您的简历未完善，点击确定去完善简历',
            }).then(() => {
              this.$router.push({
                path: '/resume'
              })
            });
          }
        })
      } else {
        MessageBox({
          title: '小提示',
          message: '抱歉,您还未登陆,点击确定去登陆',
        }).then(() => {
          this.$router.push({
            path: '/login'
          })
        });
      }
      
    }
  }
}
</script>

<style scoped>
.offic-main {
  margin-bottom: 55px;
}
.offic-main-title {
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(215, 215, 215, 1);
  margin-bottom: 10px;
  overflow: hidden;
}
.company-off-card-title {
  overflow: hidden;
  padding-bottom: 5px;
}
.company-off-card-title-left {
  float: left;
  font-size: 18px;
  max-width: 70%;
  line-height: 1.4;
  font-weight: 500;
}
.company-off-card-title-right {
  float: right;
  max-width: 30%;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
  font-size: 18px;
  color: #26a2ff
}

.company-off-card-place {
  font-size: 14px;
  color: #888;
  padding-top: 10px;
}

.company-welfare {
  display: inline-block;
  margin: 3px;
}
.off-main-company-img, .off-main-company-title {
  float: left;
}

.off-main-company-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.company-img {
  border: 1px solid #e7e8ed;
  border-radius: 10px;
}
.off-main-company-title {
  width: calc(92% - 60px);
  padding-top: 5px;
}

.offic-main-company {
  position: relative;
  height: 50px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(197, 196, 196);
}

.offic-main-turn {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0px;
  top: 10px;
}

.offic-main-company-place {
  padding-top: 10px;
}

.zhi-title {
  color: #333;
  font-size: 17px;
  margin-bottom: 5px;
  border-left: 4px solid #26a2ff;
  padding-left: 12px;
  box-sizing: border-box;
}

.zhi-content {
  margin: 0;
  padding: 0;
  line-height: 1.8rem;
}

.offic-zhize {
  margin-bottom: 20px;
}
.offic-push {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  background-color: #26a2ff;
  text-align: center;
}
.off-box {
  display: inline-block;
}
.off-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 17.5px;
  left: calc(50% - 70px);
}
.off-icon img {
  width: 100%;
  height: 100%;
}
.off-push {
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: 16px;
  left: calc(50% - 36px);
}
</style>

