import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/_services/categorie.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css','./bootstrap.min.css','./style1.css','./style.css',  './fontawesome-all.css', './chartist.css','./morris.css','./c3.css','./flag-icon.min.css'],
})
export class CategorieListComponent implements OnInit{
  categories: Categorie[] = [];
  selectedCategorie: Categorie | undefined ;
  showEditForm =false;
  selectedCategoryImage: any;

  constructor(private categorieService: CategorieService, private router: Router) { }


  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categorieService.getAllCategories()
      .subscribe((categories: Categorie[]) => {
        this.categories = categories;
      });
  }
  
  deleteCategory(category: Categorie) {
    this.categorieService.deleteCategorie(category.id).subscribe(() => {
      // Remove the deleted category from the list
      const index = this.categories.indexOf(category);
      this.categories.splice(index, 1);
    });
  }
  editCategory(category: Categorie) {
    this.router.navigate(['/category-edit', category.id]);
  }

}
