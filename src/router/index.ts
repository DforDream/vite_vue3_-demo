import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/pages/Home.vue";
import QueryMaterial from "@/pages/QueryMaterial.vue";
import useUser from "@/store/user";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    redirect: "query_material",
    // meta: {
    //   title: '首页'
    // }
    children: [
      {
        path: "query_material",
        component: QueryMaterial,
      },
      {
        path: "query_bom",
        component: () => import("@/pages/QueryBOM.vue"),
      },
      {
        path: "management",
        component: () => import("@/pages/Management.vue"),
      },
      {
        path: ":from/trend_chart/:id",
        component: () => import("@/pages/TrendChart.vue"),
      },
      {
        path: ":from/bom_detail/:id",
        component: () => import("@/pages/BomDetail.vue"),
      },
      {
        path: "personal",
        component: () => import("@/pages/Personal.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/404",
    component: () => import("@/pages/404.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getBrowserNameVersion = () => {
  var Sys: any = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/msie ([\d\.]+)/))
    ? (Sys.ie = s[1])
    : (s = ua.match(/edge\/([\d\.]+)/))
    ? (Sys.edge = s[1])
    : (s = ua.match(/firefox\/([\d\.]+)/))
    ? (Sys.firefox = s[1])
    : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
    ? (Sys.opera = s[1])
    : (s = ua.match(/chrome\/([\d\.]+)/))
    ? (Sys.chrome = s[1])
    : (s = ua.match(/version\/([\d\.]+).*safari/))
    ? (Sys.safari = s[1])
    : 0;
  if (Sys.ie) return Sys.ie.split(".")[0] > 11;
  if (Sys.edge) return Sys.edge.split(".")[0] > 60;
  if (Sys.firefox) return Sys.firefox.split(".")[0] > 60;
  if (Sys.opera) return Sys.opera.split(".")[0] > 60;
  if (Sys.chrome) return Sys.chrome.split(".")[0] > 60;
  // if (Sys.safari) return Sys.safari.split(".")[0] > 90;
  return "Unkonwn";
};

// 全局路由守卫 设置title
router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || "物料价格分析平台";
  if (getBrowserNameVersion()) {
    if (useUser().allUser.includes(`${localStorage.getItem("user")}`)) {
      next();
    } else {
      to.fullPath !== "/login" ? next("/login") : next();
    }
  } else {
    to.fullPath !== "/404" ? next("/404") : next();
  }
});

export default router;
