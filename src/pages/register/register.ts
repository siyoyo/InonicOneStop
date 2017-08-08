import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '', password_confirmation: '', name: '' };
  myForm:FormGroup;

  constructor(private nav: NavController, private menu: MenuController, 
    private auth: AuthService, private alertCtrl: AlertController,
		public formBuilder: FormBuilder) {
    menu.swipeEnable(false);
    this.myForm = formBuilder.group({
      name: ['', Validators.required],      
      email: ["", Validators.compose([Validators.required, RegisterPage.emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: ['', Validators.required]
    }, {validator: RegisterPage.passwordsMatch});
  }
  
  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.get('password');
    let pwd2 = cg.get('password_confirmation');
    let rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  static  emailValidator(control) {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (!EMAIL_REGEXP.test(control.value)) {
      return {invalidEmail: true};
    }
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created. Please Login with registered username");
      } else {
        this.showPopup("Error", "Problem creating account.");
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
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  public backToHome() {
    this.nav.pop();
  }

}
