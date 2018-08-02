import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dec-page-forbiden',
  templateUrl: './page-forbiden.component.html',
  styleUrls: ['./page-forbiden.component.scss']
})
export class DecPageForbidenComponent {

  previousUrl: string;

  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((e: NavigationEnd) => {
      this.previousUrl = document.referrer || e.url;
    });
  }

}
