> ## 组件文档：[https://www.uvui.cn](https://www.uvui.cn)
> ## 演示地址：[https://h5.uvui.cn](https://h5.uvui.cn)
> ## uv-ui 交流QQ群：<a href="https://www.uvui.cn/components/addQQGroup.html" target="_blank">549833913</a>

# 如需下载示例项目，请点击【下载插件并导入HBuilderX】或【使用 HBuilderX 导入示例项目】或【下载示例项目ZIP】，请不要点击【下载插件ZIP】。

## 预览

通过微信或浏览器扫码查看演示效果，后续上线小程序端等。

<img src="https://www.uvui.cn/common/h5_qrcode.png" width="200" height="200" />


## uv-ui产品特点

1. **uv-ui的前世今生**，`uv-ui` 是基于 `uview2.x` 版本改造而来。重命名也是为了避开发布冲突和很多组件 `u-`在  `nvue` 中不能使用的情况，所以这才诞生了`uv-ui`。感谢 `uview-ui` 作者的开源奉献，再次为开源点赞。 同时 `uv-ui` 也是无条件开源。

2. **全端兼容**，`uv-ui`支持App（vue）、App（nvue）、H5、小程序、VUE2、VUE3，支持nvue原生渲染。`uv-ui`的组件都是多端自适应的，底层会抹平很多小程序平台的差异或bug。

