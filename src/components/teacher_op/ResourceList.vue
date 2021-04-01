<template>
  <div id="resource">
    <el-empty v-if="resource_records==null" description="该课程还没有公告哦，赶紧创建一个吧~">
    </el-empty>
    <div v-for="(item, index) in resource_records" style="width: 100%;" class="line">
      <div class="flex flex-column single-resource">
        <div class="my-title">{{item.title}}</div>
        <div class="resource-content" style="text-align: left;margin-top: 20px">
          {{item.content}}
        </div>
        <div v-if="item.url" style="text-align: left;margin-top: 20px">资源链接：<el-link href="https://element.eleme.io" target="_blank">{{item.url}}</el-link></div>
        <div class="date-and-op flex flex-row justify-between">
          <div class="resource-date info" style="margin-top: 20px">
            公告时间： {{date}}
          </div>
          <div class="operation flex">
            <el-button type="primary">修改</el-button>
            <el-button type="danger">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils.ts"
export default {
name: "ResourceList",
  props:['resource_records'],
  methods:{
    Day(time){
      return getDay(time)
    },
  }
}
</script>

<style scoped>
.info{
  height: 20%;
  text-align: left;
  color: #606266;
  font-size: 15px;
}
#resource{
  width: 100%;
  height: auto;
  margin-top: 30px;
  background: #FFFFFF;
}
.single-resource{
  padding: 25px;
}
</style>