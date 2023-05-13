export default {
	props: {
		// 是否为加载中状态
		loading: {
			type: Boolean,
			default: false
		},
		// 是否为禁用装填
		disabled: {
			type: Boolean,
			default: false
		},
		// 开关尺寸，单位px
		size: {
			type: [String, Number],
			default: 25
		},
		// 打开时的背景颜色
		activeColor: {
			type: String,
			default: '#2979ff'
		},
		// 关闭时的背景颜色
		inactiveColor: {
			type: String,
			default: '#fff'
		},
		// 通过v-model双向绑定的值
		// #ifdef VUE2
		value: {
			type: [Boolean, String, Number],
			default: false
		},
		// #endif
		// #ifdef VUE3
		modelValue: {
			type: [Boolean, String, Number],
			default: false
		},
		// #endif
		// switch打开时的值
		activeValue: {
			type: [String, Number, Boolean],
			default: true
		},
		// switch关闭时的值
		inactiveValue: {
			type: [String, Number, Boolean],
			default: false
		},
		// 是否开启异步变更，开启后需要手动控制输入值
		asyncChange: {
			type: Boolean,
			default: false
		},
		// 圆点与外边框的距离
		space: {
			type: [String, Number],
			default: 0
		},
		...uni.$uv?.props?.switch
	}
}