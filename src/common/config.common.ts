import * as config from 'config';
import * as _ from 'lodash';

class ConfigCommon {

    private envKey(key) {
        return _.replace(key, /\./g, '_');
    }

    public get(key: string): any {
        const value = process.env[this.envKey(key)];
        if (value !== undefined && value !== null) return value;
        return config.get(key);
    }

    public getOrThrow(key: string): any {
        const value = process.env[this.envKey(key)];

        if (value) {
            return process.env[this.envKey(key)];
        } else {
            if (!config.has(key)) {
                console.log(`无法读取 ${key} 的配置`);
                throw Error(`配置读取失败`);
            }
            return config.get(key);
        }
    }

}

export const Config = new ConfigCommon();