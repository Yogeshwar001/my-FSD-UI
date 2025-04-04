import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError
  
 } from 'rxjs';
 import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http:HttpClient) { }

  getCalledServer(){
    return this.http.get('/api/hello').pipe(
      catchError(this.handleError)
    ); // This will now be proxied to http://localhost:8080/hello
  }

  greetUser(name: string): Observable<string> {
    return this.http.get<string>(`/api/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserList(): Observable<any>{
      return this.http.get(`/api/users`).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }
}
