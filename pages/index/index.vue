<template>
	<view class="content">
		<navigator style="padding: 30rpx;background-color: pink;" url="/pages/index-nvue/index-nvue">跳转nvue页面</navigator>
		<navigator style="padding: 30rpx;background-color: pink;" url="/pages/componentsA/cell/cell">跳转nvue页面cell</navigator>
		<uv-loading-icon color="#2878ff" text="加载中" :vertical="false"></uv-loading-icon>
		<uv-icon
		    name="level"
		    size="30"
		    color="#909399"
		></uv-icon>
		<uv-cell-group>
			<uv-cell
			    title="你好"
					title-style="color:red;"
			    value="内容"
			    :isLink="true"
					arrow-direction="left"
			></uv-cell>
			<uv-cell
			    title="利剑出鞘,一统江湖"
			    value="内容"
			    label="挣脱束缚,向往自由"
			></uv-cell>
		</uv-cell-group>
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
