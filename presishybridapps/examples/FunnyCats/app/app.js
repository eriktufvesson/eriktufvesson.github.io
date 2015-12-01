import {App, Platform} from 'ionic/ionic';
import {Cats} from './cats/cats';
import {About} from './about/about';
import './app.scss';


@App({
  templateUrl: 'app/app.html'
})
export class MyApp {
  constructor(platform: Platform) {

    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Cats;
    this.tab2Root = About;

    platform.ready().then(() => {
      // Do any necessary cordova or native calls here now that the platform is ready
    });
  }
}
