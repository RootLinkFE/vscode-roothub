<div align="center">
<img src="https://avatars.githubusercontent.com/u/76474279?s=200&v=4" alt="前端盒子插件" width="148"/>

# RootHub VSCode 插件

**RootHub 前端研发平台**

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/giscafer.roothub.svg?label=Marketplace&style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=giscafer.roothub)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/giscafer.roothub.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=giscafer.roothub)
[![Rating](https://img.shields.io/visual-studio-marketplace/stars/giscafer.roothub.svg?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=giscafer.roothub)

</div>

## Features

- RootHub 物料平台
  - http://roothub.leekhub.com/
- CodeGen
  - 弹窗 ProForm 表单配置代码生成
  - 分页查询接口列表页面代码直接生成（基于 RhTable 组件）
  - 枚举生成
  - Table 列配置生成
  - 可替代 swagger 接口文档查看接口详情

## TODO

- WIP……
- 欢迎提建议

## Screenshots

### CodeGen 工具

![](./screenshots/codegen.png)

## Development QuickStart

插件开发阅读文档： `./vsc-extension-quickstart.md`

工具应用开发采用 `git submodule` 解耦的方式，工具应用单独仓库&单独开发维护，插件打包时会对工具应用分别进行构建打包成静态资源加载。

如果工具应用需要和插件通信，则需要开发环境下进行联调，具体参考 roothub-codegen 工具开发的说明
