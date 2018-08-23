import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DecApiModule, DecAppInitializer, DecGuardModule, DecSnackBarModule, DecConfigurationModule, DecConfigurationService, DecApiService } from '@projects/decora/browser-lib-ui/src/public_api';
import { DecoraTranslateModule } from '@app/shared/services/decora-translate/decora-translate.module';
import { environment } from '@env/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: DecAppInitializer, deps: [DecConfigurationService, DecApiService], multi: true },
  ],
  imports: [
    DecConfigurationModule.forRoot({ basePath: environment.basePath }),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DecApiModule,
    DecoraTranslateModule,
    DecSnackBarModule,
    DecGuardModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
