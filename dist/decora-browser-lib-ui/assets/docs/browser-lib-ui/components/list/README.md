# Decroa List Component

`import { ListModule } from '@decora/browser-lib-ui'`;

This component was designed to help presenting data with table and grids, filtering, paginating and counting. It also work's in the URL to perist states like filtering and active tab. The list can consume data from REST API's or from array of objects.


## Examples

Html

```html
  <dec-list [endpoint]="/user" name="company-product-dae-grid">
    <dec-list-table>
      <dec-list-table-column title="label.user" prop="user.name" colSpan="1"></dec-list-table-column>
    </dec-list-table>
    <dec-list-grid>
      <ng-template let-user="row">
        <p>{{ user.name }}</p>
        <img [src]="user.image">
      </ng-template>
    </dec-list-grid>
  </dec-list>
```

### Providing data
The data can be provided manually by `@Input()` or fetched from a REST API endpoint.
If both are provided, the row will be used. This behavior was choosen to enable local testing when the dev wants to mock some data

### Providing data by REST API
To provide data by REST API you have to provide the `endpoint` to the `list-component`. The list will fetch the data using `DecoraApiService GET method` or the `@Input() customFetchMethod` and display it as table or grd list.

```html

  <dec-list [endpoint]="http://api.com/user" name="company-product-dae-grid">
    ...
  </dec-list>

```

#### customFetchMethod

The customFetchMethod is a function of type `DecListFetchMethod` that receives an endpoint and an filter object and returns an Observable of `DecListFetchMethodResponse`;

```javascript

/*
  * DecListFetchMethod
  *
  * Used to fetch data from remote API
  */
export type DecListFetchMethod = (endpoint: string, filter: any) => Observable<DecListFetchMethodResponse>;

/*
  * DecListFetchMethodResponse
  *
  * Response received by fetch DecListFetchMethod
  */
export interface DecListFetchMethodResponse {
  result: {
    rows: any[];
    count: number;
  };
}

```


### Providing data manually
To insert the data manually you have to provide the `@Input() rows` to the `dec-list-component`:

```html

  <dec-list [rows]="[{id: 123, name: 'Bruno João', image: 'img.com/123'}]" name="company-product-dae-grid">
    ...
  </dec-list>

```

### Reloading data
To reload the data, you can use the reload method exposed by the `ListComponent` or reset the `@Input() rows`.

### Infinite Scroll
By default, the `Infinite scrool` is enabled and can be used to load more data as the user scrools down to the end of the list. Every time the scrool get to the end of the list, anothe call is made to the REST API to fetch the next page.

### Filter
To allow the list filter, you have to include the `dec-list-filter` in your list.


#### Filtering with Advanced Filter
To use an advanced filter you have to create a component that accepts an `@Input() form` and use it to group the advanced filter fields.

my-list-filter.component.ts
```javascript
  @Input() form = {};
```

my-list-filter.component.html
```html
  <input type="text" name="username" [(ngModel)]="form.userName">
```

Now, you just need to plug this component in your `dec-list-advanced-filter` and provide the form input that is exposed by the template within it:

Javascript
```html
  <dec-list-filter>
    <dec-list-advanced-filter>
      <ng-template let-form="form">

        <my-list-filter [form]="form"></my-list-filter>

      </ng-template>
    </dec-list-advanced-filter>
  </dec-list-filter>
```

#### Filtering the results
To filter the results you just need to include the `filters` input in the `dec-list-filter`. This input receives an array of filters and for eah one it creates one tab over the list so the list can be filtered by changing tabs.

For each tab we can add an array of children as a subfilter, so when the tab is selected one colapsable group of tables is presented to the user to select the subfilter wanted.

You can set the default tab using `default` in one of the filters.

```html
  <dec-list-filter [filters]="[{label: 'ACTIVE', default: true, filters: [{property: 'status', value: 'ACTIVE'}]}]"></dec-list-filter>
```

### URL persistence
All filters an active tab are persisted in the URL so the user can share a view with other to get in the same state.

## API

### List
Used to enabling list filtering.

`<dec-list>`

