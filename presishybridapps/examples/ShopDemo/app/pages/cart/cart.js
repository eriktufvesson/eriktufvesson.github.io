import {Page, NavController, NavParams, ViewController, Alert} from 'ionic/ionic';
import {Cart} from './cartService';
import {CheckoutPage} from '../checkout/checkout';
import {ProductPage} from '../product/product';

@Page({
    templateUrl: 'build/pages/cart/cart.html'
})
export class CartPage {
    constructor(nav: NavController, cart: Cart) {
        this.nav = nav;
        this.cartItems = cart.getProducts() || [];
        this.cart = cart;

        cart.cartItems$.subscribe((products) => {
            console.log(products);
            this.cartItems = products;
        });
    }

    calcTotal() {
        let total = 0;
        this.cartItems.forEach((product) => {
            total += product.price;
        });
        return total;
    }

    remove(product) {
        this.cart.remove(product);
    }

    clearCart() {
        this.cart.clear();
        this.nav.popToRoot();
    }

    navCheckout() {
        this.nav.push(CheckoutPage);
    }

    navProduct(product) {
        this.nav.push(ProductPage, {
            product: product
        });
    }
}

@Page({
    templateUrl: 'build/pages/cart/add-to-cart.html'
})
export class AddToCartModal {
    constructor(viewCtrl: ViewController, navParams: NavParams, cart: Cart, nav: NavController) {
        this.viewCtrl = viewCtrl;
        this.product = navParams.get('product');
        this.cart = cart;
        this.nav = nav;
    }

    addToCart() {
        this.cart.add(this.product);

        let alert = Alert.create({
            title: 'Added to cart!',
            subTitle: this.product.name + ' has now been added to your shopping cart',
            buttons: [
                {
                    text: 'Continue shopping',
                    handler: () => {
                        this.viewCtrl.dismiss();
                        this.nav.popToRoot();
                    }
                },
                {
                    text: 'Checkout now',
                    handler: () => {
                        this.viewCtrl.dismiss();
                        this.nav.push(CheckoutPage);
                    }
                }
            ]
        });
        this.nav.present(alert);


    }

    cancel() {
        this.viewCtrl.dismiss();
    }

}