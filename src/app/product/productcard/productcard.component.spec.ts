import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { ProductcardComponent } from './productcard.component';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateRef } from '@angular/core';
import { ProductEditComponent } from '../product-edit/product-edit.component';

describe('ProductcardComponent', () => {
  let component: ProductcardComponent;
  let fixture: ComponentFixture<ProductcardComponent>;
  let authService: AuthService
  let bsModalServiceSpy: jasmine.SpyObj<BsModalService>
  beforeEach(async () => {
    bsModalServiceSpy=jasmine.createSpyObj(BsModalService,['show','hide'])
    await TestBed.configureTestingModule({
      declarations: [ProductcardComponent,ProductEditComponent],
      imports: [MatCardModule,MatIconModule,ModalModule,BrowserAnimationsModule],
      providers: [AuthService,BsModalRef,
        {provide: BsModalService,useValue:bsModalServiceSpy}]
    })
    .compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(ProductcardComponent);
    component = fixture.componentInstance;
    authService=TestBed.inject(AuthService)
    component.product=[{
      id: 1,
      description: 'Product Desc',
      price: 123,
      image: '/imageurl.png'
    }]
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show full content should be false',()=>{
    expect(component.showFullContent).toBeFalse()
  })

  
  it('should truncate on space',()=>{
    const testSentence='This sentence is for testing';
    expect(component.truncateOnWord(testSentence,15)).toEqual('This sentence')
    expect(component.truncateOnWord(testSentence,3)).toEqual('Thi')
  })

  it('should toggle when clicked',()=>{
    component.showFullContent=false;
    component.toggleShow()
    expect(component.showFullContent).toBeTrue()
    component.toggleShow()
    expect(component.showFullContent).toBeFalse()
  })

  it('should open image',()=>{
    const template={} as any;
    const imageLink='image.png' as string;
    component.openImage(template,imageLink);
    expect(component.imgLink).toEqual(imageLink);
    expect(bsModalServiceSpy.show).toHaveBeenCalledWith(template)
  })

  it('should close image',()=>{
    component.closeImage();
    expect(bsModalServiceSpy.hide).toHaveBeenCalled()
  })

  it('should open edit component',()=>{
    const product=[{
      id: 1,
      description: 'Product Desc',
      price: 123,
      image: '/imageurl.png'
    }]
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-scrollable',
      initialState: {
        modalAttribute: product,
      }
    }
    component.onEdit(product);
    expect(bsModalServiceSpy.show).toHaveBeenCalledWith(ProductEditComponent,modalConfig);
    expect(component.popUpRef).toEqual(bsModalServiceSpy.show(ProductEditComponent,modalConfig))
  })

  it('should reduce to discount',()=>{
    const price=100;
    expect(component.checkForDiscountPrice(10,price)).toEqual(90)
    expect(component.checkForDiscountPrice(null,price)).toEqual(null)
  })

});
