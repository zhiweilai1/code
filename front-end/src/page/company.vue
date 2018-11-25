<template>
  <div class="company">
    <div v-title>公司简介</div>
    <div class="banner-img-box">
      <img :src="backImg" alt="" class="company-back-img">
      <img :src="imgUrl" alt="" class="banner-img">
      <div class="company-name">
        {{companyName}}
      </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">公司概况</mt-tab-item>
      <mt-tab-item id="2">热招职位</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="company-card">
          <!-- 公司简介 -->
          <div class="company-card-title">
            公司简介
          </div>
          <div class="company-part-box">
            <div class="company-part">
              <div class="company-part-child" style="margin-right: 5px;">
                <img src="../../static/qiu-icon.png" alt="" class="company-part-icon">
              </div>
              <div class="company-part-child">
                {{companydet}}
              </div>
            </div>
            <div class="company-part">
              <div class="company-part-child" style="margin-right: 5px;">
                <img src="../../static/lou-icon.png" alt="" class="company-part-icon">
              </div>
              <div class="company-part-child">
                {{companyType}}
              </div>
            </div><div class="company-part">
              <div class="company-part-child" style="margin-right: 5px;">
                <img src="../../static/per-icon.png" alt="" class="company-part-icon">
              </div>
              <div class="company-part-child">
                {{companyPer}}
              </div>
            </div>
          </div>
          <div class="company-intra">
            {{intruduce}}
          </div>
        </div>
        <div class="company-card">
          <!-- 工作地点 -->
          <div class="company-card-title">
            工作地点
          </div>
          <div>
            {{officPlace}}
          </div>
        </div>
        <div class="company-card">
          <!-- 企业福利 -->
          <div class="company-card-title">
            企业福利
          </div>
          <div>
            <span class="company-welfare" v-for="item in welfareArr" :key="item">
              <mt-badge size="normal">{{item}}</mt-badge>
            </span>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
       <div class="company-off">
         {{officeNum}}个职位正在热招
       </div>
       <div class="company-list-box">
         <div v-for="(item, index) in offList" :key="index" class="company-off-card" @click="jumpToOff(item)">
           <div class="company-off-card-title">
             <div class="company-off-card-title-left">{{item.name}}</div>
             <div class="company-off-card-title-right">{{item.money}}</div>
           </div>
           <div class="company-off-card-place">
             {{item.place}}&nbsp;|&nbsp;{{item.experience}}&nbsp;|&nbsp;{{item.education}}
           </div>
           <div class="company-off-card-time">
             {{item.pushTime}}
           </div>
         </div>
       </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import service from 'service-api'
export default {
  name: 'Company',
  data() {
    return {
      backImg: '',
      imgUrl: '',
      companyName: '',
      selected: '1',
      officPlace: '',
      intruduce: '',
      welfareArr: [],
      officeNum: 49,
      companydet: '',
      companyType: '',
      companyPer: '',
      offList: []
    }
  },
  created() {
    let self = this
    let params = {
      companyId: window.sessionStorage.getItem('conpany')
    }
    service.get('/api/getCompany/detail', {}, params).then((res) => {
      self.backImg = res.data.backImg
      self.companyName = res.data.companyName
      self.companyName = res.data.companyName
      self.imgUrl = res.data.companyImg
      self.companydet = res.data.companydet
      self.companyType = res.data.companyType
      self.companyPer = res.data.companyPer
      self.intruduce = res.data.companyIntru
      self.officPlace = res.data.companyPlace
      self.welfareArr = res.data.welfareArr
      self.officeNum = res.data.offList.length
      self.offList = res.data.offList
    })
  },
  methods: {
    jumpToOff: function (offic) {
      window.sessionStorage.setItem('office', offic.id)
      this.$router.push({
        path: '/office'
      })

    }
  }
}
</script>
<style scoped>
.banner-img-box {
  width: 100%;
  height: 200px;
  /* background-image: url('../../static/banner1.jpg'); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  background-color: #26a2ff;
  color: #fff;
}
.company-back-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0
}
.banner-img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  position: absolute;
  left: calc(50% - 35px);
  top: 50px;
  z-index: 2
}

.company-name {
  position: absolute;
  text-align: center;
  width: 100%;
  top: 150px;
  font-weight: 600;
  font-size: 18px;
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
  color: #26a2ff
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
  margin-top: 10px;
}
.mint-tab-item-label {
  font-size: 16px;
}
</style>


