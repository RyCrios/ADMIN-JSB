import http from "@u/request";
import qs from "qs";

export const POST_LIST = (params) => {
  return http.post("/item/selectPage", params);
};

export const POST_ITEM = (params) => {
  return http.post("/item/admin/add", params);
};

export const DELECT_ITEM = (id) => {
  return http.delete(`/item/admin/delete/${id}`);
};

export const PUT_ITEM = (params) => {
  return http.put("/item/admin/update", params);
};

export const GET_DETAIL = (id) => {
  return http.get(`/item/admin/detail/${id}`);
};
