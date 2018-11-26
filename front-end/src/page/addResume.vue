<template>
    <div class="addResume">
        <div class="form-box">
            <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
            <mt-radio
                title="性别"
                v-model="sex"
                :options="['男', '女']">
            </mt-radio>
            <mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="number"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
            <mt-field label="邮箱" placeholder="请输入手机号" type="email" v-model="email"></mt-field>
            <mt-radio
                title="求职状态"
                v-model="status"
                :options="['未实习-随时到岗', '实习中-考虑机会', '正式工作-考虑机会']">
            </mt-radio>
        </div>
        <div class="offic-push" @click="pushbaseInfo()">
            <div class="off-box off-push">
                立即保存
            </div>
        </div>
    </div>
</template>
<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui';
export default {
    name: 'AddResume',
    data() {
        return {
            username: '',
            number: '',
            sex: '男',
            status: '未实习-随时到岗',
            phone: '',
            email: ''
        }
    },
    created() {
        let baseMsg = window.sessionStorage.getItem('modify') || undefined
        let self = this
        if (baseMsg) {
            service.get('/api/getBaseMessage', {}, {
                username: baseMsg
            }).then((res) => {
                self.username = res.data.baseMsg.username
                self.number = res.data.baseMsg.number
                self.sex = res.data.baseMsg.sex
                self.status = res.data.baseMsg.status
                self.phone = res.data.baseMsg.phone
                self.email = res.data.baseMsg.email
                window.sessionStorage.removeItem('modify')
            })
        }
    },
    methods: {
        pushbaseInfo: function() {
            service.post('/api/postBaseMessage', {}, {
                username: this.username,
                number: this.number,
                sex: this.sex,
                status: this.status,
                phone: this.phone,
                email: this.email
            }).then((res) => {
                if (res.data.save) {
                    MessageBox({
                        title: '提示',
                        message: '保存成功，是否添加教育经历？',
                        showCancelButton: true
                    }).then((action) => {
                        console.log(action)
                        if (action == 'cancel') {
                            this.$router.push({
                                path: '/resume'
                            })
                        } else {
                            this.$router.push({
                                path: '/addTechResume'
                            }) 
                        }
                    }) 
                }
            })
        }
    }
}
</script>
<style scoped>
.addResume {
    margin-bottom: 55px;
}

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


