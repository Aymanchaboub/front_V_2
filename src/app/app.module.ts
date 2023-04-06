import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './componement/categorie/create-category/create-category.component';
import { CategorieListComponent } from './componement/categorie/categorie-list/categorie-list.component';
import { CategoryEditComponent } from './componement/categorie/category-edit/category-edit.component';
import { SousCategoryCreateComponent } from './componement/sous-categories/sous-category-create/sous-category-create.component';
import { SousCategoriesListComponent } from './componement/sous-categories/sous-categories-list/sous-categories-list.component';
import { SousCategoriesEditComponent } from './componement/sous-categories/sous-categories-edit/sous-categories-edit.component';
import { CreateProduitComponent } from './componement/produit/create-produit/create-produit.component';
import { EditProduitComponent } from './componement/produit/edit-produit/edit-produit.component';
import { ListProduitComponent } from './componement/produit/list-produit/list-produit.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ShopComponent,
    CheckoutComponent,
    CartComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,

    ContactComponent,
     CreateCategoryComponent,
     SousCategoryCreateComponent,
     CategorieListComponent,
     CategoryEditComponent,
     SousCategoriesListComponent,
     SousCategoriesEditComponent,
     CreateProduitComponent,
     EditProduitComponent,
     ListProduitComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
