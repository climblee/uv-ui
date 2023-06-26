## 1.0.14（2023-06-25）
1. 欢迎加QQ群交流：[549833913](https://www.uvui.cn/components/addQQGroup.html)
2. 优化 uv-count-down 增加外部样式customStyle参数
3. 优化 文档的全面优化
4. 修复 uv-count-to 1. 修复继续滚动的函数 2. 修改文档错误 4. 适配px和rpx的单位 4. 适配customStyle参数
5. 修复 uv-load-more 修复customStyle参数设置背景等不生效的BUG
6. 修复 uv-code-input 优化下边框
7. 修复 uv-tabs 添加uv-icon依赖
8. 修复 uv-grid 优化修改
9. 修复 uv-cell 优化修改
## 1.0.13（2023-06-20）
1. 优化 uv-calendar formatter格式化中增加topInfo参数
2. 优化 uv-tabs 增加customStyle参数
3. 优化 文档优化，便于开发者直接开干
4. 优化 uv-switch 优化size属性，适配单位传递
5. 修复 uv-ui-tools、uv-form、uv-picker 修复vue3编译支付宝异常
6. 修复 uv-ui-tools、uv-form、uv-picker 修复vue3编译支付宝异常
7. 修复 uv-parse 修复在nvue不显示的BUG
8. 修复 uv-form 修复某些条件下报错的BUG
## 1.0.12（2023-06-14）
1. 优化部分组件，优化文档部分细节
2. uv-popup、uv-modal 修复遮罩层zIndex问题
3. uv-form 在vue3的setup语法中ref使用uvForm会导致报错
4. uv-tabs activeStyle设置字体大小，可能会导致下划线位置不对BUG
5. uv-pick-color 百度小程序点击报错
6. uv-transition 恢复this.$nextTick
7. uv-picker 抖音小程序选择的时候报错，导致不能关闭的BUG
8. uv-checkbox 多余的属性labelDisabled，导致APP中报错提示
9. uv-tabbar 底部安全距离组件无效的BUG
10. uv-vtabs 头部存在的时候，联动不准确的BUG
## 1.0.11（2023-06-12）
1. uv-radio-group、uv-checkbox-group 兼容自定义样式customStyle，方便通过样式调整整体位置等，数据较多时允许换行
2. uv-ui-tools 优化内置样式等，解决微信小程序使用uvui提示 Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors，[详情](https://www.uvui.cn/components/problem.html)
3. uv-datetime-picker 取消defaultIndex参数，目前传该值也没实际意义
4. uv-tabbar 增加iconSize参数
5. uv-calendar 增加change回调
6. uv-calendar 修复BUG
7. uv-rate 修复只读或禁止状态下设置value无效的问题
8. uv-popup 修复zIndex问题
9. uv-modal 修复zIndex问题
10. 文档-扩展配置更新：[扩展配置](https://www.uvui.cn/components/setting.html)
11. 文档-优化更新：[uv-ui文档](https://www.uvui.cn/components/changelog.html)
12. 文档-新增常见问题：[常见问题](https://www.uvui.cn/components/problem.html)
13. 优化其他
## 1.0.10（2023-06-05）
1. uv-navbar 渐变背景色兼容
2. uv-calendar 日历选择BUG修复
## 1.0.9（2023-06-05）
1. 新增uv-vtabs垂直选项卡组件，主要用于分类展示，分类切换功能，支持联动和不联动两种模式
2. uv-qrcode，uv-datetime-picker，uv-subsection等文档说明优化，避免开发困难；优化API相关说明
3. uv-notice-bar 1. 修复在触发error函数报错的BUG；2. 修复在text值为undefined的时候，解决报错BUG
4. uv-button 等组件修复触发两次事件的BUG
5. uv-datetime-picker 1. 修复重置值存在不更新的BUG；2. 优化文档，增加filter使用方法说明
6. uv-badge 修复type等属性为null或undefined的时候不显示徽标的BUG
7. uv-ui-tools 优化工具组件，兼容更多功能，小程序分享功能优化等
...
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
