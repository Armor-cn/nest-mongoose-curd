import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseException } from './exception.base';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let statusCode: number;
        let message: string;
        if (exception.error_code && exception.error) {
            statusCode = exception.error_code;
            message = exception.error;
        } else if (exception instanceof HttpException) {
            statusCode = exception.message.statusCode;
            message = exception.message.message;
        } else if (exception instanceof BaseException) {
            statusCode = exception.statusCode;
            message = exception.message;
        } else if (exception.message.statusCode && exception.message.message) {
            statusCode = exception.message.statusCode;
            message = exception.message.message;
        } else if (exception.response && exception.response.data.statusCode && exception.response.data.message) {
            statusCode = exception.response.data.statusCode;
            message = exception.response.data.message;
        } else {
            statusCode = 500;
            message = '服务故障';
        }

        response
            .status(statusCode ? this.getCode(statusCode) : 500)
            .json({
                statusCode,
                message,
                timestamp: new Date().toLocaleString(),
                path: request.url,
            });
    }

    /**
     * 将 40001, 转换成 400
     */
    private getCode(status_code: number) {
        return Number(String(status_code).substr(0, 3));
    }

}
