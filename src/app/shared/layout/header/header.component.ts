import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {debounceTime, Subscription} from "rxjs";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  public keyword: string | null = null;
  public active: boolean = false;

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  constructor(
    private router: Router
  ) {
    this.keyword = '';
  }

  ngOnInit(): void {
    this.subscription = this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(keyword => {
      this.keyword = keyword;
    })
  }

  public searchProduct(keyword: string | null): void {
    this.router.navigate(['/products'], {
      queryParams: {search: keyword}
    });
    this.active = true;
  }

  public resetSearch(): void {
    this.searchForm.get('search')?.reset()
    this.router.navigate(['/products']);
    this.active = false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
