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
</style>
