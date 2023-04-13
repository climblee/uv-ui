<!-- 加载图标 -->
<template>
	<view class=""> {{$ai.demo}}</view>
</template>
<script>
	// import { demo } from '@/uni_modules/ai-view-ui/index.js';
	console.log(uni.$ai)
	export default {
		data(){
			return {
				show: false
			}
		},
		computed:{
			$ai() {
			    // #ifndef APP-NVUE
			    // 在非nvue端，移除props，http，mixin等对象，避免在小程序setData时数据过大影响性能
			    // return uni.$u.deepMerge(uni.$u, {
			    //     props: undefined,
			    //     http: undefined,
			    //     mixin: undefined
			    // })
					return uni.$ai
			    // #endif
			    // #ifdef APP-NVUE
			    return uni.$ai
			    // #endif
			},
		},
		mounted() {
			
		}
	}
</script>
<style>
</style>