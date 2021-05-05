<template>
  <div id="header">
    <div id="logo">
      <img src="../../assets/scnulogo.png" height="50">
    </div>
    <div id="navMenu">
      <div id="title" class="flex align-center justify-center">在线编程教学平台</div>
      <div id="user">
        <el-dropdown @command="userHandler">
  <span class="el-dropdown-link flex align-center">
    <el-badge is-dot type="danger" class="el-badge">
                        <el-avatar :src="$store.state.head"></el-avatar>
    </el-badge>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-user-solid" command="userManage">我的主页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
import store from "../../store";

export default {
  name: "Header.vue",
  data() {
    return {
      activeIndex: '8',
    }
  },

  mounted() {
  },
  methods: {
    redirect(url) {
      this.$router.push({path: url})
    },
    logout() {
      this.$store.commit('$_removeStorage');
      this.$store.commit('$_removeStorageRole');
      this.$router.push({path: 'login'})
    },
    userHandler: function (arg) {
      switch (arg) {
        case "logout" :
          this.logout()
          break;
        case "userManage":
          let role = this.$store.state.role
          if (role ==1){
            this.redirect('teacher_user_center')
          }
          else this.redirect('user_center')
          break
      }
    },
  },
}
</script>

<style scoped>
#header {
  display: flex;
}

#logo {
  background-color: #002d54;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 60px;
  flex: 0 0 auto;
  box-shadow: 2px 10px 27px 0px rgba(0, 0, 0, 0.29);
  z-index: 999;
}

#navMenu {
  background-color: #002d54;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 40px;
  padding-right: 10px;
  box-shadow: 1px 8px 27px 0px rgba(0, 0, 0, 0.29);
}


#navMenu .el-menu-item {
  height: 60px !important;
  line-height: 60px !important;
  width: 9% !important;
  max-width: 120px;
  min-width: 50px;
}

#navMenu .is-active {
  color: white;
  font-weight: 600;
  font-size: 15px;
  border-bottom-color: #3F9EFF;
  border-bottom-width: 4px;
}

#navMenu .el-menu.el-menu--horizontal {
  border: none;
}

#user {
  display: flex;
  align-items: center;
  cursor: pointer;
}

#title {
  color: white;
  text-align: center;
  font-size: 20px;
  letter-spacing: 5px;
}

.el-badge :deep(.el-badge__content){
  border: 0px solid #FFF
}

</style>