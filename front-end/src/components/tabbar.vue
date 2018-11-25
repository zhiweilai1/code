<template>
  <div id="app">
    <router-view/>
    <mt-tabbar v-model="message" fixed>
      <mt-tab-item id="home">
        <img slot="icon" :src="iArr[0]">
        首页
      </mt-tab-item>
      <mt-tab-item id="hire">
        <img slot="icon" :src="iArr[1]">
        招聘信息
      </mt-tab-item>
      <mt-tab-item id="person">
        <img slot="icon" :src="iArr[2]">
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    tarname: String,
    iconarr: Array
  },
  data () {
    return {
      message: this.tarname,
      iArr: this.iconarr
    }
  },
  watch: {
    message: function (val, oldVal) {
      this.$router.push({
          path: '/' + val
        })
    }
  }
}
</script>

<style>
.mint-tabbar {
  background-color: #fff;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #fff;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#d9d9d9), color-stop(50%, #d9d9d9), color-stop(50%, transparent));
  background-size: 100% 1px;
  background-repeat: no-repeat;
}
</style>
