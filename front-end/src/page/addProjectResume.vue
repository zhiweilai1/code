<template>
    <div class="addWorkResume">
        <div v-title>项目经历</div>
        <div class="tec-msg-form">
            <mt-field label="项目" placeholder="请输入项目名称" v-model="company"></mt-field>
            <mt-field label="职位" placeholder="请输入职位名称" v-model="position"></mt-field>
            <div @click="showTimePicker(0)">
                <mt-field label="开始时间" v-model="workBeginTime" readonly="readonly" placeholder="请选择时间" ></mt-field>
            </div>
            <mt-popup v-model="timeVisible" position="bottom" class="region-popup">
                <mt-picker :slots="myTimeSlots" valueKey="timeName" :visibleItemCount="5" @change="timeChange" :itemHeight="40"></mt-picker>
            </mt-popup>
            <div @click="showTimePicker(1)">
                <mt-field label="结束时间" v-model="workEndTime" readonly="readonly" placeholder="请选择时间" ></mt-field>
            </div>
            <mt-field label="项目描述" placeholder="填写项目描述" type="textarea" rows="4" v-model="duties"></mt-field>
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
            userMsg: {},
            company: '',
            position: '',
            duties: '',
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
            timeType: 0
        }
    },
    created() {
        let userMsg = JSON.parse(window.sessionStorage.getItem('userMsg'))
        let self = this
        this.userMsg = userMsg
        let index = window.sessionStorage.getItem('projectIndex')
        if (index) { 
            service.get('/api/getResume', {}, {
                username: userMsg.userName
            }).then((res) => {
                let data = res.data.projectMsg[Number(index)]
                this.company = data.projectName
                this.position = data.projectPosition
                this.duties = data.projectDesc
                this.workBeginTime = data.begin
                this.workEndTime = data.end
                window.sessionStorage.removeItem('projectIndex')
            })
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
            service.post('/api/postProjectMessage', {}, {
                userId: this.userMsg.userId,
                projectName: this.company,
                projectPosition: this.position,
                projectDesc: this.duties,
                begin: this.workBeginTime,
                end: this.workEndTime
            }).then((res) => {
                if (res.data.save) {
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
