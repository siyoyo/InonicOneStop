import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from 'ionic-native';
import { Config } from '../../config';

import { AuthService } from '../../providers/auth-service';
import { ProductService } from '../../providers/product-service';
import { ReviewService } from '../../providers/review-service';

/**
 * Generated class for the PurchaseDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-purchase-detail',
  templateUrl: 'purchase-detail.html',
})
export class PurchaseDetailPage {
  product:any;
  review = { product_id: '', description: '', rating: 0, token_type: '', token: '' };
  loading: Loading;
  success = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private loadingCtrl: LoadingController, private alertCtrl: AlertController,
  private reviewService: ReviewService, private auth: AuthService, private prod: ProductService){
    this.product = this.navParams.get('product');
    console.log("product", this.product);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PurchaseDetail');
  }

  public submit() {
    this.review.product_id = this.product.id;
    this.review.token = this.auth.getCredential().access_token;
    this.review.token_type = this.auth.getCredential().token_type;
    this.reviewService.submit(this.review)
    .subscribe(success => {
    //   if (success) {
    //     this.createSuccess = true;
    //     this.showPopup("Success", "Account created.");
    //   } else {
    //     this.showPopup("Error", "Problem creating account.");
    //   }
    },
    error => {
      console.log("Error", error);
      // this.showPopup("Error", error);
    });
  }

  public purchaseWallet() {
    this.success = true;
  }

  public purchasePaypal() {  
    let price = '';
    this.prod.getConverter(parseInt(this.product.price)).
    subscribe(data=>{  
      price = data;
      console.log("realtime currencies ", price);     
      let payment: PayPalPayment = new PayPalPayment(price, 'USD', this.product.product_name, 'sale');
      this.paypalMethod(payment);     
    }, error => {
      price = (parseInt(this.product.price)/13000).toString();
      console.log("default currencies ", price); 
      let payment: PayPalPayment = new PayPalPayment(price, 'USD', this.product.product_name, 'sale');
      this.paypalMethod(payment);
    });
	}

  private paypalMethod(payment: PayPalPayment) {
    let payPalEnvironment: string = 'payPalEnvironmentSandbox';
    
    PayPal.init({
			PayPalEnvironmentProduction: Config.payPalEnvironmentProduction,
			PayPalEnvironmentSandbox: Config.payPalEnvironmentSandbox
		}).then(onSuccess => {
			PayPal.prepareToRender(payPalEnvironment, new PayPalConfiguration({})).then(() => {
				PayPal.renderSinglePaymentUI(payment).then((response) => {
          alert(`Successfully paid. Status = ${response.response.state}`);          
          this.success = true;
					console.log(response);
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		})
    .catch(onError=> {
       console.log('onError Render: ', onError);
       alert('onError Render: ' + JSON.stringify(onError));
    });
  }
}
