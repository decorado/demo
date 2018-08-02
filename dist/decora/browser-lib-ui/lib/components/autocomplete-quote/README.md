# Decora Quote Autocomplete

`import { DecAutocompleteQuoteModule } from '@decora/browser-lib-ui';`

## Examples

### Standalone

```html
  <dec-autocomplete-quote
  [(ngModel)]="quote"
  [projectId]="projectId" // here
  (selected)="optionSelected($event)">
  </dec-autocomplete-quote>
```

### In group with AutocompleteProject

```html
  <dec-autocomplete-project
  [(ngModel)]="projectId"
  (selected)="optionSelected($event)">
  </dec-autocomplete-project>

  <dec-autocomplete-quote
  [(ngModel)]="quote"
  [projectId]="projectId" // here
  (selected)="optionSelected($event)">
  </dec-autocomplete-quote>
```
