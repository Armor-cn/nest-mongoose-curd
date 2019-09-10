import * as express from 'express';
import { Logger } from '@nestjs/common';

export function LoggerMiddleware(req: express.Request, res: express.Response, next: Function) {
    if (req && req.method !== 'HEAD') Logger.log(formatRequest(req));
    next();
}

function formatRequest(req: express.Request) {
    return JSON.stringify({
        path: req.path,
        method: req.method,
        params: req.params,
        body: req.body,
        query: req.query,
        token: req.headers.authorization || req.headers.token,
    });
}
