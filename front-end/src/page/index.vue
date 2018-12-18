<template>
  <div class="index">
    <div class="index-banner">
      <mt-swipe :auto="4000">
        
        <mt-swipe-item v-for="(item, index) in bannerArr" :key="index">
            <img :src="item.bannerImage" alt="" class="banner-img" @click="jumpToUrl(item.bannerUrl)">          
        </mt-swipe-item>
        
      </mt-swipe>
    </div>
    <div class="hot-company">
      <ul class="hot-company-ul">
        <li v-for="(item, index) in comArr" :key="index" @click="comMsg(item.companyUrl, item.companyId)">
          <div class="hot-company-img">
            <img :src="item.companyImg" alt="">
          </div>
          <div style="font-size: 12px">
            {{item.companyName}}
          </div>
        </li>
        
      </ul>
    </div>
    <div class="index-company">
      <div class="hire-detail" v-for="(item, index) in officList" v-if="item.offic.offName" :key="index" @click="jumpToDetail(item.offic.officeId)">
        <div class="hire-detail-left">
          <img :src="item.company.companyImg" alt="">
        </div>
        <div class="hire-detail-right">
          <div class="company-off-card-title">
             <div class="company-off-card-title-left ellipsis-1">{{item.offic.offName}}</div>
             <div class="company-off-card-title-right">{{item.offic.offMoney}}</div>
          </div>
          <div class="litle-title hire-company ellipsis-1">
            {{item.company.companyName}}
          </div>
          <div class="litle-title ellipsis-1">
            {{ item.offic.pushTime}}&nbsp;{{item.offic.offPlace}}&nbsp;{{item.company.companyType}}
          </div>
        </div>
      </div>
    </div>
    <tabbar tarname="home" :iconarr="iconArr"></tabbar>
  </div>
  
</template>

<script>
import service from 'service-api'
import tabbar from '../components/tabbar'
export default {
  name: 'index',
  data(){
      return{
        bannerArr: [],
        comArr: [],
        iconArr: ['../../static/home-check.png', '../../static/hire-normal.png', '../../static/personal-normal .png'],
        officList: []
      }
  },
  components: {tabbar},
  created () {
    let self = this
    
    service.post('/api/getBanner').then((res) => {
      this.bannerArr = res.data
    }).catch((e) => {
      this.bannerArr = e.data  //伪代码
    })
    service.post('/api/hotPushCompany').then((res) => {
      this.comArr = res.data
      this.getOfficList()
    }).catch((e) => {
      this.comArr = e.data //伪代码
    })
  },
  methods: {
    comMsg: function(url, company) {
      if (url) {
        window.location.href = url
        return
      } else {
        window.sessionStorage.setItem('compony', company)
        this.$router.push({
          path: '/company'
        })
      }
      
    },
    jumpToUrl: function(url) {
      if (url) {
        window.location.href = url
      }
    },
    getOfficList: function() {
      for (let i = 0; i <  this.comArr.length; i++) {
        this.axios({
          method: 'post',
          url: '/api/getCompany/detail',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            companyId: this.comArr[i].companyId
          }
        }).then((res) => {

          let arr= []
          if (res.data.data.officeList.length > 0) {
            for (let j = 0; j < res.data.data.officeList.length; j++) {
              arr.push({
                company: res.data.data.company,
                offic: res.data.data.officeList[i]
              })
            }
            this.officList = arr
            console.log(this.officList)
          }
          
        })
      }
    },
    jumpToDetail: function (oid) {
      window.sessionStorage.setItem('office', oid)
      this.$router.push({
        path: '/office'
      })
    }
  }
    
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  margin-bottom: 55px;
}
.index-banner {
  height: 60vw;
}
.banner-img {
  width: 100%;
  height: 100%;
}
.index-company {
  margin-top: 10px;
}
.com-card {
  background-color: #fff;
  padding: 10px;
  margin: 5px 10px;
  position: relative;
}
.com-card-img {
  width: 100%;
  display:block;
}
.card-show-msg {
  position: absolute;
  bottom: 5px;
  left: 10px;
  width: calc(100% - 20px);
  padding-top: 5px;
  padding-bottom: 5px;
  background: rgba(51, 245, 3, 0.7);
  color: #fff;
  text-align: right;
}
.hot-company {
  background-color: #fff;
  margin-top: 10px;
}
.hot-company-ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.hot-company-ul li {
  width: 25%;
  float: left;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
}
.hot-company-img {
  width: 100%;
  padding-bottom: 10px;
}
.hot-company-img img {
  width: 60%;
  border: 1px solid rgb(0, 0, 255, 0.2);
  border-radius: 5px;
}
.hire-detail {
  overflow: hidden;
  width: 100%;
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  margin-bottom: 5px;
}
.hire-detail-left {
  float: left;
  width: 60px;
  height: 60px;
  margin-right: 20px;
}
.hire-detail-left img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid rgb(197, 196, 196);
  box-shadow: 5px 5px 10px rgba(215, 215, 215, 1);
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

.hire-detail-right {
  float: left;
  width: calc(100% - 80px)
}
</style>
