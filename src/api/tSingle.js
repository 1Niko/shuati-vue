import request from '../utils/request'
/**
 * 后面的每次请求都是需要携带token的
 */
export const findSingle= (startNum,single) => {
  return request({
    url: "/t-single/getSingle",
    method: 'get',
    params: {
      startNum
    },
    data: single
  })
}
