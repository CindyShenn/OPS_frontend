<template>
  <div id="student-lesson">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span style="font-size: 28px;text-align: left;font-weight: 400;width: 100%">我的课程</span>
          <div class="flex justify-between" style="margin-top: 30px;width: 85%">
            <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">加入课程</el-button>
            <el-dialog title="创建班级" v-model="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="班级名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off" placeholder="请输入班级名称"></el-input>
                </el-form-item>
                <el-form-item label="班级描述" :label-width="formLabelWidth">
                  <el-input v-model="form.description" type="textarea"
                            placeholder="请输入班级描述" autocomplete="off" maxlength="30"
                            show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="加入密码" :label-width="formLabelWidth">
                  <el-input v-model="form.password" autocomplete="off" placeholder="请输入班级加入密码"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
              </template>
            </el-dialog>
            <div style="width: 200px">
              <el-input
                  width="200px"
                  placeholder="搜索课程"
                  prefix-icon="el-icon-search"
                  v-model="search">
              </el-input>
            </div>
          </div>
          <div id="lesson-list"  style="width: 100%">
            <div v-for="(item, index) in lessons" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 40px">
              <div class="each-lesson flex flex-row" onclick="location.href='/project'" style="cursor:pointer">
                <div class="each-lesson-img">
                  <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                    <template #placeholder>
                      <div class="image-slot">
                        加载中<span class="dot">...</span>
                      </div>
                    </template>
                  </el-image>
                </div>
                <div class="each-lesson-info flex flex-column">
                  <div class="lesson-title flex flex-row align-center" style="height: 30%">
                    <div style="text-align: left;font-size: 30px;font-weight: 600;">{{item.title}}</div>
                    <div style="text-align: left;font-size: 20px;margin-left: 15px">(课程id:{{item.id}})</div>
                  </div>
                  <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                    Demo description
                  </div>
                  <div class="lesson-detail flex flex-row align-end justify-between" style="height: 30%">
                    <div class="lesson-detail-content">开课时间：{{item.created_at}}</div>
                    <div class="lesson-detail-content">是否结课：{{item.is_close}}</div>
                    <div class="lesson-detail-content">更新时间：{{item.updated_at}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "StudentLesson",
  data(){
    return{
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      lessons:[
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
      ]
    }
  }
}
</script>

<style scoped>
#student-lesson {
  height: auto;
}

#body {
  width: 100%;
}

#section {
  height: 100%;
}

.each-lesson {
  height: 150px;
  width: 80%;
  background: #FFFFFF;
  padding: 25px;
}

.each-lesson-img {
  height: 150px;
  width: 150px;
  background: #002d54;
}

.each-lesson-info {
  height: 150px;
  width:calc(100% - 180px);
  margin-left: 30px;
}

.lesson-detail-content{
  width: 30%;
  text-align: left;
}
</style>