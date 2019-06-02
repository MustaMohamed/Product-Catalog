import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
export class BaseService {

  protected baseUrl: string;
  protected options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'language-code': 'ar'
    })
  };

  constructor(private _http: HttpClient, baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected getAllData<T>(url: string): Observable<T> {
    let fullUrl: string = `${this.baseUrl}api/${url}`;
    return this._http.get(fullUrl)
      .pipe(
        tap(_ => console.log(`data fetched.`)),
        catchError(this.handleError<any>('getAll', []))
      );
  }

  protected getData<T>(url: string): Observable<T> {
    let fullUrl: string = `${this.baseUrl}api/${url}`;
    return this._http.get(fullUrl)
      .pipe(
        tap(_ => console.log(`data fetched.`)),
        catchError(this.handleError<any>('get', []))
      );
  }

  protected postData<T>(url: string, item: any): Observable<T> {
    let fullUrl: string = `${this.baseUrl}api/${url}`;
    return this._http.post(fullUrl, item, this.options)

      .pipe(
        tap(_ => console.log(`response fetched.`)),
        catchError(this.handleError<any>('postData', []))
      );
  }


  protected putData<T>(url: string, item: any): Observable<T> {
    let fullUrl: string = `${this.baseUrl}api/${url}`;
    return this._http.put(fullUrl, item, this.options)
      .pipe(
        tap(_ => console.log(`response fetched.`)),
        catchError(this.handleError<any>('putData', []))
      );
  }

  protected deleteData<T>(url: string): Observable<T> {
    let fullUrl: string = `${this.baseUrl}api/${url}`;
    return this._http.post(fullUrl, null, this.options)
      .pipe(
        tap(_ => console.log(`response fetched.`)),
        catchError(this.handleError<any>('deleteData', []))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(JSON.stringify(error)); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      throw error;
      // Let the app keep running by returning an empty result.
      //return of(result as T);
    };
  }
}
