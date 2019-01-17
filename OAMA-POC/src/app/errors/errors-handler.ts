import { ErrorHandler, Injectable } from '@angular/core';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(err: Error) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    console.error('It happens: ', err);
  }
}
