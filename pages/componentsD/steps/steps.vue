<template>
	<view class="uv-page">
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">基础演示</text>
			<view class="uv-demo-block__content">
				<uv-steps :current="current1">
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="已出库"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="运输中"
					    desc="11:40"
					>
					</uv-steps-item>
				</uv-steps>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">显示点类型</text>
			<view class="uv-demo-block__content">
				<uv-steps
				    :current="1"
				    dot
				>
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="已出库"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="运输中"
					    desc="11:40"
					>
					</uv-steps-item>
				</uv-steps>
				<uv-steps
				    :current="1"
				    dot
					direction="column"
				>
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="已出库"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="运输中"
					    desc="11:40"
					>
					</uv-steps-item>
				</uv-steps>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">错误状态</text>
			<view class="uv-demo-block__content">
				<uv-steps :current="1">
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    error
					    title="仓库着火"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="破产清算"
					    desc="11:40"
					>
					</uv-steps-item>
				</uv-steps>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">自定义图标</text>
			<view class="uv-demo-block__content">
				<uv-steps
				    :current="1"
				    activeIcon="checkmark"
				    inactiveIcon="arrow-right"
				>
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="已出库"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="运输中"
					    desc="11:40"
					>
					</uv-steps-item>
				</uv-steps>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">自定义插槽</text>
			<view class="uv-demo-block__content">
				<uv-steps :current="1">
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="已出库"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="运输中"
					    desc="11:40"
					>
						<text class="slot-icon" slot="icon">运</text>
					</uv-steps-item>
				</uv-steps>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">自定义颜色</text>
			<view class="uv-demo-block__content">
				<uv-steps :current="1" activeColor="#3c9cff">
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="已出库"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="运输中"
					    desc="11:40"
					>
					</uv-steps-item>
				</uv-steps>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">竖向展示</text>
			<view class="uv-demo-block__content">
				<uv-steps
				    :current="1"
				    direction="column"
				>
					<uv-steps-item
					    title="已下单"
					    desc="10:30"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="已出库"
					    desc="10:35"
					>
					</uv-steps-item>
					<uv-steps-item
					    title="运输中"
					    desc="11:40"
					>
					</uv-steps-item>
				</uv-steps>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current1: 1
			}
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uv-ui-tools/libs/css/color.scss';
	.slot-icon {
		width: 21px;
		height: 21px;
		background-color: $uv-warning;
		border-radius: 100px;
		font-size: 12px;
		color: #fff;
		line-height: 21px;
		text-align: center;
	}
</style>
