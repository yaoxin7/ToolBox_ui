import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // devServer: {
  //   https: false, // 默认是false, 默认就是http协议，true将http协议转换为https协议
  //   // 代理配置
  //   proxy: {
  //     '/server': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
  //       target: 'http://localhost:8080', // 目标地址 --> 服务器地址
  //       changeOrigin: true, // 允许跨域
  //       ws: true,  // 允许websocket代理
  //       // 如果这里没有进行路径重写，当你访问http://localhost:80/api/login/,实际上访问的就是https://172.20.9.153:8085/api/login/
  //       // pathRewrite: { // 重写代理路径
  //       //   // 就是把路径中的api都替换为空的字符串
  //       //   '^/server': '/server', // 因为服务端地址里面是没有api字段的，api只是为了区别需要代理的路径，如果服务端有api字段则不需要重新
  //       // }
  //     }
  //   }
  // }
})


