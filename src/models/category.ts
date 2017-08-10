import { Product } from './product';

export interface Category {
  id: number;
  name: string;
  target: string;
  priority: string;
  is_active: string;
  created: string;
  products: Product[];  
 
  // constructor(id: number, name: string, target: string, priority: string, is_active: string, created: string, products: Product[]) {
  //   this.id = id;
  //   this.name = name;
  //   this.target = target;
  //   this.priority = priority;
  //   this.is_active = is_active;
  //   this.created = created;
  //   this.products = products;
  // }
}
