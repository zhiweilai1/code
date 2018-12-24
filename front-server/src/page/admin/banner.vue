<template>
  <div class="banner">
    <el-input
      class="input-url"
      placeholder="请输入轮播图对应的链接，此处选填"
      v-model="bannerUrl"
      clearable>
    </el-input>
    <el-upload
      class="upload-demo"
      action=""
      :before-upload="handleFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'Banner',
  data() {
    return {
        fileList: [],
        bannerUrl: '',
        fileName: ''
      }
  },
  created() {
    this.imgList()
  },
  methods: {
      handleRemove: function(file, fileList) {
        console.log(file, fileList);
        this.axios({
          method: 'post',
          url: '/api/back/delBanner',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            id: file.id
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.imgList()
          } else {
            this.$message.error('删除失败，请重试')
          }
        }).catch(() => {
          this.$message.error('删除失败，请重试')
        })
      },
      handlePreview: function(file) {
        console.log(file)
      },
      handleFile: function(file) {
        this.fileName = file.name
        let reader = new FileReader()
        reader.onload = () => {
          let _base64 = reader.result
          this.updateImg(_base64)
        }

        reader.readAsDataURL(file)
      },
      updateImg: function(base) {
        this.axios({
          method: 'post',
          url: '/api/back/upload',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: {
            baseString: base.split('base64,')[1],
            fileName: this.fileName
          }
        }).then((res) => {
          if (res.data.code == 200) {
            this.axios({
              method: 'post',
              url: '/api/back/putBanner',
              headers: {
                'Content-type': 'application/json;charset=UTF-8'
              },
              data: {
                bannerImage: res.data.data,
                bannerUrl: this.bannerUrl
              }
            }).then((res) => {
              if (res.data.code == 200) {
                this.imgList()
              }else {
                this.$message.error('上传失败，请重试')
              }
            }).catch(() => {
              this.$message.error('上传失败，请重试')
            })

          } else {
            this.$message.error('上传失败，请重试')
          }
        }).catch(() => {
          this.$message.error('上传失败，请重试')
        })
      },
      imgList: function() {
        this.axios({
          method: 'post',
          url: '/api/getBanner',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          }
        }).then((res) => {
          if (res.data.code == 200) {
            let arr = []
            for (let i = 0; i < res.data.data.length; i++) {
              arr.push({
                name: res.data.data[i].bannerUrl,
                url: res.data.data[i].bannerImage,
                id: res.data.data[i].id
              })
            }
            this.fileList = arr
          } else {
            this.$message.error('请求失败，请重试')
          }
        }).catch(() => {
          this.$message.error('请求失败，请重试')
        })
      }
    }
}
</script>
<style>
.banner {
  padding: 10px;
}
.input-url {
  margin-bottom: 20px;
}
</style>

