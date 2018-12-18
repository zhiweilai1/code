<template>
  <div class="about">
    <div v-title>联系我们</div>
    <div class="about-title">
      <img src="../../static/logo.jpg" alt="">
    </div>
    <div class="about-detail">
      <div v-if="data.length > 0" v-for="item in data" :key="item" class="about-detail-content">
        <div style="float: left; width: 100%">
          <div class="lian-left">
            <img src="../../static/per-lian.png" alt="">
          </div>
          <div class="lian-right">{{item.contractPerson}}</div>
        </div>
        <div style="float: left; width: 100%">
          <div class="lian-left">
            <img src="../../static/phone-icon.png" alt="">
          </div>
          <div class="lian-right">{{item.contractPhone}}</div>
        </div>
        <div style="float: left; width: 100%">
          <div class="lian-left">
            <img src="../../static/email-icon.png" alt="">
          </div>
          <div class="lian-right">{{item.contractEmail}}</div>
        </div>
      </div>
    </div>
    <div>
      <img src="../../static/map.jpg" alt="" style="width: 100%; border: 1px solid #999; box-sizing: border-box">
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
.about {
  width: 100vw;
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
  padding: 10px;
  text-align: justify;
}
.gongzhonghao-title {
  text-align: center;
  font-size: 2em;
  color: #409EFF
}
.title-you {
  font-size: 1.2em;
  color: #409EFF
}
.about-detail-content {
  overflow: hidden;
  text-align: left;
  width: 50%;
  display: inline-block;
  font-size: 12px;
}
.lian-box-left {
  float: left;
}
.lian-left, .lian-right {
  float: left;
  margin-bottom: 10px;
}
.lian-left img {
  width: 15px;
  margin-right: 5px;
}
</style>

