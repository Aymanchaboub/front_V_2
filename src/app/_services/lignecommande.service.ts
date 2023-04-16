import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lignecommande } from '../model/lignecommande';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LignecommandeService {

  private baseUrl = 'http://localhost:8080/api/auth/lignescommandes';

  constructor(private http: HttpClient) { }

  getAllLignesCommandes(livreurId: number): Observable<Lignecommande[]> {
    const url = `${this.baseUrl}?livreurId=${livreurId}`;
    console.log(livreurId,'in service')
    return this.http.get<Lignecommande[]>(url);
  }

  getLigneCommandeById(id: number): Observable<Lignecommande> {
    return this.http.get<Lignecommande>(`${this.baseUrl}/${id}`);
  }

  createLigneCommande(ligneCommande: Lignecommande, commandeId: number, livreurId: number): Observable<Lignecommande> {
    const url = `${this.baseUrl}?commandeId=${commandeId}&livreurId=${livreurId}`;
    return this.http.post<Lignecommande>(url, ligneCommande);
}
// Fonction pour mettre à jour une ligne de commande dans le service Angular
updateLigneCommande(id: number, isComplete: boolean): Observable<Lignecommande> {
  const url = `${this.baseUrl}/${id}/complete`;
  return this.http.put<Lignecommande>(url, isComplete);
}
getCommandeIdByLigneCommandeId(ligneCommandeId: number): Observable<number> {
  const url = `${this.baseUrl}/${ligneCommandeId}/getcommande`;
  return this.http.get<number>(url);
}









  deleteLigneCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
