import {ErrorHandler, Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {AppError} from '../types/Error';

@Injectable({providedIn: 'root'})
export class AppErrorHandler implements ErrorHandler {

  constructor() {
  }

  // TODO: use errorsKeys
  async handleError(error: Error | HttpErrorResponse) {

    let msg = 'Something went wrong. Please, contact site administrator';

    // if (error instanceof HttpErrorResponse) {
    //   // Server connection error
    //   if (!navigator.onLine) {
    //     // Handle offline error
    //     msg = 'No internet connection';
    //     alert(msg);
    //   } else {
    //     // Handle Http Error (error.status === 403, 404...)
    //     switch (error.status) {
    //       case 400:
    //         if (isBeError(error.error)) {
    //           msg = await this.translate.get((<IBeError>error.error).errorMessage.message).toPromise();
    //         } else if (isBeErrorDetailed(error.error)) {
    //           msg = await this.generateErrorMessage((<IBeErrorDetailed>error.error).errorMessage.errorMessageDetails);
    //         }
    //         this.notification.danger(msg);
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    // } else {
    //   // Handle Client Error (Angular Error, ReferenceError...)
    //   if (error instanceof AppError) {
    //     msg = error.message;
    //     alert(msg);
    //   }
    // }

    console.error(error);

  }

  // private async generateErrorMessage(messages: IBeErrorMessageDetail[]): Promise<string> {
  //   try {
  //     let msg = '';
  //     let counter = 0;
  //     for (const details of messages) {
  //       msg += await this.translate.get(details.message).toPromise();
  //       if (counter < messages.length - 1) {
  //         msg += '; ';
  //       }
  //       counter++;
  //     }
  //     return msg;
  //   } catch (e) {
  //     console.error(e);
  //     return '';
  //   }
  // }

}
