# Decora Department Autocomplete

`import { DecAutocompleteDepartmentModule } from '@decora/browser-lib-ui';`

## Examples

### Standalone

```html
  <dec-autocomplete-department
  [(ngModel)]="department"
  [companyId]="companyId" // here
  (selected)="optionSelected($event)">
  </dec-autocomplete-department>
```

### In group with AutocompleteCompany

```html
  <dec-autocomplete-company
  [(ngModel)]="companyId"
  (selected)="optionSelected($event)">
  </dec-autocomplete-company>

  <dec-autocomplete-department
  [(ngModel)]="department"
  [companyId]="companyId" // here
  (selected)="optionSelected($event)">
  </dec-autocomplete-department>
```
