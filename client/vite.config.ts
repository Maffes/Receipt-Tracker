import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolveComponent } from 'vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "../public/"
  },
  // resolve: {
  //   alias: {
  //     '/@': resolve(__dirname, './src')
  //   }
  // }
})
