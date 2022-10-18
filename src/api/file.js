import http from "@u/request";
import qs from "qs";

export const POST_FILE = (params) => {
  return http.post("/file/upload", params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
