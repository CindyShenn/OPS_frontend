module.exports = {
    configureWebpack: webpackConfig => {
      webpackConfig.module.rules.push({
        parser: {
          amd: false,
        },
      })
    },
    transpileDependencies: [
      'vue-echarts',
      'resize-detector'
    ],
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.json']
    },
    }