<template>
	<view class="demo">
		<button @click="clickHandler">测试demo</button>
	</view>
</template>
<script>
	export default {
		emits:['click'],
		methods: {
			clickHandler(){
				this.$emit('click','demo');
			}
		}
	}
</script>
<style>
</style>
