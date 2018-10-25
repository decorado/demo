# Dec tabs

`import { DecTabsModule } from '@decora/browser-lib-ui';`

This component was designed to cover some missing features in mdTabs that allow you to hide and change tabs easily.

It also helps loading the contet on demand, waiting for the tab to be activated before rendering the contained elements.

Each Tabs component needs to have a name set in order to avoid URL conflicts.

## Examples

```html

<dec-tabs activeTab="cars" name="product-detail-top-tabs">

  <dec-tab-menu>
    <ng-template let-activeTab="activeTab">
      ...
      Tab Menu content here
      ...
    </ng-template>
  </dec-tab-menu>

  <dec-tab name="admin-users" label="Admin Users" total="23">
    <ng-template>
      ...
      Tab content here
      ...
    </ng-template>
  </dec-tab>

</dec-tabs>
```

## Why we need to use ng-template iside the tab?

This way the component can destroy and create the content inside the tabs. Otherwise we would not be able to load the content on demand and all tabs would get their content loaded at the `Tabs Componente` initiation.

Using `<ng-template>` is the only way we can get the content before it has been rendered and so we avoid triggering events that are not desired.

## Dec Tabs

### API

  | Attribute       | Type    | Default   | Function |
  | ----------------| ------- | --------- | -------- |
  | persist         | boolean | true      | When the selected tab should be persisted in the URL |
  | destroyOnBlur   | boolean | false     | When the tab content should be destroyed if the tab is not selected |
  | activeTab       | get/set | first tab | The current tab selected. If you change the value the tab will change too |
  | name            | string  | undefined | The name of the tabs group to be used when persistin the selected tab in the URL |
  | reload          | method  | -         | Destroy and recreates the tabs to updates all its contents |

  * name is required and cannot be undefined.


### Events

  | Event           | Type    | Function |
  | ----------------| ------- | -------- |
  | activeTabChange | string  | Emits an event when the selected tab changes |

### Selecting a tab

To programmatically select a tab, just change the value of activeTab of the `dec-tabs` component. It can be done via HTML or Controller;

## Dec Tab
This is the tab declaration. Each one needs to have a name set in order to avoid URL conflicts.


```html
<dec-tab name="admin-users" label="Admin Users" total="23">
  <ng-template>
    ...
    Tab content here
    ...
  </ng-template>
</dec-tab>
```

### API

  | Attribute       | Default   | Function |
  | ----------------| --------- | -------- |
  | label           | undefined | The label displayed the tab |
  | name            | undefined | The name of the tabs group to be used when persisting the selected tab in the URL |
  | total           | undefined | The total to be shown in the side of the label |
  | padding         | true      | Insert a 16px padding at top and bottom of the tab |
  | disabled        | boolean   | Controls if the tab has it selection disabled |

## Dec Tab Menu
This part is replicated inside each tab so you need to declare it once and use in each tab
### API

  | Attribute       | Default   | Function |
  | ----------------| --------- | -------- |
  | activeTab       | undefined | The active tab name |
