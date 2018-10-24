# Decora Project Autocomplete

`import { DecAutocompleteProjectModule } from '@decora/browser-lib-ui';`

## Examples

### Standalone

```html
  <dec-autocomplete-project
  [(ngModel)]="project"
  [companyId]="companyId"
  (selected)="optionSelected($event)">
  </dec-autocomplete-project>
```

### In group with AutocompleteCompany

```html
  <dec-autocomplete-company
  [(ngModel)]="companyId"
  (selected)="optionSelected($event)">
  </dec-autocomplete-company>

  <dec-autocomplete-project
  [(ngModel)]="project"
  [companyId]="companyId"
  (selected)="optionSelected($event)">
  </dec-autocomplete-project>
```
