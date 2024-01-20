<template>
	<view class="uv-loading-page uv-flex-column" v-if="showLoading" :style="[loadingPageStyle]">
		<image v-if="image!=''" :src="image" class="uv-loading-page__img" mode="widthFit" :style="[{
			width: $uv.addUnit(iconSize),
			height: $uv.addUnit(iconSize)
		}]"></image>
		<uv-loading-icon v-else :mode="loadingMode" :size="iconSize" :color="loadingColor"></uv-loading-icon>
		<slot>
			<text class="uv-loading-page__text" :style="[{
				fontSize: $uv.addUnit(fontSize),
				color: color
			}]">{{ loadingText }}</text>
		</slot>
	</view>
</template>
<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from "./props.js";
	/**
	 * loadingPage 加载动画
	 * @description 警此组件为一个小动画，目前用在uvui的loadmore加载更多和switch开关等组件的正在加载状态场景。
	 * @tutorial https://www.uvui.cn/components/loading.html
	 * 
	 * @property {Boolean}	loading  是否加载中 （默认 false ）
	 * @property {String | Number}	loadingText		提示内容  (默认 '正在加载' )
	 * @property {String}  image  文字上方用于替换loading动画的图片
	 * @property {String}  loadingMode  加载动画的模式，circle-圆形，spinner-花朵形，semicircle-半圆形 （默认 'circle' ）
	 * @property {String}  bgColor  背景色 （默认 '#ffffff' ）
	 * @property {String}  color  文字颜色 （默认 '#C8C8C8' ）
	 * @property {String | Number}	fontSize  文字大小 （默认 19 ）
	 * @property {String | Number}	iconSize  图标大小 （默认 28 ）
	 * @property {String}  loadingColor	加载中图标的颜色，只能rgb或者十六进制颜色值 （默认 '#C8C8C8' ）
	 * @property {String | Number}	duration  关闭加载时的过渡时间，单位ms （默认 300 ）
	 * 
	 * @example <uv-loading mode="circle"></uv-loading>
	 */
	export default {
		name: "uv-loading-page",
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				showLoading: false,
				opacity: 1
			}
		},
		watch: {
			loading: {
				immediate: true,
				handler(newVal) {
					if (newVal) {
						this.showLoading = true;
						this.opacity = 1;
					} else {
						this.opacity = 0;
						this.$nextTick(() => {
							this.$uv.sleep(this.duration).then(res => {
								this.showLoading = false;
							})
						})
					}
				}
			}
		},
		computed: {
			loadingPageStyle() {
				const style = {
					'position': 'fixed',
					'top': '0',
					'left': '0',
					'right': '0',
					'bottom': '0',
					'zIndex': '999',
					'background-color': this.bgColor,
					'transition-duration': `${this.duration}ms`,
					'opacity': this.opacity
				}
				return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle))
			}
		}
	}
</script>
<style scoped lang="scss">
	@import '@/uni_modules/uv-ui-tools/libs/css/components.scss';
	$uv-loading-icon-margin-bottom: 10px !default;
	.uv-loading-page {
		flex: 1;
		justify-content: center;
		align-items: center;
		padding-bottom: 150px;
		transition-property: opacity;
		&__text {
			margin-top: $uv-loading-icon-margin-bottom;
		}
	}
</style>