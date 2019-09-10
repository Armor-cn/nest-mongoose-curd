export declare class BaseException extends Error {
    protected errorMessage: string;
    protected errorCode: number;
    protected errorDebug: object;
    private replace?;
    constructor(code: number, options?: object, replace?: object);
    readonly message: string;
    readonly statusCode: number;
    readonly debug: object;
    protected convertValue(key: string, default_value?: any): any;
    private get;
}
