import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable
  
 } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http:HttpClient) { }

  getCalledServer(){
    return this.http.get('/api/hello') // This will now be proxied to http://localhost:8080/hello
  }

  greetUser(name: string): Observable<string> {
    return this.http.get<string>(`/api/${name}`);
  }

  getUserList(): Observable<any>{
    return this.http.get<any>(`/api/users`);
  }
}
