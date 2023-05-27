## 1.0.8（2023-05-27）
1. uv-waterfall修复在百度小程序中可能存在的BUG；去掉原有的slot方式
2. uv-image修复可能报错的问题
3. uv-pick-color 在文档预览模式中无法点击的问题
4. uv-index-list 修复select事件不触发的问题
5. 优化其他组件及示例项目等
## 1.0.7（2023-05-25）
1. uv-icon 将线上ttf字体包替换成base64，避免加载时或者网络差时候显示白色方块
2. uv-text 去掉多余的data-index属性，避免警告
3. uv-upload 在fileList的watch中增加deep属性
4. uv-pick-color 去掉template中存在的this.导致头条小程序编译警告
5. uv-image 去掉template中存在的this.导致头条小程序编译警告
## 1.0.6（2023-05-23）
1. 新增uv-pick-color颜色选择器组件
2. uv-toolbar组件增加showBorder属性，是否显示下边框
3. uv-transition组件在百度小程序等平台不支持this.$nextick导致下面的逻辑不执行，使用延时替换方案
4. uv-ui-tools组件中bem()函数兼容百度/头条小程序等
5. uv-waterfall组件修复在百度/头条小程序显示异常等BUG，增加changeList回调函数处理数据，同步更新示例等
6. uv-image组件修复在百度/头条小程序等开启observeLazyLoad后显示异常BUG
7. uv-tabs组件修复上次更新导致的在nvue中不滚动的BUG
8. uv-qrcode组件修复在部分平台不显示加载的BUG
9. 修复其他已知问题等
## 1.0.5（2023-05-17）
1. 新增uv-qrcode二维码组件
2. 修复uv-tooltip在vue2模式下的BUG
3. 优化部分问题
## 1.0.4（2023-05-16）
1. 优化组件依赖，修改后无需全局引入，组件导入即可使用
2. 优化部分功能
## 1.0.3（2023-05-12）
1. 修复uv-input在vue3模式下双向绑定问题
2. 修复uv-textarea在vue3模式下双向绑定问题
3. 修复uv-rate在vue3模式下双向绑定问题
## 1.0.2（2023-05-11）
1. 更新文档
2. 增加插件下载入口
## 1.0.1（2023-05-10）
1. 所有组件依赖
2. 上传示例项目
## 1.0.0（2023-05-10）
1. uv-ui
