<template>
  <div class="quick-check-code flex flex-row" style="width: 100%;height: 100%">
    <div class="tree" style="width: 30%">
      <el-tree :data="dealData([],fileNode)" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="content flex" style="width: 70%;background-color: #dd6161;padding: 10px">
      {{current_content}}
    </div>
  </div>
</template>

<script>

export default {
  name: "test",
  data() {
    return {
      fileNode:{
        Name:'name1',
        IsDir:true,
        Content:'content1',
        ChildNode:[{
          Name:'name2',
          IsDir:false,
          Content:'content2',
          ChildNode: {}
        },
          {
            Name:'name3',
            IsDir:false,
            Content:'content3',
            ChildNode: {}
          }
        ]
      },
      content:{},
      current_content:'暂无数据',
      finalData:[]
      }
  },
  methods:{
    dealData(data,fileNode){
      let temName = fileNode.Name
      this.content[temName] = fileNode.Content
      if(fileNode.IsDir == false){
        let tree0 = {label:temName}
        data.push(tree0)
        return data
      }
      else{
        let children = []
        for(let num in fileNode.ChildNode){
          let child = []
          child = this.dealData(child,fileNode.ChildNode[num])
          children.push(child[0])
        }
        let tree1 = {
          label:temName,
          children:children
        }
        data.push(tree1)
        return data
      }
    },
    handleNodeClick(data){
      console.log(data)
      console.log(this.content[data.label])
      this.current_content = this.content[data.label]
    }
  },

  mounted() {
    this.finalData = this.dealData([],this.fileNode)
    let temp = this.finalData
    console.log('final',temp)
    console.log('content',this.content)
  }

}
</script>

<style scoped>
.v-chart {
  height: 400px;
  width: 100%;
}
</style>