import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading, MenuController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {  
  loading: Loading;
  registerCredentials = { name: '', password: '', email: '' };

  constructor(private nav: NavController, private menu: MenuController, 
    private authService: AuthService, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController) { 
    menu.close();
    menu.swipeEnable(false);
  }
 
  public createAccount() {
    this.nav.push('RegisterPage', {}, {animate: true, direction: 'forward'});
  }

  public forgotPassword() {
    this.nav.push('ForgotPasswordPage', {}, {animate: true, direction: 'forward'});
  }
  
  public login() {
    this.showLoading()
    this.authService.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.loading.dismiss();
        this.nav.popToRoot();
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
       this.showError(error);
    });
  }

  public loginGoogle(){
    this.authService.google().subscribe(allowed => {
      if (allowed) {
        this.nav.popToRoot();
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
       this.showError(error);
    });

  }

  public loginFacebook(){
    // this.authService.facebook()
    this.authService.facebook().subscribe(allowed => {
      if (allowed) {
        this.showError("Allowed");
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
       this.showError(error);
    });
  /*
    let permissions = new Array<string>();
    let env = this;
      
    permissions = ["public_profile"];

    this.fb.login(permissions)
    .then(function(response){
      let params = new Array<string>();

      params = ["public_profile","email"];

      env.fb.api("/me?fields=name,email", params)
      .then(function(user) {
        // alert(`Name = ${user.name}`);
        // alert(`Email = ${user.email}`);
        env.registerCredentials.email = user.email;
        env.registerCredentials.name = user.name;
        env.socialLogin();
      }, function (error) {
        alert(`Failed. Status = ${error}`);
        console.log(error);
      });   


    }, function(error){
      alert(`Successfully Failed. Status = ${error}`);
      console.log(error);
    });
  */
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
      title: 'Username or password did\'t match',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
