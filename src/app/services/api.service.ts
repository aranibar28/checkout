import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private apiEndpoint = environment.endpoint;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });
  constructor(private http: HttpClient) {}

  private handleError<T>() {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);
      throw error;
    };
  }

  private getJson(resp: Response) {
    return resp.json();
  }

  private checkForError(resp: Response): Response {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      const error: any = new Error(resp.statusText);
      error['response'] = resp;
      console.error(error);
      throw error;
    }
  }
  get(path: string): Observable<any> {
    return this.http
      .get(`${this.apiEndpoint}${path}`, { headers: this.headers })
      .pipe(catchError(this.handleError()));
  }

  post(path: any, body: any): Observable<any> {
    return this.http
      .post(`${this.apiEndpoint}${path}`, JSON.stringify(body), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError()));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${this.apiEndpoint}${path}`, { headers: this.headers })
      .pipe(catchError(this.handleError()));
  }

  setHeaders(headers: any) {
    Object.keys(headers).forEach(
      (header) => (this.headers = this.headers.set(header, [headers[header]]))
    );
  }
}
