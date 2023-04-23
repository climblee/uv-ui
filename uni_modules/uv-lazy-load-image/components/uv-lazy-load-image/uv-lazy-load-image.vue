<template>
	<view class="uv-lazy-load-class uv-lazy-load">
		<view class="uv-lazy-load__item"
			:class="[`uv-lazy-load__item--${elIndex}`]"
			:style="[lazyLoadItemStyle]">
			<!-- #ifndef APP-NVUE -->
			<view class="uv-lazy-load__item__content">
				<view class="uv-lazy-load__item__loading"
					v-if="loadStatus!='loaded'">
					<uv-loading-icon v-if="!loadingImg"></uv-loading-icon>
					<image class="uv-lazy-load__item__loading__custom"
						:src="loadingImg"
						mode="aspectFit"
						v-else></image>
				</view>
				<image v-if="!error"
					class="uv-lazy-load__item__image"
					:style="[imageStyle]"
					:src="show?image:load"
					:mode="imgMode"
					@load="handleImgLoaded"
					@error="handleImgError"
					@tap="handleImgClick"></image>
				<image v-else
					class="uv-lazy-load__item__image uv-lazy-load__item__image--error"
					:style="[imageStyle,errorImageStyle]"
					:src="load"
					:mode="imgMode"
					@load="handleErrorImgLoaded"
					@tap="handleImgClick"></image>
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-NVUE -->
			<text class="tip">nvue中请使用image</text>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	export default {
		name: 'uv-lazy-load-image',
		emits: ['click', 'loaded', 'error'],
		mixins: [mpMixin, mixin],
		props: {
			// 组件标识
			index: {
				type: [String, Number],
				default: ''
			},
			// 待显示的图片地址
			image: {
				type: String,
				default: ''
			},
			// 图片裁剪模式
			imgMode: {
				type: String,
				default: 'scaleToFill'
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
				default: 500
			},
			// 渡效果的速度曲线，各个之间差别不大，因为这是淡入淡出，且时间很短，不是那些变形或者移动的情况，会明显
			// linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
			effect: {
				type: String,
				default: 'ease-in-out'
			},
			// 图片高度，单位px
			height: {
				type: [String, Number],
				default: 300
			},
			// 图片圆角
			borderRadius: {
				type: String,
				default: ''
			}
		},
		computed: {
			thresholdValue() {
				// 先取绝对值，因为threshold可能是负数，最后根据this.threshold是正数或者负数，重新还原
				let threshold = uni.upx2px(Math.abs(this.threshold))
				return this.threshold < 0 ? -threshold : threshold
			},
			lazyLoadItemStyle() {
				let style = {}
				style.opacity = Number(this.opacity)
				if (this.borderRadius) {
					style.borderRadius = this.borderRadius
				}
				// 因为time值需要改变,所以不直接用duration值(不能改变父组件prop传过来的值)
				style.transition = `opacity ${this.time / 1000}s ${this.effect}`
				style.height = uni.$uv.addUnit(this.height)
				return uni.$uv.addStyle(style)
			},
			imageStyle() {
				let style = {
					height: uni.$uv.addUnit(this.height)
				}
				return uni.$uv.addStyle(style)
			},
			errorImageStyle(){
				let style = {
					background: `url(${this.errorImg}) no-repeat center center`
				}
				console.log(style)
				return uni.$uv.addStyle(style)
			}
		},
		watch: {
			show(val) {
				// 如果不开启过渡效果直接返回
				if (!this.effect) return
				this.time = 0
				// 原来opacity为1(不透明，是为了显示占位图)，改成0(透明，意味着该元素显示的是背景颜色，默认的白色)，再改成1，是为了获得过渡效果
				this.opacity = 0
				setTimeout(() => {
					this.time = this.duration
					this.opacity = 1
				}, 30)
			},
			image(val) {
				// 修改图片后重置部分变量
				if (!val) {
					// 如果传入null或者''，或者undefined，标记为错误状态
					this.error = true
				} else {
					this.init()
					this.error = false
				}
			}
		},
		data() {
			return {
				elIndex: uni.$uv.guid(),
				// 显示图片
				show: false,
				// 图片透明度
				opacity: 1,
				// 动画时间
				time: this.duration,
				// 懒加载状态
				// loadlazy-懒加载中状态，loading-图片正在加载，loaded-图片加加载完成
				loadStatus: '',
				// 图片加载失败
				error: false,
				load: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII='
			}
		},
		created() {
			// 由于一些特殊原因，不能将此变量放到data中定义
			this.observer = {}
			this.observerName = 'lazyLoadContentObserver'
		},
		mounted() {
			// #ifndef APP-NVUE
			// 在需要用到懒加载的页面，在触发底部的时候触发tOnLazyLoadReachBottom事件，保证所有图片进行加载
			this.$nextTick(() => {
				uni.$once('tOnLazyLoadReachBottom', () => {
					if (!this.show) this.show = true
				})
			})
			// mounted的时候，不一定挂载了这个元素，延时30ms，否则会报错或者不报错，但是也没有效果
			setTimeout(() => {
				this.disconnectObserver(this.observerName)
				const contentObserver = uni.createIntersectionObserver(this)
				contentObserver.relativeToViewport({
					bottom: this.thresholdValue
				}).observe(`.uv-lazy-load__item--${this.elIndex}`, (res) => {
					if (res.intersectionRatio > 0) {
						// 懒加载状态改变
						this.show = true
						// 如果图片已经加载，去掉监听，减少性能消耗
						this.disconnectObserver(this.observerName)
					}
				})
				this[this.observerName] = contentObserver
			}, 50)
			// #endif
			// #ifdef APP-NVUE
			this.show = true;
			// #endif
		},
		methods: {
			// 初始化
			init() {
				this.error = false
				this.loadStatus = ''
			},
			// 处理图片点击事件
			handleImgClick() {
				let whichImg = ''
				// 如果show为false，则表示图片还没有开始加载，点击的是最开始占位图
				if (this.show === false) whichImg = 'lazyImg'
				// 如果error为true，则表示图片加载失败，点击的是错误占位图
				else if (this.error === true) whichImg = 'errorImg'
				// 点击了正常的图片
				else whichImg = 'realImg'
				this.$emit('click', {
					index: this.index,
					whichImg: whichImg
				})
			},
			// 处理图片加载完成事件，通过show来区分是占位图触发还是加载真正的图片触发
			handleImgLoaded() {
				if (this.loadStatus == '') {
					// 占位图加载完成
					this.loadStatus = 'loading'
				} else if (this.loadStatus == 'loading') {
					// 真正的图片加载完成
					this.loadStatus = 'loaded'
					this.$emit('loaded', this.index)
				}
			},
			// 处理错误图片加载完成
			handleErrorImgLoaded() {
				this.loadStatus = 'loaded'
				this.$emit('error', this.index)
			},
			// 处理图片加载失败
			handleImgError() {
				this.error = true
			},
			disconnectObserver(observerName) {
				const observer = this[observerName]
				observer && observer.disconnect()
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/uni_modules/uv-ui-tools/libs/css/common.scss';
	$uv-bg-gray-color: #f3f4f6;
	.uv-lazy-load {
		&__item {
			background-color: $uv-bg-gray-color;
			overflow: hidden;
			&__content {
				/* #ifndef APP-NVUE */
				flex: 1;
				/* #endif */
				align-items: center;
				justify-content: center;
			}
			&__loading {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: 99;
				align-items: center;
				justify-content: center;
			}
			&__image {
				// 解决父容器会多出3px的问题
				border: 1rpx solid #F8F7F8;
				border-radius: 10rpx;
				overflow: hidden;
				/* #ifndef APP-NVUE */
				display: block;
				width: 100%;
				// 骗系统开启硬件加速
				transform: transition3d(0, 0, 0);
				// 防止图片加载“闪一下”
				will-change: transform;
				/* #endif */
			}
		}
	}
	.tip {
		font-size: 14px;
		color: #666;
	}
</style>