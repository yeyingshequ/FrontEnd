<<<<<<< HEAD
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false,
=======
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
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
<<<<<<< HEAD
        //additionalData: `@import "@/assets/css/base.scss"` ,
        additionalData: `@import "@/assets/css/variable.scss";`
        // eslint-disable-next-line no-dupe-keysbil
      }
    }
  },
})

=======
        additionalData: `@import "@/assets/css/variable.scss";`,
        // additionalData: `@import "@/assets/css/base.scss"`,
        // additionalData: `@import "@/assets/css/variable.scss";`,
        // eslint disable next line no dupe keysbil
      },
    },
  },
})
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
