import {App, Platform, IonicApp} from 'ionic/ionic';
import {TabsPage} from './pages/tabs/tabs';
import {ListPage} from './pages/list/list';
import {GridPage} from './pages/grid/grid';
import {CartPage} from './pages/cart/cart';
import {CheckoutPage} from './pages/checkout/checkout';
import {Cart} from './pages/cart/cartService';
import {Products} from './providers/products/products';

@App({
  templateUrl: 'build/app.html',
  config: {},
  providers: [Cart, Products],
  prodMode: true
})
export class MyApp {
  constructor(platform: Platform, app: IonicApp) {
    this.app = app;
    this.pages = [
      { title: 'Home', icon: 'home', component: TabsPage },
      { title: 'Popular products', icon: 'star', component: GridPage },
      { title: 'Sale', icon: 'pricetags', component: ListPage },
      { title: 'Shopping cart', icon: 'cart', component: CartPage }
    ];
    
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      
    });
  } 

  openPage(page) {
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
