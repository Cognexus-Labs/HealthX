import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_GOOGLE_API_KEY': JSON.stringify(env.REACT_APP_GOOGLE_API_KEY)
    },
    plugins: [react(), viteCommonjs()],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  }
})




