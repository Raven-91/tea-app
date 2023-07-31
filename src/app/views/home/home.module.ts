import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {MainComponent} from "./main.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
  ],
  exports: []
})
export class HomeModule { }
