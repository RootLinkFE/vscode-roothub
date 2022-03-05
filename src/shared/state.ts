import { ExtensionContext } from 'vscode';
import { EventEmitter } from 'events';

let extensionContext: ExtensionContext = undefined as unknown as ExtensionContext;
let events = new EventEmitter();
let isDevelopment = false; // 是否开发环境

export default {
  extensionContext,
  events,
  isDevelopment,
};
