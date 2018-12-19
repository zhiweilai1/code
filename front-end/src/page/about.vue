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
      <span class="title-you">"职位来"</span>期望打破招聘与求职的信息壁垒 ,专注于各院校学生,致力于为他们提供多层次的实践、实习和就业机会。
    </div>
    <div class="about-detail">
      十余年来，我公司主要从事猎头、免费岗前实训等，专门为各大中外合资企业招聘技术型人才，同时招聘互联网、物联网、智能制造、等方面的人才。针对企业,我们将院校合作作为切入口,提供各种灵活服务,快速实现企业需求无缝对接，我公司还实现了企业与学生远程面试，为各院校学生提供一站式服务，无需。
    </div>
    <div class="about-detail" style="padding-bottom: 10px;">
      我们用使命来为每个信任我们的学生提供帮助,为每个信赖我们的企业做好服务。
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

