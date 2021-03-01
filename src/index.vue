<template>
<div id="index">
  <el-container>
    <el-header style="background-color: #002d54"><Header></Header></el-header>
      <el-main><router-view></router-view></el-main>
  </el-container>
</div>
</template>

<script>
import Header from "./components/desk/Header.vue"

export default {
  name: "index",
  components:{
    Header,
  }
}
</script>

<style scoped>
  #index{
    background-color: #f9f9f9;
    height: 100%;
  }
  #index-header {
    height: 60px;
    position: fixed;
    top: 0;
    width: 100%;
  }

  #index-container {
    background-color: #f9f9f9;
    top: 60px;
    height: calc(100% - 60px);
    width: 100%;
    overflow-y: auto;
    position: fixed;
  }
  .el-header {
    background-color: #b3c0d1;
  }

  .el-aside {
    background-color: #d3dce6;
  }
  .el-main {
    background-color: #e9eef3;
  }
  .el-container {
    height: 100%;
    width: 100%;
    position: relative;
    left: 0px;
    bottom: 0px;
  }
</style>