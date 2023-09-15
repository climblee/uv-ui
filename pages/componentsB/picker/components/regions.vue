<template>
	<view>
		<uv-picker ref="picker" :columns="addressList" :loading="loading" keyName="name" @change="change" @confirm="confirm"></uv-picker>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loading: true,
				provinces: [], //省
				citys: [], //市
				areas: [], //区
				pickerValue: [0, 0, 0],
				defaultValue: [3442, 1, 2],
				prevIndex: 0
			}
		},
		created() {
			this.getData();
		},
		computed: {
			addressList() {
				return [this.provinces, this.citys, this.areas];
			}
		},
		methods: {
			getData() {
				uni.request({
					method: 'GET',
					url: '/static/uvui/example/regions.json',
					success: res => {
						const { statusCode, data } = res
						if (statusCode === 200) {
							console.log('获取的数据：', res);
							this.provinces = data.sort((left, right) => (Number(left.code) > Number(right.code) ? 1 : -1));
							console.log(this.provinces)
							this.handlePickValueDefault()
							setTimeout(() => {
								this.loading = false
							}, 200)
						}
					}
				})
			},
			handlePickValueDefault() {
				// 设置省
				this.pickerValue[0] = this.provinces.findIndex(item => Number(item.id) === this.defaultValue[0]);
				// 设置市
				this.citys = this.provinces[this.pickerValue[0]]?.children || [];
				this.pickerValue[1] = this.citys.findIndex(item => Number(item.id) === this.defaultValue[1]);
				// 设置区
				this.areas = this.citys[this.pickerValue[1]]?.children || [];
				this.pickerValue[2] = this.areas.findIndex(item => Number(item.id) === this.defaultValue[2]);
				// 重置下位置
				this.$refs.picker.setIndexs([this.pickerValue[0], this.pickerValue[1], this.pickerValue[2]]);
			},
			change(e) {
				if (this.loading) return;
				const { columnIndex, index } = e
				// 改变了省
				if (columnIndex === 0) {
					this.prevIndex = index;
					this.citys = this.provinces[index]?.children || []
					this.areas = this.citys[0]?.children || []
					this.$refs.picker.setIndexs([index, 0, 0])
				} else if (columnIndex === 1) {
					this.areas = this.citys[index]?.children || []
					this.$refs.picker.setIndexs([this.prevIndex, index, 0])
				}
			},
			open() {
				this.$refs.picker.open();
				this.handlePickValueDefault()
			},
			confirm(e) {
				console.log('确认选择的地区：', e);
				uni.showToast({
					icon: 'none',
					title: `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
				})
			}
		}
	}
</script>