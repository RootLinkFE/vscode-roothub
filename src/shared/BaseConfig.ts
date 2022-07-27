/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-06-08 15:07:53
 * @Description: 配置类
 */

import { workspace } from 'vscode';
import { clean, uniq } from './utils';

export class BaseConfig {
  static getConfig(key: string, defaultValue?: any): any {
    const config = workspace.getConfiguration();
    const value = config.get(key);
    return value === undefined ? defaultValue : value;
  }

  static setConfig(
    cfgKey: string,
    cfgValue: Array<any> | string | number | Object
  ) {
    const config = workspace.getConfiguration();
    return config.update(cfgKey, cfgValue, true);
  }

  static updateConfig(cfgKey: string, codes: Array<any>) {
    const config = workspace.getConfiguration();
    const updatedCfg = [...config.get(cfgKey, []), ...codes];
    let newCodes = clean(updatedCfg);
    newCodes = uniq(newCodes);
    return config.update(cfgKey, newCodes, true);
  }

  static removeConfig(cfgKey: string, code: string) {
    console.log(cfgKey, code);
    const config = workspace.getConfiguration();
    const sourceCfg = config.get(cfgKey, []);
    const newCfg = sourceCfg.filter((item: any) => {
      if (typeof item === 'object') {
        return (item.id || item.url) !== code;
      }
      return item !== code;
    });
    return config.update(cfgKey, newCfg, true);
  }
}
