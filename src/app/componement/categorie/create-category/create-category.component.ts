import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/_services/categorie.service';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',

  styleUrls: ['./create-category.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class CreateCategoryComponent {
  categorieForm!: FormGroup;
  submitted = false;
  image: string | null = null;

  constructor(private formBuilder: FormBuilder, private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void {
    this.categorieForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['', Validators.required]
    });
    
  }

  get f() { return this.categorieForm.controls; }

  onSubmit() {
    this.submitted = true;
   
    const image = this.image ? this.image : '';
    const categorie = new Categorie(
      this.f['nom'].value,
      image
    );
    this.categorieService.createCategorie(categorie).subscribe(() => {
      this.router.navigate(['/categories']);
    });
    console.log(categorie);

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
    this.categorieForm.patchValue({ image: null });
  }


}
