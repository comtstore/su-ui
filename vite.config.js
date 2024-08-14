import { defineConfig } from 'vite'
import { basePlugins, globalInsertStyles } from './build/rollup.config.base'

export default defineConfig({
  plugins: [
    ...basePlugins
  ],
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: globalInsertStyles
        }
    }
  }
})