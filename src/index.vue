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
    height: 100vh;
  }
</style>