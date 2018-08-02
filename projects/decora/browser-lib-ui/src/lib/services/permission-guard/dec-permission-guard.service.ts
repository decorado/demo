import { Injectable } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { CanLoad, CanActivate, CanActivateChild, Route, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DecPermissionGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(private decoraApi: DecApiService,
              private router: Router) { }

  canLoad(route: Route) {
    if (route.data && !route.data.permissions) {
      this.notAllowed();
      return of(false);
    }

    const permissions = route.data.permissions;
    return this.hasAccess(permissions);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data && !route.data.permissions) {
      this.notAllowed();
      return of(false);
    }

    const permissions = route.data.permissions;
    return this.hasAccess(permissions);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  notAllowed() {
    this.router.navigate(['/forbiden']);
  }

  hasAccess(permissions) {
    return this.decoraApi.user$
    .pipe(
      map(user => {
        if (user) {
          const allowed = this.isAllowedAccess(user.permissions, permissions);
          if (!allowed) {
            this.notAllowed();
          } else {
            return true;
          }
        }
      })
    );
  }

  private isAllowedAccess(userPermissions: string[], currentPermissions: string[]) {
    try {
      const matchingRole = currentPermissions.find((userRole) => {
        return userPermissions.find((alowedRole) => {
          return alowedRole === userRole;
        }) ? true : false;
      });
      return matchingRole ? true : false;
    } catch (error) {
      return false;
    }
  }

}
