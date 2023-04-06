import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  id!: number; // replace "number" with the actual type of the "id" property

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'signin', { username, password }, httpOptions)
      .pipe(
        map(response => {
          const user_id = response.id; // assuming the response has the user ID
          this.setUser(user_id);
          return response;
        })
      );
  }
  
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'signup',
      { username, email, password },
      httpOptions
    ).pipe(
      map(response => {
        const user_id = response.id; // assuming the response has the user ID
        this.setUser(user_id);
        return response;
      })
    );
  }
  

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined;
  }
  setUser(id: string) {
    localStorage.setItem('user_id', id);
  }
}
