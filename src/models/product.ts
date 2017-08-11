import { Image } from './image';

export interface Product {
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
  
 
  // constructor(id: number, product_name: string, package_code: string, price: string, description: string, 
  // compatibility: string, urldownload: string, status: string, created_at: string,   category_id: number,
  // sub_category_id: number, images: Image[]) {
  //   this.id = id;
  //   this.product_name = product_name;
  //   this.package_code = package_code;
  //   this.price = price;
  //   this.description = description;
  //   this.compatibility = compatibility;
  //   this.urldownload = urldownload;
  //   this.status = status;
  //   this.created_at = created_at;
  //   this.category_id = category_id;
  //   this.sub_category_id = sub_category_id;
  //   this.images = images;
  // }
}