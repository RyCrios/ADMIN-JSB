import axios from "axios";

/* 封装http请求 */
class Request {
  service;

  /* 构造器 */
  constructor({ baseURL, timeout }) {
    this.service = axios.create({
      baseURL,
      timeout,
    });
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {object} data
   * @param {object} config
   */
  request(options) {
    return this.service(options);
  }

  /**
   * @param {string} url
   * @param {object} config
   */
  get(url, data, config = {}) {
    return this.request({
      method: "get",
      url,
      data,
      config,
    });
  }

  /**
   * @param {string} url
   * @param {object} data
   * @param {object} config
   */
  post(url, data, config) {
    return this.request({
      method: "post",
      url,
      data,
      config,
    });
  }

  /**
   * @param {string} url
   * @param {object} data
   * @param {object} config
   */
  put(url, data = {}, config = {}) {
    return this.request({
      method: "put",
      url,
      data,
      config,
    });
  }

  /**
   * @param {string} url
   * @param {object} config
   */
  delete(url, config = {}) {
    return this.request({
      method: "delete",
      url,
      config,
    });
  }
}

const http = new Request({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_APP_TIMEOUT * 10,
});
//  白名单列表
const excludeUrls = ["/admin/login"];

http.service.interceptors.request.use(
  (config) => {
    //  非白名单请求携带令牌通行
    if (!excludeUrls.includes(config.url)) {
      config.headers.token = window.sessionStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.service.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default http;
