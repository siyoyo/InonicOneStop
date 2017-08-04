import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseDetailPage } from './purchase-detail';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    PurchaseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseDetailPage),
    Ionic2RatingModule
  ],
  exports: [
    PurchaseDetailPage
  ]
})
export class PurchaseDetailModule {}
