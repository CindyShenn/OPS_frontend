<template>
  <PageHeader content="所有公告"></PageHeader>
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
          <ResourceList
          :resource_records="resource_records">
          </ResourceList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceList from "./ResourceList.vue";
import LessonContent from "./LessonContent.vue";
export default {
  name: "LessonResourceAll",
  components:{ResourceList,LessonContent},
  data(){
    return{
      course_id:'',
      course_name:'',
      teacher_name:'',
      created_at:'',
      is_closed:'',
      description:'',
      src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      total:3,
      resource_records:[],
    }
  },
  mounted() {
    // 获取课程id
    this.course_id = this.$route.params.id;

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

    //获取课程资源列表
    this.axios({
      method: "get",
      url: "/web/course/resource",
      params: {
        pageCurrent: 1,
        pageSize: 20,
        courseId: this.course_id
      },
    }).then((res) => {
      console.log(res)
      this.resource_records = res.data.data.records;
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
</style>