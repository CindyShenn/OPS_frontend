<template>
  <div id="lesson_detail">
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <div class="flex full-width flex-row right-side">
            <div style="width: 70%" class="flex flex-column">
              <LessonContent
                  :title="title"
                  :description="description"
                  :teacher_name="teacher_name"
                  :created_at="created_at"
                  :src="src"
                  :is_closed="is_closed">
              </LessonContent>
              <LessonQA
                  :records="records"
                  :user_id="user_id"
                  :courseId="course_id"
                  :total="total">
              </LessonQA>
            </div>
            <div id="resource-and-enter" class="flex flex-column justify-between left-side">
              <el-affix :offset="130" style="width: 100%">
                <div id="teacher-detail" class="flex flex-column">
                  <div class="my-title">任课教师</div>
                  <div class="flex justify-center align-center flex-column" style="height: 100%;width: 100%">
                    <div>
                      <el-image :src="src" style="width: 100px; height: 100px; margin-top: 20px" fit="cover">
                        <template #placeholder>
                          <div class="image-slot">
                            加载中<span class="dot">...</span>
                          </div>
                        </template>
                      </el-image>
                    </div>
                    <span class="teacher-info">{{teacher_real_name}}</span>
                    <span class="teacher-info">{{teacher_email}}</span>
                    <span class="teacher-info">{{teacher_organization}}</span>
                  </div>
                </div>
                <div id="lesson-resource">
                  <div class="my-title" style="cursor:pointer" @click="redirectEnterAllResource">课程公告</div>
                  <div id="resource-contents">
                    <div v-for="(item,index) in resource_records" class="flex flex-column align-center justify-start"
                         style="width: 100%;margin-top: 5px;">
                      <div class="each-resource limit-length" style="text-align: left;width: 100%;cursor:pointer"
                           @click="redirectEnterResource(item.course_recourse_id)">
                        {{ item.title }}
                      </div>
                    </div>
                  </div>
                </div>
                <div id="enter-lesson" class="flex flex-column">
                  <div class="flex justify-center align-center" style="height: 100%;width: 100%">
                    <el-button type="primary" @click="redirectEnterLesson(course_id)">进入课程</el-button>
                  </div>
                </div>
              </el-affix>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LessonContent from "./LessonContent.vue"
import LessonQA from "./LessonQA.vue";

export default {
  components: {LessonContent, LessonQA},
  name: "LessonDetail",
  data() {
    return {
      title: '',
      user_id: '',
      teacher_name: '',
      teacher_id:'',
      created_at: '',
      is_closed: '是',
      description: '',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      total: 0,
      records: [],
      resource_records: [
        {title: '欢迎加入本课程！'}
      ],
      dialogFormVisible: false,
      commentTextTemp: '',
      course_id: '',
      commentText: '',
      currentReply: '',
      //教师信息
      teacher_email:'',
      teacher_organization:'',
      teacher_real_name:'',
      teacher_avatar_url:'',
    }
  },
  mounted() {
    this.course_id = this.$route.params.id

    //先根据课程id获取课程信息，然后根据教师id获取任课教师的信息
    this.axios({
      method: "get",
      url: "/web/course/" + this.course_id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.title = res.data.data.course_name;
      this.teacher_name = res.data.data.teacher_name;
      this.teacher_id = res.data.data.teacher_id;
      this.created_at = res.data.data.created_at;
      this.is_closed = res.data.data.is_closed == '2' ? '已结课' : '未结课';
      this.description = res.data.data.course_des;
      if (res.data.data.pic_url != null) {
        this.src = res.data.data.pic_url
      }
      this.axios({
        method: "get",
        url: "/web/user/"+this.teacher_id,
        params: {},
      }).then((res) => {
        console.log(res)
        this.teacher_real_name = res.data.data.real_name;
        this.teacher_organization = res.data.data.organization;
        this.teacher_email = res.data.data.email;
        this.teacher_avatar_url = res.data.data.avatar_url;
      });
    })

    this.axios({
      method: "get",
      url: "/web/user",
      params: {},
    }).then((res) => {
      console.log(res)
      let data = res.data.data;
      this.user_id = data.user_id;
      console.log("userID", this.user_id)
    });

    this.axios({
      method: "get",
      url: "/web/course/study",
      data: {},
    }).then((res) => {
      console.log(res)
      this.lessons = res.data.data.records
      console.log(res.data.data.records)
    });

    this.axios({
      method: "get",
      url: "/web/comment/course",
      params: {
        pageCurrent: 1,
        pageSize: 20,
        courseId: this.$route.params.id
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
        pageCurrent: 1,
        pageSize: 20,
        courseId: this.$route.params.id
      },
    }).then((res) => {
      console.log(res)
      this.resource_records = res.data.data.records
      console.log(this.records)
    });

  },
  methods: {
    redirectEnterLesson(id) {
      this.$router.push({path: `/student_enter_lesson/${id}`})
    },
    redirectEnterResource(id) {
      this.$router.push({name: 'LessonResource', params: { id: id,courseId:this.course_id }})
    },
    redirectEnterAllResource() {
      this.$router.push({path: `/lesson_resource_all/${this.course_id}`})
    },
    replyDialog(id) {
      this.dialogFormVisible = true;
      this.currentReply = id;
    },
  }
}
</script>

<style scoped>
#lesson_detail {
  width: 100%;
}

#body {
  width: 100%;
}

#resource-and-enter {
  width: 25%;
  height: auto;
  margin-left: 30px;
}

#lesson-resource {
  height: auto;
  background: #FFFFFF;
  padding: 25px;
  margin-top: 10px;
}

#enter-lesson {
  margin-top: 10px;
  height: auto;
  background: #FFFFFF;
  padding: 25px;
}
#teacher-detail{
  height: auto;
  background: #FFFFFF;
  padding: 25px;
}
.teacher-info{
  margin-top: 10px;
}


</style>