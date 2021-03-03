<template>
  <div id="lesson_detail" >
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span class="mytitle">课程详情</span>
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
          <span class="mytitle" style="margin-top: 30px">课程评论&nbsp;（{{total}}&nbsp;条）</span>
          <div id="comment">
            <div v-for="(item, index) in comments" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 40px">
              <div class="each-lesson ">
                <div class="flex flex-row line">
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
                    <div class="user-info flex flex-row align-center" style="height: 20%">
                      <div style="text-align: left;font-size: 20px;font-weight: 600;">{{item.nick_name}}</div>
                      <div style="text-align: left;font-size: 15px;margin-left: 15px">(用户id:{{item.user_id}})</div>
                    </div>
                    <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                      {{ item.comment }}
                    </div>
                    <div class="lesson-detail flex flex-row align-end justify-between" style="height: 20%;font-size: 8px">
                      <div class="lesson-detail-content">评论时间：{{item.created_at}}</div>
                      <div class="lesson-detail-content">更新时间：{{item.updated_at}}</div>
                    </div>
                  </div>
                </div>
                <div id="reply" class="flex flex-column">
                  <div v-for="(item, index) in comments" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 10px">
                    <div class="line each-reply">
                      <div class="flex flex-row">
                        <div class="each-reply-img">
                          <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                            <template #placeholder>
                              <div class="image-slot">
                                加载中<span class="dot">...</span>
                              </div>
                            </template>
                          </el-image>
                        </div>
                        <div class="each-reply-item flex flex-column">
                          <div class="user-info flex flex-row align-center" style="height: 30%">
                            <div style="text-align: left;font-size: 15px;font-weight: 600;">{{item.nick_name}}</div>
                            <div style="text-align: left;font-size: 12px;margin-left: 15px">(用户id:{{item.user_id}})</div>
                          </div>
                          <div class="reply-comment" style="text-align: left;color: #504d5f;font-size: 8px;height: 40%;width: auto;word-wrap:break-word">
                            {{reply-comment}}
                          </div>
                          <div class="reply-time" style="height: 30%;font-size: 8px;width: auto;text-align: left">
                            {{reply-time}}
                          </div>
                        </div>
                      </div>
                    </div>
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
name: "LessonDetail",
  data(){
  return{
    title:'c++基础课程',
    teacher_name:'王小明',
    created_at:'2020.9.2',
    is_closed:'是',
    description:'c++是一门基础的编程语言，从这门课程里，你将学习到c++的基础知识，并通过实践巩固理论。',
    src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    total:3,
    comments:[
      {
        nick_name:'cindy',
        user_id:'00002',
        comment:'这个课非常好，老师讲得很棒',
        created_at:'2020.9.1',
        updated_at:'2020.9.1',
      },
      {
        nick_name:'cindy',
        user_id:'00002',
        comment:'这个课非常好，老师讲得很棒',
        created_at:'2020.9.1',
        updated_at:'2020.9.1',
      },
      {
        nick_name:'cindy',
        user_id:'00002',
        comment:'这个课非常好，老师讲得很棒',
        created_at:'2020.9.1',
        updated_at:'2020.9.1',
      },
    ]
  }
  }
}
</script>

<style scoped>
#lesson_detail{
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
#comment{
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

.each-lesson {
  height: auto;
  width: 90%;
  background: #FFFFFF;
  padding: 25px;
}
.each-lesson-img {
  height: 120px;
  width: 120px;
  background: #002d54;
}
.each-lesson-info {
  height: 150px;
  width:calc(100% - 180px);
  margin-left: 30px;
}

.lesson-detail-content{
  width: 50%;
  text-align: left;
}

#reply {
  height: auto;
  width: 500px;
  margin-left: 150px;
}
.each-reply {
  height: auto;
  padding: 5px;
  width: 100%;
}
.each-reply-img{
  height: 65px;
  width: 65px;
}
.each-reply-item{
  margin-left: 30px;
  width: auto;
}

.line {
  border-bottom: 1px solid #dcdfe6;
}

</style>