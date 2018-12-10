<template>
  <div class="index">
    <el-carousel :interval="4000" type="card" height="80vh">
    <el-carousel-item v-for="item in data" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  <div class="foot">
    <a href="http://www.miitbeian.gov.cn">豫ICP备18007792</a>
  </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return{
      data: [
        '../static/1.jpg',
        '../static/2.jpg',
        '../static/3.jpg',
        '../static/4.jpg',
      ]
    }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img {
    width: 100%;
    height: 100%
  }

  .foot {
    text-align: center
  }
  a{
    color: #666;
    text-decoration: none;
  }
</style>
