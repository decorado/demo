# Decora Complexity Autocomplete

`import { AutocompleteComplexityModule } from '@decora/browser-lib-ui';`

## Examples

```html
   <dec-autocomplete-complexity
  [(ngModel)]="complexity"
  [type]="'fix'"
  (selected)="optionSelected($event)">
  </dec-autocomplete-complexity>

  <button type="button" mat-stroked-button (click)="complexity = undefined">Clear</button>

  <h2>Multi</h2>

  Company Selected: {{ complexities | json }}

  <hr>

  <dec-autocomplete-complexity
  [(ngModel)]="complexities"
  [multi]="true"
  (selected)="optionSelected($event)">
  </dec-autocomplete-complexity>

  <button type="button" mat-stroked-button (click)="complexities = undefined">Clear</button>
```
