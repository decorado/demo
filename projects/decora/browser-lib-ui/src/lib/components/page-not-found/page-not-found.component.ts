import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dec-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class DecPageNotFoundComponent {

  previousUrl: string;

  constructor(private router: Router) {
    router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((e: NavigationEnd) => {
        this.previousUrl = e.url;
    });
  }

}
