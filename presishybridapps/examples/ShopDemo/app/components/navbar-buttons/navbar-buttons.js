import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic/ionic';
//import {CartPage} from '../../pages/cart/cart';
import {Cart} from '../../pages/cart/cartService';
//import {SearchPage} from '../../pages/search/search';

@Component({
  selector: 'navbar-buttons',
  templateUrl: 'build/components/navbar-buttons/navbar-buttons.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class NavbarButtons {
  @Input() showCartIcon = true;
  @Input() showSearchIcon = true;
  @Output() cartClick = new EventEmitter();
  @Output() searchClick = new EventEmitter();
  constructor(nav: NavController, cart: Cart) {
    this.nav = nav;
    this.cart = cart;
    this.products = cart.getProducts() || [];

    cart.cartItems$.subscribe((products) => {
      console.log('cartItems$ has changed', products);
      this.products = products;
    })
  }
  
   navCart() {
     console.log("cart clicked");
     this.cartClick.emit("cart clicked");     
   }
 
   navSearch() {
     console.log("search clicked");
     this.searchClick.emit("search clicked");
   }
}
