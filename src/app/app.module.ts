import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HotToastModule} from "@ngneat/hot-toast";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HomeModule} from "./views/home/home.module";
import {OrderModule} from "./views/order/order.module";
import {SharedModule} from "./shared/shared.module";
import {ProductsModule} from "./views/items/products/products.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    NgbModule,

    HomeModule,
    ProductsModule,
    OrderModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
