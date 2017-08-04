import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { ProductService } from '../../providers/product-service';
/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category:any;
  subcategories:any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  private auth: AuthService, private product: ProductService, private loadingCtrl: LoadingController,) {
    this.category = this.navParams.get('category');
    this.getCategories(); 
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad Category');
  // }
  public getCategories() {
    
    let access_token = this.auth.getCredential().access_token;
    let type = this.auth.getCredential().token_type;
    this.product.getCategory(access_token, type, this.category.id).subscribe(data => { 
      this.subcategories = data;  
      console.log(this.subcategories); 
    }, error => {
       this.showError(error);
    });
  }

  public onProductClick(product) {
    this.navCtrl.push('ProductDetailPage', {'product':product}, {animate: true, direction: 'forward'});
  }
  
  public goToHome() {    
    this.navCtrl.setRoot('HomePage');
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
