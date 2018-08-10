# Dec configuration

`import { DecConfigurationModule } from '@decora/browser-lib-ui';`

This module is responsible for loading and handling the environment configuration.

Using this approach you do not need to use environment enymore. Just use the `DecConfigurationService` to get your env configuration.

## Configuration

In your AppModule, import the `DecConfigurationModule` and provide the `DecConfigurationInitializer` as bellow:

The `basePath` is used to determine where is the `assets`.

```javascript
...
import { DecConfigurationModule, DecConfigurationInitializer, DecConfigurationService } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  ...
  imports: [
    ...
    DecConfigurationModule.forRoot({ basePath: environment.basePath })
    ...
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: DecConfigurationInitializer,
      deps: [DecConfigurationService], multi: true
    }
  ],
  ...
})
export class AppModule { }

```

## Usage

Now, you can use the `DecConfigurationService` in your app to load the env config.

```javascript
  constructor(
    private decConfig: DecConfigurationService,
  ) {
    console.log(this.decConfig.config)
  }
```
