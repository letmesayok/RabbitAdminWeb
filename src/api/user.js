import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:8800/login',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: 'http://localhost:8800/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
