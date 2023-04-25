<template>
	<view class="uv-waterfall-flow-class uv-waterfall-flow">
		<view id="uv-waterfall-flow-1"
			class="uv-waterfall-flow__column"
			v-if="columnCount>=1">
			<slot name="list1"
				:list1="list1"></slot>
		</view>
		<view id="uv-waterfall-flow-2"
			class="uv-waterfall-flow__column"
			v-if="columnCount>=2">
			<slot name="list2"
				:list2="list2"></slot>
		</view>
		<view id="uv-waterfall-flow-3"
			class="uv-waterfall-flow__column"
			v-if="columnCount>=3">
			<slot name="list3"
				:list3="list3"></slot>
		</view>
		<view id="uv-waterfall-flow-4"
			class="uv-waterfall-flow__column"
			v-if="columnCount>=4">
			<slot name="list4"
				:list4="list4"></slot>
		</view>
		<view id="uv-waterfall-flow-5"
			class="uv-waterfall-flow__column"
			v-if="columnCount>=5">
			<slot name="list5"
				:list5="list5"></slot>
		</view>
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
				for (let i = 1; i <= this.columnCount; i++) {
					const rect = await this.$uvGetRect(`#uv-waterfall-flow-${i}`);
					rectArr.push({ ...rect, name: i });
				}
				let item = this.tempList[0]
				// 因为经过上面两个await节点查询和定时器，数组有可能会变成空[]，导致item的值为undefined
				// 解决多次快速滚动会导致数据乱的问题
				if (!item) return
				const minCol = this.getMin(rectArr);
				// item.width = minCol.width;
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
				// 如果查找不到就返回-1
				let index = -1
				for (let i = 1; i <= this.columnCount; i++) {
					this[`list${i}`] = [];
				}
				index = this.leftList.findIndex(val => val[this.idKey] == id)
				if (index != -1) {
					// 如果index不等于-1，说明已经找到了指定的数据
					this.leftList.splice(index, 1)
				} else {
					// 同理于上面的方法
					index = this.rightList.findIndex(val => val[this.idKey] == id)
					if (index != -1) this.rightList.splice(index, 1)
				}
				// 同时删除父组件对应的数据
				// #ifdef VUE2
				index = this.value.findIndex(val => val[this.idKey] == id)
				if (index != -1) this.$emit('input', this.value.splice(index, 1))
				// #endif
				// #ifdef VUE3
				index = this.modelValue.findIndex(val => val[this.idKey] == id)
				if (index != -1) this.$emit('input', this.modelValue.splice(index, 1))
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
			height: auto;
		}
	}
</style>