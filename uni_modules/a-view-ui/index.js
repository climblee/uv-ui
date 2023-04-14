
// 公用mixin
import mixin from './libs/mixin/mixin.js'
// 小程序特有的mixin
import mpMixin from './libs/mixin/mpMixin.js'

// 公共工具函数
import index from './libs/function/index.js'

const $a = {
	mixin,
	mpMixin,
	...index
}
uni.$a = $a;
export default {}