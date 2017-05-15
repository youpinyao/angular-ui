# 组件开发说明
## 代码规范
1. 参照 [https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/zh-CN.md](https://github.com/johnpapa/angular-styleguide/blob/master/a1/i18n/zh-CN.md)。
2. 如果开发的组件依赖其它组件，需在开发组件上注入依赖组件模块。
3. 尽量使用 scss 语法。
## 组建命名
1. 组件模块命名：meetyou.angular.ui.xxxx，例如：meetyou.angular.ui.button、meetyou.angular.ui.menu。
2. 指令命名：ma 开头，例如：maButton，maMenu。
3. 指令参数命名：ma 开头，例如：maType，maMin，maMax。
4. 样式命名：ma 开头，例如：.ma-input、.ma-menu。
## 组件新建步骤
1. 在 src/components下按照自己所要开发组件的名称新建一个目录(组件目录下文件分布基础结构按照src/components/sample)。
2. 对应组件样式按照 scss 语法书写，在 src/scss 下新建组件名对应的 scss 文件，下划线开头（例如：_button.scss），之后在 src/scss/app.scss 下引入。
3. 在src/index.js 下注入对应组件模块。
## 范例开发
### 启动

```
npm i（安装项目依赖模块）
npm run start（启动范例项目）
```
### 访问范例项目

```
http://localhost:8686（浏览器上输入）
```
### 新建对应组件范例页面
1. 在 example/pages/components对应分类目录 下新建开发组件目录及文件（范例：参照已有组件的目录及文件命名方式）。
2. 在 example/js/routerConfig.js 下配置对应页面路由。
3. 范例内容书写结构参照[Ant Design of React](https://ant.design/docs/react/introduce-cn)
