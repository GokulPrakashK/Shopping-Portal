import { Component } from '@angular/core';
import { PaginationService } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';


interface columns {
  field: string,
  header: string
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  columns: columns[]
  cartDetails: any[] = []
  pageSize: number
  pageIndex: number = 1;
  totalItems: any;
  private url = 'https://fakestoreapi.com/products?limit'
  data: any[]
  user: any
  role: any

  ngOnInit(): void {
    const storedItem = localStorage.getItem('cartItems');
    if (storedItem)
      this.cartDetails = JSON.parse(storedItem);
    this.pageSize = 10
    this.spinner.show()
    this.apiService.get(this.url)
      .subscribe((response) => {
        this.data = response as any[];
        this.spinner.hide();
        console.log(response)
        this.totalItems = this.data.length;
      })

  }

  constructor(private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public authService: AuthService,
    private router: Router,
    private cartService: CartService) {

  }

  hasRole(role: string) {
    return this.role === role;
  }

  addToCart(productId: any) {
    this.cartService.addToCart(productId);
    const storedItem = localStorage.getItem('cartItems');
    if (storedItem)
      this.cartDetails = JSON.parse(storedItem);
  }

  openCart() {
    this.router.navigate(['products/cart']);
  }
}

