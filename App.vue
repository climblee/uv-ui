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
	@import '@/uni_modules/a-view-ui-tools/libs/css/common.scss';
	@import '@/uni_modules/a-view-ui-tools/theme.scss';
	/*每个页面公共css */
	.a-page {
		padding: 15px 15px 40px;
	}
	.a-demo-block {
		margin-bottom: 22px;
	}
	.a-demo-block__title {
		font-size: 14px;
		color: #8f9ca2;
		margin-bottom: 8px;
	}
</style>