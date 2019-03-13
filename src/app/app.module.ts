import { APP_INITIALIZER, NgModule } from '@angular/core';
import { GestureConfig } from '@angular/material';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecoraTranslateModule } from '@app/shared/services/decora-translate/decora-translate.module';
import { environment } from '@env/environment';
import {
  DecApiModule,
  DecApiService,
  DecAppInitializer,
  DecConfigurationModule,
  DecConfigurationService,
  DecGuardModule,
  DecLanguageModule,
  DecSnackBarModule
} from '@projects/decora/browser-lib-ui/src/public_api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecoraFbxQaModule } from './pages/demo/component/decora-fbx-qa/decora-fbx-qa.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: DecAppInitializer, deps: [DecConfigurationService, DecApiService], multi: true},
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
  ],
  imports: [
    DecConfigurationModule.forRoot({basePath: environment.basePath}),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DecApiModule,
    DecLanguageModule,
    DecoraTranslateModule,
    DecSnackBarModule,
    DecGuardModule,
    DecoraFbxQaModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
