import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DecApiService } from './../services/api/decora-api.service';
export declare class DecAuthGuard implements CanLoad, CanActivate, CanActivateChild {
    private decoraApi;
    constructor(decoraApi: DecApiService);
    canLoad(route: Route): Observable<boolean>;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
    private isAuthenticated();
}
