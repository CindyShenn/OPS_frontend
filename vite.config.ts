import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'0.0.0.0',
    port:80,
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias:{
      "echarts":"https://cdn.skypack.dev/echarts@5.0.2",
    }
  },

})
