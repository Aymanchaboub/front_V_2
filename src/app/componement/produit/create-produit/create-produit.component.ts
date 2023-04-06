import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie';
import { Produit } from 'src/app/model/produit';
import { SousCategories } from 'src/app/model/sous-categories';
import { CategorieService } from 'src/app/_services/categorie.service';
import { ProduitService } from 'src/app/_services/produit.service';
import { SousCategoriesService } from 'src/app/_services/sous-categories.service';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class CreateProduitComponent {
  sousCategorie!: SousCategories[];
  categorie!:Categorie[];
  ProduitForm!: FormGroup;
  errorMessage!: string;
  image: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private sousCategoriesServices: SousCategoriesService,
    private categorieService:CategorieService,
    private produitService: ProduitService) { }



    ngOnInit(): void {
      this.initForm();
      this.categorieService.getAllCategories().subscribe(
        (categories: Categorie[]) => {
          this.categorie = categories;
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );

    }
    onCategorieChange(): void {
      const categorieId = this.ProduitForm.get('categorie')?.value;
      if (categorieId) {
        this.sousCategoriesServices
          .getSousCategoriesByCategorieId(categorieId)
          .subscribe(
            (souscategories: SousCategories[]) => {
              this.sousCategorie = souscategories;
              console.log("sqd",this.sousCategorie);
            },
            (error) => {
              this.errorMessage = error.message;
            }
          );
      } else {
        this.sousCategorie = [];
      }
    }
    
    initForm(): void {
      this.ProduitForm = this.formBuilder.group({
        nom: ['', Validators.required],
        image: ['', Validators.required],
        quantite: ['', Validators.required],
        prix: ['', Validators.required],
        categorie: ['',Validators.required],
        sousCategorie: ['', Validators.required],
      });
    }
    
    onSubmit(): void {


      const image = this.image ? this.image : '';
  
      const Produit: Produit = {
        nom: this.ProduitForm.get('nom')?.value,
        image,
        quantite:this.ProduitForm.get('quantite')?.value,
        prix:this.ProduitForm.get('prix')?.value,
        categorie: {id:this.ProduitForm.get('categorie')?.value} as Categorie,
        sousCategorie: { id: this.ProduitForm.get('sousCategorie')?.value} as SousCategories,
        id:null
      };
  
      console.log
      this.produitService.createProduit(Produit).subscribe(
        (createdproduit: Produit) => {
          this.router.navigate(['/produits']);
        },
        (error) => {
          this.errorMessage = error.message;
          
        }
      );
    }
    onFileChange(event: Event) {
      const reader = new FileReader();
      const target = event.target as HTMLInputElement;
      if (target?.files && target?.files?.length) {
        const filesArray = Array.from(target.files);
        const [file] = filesArray;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.image = reader.result as string;
        };
      
      }
    }
    

}
