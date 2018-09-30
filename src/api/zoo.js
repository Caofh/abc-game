import { callApi } from './_util'

const axios = callApi('http://tpdoc.cn:3001')

// 新增用户
export function addUser (data) {
  data.name = 'zoo' // 标识是zoo动物园项目
  return axios.post('/addUser', data)
}

// 编辑用户信息
export function updateUser (data) {
  data.name = 'zoo' // 标识是zoo动物园项目
  return axios.post('/updateUser', data)
}

// 获取用户列表
export function getUserList (para) {
  const data = para ? '?' + para + '&name=zoo' : '?name=zoo'

  return axios.get('/getUserList' + data)
}

// 获取随机单词接口（.../getRandomWords?count=3）
export function getRandomWords (para) {
  const data = para ? '?' + para + '&name=zoo' : '?name=zoo'

  return axios.get('/getRandomWords' + data)
}
