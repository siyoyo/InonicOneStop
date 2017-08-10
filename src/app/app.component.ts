import { Component, ViewChild } from '@angular/core';
import { Nav, Platform  } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../providers/auth-service';
import { ProductService } from '../providers/product-service';

// import { HomePage } from '../pages/home/home';
// import { CategoryPage } from '../pages/category/category';
// import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'HomePage';
  pages: Array<{title: string, component: any, parameter: any}>;
  user:any;
  isGuest:Boolean;
  categories:any;

  // constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  constructor(platform: Platform, private auth: AuthService, private prod: ProductService) {
    // this.pages = [
    //   { title: 'Home', component: HomePage, parameter: {} },
      // { title: 'List', component: ListPage }
    // ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
    this.isGuest = true;
    this.user = auth.getUser();
    auth.userChanged.subscribe(user => {
       this.user = user;
       this.isGuest = false;
    });
    
    prod.categoryChanged.subscribe(categories => {
      this.pages = [];
      categories.forEach(element => {
        this.pages.push( { title: element.name, component: 'CategoryPage', parameter: {'category':element} } );
      });
      // console.log(this.pages);
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component, page.parameter, {animate: true, direction: 'forward'});
    // this.nav.setRoot(page.component, page.parameter);
  }

  public openCartPage() {
    this.nav.push('CartPage', {}, {animate: true, direction: 'forward'});
  }

  public logout() { 
    console.log("Logged out");
    this.auth.logout();
    this.nav.popToRoot();
    this.isGuest = true;
  }

  public login() { 
    this.nav.push('LoginPage', {}, {animate: true, direction: 'forward'});
  }
}

