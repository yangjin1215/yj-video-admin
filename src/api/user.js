import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/admin',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `/users/${id}`,
    method: 'get'
  })
}

export const getUsers = ({ limit, offset }) => {
  const data = { limit, offset }
  const queryString = Object.keys(data).reduce((t, k, ci, arr) => `${t}${data[k] ? `${k}=${data[k]}${ci === arr.length - 1 ? '' : '&'}` : ''}`, '')
  return request({
    url: `/getusers/?${queryString}`,
    method: 'get'
  })
}

export const registerUser = ({ username, password }) => {
  return request({
    url: '/users',
    method: 'post',
    data: { username, password }
  })
}

export const delUser = (id) => {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}
