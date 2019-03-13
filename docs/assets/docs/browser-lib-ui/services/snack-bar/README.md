# DecSnackBar Service

`import { DecSnackBarModule } from '@decora/browser-lib-ui';`

This component was designed to help presenting alert messages.

## Example

```javascript
constructor(private snackBarService: DecSnackBarService) { }

const s = this.snackBarService.open(translatableMessage, type, duration, action);
```

## Parameters

#### translatableMessage: string
The key of the translation file to be used parsed and translated to the current lanuage.

#### type: string
You can choose between one of the following types. There i no default type.

`'success' | 'primary' | 'info' | 'warn' | 'error'`

#### duration: number
Can be any number representing milisecons. Default is `4e3 = 4 seconds`

#### action: string
The name of the action button

#### interpolateParams: any
Object to be used when translating strings with interpolated data params
