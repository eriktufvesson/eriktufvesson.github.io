import {Page, NavController, NavParams, Modal} from 'ionic/ionic';
import {NavbarButtons} from '../../components/navbar-buttons/navbar-buttons';
import {AddToCartModal} from '../cart/cart';
import {CartPage} from '../cart/cart';

@Page({
  templateUrl: 'build/pages/product/product.html',
  directives: [NavbarButtons]
})
export class ProductPage {
  constructor(nav: NavController, params: NavParams) {
    this.nav = nav;
    this.params = params;
    
    this.product = params.get("product");
  }
  
  addToCart(product) {
    let addToCartModal = Modal.create(AddToCartModal, { product: product });
    addToCartModal.onDismiss(data => {
      console.log(data);
    });
    this.nav.present(addToCartModal); 
  }
  
  navCart() {
    this.nav.push(CartPage);
  }
}
