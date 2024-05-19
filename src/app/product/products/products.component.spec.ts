import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgxPaginationModule, PaginationService } from 'ngx-pagination';


import { ProductsComponent } from './products.component';
import { HeaderComponent } from '../../header/header.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let apiService: ApiService
  let spinnerService: NgxSpinnerService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent,HeaderComponent],
      imports: [NgxSpinnerModule,HttpClientTestingModule,NgxPaginationModule],
      providers: [ApiService, NgxSpinnerService,PaginationService]
    }).compileComponents();
    apiService = TestBed.inject(ApiService)
    fixture = TestBed.createComponent(ProductsComponent);
    spinnerService = TestBed.inject(NgxSpinnerService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('product api should have been called on init', () => {
    const mockData = [{
      id: 1,
      description: 'Product Desc',
      price: 123,
      image: '/imageurl.png'
    }]
    const apiSpy=spyOn(apiService,'get')
    apiSpy.and.returnValue(of(mockData))
    component.ngOnInit()
    expect(apiSpy).toHaveBeenCalled();
  })

  it('spinner need to show', () => {
    spyOn(apiService, 'get').and.returnValue(of([]))
    spyOn(spinnerService,'show')
    component.ngOnInit()
    expect(spinnerService.show).toHaveBeenCalled()
  })

  it('spinner need to hide', () => {
    spyOn(apiService, 'get').and.returnValue(of([]))
    spyOn(spinnerService,'hide')
    component.ngOnInit()
    expect(spinnerService.hide).toHaveBeenCalled()
  })

});
