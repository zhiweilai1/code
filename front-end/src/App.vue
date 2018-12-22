<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.hire-detail {
  overflow: hidden;
  padding: 10px;
  box-sizing: 10px;
  background-color: #fff;
  margin-bottom: 10px;
}
.bo-offic-box {
  overflow: hidden;
  font-size: 16px;
}
.bo-offic-name {
  float: left;
  font-weight: 800;
  color: #4a4c5b;
}
.bo-offic-money {
  float: right;
  font-weight: 800;
  color: #fc6c38;
}
.bo-offic-msg {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.bo-company-box {
  overflow: hidden;
}
.bo-company-img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.bo-company-img img {
  width: 100%;
  height: 100%;
}
.bo-company-msg {
  float: left
}
.bo-company-name {
  font-size: 13px;
  color: #887878;
}
.bo-company-fu {
  font-size: 12px;
  color: #999;
}
</style>

<style>
body {
  margin: 0;
  box-sizing: border-box;
  background-color: rgb(245, 245, 245);
  color: #4a4c5b;
}
.ellipsis-1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.img {
  width: 100%;
  height: 100%;
}

.big-title {
  font-size: 18px;
}
.normal-title {
  font-size: 16px;
}
.litle-title {
  font-size: 14px;
  color: #999;
}

.number-input {
  border: none;
  box-sizing: border-box;
  -webkit-appearance: none;
}
.mint-msgbox-message {
  color: #4a4c5b;
}

.mint-navbar .mint-tab-item.is-selected {
  color: #5dd5ca;
  border-bottom: 3px solid #5dd5ca
}
.mint-radio-input:checked + .mint-radio-core {
  border-color: #5dd5ca;
  background-color: #5dd5ca
}
.mint-badge.is-primary {
  background-color: #5dd5ca
}
.mint-button--primary {
  background-color: #5dd5ca
}
</style>
