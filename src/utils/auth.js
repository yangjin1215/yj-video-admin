import Cookies from 'js-cookie'
import { tokenKey } from '@/utils/config'

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  Cookies.remove('csrfToken')
  return Cookies.remove(tokenKey)
}
