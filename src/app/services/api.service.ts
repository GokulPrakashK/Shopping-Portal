import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private formatErrors(error: any) {
    return of(error.error);
  }

  get(path: string): Observable<any> {
    return this.http.get(path)
      .pipe(catchError(this.formatErrors));
  }


  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${path}`, body);
  }

}
