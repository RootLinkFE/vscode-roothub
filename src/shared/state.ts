/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-07-27 17:12:59
 * @Description: 
 */
import { ExtensionContext } from 'vscode';
import { EventEmitter } from 'events';

let extensionContext: ExtensionContext = (undefined as unknown) as ExtensionContext;
let events = new EventEmitter();
let isDevelopment = false; // 是否开发环境
let codeGenSetting = {
  language: 'zh-CN',
  theme: 'default',
  apiurlPrefixList: [],
  baiduTransAppid: '',
  baiduTransSecret: '',
};
let codeGenCustomMethods: any[] = [];

export default {
  extensionContext,
  events,
  isDevelopment,
  codeGenSetting,
  codeGenCustomMethods,
};
