# Decora Department Autocomplete

`import { DecAutocompleteDepartmentModule } from '@decora/browser-lib-ui';`

## Inputs

#### `notFoundMessage: string`
Message to be displayed if no option is found;

#### `companyId: number`
Company to search for departments;

#### `disabled: boolean`
Disables the autocomplete input;

#### `multi: boolean`
Enable multiple options selection;

#### `name: string`
The input element name;

#### `placeholder: string`
Defines a text to be shown when there is no value set;

#### `repeat: boolean`
Defines if the input is repeat;

#### `required: boolean`
Defines if the input is required;


## Outputs

#### `blur => any`
Event triggered on input blurry;

#### `optionSelected: $event`
This output emits a value every time an option is selected or the selected value is cleaned;

## Examples

### Standalone

```html
  <dec-autocomplete-department
  [(ngModel)]="department"
  [companyId]="companyId"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-department>
```

### In group with AutocompleteCompany

```html
  <dec-autocomplete-company
  [(ngModel)]="companyId"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-company>

  <dec-autocomplete-department
  [(ngModel)]="department"
  [companyId]="companyId"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-department>
```
