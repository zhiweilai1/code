<template>
    <div class="personal-information">
        <div class="personal-box" style="margin-bottom: 50px;">
            <div class="personal-box-left personal-tou">
                头像
            </div>
            <div class="personal-box-right">
                <img :src="userMsg.imgUrl" alt="" class="personal-img">
            </div>
        </div>
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                昵称
            </div>
            <div class="personal-box-right">
                {{userMsg.userName}}
            </div>
        </div>
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                手机号
            </div>
            <div class="personal-box-right">
                {{userMsg.telphone}}
            </div>
        </div>
        <div class="personal-box" style="border-bottom: 1px solid rgba(215, 215, 215, 1);">
            <div class="personal-box-left">
                学校
            </div>
            <div class="personal-box-right">
                {{userMsg.school}}
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
      let userMsg = window.sessionStorage.getItem('userMsg')
      console.log(userMsg)
      console.log(JSON.parse(userMsg))
      this.userMsg = JSON.parse(userMsg)
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


