import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgxFormatFieldModule } from 'ngx-format-field';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxFormatFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
