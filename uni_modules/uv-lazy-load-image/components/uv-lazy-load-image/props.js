export default {
	props: {
		// 组件标识，点击图片返回
		name: {
			type: [String, Number],
			default: ''
		},
		// 图片地址
		src: {
			type: String,
			default: ''
		},
		// 图片裁剪模式
		mode: {
			type: String,
			default: 'aspectFill'
		},
		// 是否显示加载状态
		showLoading: {
			type: Boolean,
			default: true
		},
		// 是否显示错误的图片
		showError: {
			type: Boolean,
			default: true
		},
		// 占位图片路径
		loadingImg: {
			type: String,
			default: ''
		},
		// 加载失败的错误占位图
		errorImg: {
			type: String,
			default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAiAQMAAAAatXkPAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAAIZJREFUCNdlzjEKwkAUBNAfEGyCuYBkLyLuxRYW2SKlV1JSeA2tUiZg4YrLjv9PGsHqNTPMSAQuyAJgRDHSyvBPwtZoSJXakeJI9iuRLGDygdl6V0yKDtyMAeMPZySj8yfD+UapvRPj2JOwkyAooSV5IwdDjPdCPspe8LyTl9IKJvDETKKRv6vnlUasgg0fAAAAAElFTkSuQmCC'
		},
		// 图片进入可见区域前多少像素前，单位rpx，开始加载图片
		// 负数为图片超出屏幕底部多少像素后触发懒加载，正数为图片顶部距离屏幕底部多少距离时触发（图片还没出现在屏幕上）
		threshold: {
			type: [Number, String],
			default: 100
		},
		// 是否开启过渡效果
		isEffect: {
			type: Boolean,
			default: true
		},
		// 动画过渡时间
		duration: {
			type: [String, Number],
			default: 300
		},
		// 渡效果的速度曲线，各个之间差别不大，因为这是淡入淡出，且时间很短，不是那些变形或者移动的情况，会明显
		// linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
		effect: {
			type: String,
			default: 'ease-in-out'
		},
		// 图片宽度，单位px
		width: {
			type: [String, Number],
			default: ''
		},
		// 图片高度，单位px
		height: {
			type: [String, Number],
			default: ''
		},
		// 图片最大高度，单位px
		maxHeight: {
			type: [String, Number],
			default: ''
		},
		// 图片圆角
		radius: {
			type: String,
			default: ''
		},
		// 背景颜色，用于深色页面加载图片时，为了和背景色融合
		bgColor: {
			type: String,
			default: '#f3f4f6'
		}
	}
}