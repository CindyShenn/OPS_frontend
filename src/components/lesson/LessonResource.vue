<template>
  <PageHeader content="公告详情"></PageHeader>
  <div id="lesson-resource">
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <LessonContent
              :title="course_name"
              :description="description"
              :teacher_name="teacher_name"
              :created_at="created_at"
              :src="src"
              :is_closed="is_closed">
          </LessonContent>
          <div id="resource">
            <div class="flex flex-column single-resource">
              <div class="my-title">{{ title }}</div>
              <div class="resource-content" style="text-align: left;margin-top: 20px">
                {{ content }}
              </div>
              <div v-if="attachment_url" style="text-align: left;margin-top: 20px">下载资源：
                <el-button type="primary" @click="downloadResource()">下载</el-button>
              </div>
              <div class="resource-date info" style="margin-top: 20px">
                公告时间： {{ resource_created_at }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LessonContent from "./LessonContent.vue"

export default {
  name: "LessonResource",
  components: {LessonContent},
  data() {
    return {
      course_recourse_id: '',
      course_id: '',
      title: '',
      course_name: '',
      teacher_name: '',
      created_at: '',
      resource_created_at: '',
      is_closed: '',
      description: '',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      total: 3,
      content: '',
      date: '',
      attachment_url: '',
      resource_records: [],
    }
  },
  methods:{
    downloadResource(){
      window.open(this.attachment_url, '_blank')
    }
  },
  mounted() {
    // 获取课程资源id
    this.course_recourse_id = this.$route.params.id;
    // 获取课程id
    this.course_id = this.$route.params.courseId;
    //根据课程id获取课程信息
    this.axios({
      method: "get",
      url: "/web/course/" + this.course_id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.course_name = res.data.data.course_name;
      this.teacher_name = res.data.data.teacher_name;
      this.teacher_id = res.data.data.teacher_id;
      this.created_at = res.data.data.created_at;
      this.is_closed = res.data.data.is_closed == '2' ? '已结课' : '未结课';
      this.description = res.data.data.course_des;
      if (res.data.data.pic_url != null) {
        this.src = res.data.data.pic_url
      }
    })

    // 根据id获取课程资源
    this.axios({
      method: "get",
      url: "/web/course/resource/" + this.course_recourse_id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.title = res.data.data.title;
      this.content = res.data.data.content;
      this.attachment_url = res.data.data.attachment_url;
      this.resource_created_at = res.data.data.created_at;
    });
  }
}
</script>

<style scoped>
#lesson-resource {
  width: 100%;
}

#body {
  width: 100%;
}


.info {
  height: 20%;
  text-align: left;
  color: #606266;
  font-size: 15px;
}


#resource {
  width: 100%;
  height: auto;
  margin-top: 30px;
  background: #FFFFFF;
}

.single-resource {
  padding: 25px;
}

</style>