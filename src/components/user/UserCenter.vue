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
                  <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
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
                      <el-button type="text" icon="el-icon-edit-outline" style="font-size: 15px;padding: 0px" @click="redirect('user_info')">编辑个人信息
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
          <div id="user-operation">
            <div id="user-operation-content" style="padding: 10px 20px">
              <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane label="我的课程" name="first">
                  <div id="lesson-list"  style="width: 100%">
                    <div v-for="(item, index) in lessons" class="flex flex-column align-center justify-center line" style="width: 100%;margin: 0px">
                      <div class="each-lesson flex flex-row" v-on:click="redirectLesson(item.course_id)" style="cursor:pointer">
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
                            <div style="text-align: left;font-size: 30px;font-weight: 600;">{{item.course_name}}</div>
                          </div>
                          <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                            {{ course_des }}
                          </div>
                          <div class="lesson-detail flex flex-row align-end justify-between" style="height: 30%">
                            <div class="lesson-detail-content">开课时间：{{Day(item.created_at)}}</div>
                            <div class="lesson-detail-content">是否结课：{{isClosed(item.is_close)}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="我的实验" name="second">
                  <ProjectList
                      :project_records="project_records">
                  </ProjectList>
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
export default {
  name: "UserCenter",
  components:{
    ProjectList,
  },
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      real_name: '',
      id: '',
      create_time: '',
      activeName: 'first',
      lessons:[],
      project_records:[],
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
      if(data.avatar_url != ''){
        this.src = data.avatar_url;
      }
      this.$store.commit('$_setStorageHead', this.src);
      this.create_time = data.created_at;
      this.real_name = data.real_name;
      console.log(res);
      console.log(data.gender)
    });
    this.axios({
      method: "get",
      url: "/web/course/study",
      data: {
        pageCurrent:1,
        pageSize:20,
      },
    }).then((res) => {
      console.log(res)
      this.lessons=res.data.data.records
      console.log(res.data.data.records)
    });
    this.axios({
      method: "get",
      url: "/web/lab/student",
      params: {
        pageCurrent:1,
        pageSize:20,
      },
    }).then((res) => {
      console.log(res)
      this.project_records = res.data.data.records;
      console.log(this.total)
      console.log(this.records)
    });
  },
  methods:{
    Day(time){
      return getDay(time)
    },
    redirectProject(id){
      this.$router.push({ path:`/project_detail/${id}`})
    },
    redirect(url){
      this.$router.push({ path:url})
    },
    redirectLesson(id){
      this.$router.push({ path:`/lesson_detail/${id}`})
    },
    logout(){
      this.$store.commit('$_removeStorage');
      this.$store.commit('$_removeStorageRole')
      this.$router.push({ path:'login'})
    },
    isClosed(value){
      return value=='2' ? '是' : '否'
    },
    isFinished(value){
      return value=='2' ? '是' : '否'
    }
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
.each-lesson {
  height: 150px;
  width: 80%;
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
#single-project {
  height: 150px;
  background: #FFFFFF;
}


#single-project {
  height: 150px;
  background: #FFFFFF;
}
#lesson-projects{
  padding: 0px 20px 20px 20px;
}
.project-detail{
  color: #606266;
  font-size: 15px;
}
</style>