import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  // Base 路径：与 GitHub 仓库名一致
  base: "/corejava/",

  lang: "zh-CN", // 默认语言

  locales: {
    "/": {
      lang: "zh-CN",
      title: "Core Java 文档",
      description: "Core Java 中文文档",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Core Java 文档",
      description: "Core Java 中文文档",
    },
    "/en/": {
      lang: "en-US",
      title: "Core Java Documentation",
      description: "Core Java English Documentation",
    },
  },

  theme,

  // 根路径重定向到中文
  head: [
    [
      "script",
      {},
      `
      if (location.pathname === '/corejava/' || location.pathname === '/corejava/index.html') {
        location.replace('/corejava/zh/');
      }
    `,
    ],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