3. **集成工具**，`uv-ui`中的`uv-ui-tools`组件集成了强大的网络请求 `HTTP`   及常用的工具函数，无需自己再去寻找，并且直接挂载在`uni`上面，方便使用，只需要在`mian.js`中引入即可，更多工具请参考[文档](https://www.uvui.cn/js/http.html)。使用方式请参考[扩展配置-集成工具的使用](https://www.uvui.cn/components/setting.html)。

4. **主题扩展**，`uv-ui`中的`uv-ui-tools`组件下面的`theme.scss`为主题文件，直接在`uni.scss`中引入主题即可，可以根据自己的需求进行扩展。下面也有说明具体使用方式。使用方法请参考[扩展配置-自定义主题的使用](https://www.uvui.cn/components/setting.html)。

## 快速开始

`uv-ui` 目前暂时只支持单独导入个别组件使用方式。后续会根据情况加入其它使用方式，我一直推崇的是，既然开发`uni-app`项目，推荐直接使用`HBuilderX`创建项目和导入组件。

**1. 通过uni_modules下载入口，下载插件并导入HbuilderX。**

**温馨提示：** 导入插件后，建议`HBuilderX`重新运行项目，可能新导入的插件不能实时更新而导致不能运行。

**2. 直接在项目中使用，无需通过import引入组件。**

```html
<uv-icon name="baidu" size="30" color="#909399" ></uv-icon>
```

**3. 使用更强大的扩展功能。**

`uv-ui`内置了强大的工具函数、请求封装、全局配置等，可以根据自身需求进行扩展配置，详情请查看[扩展配置](https://www.uvui.cn/components/setting.html)。**只有扩展配置后才能在自己的项目页面中使用组件库内置方法**。

**4. 有开发相关的疑问不要生气，不要抱怨，不要骂人哦！直接加 `uv-ui` 的交流群手把手免费解决问题。**

## 通过uni_modules下载入口

下表为 `uv-ui` 的扩展组件清单，点击每个组件**点击下载&安装**即可在详情页面导入组件到项目下，导入后建议重新运行即可直接使用，组件无需import和注册。

| 组件名 | 组件说明 |
| --- | --- |
| uv-vtabs | [垂直选项卡](https://www.uvui.cn/components/vtabs.html) |
| uv-pick-color | [颜色选择器](https://www.uvui.cn/components/pickColor.html) |
| uv-qrcode | [二维码](https://www.uvui.cn/components/qrcode.html) |
| uv-waterfall | [瀑布流](https://www.uvui.cn/components/waterfall.html) |
| uv-row | [Layout 布局](https://www.uvui.cn/components/layout.html) |
| uv-icon | [图标](https://www.uvui.cn/components/icon.html) |
| uv-button | [按钮](https://www.uvui.cn/components/button.html) |
| uv-text | [文本](https://www.uvui.cn/components/text.html) |
| uv-link | [超链接](https://www.uvui.cn/components/link.html) |
| uv-image | [图片](https://www.uvui.cn/components/image.html) |
| uv-transition | [动画](https://www.uvui.cn/components/transition.html) |
| uv-form | [表单](https://www.uvui.cn/components/form.html) |
| uv-input | [增强输入框](https://www.uvui.cn/components/input.html) |
| uv-textarea | [增强文本域](https://www.uvui.cn/components/textarea.html) |
| uv-checkbox | [复选框](https://www.uvui.cn/components/checkbox.html) |
| uv-radio | [单选框](https://www.uvui.cn/components/radio.html) |
| uv-switch | [开关选择器](https://www.uvui.cn/components/switch.html) |
| uv-calendar | [日历](https://www.uvui.cn/components/calendar.html) |
| uv-picker | [选择器](https://www.uvui.cn/components/picker.html) |
| uv-datetime-picker | [时间选择器](https://www.uvui.cn/components/datetimePicker.html) |
| uv-code | [验证码倒计时](https://www.uvui.cn/components/code.html) |
| uv-keyboard | [键盘](https://www.uvui.cn/components/keyboard.html) |
| uv-rate | [评分](https://www.uvui.cn/components/rate.html) |
| uv-search | [多功能搜索框](https://www.uvui.cn/components/search.html) |
| uv-number-box | [步进器](https://www.uvui.cn/components/numberBox.html) |
| uv-upload | [上传](https://www.uvui.cn/components/upload.html) |
| uv-slider | [滑动选择器](https://www.uvui.cn/components/slider.html) |
| uv-list | [列表](https://www.uvui.cn/components/list.html) |
| uv-index-list | [索引列表](https://www.uvui.cn/components/indexList.html) |
| uv-tags | [标签](https://www.uvui.cn/components/tag.html) |
| uv-line-progress | [线形进度条](https://www.uvui.cn/components/lineProgress.html) |
| uv-badge | [徽标数](https://www.uvui.cn/components/badge.html) |
| uv-count-down | [倒计时](https://www.uvui.cn/components/countDown.html) |
| uv-count-to | [数字滚动](https://www.uvui.cn/components/countTo.html) |
| uv-avatar | [头像](https://www.uvui.cn/components/avatar.html) |
| uv-skeleton | [骨架屏](https://www.uvui.cn/components/skeleton.html) |
| uv-loading-icon | [加载动画](https://www.uvui.cn/components/loadingIcon.html) |
| uv-loading-page | [加载页](https://www.uvui.cn/components/loadingPage.html) |
| uv-load-more | [加载更多](https://www.uvui.cn/components/loadMore.html) |
| uv-empty | [内容为空](https://www.uvui.cn/components/empty.html) |
| uv-tooltip | [长按提示](https://www.uvui.cn/components/tooltip.html) |
| uv-alert | [警告提示](https://www.uvui.cn/components/alert.html) |
| uv-toast | [消息提示](https://www.uvui.cn/components/toast.html) |
| uv-notice-bar | [滚动通知](https://www.uvui.cn/components/noticeBar.html) |
| uv-notify | [消息提示](https://www.uvui.cn/components/notify.html) |
| uv-no-network | [无网络提示](https://www.uvui.cn/components/noNetwork.html) |
| uv-popup | [弹出层](https://www.uvui.cn/components/popup.html) |
| uv-modal | [模态框](https://www.uvui.cn/components/modal.html) |
| uv-cell | [单元格](https://www.uvui.cn/components/cell.html) |
| uv-swipe-action | [滑动单元格](https://www.uvui.cn/components/swipeAction.html) |
| uv-swiper | [轮播图](https://www.uvui.cn/components/swiper.html) |
| uv-collapse | [折叠面板](https://www.uvui.cn/components/collapse.html) |
| uv-grid | [宫格布局](https://www.uvui.cn/components/grid.html) |
| uv-tabbar | [底部导航栏](https://www.uvui.cn/components/tabbar.html) |
| uv-back-top | [返回顶部](https://www.uvui.cn/components/backTop.html) |
| uv-navbar | [自定义导航栏](https://www.uvui.cn/components/navbar.html) |
| uv-action-sheet | [底部操作菜单](https://www.uvui.cn/components/actionSheet.html) |
| uv-tabs | [标签选项卡](https://www.uvui.cn/components/tabs.html) |
| uv-steps | [步骤条](https://www.uvui.cn/components/steps.html) |
| uv-subsection | [分段器](https://www.uvui.cn/components/subsection.html) |
| uv-sticky | [吸顶](https://www.uvui.cn/components/sticky.html) |
| uv-parse | [富文本解析器](https://www.uvui.cn/components/parse.html) |
| uv-overlay | [遮罩层](https://www.uvui.cn/components/overlay.html) |
| uv-code-input | [验证码输入](https://www.uvui.cn/components/codeInput.html) |
| uv-read-more | [展开阅读更多](https://www.uvui.cn/components/readMore.html) |
| uv-line | [线条](https://www.uvui.cn/components/line.html) |
| uv-gap | [间隔槽](https://www.uvui.cn/components/gap.html) |
| uv-divider | [分割线](https://www.uvui.cn/components/divider.html) |

## 最后作者想说
- 开源真的不易，不图大家的钱财，所以希望大家多多鼓励支持，希望不要恶意评论，有问题加群快速解决。
- 遇到BUG，是一件很正常的事情，是程序肯定就有BUG，所以希望大家能以理解的心态去提出BUG，然后作者才有动力去努力修复。
- 最后觉得好用的小伙伴，不要吝啬你的双手，给个好评就是给我们最大的鼓励。

# 恶评者手下留情，有事加QQ群解决：549833913