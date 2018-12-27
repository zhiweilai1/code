<template>
  <div class="about">
    <div v-title>关于我们</div>
    <div class="about-title">
      <img src="../../static/logo.jpg" alt="">
    </div>
    <div class="gongzhonghao-title">
      职位来
    </div>
    <div class="about-detail" v-html="data"></div>
      
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
.about {
  width: 100vw;
  height: 100vh;
  background-image: url('../../static/bei2.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
}
.about-title {
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 50px
}
.about-title img {
  width: 30%;
  border-radius: 50%
}
.about-detail {
  padding-bottom: 60px;
}

.about-detail>>>p {
  padding: 20px;
  padding-bottom: 0;
  text-indent: 2em;
  line-height: 1.8;
  text-align: justify;
  margin: 0;
  font-size: 1.1em;
}

.gongzhonghao-title {
  text-align: center;
  font-size: 2em;
  color: #409EFF
}
.about-detail>>>span {
  font-size: 1.3em;
  color: #409EFF
}
</style>

