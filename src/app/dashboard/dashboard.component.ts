import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  userName: String = '';
  productDetails: any[];
  private url = 'https://fakestoreapi.com/products?limit'
  carouselConfig :any


  constructor(private router: Router,
    private apiService:ApiService) {
  }


  ngOnInit(){
    this.apiService.get(this.url)
    .subscribe(response=>{
      this.productDetails=(response as any[]).slice(0,10)
    })
  }

  showProducts() {
    this.router.navigate(['/products'])
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }

}
