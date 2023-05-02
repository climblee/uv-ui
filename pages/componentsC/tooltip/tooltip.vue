<template>
	<view class="uv-page">
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">基础使用</text>
			<view class="uv-demo-block__content">
				<uv-tooltip
				    :text="text1"
					overlay
				></uv-tooltip>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">下方显示</text>
			<view class="uv-demo-block__content" style="padding-bottom: 30px;">
				<uv-tooltip
				    :text="text2"
					direction="bottom"
				></uv-tooltip>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">扩展按钮</text>
			<view class="uv-demo-block__content">
				<uv-tooltip
				    :text="text3"
					:buttons="buttons1"
					@click="click"
				></uv-tooltip>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">自动调整位置</text>
			<view class="uv-demo-block__content">
				<uv-tooltip
				    :text="text4"
					:buttons="buttons2"
				></uv-tooltip>
			</view>
		</view>
		<view class="uv-demo-block">
			<text class="uv-demo-block__title">高亮选中文本背景色</text>
			<view class="uv-demo-block__content">
				<uv-tooltip
				    :text="text5"
					:buttons="buttons3"
					bgColor="#e3e4e6"
				></uv-tooltip>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text1: '长按文本，上方提示',
				text2: '长按文本，下方提示',
				text3: '显示多个扩展按钮',
				text4: '自动调整气泡位置',
				text5: '长按文本，显示背景色',
				buttons1: ['扩展'],
				buttons2: ['扩展', '搜索', '翻译'],
				buttons3: ['扩展', '搜索', '翻译']
			}
		},
		onLoad() {
			
		},
		methods: {
			click(index) {
				console.log('index', index);
			}
		}
	}
</script>

<style lang="scss">
	.uv-page {
		
	}
	
	.uv-demo-block__content {
		padding-top: 10px;
	}
</style>
