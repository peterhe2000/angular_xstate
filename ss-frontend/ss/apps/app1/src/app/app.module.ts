import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStoreModule } from './app-store.module';
import { environment } from '../environments/environment';
import { API_BASE_URL as USER_API_BASE_URL } from '@ss/app1/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: USER_API_BASE_URL,
      useValue: environment.api_base_url,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
