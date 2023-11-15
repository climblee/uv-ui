<template>
	<view class="uv-skeleton">
		<view v-if="loading">
			<view v-for="(item, index) in elements" :key="index">
				<!-- 横向并列布局 -->
				<view class="uv-skeleton__group" :style="[style(item)]" v-if="item.type=='flex'">
					<view v-for="(item2,index2) in item.children" :class="[item2.clas]" :style="[style(item2)]" :key="index2">
						<view v-for="(item3,index3) in item2.elements" :key="index3">
							<!-- 垂直高度站位 -->
							<view :style="{height: $uv.addUnit(item3.height,'rpx')}" v-if="item3.type=='gap'"></view>
							<view :class="[item3.clas, roundClass, animateClass]" :style="[style(item3)]" v-else ref="skeleton"></view>
						</view>
					</view>
				</view>
				<!-- 自定义骨架屏内容 -->
				<!-- ps 自定义扩展说明： -->
				<!-- 如果你需要自定义模板，可以参照这个custom的写法，增加一个skeleton配置类型，编写布局和样式就可以了 -->
				<!-- 注意事项：为了保证骨架效果和动态效果的一致，扩展时，在你希望实际展示在页面中的元素上加上 :class="[style, animateClass]" 和 :style="[style(item)]" 和 ref="skeleton" -->
				<view :class="[item.clas, animateClass]" :style="[style(item)]" ref="skeleton" v-else-if="item.type == 'custom'"></view>
				<!-- 垂直高度站位 -->
				<view :style="{height: $uv.addUnit(item.height,'rpx')}" v-else-if="item.type=='gap'"></view>
				<!-- 其他基本单位 line avatar 等 -->
				<view :class="[item.clas, roundClass, animateClass]" :style="[style(item)]" v-else ref="skeleton"></view>
			</view>
		</view>
		<view v-else>
			<slot />
		</view>
	</view>
</template>
<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	export default {
		name: 'uv-skeletons',
		mixins: [mpMixin, mixin],
		props: {
			// 是否显示骨架
			loading: {
				type: Boolean,
				default: true
			},
			// 骨架内容 具体说明参考文档：
			skeleton: {
				type: Array,
				default: () => []
			},
			// 是否开启动画效果
			animate: {
				type: Boolean,
				default: true
			},
			// 是否圆角骨架风格
			round: {
				type: Boolean,
				default: false
			},
			...uni.$uv?.props?.skeleton
		},
		data() {
			return {
				elements: [],
				opacity: 0.5,
				duration: 600
			}
		},
		computed: {
			animateClass() {
				return this.animate ? 'uv-skeleton--animation' : 'uv-skeleton--static';
			},
			roundClass() {
				return this.round ? 'uv-skeleton--round' : 'uv-skeleton--radius';
			},
			style(item) {
				return item => {
					const style = {};
					return this.$uv.deepMerge(style, this.$uv.addStyle(item.style));
				}
			}
		},
		created() {
			this.init();
			// #ifdef APP-NVUE
			if (this.loading && this.animate) {
				this.$uv.sleep(50).then(res => {
					this.createAnimation(this.opacity);
				})
			}
			// #endif
		},
		methods: {
			/**
			 * 初始化数据
			 */
			init() {
				let elements = [];
				if (!this.$uv.test.array(this.skeleton)) return this.$uv.error('skeleton参数必须为数组形式，参考文档示例：');
				this.skeleton.forEach(el => {
					const elClass = this.getElCounts(el);
					elements = elements.concat(elClass);
				})
				this.elements = [...elements];
			},
			/**
			 * 处理骨架屏参数内容
			 * @param {Object} el 每项数据
			 */
			getElCounts(el) {
				let elements = [];
				let children = [];
				if (this.$uv.test.number(el)) {
					elements.push({
						type: 'gap',
						height: el
					});
					return elements;
				} else {
					const type = el.type ? el.type : 'line';
					const num = el.num ? el.num : 1;
					const style = el.style ? el.style : {};
					const styleIsArray = this.$uv.test.array(style);
					const gap = el.gap ? el.gap : '20rpx';
					const child = el.children ? el.children : [];
					for (let i = 0; i < child.length; i++) {
						children[i] = {
							clas: child[i].type.indexOf('avatar') > -1 || child[i].type.indexOf('custom') > -1 ? '' : 'uv-skeleton__group__sub',
							elements: this.getElCounts(child[i])
						};
					}
					for (let i = 0; i < num; i++) {
						if (gap && i < num && i > 0) {
							elements.push({
								type: 'gap',
								height: gap
							});
						}
						elements.push({
							clas: `uv-skeleton__${type}`,
							type,
							style: styleIsArray ? style[i] : style,
							gap,
							children
						});
					}
					return elements;
				}
			},
			/**
			 * 创建动画
			 */
			createAnimation(opacity = 1) {
				// loading结束之后或未开启动画不执行
				if (!this.loading || !this.animate) return;
				let count = 0;
				const skeletons = this.$refs.skeleton;
				skeletons.forEach(item => {
					animation.transition(item, {
						styles: {
							opacity: opacity,
						},
						duration: this.duration
					}, () => {
						count++;
						if (count >= skeletons.length) {
							setTimeout(() => {
								this.createAnimation(opacity < 1 ? 1 : this.opacity);
							}, 200)
						}
					});
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	@import '@/uni_modules/uv-ui-tools/libs/css/components.scss';
	@mixin background {
		/* #ifdef APP-NVUE */
		background-color: #e6e6e6;
		/* #endif */
		/* #ifndef APP-NVUE */
		background: linear-gradient(90deg, #F1F2F4 25%, #e6e6e6 37%, #F1F2F4 50%);
		background-size: 400% 100%;
		/* #endif */
	}
	.uv-skeleton__line {
		height: 32rpx;
		// margin-bottom: 30rpx;
	}
	.uv-skeleton__line--sm {
		height: 24rpx;
		margin-bottom: 30rpx;
	}
	.uv-skeleton__line--lg {
		height: 48rpx;
		margin-bottom: 30rpx;
	}
	.uv-skeleton--static {
		@include background;
	}
	.uv-skeleton--radius {
		border-radius: 8rpx;
	}
	.uv-skeleton--round {
		border-radius: 30rpx;
	}
	.uv-skeleton__avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
	}
	.uv-skeleton__avatar--sm {
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
	}
	.uv-skeleton__avatar--lg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 100rpx;
	}
	.uv-skeleton__group {
		@include flex;
		&__sub {
			flex: 1;
		}
	}
	.uv-skeleton--animation {
		@include background;
		/* #ifndef APP-NVUE */
		animation: skeleton 1.8s ease infinite
			/* #endif */
	}
	/* #ifndef APP-NVUE */
	@keyframes skeleton {
		0% {
			background-position: 100% 50%
		}
		100% {
			background-position: 0 50%
		}
	}
	/* #endif */
</style>