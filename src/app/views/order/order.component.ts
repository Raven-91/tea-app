import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {GetProductsService} from "../../shared/services/get-products.service";
import {HotToastService} from "@ngneat/hot-toast";

declare var $: any;

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private getProductService: GetProductsService,
    private toast: HotToastService
  ) {}

  orderForm = this.fb.group({
    product: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern('^([А-ЯЁ]{1}[а-яё]{1,})$')]],
    lastName: ['', [Validators.required, Validators.pattern('^([А-ЯЁ]{1}[а-яё]{1,})$')]],
    phone: ['', [Validators.required, Validators.pattern('^((\\+?)\\d{11})$')]],
    country: ['', [Validators.required, Validators.pattern('^([А-ЯЁ]{1}[а-яё]{1,})?( |-)|([А-ЯЁ]{1}[а-яё]{1,})$')]],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    address: ['', [Validators.required, Validators.pattern('^[а-яёА-ЯЁ0-9,.\\-\\/\\s]*$')]],
    comment: ['']
  });

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;
  public loading: boolean = false;


  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.orderForm.get('product')?.setValue(params['product']);
    });
  }

  public createOrder(): void {
    this.loading = true;
    this.subscriptionOrder = this.getProductService.sendDataForOrder({
      product: this.orderForm.get('product')?.value as string,
      name: this.orderForm.get('name')?.value as string,
      last_name: this.orderForm.get('lastName')?.value as string,
      phone: this.orderForm.get('phone')?.value as string,
      country: this.orderForm.get('country')?.value as string,
      zip: this.orderForm.get('zip')?.value as string,
      address: this.orderForm.get('address')?.value as string,
      comment: this.orderForm.get('comment')?.value as string
    }).pipe(
        tap((): void => {
          // Лоадер
          this.loading = false;

          // Доп. задание № 1
          $('#button').addClass('disabled');
        })
      ).subscribe(response => {
        if (response.success && !response.message) {
          $('#order-title').addClass('d-none');
          $('#form').hide();
          $('#successMessage').addClass('openElement');

          // Доп. задание № 1
          $('#button').removeClass('disabled')

          this.toast.success('Successfully toasted!')

        } else {

          // Доп. задание № 2
          let error = $('#error-message');
          error.addClass('openElement');
          error.delay(3000).slideUp(400, function () {
            error.removeClass('openElement');
          });

          this.toast.error("This didn't work.")

          // Доп. задание № 1
          $('#button').removeClass('disabled')
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }
}
