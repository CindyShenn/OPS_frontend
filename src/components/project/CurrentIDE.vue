<template>
  <div id="current-ide">
    <div id="body" class="flex justify-center align-center">
      <div class="container-ide">
        <div id="section-ide" class="flex flex-column align-center justify-center" style="width: 100%">
          <div style="width: 100%;height: 95%">
            <iframe id="ide"
                    title="IDE"
                    style="width: 95%;height: 100%"
                    v-bind:src="url">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "CurrentIDE",
  mounted() {
    window.onbeforeunload = function (e) {
      return ''
    }
  },

  beforeRouteLeave (to, from, next) {
    if (this.progressVisible) {
      this.$confirm('系统可能不会保存您所做的更改。', '离开此页面？', {
        confirmButtonText: '离开',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      })
    } else {
      next()
    }
  },

  beforeDestory () {
    window.onbeforeunload = null
  },
  data(){
  return{
    url:'',
  }
  }
}
</script>

<style scoped>
#current-ide{
  width: 100%;
  height: 100%;
}
#body {
  width: 100%;
  height: 100%;
}
.container-ide{
  width:100%;
  height: 100%;
  overflow:auto;
}
#section-ide{
  width: 100%;
  height: 100%;
}
</style>