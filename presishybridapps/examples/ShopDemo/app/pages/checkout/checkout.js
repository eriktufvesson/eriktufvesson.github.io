import {Page, NavController, Alert} from 'ionic/ionic';
import {Cart} from '../cart/cartService';
import {TabsPage} from '../tabs/tabs';

@Page({
  templateUrl: 'build/pages/checkout/checkout.html',
})
export class CheckoutPage {
  constructor(nav: NavController, cart: Cart) {
    this.nav = nav;
    this.cart = cart;
    this.cartItems = cart.getProducts();
    
    this.stage = 0;
        
    this.titles = ["Shipping address", "Delivery method", "Payment method", "Confirm"];
  }
  
  continue() {
    this.stage++;    
  }
  
  placeOrder() {
    let alert = Alert.create({
      title: "Order sent",
      subTitle: "Your ordernumber is 987654321",
      buttons: [
      {
        text: 'OK',
        handler: () => {
          this.cart.clear();
          this.stage = 0;
          this.nav.popToRoot();
        }
      }]
    });
    this.nav.present(alert);
  }
  
  calcTotal() {
    let total = 0;
    this.cartItems.forEach((product) => {
      total += product.price;
    });
    return total;
  }
}
