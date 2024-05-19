import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CartComponent } from './cart.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [CartComponent, PaymentComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    CommonModule,
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
    MatButtonModule,
    MatInputModule,
    
  ],

})
export class CartModule { }
