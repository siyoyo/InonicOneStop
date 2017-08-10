export interface Image {
  id: number;
  product_id: number;
  image_type_id: number;
  image: string;
  image_url: string;

  // constructor(id: number, product_id: number, image_type_id: number, image: string, image_url: string) {
  //   this.id = id;
  //   this.product_id = product_id;
  //   this.image_type_id = image_type_id;
  //   this.image = image;
  //   this.image_url = image_url;
  // }
}