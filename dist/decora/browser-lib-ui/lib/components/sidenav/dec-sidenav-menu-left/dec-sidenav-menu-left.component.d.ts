import { QueryList, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';
export declare class DecSidenavMenuLeftComponent implements AfterViewInit, OnDestroy {
    private decSidenavService;
    readonly leftMenuVisible: BehaviorSubject<boolean>;
    readonly leftMenuMode: BehaviorSubject<string>;
    open: any;
    mode: any;
    persistVisibilityMode: boolean;
    items: QueryList<DecSidenavMenuItemComponent>;
    customTitle: DecSidenavMenuTitleComponent;
    openedChange: EventEmitter<boolean>;
    modeChange: EventEmitter<string>;
    private itemSubscriptions;
    constructor(decSidenavService: DecSidenavService);
    private subscribeAndExposeSidenavEvents();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private closeBrothers(itemSelected);
}
