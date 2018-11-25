<template>
    <div class="resume">
        我的简历
    </div>
</template>

<script>
import service from 'service-api'
import { MessageBox } from 'mint-ui';
export default {
  name: "Resume",
  data() {
    return {}
  },
  created() {
    let userMsg = JSON.parse(window.sessionStorage.getItem('userMsg'))
    let self = this
    service.get('/api/getResume', {}, {
        username: userMsg.userName
    }).then((res) => {
        console.log(res)
        if (Object.keys(res.data)) {
            MessageBox({
                title: '提示',
                message: '您还未有简历，是否去创建?',
                showCancelButton: true
            }).then((action) => {
                console.log(action)
                if (action == 'cancel') {
                    this.$router.push({
                        path: '/person'
                    })
                } else {
                    
                }
            })
        }
    })
  }
}
</script>
