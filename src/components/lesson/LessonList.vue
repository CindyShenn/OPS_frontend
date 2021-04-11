<template>
  <div id="lesson-list" style="width: 100%">
    <div v-for="(item, index) in lessons" class="flex flex-column align-center justify-center line"
         style="width: 100%;margin: 0px">
      <div class="each-lesson flex flex-row" v-on:click="redirectLesson(item.course_id)"
           style="cursor:pointer">
        <div class="each-lesson-img">
          <el-image :src="item.pic_url ? item.pic_url != null :src" style="width: 100%; height: 100%" fit="cover">
            <template #placeholder>
              <div class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </template>
          </el-image>
        </div>
        <div class="each-lesson-info flex flex-column">
          <div class="lesson-title flex flex-row align-center" style="height: 30%">
            <div style="text-align: left;font-size: 30px;font-weight: 600;">{{ item.course_name }}</div>
          </div>
          <div class="lesson-description"
               style="text-align: left;color: #504d5f;font-size: 15px;height: 40%;margin-top: 10px">
            任课教师：{{ item.teacher_name }}
          </div>
          <div class="lesson-detail flex flex-row align-end justify-between" style="height: 30%">
            <div class="lesson-detail-content">开课时间：{{ Day(item.created_at) }}</div>
            <div class="lesson-detail-content">是否结课：{{ isClosed(item.is_close) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getDay} from "../../utils/utils.ts"
export default {
name: "LessonList",
  props:['lessons'],
  data(){
  return{
    src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  }
  },
  methods:{
    Day(time) {
      return getDay(time)
    },
    redirectLesson(id) {
      this.$router.push({path: `/lesson_detail/${id}`})
    },
    isClosed(value) {
      return value == '2' ? '是' : '否'
    },
  },
}
</script>

<style scoped>
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
  width: calc(100% - 180px);
  margin-left: 30px;
}

.lesson-detail-content {
  width: 30%;
  text-align: left;
}
</style>