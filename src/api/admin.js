import http from "@u/request";
import qs from "qs";

export const POST_LIST = (params) => {
  return http.post("/admin/selectPage", qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const POST_ADMIN = (params) => {
  return http.post("/admin/add", qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const DELETE_ADMIN = (id) => {
  return http.delete(`/admin/delete/${id}`);
};

export const PUT_ADMIN = (params) => {
  return http.put("/admin/update", qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const GET_DETAIL = (id) => {
  return http.get(`/admin/detail/${id}`);
};
