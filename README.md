# Meetyou Angular UI
这里是 Meetyou 的 Angular实现，开发和服务于企业级后台产品

---
#### [原因](#原因)
#### [特性](#特性)
#### [支持环境](#支持环境)
#### [安装](#安装)
#### [项目注入](#项目注入)
#### [浏览器引入](#浏览器引入)
---
  
> ## 原因
在项目的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，给设计师和工程师带来很多困扰和重复建设，大大降低了产品的研发效率。我们目标是统一项目的前端 UI 设计，屏蔽不必要的设计差异和实现成本，解放设计和前端的研发资源。
  
> ## 特性
- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 Angular 组件。
- 基于 npm + webpack + babel 的工作流，支持 ES2015。
  
> ## 支持环境
现代浏览器和 IE9 及以上。
  
> ## 安装
我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
  
```
$ npm install meetyou-angular-ui --save
```
```
$ yarn add meetyou-angular-ui
```
如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。
  
> ## 项目注入

```
angular.module('app', [
  'meetyou-angular-ui',
]);
```
  
> ## 浏览器引入
在浏览器中使用 script 和 link 标签直接引入文件，并使用全局变量 meetyou-angular-ui。
我们在 npm 发布包内的 meetyou-angular-ui/dist 目录下提供了 meetyou-angular-ui.js meetyou-angular-ui.css 以及 meetyou-angular-ui.min.js meetyou-angular-ui.min.css。
> 强烈不推荐使用已构建文件，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。
