import store from "@/store";
import router from "./index";

// 首先把你需要动态路由的组件地址全部获取
let modules = import.meta.glob("../pages/**/*.vue");
// 依序注册已生成的路由列表
const register = (item) => {
  item.component = modules[`../pages/${item.component}.vue`];
  router.addRoute("base", item);
  if (item.children.length) {
    item.children.forEach((it) => {
      register(it);
    });
  }
};

//  路由前置守卫
export const beforeCallBackasync = async (to, form, next) => {
  //  获取已登录令牌
  const token = window.sessionStorage.getItem("token") || "";
  //  无token,前往登录
  if (token.length == 0 && to.name != "login") return next("/login");
  //  已登录禁止跳转登录页
  if (token.length && to.name == "login") return next("/base/index");
  //  动态菜单丢失,重新拉取
  if (to.name != "login" && store.state.routers.length == 0) {
    await store.dispatch("MENU").then((res) => {
      res.forEach((item) => {
        register(item);
      });
    });
    next({ ...to, replace: true });
  } else {
    next();
  }
};
//  路由后置守卫
export const afterCallBackasync = (to) => {
  if (to.name != "login") {
    store.commit("SET_BREADCRUMB", to.meta?.breadcrumb.split("-"));
  }
  document.title = import.meta.env.VITE_APP_NAME + "-" + to.meta.title;
};
