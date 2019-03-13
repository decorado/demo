# Decora Icons

`import { DecI18nInputModule } from '@decora/browser-lib-ui'`

This component is used to write multilanguage versions of an input;

## Usage

```js

  testModel1 = {
    en: '',
    pt: '',
  };

  testModel2 = {
    en: '',
    pt: '',
  };

```

```html

  <dec-i18n-input [(ngModel)]="testModel1" name="testModel1" type="input" [required]="true"></dec-i18n-input>

  <dec-i18n-input [(ngModel)]="testModel2" name="testModel2" type="textarea" [required]="true"></dec-i18n-input>

    <dec-i18n-input [(ngModel)]="testModel2" name="testModel2" type="textarea" [required]="true">
      <dec-icon font="mat">close</dec-icon>
      TITLE HERE
    </dec-i18n-input>

```


## Inputs

### type: 'input' | 'textarea'
The type of the input (input or textarea)

### placeholder: string
The input placeholter

### name: string
The input name

### rows: number = 5
The textarea number of rows

### required: boolean
If it is required or not

### disabled: boolean
If it is disabled or not
