export class CartItem {
  id!: number;
  product!: {
    id: number;
    nom: string;
    prix: number;
    image: string;
  };
  quantity!: number;
  totale!:any;
}
