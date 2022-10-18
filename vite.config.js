import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import postCssPxToRem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    AutoImport({
      imports: ["vue", "vue-router", "vuex"],
      dts: "src/auto-import.d.js", //生成"components.d.js全局声明
    }),
  ],
  server: {
    host: "0.0.0.0",
    hmr: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@l": path.resolve(__dirname, "./src/layout"),
      "@a": path.resolve(__dirname, "./src/api"),
      "@p": path.resolve(__dirname, "./src/pages"),
      "@c": path.resolve(__dirname, "./src/components"),
      "@u": path.resolve(__dirname, "./src/utils"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(
          __dirname,
          "src/style.less"
        )}";`,
      },
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 16, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
        autoprefixer({
          // 自动添加前缀
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            //'last 2 versions', // 所有主流浏览器最近2个版本
          ],
          grid: true,
        }),
      ],
    },
  },
});
