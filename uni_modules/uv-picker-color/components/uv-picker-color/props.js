export default {
	props: {
		// 是否展示颜色选择弹窗
		show: {
			type: Boolean,
			default: false
		},
		// 是否允许点击遮罩关闭
		closeOnClickOverlay: {
			type: Boolean,
			default: false
		},
		// 顶部标题
		title: {
			type: String,
			default: ''
		},
		// 取消按钮的文字
		cancelText: {
			type: String,
			default: '取消'
		},
		// 确认按钮的文字
		confirmText: {
			type: String,
			default: '确定'
		},
		// 取消按钮的颜色
		cancelColor: {
			type: String,
			default: '#909193'
		},
		// 确认按钮的颜色
		confirmColor: {
			type: String,
			default: '#3c9cff'
		}
	}
}