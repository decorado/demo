import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DecApiModule, DecAppInitializer, DecGuardModule, DecSnackBarModule, DecConfigurationModule, DecConfigurationService, DecApiService } from '@projects/decora/browser-lib-ui/src/public_api';
import { DecoraTranslateModule } from '@app/shared/services/decora-translate/decora-translate.module';
import { environment } from '@env/environment';
import {GestureConfig} from "@angular/material";
import { DecoraFbxQaModule } from './pages/demo/component/decora-fbx-qa/decora-fbx-qa.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: DecAppInitializer, deps: [DecConfigurationService, DecApiService], multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
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
    DecoraFbxQaModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
