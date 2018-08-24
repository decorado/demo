import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DecApiService } from './../services/api/decora-api.service';
import { map } from 'rxjs/operators';


@Injectable()
export class DecAuthGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private decoraApi: DecApiService
  ) {}

  canLoad(route: Route): Observable<boolean> {
    return this.isAuthenticated();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean> {
    return this.decoraApi.user$
    .pipe(
      map((user: any) => {
        return (user && user.id) ? true : false;
      })
    ) as Observable<boolean>;
  }

}
