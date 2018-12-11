<template>
  <div class="index">
    <div class="index-banner">
      <mt-swipe :auto="4000">
        
        <mt-swipe-item v-for="item in bannerArr" :key="item">
            <img :src="item.bannerImage" alt="" class="banner-img" @click="jumpToUrl(item.bannerUrl)">          
        </mt-swipe-item>
        
      </mt-swipe>
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
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px);
  padding-top: 10px;
  padding-bottom: 10px;
  background: rgba(255,165,0, 0.5);
  color: #fff;
  text-align: right;
}
</style>
