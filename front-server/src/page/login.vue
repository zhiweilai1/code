<template>
  <div class="Login">
    <div class="login-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.userName" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" size="small" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="forgetPassword()">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.axios({
        method: 'post',
        url: '/api/back/adminLogin',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          userName: this.form.userName,
          userPassword: this.form.password
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          });
          window.sessionStorage.setItem('userMsg', JSON.stringify(res.data.data))
          setTimeout(() => {
            window.location.href = window.location.protocol+"//"+window.location.host
          }, 1000)
          
        } else {
          this.$message.error('抱歉，登录错误，请重试')
        }
        this.data = res.data.data
      }).catch(() => {
        this.$message.error('抱歉，登录错误，请重试')
      })
    },
    forgetPassword: function () {
      this.$router.push({
        path: '/Forget'
      })
    }
  }
}
</script>
<style>
.Login {
  width: 100%;
  height: 100vh;
  background-color: rebeccapurple;
  background-image: url("../../static/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.login-content {
  width: 400px;
  height: 200px;
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 100px);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 20px #666;
}
</style>

