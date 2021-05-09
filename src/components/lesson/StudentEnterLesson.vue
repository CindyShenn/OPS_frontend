<template>
  <PageHeader content="课程详情"></PageHeader>
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
            <div id="user-operation-content" style="padding: 10px 20px">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="课程实验" name="first">
                  <div id="lesson-projects">
                    <ProjectList
                      :project_records="project_records"
                      v-on:reload = "reloadProject">
                  </ProjectList>
                    <Pagination
                        :total="total_project"
                        v-on:page = "getProjectPage">
                    </Pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="课程签到" name="second">
                  <div id="check-in">
                    <div id="check-in-button" class="flex justify-start">
                      <el-button @click="dialogFormVisible = true" plain>签到</el-button>
                      <el-dialog title="请输入签到密码" v-model="dialogFormVisible">
                          <el-input v-model="pwd" autocomplete="off" placeholder="请输入签到密码"></el-input>
                        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="check()">确 定</el-button>
    </span>
                        </template>
                      </el-dialog>
                    </div>
                    <div id="check-in-record">
                      <div class="my-title">我的签到记录</div>
                      <el-table
                          :data="check_in_records"
                          style="width: 100%;margin-top: 20px">
                        <el-table-column
                            prop="name"
                            label="签到名称">
                        </el-table-column>
                        <el-table-column
                            prop="created_at"
                            label="签到时间">
                        </el-table-column>
                        <el-table-column
                            label="是否参与本次签到">
                          <template #default="scope">
                            <el-tag v-if="scope.row.is_checkin == true" type="success">是</el-tag>
                            <el-tag v-if="scope.row.is_checkin == false" type="danger">否</el-tag>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="课程公告" name="third">
                  <el-empty v-if="resource_records==null" description="该课程还没有公告哦~">
                  </el-empty>
                  <div v-for="(item, index) in resource_records" class="flex flex-column align-center justify-center line" style="width: 100%;margin: 0px">
                      <div class="resource">
                        <div class="single-resource flex flex-column">
                          <div class="resource-title" style="text-align: left;margin-top: 20px">
                            {{item.title}}
                          </div>
                          <div class="resource-content" style="text-align: left;margin-top: 20px">
                            {{item.content}}
                          </div>
                          <div v-if="item.attachmentUrl" style="text-align: left;margin-top: 20px">资源链接：<el-link href="https://element.eleme.io" target="_blank">{{item.attachmentUrl}}</el-link></div>
                          <div class="resource-date info" style="margin-top: 20px">
                            公告时间： {{item.created_at}}
                          </div>
                      </div>
                    </div>
                  </div>
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
import {ElMessage} from "element-plus";
import ProjectList from "../project/ProjectList.vue";
//import {getLabByCourseId} from "../utils/utils"

export default {
name: "StudentEnterLesson",
  components:{ProjectList},
  data(){
  return{
    title:'',
    teacher_name:'',
    created_at:'',
    is_closed:'',
    description:'',
    src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    activeName: 'first',
    formLabelWidth: '',
    resources:[
      {
        content:'这是一个公告',
        date:'2021.3.20',
        attachmentUrl:'123'
      }
    ],
    records:[],
    resource_records:[],
    project_records:[],
    check_in_records:[],
    dialogFormVisible: false,
    pwd:'',

    total_project:'',
  }
  },

  methods:{
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

    reloadProject(){
      this.getProject(1)
    },

    getProjectPage(page){
      this.getProject(page)
    },

    check(){
      let that = this
      that.dialogFormVisible = false;
      this.axios({
        method: "post",
        url: "web/checkin/check",
        data: {
          secretKey: that.pwd,
          courseId: that.$route.params.id,
        },
      }).then((res) => {
        this.info = res;
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
                message: '签到成功！请勿重复点击，签到信息60秒后才会更新~',
              type: 'success'
            });
          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
      });
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
      url: "/web/course/resource",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.course_id
      },
    }).then((res) => {
      console.log(res)
      this.resource_records = res.data.data.records
    });

    this.axios({
      method: "get",
      url: "/web/checkin/record/user",
      params: {
        pageCurrent:1,
        pageSize:20,
        courseId:this.course_id
      },
    }).then((res) => {
      console.log(res)
      this.check_in_records = res.data.data.records
    });

    this.getProject(1);
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

.resource-title{
  text-align: left;
  font-size: 20px;
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
#check-in{
  width: 100%;
  padding: 25px;
}
#check-in-record{
  margin-top: 20px;
}
</style>