<template>
  <div id="lesson-projects">
    <div v-for="(item, index) in project_records" style="width: 100%;" class="line">
      <div id="single-project" class="flex flex-column align-start">
        <div class="flex flex-column align-start justify-between"
             style="margin-top: 15px;margin-left: 15px;height: 100%;width: 90%">
          <span style="font-size: 25px;font-weight:600">{{ item.title }}</span>
          <span style="font-size: 15px;text-align: left">{{ item.content }}</span>
          <div class="flex justify-between" style="width: 100% ;margin-bottom: 10px;margin-top: 10px">
            <div class="project-detail flex align-center justify-center ">
              <div>
                创建时间：{{ Day(item.created_at) }} &emsp;截止日期：{{ item.dead_line == null? "无": item.dead_line }} &emsp;<el-tag type="danger">
                {{ item.is_finished == true ? '已完成' : '未完成' }}
              </el-tag>
              </div>
            </div>
            <el-button type="primary" style="margin-bottom: 10px" @click="projectDetail(item)">进入实验</el-button>
            <el-drawer
                :title="current_title"
                v-model="drawer"
                :direction="direction"
                size="40%">
              <div class="drawer-content flex flex-column justify-between">
                <div class="flex flex-column">
                  <div class="my-title">实验描述</div>
                  <span style="font-size: 15px;text-align: left;margin-top: 20px">&nbsp;&nbsp;{{ current_content }}</span>
                </div>
                <div class="flex justify-center align-center flex-column">
                  <div id="enter-and-upload" class="flex flex-column">
                    <div id="enter-project" class="flex flex-column">
                      <div class="flex justify-center align-center flex-column" style="width: 100%">
                        <div class="my-title">开始实验</div>
                        <el-button type="primary" @click="enterIDE" style="margin-top: 40px">进入实验</el-button>
                      </div>
                    </div>
                    <div id="upload-report" class="flex flex-column align-center justify-center">
                      <div class="my-title">提交实验报告</div>
                      <div class="flex justify-center align-center" style="margin-top: 45px">
                        <UploadPdf v-on:getUrl = "getReportUploadUrl"></UploadPdf>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between" style="width: 100% ;margin-bottom: 10px;margin-top: 10px">
                  <div class="project-detail-drawer flex align-center justify-center ">
                    <div class="flex align-center justify-center">
                      创建时间：{{ Day(current_created_at) }} &emsp;截止日期：{{ current_dead_line == null? "无": current_dead_line }} &emsp;<el-tag type="danger">
                      {{ current_is_finished == true ? '已完成' : '未完成' }}
                    </el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-drawer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils.ts"
import UploadPdf from "../common/UploadPdf.vue";
import {ElMessage} from "element-plus";

export default {
  name: "ProjectList",
  components: {UploadPdf},
  props: ["project_records",],
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      uploadUrl:'',
      current_lab_id:'',
      current_title:'',
      current_content:'',
      current_is_finished:'',
      current_dead_line:'',
      current_created_at:'',
    }
  },
  methods: {
    Day(time) {
      return getDay(time)
    },
    redirectProject(id) {
      this.$router.push({path: `/project_detail/${id}`})
    },
    getReportUploadUrl(url){
      console.log(url)
      this.uploadUrl = url;
    },
    projectDetail(item){
      this.drawer = true;
      this.current_lab_id = item.lab_id;
      this.current_title = "实验："+item.title;
      this.current_content = item.content;
      this.current_is_finished = item.is_finished;
      this.current_dead_line = item.dead_line;
      this.current_created_at = item.created_at;
    },
    enterIDE(){
      let that = this;
      let {href} = this.$router.resolve({
        path: '/current_ide',
        query: {
          labId: that.current_lab_id,
        }
      });
      window.open(href, '_blank');
    },
  }
}
</script>

<style scoped>
#single-project {
  height: 150px;
  background: #FFFFFF;
}


#single-project {
  height: 150px;
  background: #FFFFFF;
}

#lesson-projects {
  padding: 0px 20px 20px 20px;
}

#upload-report{
  margin-top: 20px;
  height: 150px;
}

.project-detail {
  color: #606266;
  font-size: 15px;
}

.project-detail-drawer{
  color: #606266;
  font-size: 15px;
  width: 100%;
}

#enter-and-upload{
  width: 100%;
  padding: 20px;
}

#enter-project{
  width: 100%;
  height: 150px;
}

.drawer-content{
  height: 100%;
  padding: 20px;
}
</style>