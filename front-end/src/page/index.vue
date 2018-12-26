<template>
  <div class="index">
    <div v-title>职位来</div>
    <div class="index-banner">
      <mt-swipe :auto="4000">
        
        <mt-swipe-item v-for="(item, index) in bannerArr" :key="index">
            <img :src="item.bannerImage" alt="" class="banner-img" @click="jumpToUrl(item.bannerUrl)">          
        </mt-swipe-item>
        
      </mt-swipe>
    </div>
    <div class="offic-search">
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
    </div>
    <div class="index-tab" v-if="hasContext">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">推荐职位</mt-tab-item>
        <mt-tab-item id="2">最新职位</mt-tab-item>
        <mt-tab-item id="3">热门公司</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1" v-infinite-scroll="getHotOffic"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
          <div class="hire-detail" v-for="(item, index) in hotOffic" :key="index" @click="jumpToDetail(item.officeId)">
            <div class="bo-offic-box">
              <div class="bo-offic-name ellipsis-1">
                {{item.offName}}
              </div>
              <div class="bo-offic-money ellipsis-1">
                {{item.offMoney}}
              </div>
            </div>
            <div class="bo-offic-msg ellipsis-1">
              {{item.offPlace}}&#x3000;{{item.offEducation}}&#x3000;{{item.offExperience}}
            </div>
            <div class="bo-company-box">
              <div class="bo-company-img">
                <img :src="item.company.companyImg" alt="">
              </div>
              <div class="bo-company-msg">
                <div class="bo-company-name ellipsis-1">
                  {{item.company.companyName}}
                </div>
                <div class="bo-company-fu ellipsis-1">
                  {{item.company.companyDet}}&#x3000;{{item.company.companyPer}}&#x3000;{{item.company.companyType}}
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" v-infinite-scroll="getNewOffic"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
          <div class="hire-detail" v-if="newOffic.length > 0" v-for="(item, index) in newOffic" :key="index" @click="jumpToDetail(item.officeId)">
            <div class="bo-offic-box">
              <div class="bo-offic-name ellipsis-1">
                {{item.offName}}
              </div>
              <div class="bo-offic-money ellipsis-1">
                {{item.offMoney}}
              </div>
            </div>
            <div class="bo-offic-msg ellipsis-1">
              {{item.offPlace}}&#x3000;{{item.offEducation}}&#x3000;{{item.offExperience}}
            </div>
            <div class="bo-company-box">
              <div class="bo-company-img">
                <img :src="item.company.companyImg" alt="">
              </div>
              <div class="bo-company-msg">
                <div class="bo-company-name ellipsis-1">
                  {{item.company.companyName}}
                </div>
                <div class="bo-company-fu ellipsis-1">
                  {{item.company.companyDet}}&#x3000;{{item.company.companyPer}}&#x3000;{{item.company.companyType}}
                </div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="hot-company" v-for="(item, index) in comArr" :key="index" @click="comMsg(item.companyUrl, item.companyId)">
            <img :src="item.backImg" alt="" class="hot-img">
            <div class="hot-company-title">
              {{item.companyName}}
              <div class="more">更多&gt;</div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="index-search-content" v-else>
      <div class="hire-detail" v-for="(item, index) in showList" :key="index" @click="jumpToDetail(item.officeId)">
        <div class="bo-offic-box">
          <div class="bo-offic-name ellipsis-1">
            {{item.offName}}
          </div>
          <div class="bo-offic-money ellipsis-1">
            {{item.offMoney}}
          </div>
        </div>
        <div class="bo-offic-msg ellipsis-1">
          {{item.offPlace}}&#x3000;{{item.offEducation}}&#x3000;{{item.offExperience}}
        </div>
        <div class="bo-company-box">
          <div class="bo-company-img">
            <img :src="item.company.companyImg" alt="">
          </div>
          <div class="bo-company-msg">
            <div class="bo-company-name ellipsis-1">
              {{item.company.companyName}}
            </div>
            <div class="bo-company-fu ellipsis-1">
              {{item.company.companyDet}}&#x3000;{{item.company.companyPer}}&#x3000;{{item.company.companyType}}
            </div>
          </div>
        </div>
      </div>
    </div>

    
    
    <tabbar tarname="home" :iconarr="iconArr"></tabbar>
  </div>
  
