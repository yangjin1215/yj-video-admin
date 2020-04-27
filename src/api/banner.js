import request from '@/utils/request'

export const getBanner = () => {
  return request({
    url: '/banners',
    method: 'get'
  })
}

export const delBanner = (id) => {
  return request({
    url: `/banners/${id}`,
    method: 'delete'
  })
}
