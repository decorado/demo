import { EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { DecSidenavToolbarTitleComponent } from './../dec-sidenav-toolbar-title/dec-sidenav-toolbar-title.component';
export declare class DecSidenavToolbarComponent implements AfterViewInit, OnInit {
    initialized: any;
    notProduction: boolean;
    ribbon: string;
    label: string;
    color: any;
    environment: any;
    leftMenuTriggerVisible: boolean;
    rightMenuTriggerVisible: boolean;
    progressBarVisible: string | boolean;
    toggleLeftMenu: EventEmitter<any>;
    toggleRightMenu: EventEmitter<any>;
    customTitle: DecSidenavToolbarTitleComponent;
    constructor();
    ngAfterViewInit(): void;
    ngOnInit(): void;
}
