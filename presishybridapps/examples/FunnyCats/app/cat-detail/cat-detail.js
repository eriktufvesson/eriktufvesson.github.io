import {NavParams, Page} from 'ionic/ionic';

@Page({
  templateUrl: 'app/cat-detail/cat-detail.html',
})
export class CatDetail {
  
  constructor(navParams: NavParams) {
    this.navParams = navParams;
    
    console.log(this.navParams);
    this.cat = this.navParams.data.cat;
    
    console.log(this.cat);
  }
  
}
