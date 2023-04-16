import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { CategorieService } from '../_services/categorie.service';
import { Categorie } from '../model/categorie';
import { SousCategories } from '../model/sous-categories';
import { SousCategoriesService } from '../_services/sous-categories.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  categories!: Categorie[];
  souscategories!: SousCategories[];
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  @Input() cartCount = 0;
  selectedSousCategorieId: number = 0;


  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private categorieService:CategorieService,
    private sousCategorieService:SousCategoriesService,
    private route:Router,
  ) {}

  ngOnInit(): void {
    this.categorieService.getAllCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
    
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  onCartCountChanged(newCount: number) {
    this.cartCount = newCount;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getSousCategoriesByCategorie(categorieId: number) {
    this.sousCategorieService.getSousCategoriesByCategorieId(categorieId).subscribe((data: SousCategories[]) => {
      this.souscategories = data;
      console.log(this.souscategories)
    });
    this.selectedSousCategorieId = 0; // Réinitialiser la valeur de l'ID de la sous-catégorie sélectionnée

  }
  
onSousCategorieSelect(sousCategorieId: number) {
  this.selectedSousCategorieId = sousCategorieId;
  this.route.navigate(['/filtrage',sousCategorieId])
}
}
