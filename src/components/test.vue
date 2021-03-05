<template>
  <div>
    {{ info }}
  </div>
</template>

<script>

export default {
  name: "test",
  data() {
    return {
      info: '',
    }
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/web/user/"+"12",
      data: {},
    }).then((res) => {
      this.info=res;
      console.log(res);
    });
  }
}
</script>

<style scoped>

</style>