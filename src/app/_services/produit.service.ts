import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8080/api/auth/produits';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produit> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Produit>(url);
  }

  createProduit(produit: Produit): Observable<Produit> {
    console.log('jhgsf');
    return this.http.post<Produit>(this.apiUrl, produit, this.httpOptions);
  }

  editProduit(produit: Produit): Observable<Produit> {
    const url = `${this.apiUrl}/${produit.id}`;
    return this.http.put<Produit>(url, produit);
  }

  deleteProduit(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  getProductPriceHistory(id: number): Observable<any[]> {
    const url = `${this.apiUrl}/${id}/priceHistory`;
    return this.http.get<any[]>(url);
  }

  updateProductPrice(id: number, pourcentage: number, dateExtraction: string): Observable<void> {
    const url = `${this.apiUrl}/${id}/updatePrice/${pourcentage}`;
    const params = new HttpParams().set('dateExtraction', dateExtraction);
    return this.http.put<void>(url, null, { params });
  }
  
  getProduitsBysousCategorieId(souscategorieId: number): Observable<Produit[]> {
    const url = `${this.apiUrl}/ByID/${souscategorieId}`;
    return this.http.get<Produit[]>(url);
  }
}
