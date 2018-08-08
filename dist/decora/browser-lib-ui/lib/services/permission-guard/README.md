# Permission Guard Service

## yourapp.module

`import { DecPermissionGuardModule } from '@decora/browser-lib-ui';`

```javascript
@NgModule({
  imports: [
    DecPermissionGuardModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
```
## yourapp-routing.module

`import { DecPermissionGuard } from '@decora/browser-lib-ui';`

```javascript
const routes: Routes = [
  {
    path: '', component: YourComponent,
    canActivate: [DecPermissionGuard],
    data: { permissions: ['permission', 'permission'] }
  }
];
```

