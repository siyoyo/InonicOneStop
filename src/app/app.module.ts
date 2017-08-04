import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

import { AuthService } from '../providers/auth-service';
import { ProductService } from '../providers/product-service';
import { ReviewService } from '../providers/review-service';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
// import { CategoryPage } from '../pages/category/category';
// import { MainPage } from '../pages/main/main';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { PayPal } from '@ionic-native/paypal';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '68e8597e'
  }
};

@NgModule({
  declarations: [
    MyApp
    // HomePage
    // LoginPage
    // CategoryPage
    // MainPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    // HomePage
    // LoginPage
    // CategoryPage
    // MainPage
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    AuthService,
    ProductService,
    ReviewService,
    PayPal,
    GooglePlus,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
