<script>
	import { fetchMenu } from '@/common/api.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// this.getHttpData();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async getHttpData() {
				const res = await fetchMenu();
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	@import "@/static/iconfont.css";
	/* #endif */
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