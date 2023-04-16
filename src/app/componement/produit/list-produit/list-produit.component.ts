import { Produit } from './../../../model/produit';
import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/_services/produit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})

export class ListProduitComponent implements OnInit{
  produits: Produit[] = [];
  selectedproduit: Produit | undefined ;
  showEditForm =false;
  selectedProduitImage: any;

  constructor(private produitService: ProduitService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduits();
  }
  getAllProduits(): void {
    this.produitService.getAllProduit()
      .subscribe((produits: Produit[]) => {
        this.produits= produits;
      });
  }

  deleteProduit(produit: Produit) {
    this.produitService.deleteProduit(produit.id).subscribe(() => {
      // Remove the deleted produit from the list
      const index = this.produits.indexOf(produit);
      this.produits.splice(index, 1);
    });
  }
  CreateOffre(idProduit: number) {
    this.router.navigate(['/offre', idProduit]);
  }
  

  EditProduitComponent(produit: Produit) {
    this.router.navigate(['/produit-edit', produit.id]);
  }

}