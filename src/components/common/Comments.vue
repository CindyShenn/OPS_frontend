<template>
  <div id="comment">
    <div class="flex justify-start" style="width: 100%">
      <span class="my-title" style="margin-top: 20px;margin-left: 20px">课程评论&nbsp;（{{ total }}&nbsp;条）</span>
    </div>

  <div id="add-comment">
    <div style="padding: 20px">
      <div style="text-align: left;font-size: 20px">我也评论一下</div>
      <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="commentText"
          maxlength="150"
          show-word-limit
          rows="5"
          style="margin-top: 10px"
      >
      </el-input>
      <div class="flex justify-flex-end">
        <el-button type="primary" style="margin-top: 10px" @click="makeComment">提交</el-button>
      </div>

    </div>
  </div>
  <div v-for="(item, index) in records" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 10px">
    <div class="each-comment ">
      <div class="flex flex-row line">
        <div class="each-comment-img">
          <el-image :src="item.comment.user_avatar_url == 0 ? src: item.comment.user_avatar_url" style="width: 100%; height: 100%" fit="cover">
            <template #placeholder>
              <div class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </template>
          </el-image>
        </div>
        <div class="each-comment-info flex flex-column">
          <div class="user-info flex flex-row align-center" style="height: 20%">
            <div style="text-align: left;font-weight: 600;font-size: 20px">{{item.comment.username}}</div>
          </div>
          <div class="comment-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%;margin-top: 10px">
            {{ item.comment.comment_text }}
          </div>
          <div class="comment-detail flex flex-row align-end justify-between" style="height: 20%;font-size: 8px;color: #606266;">
            <div class="comment-detail-content">评论时间：{{item.comment.created_at}}</div>
            <div class="flex">
              <el-button type="text" style="padding: 0px;min-height:0px" @click="replyDialog(item.comment.course_comment_id)">回复</el-button>
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
              <div v-if="item.comment.user_id == user_id" style="margin-left: 10px"><el-button type="text" style="padding: 0px;min-height:0px" @click="makeDelete(item.comment.course_comment_id)">删除</el-button></div>
            </div>
          </div>
        </div>
      </div>
      <div id="reply" class="flex flex-column">
        <div v-for="(item1, index) in item.reply_comments" class="flex flex-column justify-start" style="width: 100%;margin-top: 10px">
          <div class="line each-reply">
            <div class="flex flex-row">
              <div class="each-reply-img">
                <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
                  <template #placeholder>
                    <div class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="each-reply-item flex flex-column">
                <div class="user-info flex flex-row align-center" style="height: 30%">
                  <div style="text-align: left;font-weight: 600;font-size: 20px">{{item1.username}}</div>
                  <i class="el-icon-caret-right" style="margin-left: 8px"></i>
                  <div style="text-align: left;font-weight: 600;margin-left: 8px;font-size: 20px">{{item1.reply_username}}</div>
                </div>
                <div class="reply-comment" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%;width: auto;margin-top:10px;color: #606266;word-wrap:break-word">
                  {{item1.comment_text}}
                </div>
                <div class="reply-content flex flex-row align-end justify-between" style="height: 30%;width: 100%">
                  <div class="reply-time" style="font-size: 8px;width: auto;text-align: left;color: #606266;">
                    评论时间：{{item1.created_at}}
                  </div>
                  <div class="flex"><el-button type="text" style="padding: 0px;min-height:0px" @click="replyDialog(item1.course_comment_id)">回复</el-button>
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
                    <div v-if="item1.user_id == user_id" style="margin-left: 10px"><el-button type="text" style="padding: 0px;min-height:0px" @click="makeDelete(item1.course_comment_id)">删除</el-button></div>
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
name: "Comments",
props:[
  'records',
  'user_id',
    'courseId',
    'total',

],
  data(){
  return{
    commentText:'',
    commentTextTemp:'',
    currentReply:'',
    src:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    dialogFormVisible: false,
  }
  },
  methods:{
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
          courseId: that.courseId,
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
          courseId: that.courseId,
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
    },
    makeDelete(comment_id){
      let that = this
      this.axios({
        method: "delete",
        url: "/web/comment/course",
        data: {
          commentId: comment_id,
        },
      }).then((res) => {
        console.log(res);
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
        that.commentText = ''
      });
    }
  }
}
</script>

<style scoped>
.each-comment {
  height: auto;
  width: 90%;
  background: #FFFFFF;
  padding: 15px;
}
.each-comment-img {
  height: 60px;
  width: 60px;
  background: #002d54;
}
.each-comment-info {
  height: 100px;
  width:calc(100% - 180px);
  margin-left: 30px;
}

.comment-detail-content{
  width: 40%;
  text-align: left;
}

#reply {
  height: auto;
  width: calc(100% - 120px);
  margin-left: 110px;
}
.each-reply {
  height: auto;
  padding: 5px;
  width: 100%;
}
.each-reply-img{
  height: 60px;
  width: 60px;
}
.each-reply-item{
  margin-left: 30px;
  width: calc(100% - 175px);
  height: 90px;
}
#comment{
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
  margin-top: 20px;
}
#add-comment{
  padding: 20px;
}
</style>