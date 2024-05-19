import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from '../products/products.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { ProductRoutingModule } from '../product-routing.module';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent,HeaderComponent],
      imports: [HttpClientTestingModule,
        TableModule,
        MatCardModule,
        MatSlideToggleModule,
        NgxPaginationModule,
        MatIconModule,
        RouterTestingModule,
        CommonModule,
        ProductRoutingModule,
        RouterModule,
        TableModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        NgxPaginationModule,
        MatIconModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router)
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should call the product component when show is clicked', () => {
    const routerSpy=spyOn(router,'navigate')
    component.showProducts();
    expect(routerSpy).toHaveBeenCalledWith(['products'])
  })


});
