<template>
  <div>
    <CodingTimeTable :table_data="data"></CodingTimeTable>
  </div>
</template>

<script>

import CodingTimeTable from "./user/CodingTimeTable.vue";
export default {
  name: "test",
  components:{CodingTimeTable},
  data() {
    return {
      data: [],
      option : {
      }
    }
  },
  methods:{
    getData(dataArray){
      for (let num in dataArray){
        let eachData = dataArray[num]
        let eachDay = [eachData.date,eachData.time]
        this.data.push(eachDay)
      }
      console.log(this.data)
    },
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/web/coding_time",
      data: {},
    }).then((res) => {
      //this.getData(res.data.data.coding_time)
      this.data = res.data.data.coding_time
      console.log(res);
    });
  }
}
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>