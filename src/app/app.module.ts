import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HomeComponent } from './home/home.component';
import { LocationInputComponent } from './component/location-input/location-input.component';

registerLocaleData(en);

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LocationInputComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NgZorroAntdModule,
		FormsModule
	],
	providers: [{provide: NZ_I18N, useValue: en_US}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
