import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [ElementPlusResolver()],

    })

  ],
  resolve: {
    // Vite路径别名配置
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json', '.ts', '.vue']
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/css/variable.scss";
        @import "@/assets/css/base.scss";`
      },
    }
  },
  server: {
    port: 3000,
    proxy: {
      // 代理 /api/* 的请求到 http://localhost:3005/api/*
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
