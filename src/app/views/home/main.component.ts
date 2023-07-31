import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;
  private readonly observable: Observable<void>;
  public modalOpen: boolean = false;

  constructor() {
    this.observable = new Observable<void>((observer: Observer<void>) => {
      const timeout = setTimeout((): void => {
        observer.next();
        observer.complete();
      }, 1000);
      return {
        unsubscribe() {
          clearTimeout(timeout)
        }
      }
    })
  }

  ngOnInit(): void {

    if (this.observable) {
      this.subscription = this.observable.subscribe(() => {
        this.modalOpen = true;
      })
    }

    // Функционал по аккордеону
    $(function (): void {
        let icons = {
          header: "iconClosed",    // custom icon class
          activeHeader: "iconOpen" // custom icon class
        };
        $("#accordion").accordion({
          collapsible: true,
          heightStyle: "content",
          icons: icons,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closePopUp(): void {
    const close: Element | null = document.querySelector('.open');
    if (close) {
      close.remove();
    }
  }
}
