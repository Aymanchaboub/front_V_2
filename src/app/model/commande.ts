import { CartItem } from "./cartitem";

export class Commande {
  id!: number;
  adresse!: string;
  ville!: string;
  pays!: string;
  numero!: string;
  user: {
    id: any;
    nom: string;
    email: string;
  }= {
    id: 0,
    nom: "",
    email: ""
  };
  zip!: string;
  cart!: {
    id: number;
    product: {
      id: number;
      nom: string;
      prix: number;
      image: string;
    };
    quantity: number;
    totale: any;
  }[];
  typeDePayment!: string;
  statutCommande!: boolean;
}
