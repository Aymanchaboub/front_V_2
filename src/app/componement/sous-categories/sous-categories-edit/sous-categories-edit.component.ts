import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie';
import { SousCategories } from 'src/app/model/sous-categories';
import { CategorieService } from 'src/app/_services/categorie.service';
import { SousCategoriesService } from 'src/app/_services/sous-categories.service';

@Component({
  selector: 'app-sous-categories-edit',
  templateUrl: './sous-categories-edit.component.html',
  styleUrls: ['./sous-categories-edit.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class SousCategoriesEditComponent {
  SousCategorieForm!: FormGroup;
  image: string | null = null;
  saveCategory: any;
  selectedCategoryImage!: string;
  imageUrl: string = '';
  id!: number;
  SousCategory!: SousCategories;
  categories!: Categorie[];
  errorMessage!: string;


  constructor(private formBuilder: FormBuilder,
     private SousCategorieService: SousCategoriesService, 
     private categorieService:CategorieService,
     private route: ActivatedRoute, private router: Router) { }

     ngOnInit(): void {
      this.SousCategorieForm = this.formBuilder.group({
        nom: ['', Validators.required],
        image: ['', Validators.required],
        categorie:['',Validators.required]
      });
  
      this.categorieService.getAllCategories().subscribe(
        (categories: Categorie[]) => {
          this.categories = categories;
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
      
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.SousCategorieService.getSousCategorieById(this.id).subscribe(
            SousCategory => {
              this.SousCategory = SousCategory;
              this.SousCategorieForm.patchValue({
                nom: SousCategory.nom,
                image: SousCategory.image,
                categorie: SousCategory.categorie,
              });
            },
            error => console.error('Error fetching category:', error)
          );
        }
      );
  }

editSousCategorie() {
  const image = this.image ? this.image : '';
  
  // Vérifier la validité du formulaire
  if (this.SousCategorieForm.valid) {
    this.SousCategory.nom = this.SousCategorieForm.value.nom;
    this.SousCategory.image = image;
    this.SousCategory.categorie ={ id: this.SousCategorieForm.get('categorie')?.value } as Categorie,

    this.SousCategorieService.editSousCategorie(this.SousCategory).subscribe(
      updatedSousCategorie => {
        console.log('Category updated successfully:', updatedSousCategorie);
        this.router.navigate(['/sous-categories']);
      },
      error => {
        console.error('Error updating category:', error);
        this.router.navigate(['/sous-categories']);
      }
    );
  } else {
    // Afficher un message d'erreur si le champ "nom de la catégorie" est vide
    if (this.SousCategorieForm.get('categorie')?.value === null) {
      this.errorMessage = "Le champ 'nom de la catégorie' est requis.";
    }
  }
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
clearImage() {
  this.image = null;
  this.SousCategorieForm.patchValue({ image: null });
}
}
