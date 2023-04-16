import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../_services/produit.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { CartitemService } from '../_services/cartitem.service';

@Component({
  selector: 'app-filtrage',
  templateUrl: './filtrage.component.html',
  styleUrls: ['./filtrage.component.css']
})
export class FiltrageComponent {
  @Input() sousCategorieId!: number;
  id!:number;
  produits: Produit[] = [];
  storageService!:StorageService;
  cartService!:CartitemService;
  cartCount = 0;
  @Output() cartCountChange = new EventEmitter<number>();


  constructor(private monService: ProduitService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['sousCategorieId'];
        console.log("this.id",this.id)
      })
    this.monService.getProduitsBysousCategorieId(this.id).subscribe(
      produits => {
        this.produits = produits;
        console.log(this.sousCategorieId)

      },
      error => {
        console.log(error);
      }
    );
  }
  addToCart(productId: any, quantity: number) {
    const currentUser = this.storageService.getUser();
    if (currentUser) {
      const userId = currentUser.id;
      console.log(userId);
      this.cartService.addToCart(userId, productId, quantity).subscribe(() => {
        console.log(`Product with id ${productId} added to cart!`);
        this.cartCount++;
        this.cartCountChange.emit(this.cartCount);
      });
    } else {
      console.log('User is not authenticated.');
    }
  }
}
