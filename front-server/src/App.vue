<template>
  <div id="app">
    <el-container>
      <el-header v-if="useMsg">
        <div class="company-zhi">
          <img src="../static/logo.jpg" alt="" style="display: inline;width: 40px; height: 40px; border-radius: 50%;margin-top: 10px;float: left; margin-right: 10px;">
          职位来后台管理
        </div>
        <div class="company-zhi-name">
          <span>
            {{useMsg.company.companyName}}({{useMsg.userName}})
          </span>
          &nbsp;&nbsp;&nbsp;
          <span style="color: #fc6c38; cursor: pointer" @click="logout()">
            退出
          </span>
        </div>
      </el-header>
      <el-container style="height: 500px;" >
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)"  v-if="useMsg">
          <el-menu router :default-active="this.$router.path" background-color="#545c64"
          text-color="#fff">

          <el-submenu v-for="(item, index) in layMenu" :key="index" :index="index + ''">
            <template slot="title">
              <i :class="item.icon"></i>{{item.name}}
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(childKey, chiKey) in item.child" :key="chiKey" :index="childKey.path">{{childKey.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        
        <el-main :style="{'height': useMsg ? 'calc(100vh - 62px)': '100vh'}">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    </el-container>
    
  
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      layMenu: [],
      useMsg: {}
    }
  },
  created() {
    this.getMenuList()
    this.getMenuList()
  },
  methods: {
    logout: function () {
      let msg = window.sessionStorage.removeItem('userMsg')
      this.useMsg = msg
      this.$router.push({
        path: '/login'
      })
    },
    getMenuList: function() {
      let userName = window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')) || undefined
      this.useMsg = userName
      if (!userName) {
        this.layMenu = [{
          name: '登录',
          icon: 'el-icon-menu',
        }]
        if (window.location.href.indexOf('Forget') > -1) {
          this.$router.push({
            path: '/Forget'
          })
        } else {
          this.$router.push({
            path: '/login'
          })
        }
        
      } else if (userName.userType == 'company') {
          this.layMenu = [{
            name: '信息管理',
            icon: 'el-icon-menu',
            child: [{
              path: '/CoOfficList',
              name: '职位管理'
            }]
          }, {
            name: '账户管理',
            icon: 'el-icon-setting',
            child: [{
              path: '/CoSet',
              name: '公司设置'
            }, {
              path: '/Forget',
              name: '密码设置'
            }]
          }]
      } else {
        this.layMenu = [{
          name: '信息管理',
          icon: 'el-icon-menu',
          child: [{
            path: '/AdCompanyList',
            name: '公司信息'
          }, {
            path: '/AdStudent',
            name: '学生信息'
          }, {
            path: '/AdTeacher',
            name: '教师信息'
          }]
        }, {
          name: '平台配置',
          icon: 'el-icon-setting',
          child: [{
            path: '/Banner',
            name: '首页轮播'
          }, {
            path: '/AdContact',
            name: '联系方式及类型'
          }, {
            path: '/Forget',
            name: '密码设置'
          }]
        }]
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  color: #4a4c5b;
}
* {
  box-sizing: border-box;
}
.company-zhi {
  float: left;
  line-height: 60px;
  color: #fff;
  font-size: 20px;
  width: 300px;
  padding-left: 20px;
}
.company-zhi-name {
  float: right;
  line-height: 60px;
  color: #fff;
}
.el-header {
  background: #5dd5ca;
  overflow: hidden;
  padding-left: 0px;
}
.title {
  font-size: 16px;
  border-left: 4px solid #409EFF;
  padding: 0 10px 0px 10px;
  overflow: hidden;
}
.title-content {
  float: left;
}
.title-right {
  float: right;
}
</style>
<style>
.el-aside {
  height: calc(100vh - 62px);
  background-color: rgb(84, 92, 100) !important;
}

.el-menu-item {
  padding-left: 60px !important;
  min-width: 200px !important;
}
.el-menu-item-group__title {
  padding: 0 0 0 20px;
}
.el-submenu {
  width: 200px;
}

.el-aside {
    height: calc(100vh - 62px);
  }
  
  .el-main {
    background-color: #fff;
    height: calc(100vh - 62px);
    padding: 0px;
    overflow: auto;
  }
</style>

