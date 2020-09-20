import axios from '@/libs/api.request'
import { handleRestful } from '@/libs/util'

/**
 * 文件上传
 * @return {AxiosPromise}
 */
export const uploadFile = (data, method, config) => {
  return axios.request(handleRestful(`/index/file`, data, method, config))
}

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

/**
 * 门店
 * @return {AxiosPromise}
 */
export const store = (data, method) => {
  return axios.request(handleRestful(`/admin/store`, data, method))
}

/**
 * 问题
 * @return {AxiosPromise}
 */
export const question = (data, method) => {
  return axios.request(handleRestful(`/admin/question`, data, method))
}

/**
 * 单位
 * @return {AxiosPromise}
 */
export const standardProductUnit = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/standard_product_unit`, data, method))
}

/**
 * 规格
 * @return {AxiosPromise}
 */
export const specification = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/specification`, data, method))
}

/**
 * 规格值
 * @return {AxiosPromise}
 */
export const specificationValue = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/specification_value`, data, method))
}
