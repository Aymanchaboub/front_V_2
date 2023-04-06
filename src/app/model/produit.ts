import { Categorie } from "./categorie";
import { SousCategories } from "./sous-categories";

export class Produit {
    id!: any;
    nom!: string;
    image!: string;
    prix!:any;
    quantite!:number;
    sousCategorie!: SousCategories;
    categorie!:Categorie;

    constructor(nom: string, image: string,prix:any,quantite:number,souscategorieId: SousCategories,categorie_id:Categorie) {
        this.nom = nom;
        this.image = image;
        this.prix=prix;
        this.quantite=quantite;
        this.sousCategorie=souscategorieId;
        this.categorie=categorie_id;
      }
}
