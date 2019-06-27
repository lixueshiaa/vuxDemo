import axios from 'axios'
import { randomn } from '@/utils/util'
import config from '@/config/config'
const uuidV1 = require('uuid/v1')

let vueExp = null
let loading = false
const state = {
  token: '',
  source: 8,
  uuid: localStorage.uuid || uuidV1(),
  version: '',
  language: 'zh_CN',
  device_name: '',
  corporation_id: ''
}

const instance = axios.create({
  baseURL: config.rootPath,
  timeout: 30000
})

instance.interceptors.request.use(
  config => {
    loading = config.data.loading || false

    loading && vueExp && vueExp.$vux && vueExp.$vux.loading && vueExp.$vux.loading.show()
    // config.headers['kp-token'] = getToken()
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    config.headers['kp-request-id'] = '8' + new Date().getTime() + randomn(4)
    config.headers['kp-source'] = state.source
    config.headers['kp-uuid'] = state.uuid
    config.headers['kp-version'] = state.version
    config.headers['kp-language'] = state.language
    config.headers['kp-device-name'] = state.device_name
    config.headers['kp-corporation-id'] = state.corporation_id
    localStorage.uuid = state.uuid
    return config
  },
  error => {
    loading && vueExp && vueExp.$vux && vueExp.$vux.loading && vueExp.$vux.loading.hide()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    const { data, status } = res
    //eslint-disable-next-line
    loading && vueExp && vueExp.$vux && vueExp.$vux.loading && (vueExp.$vux.loading.hide(), loading = false)
    if (status == 200) {
      if (data.code == 0) {
        return Promise.resolve(data)
      } else if (data.code == 100000) {
        vueExp && vueExp.$vux && vueExp.$vux.toast && vueExp.$vux.toast.show({
          type: 'warn',
          text: '系统内部异常，请稍后再试!'
        })
      } else if (data.code == 100001) {
        vueExp && vueExp.$vux && vueExp.$vux.toast && vueExp.$vux.toast.show({
          type: 'warn',
          text: '系统升级中，请稍后再试!'
        })
      } else if (data.code == 100003) { // token过期
        window.localtion.href = '/'
      } else if (data.code && data.code.toString().substring(0, 2) > 10) {
        vueExp && vueExp.$vux && vueExp.$vux.toast && vueExp.$vux.toast.show({
          type: 'warn',
          text: '系统繁忙, 请稍后再试!'
        })
      } else {
        vueExp && vueExp.$vux && vueExp.$vux.toast && vueExp.$vux.toast.show({
          type: 'cancel',
          text: data.msg || '系统繁忙,请稍后再试!'
        })
      }
      return Promise.reject(data)
    } else {
      vueExp && vueExp.$vux && vueExp.$vux.toast && vueExp.$vux.toast.show({
        type: 'cancel',
        text: data.msg || '网络繁忙,请稍后再试!'
      })
      return Promise.reject(data)
    }
  },
  error => {
    //eslint-disable-next-line
    loading && vueExp && vueExp.$vux && vueExp.$vux.loading && (vueExp.$vux.loading.hide(), loading = false)
    vueExp && vueExp.$vux && vueExp.$vux.toast && vueExp.$vux.toast.show({
      type: 'cancel',
      text: error && error.message
    })
    return Promise.reject(error)
  }
)

export default instance

export const creatVueExp = (vueContent) => {
  vueContent && (vueExp = vueContent)
}
