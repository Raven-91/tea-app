import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products.component";
import {ProductComponent} from "../product/product.component";

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'product', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
