<template>
	<view class="uv-waterfall-flow-class uv-waterfall-flow">
		<view id="uv-waterfall-flow-left"
			class="uv-waterfall-flow__column">
			<slot :name="name1"
				:leftList="leftList"></slot>
		</view>
		<view id="uv-waterfall-flow-right"
			class="uv-waterfall-flow__column">
			<slot name="right"
				:rightList="rightList"></slot>
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
				name1: 'left',
				// 左列表
				leftList: [],
				// 右列表
				rightList: [],
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
				if (!this.tempList.length) return
				let leftRect = await this.$uvGetRect('#uv-waterfall-flow-left')
				let rightRect = await this.$uvGetRect('#uv-waterfall-flow-right')
				let item = this.tempList[0]
				// 因为经过上面两个await节点查询和定时器，数组有可能会变成空[]，导致item的值为undefined
				// 解决多次快速滚动会导致数据乱的问题
				if (!item) return
				// 如果左边小于或者等于右边，就添加到左边，否则添加到右边
				if (leftRect.height < rightRect.height) {
					item.width = leftRect.width;
					this.leftList.push(item)
				} else if (leftRect.height > rightRect.height) {
					item.width = rightRect.width;
					this.rightList.push(item)
				} else {
					// 为了保证前两项添加时，左右两边都还没有内容，这时候根据队列长度判断下一项该放在哪一边
					if (this.leftList.length <= this.rightList.length) {
						item.width = leftRect.width;
						this.leftList.push(item)
					} else {
						item.width = rightRect.width;
						this.rightList.push(item)
					}
				}
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
			// 清空数据列表
			clear() {
				this.leftList = []
				this.rightList = []
				this.$emit('input', [])
				this.tempList = []
			},
			// 清除指定的某一条数据，根据id来实现
			remove(id) {
				// 如果查找不到就返回-1
				let index = -1
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
<style lang="scss" scoped>
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