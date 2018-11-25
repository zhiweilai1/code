<template>
  <div class="index">
    <div class="index-banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img :src="bannerArr[0]" alt="" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerArr[1]" alt="" class="banner-img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img :src="bannerArr[2]" alt="" class="banner-img">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="index-company">
      <div v-for="(item, index) in comArr" :key="index" class="com-card" @click="comMsg(item.url, item.company)">
        <img :src="item.imgUrl" alt="" class="com-card-img">
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
    service.get('/api/getBanner').then((res) => {
      this.bannerArr = res.data
    }).catch((e) => {
      this.bannerArr = [
        '../static/banner1.jpg', '../static/banner2.jpg', '../static/banner3.jpg'
      ]
    })
    service.get('/api/getCompany').then((res) => {
      this.comArr = res.data
    }).catch((e) => {
      this.bannerArr = [
              {
                  url: '',
                  imgUrl: 'http://img00.deviantart.net/0305/i/2012/356/8/9/scenic_environment_creation_in_vue_by_2753productions-d5os5qd.jpg',
                  company: '京东'
              },
              {
                url: 'https://m.mi.com/',
                imgUrl: 'http://img00.deviantart.net/0305/i/2012/356/8/9/scenic_environment_creation_in_vue_by_2753productions-d5os5qd.jpg',
                company: '小米'
            },
            {
                url: '',
                imgUrl: 'http://img00.deviantart.net/0305/i/2012/356/8/9/scenic_environment_creation_in_vue_by_2753productions-d5os5qd.jpg',
                company: '滴滴'
            },
            ]
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
