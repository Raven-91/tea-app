import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ProductsComponent} from "./products.component";
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ProductComponent} from "../product/product.component";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
