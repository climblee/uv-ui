<template>
	<view class="uv-lazy-load-class uv-lazy-load"
		:style="[$uv.addStyle(customStyle)]">
		<view class="uv-lazy-load__item"
			:class="[`uv-lazy-load__item--${elIndex}`]"
			:style="[lazyLoadItemStyle]">
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
					:src="show?src:load"
					:mode="mode"
					@load="handleImgLoaded"
					@error="handleImgError"
					@tap="handleImgClick"></image>
				<image v-else
					class="uv-lazy-load__item__image uv-lazy-load__item__image--error"
					:style="[imageStyle,errorImageStyle]"
					:src="load"
					:mode="mode"
					@load="handleErrorImgLoaded"
					@tap="handleImgClick"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js'
	export default {
		name: 'uv-lazy-load-image',
		emits: ['click', 'loaded', 'error'],
		mixins: [mpMixin, mixin, props],
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
				style.height = uni.$uv.addUnit(this.height);
				return uni.$uv.addStyle(style)
			},
			imageStyle() {
				if(!this.height) return null;
				let style = {
					height: uni.$uv.addUnit(this.height)
				}
				return uni.$uv.addStyle(style)
			},
			errorImageStyle() {
				let style = {
					background: `url(${this.errorImg}) no-repeat center center`
				}
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
			src(val) {
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
			// 在需要用到懒加载的页面，在触发底部的时候触发tOnLazyLoadReachBottom事件，保证所有图片进行加载
			this.$nextTick(() => {
				uni.$once('tOnLazyLoadReachBottom', () => {
					if (!this.show) this.show = true
				})
			})
			// mounted的时候，不一定挂载了这个元素，延时30ms，否则会报错或者不报错，但是也没有效果
			setTimeout(() => {
				// #ifndef APP-NVUE
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
				// #endif
				// #ifdef APP-NVUE
				this.show = true;
				// #endif
			}, 20)
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
					index: this.name,
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
					this.$emit('loaded', this.name)
				}
			},
			// 处理错误图片加载完成
			handleErrorImgLoaded() {
				this.loadStatus = 'loaded'
				this.$emit('error', this.name)
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
<style lang="scss"
	scoped>
	$uv-bg-gray-color: #f3f4f6;
	.uv-lazy-load {
		&__item {
			background-color: $uv-bg-gray-color;
			overflow: hidden;
			&__content {
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