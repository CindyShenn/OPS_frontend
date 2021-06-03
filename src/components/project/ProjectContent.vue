<template>
  <div id="content">
    <div class="flex flex-column" style="padding: 20px">
      <div class="title">
        {{title}}
      </div>
      <div class="info flex align-center">
        创建时间：{{Day(created_at)}} &emsp;截止日期：{{dead_line == null}}
      </div>
      <div class="description">
        {{description}}
      </div>
      <div class="url">
        <div v-if="attachmentUrl" style="text-align: left;margin-top: 20px">资源链接：<el-link href="attachmentUrl" target="_blank">{{attachmentUrl}}</el-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils.ts"
export default {
name: "ProjectContent",
  props:["title","created_at","description","attachmentUrl","dead_line"],
  methods: {
    Day(time) {
      return getDay(time)
    },
  },
}
</script>

<style scoped>
#content{
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
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
</style>