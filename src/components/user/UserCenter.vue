<template>
  <div id="user-center">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span class="my-title">我的主页</span>
          <div id="user-info">
            <div class="flex justify-between" style="margin: 20px">
              <div class="flex">
                <div class="user-img">
                  <el-image :src="ava_src" style="width: 100%; height: 100%" fit="cover">
                    <template #placeholder>
                      <div class="image-slot">
                        加载中<span class="dot">...</span>
                      </div>
                    </template>
                  </el-image>
                </div>
                <div class="user-info-content flex flex-column" style="text-align: left">
                  <div class="flex flex-row">
                    <div class="real_name flex align-end">
                      {{ real_name }}
                    </div>
                    <div style="margin-left: 20px;" class="flex align-center">
                      <el-button type="text" icon="el-icon-edit-outline" style="font-size: 15px;padding: 0px"
                                 @click="redirect('user_info')">编辑个人信息
                      </el-button>
                    </div>
                  </div>
                  <div class="id">
                    用户id：{{ id }}&emsp;于&nbsp;{{ Day(create_time) }}&nbsp;加入
                  </div>
                </div>
              </div>
              <div class="logout" style="align-self: flex-end">
                <el-button type="danger" @click="logout()">退出登录</el-button>
              </div>
            </div>
          </div>
          <div id="user-coding-time">
            <div style="padding: 20px">
              <div class="my-title" style="font-size: 20px">我的编码时长统计（min）</div>
              <CodingTimeTable :table_data="table_data"></CodingTimeTable>
            </div>
          </div>
          <div id="user-operation">
            <div id="user-operation-content" style="padding: 10px 20px 20px">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的课程" name="first">
                  <LessonList
                    :lessons="lessons">
                  </LessonList>
                    <Pagination
                      :total="total_lesson"
                      v-on:page = "getLessonPage">
                    </Pagination>
                </el-tab-pane>
                <el-tab-pane label="加入课程" name="second">
                  <div class="search flex" style="width: 400px;margin-top: 20px;margin-bottom: 10px">
                    <el-input
                        width="200px"
                        placeholder="搜索课程"
                        prefix-icon="el-icon-search"
                        v-model="search">
                    </el-input>
                    <el-button type="primary" style="margin-left: 20px" @click="searchLesson(1)">搜索</el-button>
                    <el-button style="margin-left: 10px" @click="cancelSearch">取消</el-button>
                  </div>
                  <LessonList
                      :lessons="all_lessons">
                  </LessonList>
                  <Pagination
                      :total="total_all_lesson"
                      v-on:page = "getAllLessonsPage">
                  </Pagination>
                </el-tab-pane>
                <el-tab-pane label="我的实验" name="third">
                  <ProjectList
                      :project_records="project_records"
                      v-on:reload = "reloadProject"
                  >
                  </ProjectList>
                  <Pagination
                      :total="total_project"
                      v-on:page = "getProjectPage">
                  </Pagination>
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
import {getDay} from "../../utils/utils.ts"
import ProjectList from "../project/ProjectList.vue";
import CodingTimeTable from "./CodingTimeTable.vue";
import LessonList from "../lesson/LessonList.vue";

export default {
  name: "UserCenter",
  components: {
    ProjectList,
    CodingTimeTable,
    LessonList
  },
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      ava_src:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      real_name: '',
      id: '',
      create_time: '',
      activeName: 'first',
      lessons: [],
      all_lessons: [],
      project_records: [],
      table_data: [],

      total_lesson:'',
      total_project:'',
      total_all_lesson:'',

      search:'',
      is_search:false,
    }
  },

  mounted() {
    this.axios({
      method: "get",
      url: "/web/user",
      params: {},
    }).then((res) => {
      let data = res.data.data;
      this.id = data.num;
      if (data.avatar_url != '') {
        this.ava_src = data.avatar_url;
      }
      this.$store.commit('$_setStorageHead', this.ava_src);
      this.create_time = data.created_at;
      this.real_name = data.real_name;
      console.log(res);
      console.log(data.gender)
    });

    this.getLessons(1);
    this.getProject(1);
    this.getAllLessons(1);

    this.axios({
      method: "get",
      url: "/web/coding_time",
      data: {},
    }).then((res) => {
      //this.getData(res.data.data.coding_time)
      this.table_data = res.data.data.coding_time
      console.log(res);
    });
  },
  methods: {
    Day(time) {
      return getDay(time)
    },

    redirect(url) {
      this.$router.push({path: url})
    },

    logout() {
      this.$store.commit('$_removeStorage');
      this.$store.commit('$_removeStorageRole')
      this.$router.push({path: 'login'})
    },

    getLessonPage(page){
      //console.log(page)
      this.getLessons(page)
    },

    getProjectPage(page){
      this.getProject(page)
    },

    getAllLessonsPage(page){
      if (this.is_search==false){
        this.getAllLessons(page)
      }
      else{
        this.searchLesson(page)
      }
    },

    reloadProject(){
      this.getProject(1)
    },

    // 获取课程列表
    getLessons(pageCurrent){
      let that = this
      this.axios({
        method: "get",
        url: "/web/course/study",
        data: {
          pageCurrent: pageCurrent,
          pageSize: 20,
        },
      }).then((res) => {
        console.log(res)
        that.lessons = res.data.data.records
        that.total_lesson = res.data.data.page_info.total;
      });
    },

    // 获取所有课程列表
    getAllLessons(pageCurrent){
      let that = this
      this.axios({
        method: "get",
        url: "/web/course",
        data: {
          pageCurrent: pageCurrent,
          pageSize: 20,
        },
      }).then((res) => {
        console.log(res)
        that.all_lessons = res.data.data.records
        that.total_all_lesson = res.data.data.page_info.total;
      });
    },

    // 获取实验列表
    getProject(pageCurrent){
      let that = this
      this.axios({
        method: "get",
        url: "/web/lab/student",
        params: {
          pageCurrent: pageCurrent,
          pageSize: 20,
        },
      }).then((res) => {
        console.log(res)
        that.project_records = res.data.data.records;
        that.total_project = res.data.data.page_info.total
      });
    },

    // 搜索课程
    searchLesson(pageCurrent){
      this.is_search = true;
      let that = this
      this.axios({
        method: "get",
        url: "/web/course/search",
        params: {
          pageCurrent: pageCurrent,
          pageSize: 20,
          courseName:this.search,
        },
      }).then((res) => {
        console.log(res)
        that.all_lessons = res.data.data.records
        that.total_all_lesson = res.data.data.page_info.total;
      });
    },

    cancelSearch(){
      this.is_search = false;
      this.getAllLessons(1)
    },

  },
}
</script>

<style scoped>
#user-center {
  height: 100%;
}

#body {
  width: 100%;
}

#user-info {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;

}

#user-coding-time {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;
}

#user-operation {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;
}

.user-img {
  height: 100px;
  width: 100px;
}

.user-info-content {
  margin-left: 30px;
}

.real_name {
  font-size: 30px;
}

.id {
  color: #606266;
  font-size: 15px;
  margin-top: 10px;
}

</style>