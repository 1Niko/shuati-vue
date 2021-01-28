import request from '../utils/request'
/**
 * 后面的每次请求都是需要携带token的
 */
export const findData = (startNum, judgement) => {
  const base = '/t-judgement/'
  return request({
    url: `${base}${startNum}`,
    method: 'get',
    data: judgement
  })
}
