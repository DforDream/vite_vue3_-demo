import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";

import "@/style_reset.css";
//  unplugin-vue-components 插件无法处理非组件模块，如 message，这种组件需要手动加载
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/modal/style/css";

createApp(App).use(router).use(createPinia()).mount("#app");
