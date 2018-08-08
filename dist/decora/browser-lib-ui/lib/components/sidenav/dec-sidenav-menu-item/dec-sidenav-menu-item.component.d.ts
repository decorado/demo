import { TemplateRef, QueryList, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
export declare class DecSidenavMenuItemComponent implements AfterViewInit {
    private router;
    routerLink: any;
    template: TemplateRef<any>;
    _subitems: QueryList<DecSidenavMenuItemComponent>;
    started: any;
    showSubmenu: boolean;
    constructor(router: Router);
    ngAfterViewInit(): void;
    readonly subitems: DecSidenavMenuItemComponent[];
    toggleSubmenu(): void;
    openLink(): void;
}
