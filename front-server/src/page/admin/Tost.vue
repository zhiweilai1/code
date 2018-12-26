<template>
  <div class="Tost">
    <div>
      <el-button type="default" style="margin-bottom: 10px;" size="mini" icon="el-icon-back" @click="() => {this.$router.back(-1)}">返回</el-button>
      <span style="display: inline-block; margin-left: 10px;">
        关联学生列表
      </span>
    </div>
    <el-table
    :data="rowChildren"
    border
    :height="height"
    style="width: 100%">
    <el-table-column
      prop="index"
      label="序号"
    >
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user_sex"
      label="性别">
    </el-table-column>
    <el-table-column
      prop="user_age"
      label="年龄">
    </el-table-column>
    <el-table-column
      prop="tel_phone"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="user_school"
      label="学校">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
    @current-change="changePage"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Tost',
  data() {
    return {
      user: {},
      rowChildren: [],
      total: 400,
      height: 300
    }
  },
  created() {
    this.height = window.innerHeight - 170
    let user = window.sessionStorage.getItem('t2s') && JSON.parse(window.sessionStorage.getItem('t2s'))
    if (user) {
      this.user = user
      this.getList(1)
    }
  },
  methods: {
    changePage: function(currentPage) {
      this.getList(currentPage)
    },
    getList: function (page) {
      this.axios({
          method: 'post',
          url: '/api/back/getTecContactStu',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            userId: this.user.id,
            page: page
          }
        }).then((res) => {
          this.resumeloading = false
          if (res.data.code == 200) {
            this.total = res.data.data.total
            if (res.data.data.res.length > 0) {
              for (let i = 0; i < res.data.data.res.length; i++) {
                res.data.data.res[i].index = i + 1 + (page - 1) * 10
              }
              this.rowChildren = res.data.data.res
            } else {
              this.rowChildren = []
              this.$message('该老师未有学生关联')
            }
            
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.resumeloading = false
          this.$message.error('请求失败，请重试')
        })
    }
  }
}
</script>
<style>
.Tost {
  padding: 10px;
}
</style>
