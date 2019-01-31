# Decora Complexity Autocomplete

`import { AutocompleteComplexityModule } from '@decora/browser-lib-ui';`

## Inputs

#### `notFoundMessage: string`
Message to be displayed if no option is found;

#### `type`: string
Type of complexity

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

```html
   <dec-autocomplete-complexity
  [(ngModel)]="complexity"
  [type]="'fix'"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-complexity>

  <button type="button" mat-stroked-button (click)="complexity = undefined">Clear</button>

  <h2>Multi</h2>

  Company Selected: {{ complexities | json }}

  <hr>

  <dec-autocomplete-complexity
  [(ngModel)]="complexities"
  [multi]="true"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-complexity>

  <button type="button" mat-stroked-button (click)="complexities = undefined">Clear</button>
```
