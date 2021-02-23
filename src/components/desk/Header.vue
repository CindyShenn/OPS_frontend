<template>
  <div id="header">
    <div id="logo">
      <img src="../../assets/scnulogo.png" height="50">
    </div>
    <div id="navMenu">
      <el-menu
          id="menu"
          ref="menu"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :default-active="activeIndex"
          background-color="#002d54"
          text-color="#fff"
          style="height: 60px">
        <el-menu-item v-show="0" index="0"></el-menu-item>
        <el-menu-item index="1">项目</el-menu-item>
        <el-menu-item index="2">题目</el-menu-item>
        <el-menu-item index="3">班级</el-menu-item>
        <el-menu-item index="4">个人</el-menu-item>
      </el-menu>
      <div id="user">
        <el-col :span="8">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-plus">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "Header.vue",
  data() {
    return {
      activeIndex: '8',
    }
  },
  mounted() {
  },
methods(){
}
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

#menu{
  width: 90%;
  min-width: 600px;
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

#navMenu .el-menu.el-menu--horizontal{
  border: none;
}

#user {
  display: flex;
  align-items: center;
  cursor: pointer;
}

</style>