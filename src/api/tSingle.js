import request from '../utils/request'
/**
 * 后面的每次请求都是需要携带token的
 */
export const findSingle = (startNum, single) => {
  const base = '/t-single/'
  return request({
    url: `${base}${startNum}`,
    method: 'get',
    data: single
  })
}
