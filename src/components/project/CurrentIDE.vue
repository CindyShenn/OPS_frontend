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
import {onMounted, onUnmounted} from 'vue'

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
      usrId: '',
      close: 0,

      websocket: null,
    }
  },

  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
      this.websocket.close() //离开路由之后断开websocket连接
      localStorage.setItem("unmounted", "addEventListener.unload");
    })
  },

  mounted() {
    this.labId = this.$route.query.labId;
    this.usrId = this.$route.query.usrId;
    this.url = this.$route.query.url;

    console.log(this.usrId)

    let that = this;

    // this.axios({
    //   method: "post",
    //   url: "/web/ide",
    //   data: {
    //     labId: that.labId,
    //   },
    // }).then((res) => {
    //   console.log(res);
    //   if (res.status == 200) {
    //     if (res.data.code == 0) {
    //       let url = "http://" + res.data.data.url
    //       console.log(url)
    //       this.url = url;
    //     } else {
    //       let message = res.data.message;
    //       console.log(message)
    //       ElMessage.error(message);
    //     }
    //   } else {
    //     ElMessage.error('服务器错误');
    //   }
    // });
    //
    // this.axios({
    //   method: "get",
    //   url: "/web/user",
    //   data: {},
    // }).then((res) => {
    //   console.log(res)
    //   this.usrId = res.data.data.user_id
    //   console.log(this.usrId)
    // });

    // window.addEventListener('beforeunload', (e) => {
    //   if (that.$route.name == "CurrentIDE") {
    //     e = e || window.event;
    //     // 兼容IE8和Firefox 4之前的版本
    //     if (e) {
    //       e.returnValue = '关闭提示';
    //     }
    //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
    //     return '关闭提示222';
    //   } else {
    //     window.onbeforeunload = null
    //   }
    // })
    //
    // window.addEventListener( 'unload', e => this.closeWin() );

    let oFrm = document.getElementById('ide');
    oFrm.onload = oFrm.onreadystatechange = function () {
      if (this.readyState && this.readyState != 'complete') return;
      else {
        this.readyStateTime = new Date().getTime();
        //console.log(this.readyStateTime)
        console.log('IDE加载完成')
        // 初始化websocket
        that.initWebSocket();
      }
    }
  },

  // onUnmounted() {
  //   // let that = this
  //   // window.removeEventListener('beforeunload', (e) => {
  //   //   if (that.$route.name == "CurrentIDE") {
  //   //     e = e || window.event;
  //   //     // 兼容IE8和Firefox 4之前的版本
  //   //     if (e) {
  //   //       e.returnValue = '关闭提示';
  //   //     }
  //   //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
  //   //     return '关闭提示222';
  //   //   } else {
  //   //     window.onbeforeunload = null
  //   //   }
  //   // })
  //   // window.removeEventListener( 'unload', e => this.closeWin() );
  //   this.websocket.close() //离开路由之后断开websocket连接
  //   localStorage.setItem("unmounted","addEventListener.unload");
  // },

  methods: {
    closeWin() {
      this.endTime = new Date().getTime();
      let timeD = (this.endTime - this.readyStateTime) / 1000
      console.log(timeD)
      let that = this

      let body = {
        email: '1'
      };
      console.log(body)
      let blob = new Blob([JSON.stringify(body, null, 2)], {type: 'application/json'});
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


    },
    initWebSocket() { //初始化websocket
      const wsUri = "ws://118.178.253.239:8080/web/ide/connect";
      this.websocket = new WebSocket(wsUri);
      this.websocket.onmessage = this.websocketOnMessage;
      this.websocket.onopen = this.websocketOnOpen;
      this.websocket.onerror = this.websocketOnError;
      this.websocket.onclose = this.websocketClose;
    },
    websocketOnOpen() { //连接建立之后执行send方法发送数据
      let actions = {
        UserId: Number(this.usrId),
        LabId: Number(this.labId),
      };
      this.websocketSend(JSON.stringify(actions));
    },
    websocketOnError() {//连接建立失败重连
      this.initWebSocket();
    },
    websocketOnMessage(e) { //数据接收
      const resData = JSON.parse(e.data);
    },
    websocketSend(Data) {//数据发送
      this.websocket.send(Data);
      console.log(Data)
    },
    websocketClose(e) {  //关闭
      console.log('断开连接', e);
    },

    readyStateHandler() {
      this.readyStateTime = new Date().getTime();
      console.log(this.readyStateTime)
    }
  }
}
</script>

<style scoped>
#current-ide {
  width: 100%;
  height: 100%;
}
</style>