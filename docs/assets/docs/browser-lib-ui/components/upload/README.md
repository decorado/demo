# Decora Upload

`import { DecUploadModule } from '@decora/browser-lib-ui';`

## Usage
The Decora Upload implements `ControlValueAccessor` so we can use it within `Forms` and `ReactiveForms`.


```html
  <dec-upload [(ngModel)]="myFiles"></dec-upload>
```

## Inputs

### `disabled: boolean`
Disables the upload input

### multiple
Enable the multi files upload

## Events

### `error`
Event triggered when an errors occur


### `uploaded`
Event triggered when all files were uploaded

### `progress`
Event triggered when some upload progress is available
