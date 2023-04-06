import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie'; 
import { SousCategories } from 'src/app/model/sous-categories'; 
import { CategorieService } from 'src/app/_services/categorie.service'; 
import { SousCategoriesService } from 'src/app/_services/sous-categories.service';

@Component({
  selector: 'app-sous-category-create',
  templateUrl: './sous-category-create.component.html',
  styleUrls: ['./sous-category-create.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class SousCategoryCreateComponent {
  categories!: Categorie[];
  sousCategorieForm!: FormGroup;
  errorMessage!: string;
  image: string | null = null;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private categorieService: CategorieService,
              private sousCategorieService: SousCategoriesService) { }

  ngOnInit(): void {
    this.initForm();
    this.categorieService.getAllCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  initForm(): void {
    this.sousCategorieForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['', Validators.required],
      categorie: ['', Validators.required],
    });
  }

  onSubmit(): void {


    const image = this.image ? this.image : '';

    const sousCategorie: SousCategories = {
      nom: this.sousCategorieForm.get('nom')?.value,
      image,
      categorie: { id: this.sousCategorieForm.get('categorie')?.value } as Categorie,
      id:null
    };


    this.sousCategorieService.createSousCategorie(sousCategorie).subscribe(
      (createdSousCategorie: SousCategories) => {
        this.router.navigate(['/sous-categories']);
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


