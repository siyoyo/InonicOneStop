import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Config } from '../config';

export class Image {
  id: number;
  product_id: number;
  image_type_id: number;
  image: string;
  image_url: string;

  constructor(id: number, product_id: number, image_type_id: number, image: string, image_url: string) {
    this.id = id;
    this.product_id = product_id;
    this.image_type_id = image_type_id;
    this.image = image;
    this.image_url = image_url;
  }
}

export class Product {
  id: number;
  product_name: string;
  package_code: string;
  price: string;
  description: string;
  compatibility: string;
  urldownload: string;
  status: string;
  created_at: string;
  category_id: number;
  sub_category_id: number;
  images: Image[];
  
 
  constructor(id: number, product_name: string, package_code: string, price: string, description: string, 
  compatibility: string, urldownload: string, status: string, created_at: string,   category_id: number,
  sub_category_id: number, images: Image[]) {
    this.id = id;
    this.product_name = product_name;
    this.package_code = package_code;
    this.price = price;
    this.description = description;
    this.compatibility = compatibility;
    this.urldownload = urldownload;
    this.status = status;
    this.created_at = created_at;
    this.category_id = category_id;
    this.sub_category_id = sub_category_id;
    this.images = images;
  }
}

export class Categories {
  id: number;
  name: string;
  target: string;
  priority: string;
  is_active: string;
  created: string;
  products: Product[];  
 
  constructor(id: number, name: string, target: string, priority: string, is_active: string, created: string, products: Product[]) {
    this.id = id;
    this.name = name;
    this.target = target;
    this.priority = priority;
    this.is_active = is_active;
    this.created = created;
    this.products = products;
  }
}
/*
  Generated class for the ProductService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductService {
  products: Product[];
  categories = [];
  backendUrl = Config.backendURL;
  public categoryChanged = new EventEmitter();

  constructor(public http: Http) { 
    // console.log('Hello ProductService Provider');
  }

  public getProducts() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return Observable.create(observer => {
      this.http.get(`${this.backendUrl}/home/products`, {headers: headers})
      .map(res => <Categories[]>res.json())
      .subscribe(data => {
        data.forEach(element => {
          // let category = new Categories(element.id, element.name, element.target, element.priority, element.is_active, element.created,element.products);
          // console.log(category);
          this.categories.push(new Categories(element.id, element.name, element.target, element.priority, element.is_active, element.created,element.products));
        });
        this.categoryChanged.emit(this.categories);
        // console.log(this.categories);
        observer.next(this.categories);
        observer.complete();
        // console.log(this.currentUser);
        // return this.currentUser;
      });
    });
  }

  public getCategory(token: String, token_type: String, id: number){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token_type+' ' + token);

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
