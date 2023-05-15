import App from './App'
// import uvUI from '@/uni_modules/uv-ui-tools'
// import { Request } from '@/util/request/index'
// #ifdef MP
// 引入uvui对小程序分享的mixin封装
import mpShare from '@/uni_modules/uv-ui-tools/libs/mixin/mpShare.js'
// #endif
// uni.$uv.setConfig({
// 	config: {
// 			// 修改默认单位为rpx，相当于执行 uni.$uv.config.unit = 'rpx'
// 			unit: 'px'
// 	},
// 	props: {
// 		button: {
// 			size: {
// 				default: 'large'
// 			},
// 			color: {
// 				default: 'red'
// 			}
// 		}
// 	}
// })
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
try {
	function isPromise(obj) {
		return (!!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function");
	}
	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) {}
const app = new Vue({
	...App
})
app.$mount()
// #ifdef MP
Vue.mixin(mpShare)
// #endif
// 引入请求封装
// Request(app)
// #endif
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	// #ifdef MP
	app.mixin(mpShare)
	// #endif
	// 引入请求封装
	// Request(app)
	return {
		app
	}
}
// #endif