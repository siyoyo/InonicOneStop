import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { User } from '../models/user';
import { Token } from '../models/token';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from 'ionic-native';
import { Config } from '../config';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {  
  currentUser: User;
  token: Token;
  backendUrl = Config.backendURL;
  public userChanged = new EventEmitter();

  constructor(public http: Http, public storage: Storage, public fb: Facebook) {
    this.currentUser = Config.defaultUser;
    this.fb.browserInit(Config.FB_APP_ID, "v2.8");
  }

  public login(credentials) {
    let access = false;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      username:credentials.name,
      password:credentials.password
    };
    
    return Observable.create(observer => {
      this.http.post(`${this.backendUrl}/api/auth/token`, JSON.stringify(body), {headers: headers})
      .map(res => <Token>res.json())
      .subscribe(token => {
        this.token = token;
        this.storage.set('token', token);
        access = true;
        this.getUserInfo();
        observer.next(access);
        observer.complete();
      }, error => {
        console.log("Oooops!");
        observer.next(access);
        observer.complete();
      });
    });
  }

  public socialLogin() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      name: this.currentUser.name,
      email: this.currentUser.email
    };

    return Observable.create(observer => {
      this.http.post(`${this.backendUrl}/api/social_login`, JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(token => {
        this.token = token;  
        this.storage.set('token', token);
        // alert(`Current. Status = ${JSON.stringify(this.token)}`);
        observer.next(true);
        observer.complete();
      }, error => {
        console.log(`Failed. Status = ${JSON.stringify(error)}`);
        
        observer.next(false);
        observer.complete();
      });
    });
  }
 
  public facebook() {
    let env = this;
    let status:Boolean = false;
    let permissions = new Array<string>();      
    permissions = ["public_profile"];


    return Observable.create(observer => {

    this.fb.login(permissions)
      .then(function(response){
        let params = new Array<string>();
        params = ["public_profile","email"];

        env.fb.api("/me?fields=name,email", params)
        .then(function(user) {
          env.currentUser.email = user.email;
          env.currentUser.name = user.name;        
          observer.next(env.socialLogin());
          observer.complete();
        }, function (error) {
          alert(`Failed. Status = ${JSON.stringify(error)}`);
          console.log(error);
          return Observable.throw("Authentication Failed.");
        });

      }, function(error){
        alert(`Failed Login. Status = ${JSON.stringify(error)}`);
        console.log(error);
        return Observable.throw("Not Registered.");
      });
      
      });
  }

  public google() {
    return Observable.create(observer => {
      GooglePlus.login({
        'webClientId': Config.webClientId,
        'offline': true
      }).then((res) => {
        this.currentUser.email = res['email'];
        this.currentUser.name = res['displayName'];
        this.socialLogin().subscribe(allowed => {
          this.userChanged.emit(this.currentUser);
          observer.next(allowed);
          observer.complete();
        },
        error => {
          alert(`Failed Login. Status = ${JSON.stringify(error)}`);
          console.log(error);
        });
        
      }, (error) => {
        alert(`Failed Login. Status = ${JSON.stringify(error)}`);
        console.log(error);
      });
    });
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.password_confirmation === null || credentials.name === null) {
      return Observable.throw("Please insert credentials");
    } else if (credentials.password != credentials.password_confirmation) {
      return Observable.throw("Password did not match");
    } else {      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let body = {
        name:credentials.name,
        password:credentials.password,
        password_confirmation:credentials.password_confirmation,
        email:credentials.email
      };
      
      return Observable.create(observer => {
        this.http.post(`${this.backendUrl}/api/auth/register`, JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          observer.next(true);
          observer.complete();
        }, error => {
          console.log("ServerProblem, Register Failed!");            
          observer.next(false);
          observer.complete();
        });
      });
    }
  }

  public forgotPassword(credentials) {  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      email:credentials.email
    };
    
    return Observable.create(observer => {
      this.http.post(`http://www.onestopclick.tk/api/forgot_password`, JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        observer.next(!data.error);
        observer.complete();
      }, error => {
        console.log("ServerProblem, Reset Password Failed!");
        observer.next(false);
        observer.complete();
      });
    });
  }

  private getUserInfo() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token.access_token);

    this.http.get(`${this.backendUrl}/api/getuserdetails`, {headers: headers})
    .map(res => <User>res.json())
    .subscribe(user => {
      this.currentUser = user;
      this.userChanged.emit(this.currentUser);
    });
    
  }
  
  public checkCredential() {
    this.storage.get('token').then((value) => {
      if(value) {
        // console.log('Provider',value);   
        this.token = value;      
        this.getUserInfo();
      }
    });
  }

  public getCredential() { 
    return this.token;
  }

  public getUser() { 
    return this.currentUser;
  }

  public logout() {
    this.currentUser = { name: 'Guest', id: 0, email: '', created_at: '', updated_at: '', role:'' };
    this.userChanged.emit(this.currentUser);
    this.storage.clear();      
  }
}
