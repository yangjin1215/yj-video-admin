import request from '@/utils/request'

export const delfile = url => {
  return request({
    url: '/delfile',
    method: 'delete',
    data: { url }
  })
}
