# Decora Steps List

`import { DecStepsListModule } from '@decora/browser-lib-ui';`

This is a list connected by lines and dots. It is used in history or when you want to show a list of connected items.

## Example

```javascript

stepsListWithTitleDateAndTime = [
  { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458'},
  { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
  { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
  { title: 'Etapa 1', date: '2018-07-12T08:01:26.833+0000', description: 'Created by 6458' },
  { title: 'Etapa 2', date: '2018-07-13T16:30:26.833+0000', description: 'Updated by 345' },
  { title: 'Etapa 3', date: '2018-07-14T12:31:26.833+0000', description: 'Closed by 967' },
];

```

### Without max height
```html

<dec-steps-list title="{{ 'label.History' | translate }}" [stepsList]="stepsListWithTitleDateAndTime" showTime="true"></dec-steps-list>

```

### With max height
```html

<dec-steps-list title="{{ 'label.History' | translate }}" [stepsList]="stepsListWithTitleDateAndTime" showTime="true" maxHeight="50vh"></dec-steps-list>

```



## Inputs

### icon = 'history';
The icon to be used. Default is `history`.

### maxHeight: boolean;
Set a maximum height to the container and make the container scrollable.

### title = '';
The item title;

### showTime: boolean;
If we pass the date, defines if the time should be displayed.

### stepsList: Step[] = [];
A list of Steps to be presented in the component.

## Step interface

```javascript

export interface Step {
  title?: string;
  date?: string;
  description?: string;
}


```
