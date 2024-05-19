import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component'
import { ProductcardComponent } from './productcard/productcard.component'
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartModule } from '../cart/cart.module';
import { AdddCartComponent } from './addd-cart/addd-cart.component';
import { SharedModule } from 'primeng/api';



@NgModule({
  declarations: [ProductsComponent, ProductcardComponent, ProductEditComponent, AdddCartComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatIconModule,
    FormsModule,
    ModalModule,
    MatFormFieldModule,
    MatTooltipModule,
    SharedModule
  ],
  exports: [],
  providers: [BsModalService]
})
export class ProductModule { }
