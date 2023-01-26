import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  constructor(private _router: Router) {}

  getPageTitleOnRouteChange(): Observable<string> {
    return this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this._router.routerState.root;

        if (!route) {
          return null;
        }

        while (route.firstChild) {
          route = route.firstChild;
        }

        return route.snapshot.data['title'];
      }),
      map(title => (title ? `bATsi - ${title}` : 'bATsi'))
    );
  }
}
