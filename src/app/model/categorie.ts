import { SousCategories } from "./sous-categories";

export class Categorie {

    id!: number;
    nom!: string;
    image!: string;
    souscategories!:SousCategories[];
    constructor(nom: string, image: string) {
        this.nom = nom;
        this.image = image;
      }
}
