<template>
  <div style="padding: 20px">
    <v-chart class="chart" :option="getData(table_data)" autoresize="true" />
  </div>
</template>


<script>
import VueECharts from 'vue-echarts';

export default {
name: "CodingTimeTable",
  props:['table_data'],
  components: {
    'v-chart': VueECharts
  },
  data(){
  return {
    option:'',
  }
  },
  methods:{
    getData(dataArray){
      console.log(dataArray)
      let final_data = []
      for (let num in dataArray){
        let eachData = dataArray[num]
        let eachDay = [eachData.date,eachData.time]
        final_data.push(eachDay)
      }
      let option ={
        visualMap: {
          type: 'piecewise',
          min: 0,
          max: 360,
          orient: "horizontal",
          left: "center",
          inRange: {
            color: ['#8bb9d0', '#002d54']
          },
          top:180
        },
        calendar: {
          range: '2021',
          yearLabel: {
            show: false
          },
          dayLabel: {
            nameMap: 'cn' // 从周一开始
          },
          monthLabel: {
            nameMap: 'cn' // 从周一开始
          },
          top: 30,
          left: 30,
          right: 30,
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: final_data,
        },
      };
      console.log(final_data)
      return option
    }
  },

}
</script>

<style scoped>
.chart {
  height: 200px;
  width: 100%;
}
</style>