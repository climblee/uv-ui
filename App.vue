<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uv-ui-tools/index.scss';
	@import "@/common/demo.scss";
	/*每个页面公共css */
	.uv-page {
		padding: 15px 15px 40px;
	}
	.uv-demo-block {
		margin-bottom: 22px;
	}
	.uv-demo-block__title {
		font-size: 14px;
		color: #8f9ca2;
		margin-bottom: 8px;
	}
</style>