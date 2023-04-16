import { Component } from '@angular/core';
import { Lignecommande } from '../model/lignecommande';
import { LignecommandeService } from '../_services/lignecommande.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { Commande } from '../model/commande';
import { CommandeService } from '../_services/commande.service';

@Component({
  selector: 'app-iscomplete',
  templateUrl: './iscomplete.component.html',
  styleUrls: ['./iscomplete.component.css']
})
export class IscompleteComponent {
  lignesCommandes!: Lignecommande[];
  commandeIds: number[] = [];
  commandes!: Commande[];


  constructor(private commandeService:CommandeService,private ligneCommandeService: LignecommandeService,private storageService:StorageService,private router:Router ) { }
  ngOnInit(): void {
    const livreurId = this.storageService.getUser()?.id;
    this.ligneCommandeService.getAllLignesCommandes(1).subscribe((resultat) => {
      console.log(resultat,'resultat');
      this.lignesCommandes = resultat;
      this.commandeIds = [];
      this.commandes = [];
      this.lignesCommandes.forEach(ligneCommande => {
        console.log(ligneCommande)
        const commandeId = this.ligneCommandeService.getCommandeIdByLigneCommandeId(ligneCommande.id).subscribe(commandeid=>
          {
            console.log(commandeid,'commandeid')
            this.commandeService.getCommandeByIdOnly(commandeid).subscribe(commande => {
              this.commandes.push(commande);
            });
          
          });

      });
    });
  }

  validerCommande(ligneCommande: Lignecommande) {
    const isComplete = true;
    this.ligneCommandeService.updateLigneCommande(ligneCommande.id, isComplete)
      .subscribe(() => {
        // La commande a été validée avec succès
        this.router.navigate(['/livreur']);

      });
  }
}
