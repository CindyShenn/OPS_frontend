<template>
  <div id="teacher-lesson-detail" class="flex justify-center">
    <div id="body">
      <el-tabs :tab-position="tabPosition" stretch style="height: auto;font-size: 30px">
        <el-tab-pane>
          <template #label>
            <span style="font-size: 20px"> 课程信息</span>
          </template>
          <div style="padding: 0px 120px;">
            <div class="flex flex-column justify-start"  style="background-color: #FFFFFF;padding: 30px">
              <div class="flex flex-row each-item" style="margin-top: 0px">
                <div class="flex align-center" style="text-align: center;">课程封面:</div>
                <div class="each-item-content" style="margin-left: 50px;cursor:pointer" onclick="location.href='/project'">
                  <el-image
                      style="width: 200px; height: 200px;margin-left: 110px"
                      :src="url"
                      :fit="cover"></el-image>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name">课程ID:</div>
                <div class="each-item-content">
                  {{ id }}
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name">课程名:</div>
                <div class="each-item-content ">
                  {{ name }}
                </div>
                <div class="button">
                  <el-button type="primary">修改</el-button>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name" style="text-align: center;align-self: flex-end">选课密码:</div>
                <div class="each-item-content">
                  {{ password }}
                </div>
                <div class="button">
                  <el-button type="primary">修改</el-button>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name" style="text-align: center;align-self: flex-end">是否关闭:</div>
                <div class="each-item-content">
                  {{ is_close }}
                </div>
                <div class="button">
                  <el-button type="primary">修改</el-button>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name" style="text-align: center;align-self: flex-end">课程描述:</div>
                <div class="each-item-content align-center" style="font-size: 15px;word-wrap:break-word;height: auto ">
                  {{ description }}
                </div>
                <div class="align-center flex button">
                  <el-button type="primary" style="align-items: center">修改</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 20px">学生管理</span>
          </template>
          <div>
            <div class="flex justify-between" style="width: 100%">
              <div>
                <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">添加学生</el-button>
                <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">导入学生列表</el-button>
              </div>
              <div style="width: 200px">
                <el-input
                    width="200px"
                    placeholder="搜索课程"
                    prefix-icon="el-icon-search"
                    v-model="search">
                </el-input>
              </div>
            </div>
          </div>
          <div style="margin-top: 30px">
            <el-table
                :data="tableData"
                style="width: 100%">
              <el-table-column
                  prop="user_id"
                  label="学生编号">
              </el-table-column>
              <el-table-column
                  prop="email"
                  label="邮箱地址">
              </el-table-column>
              <el-table-column
                  label="昵称"
                  prop="nick_name">
              </el-table-column>
              <el-table-column
                  prop="real_name"
                  label="真实姓名">
              </el-table-column>
              <el-table-column
                  prop="gender"
                  label="性别">
              </el-table-column>
              <el-table-column
                  prop="major"
                  label="专业">
              </el-table-column>
              <el-table-column
                  prop="organization"
                  label="单位">
              </el-table-column>
              <el-table-column
                  label="操作">
                <template #default="scope">
                  <el-button @click="handleClick(scope.row)" type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
export default {
  name: "TeacherLessonDetail",
  data() {
    return {
      url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      tabPosition: 'left',
      name: 'c++ 基础课程',
      id: '12344',
      password: 'abser213123sdf',
      is_close: '是',
      description: '这是c++的基础课程，在本次课程里我们将学习c++的语法和基本应用',
      tableData: [{
        user_id:'0001',
        email:'12345@qq.com',
        nick_name:'cindy',
        real_name:'王小明',
        gender:'男',
        major:'计算机科学',
        organization:'华南师范大学'
      }, ]
    };
  }
}
</script>

<style scoped>
#teacher-lesson-detail {
  height: 100%;
  width: 100%;
}

#body {
  height: auto;
  width: 80%;
  padding: 30px;
}

.each-item {
  margin-top: 40px;
  font-size: 25px;
}

.each-item-name {
  text-align: center;
  align-self: flex-end;
  width: 150px;
}

.each-item-content {
  margin-left: 60px;
  align-self: flex-end;
  color: #606266;
  width: 250px;
}

.button{
  margin-left: 90px
}

</style>