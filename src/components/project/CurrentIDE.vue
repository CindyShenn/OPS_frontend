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
  data() {
    return {
      url: '',
      startTime: '',
      endTime: '',
      readyStateTime: '',
      labId: '',
    }
  },
  mounted() {
    this.url = this.$route.query.url;
    this.labId = this.$route.query.labId;
    let that = this;
    window.addEventListener('beforeunload', (e) => {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示';
      }
      console.log('close')
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      e.returnValue = '关闭提示';
      //that.closeWin();
      return '关闭提示';
    })
    window.addEventListener( 'unload', e => this.closeWin() );


    var oFrm = document.getElementById('ide');
    oFrm.onload = oFrm.onreadystatechange = function () {
      if (this.readyState && this.readyState != 'complete') return;
      else {
        this.readyStateTime = new Date().getTime();
        console.log(this.readyStateTime)
        console.log('IDE加载完成')
      }
    }
  },

  destroyed() {
    let that = this
    window.removeEventListener('beforeunload', (e) => {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示';
      }
      console.log('close')
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      e.returnValue = '关闭提示';
      that.closeWin();

      return '关闭提示';
    })
    window.removeEventListener( 'unload', e => this.closeWin() );
  },

  methods: {
    closeWin() {
      this.endTime = new Date().getTime();
      console.log(this.readyStateTime)
      console.log(this.endTime)
      let timeD = (this.endTime - this.readyStateTime) / 1000
      console.log(timeD)
      console.log('close1')
      let that = this
      this.axios({
        method: "delete",
        url: "/web/ide",
        data: {
          labId: that.labId,
        },
      }).then((res) => {
        localStorage.setItem("unload","addEventListener.unload");
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            localStorage.setItem("unload","addEventListener.unload");
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
      //localStorage.setItem("unload","addEventListener.unload");
    }
  },

  readyStateHandler() {
    this.readyStateTime = new Date().getTime();
    console.log(this.readyStateTime)
  }

}
</script>

<style scoped>
#current-ide {
  width: 100%;
  height: 100%;
}
</style>