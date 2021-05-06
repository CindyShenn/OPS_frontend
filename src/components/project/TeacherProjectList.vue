<template>
  <div id="lesson-projects">
    <div id="project-list">
    <el-empty v-if="project_records==''" description="该课程还没有实验哦，赶紧创建一个吧~">
    </el-empty>
    <div v-for="(item, index) in project_records" style="width: 100%;" class="line">
      <div id="single-project" class="flex flex-column align-start">
        <div class="flex flex-column align-start justify-between"
             style="margin-top: 15px;margin-left: 15px;height: 100%;width: 90%">
          <span style="font-size: 25px;font-weight:600">{{ item.title }}</span>
          <span style="font-size: 15px;text-align: left">{{ item.content }}</span>
          <div class="flex justify-between" style="width: 100% ;margin-bottom: 10px;margin-top: 10px">
            <div class="project-detail flex align-center justify-center ">
              <div>
                创建时间：{{Day(item.created_at)}} &emsp;截止时间：{{item.dead_line}}
              </div>
            </div>
            <el-button type="primary" style="margin-bottom: 10px" @click="redirectProject(item.lab_id)">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils.ts"
export default {
name: "TeacherProjectList",
  props:["project_records",],
  methods:{
    Day(time){
      return getDay(time)
    },
    redirectProject(id){
      this.$router.push({ path:`/teacher_project_detail/${id}`})
    },
  }
}
</script>

<style scoped>
#lesson-projects{
  background: #FFFFFF;
}
#single-project {
  height: 150px;
  background: #FFFFFF;
}
#single-project {
  height: 150px;
  background: #FFFFFF;
}
#lesson-projects{
}
.project-detail{
  color: #606266;
  font-size: 15px;
}
</style>