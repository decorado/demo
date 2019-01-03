# DecSnackBar Service

`import { DecSnackBarModule } from '@decora/browser-lib-ui';`

This component was designed to help presenting alert messages.

## Example

```javascript
constructor(private snackBarService: DecSnackBarService) { }

const s = this.snackBarService.open(message, type, duration, translateMessage);
```

## Parameters

#### message: string
Can be any text

#### type: string
You can choose between one of the following types. There i no default type.

`'success' | 'primary' | 'info' | 'warn' | 'error'`

#### duration: number
Can be any number representing milisecons. Default is `4e3 = 4 seconds`
