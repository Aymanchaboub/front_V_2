import { Categorie } from "./categorie";

export class SousCategories {
    
    id!: any;
    nom!: string;
    image!: string;
    categorie!: Categorie;
    
    constructor(nom: string, image: string,categorieId: Categorie) {
        this.nom = nom;
        this.image = image;
        this.categorie=categorieId;
      }
}
