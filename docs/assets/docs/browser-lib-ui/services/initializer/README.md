# App initializer

`import { DecAppInitializer, DecConfigurationModule, DecConfigurationService, DecApiModule, DecApiService } from '@projects/decora/browser-lib-ui/src/public_api';`

This is used to start the app only after loading configuration and account. this way we can esure the guards and decApi usage are done in the correct time with correct inputs.

```javascript
...
@NgModule({
  imports: [
    ...
    DecConfigurationModule.forRoot({ basePath: environment.basePath }),
    DecApiModule,
    ...
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: DecAppInitializer,
      deps: [DecConfigurationService, DecApiService],
      multi: true,
    }
  ],
  ...
})
export class AppModule { }

```
