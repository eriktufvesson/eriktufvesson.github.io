import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic/ionic';
import {ProductPage} from '../../pages/product/product';

@Component({
  selector: 'product-grid-item',
  templateUrl: 'build/components/product-grid-item/product-grid-item.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class ProductGridItem {
  @Input() product;
  constructor(nav: NavController) {
    this.nav = nav;
  }
  
  navProduct(product) {
    this.nav.push(ProductPage, {
      product: product
    });
  }
  
  getDiscount(product) {
    let discount = 100 - (100.0 * product.price / product.originalPrice);
    return Math.floor(discount);
  }
}
