import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cartitem';
import { CartitemService } from '../_services/cartitem.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalCartValue: number = 0;

  constructor(
    private storageService: StorageService,
    private cartItemService: CartitemService
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
        console.log("totale",this.totalCartValue)
        
      });
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
    this.updateCartItems(this.cartItems);
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
}
