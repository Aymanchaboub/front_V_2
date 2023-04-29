import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../model/contact';

const apiUrl = 'http://localhost:8080/api/auth/contact';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(private http: HttpClient) { }
  getAllContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(apiUrl);
  }
  getContactById(id: any): Observable<Contact> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Contact>(url);
  }
  createContact(data :any ): Observable<any> {

    return this.http.post(apiUrl, data);
  }
  editContact(id :any , data :any): Observable<any> {
    const url =`${apiUrl}/${id}`;
    return this.http.put<Contact>(url, data);
  }
  deleteContact(id: any): Observable<void> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}