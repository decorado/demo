import { QueryList, EventEmitter } from '@angular/core';
import { DecSidenavMenuItemComponent } from './../dec-sidenav-menu-item/dec-sidenav-menu-item.component';
import { DecSidenavMenuTitleComponent } from './../dec-sidenav-menu-title/dec-sidenav-menu-title.component';
import { BehaviorSubject } from 'rxjs';
import { DecSidenavService } from './../sidenav.service';
export declare class DecSidenavMenuRightComponent {
    private decSidenavService;
    readonly rightMenuVisible: BehaviorSubject<boolean>;
    readonly rightMenuMode: BehaviorSubject<string>;
    open: any;
    mode: any;
    persistVisibilityMode: boolean;
    items: QueryList<DecSidenavMenuItemComponent>;
    customTitle: DecSidenavMenuTitleComponent;
    openedChange: EventEmitter<boolean>;
    modeChange: EventEmitter<string>;
    constructor(decSidenavService: DecSidenavService);
    private subscribeAndExposeSidenavEvents();
}
