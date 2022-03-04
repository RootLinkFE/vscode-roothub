import { ExtensionContext } from 'vscode';
import { EventEmitter } from 'events';

let extensionContext: ExtensionContext =
  undefined as unknown as ExtensionContext;
let events = new EventEmitter();

export default {
  extensionContext,
  events,
};
