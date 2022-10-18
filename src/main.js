import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
/* import "animate.css/animate.min.css"; */
import "./style.less";

const app = createApp(App);
app.use(Antd).use(router).use(store).mount("#app");
