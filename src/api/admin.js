import axios from '@/libs/api.request'
import { handleRestful } from '@/libs/util'

/**
 * banner
 * @return {AxiosPromise}
 */
export const banner = (data, method) => {
  return axios.request(handleRestful(`/admin/banner`, data, method))
}

/**
 * notice公告
 * @return {AxiosPromise}
 */
export const notice = (data, method) => {
  return axios.request(handleRestful(`/admin/notice`, data, method))
}
