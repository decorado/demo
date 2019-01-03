# Decora Department Autocomplete

`import { DecAutocompleteDepartmentModule } from '@decora/browser-lib-ui';`

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
