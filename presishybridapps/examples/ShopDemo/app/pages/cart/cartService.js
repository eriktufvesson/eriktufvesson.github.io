import {Storage, LocalStorage} from 'ionic/ionic';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class Cart {
    cartItems$: Observable<Array<any>>;
    private _cartObserver: any;
    private _products: Array<any>;

    constructor() {
        
        this.cartItems$ = new Observable(observer => {
            this._cartObserver = observer;
        });

        this.cartStorage = new Storage(LocalStorage);

        this.cartStorage.get('cartItems').then((products) => {
            this._products = products ? JSON.parse(products) : [];
            this._cartObserver.next(this._products);
        });
    }

    getProducts() {
        return this._products;
    }

    add(product) {
        this._products.push(product);
        this.updateCart();        
    }

    remove(product) {
        this._products.splice(this._products.indexOf(product), 1);
        this.updateCart();
    }

    clear() {
        this._products.splice(0, this._products.length);
        this.updateCart();
    }

    private updateCart() {
        this.cartStorage.set('cartItems', JSON.stringify(this._products));
        this._cartObserver.next(this._products);
    }
}