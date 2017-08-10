import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  user = { email: '' };
  status = false;

  constructor(private nav: NavController, private menu: MenuController, 
    private authService: AuthService, private alertCtrl: AlertController) {   
      menu.swipeEnable(false);
  }

  public forgotPassword() {
    this.authService.forgotPassword(this.user).subscribe(success => {
      if (success) {
        this.status = true;
        this.showPopup("Success", "Please check your email");
        this.nav.pop();
      } else {
        this.showPopup("Error", "Email not registered.");
      }
    }, error => {
      this.showPopup("Error", error);
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
  }

  public backToHome() {
    this.nav.popToRoot();
  }

}
