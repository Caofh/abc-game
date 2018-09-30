import { callApi } from './_util'

const axios = callApi('http://tpdoc.cn:3001')
// 新增用户
export function addUser (data) {
  return axios.post('/addUser_hamster', data)
}

//获取排行榜
export function getUserList(nickname) {
  if (nickname){
    return axios.get(`/getUserList_hamster?nickname=${nickname}`)
  }else{
    return axios.get('/getUserList_hamster')
  }
 
}

//上传得分
export function submitScore(data) {
  return axios.post('/updateUser_hamster',data)
}
