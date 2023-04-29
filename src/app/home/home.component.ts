import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Produit } from '../model/produit';
import { CartitemService } from '../_services/cartitem.service';
import { ProduitService } from '../_services/produit.service';
import { StorageService } from '../_services/storage.service';
import { SousCategoriesService } from '../_services/sous-categories.service';
import { SousCategories } from '../model/sous-categories';
import { Offre } from '../model/offre';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offres!: any[];
  produitsOffre!: any[];
  produits: Produit[] = [];
  sousCategories: SousCategories[] = [];
  currentUser: any;
  cartCount = 0;
  produit_id:any;
  dateExtraction!:Date;
  @Output() cartCountChange = new EventEmitter<number>();

  constructor(private souscategoriesServices:SousCategoriesService,private produitService: ProduitService, private cartService: CartitemService,private storageService: StorageService) {}
  
  ngOnInit(): void {
    this.getAllProduit();
    this.getAllSousCategories();
  
    this.produitService.getAllOffre().subscribe(data => {
      this.offres = data;
      console.log(this.offres);
  
      this.produitsOffre = [];
  
      const observables = this.offres.map(offre => {
        return this.produitService.getproductidbyoffreid(offre.id).pipe(
          switchMap(productId => {
            return this.produitService.getProduitById(productId).pipe(
              switchMap((p: Produit) => {
                return this.produitService.getDateExtractionByOffreId(offre.id).pipe(
                  map(date => {
                    return {
                      nom: p.nom,
                      image: p.image,
                      pourcentage: offre.pourcentage,
                      dateextraction: date,
                      prix: p.prix,
                    };
                  })
                )
              })
            );
          })
        );
      });
  
      forkJoin(observables).subscribe(results => {
        console.log('results', results);
  
        for (let i = 0; i < results.length; i++) {
          const produitOffreIndex = this.produitsOffre.findIndex(po => po.nom === results[i].nom);
  
          if (produitOffreIndex === -1) { // si le produit n'existe pas déjà dans la table produitsOffre
            this.produitsOffre.push(results[i]);
          } else { // si le produit existe déjà dans la table produitsOffre
            this.produitsOffre[produitOffreIndex].pourcentage = results[i].pourcentage;
            this.produitsOffre[produitOffreIndex].dateextraction = results[i].dateextraction;
          }
        }
  
        console.log("this.produitsOffre", this.produitsOffre);
      });
    });
  }
  

  
  getAllSousCategories():void{
    this.souscategoriesServices.getAllSousCategories().subscribe((sousCategories:SousCategories[])=>{
      this.sousCategories=sousCategories;
    });
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
