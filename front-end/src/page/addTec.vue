<template>
    <div class="addTec">
        <div v-title>教育经历</div>
        <div style="padding: 5px; padding-left: 10px; font-size: 12px; color: #999">
          详细的教育经历能为简历加分哦~
        </div>
        <div class="tec-msg-form">
            <mt-field label="学校" placeholder="请输入校名" v-model="userSchool"></mt-field>
            <div @click="showAddressPicker()">
                <mt-field label="学历" v-model="schoolLevel" readonly="readonly" placeholder="请选择学历" ></mt-field>
            </div>
            <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
                <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker>
            </mt-popup>
            <mt-field label="专业" v-model="userProfession" placeholder="请输入专业"></mt-field>
            <div @click="showTimePicker()">
                <mt-field label="时间段" v-model="schoolTime" readonly="readonly" placeholder="请选择时间段" ></mt-field>
            </div>
            <mt-popup v-model="timeVisible" position="bottom" class="region-popup">
                <mt-picker :slots="myTimeSlots" valueKey="timeName" :visibleItemCount="5" @change="timeChange" :itemHeight="40"></mt-picker>
            </mt-popup>
            <mt-field label="在校经历" placeholder="在校经历" type="textarea" rows="4" v-model="schoolDes"></mt-field>
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
    name: 'AddTec',
    data() {
        return {
            userSchool: '',
            schoolLevel: '',
            userProfession: '',
            regionVisible: false,
            myAddressSlots: [
                {
                    flex: 1,
                    values: [{
                        name: '初中及以下'
                    },{
                        name: '中专/中技'
                    },{
                        name: '高中'
                    },{
                        name: '大专'
                    },{
                        name: '本科'
                    },{
                        name: '硕士'
                    },{
                        name: '博士'
                    }],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            regionInit:false,
            schoolTime: '',
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
                values: this.getCityArr(2018),
                className: 'slot3',
                textAlign: 'center'
                }
            ],
            schoolDes: '',
            id: '',
            userId: ''
        }
    },
    created() {
      let tecMsg = window.sessionStorage.getItem('tecIndex') && JSON.parse(window.sessionStorage.getItem('tecIndex')) || undefined
      this.userId = window.localStorage.getItem('userMsg') && JSON.parse(window.localStorage.getItem('userMsg')).id || ''
      if (tecMsg) {
        this.id = tecMsg.id
        this.userId = tecMsg.userId
        this.userSchool = tecMsg.userSchool
        this.schoolLevel = tecMsg.schoolLevel
        this.userProfession = tecMsg.userProfession
        this.schoolDes = tecMsg.schoolDes
        this.schoolTime = tecMsg.beginTime + ' -' + tecMsg.endTime
        window.sessionStorage.removeItem('tecIndex')
      }
    },
    methods: {
        showAddressPicker: function() {
            this.regionVisible = true;
        },
        pushTecInfo: function() {

          this.axios({
            method: 'post',
            url: '/api/makeUserTec',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              id: this.id,
              userId: this.userId,
              userSchool: this.userSchool,
              schoolLevel: this.schoolLevel,
              userProfession: this.userProfession,
              schoolDes: this.schoolDes,
              beginTime: this.schoolTime.split(' - ')[0],
              endTime: this.schoolTime.split(' - ')[1]
            }
          }).then((res) => {
            if (res.data.code == '200' || res.data.code == 200) {
              MessageBox.alert('保存成功').then(action => {
                this.$router.back(-1)
              })
            } else {
              MessageBox.alert(res.data.msg)
            }
          }).catch((res) => {
            MessageBox.alert(res.data.msg)
          })
        },
        addressChange(picker, values){
            if (this.regionInit){
                this.schoolLevel = values[0]["name"]
            }else {
                this.regionInit = true;
            }
        },
        showTimePicker: function() {
            this.timeVisible = true
        },
        timeChange: function(picker, values) {
            if (this.timeInit){
                this.schoolTime = values[0] + '-6 - ' + values[1] + '-9'
                picker.setSlotValues(1, this.getCityArr(values[0]));
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
        getCityArr: function(value) {
            let endYear = []
            for (let i = 0; i < 20; i++) {
                endYear.push((value + i))
            }
            return endYear
        }
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
</style>

<style>
.addTec {
  padding-top: 20px;
}
.region-popup{
    width: 100%;
  }
</style>

