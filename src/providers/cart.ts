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
  cartLengthEvent:any;
  totalPrice:any;

  constructor(private http: Http, private storage: Storage) {
    // console.log('Hello CartServiceProvider Provider');
    this.cartLengthEvent = new EventEmitter();
  }

  load() {
    this.storage.get('cart').then((value) => {
      this.totalPrice = 0;
      if(value) { 
        this.cart = value; 
        this.countPrice();
        this.cartLengthEvent.emit(this.cart);
      }
      // console.log('Cart : ', this.cart);
    });
  }

  add(product:any) {
    this.cart.push(product);
    this.storage.set('cart', this.cart);
    this.cartLengthEvent.emit(this.cart);
    // console.log('Add Cart : ', this.cart);
  }

  delete(product:any) {
    let index = this.cart.indexOf(product);

    if(index > -1){
      this.cart.splice(index, 1);
    }
    
    this.storage.set('cart', this.cart);
    this.cartLengthEvent.emit(this.cart);
    // console.log('Delete Cart : ', this.cart);
  }

  countPrice(){
    console.log(this.cart); 
    this.cart.forEach(key=> {
      console.log(this.cart[key]); 
      // this.totalPrice += this.cart[key].price;
    });
  }



}
