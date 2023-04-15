<template>
	<view class="content">
		<navigator style="padding: 30rpx;background-color: pink;" url="/pages/index-nvue/index-nvue">跳转nvue页面</navigator>
		<a-loading-icon color="#2878ff" text="加载中" vertical="false"></a-loading-icon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
