<template>
  <div id="student-status">
    <div id="main" class="flex align-center justify-center">
      <div id="student-status-card" class="flex flex-column justify-between" >
        <div style="margin: 15px 30px">
          <div class="flex justify-between" style="margin-top: 10px;margin-bottom: 15px">
            <el-button type="success" @click="dialogFormVisible = true">导入学生</el-button>
            <div style="width: 150px">
              <el-input
                  placeholder="搜索"
                  prefix-icon="el-icon-search"
                  v-model="search">
              </el-input>
            </div>
          </div>
          <el-table
              :data="tableData"
              style="width: 100%;font-size: 15px">
            <el-table-column
                prop="nick"
                label="昵称">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="number"
                label="学号">
            </el-table-column>
            <el-table-column
                prop="level"
                label="年级">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="mail"
                label="邮箱">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "StudentStatus"
}
</script>

<style scoped>
#student-status{
  height: 100%;
  width: 100%;
}
#main {
  height: 100%;
  width: 100%;
  background: #3589BF;
}
#student-status-card{
  width: 90%;
  height: 90%;
  background: #FFFFFF;
  box-shadow: 0px 0px 15px 0px #504d5f;
  border-radius: 10px;
}
</style>