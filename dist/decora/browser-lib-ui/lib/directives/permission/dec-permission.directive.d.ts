import { TemplateRef, ViewContainerRef } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
export declare class DecPermissionDirective {
    private service;
    private templateRef;
    private viewContainer;
    private hasView;
    constructor(service: DecApiService, templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    decPermission: string[];
    hasPermission(p: any): void;
    private isAllowedAccess(rolesAllowed?, currentRoles?);
}
