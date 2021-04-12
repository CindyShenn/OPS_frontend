<template>
  <div>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>

export default {
  name: "test",
  components: {
    'v-chart': VueECharts
  },
  data() {
    return {
      orgOptions: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }}
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
.v-chart {
  height: 400px;
  width: 100%;
}
</style>