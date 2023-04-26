<template>
	<view class="uv-waterfall-flow">
		<view class="uv-waterfall-flow__gap_left"
			:style="[gapLeftStyle]"></view>
		<template v-if="columnNum>=1">
			<view id="uv-waterfall-flow-1"
				class="uv-waterfall-flow__column">
				<slot name="list1"
					:list1="list1"></slot>
			</view>
		</template>
		<template v-if="columnNum>=2">
			<view class="uv-waterfall-flow__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-flow-2"
				class="uv-waterfall-flow__column">
				<slot name="list2"
					:list2="list2"></slot>
			</view>
		</template>
		<template v-if="columnNum>=3">
			<view class="uv-waterfall-flow__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-flow-3"
				class="uv-waterfall-flow__column">
				<slot name="list3"
					:list3="list3"></slot>
			</view>
		</template>
		<template v-if="columnNum>=4">
			<view class="uv-waterfall-flow__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-flow-4"
				class="uv-waterfall-flow__column">
				<slot name="list4"
					:list4="list4"></slot>
			</view>
		</template>
		<template v-if="columnNum>=5">
			<view class="uv-waterfall-flow__gap_center"
				:style="[gapCenterStyle]"></view>
			<view id="uv-waterfall-flow-5"
				class="uv-waterfall-flow__column">
				<slot name="list5"
					:list5="list5"></slot>
			</view>
		</template>
		<view class="uv-waterfall-flow__gap_right"
			:style="[gapRightStyle]"></view>
	</view>
</template>
<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js';
	export default {
		name: 'uv-waterfall-flow',
		mixins: [mpMixin, mixin, props],
		computed: {
			// 破坏value变量引用，否则数据会保持不变
			copyValue() {
				// #ifdef VUE2
				return uni.$uv.deepClone(this.value)
				// #endif
				// #ifdef VUE3
				return uni.$uv.deepClone(this.modelValue)
				// #endif
			},
			columnNum() {
				return this.columnCount <= 0 ? 0 : this.columnCount >= 5 ? 5 : this.columnCount;
			},
			gapLeftStyle() {
				const style = {}
				style.width = uni.$uv.addUnit(this.leftGap)
				return style;
			},
			gapRightStyle() {
				const style = {}
				style.width = uni.$uv.addUnit(this.rightGap)
				return style;
			},
			gapCenterStyle() {
				const style = {}
				style.width = uni.$uv.addUnit(this.columnGap)
				return style;
			}
		},
		watch: {
			copyValue(nVal, oVal) {
				// 取出数组发生变化的部分
				let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0
				// 拼接原有数据
				this.tempList = this.tempList.concat(uni.$uv.deepClone(nVal.slice(startIndex)))
				this.splitData()
			}
		},
		data() {
			return {
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				list5: [],
				// 临时列表
				tempList: []
			}
		},
		mounted() {
			this.tempList = uni.$uv.deepClone(this.copyValue)
			this.splitData()
		},
		methods: {
			// 拆分数据
			async splitData() {
				let rectArr = [];
				if (!this.tempList.length) return
				for (let i = 1; i <= this.columnNum; i++) {
					const rect = await this.$uvGetRect(`#uv-waterfall-flow-${i}`);
					rectArr.push({ ...rect, name: i });
				}
				let item = this.tempList[0]
				// 因为经过上面两个await节点查询和定时器，数组有可能会变成空[]，导致item的值为undefined
				// 解决多次快速滚动会导致数据乱的问题
				if (!item) return
				const minCol = this.getMin(rectArr);
				// 列宽可能使用的到
				item.width = minCol.width;
				this[`list${minCol.name}`].push(item);
				// 移除临时数组中已处理的数据
				this.tempList.splice(0, 1)
				// 如果还有数据则继续执行
				if (this.tempList.length) {
					setTimeout(() => {
						this.splitData()
					}, this.addTime)
				} else {
					this.$emit('finish')
				}
			},
			getMin(arr) {
				const min = Math.min.apply(Math, arr.map(item => {
					return item.height;
				}))
				const newArr = arr.filter(item => item.height == min);
				return newArr[0];
			},
			// 清空数据列表
			clear() {
				for (let i = 1; i <= this.columnCount; i++) {
					this[`list${i}`] = [];
				}
				this.$emit('input', [])
				this.tempList = []
			},
			// 清除指定的某一条数据，根据id来实现
			remove(id) {
				let index = -1
				// 删除组件数据
				for (let i = 1; i <= this.columnCount; i++) {
					index = this[`list${i}`].findIndex(item => item[this.idKey] == id)
					if (index != -1) {
						this[`list${i}`].splice(index, 1)
					}
				}
				// 同时删除父组件对应的数据
				// #ifdef VUE2
				index = this.value.findIndex(item => item[this.idKey] == id)
				if (index != -1) this.$emit('input', this.value.splice(index, 1))
				// #endif
				// #ifdef VUE3
				index = this.modelValue.findIndex(item => item[this.idKey] == id)
				if (index != -1) this.$emit('update:modelValue', this.modelValue.splice(index, 1))
				// #endif
			}
		}
	}
</script>
<style lang="scss"
	scoped>
	@import '@/uni_modules/uv-ui-tools/libs/css/components.scss';
	.uv-waterfall-flow {
		@include flex(row);
		align-items: flex-start;
		&__column {
			@include flex(column);
			flex: 1;
			// #ifndef APP-NVUE
			height: auto;
			// #endif
		}
	}
</style>