# Change Log

All notable changes to the "roothub" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.3.4]
- feat: api-axios-request 声明生成方法

## [1.3.3]
- chore: 文本检索功能-放开大小写，增加esc事件

## [1.3.2]
- chore: 即时搜索-api内容文本检索功能增强，增加上下跳转功能

## [1.3.1]
- chore: 维护百度OCR-appid、secrect，使OCR可以主动获取token
- chore: 文本生成方法增加Object、AntdForm、Element-From、basenObject
- fix: baiduApiToken from Settings

## [1.3.0]
- feat: 右键菜单-OpenApi-CodeGen即时搜索；api详情搜索功能（CSS Custom Highlight）
- feat: 右键菜单-OpenApi-CodeGen匹配代码
- feat: 左侧选择树收起功能
- fix: formatUrlChar match index.html

## [1.2.4]
- chore: 新增代码匹配全替换方法
- fix: textCodeGenElementTable
- chore: 新增el-table-column的代码替换方法：generate-el-table-column-transcoding

## [1.2.3]
- fix: 基础设置参数设置问题 
- fix: 修复api请求函数注释生成

## [1.2.2]
- fix: storageHistoryTexts储存再显示问题

## [1.2.1]
- fix: ExtractBaiduOcrapi 跨域问题；baiduApiToken维护

## [1.2.0]
- feat: 文本翻译功能-接入百度翻译；基础配置弹窗
- ref: 下拉菜单增加刷新按钮功能
- ref: api请求函数注释生成-增加children注释
- chore: 文本拼接功能；历史文本弹窗优化

## [1.1.15]
- ref: api名称生成

## [1.1.14]
- ref: AvueColumn代码与接口文档结合方法加强

## [1.1.13]
- ref: 文本代码生成方法补充
- fix: api生成方法完善
- ref: ocrapi默认选择ExtractBaiduOcrapi；还原按钮；提取页面调整
- ref: AvueSearchColumns

## [1.1.12]
- ref: 原始代码与响应参数匹配字段-加强非完整数组功能

## [1.1.11]
- fix: 生成base64图片的样式影响，提升截图文字提取精度

## [1.1.10]
- feat: baidu-ocrapi升级，提升长截图的文字提出精度

## [1.1.9]
- feat: 原始代码与响应参数匹配字段功能
- ref: 分割剔除非中文及英文-方法
- ref: api请求函数注释生成-增加description

## [1.1.8]
- ref: api-paths 代码生成
- fix: resources-tree设置min-width
- fix: dataSaveToJSON-selectedResource?.name

## [1.1.7]
- fix: api-复制处理

## [1.1.6]
- fix: url获取钱加强正则过滤
- ref: api-处理接口传参格式

## [1.1.5]
- feat: 分割文本过滤方法集成
- fix: api下拉代码生成修改为响应式

## [1.1.4]
- fix: avue-column方法中row.description报错

## [1.1.3]
- fix: generateTableColumnsProps增加searchPlaceholder

## [1.1.2]
- feat: 文字提取方法支持使用和定义自定义方法
- chore: 代码生成方法avue-pro-table

## [1.1.1]
- chore: 粘贴图片上传功能
- fix: observer(HistoryTextDropdown)

## [1.1.0]

- feat: 图片提取文本功能，文本结合api-docs生成匹配代码
- feat: 图片提取文本增加历史记录功能
- fix: 自定义方法编辑form默认值修复

## [1.0.10]

- fix: api生成方法修复

## [1.0.9]

- feat: api请求函数注释生成
- chore: 枚举生成生成结果补强

## [1.0.8]

- chore: api定义生成增加前缀自动添加设置，拥有默认前缀（对应url地址）
- chore: menu title 右侧增加api数量显示

## [1.0.7]

- fix: 修复codegen.custom-method的avueTable自定义生成方法
## [1.0.6]

- feat[codegen]: 新增导出json功能

## [1.0.5]

- chore[codegen]: api生成方法增强

## [1.0.4]

- fix[codegen]: 增加url对doc.html的过滤

## [1.0.3]

- fix[codegen]: 调整遗留历史方法,修复部分选择数据问题
- feat[codegen]: 显性生成代码入口; 选中复制样式; 回车调用获取

## [1.0.2]

- fix[codegen]: 修复yarn依赖问题

## [1.0.1]

- feat[codegen]: 自定义方法增加排序、状态

## [1.0.0]

- feat[codegen]: swagger-ui2.0模式;自定义代码在线编辑；json、yaml文件格式支持；增加部分快捷复制功能

## [0.1.3]

- fix[codegen]: 修复`swagger`使用 knfie4j 工具类-需补充接口headers

## [0.1.2]

- fix[codegen]: 修复请求 url 错误未回调问题
- feat[codegen]: url 记忆功能

## [0.1.1]

- fix[codegen]: 修复请求 url 中文时错误问题

## [0.1.0]

- chore[codegen]: CodeSandBox 使用提示

## [0.0.9]

- fix[codegen]: 解决跨域问题

## [0.0.8]

- fix[codegen]:url 变更时存在缓存问题&细节优化

## [0.0.7]

- 新增 CodeGen 接口文档 url 链接使用说明

## [0.0.5]

- 修复 CodeGen 生成全部枚举 bug

## [0.0.4]

- 修复细节&补充文档说明
