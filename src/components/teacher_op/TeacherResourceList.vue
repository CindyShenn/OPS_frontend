<template>
  <div id="resource">
    <el-empty v-if="resource_records==null" description="该课程还没有公告哦，赶紧创建一个吧~">
    </el-empty>
    <div v-for="(item, index) in resource_records" style="width: 100%;" class="line">
      <div class="flex flex-column single-resource">
        <div class="my-title">{{item.title}}</div>
        <div class="resource-content" style="text-align: left;margin-top: 20px;font-size: 15px">
          {{item.content}}
        </div>
        <div v-if="item.attachment_url" style="text-align: left;margin-top: 20px;font-size: 15px">资源下载：
          <el-button type="primary" @click="downloadResource(item.attachment_url)" size="mini">下载</el-button></div>
        <div class="date-and-op flex flex-row justify-between">
          <div class="resource-date info" style="margin-top: 20px;font-size: 15px">
            公告时间： {{item.created_at}}
          </div>
          <div class="operation flex">
            <el-button type="primary" size="medium" @click="handleModify(item.course_recourse_id)">修改</el-button>
            <el-dialog title="修改公告" v-model="newResourceFormVisible"  append-to-body="true" lock-scroll="true" modal="true">
              <el-form :model="resource_form" :rules="project_rules">
                <el-form-item label="公告标题" :label-width="formLabelWidth" prop="title">
                  <el-input v-model="resource_form.title" autocomplete="off" placeholder="请输入公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告详情" :label-width="formLabelWidth" prop="content">
                  <el-input v-model="resource_form.content" autocomplete="off" placeholder="请输入公告详情"></el-input>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth" prop="attachmentUrl" style="margin-top: 40px">
                  <UploadRar v-on:getUrl = "getResourceUploadUrl"></UploadRar>
                </el-form-item>
              </el-form>
              <template #footer>
    <span class="dialog-footer">
      <el-button @click="newResourceFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="modifyResource">确 定</el-button>
    </span>
              </template>
            </el-dialog>
            <el-button type="danger" size="medium" @click="deleteResource(item.course_recourse_id)">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils.ts"
import {ElMessage} from "element-plus";
import UploadRar from "../common/UploadAttachment.vue";
export default {
name: "TeacherResourceList",
  props:['resource_records'],
  components:{UploadRar},
  data(){
  return{
    newResourceFormVisible:false,
    resource_form:{
      title:'',
      content: '',
      attachmentUrl:'',
    },
    courseRecourseId:'',

    project_rules: {
      title:[
        { required: true, message: '请输入实验标题', trigger: 'blur' },
      ],
      content:[
        { required: true, message: '请输入实验描述', trigger: 'blur' },
      ],
    },

    formLabelWidth: '80px',
  }
  },
  methods:{
    Day(time){
      return getDay(time)
    },

    getResourceUploadUrl(url){
      console.log(url)
      this.resource_form.attachmentUrl = url;
    },

    downloadResource(url){
      window.open(url, '_blank')
    },

    handleModify(id){
      this.courseRecourseId = id;
      this.newResourceFormVisible = true;
    },

    deleteResource(id){
      let that = this
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: "delete",
          url: "/web/course/resource",
          data: {
            courseResourceId:id,
          },
        }).then((res) => {
          console.log(res)
          if (res.status == 200) {
            if (res.data.code == 0) {
              ElMessage.success({
                message: '删除成功！',
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    modifyResource(){
      let that = this
      that.newResourceFormVisible = false;
      this.axios({
        method: "put",
        url: "/web/course/resource",
        data: {
          courseRecourseId: that.courseRecourseId,
          title: that.resource_form.title,
          content:that.resource_form.content,
          attachmentUrl:that.resource_form.attachmentUrl,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '创建成功！',
              type: 'success'
            });
            this.reload()
          } else {
            let message = res.data.message;
            console.log(message)
            ElMessage.error(message);
          }
        } else {
          ElMessage.error('服务器错误');
        }
      });
    },
  }
}
</script>

<style scoped>
.info{
  height: 20%;
  text-align: left;
  color: #606266;
  font-size: 15px;
}
#resource{
  width: 100%;
  height: auto;
  margin-top: 15px;
  background: #FFFFFF;
}
.single-resource{
  padding: 25px;
}
</style>