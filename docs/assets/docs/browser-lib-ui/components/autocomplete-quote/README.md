# Decora Quote Autocomplete

`import { DecAutocompleteQuoteModule } from '@decora/browser-lib-ui';`

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
