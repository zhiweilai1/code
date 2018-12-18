<template>
    <div class="addWorkResume">
        <div v-title>工作经历</div>
        <div class="tec-msg-form">
            <mt-field label="公司" placeholder="请输入公司名称" v-model="companyName"></mt-field>
            <mt-field label="职位" placeholder="请输入职位名称" v-model="userPosition"></mt-field>
            <div @click="showTimePicker(0)">
                <mt-field label="开始时间" v-model="workBeginTime" readonly="readonly" placeholder="请选择时间" ></mt-field>
            </div>
            <mt-popup v-model="timeVisible" position="bottom" class="region-popup">
                <mt-picker :slots="myTimeSlots" valueKey="timeName" :visibleItemCount="5" @change="timeChange" :itemHeight="40"></mt-picker>
            </mt-popup>
            <div @click="showTimePicker(1)">
                <mt-field label="结束时间" v-model="workEndTime" readonly="readonly" placeholder="请选择时间" ></mt-field>
            </div>
            <mt-field label="工作内容" placeholder="填写工作内容" type="textarea" rows="4" v-model="userDuties"></mt-field>
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
    name: 'AddWorkResume',
    data() {
        return {
            companyName: '',
            userPosition: '',
            userDuties: '',
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
      this.userId = window.localStorage.getItem('userMsg') && JSON.parse(window.localStorage.getItem('userMsg')).id || ''
      
      let workMsg = window.sessionStorage.getItem('workIndex') && JSON.parse(window.sessionStorage.getItem('workIndex')) || undefined
      
      if (workMsg) {
        this.id = workMsg.id
        this.userId = workMsg.userId
        this.companyName = workMsg.companyName
        this.userPosition = workMsg.userPosition
        this.userDuties = workMsg.userDuties
        this.workBeginTime = workMsg.beginTime
        this.workEndTime = workMsg.endTime
        window.sessionStorage.removeItem('workMsg')
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
            url: '/api/makeUserCompany',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              id: this.id,
              userId: this.userId,
              companyName: this.companyName,
              userDuties: this.userDuties,
              userPosition: this.userPosition,
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
                    path: '/addEvaluationResume'
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
