<template>
  <div class="AdStudent">
    
  </div>
</template>
<script>
export default {
  name: 'AdStudent',
  data() {
    return {
      height: 300,
      adStudentId: ''
    }
  },
  created() {
    this.height = window.innerHeight - 80
    let adStudentId = window.sessionStorage.getItem('adcompanyId')
    this.adStudentId = adStudentId
    let userName = JSON.parse(window.sessionStorage.getItem('userMsg'))
    // if (!userName) {
    //     this.$router.push({
    //         path: '/login'
    //     })
    // } else if (userName.type == 'company') {
    //     this.$router.push({
    //         path: '/'
    //     })
    // } else {
    this.studentList()
    // }
  },
  methods: {
    resumeList: function() {}
  }
}
</script>

<style>
.AdStudent {
  padding: 10px;
}
</style>

