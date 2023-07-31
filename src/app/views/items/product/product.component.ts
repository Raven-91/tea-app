import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {GetProductsService} from "../../../shared/services/get-products.service";
import {tap} from "rxjs";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductType;

  // Лоадер
  public loading: boolean = false;

  constructor(
    private getProductsService: GetProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    };
  }

  ngOnInit(): void {
    // Лоадер
    this.loading = true;

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.getProductsService.getProduct(+params['id'])
          .pipe(
            tap((): void  => {

              // Лоадер
              this.loading = false;
            })
          )
          .subscribe({
            next: (product: ProductType): void  => {
              this.product = product;
            },
            error: (error): void  => {
              console.log(error);
              this.router.navigate(['/'])
            }
          });
      }
    });
  }

}

