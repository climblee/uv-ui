export default {
	props: {
		// 瀑布流数据
		// #ifdef VUE2
		value: {
			type: Array,
			default: () => []
		},
		// #endif
		// #ifdef VUE3
		modelValue: {
			type: Array,
			default: () => []
		},
		// #endif
		// 数据的id值，根据id值对数据执行删除操作
		// 如数据为：{id: 1, name: 'uv-ui'}，那么该值设置为id
		idKey: {
			type: String,
			default: 'id'
		},
		// 每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好，单位ms
		addTime: {
			type: Number,
			default: 200
		}
	}
}