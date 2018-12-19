<template>
  <div class="index">
    <div class="index-banner">
      <mt-swipe :auto="4000">
        
        <mt-swipe-item v-for="(item, index) in bannerArr" :key="index">
            <img :src="item.bannerImage" alt="" class="banner-img" @click="jumpToUrl(item.bannerUrl)">          
        </mt-swipe-item>
        
      </mt-swipe>
    </div>
    <div class="hot-company" v-for="(item, index) in comArr" :key="index" @click="comMsg(item.companyUrl, item.companyId)">
        <img :src="item.backImg" alt="" class="hot-img">
        <div class="hot-company-title">
          {{item.companyName}}
          <div class="more">更多&gt;</div>
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
  margin-bottom: 20px;
}
.banner-img {
  width: 100%;
  height: 100%;
}

.hot-company {
  margin: auto;
  margin-bottom: 10px;
  box-sizing: border-box;
  background: #ffffff;
  width: 98vw;
  height: 60vw;
  padding: 10px;
  position: relative;
}
.hot-box {
  width: 100%;
}
.hot-img {
  width: 100%;
  height: 100%;
}
.hot-company-title {
  position: absolute;
  bottom: 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
.more {
  position: absolute;
  bottom: 0;
  padding-bottom: 13px;
  right: 22px;
  font-size: 12px;
  color: #26a2ff;
}
</style>
