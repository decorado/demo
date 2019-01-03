# Decora Date Picker

`import { DecDatePickerModule } from '@decora/browser-lib-ui'`


## Examples

```javascript
  date = 1538742917596;
```

```html
<dec-date-picker [(ngModel)]="date" mode="timestamp"></dec-date-picker>
```

# Type detection

By default the component operates with Date object, but in some cases we want it to use timestamp instead.

We have two ways of doing this.

One is setting the mode input to 'timestamp' and force the timestamp usage.

Another is to use timestamp values in ngModel so the component detects the timestamp and sets the mote to it.
