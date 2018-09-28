import { callApi } from './_util'

const axios = callApi('http://tpdoc.cn:3001')
// 新增用户
export function addUser (data) {
  return axios.post('/addUser', data)
}

//获取排行榜
export function getUserList() {
  return axios.get('/getUserList')
}
