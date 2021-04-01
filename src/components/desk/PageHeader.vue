<template>
  <el-page-header @back="goBack" :content="content" title="返回" style="line-height:35px;margin-bottom: 15px">
  </el-page-header>
</template>

<script>
export default {
  name: "PageHeader",
  props:["content"],
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.el-page-header__title {
  font-size: 18px;
  font-weight: 500;
}
</style>