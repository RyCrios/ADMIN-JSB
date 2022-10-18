import { createStore } from "vuex";
import { message } from "ant-design-vue";

import { GET_MENU } from "@a/menu";
import Utils from "@u/Utils";

export default createStore({
  state: {
    routers: [],
    breadcrumb: [],
  },
  getters: {},
  mutations: {
    SET_ROUTERS(state, value) {
      state.routers = value;
    },
    SET_BREADCRUMB(state, value) {
      state.breadcrumb = value;
    },
  },
  actions: {
    MENU({ commit }) {
      return new Promise(async (resolve, reject) => {
        const res = await GET_MENU();
        if (res.code == 200) {
          let data = Utils.setRouterInfo(res.data, "吉顺办-");
          commit("SET_ROUTERS", data);
          resolve(data);
        } else {
          message.warning("菜单配置异常,请重新登录!");
          window.sessionStorage.clear();
          window.location.href = "/login";
        }
      });
    },
  },
  modules: {},
});
