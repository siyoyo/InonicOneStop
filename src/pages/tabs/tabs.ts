import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { CartProvider } from '../../providers/cart';

/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1: any = 'HomePage';
  tab2: any = 'CartPage';
  tab3: any = 'AccountPage';
  badge: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartProvider) {    
  }
  
  ionViewDidLoad() {        
    this.loadCart();
  }

  loadCart() {
    this.cartService.cartLengthEvent.subscribe(value => {
       this.badge = value.length;
      //  console.log('Length : ', this.badge);
    });
    
  }
}
