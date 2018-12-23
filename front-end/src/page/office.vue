<template>
  <div class="offic">
    <div v-title>职位详情</div>
    <div class="offic-main">
      <div class="offic-main-title">
        <!-- 名称及位置 -->
        <div class="company-off-card-title">
          <div class="company-off-card-title-left">{{data.officeDeatil && data.officeDeatil.offName}}</div>
          <div class="company-off-card-title-right">{{data.officeDeatil.offMoney}}</div>
        </div>
        <div class="company-off-card-place">
          {{data.officeDeatil.isExer ? '实习' : '全职'}}&nbsp;|&nbsp;{{data.officeDeatil.offPlace}}&nbsp;|&nbsp;{{data.officeDeatil.offExperience}}&nbsp;|&nbsp;{{data.officeDeatil.offEducation}}
        </div>
        <div>
          <div style="display: inline-block; color: #888">职位福利:</div>
          <div style="display: inline-block">
            <span class="company-welfare" v-for="item in data.company.welfareArr" :key="item">
              <mt-badge size="normal">{{item}}</mt-badge>
            </span>
          </div>
        </div>
      </div>
      <div class="offic-main-title">
        <!-- 公司信息 -->
        <div class="offic-main-company" @click="jumpToCompany(data.company.companyId)">
          <div class="off-main-company-img">
            <img :src="data.company.companyImg" alt="" class="img company-img">
          </div>
          <div class="off-main-company-title">
            <div class="ellipsis-1 normal-title">
              {{data.company.companyName}}
            </div>
            <div class="ellipsis-1 litle-title">
              {{data.company.companyDet}}&nbsp;|&nbsp;{{data.company.companyType}}&nbsp;|&nbsp;{{data.company.companyPer}}
            </div>
          </div>
          <img src="../../static/turn-icon.png" alt="" class="offic-main-turn">
        </div>
        <div class="offic-main-company-place litle-title">
          {{data.company.companyPlace}}
        </div>
      </div>
      <div class="offic-main-title">
        <!-- 职位信息 -->
        <div class="zhi-title">
          职位描述
        </div>
        <div class="offic-zhize">
          <div class="litle-title">岗位职责:</div>
          <p class="litle-title zhi-content" v-for="(item, index) in data.officeDeatil.offResponsibilities" :key="index">
            {{item}}
          </p>
        </div>
        <div class="offic-yaoqiu">
          <div class="litle-title">任职要求:</div>
          <p class="litle-title zhi-content" v-for="(item, index) in data.officeDeatil.offRequirements" :key="index">
            {{item}}
          </p>
        </div>
      </div>
    </div>
    <div v-if="isStu" class="offic-push" @click="pushOffic()">
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
      data: {},
      isStu: false
    }
  },
  created() {
    if (window.localStorage.getItem('userMsg') && JSON.parse(window.localStorage.getItem('userMsg')).isIdentity == '0') {
      this.isStu = true
    }
    // 需要加一个判断来显示立即投递
    let self = this
    let params = {
      officeId: window.sessionStorage.getItem('office')
    }
    this.axios({
      method: 'post',
      url: '/api/getOfficContent',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      data: params
    }).then((res) => {
      let data = res.data.data
      if (!data.company) {
        data.company = {
          companyImg: '../../static/ge-zi-icon.png',
          companyName: '默认公司',
          companyDet: '未知',
          companyPer: '未知',
          companyType: '未知',
          welfareArr: ''
        }
      }
      data.company.welfareArr = data.company.welfareArr && data.company.welfareArr.split(';') || []
      data.officeDeatil.offResponsibilities = data.officeDeatil.offResponsibilities.split(';')
      data.officeDeatil.offRequirements = data.officeDeatil.offRequirements.split(';')
      self.data = data
    })
    this.postHistory()
  },
  methods: {
    postHistory: function() {
      if (window.localStorage.getItem('userMsg')) {
        this.axios({
          method: 'post',
          url: '/api/setHistory',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            officeId: window.sessionStorage.getItem('office'),
            userId: JSON.parse(window.localStorage.getItem('userMsg')).id
          }
        }).then((res) => {})
      }
      
    },
    jumpToCompany: function (cId) {
      window.sessionStorage.setItem('compony', cId)
      this.$router.push({
        path: '/company'
      })
    },
    pushOffic: function () {

      this.axios({
        method: 'post',
        url: '/api/submit/resume',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          officeId: window.sessionStorage.getItem('office'),
          userId: JSON.parse(window.localStorage.getItem('userMsg')).id
        }
      }).then((res) => {
        if (res.data.code == 200 || res.data.code == '200') {
          MessageBox({
            title: '小提示',
            message: '您已投递成功',
          })
        } else {
          MessageBox({
            title: '小提示',
            message: res.data.msg,
          })
        }
      })
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
  color: #fc6c38
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
  border-left: 4px solid #5dd5ca;
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
  background-color: #5dd5ca;
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

