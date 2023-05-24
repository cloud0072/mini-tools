import {loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    base: env.VITE_APP_PUBLIC_PATH,
    server: {
      port: 8000
    },
    define: {
      'process.env': env,
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [vue()],
  }
}
