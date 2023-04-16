import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Commande } from '../model/commande'; 
import { CartitemService } from './cartitem.service';
import { CartItem } from '../model/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private readonly API_URL = 'http://localhost:8080/api/auth/commande';

  constructor(private http: HttpClient,private cartService:CartitemService) {}


  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.API_URL}`);
  }

  getCommandeById(id: number, userId: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.API_URL}/${id}?userId=${userId}`);
  }

  getCommandeByIdOnly(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.API_URL}/${id}`);
  }

  createCommande(commande: Commande, userId: any, cartId: any): Observable<Commande> {
    const commandeData = {
      cart_id: cartId,
      user_id: userId,
      
      items: commande.cart,
      adresse: commande.adresse,
      numero:commande.numero,
      pays:commande.pays,
      zip:commande.zip,
      ville:commande.ville,
      statutCommande: commande.statutCommande
    };
    console.log(commandeData)
    return this.http.post<Commande>(`${this.API_URL}/commande/${cartId}?userId=${userId}`, commandeData);
  }
  getNomByUserid(userId: any): Observable<any> {
    return this.http.get(`${this.API_URL}/${userId}/nom`).pipe(
      map(response => response)
    );
  }
  

  getEmailByUserid(userId: any): Observable<any> {
    return this.http.get(`${this.API_URL}/${userId}/email`, { responseType: 'text' });
  }
  getDateCreationById(id: number): Observable<Date> {
    return this.http.get<Date>(`${this.API_URL}/${id}/dateCreation`);
  }

  
  
  

  
  

  




  updateCommande(id: number, commande: Commande, userId: number): Observable<Commande> {
    return this.http.put<Commande>(`${this.API_URL}/${id}?userId=${userId}`, commande);
  }

  deleteCommande(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}?userId=${userId}`);
  }
}
