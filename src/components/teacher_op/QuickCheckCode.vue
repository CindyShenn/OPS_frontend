<template>
  <div class="quick-check-code flex flex-row">
    <div class="tree" style="width: 30%">
      <el-tree :data="fileNode" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="content flex">
      <pre>{{current_content}}</pre>
    </div>
  </div>
</template>

<script>
export default {
name: "QuickCheckCode",
  props:['fileNode','content'],
  data() {
    return {
      current_content:'请点击文件名查看',
    }
  },
  methods:{
    handleNodeClick(data){
      console.log(data)
      console.log(this.content[data.label])
      this.current_content = this.content[data.label]
    }
  },

}
</script>

<style scoped>
.quick-check-code{
  width: 100%;
  height: 100%
}
.content{
  width: 70%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px

}
</style>