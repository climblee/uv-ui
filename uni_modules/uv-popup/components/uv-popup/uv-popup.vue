<template>
	<view class="uv-popup">
		<uv-overlay
			:show="show"
			@click="overlayClick"
			v-if="overlay"
			:duration="overlayDuration"
			:customStyle="overlayStyle"
			:opacity="overlayOpacity"
      :zIndex="zIndex"
		></uv-overlay>
		<uv-transition
			:show="show"
			:customStyle="transitionStyle"
			:mode="position"
			:duration="duration"
			@afterEnter="afterEnter"
			@click="clickHandler"
		>
			<view
				class="uv-popup__content"
				:style="[contentStyle]"
				@tap.stop="noop"
			>
				<uv-status-bar v-if="safeAreaInsetTop"></uv-status-bar>
				<slot></slot>
				<view
					v-if="closeable"
					@tap.stop="close"
					class="uv-popup__content__close"
					:class="['uv-popup__content__close--' + closeIconPos]"
					hover-class="uv-popup__content__close--hover"
					hover-stay-time="150"
				>
					<uv-icon
						name="close"
						color="#909399"
						size="18"
						bold
					></uv-icon>
				</view>
				<uv-safe-bottom v-if="safeAreaInsetBottom"></uv-safe-bottom>
			</view>
		</uv-transition>
	</view>
</template>

