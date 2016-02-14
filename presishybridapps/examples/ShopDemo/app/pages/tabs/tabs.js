import {Page, NavController} from 'ionic/ionic';
import {HomePage} from '../home/home';
import {ListPage} from '../list/list';
import {GridPage} from '../grid/grid';

/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
  constructor(nav: NavController) {
    this.nav = nav;
    
    this.tab1Root = HomePage;
    this.tab2Root = GridPage;
    this.tab3Root = ListPage;
  }
}
