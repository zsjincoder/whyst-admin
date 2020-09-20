import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : config.baseUrl.pro

const axios = new HttpRequest(baseUrl)
export default axios
