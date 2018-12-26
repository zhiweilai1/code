<template>
  <div class="about">
    <div v-title>关于我们</div>
    <div class="about-title">
      <img src="../../static/logo.jpg" alt="">
    </div>
    <div class="gongzhonghao-title">
      职位来
    </div>
    <div class="about-detail">
      <span class="title-you">"职位来"</span>期望打破招聘与求职的信息壁垒，专注于各院校学生，致力于为他们提供服务及多层次的实践、实习和就业机会。
    </div>
    <div class="about-detail">
      平台是知名企业，工业信息化，智能制造等协会联合成立的就业培训一体化校园求职就业平台，岗位可分为：猎头岗位，技术岗位，文职类岗位和普工岗位等。学生在就业期间，平台内的岗位可以自由互换，同时学校还设有我们的客服办公室，现在进去我们的平台看到适合岗位，可以预约时间，在我们学校客服服务中心进行远程面试，学生无需东奔西跑，在平台内就业免车费，免被褥，免简单的日用品，免费岗前培训，就业全程跟踪服务，让学生完全无后顾之忧。我们还招聘互联网、物联网、智能制造等方面的人才，针对企业，我们将院校合作作为切入口，提供各种灵活、个性化服务，快速实现企业需求与求职者无缝对接，为各院校学生提供一站式服务。
    </div>
    <div class="about-detail">
      我们用使命来为每个信任我们的学生提供帮助,为每个信赖我们的企业做好服务。
    </div>
    <div class="about-detail" style="padding-bottom: 10px;">
      我们的老大从事人力资源行业十几年，从2006年—2018年整整12年，从企业待遇和工作环境等方面在综合分析找到几十家适合学生工作的知名企业。
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
  padding: 20px;
  padding-bottom: 0;
  text-indent: 2em;
  line-height: 1.8;
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
</style>

