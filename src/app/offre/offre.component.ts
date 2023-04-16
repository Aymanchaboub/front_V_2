import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ProduitService } from '../_services/produit.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Produit } from '../model/produit';
import { Offre } from '../model/offre';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent {
  id!: number;
  pourcentage!: number;
  dateExtraction!:string;
  idProduit!: any;

  constructor(private produitService: ProduitService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['idProduit'];
        console.log("this.id",this.id)
      })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.produitService.updateProductPrice(this.id, this.pourcentage, this.dateExtraction).subscribe(() => {
        form.reset();
        alert('Offre créée avec succès!');
      }, error => {
        console.error(error);
        alert('Erreur lors de la création de l\'offre!');
      });
    }
  }
  
}
