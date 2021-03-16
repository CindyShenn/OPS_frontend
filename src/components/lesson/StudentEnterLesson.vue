<template>
  <div id="student-enter-lesson" >
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <div id="content">
            <div class="flex flex-row" style="padding: 20px">
              <div class="lesson-img">
                <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                  <template #placeholder>
                    <div class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="detail flex flex-column">
                <div class="title">
                  {{title}}
                </div>
                <div class="info flex align-center">
                  任课教师:{{teacher_name}}&emsp;开课时间: {{created_at}}&emsp;是否结课：{{is_closed}}
                </div>
                <div class="description">
                  {{description}}
                </div>
              </div>
            </div>
          </div>
          <div id="user-operation">
            <div id="user-operation-content">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="课程签到" name="first">

                </el-tab-pane>
                <el-tab-pane label="课程公告" name="first">
                  <div v-for="(item, index) in resources" class="flex flex-column align-center justify-center line" style="width: 100%;margin: 0px">
                      <div class="resource">
                        <div class="single-resource flex flex-column">
                          <div class="resource-content" style="text-align: left;margin-top: 20px">
                            {{item.content}}
                          </div>
                          <div v-if="item.attachmentUrl" style="text-align: left;margin-top: 20px">资源链接：{{item.attachmentUrl}}</div>
                          <div class="resource-date info" style="margin-top: 20px">
                            公告时间： {{item.date}}
                          </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="课程实验" name="second">

                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "StudentEnterLesson",
  data(){
  return{
    title:'c++基础课程',
    teacher_name:'王小明',
    created_at:'2020.9.2',
    is_closed:'是',
    description:'c++是一门基础的编程语言，从这门课程里，你将学习到c++的基础知识，并通过实践巩固理论。',
    src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    activeName: 'first',
    resources:[
      {
        content:'这是一个公告',
        date:'2021.3.20',
        attachmentUrl:'123'
      }
    ]
  }
  }
}
</script>

<style scoped>
#student-enter-lesson{
  width: 100%;
}
#body {
  width: 100%;
}
#content{
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
  margin-top: 20px;
}
.lesson-img {
  height: 200px;
  width: 200px;
  background: #002d54;
}

.detail{
  margin-left: 20px;
}

.title{
  height: 20%;
  text-align: left;
  font-size: 30px;
  font-weight: 600;
}
.info{
  height: 20%;
  text-align: left;
  color: #606266;
  font-size: 15px;
}
.description{
  height: 60%;
  text-align: left;
}


#user-operation {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;
}

.resource{
  width: 100%;
  height: auto;
  background: #FFFFFF;
}
.single-resource{
  padding: 20px;
}
</style>