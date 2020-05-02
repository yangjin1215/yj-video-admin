import request from '@/utils/request'

export const getVideos = ({
  limit, offset, videotypeid
}) => {
  const data = {
    limit, offset, videotypeid
  }
  const queryString = Object.keys(data).reduce((t, k, ci, arr) => `${t}${data[k] ? `${k}=${data[k]}${ci === arr.length - 1 ? '' : '&'}` : ''}`, '')
  return request({
    url: `/videos?${queryString}`,
    method: 'get'
  })
}

export function addVideo({
  videoname,
  videourl,
  videotypeid,
  videocover,
  videotime,
  videosize
}) {
  const data = {
    videoname,
    videourl,
    videotypeid,
    videocover,
    videotime,
    videosize
  }
  return request({
    url: '/videos',
    method: 'post',
    data
  })
}

export function updateVideo({ id, videoname, videotypeid, videocover }) {
  return request({
    url: `/videos/${id}`,
    method: 'patch',
    data: { videoname, videotypeid, videocover }
  })
}

export function delVideos(id) {
  return request({
    url: `/videos/${id}`,
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
