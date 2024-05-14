/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2023-08-18 13:44:10
 * @Description: 
 */
const vscode = require('vscode');

export const getPreviousEditorText = () => {
  let activeEditor = vscode.window.activeTextEditor;
  let previousEditor = activeEditor.document._savedDecorations[activeEditor.document._savedDecorations.length - 2];
  // let previousFileUri = previousEditor.document.uri;

  let selection = previousEditor.selection;
  let selectedText = previousEditor.document.getText(selection);
  console.log(previousEditor, selectedText);
  return selectedText;
};

// do something with previousFileUri and selectedText
