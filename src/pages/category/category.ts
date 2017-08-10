import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { Storage } from '@ionic/storage';

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
  myInput:any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
  private auth: AuthService, private product: ProductService, private loadingCtrl: LoadingController, public storage: Storage) {
    this.category = this.navParams.get('category');
    this.getCategories(); 
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad Category');
  // }
  public getCategories() {
    this.product.getCategory(this.category.id).subscribe(data => { 
      this.storage.set('subcategories', data);
      this.subcategories = data;
      // console.log('init', this.subcategories); 
    }, error => {
       this.showError(error);
    });
  }

  public onProductClick(product) {
    this.navCtrl.push('ProductDetailPage', {'product':product}, {animate: true, direction: 'forward'});
  }
      
  public onInput(searchbar){
    var q = searchbar.srcElement.value;
    this.storage.get('subcategories').then((value) => {
      if(value) {
        this.subcategories = value;
        if(q) {
          for(let subcategory of this.subcategories) {
            subcategory.products = subcategory.products.filter((v) => {
              if(v.product_name && q) {
                if (v.product_name.toLowerCase().indexOf(q.toLowerCase()) > -1) { return true; }
                return false;
              }
            });
          }
          // console.log('result : ', q, this.subcategories);
        }
      }
    });
  }
    
  public goToHome() {    
    this.navCtrl.popToRoot();
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
