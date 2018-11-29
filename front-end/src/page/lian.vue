<template>
  <div class="about">
    <div v-title>联系我们</div>
    <div class="about-title">
      <img src="../../static/about-icon.png" alt="">
    </div>
    <div class="about-detail">
      <div v-if="data.length > 0" v-for="item in data" :key="item" class="about-detail-content">
        {{item}}
      </div>
      <div v-else>
        17610826989
      </div>
    </div>
  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'Lian',
  data() {
    return {
      data: []
    }
  },
  created() {
    service.get('/api/contact').then((res) => {
      this.data = res.data
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
  text-align: center;
}
.about-detail-content {
  margin-bottom: 10px;
}
</style>

