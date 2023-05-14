<template>
	<view
		class="uv-slider"
		:style="[$uv.addStyle(customStyle)]"
	>
		<slider
			:min="min"
			:max="max"
			:step="step"
			:value="sliderValue"
			:activeColor="activeColor"
			:inactiveColor="inactiveColor"
			:blockSize="$uv.getPx(blockSize)"
			:blockColor="blockColor"
			:showValue="showValue"
			:disabled="disabled"
			@changing="changingHandler"
			@change="changeHandler"
		></slider>
	</view>
</template>

<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js'
	export default {
		name: 'uv-slider',
		mixins: [mpMixin, mixin, props],
		computed: {
			sliderValue(){
				// #ifdef VUE2
				return this.value;
				// #endif
				// #ifdef VUE3
				return this.modelValue;
				// #endif
			}
		},
		methods: {
			// 拖动过程中触发
			changingHandler(e) {
				const {
					value
				} = e.detail
				// 更新v-model的值
				// #ifdef VUE2
				this.$emit('input', value)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue',value)
				// #endif
				// 触发事件
				this.$emit('changing', value)
			},
			// 滑动结束时触发
			changeHandler(e) {
				const {
					value
				} = e.detail
				// 更新v-model的值
				// #ifdef VUE2
				this.$emit('input', value)
				// #endif
				// #ifdef VUE3
				this.$emit('update:modelValue',value)
				// #endif
				// 触发事件
				this.$emit('change', value)
			}
		},
	}
</script>

