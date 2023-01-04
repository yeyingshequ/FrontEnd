import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue()
  ],
  resolve: {
    // Vite路径别名配置
    alias: {
      '@': path.resolve(__dirname,'./src'),
    },
    extensions: ['.js', '.json', '.ts', '.vue']
  },

  css: {
    preprocessorOptions:{
      scss: {
        additionalData: `@import "@/assets/css/variable.scss";`,
      },
    }
  },
  server:{
    host:'localhost',
    port:3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3005/',
      },
    },
  }
})
