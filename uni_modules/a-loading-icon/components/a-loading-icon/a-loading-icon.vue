<template>
	<text>你好</text>
</template>
<script>
	if(!uni.$a) console.error(`aView-ui温馨提示：请在main.js中添加代码 import aView from '@/uni_modules/a-view-ui'`)
	console.log(uni.$a)
	export default {
		mixins: [uni.$a.mixin,uni.$a.mpMixin]
	}
</script>
<style scoped lang="scss">
	@import '@/uni_modules/a-view-ui/theme.scss';
	text {
		color: $a-primary;
	}
</style>
