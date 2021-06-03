<template>
  <div class="hello">
    <div class="map">
      <div id="my-chart" style="width: 100%; height: 400px;">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
name: "UserCenterCodingTime",
  data() {
    return {
      option: '',
      table_data:'',
    }
  },
  mounted() {
    this.getCodingTime()

  },

  methods: {
    // 获取编码时间
    getCodingTime(){
      let that = this
      this.axios({
        method: "get",
        url: "/web/coding_time",
        data: {},
      }).then((res) => {
        //this.getData(res.data.data.coding_time)
        that.table_data = res.data.data.coding_time
        console.log(res);
        this.echartInit(this.table_data)
      });
    },
    echartInit(dataArray) {
      //console.log('dataarray',dataArray)
      let final_data = []
      for (let num in dataArray){
        let eachData = dataArray[num]
        let eachDay = [eachData.date,eachData.time]
        final_data.push(eachDay)
      }
      console.log('final',final_data)
      let myChart = echarts.init(document.getElementById('my-chart'));
      // 指定图表的配置项和数据
      let option = {
        visualMap: {
          type: 'piecewise',
          min: 0,
          max: 360,
          orient: "horizontal",
          left: "center",
          inRange: {
            color: ['#8bb9d0', '#002d54']
          },
          top: 180
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
      console.log('option',option)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
}
</script>

<style scoped>
.hello {
  height: 180px;
  padding: 15px;
}
</style>