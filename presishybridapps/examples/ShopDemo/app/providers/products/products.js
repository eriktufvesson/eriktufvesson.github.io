import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

/*
  Generated class for the Products provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Products {
    constructor(http: Http) {
        this.http = http;

        this.products = null;
        // this.products = [{
        //   id: 1,
        //   name: 'Sony headphones',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/1.jpeg',
        //   price: 99,
        //   stock: 10,
        //   sale: true,
        //   originalPrice: 199,
        //   popular: true
        // },
        // {
        //   id: 2,
        //   name: 'Disc spinner Pro',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/2.jpeg',
        //   price: 249,
        //   stock: 0,
        //   sale: true,
        //   originalPrice: 299,
        //   popular: true
        // },
        // {
        //   id: 3,
        //   name: '65" LED TV',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/3.jpeg',
        //   price: 699,
        //   stock: 99,
        //   sale: true,
        //   originalPrice: 999,
        //   popular: true
        // },
        // {
        //   id: 4,
        //   name: 'Vintage laptop',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/4.jpeg',
        //   price: 100,
        //   stock: 5,
        //   sale: false,
        //   originalPrice: 100,
        //   popular: true
        // },
        // {
        //   id: 5,
        //   name: 'Sony MP3 Player',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/5.jpeg',
        //   price: 20,
        //   stock: 99,
        //   sale: true,
        //   originalPrice: 30,
        //   popular: true
        // },
        // {
        //   id: 6,
        //   name: 'Mega bass ear-plugs',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/6.jpeg',
        //   price: 100,
        //   stock: 5,
        //   sale: false,
        //   originalPrice: 100,
        //   popular: true
        // },
        // {
        //   id: 7,
        //   name: 'iPad Air 2',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/7.jpeg',
        //   price: 249,
        //   stock: 5,
        //   sale: false,
        //   popular: true
        // },
        // {
        //   id: 8,
        //   name: 'iPhone ear-plugs',
        //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum dolor vitae sapien dictum, eget efficitur eros molestie. Duis vulputate magna quis nisi feugiat tristique. Aenean quis odio eget ante tristique volutpat et non magna. Donec vitae accumsan sapien. Nam in elementum justo, eu consectetur libero',
        //   imageUrl: 'img/sample_images/products/8.jpeg',
        //   price: 25,
        //   stock: 5,
        //   sale: false,
        //   popular: true
        // }];
    }

    all() {
        return this.http.get('http://localhost:3000/products')
            .map(res => res.json())
            .catch(this.handleError);
    }
    
    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

