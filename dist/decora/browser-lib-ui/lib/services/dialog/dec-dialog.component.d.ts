import { OnInit, ComponentFactoryResolver, ViewContainerRef, EventEmitter } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DecDialogAction } from './dec-dialog.models';
import { MatDialogRef } from '@angular/material';
import { DecApiService } from './../api/decora-api.service';
export declare class DecDialogComponent implements OnInit {
    private factor;
    private dialogRef;
    private decApi;
    childComponentType: ComponentType<any>;
    childComponentInstance: any;
    topActions: DecDialogAction[];
    bottomActions: DecDialogAction[];
    title: string;
    context: any;
    loaded: boolean;
    hideBackButton: boolean;
    showCancelButton: boolean;
    progressBarVisible: string | boolean;
    color: string;
    childContainer: ViewContainerRef;
    child: EventEmitter<any>;
    constructor(factor: ComponentFactoryResolver, dialogRef: MatDialogRef<DecDialogComponent>, decApi: DecApiService);
    ngOnInit(): void;
    private factoryTheComponent;
    private appendContextToInstance(instance, context);
}
