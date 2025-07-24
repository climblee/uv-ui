<template>
	<view class="uv-swipe-action">
		<slot></slot>
	</view>
</template>

<script>
	import mpMixin from '@/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js'
	import mixin from '@/uni_modules/uv-ui-tools/libs/mixin/mixin.js'
	import props from './props.js';
	/**
	 * SwipeAction 滑动单元格 
	 * @description 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作
	 * @tutorial https://www.uvui.cn/components/swipeAction.html
	 * @property {Boolean}	autoClose	是否自动关闭其他swipe按钮组
	 * @event {Function(index)}	click	点击组件时触发
	 * @example	<uv-swipe-action><uv-swipe-action-item :rightOptions="options1" ></uv-swipe-action-item></uv-swipe-action>
	 */
	export default {
		name: 'uv-swipe-action',
		mixins: [mpMixin, mixin, props],
		data() {
			return {
        openedCellItem: [],
        itemsCanClick: true
      }
		},
		provide() {
			return {
				swipeAction: this
			}
		},
		computed: {
			// 这里computed的变量，都是子组件uv-swipe-action-item需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
			// 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(uv-swipe-action-item)
			// 拉取父组件新的变化后的参数
			parentData() {
				return [this.autoClose]
			}
		},
		watch: {
			// 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
			parentData() {
				if (this.children.length) {
					this.children.map(child => {
						// 判断子组件(uv-swipe-action-item)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
						typeof(child.updateParentData) === 'function' && child.updateParentData()
					})
				}
			},
		},
		created() {
			this.children = []
		},
		methods: {
      closeOther(child) {
        this.itemsCanClick = this.computeClickStatus()
        if (this.autoClose) {
          // 历遍所有的单元格，找出非当前操作中的单元格，进行关闭
          this.openedCellItem.map((item, index) => {
            if (item !== child)
              item.statusChangeHandler('close')
          })
        }
      },
      computeClickStatus(name) {
        let openedCellIds = this.openedCells()
        // autoClose为true，只会有一个cell处于打开状态
        if (this.openedCellItem.length !== 0 && !openedCellIds.includes(name)) return false
        if (this.openedCellItem.length !== 0 && openedCellIds.includes(name)) {
          // 关闭这个打开的cell
          this.closeByName(name)
          return false
        }
        return true
      },
      itemsClickStatus() {
        return this.itemsCanClick
      },
      openedCells() {
        let openedCellList = []
        this.openedCellItem.forEach(item => openedCellList.push(item.name))
        return openedCellList
      },
      handleOpenedCells(child, status, name) {
        // open添加，close移除，如果有的话
        let childIndex = this.openedCellItem.indexOf(child)
        if (status === 'open' && childIndex === -1) {
          this.openedCellItem.push(child)
        } else if (status === 'close' && childIndex !== -1) {
          this.openedCellItem.splice(childIndex, 1)
        }
      }
		}
	}
</script>
