const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          /* '^/api': '' */
        },
      },
    },
  },
  css: {
    loaderOptions: {
      // 没有分号会报错
      sass: {
        //additionalData: `@import "@/assets/css/base.scss"` ,
        additionalData: `@import "@/assets/css/variable.scss";`,
        // eslint-disable-next-line no-dupe-keysbil
      },
    },
  },
})
