<template>
  <div class="contact-type">
    <div class="contact-box">
      <h3>配置联系人</h3>
      <el-form :inline="true" label-width="100px" class="demo-dynamic">
        <div v-for="(domain, index) in domains" :key="index">
          <el-form-item
          label="联系人"
          :prop="'domains.' + index + '.contractPerson'"  
        >
          <el-input v-model="domain.contractPerson"></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          :prop="'domains.' + index + '.contractPhone'"  
        >
          <el-input v-model="domain.contractPhone"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          :prop="'domains.' + index + '.contractEmail'"  
        >
          <el-input v-model="domain.contractEmail"></el-input>
        </el-form-item>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          <el-button type="primary" @click="submitForm(domain)">提交</el-button>
        </div>
      </el-form>
      <el-button @click="addDomain">添加联系方式</el-button>
    </div>
    <div class="contact-box">
      <h3>配置职位分类</h3>
      <el-form :inline="true" label-width="100px" class="demo-dynamic">
        <div v-for="(officItem, index) in officType" :key="index">
          <el-form-item
          label="职位类型"
          :prop="'domains.' + index + '.typeName'"  
        >
          <el-input v-model="officItem.typeName"></el-input>
        </el-form-item>
        <el-button @click.prevent="removeOffic(officItem)">删除</el-button>
        <el-button type="primary" @click="submitOfficForm(officItem)">提交</el-button>
        </div>
      </el-form>
      <el-button @click="addOffic">添加分类</el-button>
      

    </div>
    

  </div>
</template>
<script>
export default {
  name: 'AdContact',
  data() {
    return {
      domains: [{
        contractPerson: '',
        contractPhone: '',
        contractEmail: '',
        id: ''
      }],
      officType: [{
        typeName: '',
        id: ''
      }]
    }
    
  },
  created() {
    this.getContact()
    this.getOfficType()
  },
  methods: {
    getContact: function () {
      this.axios({
        method: 'post',
        url: '/api/contact',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
      }).then((res) => {
        this.offloading = false
        if (res.data.code == 200) {
          this.domains = res.data.data
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.offloading = false
        this.$message.error('请求失败，请重试')
      })
    },
    getOfficType: function () {
      this.axios({
        method: 'post',
        url: '/api/getOfficType',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
      }).then((res) => {
        this.offloading = false
        if (res.data.code == 200) {
          this.officType = res.data.data
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.offloading = false
        this.$message.error('请求失败，请重试')
      })
    },
    submitForm(domain) {
      this.axios({
        method: 'post',
        url: '/api/back/postContact',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: domain
      }).then((res) => {
        this.offloading = false
        if (res.data.code == 200) {
          this.getContact()
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.offloading = false
        this.$message.error('请求失败，请重试')
      })
    },

    removeDomain(item) {

      if (item.id) {
        this.axios({
          method: 'post',
          url: '/api/back/delContact',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            id: item.id
          }
        }).then((res) => {
          this.offloading = false
          if (res.data.code == 200) {
            this.getContact()
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.offloading = false
          this.$message.error('请求失败，请重试')
        })
      } else {
        var index = this.domains.indexOf(item)
        if (index !== -1) {
          this.domains.splice(index, 1)
        }
      }
      
    },
    addDomain() {
      this.domains.push({
        contractPerson: '',
        contractPhone: '',
        contractEmail: '',
        id: ''
      });
    },
    submitOfficForm(domain) {
      this.axios({
        method: 'post',
        url: '/api/back/addOfficType',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: domain
      }).then((res) => {
        this.offloading = false
        if (res.data.code == 200) {
          this.getOfficType()
        } else {
          this.$message.error('请求失败，请重试')
        }
      }).catch(() => {
        this.offloading = false
        this.$message.error('请求失败，请重试')
      })
    },

    removeOffic(item) {
      if (item.id) {
        this.axios({
          method: 'post',
          url: '/api/back/delOfficType',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            id: item.id
          }
        }).then((res) => {
          this.offloading = false
          if (res.data.code == 200) {
            this.getOfficType()
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.offloading = false
          this.$message.error('请求失败，请重试')
        })
      } else {
        var index = this.officType.indexOf(item)
        if (index !== -1) {
          this.officType.splice(index, 1)
        }
      }
      
    },
    addOffic() {
      this.officType.push({
        typeName: '',
        id: ''
      });
    }
  }
}
</script>
<style>
.contact-type {
  padding: 10px;
}
.contact-box {
  border: 1px solid #999;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>

