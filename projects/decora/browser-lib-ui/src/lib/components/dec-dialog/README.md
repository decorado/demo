# Decora Dialog

This Service  was built to allow the presentation of pqages inside a dialog. This is used to improve matdialog options and to insert a wrapper in our dialogs.

## Example

```javascript
import { PersonDetailComponent } from '@app/shared/components/person/person-detail.component';
...

  const person = {name: 'my name', birth: '2001/15/05'};

  const dialogRef = this.decDialog.open(PersonDetailComponent, {
    title: `My person dialog title`,
    actions: [
      { i18nLabel: 'label.delete', callback: (data: any) => console.log('DELETED', data)}
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
