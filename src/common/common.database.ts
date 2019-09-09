import * as mongoose from 'mongoose';
import { Config } from './config.common';
export const mongodb = async () => {
    const url = Config.getOrThrow('database.mongodb.url');
    return mongoose.connect(url, {
        reconnectTries: 50,
        reconnectInterval: 3 * 1000,
        keepAlive: 1,
        connectTimeoutMS: 30 * 1000,
        useNewUrlParser: true,
    });
};