<template>
  <div>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>

import {ref} from "@vue/reactivity";

export default {
  name: "test",
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
    }
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/web/coding_time",
      data: {},
    }).then((res) => {
      this.getData(res.data.data.coding_time)
      console.log(res);
    });
    const option ={
      visualMap: {
        show: false,
        min: 0,
        max: 10000
      },
      calendar: {
        range: '2021'
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.data,
      }
    };
    this.option = option;
  }
}
</script>

<style scoped>
.chart {
  height: 400px;
  width: 100%;
}
</style>