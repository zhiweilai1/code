<template>
  <div class="hire">
    <div v-title>岗位信息</div>
    <div class="hire-search">
      <div class="mint-searchbar">
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input
        ref="input"
        
        @keyup.enter="showHire"
        @click="searchRecordShow"
        type="search"
        v-model="currentValue"
        placeholder="搜索职位/公司"
        class="mint-searchbar-core">
      </div>
    </div>
    </div>
    <div class="hire-type">
      <div class="selectBox" style="width: 400px; line-height: 40px; padding-left: 10px;">
      <div class="selectBox_show" v-on:click.stop="arrowDown">
        <i class="icon icon_arrowDown"></i>
        <p title="全部类型">{{unitName}}</p>
        <input type="hidden" name="unit" v-model="unitModel">
      </div>
      <div class="selectBox_list" v-show="isShowSelect"
           style="max-height: 240px; width: 398px; display: block; background: #fff">
        <div class="selectBox_listLi" v-for="(item, index) in dataList" :key="index"
             @click.stop="select(item, index)">{{item.value}}
        </div>
      </div>
    </div>
    </div>
    <div class="hire-list" v-if="haveOff">
      <div class="hire-detail" v-for="(item, index) in showList" :key="index" @click="jumpToDetail(item.officeId)">
        <div class="hire-detail-left">
          <img :src="item.companyImg" alt="">
        </div>
        <div class="hire-detail-right">
          <div class="company-off-card-title">
             <div class="company-off-card-title-left ellipsis-1">{{item.offName}}</div>
             <div class="company-off-card-title-right">{{item.offMoney}}</div>
          </div>
          <div class="litle-title hire-company ellipsis-1">
            {{item.companyName}}
          </div>
          <div class="litle-title ellipsis-1">
            {{ item.pushTime | time}}&nbsp;{{item.offPlace}}&nbsp;{{item.companyType}}
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
import moment from 'moment'
export default {
  name: 'hire',
  filters: {
    time: (value) => {
      return moment(value).format('YYYY-MM-DD')
    }
  },
  // @input="showHire"  防止
  data () {
    return {
      iconArr: ['../../static/home-normal.png', '../../static/hire-check.png', '../../static/personal-normal .png'],
      currentValue: '',
      haveOff: true, 
      hireType: '',
      showList: [],
      isShowSelect: false,
      dataList: [
        {key: '', value: "全部类型"},
        {key: 0, value: "苹果"},
        {key: 1, value: "香蕉"}
      ],
      unitName:'全部类型',
      unitModel: 0

    }
  },

  created() {
    this.showHire()
    this.offTypeList()
  },
  components: {tabbar, DropList},
  methods: {

    arrowDown() {
      this.isShowSelect = !this.isShowSelect;
    },
    select(item, index) {
      this.isShowSelect = false;
      this.unitModel = index;
      this.unitName = item.value;
      this.hireType = item.key
      this.showHire()
    },

    offTypeList: function() {
      this.axios({
        method: 'post',
        url: '/api/getOfficType',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      }).then((res) => {
        let data = res.data.data
        let arr = [{
          key: '',
          value: '全部类型'
        }]
        for (let i = 0; i < data.length; i++) {
          arr.push({
            key: data[i].typeName,
            value: data[i].typeName
          })
        }
        this.dataList = arr
      })
    },
    searchRecordShow: function () {
      this.visible = true;
    },

    searchHire: function () {
      this.showHire()
      
    },
    showHire: function () {

      this.axios({
        method: 'post',
        url: '/api/getHireOffice',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          offType: this.hireType,
          searchContent: this.currentValue
        }
      }).then((res) => {
        let data = res.data.data
        if (data.length > 0) {
          this.haveOff = true
          this.showList = data
        } else {
          this.haveOff = false
        }
        
      })
      
      
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


