import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';

@Directive({
  selector: '[decPermission]'
})
export class DecPermissionDirective {

  private hasView = false;

  constructor(private service: DecApiService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input()
  set decPermission(p: string[]) {
    if (!p) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.hasPermission(p);
    }
  }

  hasPermission(p) {
    this.service.user$.subscribe(
      user => {
        if (user && this.isAllowedAccess(p, user.permissions)) {
          if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
          }
        } else {
          this.viewContainer.clear();
          this.hasView = false;
        }
      }
    );
  }

  private isAllowedAccess(rolesAllowed: string[] = [], currentRoles: string[] = []) {
    try {
      const matchingRole = currentRoles.find((userRole) => {
        return rolesAllowed.find((alowedRole) => {
          return alowedRole === userRole;
        }) ? true : false;
      });
      return matchingRole ? true : false;
    } catch (error) {
      return false;
    }
  }
}