|Property  |Type |Default  |Description  |
|-         |-    |-        |-            |
|name |string | undefined | The name of the list to be used in the URL so we can have more than one list per page without conflict|
|endpoint | string | undefined | Used to feth data from an API. The list will try to get the records form the endpoint given |
|rows| any[] | undefined | Used to provide the rows manyally to the list. This way, no data will be fetch from the API, even if you provided the `endpoint` url|
|columnsSortConfig| `ColumnsSortConfig` |undefined|Used to sort the list. This will be used only in the first load. After that the user can sort cliking in the table head|
|scrollableContainerClass| string | mat-sidenav-content |The class of the container where the crool should be listen to.|
|showFooter| boolean| true | Used to hide the footer |
|disableShowMoreButton| boolean| false | Used to hide the Show More button |
|listMode| table &#124; grid | table | Used to set the default list mode. This can be `table` or `grid` |
|getListMode| Function| internal method | You can provide a custom function to define when a list should be displayed as `table` or `grid` |
|rowClick   |event  | -       | Emits an event when one row or card is clicked |
|searchableProperties| string[] | undefined | Used to define which properties the basic search should look for |

### Filter
Used to enabling list filtering.

`<dec-list-filter>`

|Property  |Type |Default  |Description  |
|-         |-    |-        |-            |
|filters  |`DecListFilter`    |[]        |A list of filters used as tabs|
|preSearch |`DecListPreSearch`    |undefined        |This function is used to manupulate the filter before the fetch. This is used to manipulate the filters from outside the list. It receives and returns an object of type `DecListFilterGroups`|
|showInfoButton| boolean| false| Used to display an Info icon |
|hasPersistence| boolean| true| Used to control the filter url persistence|

### Grid
Used to enable tabs filtering. With a pre defined filter for each tab.

`<dec-list-grid>`

|Property   |Type   |Default  |Description  |
|-          |-      |-        |-            |
|rowClick   |event  | -       | Emits an event when one card is clicked |
|itemWidth  |string | 280px   | set the item width |
|itemGap    |string | 8px     | set the size of the gap between the items |

### Table
Used to enable tabs filtering. With a pre defined filter for each tab.

`<dec-list-table>`

|Property   |Type   |Default  |Description  |
|-          |-      |-        |-            |
|rowClick   |event  | -       | Emits an event when one row is clicked |

### Table Column
Used to define the template of each column in the table. Can be used with the `@Input() prop` to get the data from th erow object or can host a `ng-template` tab to allow customizations.

`<dec-list-table-column>`

|Property  |Type |Default  |Description  |
|-         |-    |-        |-            |
|colSpan|number|1|the number of horizontal spaces used by the column|
|title| string| undefined| The title of the column to be used in the table header|
|prop| string | undefined | The row object property to be displayed in the cell and to be used in the sort functions |

By providing the `@Input() prop` you enable the sort function even if you are using template to suctomize your cell.


## Types and Interfaces

```javascript

/*
  * DecListFetchMethod
  *
  * Used to fetch data from remote API
  */
export type DecListFetchMethod = (endpoint: string, filter: any) => Observable<DecListFetchMethodResponse>;


/*
  * DecListFetchMethod
  *
  * Used to fetch data from remote API
  */
export type DecListPreSearch = (filterGroups: DecListFilterGroup[]) => DecListFilterGroup[];

/*
  * DecListFetchMethodResponse
  *
  * Response received by fetch DecListFetchMethod
  */
export interface DecListFetchMethodResponse {
  result: {
    rows: any[];
    count: number;
  };
}

/*
  * FilterData
  *
  * Filter configuration
  */
export interface DecListFilterData {
  endpoint: string;
  payload: any;
  cbk?: Function;
}

/*
  * DecListFilter
  *
  * Signle filter
  */
export interface DecListFilter {
  property: string;
  value: string;
}

/*
  * DecListFilterGroup
  *
  * Group of DecListFilter
  */
export interface DecListFilterGroup {
  filters: DecListFilter[];
}

/*
  * DecListFilter
  *
  * Structure of tabs filters
  */
export interface DecListFilter {
  count?: Function | string;
  default?: boolean;
  filters: FilterGroup;
  hide?: boolean;
  label: string;
  listMode?: DecListType;
  permissions?: string[];
  uid?: string;
}

/*
  * ColumnsSortConfig
  *
  * Configuration to sort columns
  */
export interface ColumnsSortConfig {
  property: string;
  order: {
    type: 'asc' | 'desc'
  };
}


```

