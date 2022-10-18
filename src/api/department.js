import http from "@u/request";
import qs from "qs";

export const POST_LIST = (params) => {
  return http.post("/department/selectPage", qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const POST_DEPARTMENT = (params) => {
  return http.post("/department/add", qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const DELETE_DEPARTMENT = (id) => {
  return http.delete(`/department/delete/${id}`);
};

export const PUT_DEPARTMENT = (params) => {
  return http.put("/department/update", params);
};

export const GET_LIST = () => {
  return http.get("/department/list");
};
