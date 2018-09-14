import { callApi } from './_util'

const axios = callApi('http://tpdoc.cn:3001')

// 新增用户
export function addUser (data) {
  return axios.post('/addUser', data)
}

// 编辑用户信息
export function updateUser (data) {
  return axios.post('/updateUser', data)
}

// 获取用户列表
export function getUserList (para) {
  const data = para ? '?' + para : ''

  return axios.get('/getUserList' + data)
}

// 获取随机单词接口（.../getRandomWords?count=3）
export function getRandomWords (para) {
  const data = para ? '?' + para : ''

  return axios.get('/getRandomWords' + data)
}
