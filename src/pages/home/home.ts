import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Platform } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { ProductService } from '../../providers/product-service';
import { CartProvider } from '../../providers/cart';

// import { MyApp } from '../../app/app.component';

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  name = '';
  email = '';
  categories = [];
  loading: Loading;

  constructor(private navCtrl: NavController, private navParams: NavParams, 
  private auth: AuthService, private product: ProductService, private alertCtrl: AlertController, 
  private loadingCtrl: LoadingController, private platform: Platform, public cartService: CartProvider) {

  }
  
  ionViewDidLoad() {        
    this.auth.checkCredential();
    this.getCategories();
    this.cartService.load();
  }
 
  public getCategories() {
    this.product.getProducts().subscribe(data => {   
      this.categories = data;   
      // console.log(this.categories);
    }, error => {
       this.showError(error);
    });
  }

  public onProductClick(product) {
    this.navCtrl.push('ProductDetailPage', {'product':product}, {animate: true, direction: 'forward'});
  }

  public onCategoryClick(category) {
      this.navCtrl.setRoot('CategoryPage', {'category':category});
    // this.navCtrl.push('ProductDetailPage', {'product':product}, {animate: true, direction: 'forward'});
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present(prompt);
  }

}
