<template>
	<view>
		<uv-drop-down 
			ref="dropDown"
			sign="dropDown_1" 
			text-active-color="#3c9cff"
			:extra-icon="{name:'arrow-down-fill',color:'#666',size:'26rpx'}" 
			:extra-active-icon="{name:'arrow-up-fill',color:'#3c9cff',size:'26rpx'}"
			:defaultValue="defaultValue" 
			:custom-style="{padding: '0 30rpx'}" 
			@click="selectMenu"
		>
			<uv-drop-down-item 
				name="order" 
				type="2" 
				:label="dropItem('order').label" 
				:value="dropItem('order').value">
			</uv-drop-down-item>
			<uv-drop-down-item 
				name="type" 
				type="2" 
				:label="dropItem('type').label" 
				:value="dropItem('type').value">
			</uv-drop-down-item>
			<uv-drop-down-item 
				name="vip_type" 
				type="1" label='VIP文档' 
				:value="dropItem('vip_type').value">
			</uv-drop-down-item>
		</uv-drop-down>
		<uv-drop-down-popup 
			sign="dropDown_1" 
			:click-overlay-on-close="true"
			:currentDropItem="currentDropItem" 
			@clickItem="clickItem"
			@popupChange="change"
		></uv-drop-down-popup>
	</view>
</template>
<script>
	export default {
		onPageScroll() {
			// 滚动后及时更新位置
			this.$refs.dropDown.init();
		},
		computed: {
			dropItem(name) {
				return (name) => {
					const result = {};
					const find = this.result.find(item => item.name === name);
					if (find) {
						result.label = find.label;
						result.value = find.value;
					} else {
						result.label = this[name].label;
						result.value = this[name].value;
					}
					return result;
				}
			},
			// 获取当前下拉筛选项
			currentDropItem() {
				return this[this.activeName];
			}
		},
		data() {
			return {
				// 表示value等于这些值，就属于默认值
				defaultValue: [0, 'all', '0'],
				// 筛选结果
				result: [{ name: 'order', label: '最新发布', value: 'new' }],
				// { name: 'order', label: '最新发布', value: 'new' }
				activeName: 'order',
				order: {
					label: '综合排序',
					value: 'all',
					activeIndex: 0,
					color: '#333',
					activeColor: '#2878ff',
					child: [{
						label: '综合排序',
						value: 'all'
					}, {
						label: '最新发布',
						value: 'new'
					}, {
						label: '低价优先',
						value: 'money'
					}]
				},
				type: {
					label: '文档格式',
					value: 'all',
					activeIndex: 0,
					color: '#333',
					activeColor: '#2878ff',
					child: [{
						label: '全部',
						value: 'all'
					}, {
						label: 'PDF',
						value: 'pdf'
					}, {
						label: 'WROD',
						value: 'word'
					}, {
						label: 'PPT',
						value: 'ppt'
					}]
				},
				vip_type: {
					label: 'VIP文档',
					value: 0,
					activeIndex: 0
				}
			}
		},
		methods: {
			change(e) {
				console.log('弹窗打开状态：',e);
			},
			/**
			 * 点击每个筛选项回调
			 * @param {Object} e { name, active, type } = e
			 */
			selectMenu(e) {
				const { name, active, type } = e;
				this.activeName = name;
				// type 等于1 的需要特殊处理：type不等于1可以忽略
				if (type == 1) {
					this.clickItem({
						name: 'vip_type',
						label: 'VIP文档',
						value: e.active ? 1 : 0
					});
				} else {
					const find = this.result.find(item => item.name == this.activeName);
					if (find) {
						const findIndex = this[this.activeName].child.findIndex(item => item.label == find.label && item.value == find.value);
						this[this.activeName].activeIndex = findIndex;
					} else {
						this[this.activeName].activeIndex = 0;
					}
				}
			},
			/**
			 * 点击菜单回调处理
			 * @param {Object} item 选中项 { label,value } = e
			 */
			clickItem(e) {
				// 下面有重新赋值，所以用let
				let { label, value } = e;
				const findIndex = this.result.findIndex(item => item.name == this.activeName);
				if (this.defaultValue.indexOf(value) > -1 && this[this.activeName].label) {
					label = this[this.activeName].label;
				}
				// 已经存在筛选项
				if (findIndex > -1) {
					this.$set(this.result, findIndex, {
						name: this.activeName,
						label,
						value
					})
				} else {
					this.result.push({
						name: this.activeName,
						label,
						value
					});
				}
				this.result = this.result.filter(item => this.defaultValue.indexOf(item.value) == -1);
				uni.showModal({
					content: `筛选的值：${JSON.stringify(this.result)}`
				})
			}
		}
	}
</script>