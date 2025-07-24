export default {
    methods: {
        // 关闭时执行
        closeHandler() {
            this.status = 'close'
        },
        closeOther() {
            // 尝试关闭其他打开的单元格
            this.parent && this.parent.closeOther(this)
        },
        statusChangeHandler(status) {
            if (status === this.status) return // 没有变化
            this.$emit('statusChange', {
                fromStatus: this.status,
                toStatus: status,
                index: this.name
            })
            this.status = status
            // 维护开启状态的单元格列表
            this.parent && this.parent.handleOpenedCells(this, status, this.name)
        },
    }
}