import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';
import { Offre } from '../model/offre';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  private apiUrl = 'http://localhost:8080/api/auth/produits';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  getAllOffre():Observable<Offre[]>{
    const url = `${this.apiUrl}/offre`;
    return this.http.get<Offre[]>(url);
  }

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
  getquantity(id: number): Observable<number> {
    const url = `${this.apiUrl}/quantity/${id}`;
    return this.http.get<number>(url);
  }
  
  
  
  getProduitsBysousCategorieId(souscategorieId: number): Observable<Produit[]> {
    const url = `${this.apiUrl}/ByID/${souscategorieId}`;
    return this.http.get<Produit[]>(url);
  }
  increaseQuantity(id: number, quantity: number): Observable<void> {
    const url = `${this.apiUrl}/${id}/increaseQuantity/${quantity}`;
    return this.http.put<void>(url, null);
  }
  getproductidbyoffreid(id:any):Observable<any>{
    const url = `${this.apiUrl}/getproduitid/${id}`;
    return this.http.get<any[]>(url);

  }
    // New method added to get the date extraction by offer ID
    getDateExtractionByOffreId(id: number): Observable<Date> {
      const url = `${this.apiUrl}/${id}/dateextraction`;
      return this.http.get<Date>(url);
    }
}
