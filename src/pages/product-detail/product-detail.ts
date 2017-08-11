import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { ReviewService } from '../../providers/review-service';
import { CartProvider } from '../../providers/cart';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private review: ReviewService,
    private auth: AuthService, public cartService: CartProvider) {
    this.product = this.navParams.get('product');
   }

  ionViewDidLoad() {
    console.log('Cart : ',this.cartService);
    this.getReviews(); 
  }

  public getReviews() {
    this.review.getReviews(this.product.id).subscribe(data => { 
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
    this.auth.getUser().id == 0 ? 
    this.navCtrl.push('LoginPage', {animate: true, direction: 'forward'}) :
    this.navCtrl.push('PurchaseDetailPage', {'product':product}, {animate: true, direction: 'forward'});
  }

  public addToCart() {
    this.cartService.add(this.product);
  }
 
  showError(text) { 
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Dismiss']
    });
    alert.present(prompt);
  }

}
