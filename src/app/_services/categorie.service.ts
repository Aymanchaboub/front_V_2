import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:8080/api/auth/categories';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  getCategorieById(id: number): Observable<Categorie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categorie>(url);
  }

  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie, this.httpOptions);
  }
  edit(categorie: Categorie): Observable<Categorie> {
    const url = `${this.apiUrl}/${categorie.id}`;
    return this.http.put<Categorie>(url, categorie);
  }
  
  

  deleteCategorie(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
