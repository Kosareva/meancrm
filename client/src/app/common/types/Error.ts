export interface IBeErrorBase<T> {
    code: number;
    errorMessage: T;
}

export interface IBeError extends IBeErrorBase<any> {
    errorMessage: {
        message: string
    };
}

export interface IBeErrorMessageDetail {
    path: string;
    message: string;
}

export interface IBeErrorDetailed extends IBeErrorBase<any> {
    errorMessage: {
        errorMessageDetails: IBeErrorMessageDetail[]
    };
}

export function isBeError(e: IBeError): e is IBeError {
    return (<IBeError>e).errorMessage.message !== undefined && typeof (<IBeError>e).errorMessage.message === "string";
}

export function isBeErrorDetailed(e: IBeErrorDetailed): e is IBeErrorDetailed {
    return (<IBeErrorDetailed>e).errorMessage.errorMessageDetails !== undefined && (<IBeErrorDetailed>e).errorMessage.errorMessageDetails.length > 0 && typeof (<IBeErrorDetailed>e).errorMessage.errorMessageDetails[0].message === "string";
}

export class AppError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
