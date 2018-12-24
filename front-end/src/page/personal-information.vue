<template>
    <div class="personal-information">
        <div v-title>个人信息</div>
        <div class="personal-box" style="margin-bottom: 50px;">
            <div class="personal-box-left personal-tou">
                头像
            </div>
            <div class="personal-box-right">
                <img :src="userMsg.headImgurl" alt="" class="personal-img">
            </div>
        </div>
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                昵称
            </div>
            <div class="personal-box-right">
                {{userMsg.nickName}}
            </div>
        </div>
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                性别
            </div>
            <div class="personal-box-right">
                {{userMsg.userSex}}
            </div>
        </div>
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                手机号
            </div>
            <div class="personal-box-right">
                {{userMsg.telPhone}}
            </div>
        </div>
        <!-- <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                学校
            </div>
            <div class="personal-box-right">
                {{userMsg.userSchool}}
            </div>
        </div> -->
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                老师
            </div>
            <div class="personal-box-right">
                {{userMsg.userTeacher}}
            </div>
        </div>
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                地区
            </div>
            <div class="personal-box-right">
                {{userMsg.userCountry}}-{{userMsg.userProvince}}-{{userMsg.userCity}}
            </div>
        </div>


    </div>
</template>

<script>
export default {
  name: "PersonalInformation",
  data() {
    return {
       userMsg: {} 
    }
  },
  created() {
      if (window.localStorage.getItem('userMsg')) {
      this.isLogin = true
      
      let userMsg = JSON.parse(window.localStorage.getItem('userMsg'))

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
      
    }
  }
}
</script>
<style scoped>
.personal-box {
    background-color: #fff;
    padding: 10px;
    overflow: hidden;
}
.personal-box-left {
    float: left;
}
.personal-box-right {
    float: right;
}
.personal-tou {
    padding-top: 15px;
}
.personal-img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
}
</style>


