<template>
  <div class="hire">
    <div v-title>岗位信息</div>
    <div class="hire-search">
      <div class="mint-searchbar">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input
        ref="input"
        @input="searchHire"
        @keyup.enter="searchHire"
        @click="searchRecordShow"
        type="search"
        v-model="currentValue"
        placeholder="搜索职位/公司"
        class="mint-searchbar-core">
      </div>
    </div>
    </div>
    <div class="hire-type">
      <div class="hire-type-content" @click="showHireType()">
        {{hireType}}
      </div>
      <drop-list :config="configData" ref="droplist"></drop-list>
    </div>
    <div class="hire-list" v-if="haveOff">
      <div class="hire-detail" v-for="(item, index) in showList" :key="index" @click="jumpToDetail(item.id)">
        <div class="hire-detail-left">
          <img :src="item.companyImg" alt="">
        </div>
        <div class="hire-detail-right">
          <div class="company-off-card-title">
             <div class="company-off-card-title-left ellipsis-1">{{item.offName}}</div>
             <div class="company-off-card-title-right">{{item.money}}</div>
          </div>
          <div class="litle-title hire-company ellipsis-1">
            {{item.companyName}}
          </div>
          <div class="litle-title ellipsis-1">
            {{item.pushTime}}&nbsp;{{item.place}}&nbsp;{{item.type}}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-msg">
      <img src="../../static/no-msg.png" alt="">
    </div>
    <tabbar tarname="hire" :iconarr="iconArr"></tabbar>
  </div>
</template>
<script>
import tabbar from '../components/tabbar'
import DropList from 'vue-droplist'
import service from 'service-api'
export default {
  name: 'hire',
  data () {
    return {
      iconArr: ['../../static/home-normal.png', '../../static/hire-check.png', '../../static/personal-normal .png'],
      currentValue: '',
      haveOff: true, 
      hireType: '全部职位',
      allList: [],
      showList: [],
      configData : {
        position: {  // 设置显示位置，position
          top: '52px', 
          right: '0'
        },
        width: '40%', // 设置宽度
        list: [ // 设置下拉列表数据和对应的点击事件
          {text: '全部职位', action: this.quanzhi},
          {text: '高级技工', action: this.gaogong},
          {text: '普通技工', action: this.pugogn},
          {text: 'UI设计师', action: this.uishi}
        ]
      }
    }
  },

  created() {
    service.get('/api/gethirelist').then((res) => {
      this.allList = res.data
      this.showHire()
    })
  },
  components: {tabbar, DropList},
  methods: {
    searchRecordShow: function () {
      this.visible = true;
    },

    showHireType: function () {
      this.$refs.droplist.show()
    },
    quanzhi: function () {
      this.hireType = '全部职位'
      this.showHire()
    },
    gaogong: function () {
      this.hireType = '高级技工'
      this.showHire()
    },
    pugogn: function () {
      this.hireType = '普通技工'
      this.showHire()
    },
    uishi: function () {
      this.hireType = 'UI设计师'
      this.showHire()
    },
    searchHire: function () {
      this.showHire()
      
    },
    showHire: function () {
      let linArr = []
      if (this.hireType == '全部职位') {
        if (!this.currentValue) {
          linArr = this.allList
        } else {
          for (let i = 0; i < this.allList.length; i++) {
            if (this.allList[i].offName.indexOf(this.currentValue) > -1 || this.allList[i].companyName.indexOf(this.currentValue) > -1) {
              linArr.push(this.allList[i])
            }
          }
        }
      } else {
        if (!this.currentValue) {
          for (let i = 0; i < this.allList.length; i++) {
            if (this.allList[i].type == this.hireType) {
              linArr.push(this.allList[i])
            }
          }
        } else {
          for (let i = 0; i < this.allList.length; i++) {
            if (this.allList[i].type == this.hireType && (this.allList[i].offName.indexOf(this.currentValue) > -1 || this.allList[i].companyName.indexOf(this.currentValue) > -1)) {
              linArr.push(this.allList[i])
            }
          }
        }
      }
      if (linArr.length > 0) {
        this.haveOff = true
        this.showList = linArr
      } else {
        this.haveOff = false
      }
    },
    jumpToDetail: function (oid) {
      window.sessionStorage.setItem('office', oid)
      this.$router.push({
        path: '/office'
      })
    }
  }
}
</script>

<style scoped>
.hire {
  margin-bottom: 55px;
}
.hire-search {
  height: 52px;
}
.hire-type {
  width: 100%;
  height: 40px;
  position: relative;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: 5px 5px 10px rgba(215, 215, 215, 1);

}
.hire-type-content {
  position: absolute;
  right: 0;
  padding: 10px;
  font-size: 15px;
  color: #26a2ff;
}
.hire-list {
  padding: 0 10px 0 10px;
  background: #fff;
}
.hire-detail {
  overflow: hidden;
  width: 100%;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid rgb(197, 196, 196);
}
.hire-detail-left {
  float: left;
  width: 60px;
  height: 60px;
  margin-right: 20px;
}
.hire-detail-left img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid rgb(197, 196, 196);
  box-shadow: 5px 5px 10px rgba(215, 215, 215, 1);
}
.company-off-card-title {
  overflow: hidden;
  padding-bottom: 5px;
}
.company-off-card-title-left {
  float: left;
  font-size: 16px;
  max-width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
}
.company-off-card-title-right {
  float: right;
  max-width: 30%;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
  font-size: 17px;
  color: #26a2ff
}

.hire-detail-right {
  float: left;
  width: calc(100% - 80px)
}
.no-msg {
  height: calc(100vh - 160px);
  text-align: center;
  padding-top: 1px;
  background-color: #fff;
}
.no-msg img{
  width: 50%;
  margin-top: 20%;
}
</style>
<style>
.wrap-bg {
  background: #fff!important;
}
.mint-search-list {
  z-index: 99
}
</style>


