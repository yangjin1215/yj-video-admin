import { baseHost as BASEHOST } from '@/settings'

export const textContent = html => {
  const temp = document.createElement('div')
  temp.innerHTML = html
  return temp.textContent
}

export const handleResCore = e => {
  if (Array.isArray(e)) {
    return e.map(item => handleResCore(item))
  }
  if (typeof e === 'object') {
    if (e.video) {
      e.video = handleResCore(e.video)
    }
    if (e.imgurl && e.imgurl.startsWith('/')) {
      e.imgurl = `${BASEHOST}${e.imgurl}`
    }
    if (e.videocover && e.videocover.startsWith('/')) {
      e.videocover = `${BASEHOST}${e.videocover}`
    }
    if (e.videourl && e.videourl.startsWith('/')) {
      e.videourl = `${BASEHOST}${e.videourl}`
    }
  }
  return e
}

export const handleRes = res => {
  return (res.status && handleResCore(res.resdata)) || false
}

export const handleResArray = resArray => resArray.map(e => handleRes(e))

export const limitArray = (array, count, first = false) => {
  if (array && Array.isArray(array)) {
    return first ? array[0] : array.slice(0, count)
  }
  return []
}

export const vueInstanceMethods = {
  textContent,
  handleRes,
  handleResArray,
  limitArray
}

var __vueInstanceMethods__installed = false
export default {
  install(Vue, vueInstanceMethods) {
    if (__vueInstanceMethods__installed) return
    __vueInstanceMethods__installed = true
    Object.keys(vueInstanceMethods).forEach(k => {
      Object.defineProperty(Vue.prototype, k, {
        get() {
          return vueInstanceMethods[k]
        },
        set(v) {
          Vue.prototype.k = v
        }
      })
    })
  }
}
