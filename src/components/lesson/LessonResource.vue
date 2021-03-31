<template>
<div id="lesson-resource">
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
        <div id="resource">
          <div class="flex flex-column single-resource">
            <div class="my-title">课程公告</div>
            <div class="resource-content" style="text-align: left;margin-top: 20px">
              {{content}}
            </div>
            <div v-if="url" style="text-align: left;margin-top: 20px">资源链接：<el-link href="https://element.eleme.io" target="_blank">{{url}}</el-link></div>
              <div class="resource-date info" style="margin-top: 20px">
                公告时间： {{date}}
              </div>
          </div>
          <div v-for="(item, index) in resource_records" style="width: 100%;" class="line">
            <div class="flex flex-column single-resource">
              <div class="my-title">课程公告</div>
              <div class="resource-content" style="text-align: left;margin-top: 20px">
                {{item.content}}
              </div>
              <div v-if="item.url" style="text-align: left;margin-top: 20px">资源链接：<el-link href="https://element.eleme.io" target="_blank">{{item.url}}</el-link></div>
              <div class="date-and-op flex flex-row justify-between">
                <div class="resource-date info" style="margin-top: 20px">
                  公告时间： {{date}}
                </div>
                <div class="operation flex">
                  <el-button type="primary">修改</el-button>
                  <el-button type="danger">删除</el-button>
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
name: "LessonResource",
  data(){
    return{
      title:'c++基础课程',
      teacher_name:'王小明',
      created_at:'2020.9.2',
      is_closed:'是',
      description:'c++是一门基础的编程语言，从这门课程里，你将学习到c++的基础知识，并通过实践巩固理论。',
      src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      total:3,
      content: '欢迎大家加入本次课程',
      date:2020.1,
      url:'www.baidu.com',
      resource_records:[
        {
          title:'c++基础课程',
          content: '欢迎大家加入本次课程',
          date:2020.1,
          url:'www.baidu.com',
        },
        {
          title:'c++基础课程',
          content: '欢迎大家加入本次课程',
          date:2020.1,
          url:'www.baidu.com',
        },
        {
          title:'c++基础课程',
          content: '欢迎大家加入本次课程',
          date:2020.1,
          url:'www.baidu.com',
        },
      ],
    }
  }
}
</script>

<style scoped>
#lesson-resource{
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
#resource{
  width: 100%;
  height: auto;
  margin-top: 30px;
  background: #FFFFFF;
}
.single-resource{
  padding: 25px;
}

</style>