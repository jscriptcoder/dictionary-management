import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { PagesModule } from './pages'

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
