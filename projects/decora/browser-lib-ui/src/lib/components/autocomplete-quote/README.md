# Decora Quote Autocomplete

`import { DecAutocompleteQuoteModule } from '@decora/browser-lib-ui';`

## Inputs

#### `notFoundMessage: string`
Message to be displayed if no option is found;

#### `projectId: number`
Project to search for departments;

#### `decoraProduct: string`
Decora Product Type of the quote;

#### `decoraProductVariant: string`
Decora Product Type Variant of the quote;

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
  <dec-autocomplete-quote
    [(ngModel)]="quote"
    [projectId]="projectId"
    decoraProduct="RENDERING"
    decoraProductVariant="RENDERING_MODEL"
    (optionSelected)="optionSelected($event)"
  ></dec-autocomplete-quote>
```

### In group with AutocompleteProject

```html
  <dec-autocomplete-project
    [(ngModel)]="projectId"
    (optionSelected)="optionSelected($event)"
  ></dec-autocomplete-project>

  <dec-autocomplete-quote
    [(ngModel)]="quote"
    [projectId]="projectId"
    (optionSelected)="optionSelected($event)"
  ></dec-autocomplete-quote>
```

## API

### @Input() projectId: string;

Sets the project scope

### @Input() decoraProduct: string;

Sets the decora internal product type

### @Input() decoraProductVariant: string;

Sets the decora internal product variant
