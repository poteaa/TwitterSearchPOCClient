import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor() { }

  handle(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client error
      console.log('Client error.');
      console.error(error);
    } else {
      // Server error
      console.log('Server error.');
    }
    return throwError (error);
}
}
