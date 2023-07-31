import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {GetProductsService} from "../../../shared/services/get-products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products: ProductType[] = [];

  // Доп. задание № 3 - Лоадер
  public loading: boolean = false;

  constructor(
    private getProductsService: GetProductsService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.title = 'Наши чайные коллекции';
  }

  ngOnInit(): void {
    // Доп. задание № 3 - Лоадер
    this.loading = true;

    //Доп. задание № 4 - Поиск по сайту
    this.subscription = this.activatedRoute.queryParams.subscribe({
        next: (item) => {
          const keyword: string = item?.['search'];

          if (!item || !keyword || keyword === '') {
            this.getProductsService.getProducts().pipe(
              tap((): void => {
                // Доп. задание № 3 - Лоадер
                this.loading = false;
              })).subscribe({
              next: (products: ProductType[]): void => {
                this.products = products;
                this.title = 'Наши чайные коллекции';
              },
              error: (error): void => {
                console.log(error);
                this.router.navigate(['/'])
              }
            })
          } else if (keyword) {
            this.getProductsService.getSearchRequest(keyword).pipe(
              tap((): void => {
                this.loading = false;
              })).subscribe({
                next: (products): void => {
                  this.products = Object.values(products);
                  this.title = `Результаты поиска по запросу "${keyword}"`;
                },
                error: (error): void => {
                  console.log(error);
                  this.router.navigate(['/'])
                }
              }
            )
          }
        }
      }
    )
  }

  private subscription: Subscription | null = null;
  public title: string | undefined;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
