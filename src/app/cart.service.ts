import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts:any[]=[];

  constructor() { }


  public addToCart(product: any) {
    this.cartProducts.push(product);
    localStorage.setItem('cartItems',JSON.stringify(this.cartProducts));
  }
}
