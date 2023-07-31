import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {ShortenTextPipe} from "./pipes/shorten-text.pipe";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShortenTextPipe,
    ProductCardComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ShortenTextPipe,
    ProductCardComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
