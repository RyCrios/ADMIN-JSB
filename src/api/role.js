import http from '@u/request'
import qs from 'qs'

export const POST_ROLE_LIST = (params) => {
  return http.post('/role/selectAll', params)
}

export const POST_ROLE_ADD = (params) => {
  return http.post('/role/add', qs.stringify(params))
}

export const DELETE_ROLE_ID = (id) => {
  return http.delete(`/role/delete/${id}`)
}

export const PUT_ROLE_UPDATE = (params) => {
  return http.put('/role/update', qs.stringify(params))
}

export const GET_ROLE_DETAIL = (id) => {
  return http.get(`/role/detail/${id}`)
}

export const POST_ROLE_MENU = (params) => {
  return http.post(`/role/addMenu`, qs.stringify(params))
}
