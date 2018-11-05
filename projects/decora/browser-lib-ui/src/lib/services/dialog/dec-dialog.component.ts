import { Component, ViewChild, AfterContentInit, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogRef } from '@angular/material';
import { DecApiService } from './../api/decora-api.service';

@Component({
  selector: 'dec-dialog',
  templateUrl: './dec-dialog.component.html',
  styleUrls: ['./dec-dialog.component.scss']
})
export class DecDialogComponent implements AfterContentInit {

  // CONFIG DATA
  childComponentInstance: any;

  childComponentType: ComponentType<any>;

  context: any = {};

  title: string;

  message: string;

  hideBackButton = false;

  color = 'basic';

  // TEMPLATE PARSING DATA
  decDialogActionsTemplate: TemplateRef<any>;

  decDialogContentTemplate: TemplateRef<any>;

  decDialogTitleTemplate: TemplateRef<any>;

  // CONTROLLER DATA
  loaded: boolean;

  progressBarVisible: string | boolean = false;

  basicBgStyle = { 'background': 'rgba(255, 255, 255, 0)' };

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

  ngAfterContentInit() {

    this.dialogRef.afterOpen()
    .toPromise()
    .then(this.factoryTheComponent);

  }

  private factoryTheComponent = () => {

    if (this.childComponentType) {

      const componentFactory: ComponentFactory<any> = this.factor.resolveComponentFactory(this.childComponentType);

      const componentRef: ComponentRef<any> = this.childContainer.createComponent(componentFactory);

      this.childComponentInstance = componentRef.instance;

      this.appendContextToInstance(componentRef.instance, this.context);

      this.child.emit(this.childComponentInstance);

      this.child.complete(); // unsubsribe subscribers

    }

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
