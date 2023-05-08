// 引入配置
import config from '@/common/config'
// 引入请求拦截
import { requestInterceptors } from './requestInterceptors.js'
// 引入响应拦截
import { responseInterceptors } from './responseInterceptors.js'
// 初始化请求配置
export const Request = ()=>{
	uni.$uv.http.setConfig((defaultConfig) => {
	    /* defaultConfig 为默认全局配置 */
	    defaultConfig.baseURL = config.baseUrl /* 根域名 */
	    return defaultConfig
	})
	requestInterceptors();
	responseInterceptors();
}
