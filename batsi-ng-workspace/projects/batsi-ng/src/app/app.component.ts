import { PageTitleService } from './services/page-title/page-title.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'batsi-ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _unsubscribe = new Subject<void>();

  constructor(
    private _titleService: Title,
    private _pageTitleService: PageTitleService
  ) {}

  ngOnInit() {
    this._pageTitleService
      .getPageTitleOnRouteChange()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(title => this._titleService.setTitle(title));
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
