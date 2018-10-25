# Decora Dialog

`import { DecDialogModule } from '@decora/browser-lib-ui'`

This Service  was built to allow the presentation of pqages inside a dialog. This is used to improve matdialog options and to insert a wrapper in our dialogs.

## Example

```javascript
import { PersonDetailComponent } from '@app/shared/components/person/person-detail.component';


const person = {name: 'my name', birth: '2001/15/05'};

const dialogRef = this.decDialog.open(PersonDetailComponent, {
  title: `My person dialog title`,
  topActions: [
    { i18nLabel: 'label.delete', callback: (data: any) => console.log('DELETED', data)}
  ],
  bottomActions: [
    { i18nLabel: 'label.delete', callback: (data: any) => console.log('DELETED', data), color: 'primary', buttonType: 'mat-button'}
  ],
  context: {
    person: person,
  }
});

dialogRef.componentInstance.child.subscribe((childComponentInstance: PersonDetailComponent) => {
  childComponentInstance.close.subscribe(() => {
    dialogRef.close();
  });
});

```

## Waiting for child component instance to be ready

Subscribe to `child` to get access to know when the child component is ready. This observable does not need `unsubscribe`.

```javascript
  dialogRef.componentInstance.child.subscribe((childComponentInstance: PersonDetailComponent) => {

    childComponentInstance.close.subscribe(() => {

      dialogRef.close();

    });

  });

```


## Accessing childComponentInstance

```javascript
  dialogRef.componentInstance.childComponentInstance
```

## Models

```javascript
export class DialogAction {
  label?: string;
  i18nLabel?: string;
  callback: (data?: any) => {};
  color?: 'primary' | 'accent' | 'warn' | 'default';
  buttonType?: 'mat-button' | 'mat-raised-button' = 'mat-raised-button';
}

export class OpenConfiguration {
  width?: string;
  height?: string;
  title?: string;
  topActions?: DialogAction[];
  bottomActions?: DialogAction[];
  context?: any;
  hideBackButton?: boolean;
  showCancelButton?: boolean;
  toolbarColor?: 'primary' | 'accent' | 'warn' | 'default' | 'transparent' = 'transparent';
}
```
