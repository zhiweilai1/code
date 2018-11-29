<template>
    <div class="application">
        <div v-title>我的申请</div>
        <div v-if="dataList.length > 0">
            <div v-for="(item, index) in dataList" :key="index" class="jot-applicat-card">
                <div class="jot-applicat-card-left">
                    <div class="ellipsis-1 job-title big-title">
                        {{item.offName}}
                    </div>
                    <div class="ellipsis-1 litle-title">
                        {{item.money}}&nbsp;|&nbsp;{{item.place}}
                    </div>
                    <div class="ellipsis-1 litle-title">
                        {{item.companyName}}
                    </div>
                </div>
                <div class="jot-applicat-card-right">
                    <div style="margin-bottom: 10px;">
                        <mt-badge size="small" type="success">投递成功</mt-badge>
                    </div>
                    <div style="margin-bottom: 10px;" @click="jumpToJob(item.id)">
                        <mt-badge size="small" type="primary" >职位详情</mt-badge>
                    </div>
                    <div style="margin-bottom: 10px;" @click="evaluation(item.id)">
                        <mt-badge size="small" type="success"  color="#f38031">面试评价</mt-badge>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="no-msg">
            <img src="../../static/no-msg.png" alt="">
        </div>
    </div>
</template>
<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui'
export default {
    name: 'Application',
    data() {
        return {
            dataList: []
        }
    },
    created() {
        let userMsg = JSON.parse(window.sessionStorage.getItem('userMsg'))
        service.get('/api/getApplicationList', {}, {
            username: userMsg.userName
        }).then((res) => {
            if (res.data.length > 0) {
                this.dataList = res.data
            }  
        })
    },
    methods: {
        jumpToJob: function(index) {
            alert('sdfa')
            window.sessionStorage.setItem('office', index)
            this.$router.push({
                path: '/office'
            })
        },
        evaluation: function(index) {
            MessageBox.prompt('请输入面试评价').then(({ value, action }) => {
                if (value && action == 'confirm') {
                    service.post('/api/posteEvaluation', {}, {
                        id: index,
                        value: value
                    }).then((res) => {
                        if (res.data.isSave) {
                            MessageBox('提示', '评价成功')
                        } else {
                            MessageBox('提示', '评价失败')
                        }
                    }).catch(() => {
                        MessageBox('提示', '评价失败')
                    })
                } else {
                    MessageBox('提示', '评价失败')
                }
            })
        }
    }
}
</script>
<style scoped>
.no-msg {
  height: 100vh;
  text-align: center;
  padding-top: 1px;
  background-color: #fff;
}
.no-msg img{
  width: 50%;
  margin-top: 40%;
}
.jot-applicat-card {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    overflow: hidden;
}
.jot-applicat-card-left {
    float: left;
    width: 70%；
}
.jot-applicat-card-right {
    float: right;
    height: 30%;
}
.job-title {
    margin-bottom: 10px;
}
</style>
