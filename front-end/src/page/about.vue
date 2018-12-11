<template>
  <div class="about">
    <div v-title>关于我们</div>
    <div class="about-title">
      <img src="../../static/about-icon.png" alt="">
    </div>
    <div class="about-detail">
      {{data}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      data: '关于我们'
    }
  },
  created() {
    this.axios({
      method: 'post',
      url: '/api/about',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    }).then((res) => {
      this.data = res.data.data.aboutDes
    })
  }

}
</script>
<style scoped>
.about-title {
  width: 100%;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 50px
}
.about-title img {
  width: 30%;
}

.about-detail {
  padding: 10px;
  text-indent: 2em;
  line-height: 1.5;
  text-align: justify;
}
</style>

