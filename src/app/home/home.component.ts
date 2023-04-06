import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Produit } from '../model/produit';
import { CartitemService } from '../_services/cartitem.service';
import { ProduitService } from '../_services/produit.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produits: Produit[] = [];
  currentUser: any;
  cartCount = 0;
  @Output() cartCountChange = new EventEmitter<number>();

  constructor(private produitService: ProduitService, private cartService: CartitemService,private storageService: StorageService) {}
  
  ngOnInit(): void {
    this.getAllProduit();
  }

  getAllProduit(): void {
    this.produitService.getAllProduit()
      .subscribe((produits: Produit[]) => {
        this.produits = produits;
        console.log(this.produits); // fixed the console.log issue
      });
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
