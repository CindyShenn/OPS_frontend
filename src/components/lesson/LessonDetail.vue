<template>
  <div id="lesson_detail" >
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span class="my-title">课程详情</span>
          <LessonContent
            :title="title"
            :description="description"
            :teacher_name="teacher_name"
            :created_at="created_at"
            :src="src"
            :is_closed="is_closed">
          </LessonContent>
            <div id="resource-and-enter" class="flex flex-row justify-between">
              <div id="lesson-resource">
                <div class="my-title" style="cursor:pointer" onclick="location.href='/project'">课程公告</div>
                <div id="resource-contents">
                  <div v-for="(item,index) in resource_records" class="flex flex-column align-center justify-start" style="width: 100%;margin-top: 5px;">
                    <div class="each-resource limit-length" style="text-align: left;width: 100%;cursor:pointer" onclick="location.href='/project'">
                      {{item.title}}
                    </div>
                  </div>
                </div>
              </div>
              <div id="enter-lesson" class="flex flex-column">
                <div class="my-title">进入课程</div>
                <div class="flex justify-center align-center" style="height: 100%;width: 100%">
                  <el-button type="primary" @click="redirectEnterLesson(course_id)">进入课程</el-button>
                </div>
              </div>
            </div>
          <span class="my-title" style="margin-top: 30px">课程评论&nbsp;（{{total}}&nbsp;条）</span>
            <Comments
              :records="records"
              :user_id="user_id"
              :courseId="course_id">
            </Comments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import Comments from "../common/Comments.vue"
import LessonContent from "./LessonContent.vue"

export default {
  components:{LessonContent, Comments},
name: "LessonDetail",
  data(){
  return{
    title:'',
    user_id:'',
    teacher_name:'',
    created_at:'',
    is_closed:'是',
    description:'',
    src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    total:0,
    records:[],
    resource_records:[
        {title:'欢迎加入本课程！'}
    ],
    dialogFormVisible: false,
    commentTextTemp:'',
    course_id:'',
    commentText:'',
    currentReply:'',
  }
  },
  mounted() {
    this.course_id = this.$route.params.id
    this.axios({
      method: "get",
      url: "/web/course/"+this.$route.params.id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.title = res.data.data.course_name;
      this.teacher_name = res.data.data.teacher_name;
      this.created_at = res.data.data.created_at;
      this.is_closed = res.data.data.is_closed == '2' ? '是' : '否';
      this.description = res.data.data.course_des;
      if(res.data.data.pic_url != null){
        this.src = res.data.data.pic_url
      }
    });
    this.axios({
      method: "get",
      url: "/web/user",
      params: {},
    }).then((res) => {
      console.log(res)
      let data = res.data.data;
      this.user_id = data.user_id;
      console.log("userID",this.user_id)
    });
    this.axios({
      method: "get",
      url: "/web/course/study",
      data: {},
    }).then((res) => {
      console.log(res)
      this.lessons=res.data.data.records
      console.log(res.data.data.records)
    });
    this.axios({
      method: "get",
      url: "/web/comment/course",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.$route.params.id
      },
    }).then((res) => {
      console.log(res)
      this.records = res.data.data.records;
      this.total = res.data.data.page_info.total;
      console.log(this.total)
      console.log(this.records)
    });
    this.axios({
      method: "get",
      url: "/web/course/resource",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.$route.params.id
      },
    }).then((res) => {
      console.log(res)
      this.resource_records = res.data.data.records
      console.log(this.records)
    });
  },
  methods:{
    redirectEnterLesson(id){
      this.$router.push({ path:`/student_enter_lesson/${id}`})
    },
    replyDialog(id){
      this.dialogFormVisible = true;
      this.currentReply = id;
    },
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

#resource-and-enter{
  width: 100%;
  height: auto;
  margin-top: 30px;
}

#lesson-resource {
  width: 50%;
  height: auto;
  background: #FFFFFF;
  padding: 25px;
  margin-right: 10px;
}

#enter-lesson{
  width: 50%;
  height: auto;
  background: #FFFFFF;
  padding: 25px;
}



</style>