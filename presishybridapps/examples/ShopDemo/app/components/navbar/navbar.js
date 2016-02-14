import {Component, CORE_DIRECTIVES, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic/ionic';
import {CartPage} from '../../pages/cart/cart';
import {Cart} from '../../pages/cart/cartService';
import {ListPage} from '../../pages/list/list';

@Component({
  selector: 'navbar2',
  templateUrl: 'build/components/navbar/navbar.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class Navbar {
  @Input() pageTitle;
  constructor(nav: NavController, cart: Cart) {
    this.nav = nav;
    this.cart = cart;
    this.products = cart.getProducts();

    cart.cartItems$.subscribe((products) => {
      console.log('cartItems$ has changed', products);
      this.products = products;
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.title = this.pageTitle;
    });
  }

  navCart() {
    this.nav.push(CartPage);
  }

  navSearch() {
    this.nav.push(ListPage);
  }
}
