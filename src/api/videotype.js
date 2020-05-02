import request from '@/utils/request'

export function getVideotypes() {
  return request({
    url: '/videotypes',
    method: 'get'
  })
}

export function addVideotypes(typename) {
  return request({
    url: '/videotypes',
    method: 'post',
    data: { typename }
  })
}

export function updateVideotypes(id, typename) {
  return request({
    url: `/videotypes/${id}`,
    method: 'patch',
    data: { typename }
  })
}

export function delVideotypes(id) {
  return request({
    url: `/videotypes/${id}`,
    method: 'delete'
  })
}
