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

export const search = ({
  limit, offset, videoname
}) => {
  const data = {
    limit, offset, videoname
  }
  const queryString = Object.keys(data).reduce((t, k, ci, arr) => `${t}${data[k] ? `${k}=${data[k]}${ci === arr.length - 1 ? '' : '&'}` : ''}`, '')
  return request({
    url: `/videos/search?${queryString}`,
    method: 'get'
  })
}
