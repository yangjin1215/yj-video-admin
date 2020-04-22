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

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
