import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");
// 按需引入ant-design-vue
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), Components({ resolvers: [AntDesignVueResolver()] })],
  build: {
    // 多页面打包
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, "index.html"),
    //     // nested: resolve(__dirname, 'ceshiPage/index.html')
    //   },
    // },
    // 打包时去除console debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    minify: "terser",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // optimizeDeps: { /* 引入的第三方配置，强制预构建插件包 */
  //   include: ['axios','mockjs','echarts'],
  // },
  server: {
    proxy: {
      "/api": {
        // target: "http://bppadmin.7000mall.com",
        target: "http://192.168.18.221:8089",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
