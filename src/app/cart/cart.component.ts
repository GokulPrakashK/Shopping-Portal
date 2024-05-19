import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent {
  popUpRef: BsModalRef
  imgLink: string
  products: any[] = []
  private url = 'https://fakestoreapi.com/products'
  productsId: any[] = []
  totalCost: any;

  constructor(private modalService: BsModalService,
    private apiService: ApiService) {
  }

  ngOnInit() {
    const storedItem = localStorage.getItem('cartItems');
    if (storedItem)
      this.productsId = JSON.parse(storedItem);
    this.apiService.get(this.url)
      .subscribe((response) => {
        this.products = response as any[];
        this.products = this.products.filter((item) => {
          return this.productsId.some((productId) => productId === item.id)
        });
        this.totalCost = this.products.reduce((accumulator, item) => {
          return accumulator + item.price;
        }, 0);
      })
  }

  getTotalCost() {
    return this.totalCost;
  }

  openImage(template: TemplateRef<any>, imgLink: string): any {
    console.log("Template" + template)
    this.imgLink = imgLink;
    this.popUpRef = this.modalService.show(template)
    console.log("ModalRef" + this.popUpRef)
  }

  closeImage() {
    this.modalService.hide();
  }

}
