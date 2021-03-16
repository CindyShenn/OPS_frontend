<template>
  <div id="project-detail">
    <div id="body" class="flex justify-center align-center">
      <div class="container">
        <div id="section" class="flex flex-column align-center justify-center">
          <div id="content">
            <div class="flex flex-column" style="padding: 20px">
              <div class="title">
                {{title}}
              </div>
              <div class="info flex align-center">
                创建时间：{{created_at}} &emsp;截止日期：{{dead_line}}
              </div>
              <div class="description">
                {{description}}
              </div>
              <div class="url">
                <div v-if="attachmentUrl" style="text-align: left;margin-top: 20px">资源链接：<el-link href="attachmentUrl" target="_blank">{{attachmentUrl}}</el-link></div>
              </div>
            </div>
          </div>
          <div id="enter-and-upload" class="flex flex-row justify-between">
            <div id="enter-project" class="flex flex-column">
              <div class="my-title">进入实验</div>
              <div class="flex justify-center align-center" style="height: 100%;width: 100%">
                <el-button type="primary">进入实验</el-button>
              </div>
            </div>
            <div id="upload-report" class="flex flex-column">
              <div class="my-title">提交实验报告</div>
              <div class="flex justify-center align-center" style="height: 100%;width: 100%">
                <el-button type="primary">提交报告</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "ProjectDetail",
  data(){
  return{
    title:'project',
    created_at:'2021.2.3',
    dead_line:'无',
    description:'非常好的实验',
    attachmentUrl:'www.baidu.com',
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
  width: 50%;
  height: 150px;
  background: #FFFFFF;
  padding: 25px;
}
</style>