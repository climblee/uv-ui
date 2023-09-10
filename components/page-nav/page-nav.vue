<template>
	<view class="nav-wrap">
		<view class="nav-title">
			<uv-image :showLoading="true" src="/static/uvui/common/logo.png" width="70px" height="70px" />
			<view class="nav-info">
				<view class="nav-info__title" @tap="jumpToWx">
					<text class="nav-info__title__text">uv-ui {{version}}</text>
				</view>
				<text class="nav-slogan">多平台快速开发的UI框架</text>
			</view>
		</view>
		<text class="nav-desc">{{desc}}</text>
	</view>
</template>

<script>
	import config from '@/uni_modules/uv-ui-tools/libs/config/config.js';
	export default {
		props: {
			desc: String,
			title: String,
		},
		data() {
			return {
				version: config.v
			}
		},
		methods: {
			jumpToWx() {
				// #ifdef MP-WEIXIN
				uni.navigateToMiniProgram({
					appId: ''
				})
				// #endif
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uv-ui-tools/libs/css/color.scss';
	.nav-wrap {
		padding: 15px;
		position: relative;
	}

	.lang {
		position: absolute;
		top: 15px;
		right: 15px;
	}

	.nav-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.nav-info {
		margin-left: 15px;
		
		&__title {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			
			&__text {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				color: $uv-main-color;
				font-size: 25px;
				font-weight: bold;
				text-align: left;
			}
			
			&__jump {
				font-size: 12px;
				color: $uv-primary;
				font-weight: normal;
				margin-left: 20px;
			}
		}
	}

	.logo {
		width: 70px;
		height: 70px;
		/* #ifndef APP-NVUE */
		height: auto;
		/* #endif */
	}

	.nav-slogan {
		color: $uv-tips-color;
		font-size: 14px;
	}

	.nav-desc {
		margin-top: 10px;
		font-size: 14px;
		color: $uv-content-color;
		line-height: 20px;
	}
</style>
