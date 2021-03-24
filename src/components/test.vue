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
    }
  },
  methods:{
    getVirtulData(year) {
      let data = [];
      return data;
    }
  },
    // setup: () => {
    //   const option = ref({
    //     visualMap: {
    //       show: false,
    //       min: 0,
    //       max: 10000
    //     },
    //     calendar: {
    //       range: '2017'
    //     },
    //     series: {
    //       type: 'heatmap',
    //       coordinateSystem: 'calendar',
    //       data: [],
    //     }
    //   });
    //
    //   return { option };
    // },
  mounted() {
    const option = ref({
      visualMap: {
        show: false,
        min: 0,
        max: 10000
      },
      calendar: {
        range: '2017'
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.data,
      }
    });
    this.axios({
      method: "get",
      url: "/web/coding_time",
      data: {},
    }).then((res) => {
      this.data=res.data.data.coding_time;
      console.log(res);
    });
  }
}
</script>

<style scoped>

</style>