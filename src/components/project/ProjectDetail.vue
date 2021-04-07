<template>
  <div id="project-detail">
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <ProjectContent
            :title="title"
            :created_at="created_at"
            :dead_line="dead_line"
            :description="description"
            :attachment-url="attachmentUrl">
          </ProjectContent>
          <div id="enter-and-upload" class="flex flex-row justify-between">
            <div id="enter-project" class="flex flex-column">
              <div class="my-title">进入实验</div>
              <div class="flex justify-center align-center" style="height: 100%;width: 100%">
                <el-button type="primary" @click="enterIDE">进入实验</el-button>
              </div>
            </div>
            <div id="upload-report" class="flex flex-column">
              <div class="my-title">提交实验报告</div>
              <div class="flex justify-center align-center" style="height: 100%;width: 100%">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="uploadUrl"
                    :headers="headers"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :auto-upload="false"
                    name="pdf"
                    multiple
                >
                  <template #trigger>
                    <el-button type="primary">上传</el-button>
                  </template>
                  <el-button style="margin-left: 10px;" type="success" @click="submitUpload">提交报告</el-button>
                  <template #tip>
                    <div class="el-upload__tip">只能上传 pdf 文件，且不超过 2M</div>
                  </template>
                </el-upload>
              </div>
            </div>
          </div>
          <span class="my-title" style="margin-top: 30px">实验评论&nbsp;（{{total}}&nbsp;条）</span>
          <div id="comment">
            <div id="add-comment">
              <div style="padding: 20px">
                <div style="text-align: left">我也评论一下</div>
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="commentText"
                    maxlength="150"
                    show-word-limit
                    autosize
                    rows="10"
                    style="margin-top: 10px"
                >
                </el-input>
                <div class="flex justify-flex-end">
                  <el-button type="primary" style="margin-top: 10px" @click="makeComment">提交</el-button>
                </div>

              </div>
            </div>
            <div v-for="(item, index) in records" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 10px">
              <div class="each-lesson">
                <div class="flex flex-row line">
                  <div class="each-lesson-img">
                    <el-image :src="item.comment.user_avatar_url" style="width: 100%; height: 100%" fit="cover">
                      <template #placeholder>
                        <div class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                      </template>
                    </el-image>
                  </div>
                  <div class="each-lesson-info flex flex-column">
                    <div class="user-info flex flex-row align-center" style="height: 20%">
                      <div style="text-align: left;font-size: 20px;font-weight: 600;;color: #606266;">{{item.comment.username}}</div>
                    </div>
                    <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%;margin-top: 10px">
                      {{ item.comment.comment_text }}
                    </div>
                    <div class="lesson-detail flex flex-row align-end justify-between" style="height: 20%;font-size: 8px;color: #606266;">
                      <div class="lesson-detail-content">评论时间：{{item.comment.created_at}}</div>
                      <div class="lesson-detail-content">更新时间：{{item.comment.updated_at}}</div>
                      <div><el-button type="text" style="padding: 0px;min-height:0px" @click="dialogFormVisible = true">回复</el-button>
                        <el-dialog title="回复此评论" v-model="dialogFormVisible">
                          <el-input
                              type="textarea"
                              placeholder="请输入内容"
                              v-model="commentTextTemp"
                              maxlength="150"
                              show-word-limit
                              autosize
                              rows="10"
                              style="margin-top: 10px"
                          >
                          </el-input>
                          <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
                          </template>
                        </el-dialog>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="reply" class="flex flex-column">
                  <div v-for="(item1, index) in item.reply_comments" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 10px">
                    <div class="line each-reply">
                      <div class="flex flex-row">
                        <div class="each-reply-img">
                          <el-image :src="item1.user_avatar_url" style="width: 100%; height: 100%" fit="cover">
                            <template #placeholder>
                              <div class="image-slot">
                                加载中<span class="dot">...</span>
                              </div>
                            </template>
                          </el-image>
                        </div>
                        <div class="each-reply-item flex flex-column">
                          <div class="user-info flex flex-row align-center" style="height: 30%">
                            <div style="text-align: left;font-size: 15px;font-weight: 600;">{{item1.username}}</div>
                            <div style="text-align: left;font-size: 12px;margin-left: 15px">(用户id:{{item1.user_id}})</div>
                          </div>
                          <div class="reply-comment" style="text-align: left;color: #504d5f;font-size: 8px;height: 40%;width: auto;word-wrap:break-word">
                            {{item1.comment_text}}
                          </div>
                          <div class="reply-time" style="height: 30%;font-size: 6px;width: auto;text-align: left">
                            {{item1.created_at}}
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
import {ElMessage} from "element-plus";
import store from "../../store";
import ProjectContent from "./ProjectContent.vue";

