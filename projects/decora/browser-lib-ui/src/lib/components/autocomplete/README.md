# Decora Autocomplete

`import { DecAutocompleteModule } from '@decora/browser-lib-ui';`

## Doing

- `Preload` input to preload an array of objects to be used as autocomplete options

- `Loading message` when fetching data from back-end;

- When the term entered does not match any option the input must be reset to last value;

## API

### Methods

#### `clear(reopenAfterClear: boolean)`
Clear the input and reopen the selection if defined to;

#### `closePanel()`
Closes the autocomplete selection panel;

#### `openPanel()`
Opens the autocomplete selection panel;

#### `reset(reopenAfterReset: boolean)`
Reset the input and reopen the selection if defined to;


### Input

#### `customFetchFunction: CustomFetchFunction`
Function that returns an `Observable<any[]>` to be used as options. This functions enables the usage of custom methods that are not covered by DecoraApi;

Important: This function must be Arrow Function `const functionA = () => {}` to enable sharing context inside Observables.

#### `disabled: boolean`
Disables the autocomplete input;

#### `endpoint: string`
A path to the resource in the API. It uses DecorApi to fetch the data, so you have to pass only the path like `/accounts` to retrieve all accounts.

#### `labelAttr: string`
Defines an object property to be used as option label;

#### `labelFn: string`
Defines a function to extract a label from an option;

#### `name: string`
The input element name;

#### `options: any[]`
An array of options to be used as autocomplete options;

#### `placeholder: string`
Defines a text to be shown when there is no value set;

#### `required: boolean`
Defines if the input is required;

#### `valueAttr: string`
Defines an object property to be used as option value;

#### `valueFn: string`
Defines a function to extract a value from an option;


### Output

#### `blur => any`
Event triggered on input blurry;

#### `optionSelected => SelectionEvent`
This output emits a value every time an option is selected or the selected value is cleaned;

## Fetch priority
As we have three different ways to retrieve options, when more than one is set, the priority is:
  1. `options`
  2. `customFetchFunction`
  3. `endpoint`


## Examples

```html
  <dec-autocomplete name="endpointLabelAndValueAttr"
  [(ngModel)]="endpointLabelAndValueAttr"
  (optionSelected)="optionSelected($event)"
  [endpoint]="endpoint"
  [labelAttr]="labelAttr"
  [valueAttr]="valueAttr"></dec-autocomplete>
```
