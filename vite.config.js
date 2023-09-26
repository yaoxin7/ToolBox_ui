import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// export const requestUrl = 'http://192.168.137.1:8080'

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
  // server: {
  //   https: false,
  //   proxy: {
  //     '/server': {
  //       target: requestUrl,
  //       changeOrigin: true,
  //       ws: true
  //     },
  //     '/upload': {
  //       target: requestUrl,
  //       changeOrigin: true,
  //       ws: true
  //     }
  //   }
  // }
})


