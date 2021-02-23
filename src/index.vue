<template>
<div id="index">
  <Header></Header>
  <router-view></router-view>
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
    height: calc(100% - 60px);
  }
</style>