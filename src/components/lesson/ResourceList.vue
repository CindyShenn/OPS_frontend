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
        <div v-if="item.attachment_url" style="text-align: left;margin-top: 20px">资源链接：
          <el-button type="primary" @click="downloadResource(item.attachment_url)">下载</el-button>
        </div>
        <div class="date-and-op flex flex-row justify-between">
          <div class="resource-date info" style="margin-top: 20px">
            公告时间： {{item.created_at}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils";

export default {
  name: "ResourceList",
  props: ['resource_records'],
  methods: {
    Day(time) {
      return getDay(time)
    },
    downloadResource(url){
      window.open(url, '_blank')
    }
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