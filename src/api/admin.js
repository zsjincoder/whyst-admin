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
 * 单元详情
 * @return {AxiosPromise}
 */
export const standardProductUnitDetail = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/standard_product_unit/detail`, data, method))
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

/**
 * 获取库存单元列表
 * @return {AxiosPromise}
 */
export const stockKeepingUnit = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/stock_keeping_unit`, data, method))
}

/**
 * 获取库存单元详情
 * @return {AxiosPromise}
 */
export const stockKeepingUnitDetail = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/stock_keeping_unit/detail`, data, method))
}

/**
 * 商品单元 下拉列表
 * @return {AxiosPromise}
 */
export const standardProductUnitSelect = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/standard_product_unit/select`, data, method))
}

/**
 * 商品规格 下拉列表
 * @return {AxiosPromise}
 */
export const specificationSelect = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/specification/select`, data, method))
}

/**
 * 查询商品单元的规格及规格值
 * @return {AxiosPromise}
 */
export const standardProductUnitSpecification = (data, method) => {
  return axios.request(handleRestful(`/admin/goods/standard_product_unit/specification`, data, method))
}

/**
 * 订单列表
 * @return {AxiosPromise}
 */
export const orderList = (data, method) => {
  return axios.request(handleRestful(`/admin/order`, data, method))
}

/**
 * 提现列表
 * @return {AxiosPromise}
 */
export const withdraw = (data, method) => {
  return axios.request(handleRestful(`/admin/user/withdraw`, data, method))
}

/**
 * 用户列表
 * @return {AxiosPromise}
 */
export const getUserList = (data, method) => {
  return axios.request(handleRestful(`/admin/user`, data, method))
}
