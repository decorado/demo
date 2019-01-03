# Decora Guard

`import { DecGuardModule } from '@decora/browser-lib-ui';`

## Usage

### Auth Guard
Alow or block authenticated users to use some route.

It implements `canLoad`, `canActivate` and `canActivateChild` guards;


```javascript

  import { DecAuthGuard } from '@decora/browser-lib-ui';

  const routes = [
    ...
    {
      path: 'private-admin',
      canActivate: [DecAuthGuard], // here you can block non authenticated users
      component: PrivateComponent
    },
    ...
  ]
```
