<template>
  <div id="current-ide">
    <iframe id="ide"
             title="IDE"
             style="width: 100%;height: 100%"
             v-bind:src="url">
  </iframe>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
name: "CurrentIDE",
  data(){
  return{
    url:'',
    startTime:'',
    endTime:'',
  }
  },
  mounted() {
  this.url = this.$route.query.url;
    this.startTime = new Date().getTime();
    console.log(this.startTime)
  console.log(this.url)
    let that = this
    window.onbeforeunload = function (e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        this.endTime = new Date().getTime();
        console.log(this.startTime)
        console.log(this.endTime)
        let timeD = (this.endTime - this.startTime)/1000
        console.log(timeD)
        console.log('close1')
        e.returnValue = '关闭提示';
        let that = this
        this.axios({
          method: "delete",
          url: "/web/ide",
          data: {
            labId: that.lab_id,
            duration: timeD,
          },
        }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            if (res.data.code == 0) {
              console.log(res)
            } else {
              let message = res.data.message;
              console.log(message)
              ElMessage.error(message);
            }
          } else {
            ElMessage.error('服务器错误');
          }
        });
      }
      console.log('close')
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      e.returnValue = '关闭提示';

      return '关闭提示';
    };

    var oFrm = document.getElementById('ide');
    oFrm.onload = oFrm.onreadystatechange = function() {
      if (this.readyState && this.readyState != 'complete') return;
      else {
        this.startTime = new Date().getTime();
        console.log(this.startTime)
        console.log('IDE加载完成')
      }
    }
  },

  methods:{
  closeWin(){

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