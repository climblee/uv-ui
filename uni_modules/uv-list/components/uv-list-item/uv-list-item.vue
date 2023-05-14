<template>
	<!-- #ifdef APP-NVUE -->
	<cell>
		<!-- #endif -->
		<view
			class="uv-list-item"
			:ref="`uv-list-item-${anchor}`"
			:anchor="`uv-list-item-${anchor}`"
			:class="[`uv-list-item-${anchor}`]"
		>
			<slot />
		</view>
		<!-- #ifdef APP-NVUE -->
	</cell>
	<!-- #endif -->
</template>

<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js';
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	/**
	 * List 列表
	 * @description 该组件为高性能列表组件
	 * @tutorial https://www.uvui.cn/components/list.html
	 * @property {String | Number}	anchor	用于滚动到指定item
	 * @example <uv-list-ite v-for="(item, index) in indexList" :key="index" ></uv-list-item>
	 */
	export default {
		name: 'uv-list-item',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
				// 节点信息
				rect: {},
				index: 0,
				show: true
			}
		},
		computed: {

		},
		inject: ['uvList'],
		watch: {
			// #ifndef APP-NVUE
			'uvList.innerScrollTop'(n) {
				const preLoadScreen = this.uvList.preLoadScreen
				const windowHeight = this.$uv.sys().windowHeight
				if(n <= windowHeight * preLoadScreen) {
					this.parent.updateOffsetFromChild(0)
				} else if (this.rect.top <= n - windowHeight * preLoadScreen) {
					this.parent.updateOffsetFromChild(this.rect.top)
				}
			}
			// #endif
		},
		created() {
			this.parent = {}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// 初始化数据
				this.updateParentData()
				this.index = this.parent.children.indexOf(this)
				this.resize()
			},
			updateParentData() {
				// 此方法在mixin中
				this.getParentData('uv-list')
			},
			resize() {
				this.queryRect(`uv-list-item-${this.anchor}`).then(size => {
					const lastChild = this.parent.children[this.index - 1]
					this.rect = size
					const preLoadScreen = this.uvList.preLoadScreen
					const windowHeight = this.$uv.sys().windowHeight
					// #ifndef APP-NVUE
					if (lastChild) {
						this.rect.top = lastChild.rect.top + lastChild.rect.height
					}
					if (size.top >= this.uvList.innerScrollTop + (1 + preLoadScreen) * windowHeight) this.show =
						false
					// #endif
				})
			},
			// 查询元素尺寸
			queryRect(el) {
				return new Promise(resolve => {
					// #ifndef APP-NVUE
					this.$uvGetRect(`.${el}`).then(size => {
						resolve(size)
					})
					// #endif

					// #ifdef APP-NVUE
					const ref = this.$refs[el]
					dom.getComponentRect(ref, res => {
						resolve(res.size)
					})
					// #endif
				})
			}
		}
	}
</script>
