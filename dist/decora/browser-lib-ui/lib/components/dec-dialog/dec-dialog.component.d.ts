import { OnInit, ComponentFactoryResolver, ViewContainerRef, EventEmitter } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DialogAction } from './dec-dialog.models';
import { MatDialogRef } from '@angular/material';
export declare class DecDialogComponent implements OnInit {
    private factor;
    private dialogRef;
    childComponentType: ComponentType<any>;
    childComponentInstance: any;
    actions: DialogAction[];
    title: string;
    context: any;
    loaded: boolean;
    childContainer: ViewContainerRef;
    child: EventEmitter<any>;
    constructor(factor: ComponentFactoryResolver, dialogRef: MatDialogRef<DecDialogComponent>);
    ngOnInit(): void;
    private factoryTheComponent;
    private appendContextToInstance(instance, context);
}
