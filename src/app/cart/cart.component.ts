import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cartitem';
import { CartitemService } from '../_services/cartitem.service';
import { StorageService } from '../_services/storage.service';
import { ProduitService } from '../_services/produit.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalCartValue: number = 0;
  produitQuantity!:number;
  finalQuantity!:number;
  produitquantitybefor!:number;
  x1!:number
  x2!:number

  constructor(
    private storageService: StorageService,
    private cartItemService: CartitemService,
    private produitService:ProduitService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    const userId = this.storageService.getUser()?.id;
    console.log('userId:', userId);

    if (userId!=null) {
      console.log('jqshfdfsqjdhfqsjhdf')
      this.cartItemService.getCart(userId).subscribe(
        cartItems => {
          console.log(cartItems);
          this.cartItems = cartItems;
          console.log(this.cartItems);
          this.cartItemService.getTotal(userId).subscribe(totalValue => {
            this.totalCartValue = totalValue;
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.product.prix = item.quantity * item.product.prix;
      const userId = this.storageService.getUser()?.id;

      this.cartItemService.getTotal(userId).subscribe(totalValue => {
        this.totalCartValue = totalValue;
                
      });
      
      
        this.produitService.getquantity(item.product.id).subscribe(quantity=>{
          this.produitQuantity=quantity
        })
        this.totalCartValue=item.quantity;
        if (item.quantity >this.produitQuantity ) {
          item.quantity = this.produitQuantity;
          console.log(`Quantity of ${item.product.nom} reduced to ${item.quantity}`);
          this.route.navigate(['/checkout'])
        }
   
      this.updateCartItems(this.cartItems);
    }
  }

  increaseQuantity(item: CartItem): void {

    
    item.quantity++;
    
    item.product.prix = item.quantity * item.product.prix;
    const userId = this.storageService.getUser()?.id;

    this.cartItemService.getTotal(userId).subscribe(totalValue => {
      this.totalCartValue = totalValue;
      console.log("totale",this.totalCartValue)
      
    });
      this.produitService.getquantity(item.product.id).subscribe(quantity=>{
        this.produitQuantity=quantity
        this.produitquantitybefor=quantity
        
        
      })
      if (item.quantity >this.produitQuantity ) {
        console.log("this.produitquantitybefor=this.produitQuantity",this.produitquantitybefor=this.produitQuantity)
        item.quantity = this.produitquantitybefor
        this.totalCartValue=item.quantity;
        

        alert("Desole la quantite commande"+item.quantity+"est superieur a la quantite de stock"+this.produitQuantity);


      }

      this.cartItemService.updateCartItemQuantity(item.id,this.produitQuantity)    .subscribe(cartItem => {
      }, error => {
        // Gérer l'erreur ici
      });
    console.log(this.produitquantitybefor)
    console.log(this.produitQuantity)
  }

  removeFromCart(productId: number, quantity: number): void {
    this.cartItemService.removeFromCart(productId, quantity).subscribe(() => {
      // Remove the item from the local cartItems array
      const index = this.cartItems.findIndex(item => item.product.id === productId);
      this.cartItems.splice(index, 1);
      this.updateCartItems(this.cartItems);
      const userId = this.storageService.getUser()?.id;
      if (userId!=null) {
        this.cartItemService.getTotal(userId).subscribe(totalValue => {
          this.totalCartValue = totalValue;
          
        });
      }
    });
  }

  updateCartItems(newItems: CartItem[]): void {
    this.cartItems = newItems;
    const userId = this.storageService.getUser()?.id;
    if (userId!=null) {
      this.cartItemService.getTotal(userId).subscribe(totalValue => {
        this.totalCartValue = totalValue;
        console.log("totale",this.totalCartValue)
        
      });
    }
  }
  verifyQuantity(): void {

    for (let item of this.cartItems) {
      this.produitService.getquantity(item.product.id).subscribe(quantity=>{
        this.produitQuantity=quantity
      })
      if (item.quantity >this.produitQuantity ) {
        item.quantity = this.produitQuantity;
        console.log(`Quantity of ${item.product.nom} reduced to ${item.quantity}`);
      }
    }

  }
  updatestock():void{
    for (let item of this.cartItems) {
    this.produitService.increaseQuantity(item.product.id,item.quantity) .subscribe(() => console.log('Quantity increased successfully'));
    }
    this.cartItemService.emptyCart().subscribe(() => {
      // Remove all items from the cartItems array
      this.cartItems = [];
    });    this.route.navigate(['/checkout'])
  }
  deleteItem(itemId: CartItem) {
    this.cartItemService.deleteItem(itemId.id).subscribe(() => {
      // Remove the item from the cartItems array
      this.cartItems = this.cartItems.filter(i => i.id !== itemId.id);
    });
  }
  emptyCart() {
    this.cartItemService.emptyCart().subscribe(() => {
      // Remove all items from the cartItems array
      this.cartItems = [];
    });
  }
}
