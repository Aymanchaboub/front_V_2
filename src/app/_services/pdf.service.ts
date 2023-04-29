import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { CommandeService } from './commande.service';
import { StorageService } from './storage.service';
import { Commande } from '../model/commande';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  nom!:string

  constructor(private commandeService:CommandeService,private userService:StorageService) { }
  generatePdf(): void {
    const user_id = this.userService.getUser().id;
    this.commandeService.getCommandeByUserId(user_id).subscribe((commandes: Commande[]) => {
      const doc = new jsPDF();
      this.commandeService.getNomByUserid(user_id).subscribe(nom=>{
        this.nom=nom;
      });

      let y = 20;
      doc.text('Commandes', 10, y);
      y += 10;
      commandes.forEach((commande) => {
        doc.text(`nom: ${this.nom}`, 10, y);
        y += 10;
        doc.text(`Adresse: ${commande.adresse}`, 10, y);
        y += 10;
        doc.text(`Ville: ${commande.ville}`, 10, y);
        y += 10;
        doc.text(`Numero: ${commande.numero}`, 10, y);
        y += 10;
        doc.text(`date: ${commande.dateCreation}`, 10, y);
        y += 10;
      });
      doc.save('commandes.pdf');
    });
  }
}
