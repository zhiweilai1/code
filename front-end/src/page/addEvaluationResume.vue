<template>
    <div class="addEvaluationResume">
        <div v-title>自我评价</div>
        <div style="padding: 5px; padding-left: 10px; font-size: 12px; color: #999">
          添加自我评价给面试官第一印象~
        </div>
        <mt-field label="自我评价" placeholder="填写自我评价" type="textarea" rows="10" v-model="evaluation"></mt-field>
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
export default {
    name: 'addEvaluationResume',
    data() {
        return {
            evaluation: ''
        }
    },
    created() {
      this.userId = window.localStorage.getItem('userMsg') && JSON.parse(window.localStorage.getItem('userMsg')).id || ''
      let myDes = window.sessionStorage.getItem('myDes') && JSON.parse(window.sessionStorage.getItem('myDes')) || undefined
      if (myDes) {
        this.evaluation = myDes.myDes
        window.sessionStorage.removeItem('myDes')
      }
    },
    methods: {
        pushTecInfo: function() {
          this.axios({
            method: 'post',
            url: '/api/makeUserDes',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: {
              userId: this.userId,
              myDes: this.evaluation
            }
          }).then((res) => {
            if (res.data.code == '200' || res.data.code == 200) {
              MessageBox.alert('保存成功').then(action => {
                this.$router.back(-1)
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
</style>
