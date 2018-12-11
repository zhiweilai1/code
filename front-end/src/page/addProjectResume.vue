<template>
    <div class="addWorkResume">
        <div v-title>项目经历</div>
        <div class="tec-msg-form">
            <mt-field label="项目" placeholder="请输入项目名称" v-model="projectName"></mt-field>
            <mt-field label="职位" placeholder="请输入职位名称" v-model="projectPosition"></mt-field>
            <div @click="showTimePicker(0)">
                <mt-field label="开始时间" v-model="workBeginTime" readonly="readonly" placeholder="请选择时间" ></mt-field>
            </div>
            <mt-popup v-model="timeVisible" position="bottom" class="region-popup">
                <mt-picker :slots="myTimeSlots" valueKey="timeName" :visibleItemCount="5" @change="timeChange" :itemHeight="40"></mt-picker>
            </mt-popup>
            <div @click="showTimePicker(1)">
                <mt-field label="结束时间" v-model="workEndTime" readonly="readonly" placeholder="请选择时间" ></mt-field>
            </div>
            <mt-field label="项目描述" placeholder="填写项目描述" type="textarea" rows="4" v-model="projectDesc"></mt-field>
        </div>
        <div class="offic-push" @click="pushTecInfo()">
            <div class="off-box off-push">
                立即保存
            </div>
        </div>
    </div>
</template>

<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui'
import { Popup } from 'mint-ui'
import { Picker } from 'mint-ui'
export default {
    name: 'AddProjectResume',
    data() {
        return {
            projectName: '',
            projectPosition: '',
            projectDesc: '',
            workBeginTime: '',
            workEndTime: '',
            timeVisible: false,
            timeInit: false,
            myTimeSlots: [
                {
                flex: 1,
                values: this.getProvinceArr(), //省份数组
                className: 'slot1',
                textAlign: 'center'
                },
                   //分隔符
                {
                divider: true,
                content: '',
                className: 'slot2'
                },
                  //市
                {
                flex: 1,
                values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                className: 'slot3',
                textAlign: 'center'
                }
            ],
            timeType: 0,
            id: '',
            userId: ''
        }
    },
    created() {
      let projectMsg = window.sessionStorage.getItem('projectIndex') && JSON.parse(window.sessionStorage.getItem('projectIndex')) || undefined
      this.userId = window.sessionStorage.getItem('userMsg') && JSON.parse(window.sessionStorage.getItem('userMsg')).id || ''
      if (projectMsg) {
        this.id = projectMsg.id
        this.userId = projectMsg.userId
        this.projectName = projectMsg.projectName
        this.projectPosition = projectMsg.projectPosition
        this.projectDesc = projectMsg.projectDesc
        this.workBeginTime = projectMsg.beginTime
        this.workEndTime = projectMsg.endTime
        window.sessionStorage.removeItem('projectIndex')
      }

    },
    methods: {
        showTimePicker: function(type) {
            this.timeType = type
            this.timeVisible = true
        },
        timeChange: function(picker, values) {
            if (this.timeInit){
                if (this.timeType == 0) {
                    this.workBeginTime = values[0] + '-' + values[1]
                } else {
                    this.workEndTime = values[0] + '-' + values[1]
                }
                
            }else {
                this.timeInit = true;
            }
        },
        getProvinceArr: function() {
            let myDate = new Date();
            let years = myDate.getFullYear()
            let yearArr = []
            for (let i = 0; i < 30; i++) {
                yearArr.push((years - i))
            }
            return yearArr
        },
        pushTecInfo: function() {
          this.axios({
            method: 'post',
            url: '/api/makeUserProject',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              id: this.id,
              userId: this.userId,
              projectName: this.projectName,
              projectPosition: this.projectPosition,
              projectDesc: this.projectDesc,
              beginTime: this.workBeginTime,
              endTime: this.workEndTime
            }
          }).then((res) => {
            if (res.data.code == '200' || res.data.code == 200) {
              MessageBox({
                title: '提示',
                message: '保存成功，是否添加自我评价？',
                showCancelButton: true
              }).then((action) => {
                if (action == 'cancel') {
                  this.$router.back(-1)
                } else {
                  this.$router.push({
                    path: '/addWorkResume'
                  }) 
                }
              }) 
            }
          })
        },
    }
}
</script>
<style scoped>
.offic-push {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  background-color: #26a2ff;
  text-align: center;
}
.off-box {
  display: inline-block;
}
.off-push {
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: 16px;
  left: calc(50% - 36px);
}
.tec-msg-form {
    margin-bottom: 55px;
}
</style>
<style>
.region-popup{
    width: 100%;
  }
</style>
