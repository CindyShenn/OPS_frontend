<template>
  <div id="content">
    <div class="flex justify-start" style="width: 100%">
      <span class="my-title" style="margin-top: 20px;margin-left: 20px">课程详情</span>
    </div>
    <div class="flex flex-row" style="padding: 20px">
      <div class="lesson-img">
        <el-image :src="src" style="width: 100%; height: 100%" fit="cover">
          <template #placeholder>
            <div class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </template>
        </el-image>
      </div>
      <div class="detail flex flex-column">
        <div class="title">
          {{title}}
        </div>
        <div class="info flex align-center">
          开课时间: {{getDay}}&emsp;是否结课：<el-tag>{{is_closed}}</el-tag>
        </div>
        <div class="description">
          {{description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "LessonContent",
  props:['title','teacher_name','created_at','is_closed','description','src'],
  filters: {
    getDay(time) {
      if (!time) {
        console.log('day')
        return ''
      }
      let time_str = String(time)
      let day = time_str.trim().split(/\s+/)
      console.log('day')
      return day[0]
    }
  },
  computed:{
    getDay() {
      let time = this.created_at
      if (!time) {
        return ''
      }
      let day = time.trim().split(/\s+/)[0]
      return day
    }
  }
}
</script>

<style scoped>
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
</style>