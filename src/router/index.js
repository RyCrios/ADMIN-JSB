import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { beforeCallBackasync, afterCallBackasync } from "./tools";

const constantRouterMap = [
  {
    path: "/login",
    name: "login",
    component: () => import("@p/Login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/base",
    name: "base",
    component: () => import("@l/page.vue"),
    children: [
      {
        path: "/base/index",
        name: "index",
        component: () => import("@p/Home/index.vue"),
        meta: {
          title: "工作台",
          breadcrumb: "吉顺办-工作台",
        },
      },
      {
        path: "/base/admin",
        name: "admin",
        component: () => import("@p/Admin/index.vue"),
        meta: {
          title: "工作台",
          breadcrumb: "吉顺办-橄榄油",
        },
      },
      {
        path: "/base/item",
        name: "item",
        component: () => import("@p/Item/index.vue"),
        meta: {
          title: "工作台",
          breadcrumb: "吉顺办-橄榄油",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.VITE_ROUTER_URL,
  routes: constantRouterMap,
});

router.beforeEach(beforeCallBackasync);

router.afterEach(afterCallBackasync);

export default router;
