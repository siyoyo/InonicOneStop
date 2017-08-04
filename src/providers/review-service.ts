import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Config } from '../config';

/*
  Generated class for the ReviewService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReviewService {
  backendUrl = Config.backendURL;

  constructor(public http: Http) {
    // console.log('Hello ReviewService Provider');
  }

  public getReviews(token: String, token_type: String, id:Number) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token_type+' ' + token);

      return Observable.create(observer => {
      this.http.get(`${this.backendUrl}/api/reviews/${id}`, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {

        observer.next(data);
        observer.complete();
      });
    });
  }

  public submit(review) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + review.token);
    let body = {
      product_id:review.product_id,
      description:review.description,
      rating:review.rating
    };
    console.log(body);
    return Observable.create(observer => {
      this.http.post(`${this.backendUrl}/api/review/add`, JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        console.log("Success, Submit Success!");  
      }, error => {
        console.log("Server Problem, Submit Failed!"); 
      });
    });
  }

}
