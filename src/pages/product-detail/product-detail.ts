import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { ReviewService } from '../../providers/review-service';

/**
 * Generated class for the ProductDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product:any;
  reviews:any;
  rating:any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private loadingCtrl: LoadingController, private alertCtrl: AlertController,
  private review: ReviewService, private auth: AuthService) {
  
    this.product = this.navParams.get('product');
    this.getReviews(); 
  }

  ionViewDidLoad() {
    // console.log(this.product);
  }

  public getReviews() {
    let access_token = this.auth.getCredential().access_token;
    let type = this.auth.getCredential().token_type;
    this.review.getReviews(access_token, type, this.product.id).subscribe(data => { 
      this.reviews = data.data; 
      let sum = 0; 
      this.reviews.forEach(element => {
        sum += element.rating;
      });
      this.rating = sum / this.reviews.length;
    }, error => {
       this.showError(error);
    });
  }

  public goToPurchase(product) {
    this.navCtrl.push('PurchaseDetailPage', {'product':product}, {animate: true, direction: 'forward'});
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
