<template>
  <div class="person">
    <div v-title>我的</div>
    <div v-if="isLogin">
      <!-- 已登录 -->
      <div class="login-card">
        <div class="login-card-left">
          <img :src="userMsg.headImgurl" alt="">
        </div>
        <div class="login-card-right">
          <div style="font-size: 20px;margin-bottom: 10px;">
            {{userMsg.nickName}}
          </div>
          <div class="litle-title" style="color: #fff">
            {{userMsg.telPhone}}
          </div>
        </div>
      </div>
      <div v-if="userMsg.id == '0'">
        <mt-cell title="个人资料" is-link :to="{path:'/personal-information'}">
          <img slot="icon" src="../../static/ge-zi-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="我的简历" is-link :to="{path:'/resume'}">
          <img slot="icon" src="../../static/jian-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="我的申请" is-link :to="{path:'/application'}">
          <img slot="icon" src="../../static/shen-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="浏览记录" is-link :to="{path:'/history'}">
          <img slot="icon" src="../../static/lan-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="关于我们" is-link :to="{path:'/about'}">
          <img slot="icon" src="../../static/about-us.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="联系我们" is-link :to="{path:'/lian'}">
          <img slot="icon" src="../../static/lian-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
      </div>
      <div v-else>
        <mt-cell title="个人资料" is-link :to="{path:'/personal-information'}">
          <img slot="icon" src="../../static/ge-zi-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="浏览记录" is-link :to="{path:'/history'}">  
          <img slot="icon" src="../../static/lan-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="关于我们" is-link :to="{path:'/about'}">
          <img slot="icon" src="../../static/about-us.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
        <mt-cell title="联系我们" is-link :to="{path:'/lian'}">
          <img slot="icon" src="../../static/lian-icon.png" width="24" height="24" style="margin-right: 10px;">
        </mt-cell>
      </div>
      
    </div>
    <div v-else>
      <!-- 未登录 -->
      <div class="no-login-card" @click="jumpToLogin()">
        <div class="no-login-card-title">
          <h2 class="big-title">
            点击登录
          </h2>
          <p class="litle-title">
            登录后查看更多信息
          </p>
        </div>
        <div class="no-login-card-img">
          <img src="../../static/login-icon.png" alt="">
        </div>
      </div>
      <mt-cell title="关于我们" is-link :to="{path:'/about'}">
        <img slot="icon" src="../../static/about-us.png" width="24" height="24" style="margin-right: 10px;">
      </mt-cell>
      <mt-cell title="联系我们" is-link :to="{path:'/lian'}">
        <img slot="icon" src="../../static/lian-icon.png" width="24" height="24" style="margin-right: 10px;">
      </mt-cell>


    </div>
    <tabbar tarname="person" :iconarr="iconArr"></tabbar>
  </div>
</template>

<script>
import service from 'service-api'
import tabbar from '../components/tabbar'
export default {
  name: 'person',
  data () {
    return {
      iconArr: ['../../static/home-normal.png', '../../static/hire-normal.png', '../../static/personal-check .png'],
      isLogin: false,
      userMsg: {},
    }
  },
  components: {tabbar},
  created() {
    if (window.sessionStorage.getItem('userMsg')) {
      this.isLogin = true
      
      let userMsg = JSON.parse(window.sessionStorage.getItem('userMsg'))

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
      
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    jumpToLogin: function () {
      this.$router.push({
        path: '/login'
      })
    },
    jumpTo: function (link) {
      if (link == 'about') {
        this.$router.push({
          path: '/about'
        })
      } else {
        this.$router.push({
          path: '/lian'
        })
      }
    }
  }
}
</script>
<style scoped>
.no-login-card {
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  background-color: #fff;
  padding: 20px;
  overflow: hidden;
  margin-bottom: 10px;
}

.no-login-card-title {
  float: left;
  width: 70%
}
.no-login-card-img {
  float: left;
  width: 30%;
  margin-top: 10px;
}

.no-login-card-img img {
  width: 70px;
  height: 70px;
}
.login-card {
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  background-color: #26a2ff;
  padding: 20px;
  overflow: hidden;
  margin-bottom: 50px;
  color: #fff;
}

.login-card-left {
  float: left;
  width: 30%;
  margin-top: 10px;
}
.login-card-left img{
  width: 70px;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0 0 20px #fff;
}
.login-card-right {
  padding-top: 15px;
}
</style>


