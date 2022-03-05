const fse = require('fs-extra');
const path = require('path');
import { Uri, Webview } from 'vscode';
import globalState from './state';
/**
 * config配置数组去重
 */
export const uniq = (elements: Array<string | number>) => {
  if (!Array.isArray(elements)) {
    return [];
  }

  return elements.filter((element, index) => index === elements.indexOf(element));
};

/**
 * 清除config配置数组里面的非法值
 */
export const clean = (elements: Array<string | number>) => {
  if (!Array.isArray(elements)) {
    return [];
  }

  return elements.filter((element) => !!element);
};

export function getTemplateFileContent(tplName: string) {
  const tplPath = path.join(globalState.extensionContext.extensionPath, 'templates', tplName);
  const html = fse.readFileSync(tplPath, 'utf-8');
  return html;
}

export function getTemplateFileListContent(tplPaths: string | string[], webview: Webview) {
  if (!Array.isArray(tplPaths)) {
    tplPaths = [tplPaths];
  }
  const tplPath = path.join(globalState.extensionContext.extensionPath, 'templates', ...tplPaths);
  const html = fse.readFileSync(tplPath, 'utf-8');
  const extensionUri = globalState.extensionContext.extensionUri;
  const dirUri = tplPaths.slice(0, -1).join('/');
  return formatHTMLWebviewResourcesUrl(html, (link) => {
    if (link.indexOf('/') === 0) {
      link = link.substring(1);
    }
    return webview
      .asWebviewUri(Uri.parse([extensionUri, 'templates', dirUri, link].join('/')))
      .toString();
  });
}

function isRemoteLink(link: string) {
  return /^(https?|vscode-webview-resource|javascript):/.test(link);
}

export function formatHTMLWebviewResourcesUrl(
  html: string,
  conversionUrlFn: (link: string) => string
) {
  const linkRegExp = /\s?(?:src|href)=('|")(.*?)\1/gi;
  let matcher = linkRegExp.exec(html);

  while (matcher) {
    const origin = matcher[0];
    const originLen = origin.length;
    const link = matcher[2];
    if (!isRemoteLink(link)) {
      let resourceLink = link;
      try {
        resourceLink = conversionUrlFn(link);
        html =
          html.substring(0, matcher.index) +
          origin.replace(link, resourceLink) +
          html.substring(matcher.index + originLen);
      } catch (err) {
        console.error(err);
      }
    }
    matcher = linkRegExp.exec(html);
  }
  return html;
}
