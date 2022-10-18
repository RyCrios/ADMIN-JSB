import http from "@u/request";
import qs from "qs";

export const GET_MENU = (params) => {
  return http.get("/menu/current");
};

export const GET_LIST = () => {
  return http.get("/menu/selectTree");
};

export const GET_TREE = () => {
  return http.get("/menu/treeSelect");
};

export const POST_MENU = (params) => {
  return http.post("/menu/add", params);
};

export const DELETE_MENU = (id) => {
  return http.delete(`/menu/delete/${id}`);
};

export const PUT_MENU = (params) => {
  return http.put("/menu/update", params);
};

export const GET_DETAIL = (id) => {
  return http.get(`/menu/detail/${id}`);
};
