import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CartProvider {

  cart:any = [];

  constructor(private http: Http, private storage: Storage) {
    // console.log('Hello CartServiceProvider Provider');
  }

  load() {
    this.storage.get('cart').then((value) => {
      if(value) { 
        this.cart = value; 
      }
      console.log('Cart : ', this.cart);
    });
  }

  add(product:any) {
    this.cart.push(product);
    this.storage.set('cart', this.cart);
    console.log('Add Cart : ', this.cart);
  }

  delete(product:any) {
    let index = this.cart.indexOf(product);

    if(index > -1){
      this.cart.splice(index, 1);
    }
    
    this.storage.set('cart', this.cart);
    console.log('Delete Cart : ', this.cart);
  }

}
