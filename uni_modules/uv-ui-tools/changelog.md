## 1.0.7（2023-06-07）
1. 解决微信小程序使用uvui提示 Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors
2. 解决上述提示，需要在uni.scss配置$uvui-nvue-style: false; 然后在APP.vue下面引入uvui内置的基础样式:@import '@/uni_modules/uv-ui-tools/index.scss';
## 1.0.6（2023-06-04）
1.  uv-ui-tools 优化工具组件，兼容更多功能
2.  小程序分享功能优化等
## 1.0.5（2023-06-02）
1. 修改扩展使用mixin中方法的问题
## 1.0.4（2023-05-23）
1. 兼容百度小程序修改bem函数
## 1.0.3（2023-05-16）
1. 优化组件依赖，修改后无需全局引入，组件导入即可使用
2. 优化部分功能
## 1.0.2（2023-05-10）
1. 增加Http请求封装
2. 优化
## 1.0.1（2023-05-04）
1. 修改名称及备注
## 1.0.0（2023-05-04）
1. uv-ui工具集首次发布
