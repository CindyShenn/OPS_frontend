<template>
  <div class="pagination" style="margin-top: 20px">
    <el-pagination
        @current-change="handleCurrentChange"
        v-model:currentPage="current_page"
        :page-size="20"
        layout="total, prev, pager, next"
        :total=total>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['total'],
  data(){
    return{
      current_page:1,
    }
  },
  methods:{
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit('page',val)
    }
  }
}
</script>

<style scoped>

</style>