import { Component, Input, Output, EventEmitter,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css'],
  animations: [
    trigger('zoomInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.2s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProductcardComponent {
  user: any
  role: any
  showFullContent: boolean
  popUpRef: BsModalRef
  imgLink: string
  modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  cartList:any[]=[];
  existsInCart:boolean=false;

  @Input() product: any;
  @Input() productList: any;
  @Output() productEmitter: EventEmitter<any> = new EventEmitter<any>();


  constructor(private authService: AuthService,
    private modalService: BsModalService,
    private cartService:CartService) { }

  onEdit(product: any) {
    const modalConfig = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-scrollable',
      initialState: {
        modalAttribute: product,
      }
    }

    this.popUpRef = this.modalService.show(ProductEditComponent, modalConfig)
    if (this.popUpRef) {
    this.popUpRef.content.onClose.subscribe((res: any) => {
      this.product = res
      this.product.discount = this.checkForDiscountPrice(res.discount, res.price);
      console.log(res)
    })
  }
  }

  checkForDiscountPrice(discountPercent: any, price: any): any {
    if (discountPercent)
      return price - ((discountPercent / 100) * price);
    return null;
  }

  ngOnInit() {
    this.showFullContent = false
    this.user = this.authService.curentUserName
    this.role = this.authService.userRole
    this.existsInCart=this.productList.includes(this.product.id);
  }

  hasAdminRole(role: string) {
    return this.role === role;
  }

  truncateOnWord(description: string, lengthOfDesc: number): string {
    if (!description) {
      return '';
    }
    const lastspace = description.lastIndexOf(' ', lengthOfDesc);
    if (lastspace !== -1) 
      return description.slice(0, lastspace);
    else
      return description.slice(0, lengthOfDesc);
  }

  toggleShow() {
    this.showFullContent = !this.showFullContent;
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

  addToCart(productId:BigInteger){
    this.productEmitter.emit(productId);
    this.existsInCart=this.cartService.cartProducts.includes(this.product.id);
  }
}
