import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import * as lodash from 'lodash';
import { AxiosError } from 'axios';
export const _ = lodash;
class ExceptionVo {
    readonly statusCode: number;
    readonly message: string;
    readonly timestamp: string;
    readonly path: string;
    readonly error: string;
}

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();
        const request: Request = ctx.getRequest();

        this.printException(exception, request);

        /**
         * 判定 要不要返回异常
         */
        if (exception.response && [
            '/api',
        ].indexOf(request.path) >= 0 &&
            (exception.response.status != null && exception.response.data != null)) {
            // 兼容 Graphql
            return response
                .status(exception.response.status || 500)
                .json(exception.response.data || {});
        } else {
            const { statusCode, message } = AnyExceptionFilter.resolveException(exception);

            return response
                .status(statusCode ? this.getCode(statusCode) : 500)
                .json({
                    statusCode,
                    error: message,
                    message,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                } as ExceptionVo);
        }
    }

    /**
     * 万能异常解释器
     *
     * @static
     * @param {*} exception
     * @returns
     * @memberof AnyExceptionFilter
     */
    public static resolveException(exception: any): { statusCode: number, message: string } {
        let statusCode: number;
        let message: string;

        if (exception instanceof HttpException) {
            // 自身方法报错
            statusCode = exception.getStatus();
            message =exception.message
            /**
             * message会有两种形态
             * 1. 直接是string
             * 2. 直接给出 { code: string, params: string } 的格式
             * 判断逻辑就是，如果message是字符串，就直接给出，否则对object进行解析
             */
            const messageMessage: string | object | undefined = _.get(exception, 'message');
            const messageMessageCode: string | undefined = _.get(exception, 'response');
            console.log(messageMessage, messageMessageCode);
            console.log(exception);
            if (typeof messageMessage === 'string') {
                message = messageMessage || messageMessageCode || '';
            } else if (messageMessageCode != null) {
                message = messageMessageCode.replace('%s', _.get(exception, 'message', ''));
            } else {
                message = '';
            }
        } else if (exception.response && exception.response.data.statusCode && exception.response.data.message) {
            // 兼容标准的 nestjs
            statusCode = exception.response.data.statusCode;
            message = exception.response.data.message;
        } else if (exception.syscall === 'connect' && exception.code === 'ECONNREFUSED') {
            statusCode = HttpStatus.SERVICE_UNAVAILABLE;
            message = '部分服务不可用';
        } else {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            message = '服务异常';
        }
        return {
            statusCode,
            message,
        };
    }

    private printException(exception: any, request: Request) {
        // 两种特殊情况, 不需要打印错误日志
        if (_.get(exception, 'message') && _.get(exception, 'message.statusCode') === 404 && request.method === 'HEAD') return;
        if (process.env.NODE_ENV === 'test' && this.getCode(exception.error_code) !== 500 && request.method === 'HEAD') return;

        const isAxiosError = this.checkIsAxiosErrorInstance(exception);
        if (isAxiosError) {
            console.log(this.getSimpleAxiosError(exception));
        } else {
            console.log(exception);
        }
    }

    private getSimpleAxiosError(exception: AxiosError) {
        const error = new Error('HTTP接口调用报错');
        Object.assign(error, {
            status: _.get(exception, 'response.status'),
            statusText: _.get(exception, 'response.statusText'),
            response: {
                data: _.get(exception, 'response.data'),
                headers: _.get(exception, 'response.headers'),
            },
            request: {
                headers: _.get(exception, 'config.headers'),
                method: _.get(exception, 'config.method'),
                url: _.get(exception, 'config.url'),
                data: _.get(exception, 'config.data'),
            },
        });
        return error;
    }

    /**
     * 判断是否是 axios 抛出的错误实例
     * 另外, axios 并没有返回实例, 还是直接返回的错误对象
     *
     * @private
     * @param {*} exception
     * @returns {boolean}
     * @memberof AnyExceptionFilter
     */
    private checkIsAxiosErrorInstance(exception: any): boolean {
        if (_.get(exception, 'config') && _.get(exception, 'request') && _.get(exception, 'response')) return true;
        return false;
    }

    private getCode(status_code: number) {
        return Number(String(status_code).substr(0, 3));
    }

}
