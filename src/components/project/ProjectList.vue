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
                创建时间：{{Day(item.created_at)}} &emsp;截止日期：{{item.updated_at}} &emsp;<el-tag type="danger">{{item.is_finished == true ? '已完成':'未完成'}}</el-tag>
              </div>
            </div>
            <el-button type="primary" style="margin-bottom: 10px" @click="redirectProject(item.lab_id)">进入实验</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils.ts"
export default {
name: "ProjectList",
  props:["project_records",],
  methods:{
    Day(time){
      return getDay(time)
    },
    redirectProject(id){
      this.$router.push({ path:`/project_detail/${id}`})
    },
  }
}
</script>

<style scoped>

</style>