export default {
name: "ProjectDetail",
  components:{ProjectContent},
  data(){
  return{
    title:'',
    created_at:'',
    dead_line:'',
    description:'',
    attachmentUrl:'',
    lab_id:'',
    total:'0',
    records :[],
    commentTextTemp:'',
    commentText:'',
    fileList:[],
    fileUrl:'',
    fileName:'',
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
    });
    this.axios({
      method: "get",
      url: "/web/comment/lab",
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
  },
  methods:{
  enterIDE(){
    let that = this
    this.axios({
      method: "post",
      url: "/web/ide",
      data: {
        labId: that.lab_id,
      },
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        if (res.data.code == 0) {
          let url = "http://"+res.data.data.url
          console.log(url)
          // this.$router.push({
          //   name:"CurrentIDE",
          //   //这里的params是一个对象，id是属性名，item.id是值(可以从当前组件或者Vue实例上直接取)
          //   params:{url:url}
          // })
          let { href } = this.$router.resolve({
            path: '/current_ide',
            query: {
              url:url,
              labId: that.lab_id,
            }
          });
          window.open(href,'_blank');
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.fileName=file.name;
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(res) {
      console.log(res)
      ElMessage.success({
        message: '实验报告上传成功！',
        type: 'success'
      });
      this.fileUrl = 'http://'+res.data.url;
      console.log(this.fileUrl)
      let that = this
      this.axios({
        method: "post",
        url: "/web/summit/report",
        data: {
          reportUrl: this.fileUrl,
          labId:this.lab_id,
        },
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '实验报告上传成功！',
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
    },
    beforeUpload(file) {
      console.log('beforeupload')
      const isPDF = file.type === 'application/pdf';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPDF) {
        this.$message.error('只能上传PDF格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isPDF && isLt2M;
    },

    makeComment(){
      let that = this
      this.axios({
        method: "post",
        url: "/web/comment/lab",
        data: {
          courseId: that.$route.params.id,
          commentText: that.commentText,
          replyId:0,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '评论成功！',
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
        that.commentText = ''
      });
    }
  },
  computed: {
    // 设置请求头
    headers() {
      return {
        // 设置Content-Type类型为multipart/form-data
        'ContentType': 'multipart/form-data',
        // 设置token
        'Authorization':'Bearer '+ store.state.token
      }
    },
    // 设置上传地址
    uploadUrl() {
      // baseURL是axios的基本路径
      return this.axios.defaults.baseURL + '/web/upload/pdf'
    }
  },
}
</script>

<style scoped>
#project-detail{
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
  text-align: left;
  font-size: 30px;
  font-weight: 600;
}
.info{
  text-align: left;
  color: #606266;
  font-size: 15px;
  margin-top: 10px;
}
.description{
  text-align: left;
  margin-top: 10px;
}
.url{
  margin-top: 10px;
}
#enter-and-upload{
  width: 100%;
  height: auto;
  margin-top: 30px;
}
#enter-project {
  width: 50%;
  height: 150px;
  background: #FFFFFF;
  padding: 25px;
  margin-right: 10px;
}
#upload-report{
  height: auto;
  background: #FFFFFF;
  padding: 25px;
}
#comment{
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
  margin-top: 20px;
}
#add-comment{
  width: 100%;
  height: auto;
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
  height: 40px;
  width: 40px;
}
.each-reply-item{
  margin-left: 30px;
  width: auto;
  height: auto;
}
.each-lesson {
  height: auto;
  width: 90%;
  background: #FFFFFF;
  padding: 25px;
}
.each-lesson-img {
  height: 80px;
  width: 80px;
  background: #002d54;
}
.each-lesson-info {
  height: 100px;
  width:calc(100% - 180px);
  margin-left: 30px;
}

.lesson-detail-content{
  width: 40%;
  text-align: left;
}
</style>