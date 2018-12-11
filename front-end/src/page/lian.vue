<template>
  <div class="about">
    <div v-title>联系我们</div>
    <div class="about-title">
      <img src="../../static/about-icon.png" alt="">
    </div>
    <div class="about-detail">
      <div v-if="data.length > 0" v-for="item in data" :key="item" class="about-detail-content">
        <div style="text-align: left; padding-left: 20px;">{{item.contractPerson}}</div>
        <div>{{item.contractPhone}}</div>
        <div>{{item.contractEmail}}</div>
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
    this.axios({
      method: 'post',
      url: '/api/contact',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    }).then((res) => {
      this.data = res.data.data
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

