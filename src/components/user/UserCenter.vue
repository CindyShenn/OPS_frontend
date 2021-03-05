<template>
  <div id="user-center">
    <div id="body" class="flex align-center justify-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <span class="my-title">我的主页</span>
          <div id="user-info">
            <div class="flex flex-row" style="margin: 20px">
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
                  <div class="nick_name flex align-end">
                    {{ nick_name }}
                  </div>
                  <div style="margin-left: 20px;" class="flex align-center">
                    <el-button type="text" icon="el-icon-edit-outline" style="font-size: 15px;padding: 0px" @click="redirect('user_info')">编辑个人信息
                    </el-button>
                  </div>
                </div>
                <div class="id">
                  用户id：{{ id }}&emsp;于&nbsp;{{ create_time }}&nbsp;加入
                </div>
              </div>
            </div>
          </div>
          <div id="user-operation">
            <div id="user-operation-content">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="我的课程" name="first">
                  <div id="lesson-list"  style="width: 100%">
                    <div v-for="(item, index) in lessons" class="flex flex-column align-center justify-center line" style="width: 100%;margin: 0px">
                      <div class="each-lesson flex flex-row" onclick="location.href='/project'" style="cursor:pointer">
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
                            <div style="text-align: left;font-size: 30px;font-weight: 600;">{{item.title}}</div>
                            <div style="text-align: left;font-size: 20px;margin-left: 15px">(课程id:{{item.id}})</div>
                          </div>
                          <div class="lesson-description" style="text-align: left;color: #504d5f;font-size: 15px;height: 40%">
                            Demo description
                          </div>
                          <div class="lesson-detail flex flex-row align-end justify-between" style="height: 30%">
                            <div class="lesson-detail-content">开课时间：{{item.created_at}}</div>
                            <div class="lesson-detail-content">是否结课：{{item.is_close}}</div>
                            <div class="lesson-detail-content">更新时间：{{item.updated_at}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="我的实验" name="second">
                  <div style="margin-bottom: 20px">
                    <el-button type="primary" @click="redirect('project')">查看我的实验</el-button>
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
export default {
  name: "UserCenter",
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      nick_name: 'bug生成器',
      id: '00123',
      create_time: '2020.9.2',
      activeName: 'first',
      lessons:[
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
        {
          title: "Title",
          id:"123456",
          created_at:"2020.9.1",
          updated_at:"2020.9.1",
          pic_url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          is_close:"否"
        },
      ],
    }
  },
  methods:{
    redirect(url){
      this.$router.push({ path:url})
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

.nick_name {
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
</style>