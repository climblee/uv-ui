// 全局挂载引入http相关请求拦截插件
import Request from './libs/luch-request'

// 路由封装
import route from './libs/util/route.js'
// 公共工具函数
import * as index from './libs/function/index.js'
// 防抖方法
import debounce from './libs/function/debounce.js'
// 节流方法
import throttle from './libs/function/throttle.js'
// 规则检验
import * as test from './libs/function/test.js'

// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import * as colorGradient from './libs/function/colorGradient.js'

// 配置信息
import config from './libs/config/config.js'
// 平台
import platform from './libs/function/platform'

const $uv = {
	route,
	config,
	test,
	throttle,
	date: index.timeFormat, // 另名date
	...index,
	colorGradient: colorGradient.colorGradient,
	hexToRgb: colorGradient.hexToRgb,
	rgbToHex: colorGradient.rgbToHex,
	colorToRgba: colorGradient.colorToRgba,
	http: new Request(),
	debounce,
	throttle,
	platform
}
uni.$uv = $uv;
export default {}