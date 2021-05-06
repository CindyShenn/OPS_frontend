import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'0.0.0.0',
    port:81,
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    // alias:{
    //   "echarts":"https://cdn.jsdelivr.net/npm/echarts@5.0.2",
    //   "vue-echarts":"https://cdn.jsdelivr.net/npm/vue-echarts@6.0.0-rc.4",
    // }

  },
  // build: {
  //   rollupOptions: {
  //     external: ["echarts", "vue-echarts"],
  //     plugins: [
  //       commonjs(),
  //       externalGlobals({
  //         'echarts': 'echarts',
  //         'vue-echarts': 'VueECharts',
  //       }),
  //     ],
  //   },
  // },
  // optimizeDeps: {
  //   include: ["echarts", "axios", "vue-echarts", "vite"]
  // },

})
