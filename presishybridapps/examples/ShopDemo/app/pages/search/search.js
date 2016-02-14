import {Page, NavController} from 'ionic/ionic';
import {Products} from '../../providers/products/products';
import {ProductPage} from '../product/product';
import {CartPage} from '../cart/cart';
import {ProductListItem} from '../../components/product-list-item/product-list-item';
import {NavbarButtons} from '../../components/navbar-buttons/navbar-buttons';

@Page({
    templateUrl: 'build/pages/search/search.html',
    directives: [ProductListItem, NavbarButtons]
})
export class SearchPage {
    constructor(nav: NavController, products: Products) {
        this.nav = nav;
        this.productService = products;

        this.searchQuery = '';
        this.initializeSearch();
    }

    ngOnInit() {
        this.productService.all().subscribe(
            data => this.products = data
            );
    }

    initializeSearch() {
        this.searchResults = [];
    }

    search(searchbar) {
        // set q to the value of the searchbar
        var q = searchbar.value;

        // if the value is an empty string don't filter the items
        if (q.trim() == '') {
            return;
        }

        this.searchResults = this.products.filter((v) => {
            if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        });
    }

    navProduct(product) {
        this.nav.push(ProductPage, {
            product: product
        });
    }

    navCart() {
        this.nav.push(CartPage);
    }
}
