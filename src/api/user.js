import http from "@u/request";
import qs from "qs";

export const POST_LOGIN = (params) => {
  return http.post("/admin/login", qs.stringify(params), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};
