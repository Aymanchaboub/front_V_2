import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const AUTH_API = 'http://localhost:8080/contact';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(private http: HttpClient) { }
  contact(name: string, email: string, subject: string,message:string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        email,
        name,
        subject,
        message,
      },
      httpOptions
    );
  }
}
