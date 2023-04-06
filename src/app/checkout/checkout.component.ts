import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../model/cartitem';
import { Commande } from '../model/commande';
import { CartitemService } from '../_services/cartitem.service';
import { CommandeService } from '../_services/commande.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  commande: Commande = new Commande();
  cartItems: CartItem[] = [];
  cartItemId!: number;
  cartId!: number;

  constructor(
    private commandeService: CommandeService,
    private cartservice: CartitemService,
    private storageService: StorageService,
    private router: Router
  ) {}
  getCartIdByCartItem() {
    this.cartservice.getCartIdByCartItem(this.cartItemId).subscribe(
      cartId => this.cartId = cartId,
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    const userId = this.storageService.getUser()?.id;
    const userName = this.storageService.getUser()?.userName;
    const usermail = this.storageService.getUser()?.email;

    this.commande.user.nom = userName;
    this.commande.user.email = usermail;
  }

  onSubmit(): void {
    const user = this.storageService.getUser();
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const userId = user.id;
    const userName = user.username;
    const userEmail = user.email;

    this.cartservice.getCart(userId).subscribe((cartItems: CartItem[]) => {
      // map CartItem array to items property of CommandeData
      const items = cartItems.map((item: CartItem) => {
        return {
          id: item.id,
          product: {
            id: item.product.id,
            image: item.product.image,
            nom: item.product.nom,
            prix: item.product.prix,
          },
          quantity: item.quantity,
          totale: item.totale,
        };
      });

      this.commande.cart = items;
      this.commande.user.id = userId;
      this.commande.adresse = this.commande.adresse;
      this.commande.ville = this.commande.ville;
      this.commande.pays = this.commande.pays;
      this.commande.numero = this.commande.numero;
      this.commande.zip = this.commande.zip;
      this.commande.typeDePayment = this.commande.typeDePayment;
      this.commande.statutCommande = false; // set default value for the boolean property

      this.cartservice.getCartIdByUserId(userId).subscribe((cartId: number) => {
        this.commandeService.createCommande(this.commande, userId, cartId).subscribe(() => {
          this.router.navigate(['/commandes']);
        });
      });
      
    });
  }
}
