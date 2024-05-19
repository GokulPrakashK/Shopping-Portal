import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from '../auth.guard';
import { CartComponent } from '../cart/cart.component';
import { AdddCartComponent } from './addd-cart/addd-cart.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'added-cart', component: AdddCartComponent, canActivate: [AuthGuard] },
  {
    path: 'cart', loadChildren: () => import('../cart/cart.module')
      .then(m => m.CartModule), canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductRoutingModule { }
