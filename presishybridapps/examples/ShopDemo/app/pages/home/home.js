import {Page, NavController} from 'ionic/ionic';
import {ListPage} from '../list/list';
import {GridPage} from '../grid/grid';
import {CartPage} from '../cart/cart';
import {SearchPage} from '../search/search';
import {NavbarButtons} from '../../components/navbar-buttons/navbar-buttons';
import {ProductGridItem} from '../../components/product-grid-item/product-grid-item';
import {Products} from '../../providers/products/products';
import {Filter} from '../../pipes/filter';

@Page({
    templateUrl: 'build/pages/home/home.html',
    directives: [NavbarButtons, ProductGridItem],
    pipes: [Filter]
})
export class HomePage {
    constructor(nav: NavController, products: Products) {
        this.nav = nav;
        this.productService = products;
        // products.load()
        //     .then((products) => {
        //         this.products = products;
        //     });
        //this.products = products.products;
    }

    ngOnInit() {
        this.productService.all().subscribe(
            data => this.products = data
            );
    }

    navPopular() {
        this.nav.push(GridPage);
    }

    navSale() {
        this.nav.push(ListPage);
    }

    navCart() {
        this.nav.push(CartPage);
    }

    navSearch() {
        this.nav.push(SearchPage);
    }
}
