import {Page} from 'ionic/ionic';
import {NavbarButtons} from '../../components/navbar-buttons/navbar-buttons';
import {ProductGridItem} from '../../components/product-grid-item/product-grid-item';
import {Products} from '../../providers/products/products';
import {Filter} from '../../pipes/filter';
import {CartPage} from '../cart/cart';
import {SearchPage} from '../search/search';

@Page({
    templateUrl: 'build/pages/grid/grid.html',
    directives: [NavbarButtons, ProductGridItem],
    pipes: [Filter]
})
export class GridPage {
    constructor(products: Products) {
        this.productService = products;
    }

    ngOnInit() {
        this.productService.all().subscribe(
            data => this.products = data
            );
    }

    navCart() {
        this.nav.push(CartPage);
    }

    navSearch() {
        this.nav.push(SearchPage);
    }
}
