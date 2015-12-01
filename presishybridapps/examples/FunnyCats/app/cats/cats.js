import {Page, NavController} from 'ionic/ionic';
import {Http} from 'angular2/http'; 
import {CatDetail} from '../cat-detail/cat-detail';
@Page({
  templateUrl: 'app/cats/cats.html',
})
export class Cats {
  constructor(http: Http, nav: NavController) {
    this.nav = nav;    
    this.http = http;    
    this.cats = [];  
  }
  onInit() {
    this.http.get('https://kittenapi.herokuapp.com/cats/funny/100')
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.cats = data;
      });
  }
  viewCat(cat) {
    console.log('View cat', cat);
    this.nav.push(CatDetail, {cat: cat});
  }
}
