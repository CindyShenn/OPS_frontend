<template>
  <div id="lesson_detail" >
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span class="my-title">课程详情</span>
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
              <div class="each-lesson ">
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
                      <div style="text-align: left;font-size: 20px;font-weight: 600;">{{item.comment.username}}</div>
                      <div style="text-align: left;font-size: 15px;margin-left: 15px">(用户id:{{item.comment.user_id}})</div>
                    </div>
                    <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                      {{ item.comment.comment_text }}
                    </div>
                    <div class="lesson-detail flex flex-row align-end justify-between" style="height: 20%;font-size: 8px">
                      <div class="lesson-detail-content">评论时间：{{item.comment.created_at}}</div>
                      <div class="lesson-detail-content">更新时间：{{item.comment.updated_at}}</div>
                      <div><el-button type="text" style="padding: 0px;min-height:0px" @click="replyDialog(item.comment.course_comment_id)">回复</el-button>
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
      <el-button type="primary" @click="makeReply()">确 定</el-button>
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

export default {
name: "LessonDetail",
  data(){
  return{
    title:'c++基础课程',
    teacher_name:'王小明',
    created_at:'2020.9.2',
    is_closed:'是',
    description:'c++是一门基础的编程语言，从这门课程里，你将学习到c++的基础知识，并通过实践巩固理论。',
    src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    total:0,
    records:[],
    resource_records:[],
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
  makeComment(){
    let that = this
    this.axios({
      method: "post",
      url: "/web/comment/course",
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
  },
    makeReply(){
      let that = this
      that.dialogFormVisible = false;
      this.axios({
        method: "post",
        url: "/web/comment/course",
        data: {
          courseId: that.$route.params.id,
          commentText: that.commentTextTemp,
          replyId:that.currentReply,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          if (res.data.code == 0) {
            ElMessage.success({
              message: '回复成功！',
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