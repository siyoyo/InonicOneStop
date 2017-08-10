import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Config } from '../config';
import { Category } from '../models/category';
// import { Product } from '../models/product';

/*
  Generated class for the ProductService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductService {
  // products: Product[];
  categories:any;
  backendUrl:any;
  public categoryChanged = new EventEmitter();

  constructor(public http: Http) { 
    // console.log('Hello ProductService Provider');
   this.backendUrl = Config.backendURL;
  }

  public getProducts() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return Observable.create(observer => {
      this.http.get(`${this.backendUrl}/home/products`, {headers: headers})
      .map(res => <Category[]>res.json())
      .subscribe(data => {
        this.categories = data;
        this.categoryChanged.emit(this.categories);
        // console.log(this.categories);
        observer.next(this.categories);
        observer.complete();
        // console.log(this.currentUser);
        // return this.currentUser;
      });
    });
  }

  public getCategory(id: number){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return Observable.create(observer => {
      this.http.get(`${this.backendUrl}/home/category/${id}/1`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        // console.log(data);
        observer.next(data);
        observer.complete();
      });
    });
  }

  public getConverter(price: number){
    return Observable.create(observer => {
      this.http.get(`http://api.fixer.io/latest?base=USD`)
      .map(res => res.json())
      .subscribe(data => {
        let result = price / data.rates.IDR;
        observer.next(result);
        observer.complete();
      });
    });
  }
}
