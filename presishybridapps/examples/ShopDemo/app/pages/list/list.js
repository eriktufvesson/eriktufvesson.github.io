import {IonicApp, Page, NavController, NavParams} from 'ionic/ionic';
import {NavbarButtons} from '../../components/navbar-buttons/navbar-buttons';
import {ProductListItem} from '../../components/product-list-item/product-list-item';
import {Products} from '../../providers/products/products';
import {Filter} from '../../pipes/filter';
import {ProductPage} from '../product/product';
import {CartPage} from '../cart/cart';
import {SearchPage} from '../search/search';

@Page({
    templateUrl: 'build/pages/list/list.html',
    directives: [NavbarButtons, ProductListItem],
    pipes: [Filter]
})
export class ListPage {
    constructor(app: IonicApp, nav: NavController, navParams: NavParams, products: Products) {
        this.nav = nav;

        // If we navigated to this page, we will have an item available as a nav param
        if (navParams.data) {
            this.selectedItem = navParams.get('item');
        }

        this.productService = products;
    }

    ngOnInit() {
        this.productService.all().subscribe(
            data => this.products = data
            );
    }

    navProduct(event, product) {
        this.nav.push(ProductPage, {
            product: product
        })
    }

    navCart() {
        this.nav.push(CartPage);
    }

    navSearch() {
        this.nav.push(SearchPage);
    }
}
