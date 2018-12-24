<template>
  <div class="AdofficSet">
    <div style="margin-bottom: 10px">
      <el-button type="default" size="mini" icon="el-icon-back" @click="() => {this.$router.back(-1)}">返回</el-button>
    </div>
    <div class="AdOfficList" v-loading="offloading">
      <div style="margin-bottom: 20px;">
        <el-button type="primary" @click="addOfficButton()">添加职位</el-button>
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
            {{scope.row.isExer == '0' ? '实习' : '全职'}}
          </template>
        </el-table-column>
        <el-table-column
          label="职位详情">
          <template slot-scope="scope">
            <span class="offic-person" @click="handleOffic(scope.$index, scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column
          label="投递人数">
          <template slot-scope="scope">
            <span class="offic-person" @click="handleOfficPerson(scope.$index, scope.row)">{{scope.row.person}}</span>
          </template>
        </el-table-column>
         <el-table-column
        label="职位置顶">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isTop"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="isTopOffic($event, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
        label="职位推荐">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isHot"
              :on-value="1"
              :off-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="isHotOffic($event, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editorOffic(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteOffic(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog
        title="职位详情"
        :visible.sync="dialogVisible"
        width="60%"
        top="3vh"
        :close-on-click-modal="false"
      >
        <div class="offic-main">
        <div class="offic-main-title">
          <!-- 名称及位置 -->
          <div class="company-off-card-title">
            <div class="company-off-card-title-left">{{dialogItem.offName}}</div>
            <div class="company-off-card-title-right">{{dialogItem.money}}</div>
          </div>
          <div class="company-off-card-place">
            {{dialogItem.isExer == '0' ? '实习' : '全职'}}&nbsp;|&nbsp;{{dialogItem.offPlace}}&nbsp;|&nbsp;{{dialogItem.offExperience}}&nbsp;|&nbsp;{{dialogItem.offEducation}}
          </div>
          <div>
            <div style="display: inline-block; color: #888">职位福利:</div>
            <div style="display: inline-block">
              <span class="company-welfare" v-for="item in dialogItem.company.welfareArr.split(';')" :key="item">
                <mt-badge size="normal">{{item}}</mt-badge>
              </span>
            </div>
          </div>
        </div>
        <div class="offic-main-title">
          <!-- 公司信息 -->
          <div class="offic-main-company">

            <div class="off-main-company-title">
              <div class="ellipsis-1 normal-title">
                {{dialogItem.company.companyName}}
             </div>
              <div class="ellipsis-1 litle-title">
                {{dialogItem.company.companyDet}}&nbsp;|&nbsp;{{dialogItem.company.companyType}}&nbsp;|&nbsp;{{dialogItem.company.companyPer}}
              </div>
            </div>

          </div>
          <div class="offic-main-company-place litle-title">
            {{dialogItem.company.companyPlace}}
          </div>
        </div>
        <div class="offic-main-title">
          <!-- 职位信息 -->
          <div class="zhi-title">
            职位描述
          </div>
          <div class="offic-zhize">
            <div class="litle-title">岗位职责:</div>
            <p class="litle-title zhi-content" v-for="(item, index) in dialogItem.offResponsibilities.split(';')" :key="index">
              {{index + 1}}、{{item}}
            </p>
          </div>
          <div class="offic-yaoqiu">
            <div class="litle-title">任职要求:</div>
            <p class="litle-title zhi-content" v-for="(item, index) in dialogItem.offRequirements.split(';')" :key="index">
              {{index + 1}}、{{item}}
            </p>
          </div>
        </div>
      </div>
      </el-dialog>

      <el-dialog
        title="职位详情"
        :visible.sync="addOfficVisible"
        width="40%"
        :close-on-click-modal="false"
        >
        <div>
          <el-form ref="form" :model="addForm" label-width="80px">
            <el-form-item label="职位名称">
              <el-input v-model="addForm.offName"></el-input>
            </el-form-item>
            <el-form-item label="职位薪资">
              <el-input v-model="addForm.offMoney"></el-input>
            </el-form-item>
            <el-form-item label="职位类型">
              <el-select v-model="addForm.offType" placeholder="职位类型">
                <el-option v-for="(item, index) in offType" :key="index" :label="item.typeName" :value="item.typeName"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="工作经验">
              <el-select v-model="addForm.offExperience" placeholder="请选择工作经验">
                <el-option label="半年内" value="半年内"></el-option>
                <el-option label="一年内" value="一年内"></el-option>
                <el-option label="一到三年" value="一到三年"></el-option>
                <el-option label="三到五年" value="三到五年"></el-option>
                <el-option label="五年以上" value="五年以上"></el-option>
                <el-option label="不限" value="不限"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历">
              <el-select v-model="addForm.offEducation" placeholder="请选择学历">
                <el-option label="初中及以上" value="初中及以上"></el-option>
                <el-option label="高中及以上" value="高中及以上"></el-option>
                <el-option label="大专及以上" value="大专及以上"></el-option>
                <el-option label="本科及以上" value="本科及以上"></el-option>
                <el-option label="硕士及以上" value="硕士及以上"></el-option>
                <el-option label="博士及以上" value="博士及以上"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位地点">
              <el-input v-model="addForm.offPlace"></el-input>
            </el-form-item>
            <el-form-item label="岗位职责">
              <el-input type="textarea" v-model="addForm.offResponsibilities" placeholder="多条内容请以英文类型的;分隔"></el-input>
            </el-form-item>
            <el-form-item label="任职要求">
              <el-input type="textarea" v-model="addForm.offRequirements" placeholder="多条内容请以英文类型的;分隔"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addOfficVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOfficOk()">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>
<script>
export default {
  name: 'AdofficSet',
  data() {
    return {
      companyId: '',
      height: 300,
      offloading: false,
      officListData: [],
      dialogVisible: false,
      dialogItem: {
        company:{
          companyName:"",
          welfareArr: "",
        },
        offResponsibilities:"",
        offRequirements:"",
      },
      addOfficVisible: false,
      offType: [],

      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          resource: '',
          desc: ''
        },
      addForm: {
        id: '',
        offName: '',
        offMoney: '',
        offExperience: '',
        offEducation: '',
        offPlace: '',
        offResponsibilities: '',
        offRequirements: '',
        add: true
      }
    }
  },
  created() {
    if (window.sessionStorage.getItem('adSetOffic')) {
      this.companyId = window.sessionStorage.getItem('adSetOffic')
      this.officList()
      this.getOffType()
    } else {
      this.$router.back(-1)
    }
  },
  methods: {
    isTopOffic: function(index, row) {
      this.axios({
        method: 'post',
        url: '/api/back/upDateCompanyOffic',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          isTop: index,
          officeId: row.officeId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.officList()
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.$message.error('请求失败，请重试')
      })
    },
    isHotOffic: function (index, row) {
      this.axios({
        method: 'post',
        url: '/api/back/upDateCompanyOffic',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          isHot: index ? '1' : '0',
          officeId: row.officeId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.officList()
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.$message.error('请求失败，请重试')
      })
    },
    officList: function() {
      this.offloading = true
      this.axios({
        method: 'post',
        url: '/api/back/getOfficList',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:{
          companyId: this.companyId
        }
      }).then((res) => {
        this.offloading = false
        if (res.data.code == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].isHot = res.data.data[i].isHot == '1' ? true : false
          }
          this.officListData = res.data.data
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.offloading = false
        this.$message.error('请求失败，请重试')
      })
    },
    getOffType: function () {
      this.axios({
        method: 'post',
        url: '/api/getOfficType',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.offType = res.data.data
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.$message.error('请求失败，请重试')
      })
    },
    deleteOffic: function (index, row) {
      this.axios({
        method: 'post',
        url: '/api/back/deleteOfficByCompanyId',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          officeId: row.officeId
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.officList()
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.$message.error('请求失败，请重试')
      })
    },
    addOfficButton: function () {
       this.addOfficVisible = true
       this.addForm = {
        companyId: this.companyId,
        offName: '',
        offMoney: '',
        offExperience: '',
        offEducation: '',
        offPlace: '',
        offResponsibilities: '',
        offRequirements: '',
        add: true
       }
    },
    handleOffic: function(index, row) {
      this.dialogVisible = true
      this.dialogItem = row
    },
    handleOfficPerson: function(index, row) {
      window.sessionStorage.setItem('adOffic', row.officeId)
      this.$router.push({
        path: '/officResume'
      })
    },
    addOfficOk: function () {
      if (this.addForm.add) {
        this.axios({
          method: 'post',
          url: '/api/back/addCompanyOffic',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            offName: this.addForm.offName,
            offMoney: this.addForm.offMoney,
            offPlace: this.addForm.offPlace,
            offExperience: this.addForm.offExperience,
            offEducation: this.addForm.offEducation,
            offResponsibilities: this.addForm.offResponsibilities,
            offType: this.addForm.offType,
            offRequirements: this.addForm.offRequirements,
            companyId: this.companyId,
            isHot: ''
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.officList()
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.$message.error('请求失败，请重试')
        })
      } else {
        this.axios({
          method: 'post',
          url: '/api/back/upDateCompanyOffic',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            offName: this.addForm.offName,
            offMoney: this.addForm.offMoney,
            offPlace: this.addForm.offPlace,
            offExperience: this.addForm.offExperience,
            offEducation: this.addForm.offEducation,
            offResponsibilities: this.addForm.offResponsibilities,
            offType: this.addForm.offType,
            offRequirements: this.addForm.offRequirements,
            officeId: this.addForm.officeId
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.officList()
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.$message.error('请求失败，请重试')
        })
      }


      this.addOfficVisible = false
    },
    editorOffic: function (index, row) {
      this.addForm = row
      this.addForm.add = false
      this.addOfficVisible = true
    },
  }
}
</script>
<style>
.AdofficSet {
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

