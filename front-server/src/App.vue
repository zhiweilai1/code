<template>
  <div id="app">
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
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
    
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      layMenu: []
    }
  },
  created() {
    this.getMenuList()
    let menuList = setInterval(() => {
      this.getMenuList()
      if (window.sessionStorage.getItem('userMsg')) {
        clearInterval(menuList)
      }
    }, 1000)
  },
  methods: {
    getMenuList: function() {
      let userName = window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')) || undefined
      if (!userName) {
        this.layMenu = [{
          name: '登录',
          icon: 'el-icon-menu',
        }]
        this.$router.push({
          path: '/login'
        })
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
  height: 100vh;
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
    height: 100vh;
  }
  
  .el-main {
    background-color: #fff;
    height: 100vh;
    padding: 0px;
  }
</style>

