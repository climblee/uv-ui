
// 公用mixin
// import mixin from './libs/mixin/mixin.js'
// 小程序特有的mixin
// import mpMixin from './libs/mixin/mpMixin.js'
// 公共工具函数
import index from './libs/function/index.js'

// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from './libs/function/colorGradient.js'

// 配置信息
import config from './libs/config/config.js'

const $a = {
	config,
	...index,
	colorGradient: colorGradient.colorGradient,
	hexToRgb: colorGradient.hexToRgb,
	rgbToHex: colorGradient.rgbToHex,
	colorToRgba: colorGradient.colorToRgba,
}
uni.$a = $a;
console.log('uni.$a',uni.$a)
export default {}