<template>
  <div class="index">
    <div class="index-banner">
      <mt-swipe :auto="4000">
        
        <mt-swipe-item v-for="item in bannerArr" :key="item">
            <img :src="item.bannerImage" alt="" class="banner-img" @click="jumpToUrl(item.bannerUrl)">          
        </mt-swipe-item>
        
      </mt-swipe>
    </div>
    <div class="hot-company">
      <ul class="hot-company-ul">
        <li @click="comMsg(comArr[0].companyUrl, comArr[0].companyId)">
          <div class="hot-company-img">
            <img :src="comArr[0].companyImg" alt="">
          </div>
          <div>
            {{comArr[0].companyName}}
          </div>
        </li>
        <li @click="comMsg(comArr[1].companyUrl, comArr[1].companyId)">
          <div class="hot-company-img">
            <img :src="comArr[1].companyImg" alt="">
          </div>
          <div>
            {{comArr[1].companyName}}
          </div>
        </li>
        <li @click="comMsg(comArr[0].companyUrl, comArr[0].companyId)">
          <div class="hot-company-img">
            <img :src="comArr[0].companyImg" alt="">
          </div>
          <div>
            {{comArr[0].companyName}}
          </div>
        </li>
        <li @click="comMsg(comArr[0].companyUrl, comArr[0].companyId)">
          <div class="hot-company-img">
            <img :src="comArr[0].companyImg" alt="">
          </div>
          <div>
            {{comArr[0].companyName}}
          </div>
        </li>
      </ul>
    </div>
    <div class="index-company">
      <div v-for="item in comArr" :key="item" class="com-card" @click="comMsg(item.companyUrl, item.companyId)">
        <img :src="item.companyImg" alt="" class="com-card-img">
        <div class="card-show-msg">
          点我了解更多》》
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
        iconArr: ['../../static/home-check.png', '../../static/hire-normal.png', '../../static/personal-normal .png']
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
  width: 100%
}
</style>
