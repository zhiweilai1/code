<template>
  <div class="AdOfficList" v-loading="offloading">
    <div>
      <el-button type="default" size="mini" icon="el-icon-back" @click="() => {this.$router.back(-1)}">返回</el-button>
    </div>
    <el-table
      :data="officListData"
      :height="height"
      border
      style="width: 100%">
      <el-table-column
        prop="officeId"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="offName"
        label="职位名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="place"
        label="职位类型">
        <template slot-scope="scope">
          {{scope.row.isExer ? '实习' : '全职'}}
        </template>
      </el-table-column>
      <el-table-column
        label="职位详情">
        <template slot-scope="scope">
          <span class="offic-person" @click="handleOffic(scope.$index, scope.row)">详情</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isShow"
        label="投递人数">
        <template slot-scope="scope">
          <span class="offic-person" @click="handleOfficPerson(scope.$index, scope.row)">{{scope.row.person}}</span>
        </template>
      </el-table-column>
      
    </el-table>

    <el-dialog
      title="职位详情"
      :visible.sync="dialogVisible"
      width="60%"
      top="3vh"
      :before-close="handleClose">
      <div class="offic-main">
      <div class="offic-main-title">
        <!-- 名称及位置 -->
        <div class="company-off-card-title">
          <div class="company-off-card-title-left">{{dialogItem.offName}}</div>
          <div class="company-off-card-title-right">{{dialogItem.offMoney}}</div>
        </div>
        <div class="company-off-card-place">
          {{dialogItem.isExer ? '实习' : '全职'}}&nbsp;|&nbsp;{{dialogItem.offPlace}}&nbsp;|&nbsp;{{dialogItem.offExperience}}&nbsp;|&nbsp;{{dialogItem.offEducation}}
        </div>
        <div>
          <div style="display: inline-block; color: #888">职位福利:</div>
          <div style="display: inline-block">
            <span class="company-welfare" v-for="item in dialogItem.welfareArr" :key="item">
              <mt-badge size="normal">{{item}}</mt-badge>
            </span>
          </div>
        </div>
      </div>
      <div class="offic-main-title">
        <!-- 公司信息 -->
        <div class="offic-main-company" >
          
          <div class="off-main-company-title">
            <div class="ellipsis-1 normal-title">
              {{dialogItem.companyName}}
            </div>
            <div class="ellipsis-1 litle-title">
              {{dialogItem.companyDet}}&nbsp;|&nbsp;{{dialogItem.companyType}}&nbsp;|&nbsp;{{dialogItem.companyPer}}
            </div>
          </div>
          
        </div>
        <div class="offic-main-company-place litle-title">
          {{dialogItem.companyPlace}}
        </div>
      </div>
      <div class="offic-main-title">
        <!-- 职位信息 -->
        <div class="zhi-title">
          职位描述
        </div>
        <div class="offic-zhize">
          <div class="litle-title">岗位职责:</div>
          <p class="litle-title zhi-content" v-for="(item, index) in dialogItem.offResponsibilities" :key="index">
            {{index + 1}}、{{item}}
          </p>
        </div>
        <div class="offic-yaoqiu">
          <div class="litle-title">任职要求:</div>
          <p class="litle-title zhi-content" v-for="(item, index) in dialogItem.offRequirements" :key="index">
            {{index + 1}}、{{item}}
          </p>
        </div>
      </div>
    </div>
    </el-dialog>

  </div>
</template>
<script>
import service from 'service-api'
export default {
  name: 'AdOfficList',
  data() {
    return {
      height: 300,
      adComId: '',
      offloading: false,
      officListData: [],
      dialogVisible: false,
      dialogItem: {}
    }
  },
  created() {
    

    this.height = window.innerHeight - 30
    let adComId = window.sessionStorage.getItem('adcompanyId')
    this.adComId = adComId
    let userName = window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')) || undefined
    if (!userName) {
      this.$router.push({
        path: '/login'
      })
    } else if (userName.isIdentity == '1') {
      this.$router.push({
        path: '/'
      })
    } else {
      this.officList()
    }
  },
  methods: {
    officList: function() {
      this.offloading = true

      this.axios({
        method: 'post',
        url: '/api/back/getOfficList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          companyId: this.adComId
        }
      }).then((res) => {
        this.offloading = false
        if (res.data.code == 200) {
          this.officListData = res.data.data
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.offloading = false
        this.$message.error('请求失败，请重试')
      })
    },
    handleOffic: function(index, row) {
      this.dialogVisible = true
      row.welfareArr = row.welfareArr.split(',')
      row.offResponsibilities = row.offResponsibilities.split(',')
      row.offRequirements = row.offRequirements.split(',')
      this.dialogItem = row
      row.welfareArr = row.welfareArr.split(',')
    },
    handleOfficPerson: function(index, row) {
      window.sessionStorage.setItem('adOffic', row.officeId)
      this.$router.push({
        path: '/officResume'
      })
    }
  }
}
</script>
<style>
.AdOfficList {
  padding: 10px;
}

.offic-person {
  cursor: pointer;
  color: #409EFF;
}

.offic-main-title {
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(215, 215, 215, 1);
  margin-bottom: 10px;
  overflow: hidden;
}
.company-off-card-title {
  overflow: hidden;
  padding-bottom: 5px;
}
.company-off-card-title-left {
  float: left;
  font-size: 18px;
  max-width: 70%;
  line-height: 1.4;
  font-weight: 500;
}
.company-off-card-title-right {
  float: right;
  max-width: 30%;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
  font-size: 18px;
  color: #26a2ff
}

.company-off-card-place {
  font-size: 14px;
  color: #888;
  padding-top: 10px;
}

.company-welfare {
  display: inline-block;
  margin: 3px;
}
.off-main-company-img, .off-main-company-title {
  float: left;
}

.off-main-company-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.company-img {
  border: 1px solid #e7e8ed;
  border-radius: 10px;
}
.off-main-company-title {
  width: calc(92% - 60px);
  padding-top: 5px;
}

.offic-main-company {
  position: relative;
  height: 50px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(197, 196, 196);
}

.offic-main-turn {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0px;
  top: 10px;
}

.offic-main-company-place {
  padding-top: 10px;
}

.zhi-title {
  color: #333;
  font-size: 17px;
  margin-bottom: 5px;
  border-left: 4px solid #26a2ff;
  padding-left: 12px;
  box-sizing: border-box;
}

.zhi-content {
  margin: 0;
  padding: 0;
  line-height: 1.8rem;
}

.offic-zhize {
  margin-bottom: 20px;
}
</style>

