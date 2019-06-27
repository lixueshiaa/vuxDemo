// 账户相关
import ajax from '../axios'

export default {
  auth (data) {
    return ajax({
      url: '/token',
      method: 'get',
      data: data
    })
  }
}
