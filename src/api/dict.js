import http from '@u/request'
import qs from 'qs'

export const GET_DICT_LIST = () => {
  return http.get('/dictType/list')
}

export const POST_DICT_LIST = (params) => {
  return http.post('/dictType/selectPage', qs.stringify(params))
}

export const POST_DICT_ADD = (params) => {
  return http.post('/dictType/add', qs.stringify(params))
}

export const DELETE_DICT_ID = (id) => {
  return http.delete(`/dictType/delete/${id}`)
}

export const PUT_DICT_UPDATE = (params) => {
  return http.put(`/dictType/update`, qs.stringify(params))
}

export const GET_DICT_DETAIL = (id) => {
  return http.get(`/dictType/detail/${id}`)
}

export const POST_DICT_DATA_ADD = (params) => {
  return http.post('/dictData/add', qs.stringify(params))
}

export const GET_DICT_DATA_TYPE = (type) => {
  return http.get(`/dictData/selectByDictType?dictTypes=${type.toString()}`)
}
export const DELETE_DICT_DATA_ID = (id) => {
  return http.delete(`/dictData/delete/${id}`)
}
