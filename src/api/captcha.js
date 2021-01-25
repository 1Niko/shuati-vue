import request from '../utils/request'
/**
 * 后面的每次请求都是需要携带token的
 */
export const getCaptcha = () => {
  const base = '/captcha'
  return request({
    url: `${base}`,
    method: 'get'
  })
}
