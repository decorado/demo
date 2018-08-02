import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DecApiModule, DecGuardModule, DecSnackBarModule } from './../../projects/decora/browser-lib-ui/src/public_api';
import { environment } from '@env/environment';
import { DecoraTranslateModule } from '@app/shared/services/decora-translate/decora-translate.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DecoraTranslateModule,
    DecSnackBarModule,
    DecApiModule.forRoot({
      host: environment.active.api,
      authHost: environment.active.authHost,
      useMockApi: environment.active.useMockApi,
      mockApiHost: environment.active.mockApiHost
    }),
    DecGuardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
