import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import styleImport, { VantResolve } from 'vite-plugin-style-import';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // styleImport({
    //   resolves: [VantResolve()],
    // }),
  ],
  server: { //主要是加上这段代码
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/v2': {
        target:'https://cn-apia.coolkit.cn',    //'http://127.0.0.1:5173',	//实际请求地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v2/, 'v2')
      },
      '/dispatch/app':{
        target:'https://cn-dispa.coolkit.cn',
        changeOrigin: true,
      }
    }
  }
}) 