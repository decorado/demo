import { Component, ViewChild, OnInit, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DecDialogAction } from './dec-dialog.models';
import { MatDialogRef } from '@angular/material';
import { DecApiService } from './../api/decora-api.service';

@Component({
  selector: 'dec-dialog',
  templateUrl: './dec-dialog.component.html',
  styleUrls: ['./dec-dialog.component.scss']
})
export class DecDialogComponent implements OnInit {

  // CURRENT
  childComponentType: ComponentType<any>;

  childComponentInstance: any;

  topActions: DecDialogAction[] = [];

  bottomActions: DecDialogAction[] = [];

  title: string;

  context: any = {};

  loaded: boolean;

  hideBackButton = false;

  showCancelButton = false;

  progressBarVisible: string | boolean = false;

  color = 'transparent';

  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer: ViewContainerRef;

  @Output() child = new EventEmitter<any>();

  constructor(
    private factor: ComponentFactoryResolver,
    private dialogRef: MatDialogRef<DecDialogComponent>,
    private decApi: DecApiService,
  ) {
    this.decApi.loading$.subscribe(state => {
      this.progressBarVisible = state;
    });
  }

  ngOnInit() {

    this.dialogRef.afterOpen()
    .toPromise()
    .then(this.factoryTheComponent);

  }

  private factoryTheComponent = () => {

    const componentFactory: ComponentFactory<any> = this.factor.resolveComponentFactory(this.childComponentType);

    const componentRef: ComponentRef<any> = this.childContainer.createComponent(componentFactory);

    this.childComponentInstance = componentRef.instance;

    this.child.emit(this.childComponentInstance);

    this.child.complete(); // unsubsribe subscribers

    this.appendContextToInstance(componentRef.instance, this.context);

    this.loaded = true;

  }

  private appendContextToInstance(instance: any, context: any) {

    if (instance && context) {

      Object.keys(context).forEach((key) => {

        instance[key] = this.context[key];

      });

    }

  }

}
