<template>
  <div id="teacher-project-detail">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <ProjectContent
            :title="title"
            :dead_line="dead_line"
            :attachment-url="attachmentUrl"
            :description="description"
            :created_at="created_at">
          </ProjectContent>
          <div id="user-operation">
            <div id="user-operation-content" style="padding: 10px 20px 20px">
              <el-tabs v-model="activeName"  @tab-click="handleClick">
                <el-tab-pane label="查看学生代码" name="first">

                </el-tab-pane>
                <el-tab-pane label="查看作业完成情况" name="second">
                  <el-table
                      :data="homework_records"
                      style="width: 100%">
                    <el-table-column
                        prop="num"
                        label="学生编号">
                    </el-table-column>
                    <el-table-column
                        prop="real_name"
                        label="学生姓名">
                    </el-table-column>
                    <el-table-column
                        label="完成情况">
                      <template #default="scope">
                        <el-tag v-if="scope.row.finish_stat == 1" type="success">已完成</el-tag>
                        <el-tag v-if="scope.row.finish_stat == 0" type="danger">未开始</el-tag>
                        <el-tag v-if="scope.row.finish_stat == 2" type="warning">进行中</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="coding_time"
                        label="编码时长">
                    </el-table-column>
                    <el-table-column
                        label="实验报告">
                      <template #default="scope">
                        <el-link :href="scope.row.report_url" target="_blank">{{scope.row.report_url}}</el-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="修改实验" name="third">
                  <el-form :model="project_form" :rules="project_rules" :label-position="top" label-width="80px">
                    <el-form-item label="实验标题" prop="title">
                      <el-input v-model="project_form.title" autocomplete="off" placeholder="请输入实验标题"></el-input>
                    </el-form-item>
                    <el-form-item label="实验描述" prop="content">
                      <el-input v-model="project_form.content" autocomplete="off" placeholder="请输入实验描述"></el-input>
                    </el-form-item>
                    <el-form-item label="截止日期" prop="deadLine" >
                      <el-input v-model="project_form.deadLine" autocomplete="off" placeholder="请输入实验截止日期"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件" prop="attachmentUrl" style="margin-top: 40px">
                      <UploadRar v-on:getUrl = "getProjectUploadUrl"></UploadRar>
                    </el-form-item>
                  </el-form>
                  <el-button type="danger" @click="modify">确认修改</el-button>
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
import ProjectContent from "./ProjectContent.vue";
import UploadRar from "../common/UploadRar.vue";
import {ElMessage} from "element-plus";
export default {
name: "TeacherProjectDetail",
  components:{ProjectContent,UploadRar},
  data(){
  return{
    title:'',
    dead_line:'',
    attachmentUrl:'',
    description:'',
    created_at:'',

    lab_id:'',

    activeName:'first',

    project_form:{
      title:'',
      content: '',
      attachmentUrl:'',
      deadLine:'',
    },
    project_rules: {
      title:[
        { required: true, message: '请输入实验标题', trigger: 'blur' },
      ],
      content:[
        { required: true, message: '请输入实验描述', trigger: 'blur' },
      ],
    },

    homework_records:[
      {
        user_id:'001',
        real_name:'王小明',
        num:'123',
        report_url:'http://www.baidu.com',
        finish_stat:0,
        coding_time:123,
      }
    ]
    }
  },
  mounted() {
    this.lab_id = this.$route.params.id
    this.axios({
      method: "get",
      url: "/web/lab/"+this.lab_id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.title = res.data.data.title;
      this.created_at = res.data.data.created_at;
      this.dead_line = res.data.data.dead_line == null ? '无' : res.data.dead_line;
      this.description = res.data.data.content;
      this.attachmentUrl = res.data.data.attachmentUrl;
      this.project_form.title = this.title;
      this.project_form.dead_line = this.dead_line;
      this.project_form.content = this.description;
      this.project_form.attachmentUrl = this.attachmentUrl;
    });
  },
  methods:{
    getProjectUploadUrl(url){
      this.project_form.attachmentUrl = url;
    },
    modify(){
      let that = this
      this.axios({
        method: "put",
        url: "/web/lab",
        data: {
          labId:that.lab_id,
          title:that.project_form.title,
          content:that.project_form.content,
          attachmentUrl:that.project_form.attachmentUrl,
          deadLine:that.project_form.deadLine,
        },
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '修改成功！',
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
  }
}
</script>

<style scoped>
#teacher-project-detail {
  width: 100%;
}

#body {
  width: 100%;
}

#user-operation {
  margin-top: 20px;
  height: auto;
  width: 100%;
  background-color: #FFFFFF;
}
</style>