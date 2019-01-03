# Decora Product Autocomplete

`import { DecAutocompleteProductModule } from '@decora/browser-lib-ui';`

## Examples

### Standalone

```html
  <dec-autocomplete-product
  [(ngModel)]="product"
  [companyId]="companyId"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-product>
```

### In group with AutocompleteCompany

```html
  <dec-autocomplete-company
  [(ngModel)]="companyId"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-company>

  <dec-autocomplete-product
  [(ngModel)]="product"
  [companyId]="companyId"
  (optionSelected)="optionSelected($event)">
  </dec-autocomplete-product>
```