</template>

<script>
import service from 'service-api'
import tabbar from '../components/tabbar'
export default {
  name: 'index',
  data(){
      return{
        currentValue: '',
        bannerArr: [],
        comArr: [],
        iconArr: ['../../static/home-check.png', '../../static/hire-normal.png', '../../static/personal-normal .png'],
        hasContext: true,
        showList: [],
        selected: '1',
        hotOffic: [],
        newOffic: [],
        loading: false,
        hotOfficPage: 0,
        newOfficPage: 0
      }
  },
  watch: {
    currentValue: {
      handler(newContext) {
        if (!newContext) {
          this.hasContext = true
        } else {
          this.hasContext = false
          this.showList = []
          this.showHire()
        }
      }
    }
  },
  components: {tabbar},
  created () {
    let self = this
    
    this.getBanner()
    this.getHotOffic()
    this.getNewOffic()
  },
  methods: {
    getNewOffic: function() {
      this.newOfficPage++
      this.axios({
        method: 'post',
        url: '/api/office/new',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          page: this.newOfficPage,
        }
      }).then((res) => {
        let data = res.data.data
        if (data.length > 0) {
          this.haveOff = true
          for (let i = 0; i < data.length; i++) {
            if (!data[i].company) {
              data[i].company = {
                companyImg: '../../static/ge-zi-icon.png',
                companyName: '默认公司',
                companyDet: '未知',
                companyPer: '未知',
                companyType: '未知'
              }
            }
          }
          this.newOffic = this.newOffic.concat(data)
        } else {
          this.haveOff = false
        }
      })
    },
    getHotOffic: function () {
      this.hotOfficPage++
      this.axios({
        method: 'post',
        url: '/api/office/hot',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: {
          page: this.hotOfficPage
        }
      }).then((res) => {
        let data = res.data.data
        if (data.length > 0) {
          this.haveOff = true
          for (let i = 0; i < data.length; i++) {
            if (!data[i].company) {
              data[i].company = {
                companyImg: '../../static/ge-zi-icon.png',
                companyName: '默认公司',
                companyDet: '未知',
                companyPer: '未知',
                companyType: '未知'
              }
            }
          }
          this.hotOffic = this.hotOffic.concat(data)
        } else {
          this.haveOff = false
        }
      })
    },
    getBanner: function () {
      service.post('/api/getBanner').then((res) => {
        this.bannerArr = res.data
      }).catch((e) => {
        alert(e.data.msg)
      })
      service.post('/api/hotPushCompany').then((res) => {
        this.comArr = res.data
      }).catch((e) => {
        alert(e.data.msg)
      })
    },
    comMsg: function(url, company) {
      if (url) {
        window.location.href = url
        return
      } else {
        window.sessionStorage.setItem('compony', company)
        this.$router.push({
          path: '/company'
        })
      }
      
    },
    searchRecordShow: function () {
      this.visible = true;
    },
    jumpToUrl: function(url) {
      if (url) {
        window.location.href = url
      }
    },
    jumpToDetail: function (oid) {
      window.sessionStorage.setItem('office', oid)
      this.$router.push({
        path: '/office'
      })
    },
    showHire: function () {
      this.loading = true
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
        this.loading = false
        let data = res.data.data
        if (data.length > 0) {
          this.haveOff = true
          this.showList = data
        } else {
          this.haveOff = false
        }
      })
    },
  }
    
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  margin-bottom: 55px;
}
.index-banner {
  height: 60vw;
}
.banner-img {
  width: 100%;
  height: 100%;
}

.hot-company {
  margin: auto;
  margin-bottom: 10px;
  box-sizing: border-box;
  background: #ffffff;
  width: 98vw;
  height: 60vw;
  padding: 10px;
  position: relative;
}
.hot-box {
  width: 100%;
}
.hot-img {
  width: 100%;
  height: 100%;
}
.hot-company-title {
  position: absolute;
  bottom: 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}
.more {
  position: absolute;
  bottom: 0;
  padding-bottom: 13px;
  right: 22px;
  font-size: 12px;
  color: #5dd5ca;
}
.mint-searchbar {
  background-color: rgb(245, 245, 245)
}
.mint-navbar {
  margin-bottom: 10px;
}
</style>

