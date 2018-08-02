import { DecApiService } from './../../services/api/decora-api.service';
import { CanLoad, CanActivate, CanActivateChild, Route, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
export declare class DecPermissionGuard implements CanLoad, CanActivate, CanActivateChild {
    private decoraApi;
    private router;
    constructor(decoraApi: DecApiService, router: Router);
    canLoad(route: Route): Observable<boolean>;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
    notAllowed(): void;
    hasAccess(permissions: any): Observable<boolean>;
    private isAllowedAccess(userPermissions, currentPermissions);
}