<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js';

	/**
	 * popup 弹窗
	 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义
	 * @tutorial https://www.uvui.cn/components/popup.html
	 * @property {Boolean}			show				是否展示弹窗 (默认 false )
	 * @property {Boolean}			overlay				是否显示遮罩 （默认 true ）
	 * @property {String}			mode				弹出方向（默认 'bottom' ）
	 * @property {String | Number}	duration			动画时长，单位ms （默认 300 ）
	 * @property {String | Number}	overlayDuration			遮罩层动画时长，单位ms （默认 350 ）
	 * @property {Boolean}			closeable			是否显示关闭图标（默认 false ）
	 * @property {Object | String}	overlayStyle		自定义遮罩的样式
	 * @property {String | Number}	overlayOpacity		遮罩透明度，0-1之间（默认 0.5）
	 * @property {Boolean}			closeOnClickOverlay	点击遮罩是否关闭弹窗 （默认  true ）
	 * @property {String | Number}	zIndex				层级 （默认 10075 ）
	 * @property {Boolean}			safeAreaInsetBottom	是否为iPhoneX留出底部安全距离 （默认 true ）
	 * @property {Boolean}			safeAreaInsetTop	是否留出顶部安全距离（状态栏高度） （默认 false ）
	 * @property {String}			closeIconPos		自定义关闭图标位置（默认 'top-right' ）
	 * @property {String | Number}	round				圆角值（默认 0）
	 * @property {Boolean}			zoom				当mode=center时 是否开启缩放（默认 true ）
	 * @property {String}			bgColor				弹窗背景色，设置为transparent可去除白色背景
	 * @property {Object}			customStyle			组件的样式，对象形式
	 * @event {Function} open 弹出层打开
	 * @event {Function} close 弹出层收起
	 * @example <uv-popup v-model="show"><text>出淤泥而不染，濯清涟而不妖</text></uv-popup>
	 */
	export default {
		name: 'uv-popup',
		emits:['click','close','open'],
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				overlayDuration: this.duration + 50
			}
		},
		watch: {
			show(newValue, oldValue) {
				if (newValue === true) {
					// #ifdef MP-WEIXIN
					const children = this.$children
					this.retryComputedComponentRect(children)
					// #endif
				}
			}
		},
		computed: {
			transitionStyle() {
				const style = {
					zIndex: this.zIndex,
					position: 'fixed',
					display: 'flex',
				}
				style[this.mode] = 0
				if (this.mode === 'left') {
					return this.$uv.deepMerge(style, {
						bottom: 0,
						top: 0,
					})
				} else if (this.mode === 'right') {
					return this.$uv.deepMerge(style, {
						bottom: 0,
						top: 0,
					})
				} else if (this.mode === 'top') {
					return this.$uv.deepMerge(style, {
						left: 0,
						right: 0
					})
				} else if (this.mode === 'bottom') {
					return this.$uv.deepMerge(style, {
						left: 0,
						right: 0,
					})
				} else if (this.mode === 'center') {
					return this.$uv.deepMerge(style, {
						alignItems: 'center',
						'justify-content': 'center',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0
					})
				}
			},
			contentStyle() {
				const style = {}
				// 通过设备信息的safeAreaInsets值来判断是否需要预留顶部状态栏和底部安全局的位置
				// 不使用css方案，是因为nvue不支持css的iPhoneX安全区查询属性
				const {
					safeAreaInsets
				} = this.$uv.sys()
				if (this.mode !== 'center') {
					style.flex = 1
				}
				// 背景色，一般用于设置为transparent，去除默认的白色背景
				if (this.bgColor) {
					style.backgroundColor = this.bgColor
				}
				if(this.round) {
					const value = this.$uv.addUnit(this.round)
					if(this.mode === 'top') {
						style.borderBottomLeftRadius = value
						style.borderBottomRightRadius = value
					} else if(this.mode === 'bottom') {
						style.borderTopLeftRadius = value
						style.borderTopRightRadius = value
					} else if(this.mode === 'center') {
						style.borderRadius = value
					} 
				}
				return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle))
			},
			position() {
				if (this.mode === 'center') {
					return this.zoom ? 'fade-zoom' : 'fade'
				}
				if (this.mode === 'left') {
					return 'slide-left'
				}
				if (this.mode === 'right') {
					return 'slide-right'
				}
				if (this.mode === 'bottom') {
					return 'slide-up'
				}
				if (this.mode === 'top') {
					return 'slide-down'
				}
			},
		},
		methods: {
			// 点击遮罩
			overlayClick() {
				if (this.closeOnClickOverlay) {
					this.$emit('close')
				}
			},
			close(e) {
				this.$emit('close')
			},
			afterEnter() {
				this.$emit('open')
			},
			clickHandler() {
				// 由于中部弹出时，其uv-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
				if(this.mode === 'center') {
					this.overlayClick()
				}
				this.$emit('click')
			},
			// #ifdef MP-WEIXIN
			retryComputedComponentRect(children) {
				// 组件内部需要计算节点的组件
				const names = ['uv-calendar-month', 'uv-album', 'uv-collapse-item', 'uv-dropdown', 'uv-index-item', 'uv-index-list',
					'uv-line-progress', 'uv-list-item', 'uv-rate', 'uv-read-more', 'uv-row', 'uv-row-notice', 'uv-scroll-list',
					'uv-skeleton', 'uv-slider', 'uv-steps-item', 'uv-sticky', 'uv-subsection', 'uv-swipe-action-item', 'uv-tabbar',
					'uv-tabs', 'uv-tooltip'
				]
				// 历遍所有的子组件节点
				for (let i = 0; i < children.length; i++) {
					const child = children[i]
					// 拿到子组件的子组件
					const grandChild = child.$children
					// 判断如果在需要重新初始化的组件数组中名中，并且存在init方法的话，则执行
					if (names.includes(child.$options.name) && typeof child?.init === 'function') {
						// 需要进行一定的延时，因为初始化页面需要时间
						this.$uv.sleep(50).then(() => {
							child.init()
						})
					}
					// 如果子组件还有孙组件，进行递归历遍
					if (grandChild.length) {
						this.retryComputedComponentRect(grandChild)
					}
				}
			}
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	$uv-popup-flex:1 !default;
	$uv-popup-content-background-color: #fff !default;

	.uv-popup {
		flex: $uv-popup-flex;

		&__content {
			background-color: $uv-popup-content-background-color;
			position: relative;

			&--round-top {
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
			}

			&--round-left {
				border-top-left-radius: 0;
				border-top-right-radius: 10px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 10px;
			}

			&--round-right {
				border-top-left-radius: 10px;
				border-top-right-radius: 0;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 0;
			}

			&--round-bottom {
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}

			&--round-center {
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				border-bottom-left-radius: 10px;
				border-bottom-right-radius: 10px;
			}

			&__close {
				position: absolute;

				&--hover {
					opacity: 0.4;
				}
			}

			&__close--top-left {
				top: 15px;
				left: 15px;
			}

			&__close--top-right {
				top: 15px;
				right: 15px;
			}

			&__close--bottom-left {
				bottom: 15px;
				left: 15px;
			}

			&__close--bottom-right {
				right: 15px;
				bottom: 15px;
			}
		}
	}
</style>
