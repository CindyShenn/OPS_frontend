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
import store from "../../store";

export default {
  name: "CurrentIDE",
  data() {
    return {
      url: '',
      startTime: '',
      endTime: '',
      readyStateTime: '',
      labId: '',
      close:0,
    }
  },
  mounted() {
    //this.url = this.$route.query.url;
    this.labId = this.$route.query.labId;
    let that = this;

    this.axios({
      method: "post",
      url: "/web/ide",
      data: {
        labId: that.labId,
      },
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        if (res.data.code == 0) {
          let url = "http://" + res.data.data.url
          console.log(url)
          this.url = url;

          this.axios({
            method: "delete",
            url: "/web/ide",
            data: {
              labId: that.labId,
            },
          }).then((res) => {
            localStorage.setItem("delete then","addEventListener.unload");
            console.log(res);
            if (res.status == 200) {
              if (res.data.code == 0) {
                localStorage.setItem("delete success","addEventListener.unload");
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

        } else {
          let message = res.data.message;
          console.log(message)
          ElMessage.error(message);
        }
      } else {
        ElMessage.error('服务器错误');
      }
    });

    window.addEventListener('beforeunload', (e) => {
      if (that.$route.name == "CurrentIDE") {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示222';
      } else {
        window.onbeforeunload = null
      }
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
      if (that.$route.name == "CurrentIDE") {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示222';
      } else {
        window.onbeforeunload = null
      }
    })
    window.removeEventListener( 'unload', e => this.closeWin() );
  },

  methods: {
    async closeWin() {
      this.endTime = new Date().getTime();
      let timeD = (this.endTime - this.readyStateTime) / 1000
      console.log(timeD)
      let that = this

      let body = {
        email:'1'
      };
      console.log(body)
      let blob = new Blob([JSON.stringify(body, null, 2)], {type : 'application/json'});
      navigator.sendBeacon(this.axios.defaults.baseURL + '/web/login', blob);

      // this.axios({
      //   method: "delete",
      //   url: "/web/ide",
      //   data: {
      //     labId: that.labId,
      //   },
      // }).then((res) => {
      //   localStorage.setItem("delete then","addEventListener.unload");
      //   console.log(res);
      //   if (res.status == 200) {
      //     if (res.data.code == 0) {
      //       localStorage.setItem("delete success","addEventListener.unload");
      //       console.log(res)
      //     } else {
      //       let message = res.data.message;
      //       console.log(message)
      //       ElMessage.error(message);
      //     }
      //   } else {
      //     ElMessage.error('服务器错误');
      //   }
      // });


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