<template>
  <div id="teacher-lesson-detail" class="flex justify-center">
    <div id="body">
      <el-tabs :tab-position="tabPosition" stretch style="height: auto;font-size: 30px">
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px"> 课程信息</span>
          </template>
          <div style="padding: 0px 120px;">
            <div class="flex flex-column justify-start"  style="background-color: #FFFFFF;padding: 30px">
              <div class="flex flex-row each-item" style="margin-top: 0px">
                <div class="flex align-center" style="text-align: center;">课程封面:</div>
                <div class="each-item-content" style="margin-left: 50px;cursor:pointer" onclick="location.href='/project'">
                  <el-image
                      style="width: 200px; height: 200px;margin-left: 110px"
                      :src="src"
                      :fit="cover"></el-image>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name">课程ID:</div>
                <div class="each-item-content">
                  {{ id }}
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name">课程名:</div>
                <div class="each-item-content ">
                  {{ name }}
                </div>
                <div class="button">
                  <el-button type="primary">修改</el-button>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name" style="text-align: center;align-self: flex-end">选课密码:</div>
                <div class="each-item-content">
                  {{ password }}
                </div>
                <div class="button">
                  <el-button type="primary">修改</el-button>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name" style="text-align: center;align-self: flex-end">是否关闭:</div>
                <div class="each-item-content">
                  {{ is_close }}
                </div>
                <div class="button">
                  <el-button type="primary">修改</el-button>
                </div>
              </div>
              <div class="flex flex-row each-item">
                <div class="flex align-center each-item-name" style="text-align: center;align-self: flex-end">课程描述:</div>
                <div class="each-item-content align-center" style="font-size: 15px;word-wrap:break-word;height: auto ">
                  {{ description }}
                </div>
                <div class="align-center flex button">
                  <el-button type="primary" style="align-items: center">修改</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">课程签到</span>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">课程实验</span>
          </template>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">学生管理</span>
          </template>
          <div>
            <div class="flex justify-between" style="width: 100%">
              <div>
                <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">添加学生</el-button>
                <el-button plain icon="el-icon-plus" @click="dialogFormVisible = true">导入学生列表</el-button>
              </div>
              <div style="width: 200px">
                <el-input
                    width="200px"
                    placeholder="搜索课程"
                    prefix-icon="el-icon-search"
                    v-model="search">
                </el-input>
              </div>
            </div>
          </div>
          <div style="margin-top: 30px">
            <el-table
                :data="student_record"
                style="width: 100%">
              <el-table-column
                  prop="user_id"
                  label="学生编号">
              </el-table-column>
              <el-table-column
                  prop="email"
                  label="邮箱地址">
              </el-table-column>
              <el-table-column
                  label="昵称"
                  prop="nick_name">
              </el-table-column>
              <el-table-column
                  prop="real_name"
                  label="真实姓名">
              </el-table-column>
              <el-table-column
                  prop="major"
                  label="专业">
              </el-table-column>
              <el-table-column
                  prop="organization"
                  label="单位">
              </el-table-column>
              <el-table-column
                  label="操作">
                <template #default="scope">
                  <el-button @click="handleClick(scope.row)" type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span style="font-size: 15px">课程评论</span>
          </template>
          <div style="background-color: #FFFFFF;padding: 20px">
            <div style="font-size: 28px;text-align: left;font-weight: 400;width: 100%">课程评论</div>
            <div v-for="(item, index) in comments" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 40px">
              <div class="each-lesson ">
                <div class="flex flex-row line">
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
                    <div class="user-info flex flex-row align-center" style="height: 20%">
                      <div style="text-align: left;font-size: 20px;font-weight: 600;">{{item.nick_name}}</div>
                      <div style="text-align: left;font-size: 15px;margin-left: 15px">(用户id:{{item.user_id}})</div>
                    </div>
                    <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                      {{ item.comment }}
                    </div>
                    <div class="lesson-detail flex flex-row align-end justify-between" style="height: 20%;font-size: 8px">
                      <div class="lesson-detail-content">评论时间：{{item.created_at}}</div>
                      <div class="lesson-detail-content">更新时间：{{item.updated_at}}</div>
                    </div>
                  </div>
                </div>
                <div id="reply" class="flex flex-column">
                  <div v-for="(item, index) in comments" class="flex flex-column align-center justify-center" style="width: 100%;margin-top: 10px">
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
                            <div style="text-align: left;font-size: 15px;font-weight: 600;">{{item.nick_name}}</div>
                            <div style="text-align: left;font-size: 12px;margin-left: 15px">(用户id:{{item.user_id}})</div>
                          </div>
                          <div class="reply-comment" style="text-align: left;color: #504d5f;font-size: 8px;height: 40%;width: auto;word-wrap:break-word">
                            {{reply-comment}}
                          </div>
                          <div class="reply-time" style="height: 30%;font-size: 8px;width: auto;text-align: left">
                            {{reply-time}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
export default {
  name: "TeacherLessonDetail",
  data() {
    return {
      url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      tabPosition: 'left',
      name: 'c++ 基础课程',
      id: '12344',
      password: 'abser213123sdf',
      is_close: '是',
      created_at:'',
      teacher_name:'',
      description: '这是c++的基础课程，在本次课程里我们将学习c++的语法和基本应用',
      tableData: [{
        user_id:'0001',
        email:'12345@qq.com',
        nick_name:'cindy',
        real_name:'王小明',
        gender:'男',
        major:'计算机科学',
        organization:'华南师范大学'
      }, ],
      student_record:[],
      comments:[
        {
          nick_name:'cindy',
          user_id:'00002',
          comment:'这个课非常好，老师讲得很棒',
          created_at:'2020.9.1',
          updated_at:'2020.9.1',
        },
        {
          nick_name:'cindy',
          user_id:'00002',
          comment:'这个课非常好，老师讲得很棒',
          created_at:'2020.9.1',
          updated_at:'2020.9.1',
        },
        {
          nick_name:'cindy',
          user_id:'00002',
          comment:'这个课非常好，老师讲得很棒',
          created_at:'2020.9.1',
          updated_at:'2020.9.1',
        },
      ]
    };
  },
  mounted() {
    this.course_id = this.$route.params.id
    this.axios({
      method: "get",
      url: "/web/course/"+this.$route.params.id,
      params: {},
    }).then((res) => {
      console.log(res)
      this.name = res.data.data.course_name;
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
      url: "web/course/student/"+this.$route.params.id,
      params: {
      },
    }).then((res) => {
      console.log(res)
      this.student_record = res.data.data.records;
      this.total = res.data.data.page_info.total;
      console.log(this.total)
      console.log(this.records)
    });
  },
}
</script>

<style scoped>
#teacher-lesson-detail {
  height: 100%;
  width: 100%;
}

#body {
  height: auto;
  width: 80%;
  padding: 30px;
}

.each-item {
  margin-top: 40px;
  font-size: 20px;
}

.each-item-name {
  text-align: center;
  align-self: flex-end;
  width: 150px;
}

.each-item-content {
  margin-left: 60px;
  align-self: flex-end;
  color: #606266;
  width: 250px;
}

.button{
  margin-left: 90px
}

.el-tab-pane{
  padding:30px
}
.line {
  border-bottom: 1px solid #dcdfe6;
}

.each-lesson {
  height: auto;
  width: 80%;
  background: #FFFFFF;
  padding: 25px;
}
.each-lesson-img {
  height: 120px;
  width: 120px;
  background: #002d54;
}
.each-lesson-info {
  height: 150px;
  width:calc(100% - 180px);
  margin-left: 30px;
}

.lesson-detail-content{
  width: 50%;
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
  height: 65px;
  width: 65px;
}
.each-reply-item{
  margin-left: 30px;
  width: auto;
}
</style>