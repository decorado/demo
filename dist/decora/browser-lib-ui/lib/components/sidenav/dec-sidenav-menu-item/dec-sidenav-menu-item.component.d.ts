import { TemplateRef, QueryList, AfterViewInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
export declare class DecSidenavMenuItemComponent implements AfterViewInit {
    private router;
    routerLink: any;
    template: TemplateRef<any>;
    _subitems: QueryList<DecSidenavMenuItemComponent>;
    toggle: EventEmitter<{}>;
    started: any;
    showSubmenu: boolean;
    constructor(router: Router);
    ngAfterViewInit(): void;
    readonly subitems: DecSidenavMenuItemComponent[];
    toggleSubmenu(): void;
    closeSubmenu(): void;
    openLink(): void;
    getBackground(treeLevel: any): {
        backgroundColor: string;
        pointerEvents: string;
    };
}
