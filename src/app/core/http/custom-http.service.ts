import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  constructor(private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService) { }

  /**
   * Creates a generic get request. T: responseType
   * @param url: url without the base url
   * @returns: an observable for the request
   */
  get<T>(url: string, params: {name: string, value: string}[] = [] ): Observable<T> {
    let httpParams = new HttpParams();
    params.forEach(param => httpParams = httpParams.append(param.name, param.value));
    return this.httpClient
          .get<T>(`${environment.twitterAPIUrlBase}${url}`, {params: httpParams})
          .pipe(catchError(err => this.httpErrorHandler.handle(err)));
  }

  /**
   * Creates a generic post request. T: responseType, U: requestType
   * @param url: url without the base url
   * @returns: an observable for the request
   */
  post<T, U>(url: string, payload: U, headers: {name: string, value: string}[] = []): Observable<any> {
    // let httpHeaders: HttpHeaders = new HttpHeaders();
    // headers.forEach(h =>
    //   httpHeaders = httpHeaders.append(h.name, h.value)
    // );
    // const httpHeaders: HttpHeaders = new HttpHeaders({
    //   'Authorization': 'Basic MUQweXBmQmVBZnR4MWlaZ1FnNllRZ1pPTjp3UjdhWmpBZ1lZYmxzd0xiclpVQm90ZmhvSWRGb3poMldXbnV3bDh3SXZaUDhKbEpCZw==',
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    return this.httpClient
          .post<T>(`${environment.twitterAPIUrlBase}${url}`, payload, {
            responseType: 'json'
          })
          .pipe(catchError(err => this.httpErrorHandler.handle(err)));
  }
}
