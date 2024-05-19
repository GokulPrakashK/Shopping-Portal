import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal'


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

  productDetails: any = {};
  columns: any;
  products: FormGroup
  isDiscount: boolean
  @Input() modalAttribute: any;
  @Output() onClose = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.isDiscount = false
    if (this.modalAttribute && this.modalAttribute.title && this.modalAttribute.description
      && this.modalAttribute.price && this.modalAttribute.category && this.modalAttribute.image) {
      this.productDetails = this.modalAttribute
      console.log("Product" + this.modalAttribute)
    } else {
      console.error('modalAttribute is undefined or does not have expected properties')
    }
    this.products = this.formBuilder.group({
      title: [this.productDetails.title],
      description: [this.productDetails.description],
      price: [this.productDetails.price],
      category: [this.productDetails.category],
      discount: [null, [Validators.min(0)]],
      image: this.productDetails.image
    });
  }

  close() {
    this.bsModalRef.hide()
  }

  saveChanges(product: any) {
    this.onClose.emit(product)
    this.bsModalRef.hide()
  }

  openDiscount() {
    this.isDiscount = true
  }
}
