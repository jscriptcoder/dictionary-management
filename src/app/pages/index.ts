import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { HomeComponent } from './home/home';
import { AddDictionaryComponent } from './add-dictionary/add-dictionary';
import { EditDictionaryComponent } from './edit-dictionary/edit-dictionary';
import { ListDictionariesComponent } from './list-dictionaries/list-dictionaries';
import { ViewDictionaryComponent } from './view-dictionary/view-dictionary';
import { NotFoundComponent } from './not-found/not-found';


export const PAGES = [
  HomeComponent,
  AddDictionaryComponent,
  EditDictionaryComponent,
  ListDictionariesComponent,
  ViewDictionaryComponent,
  NotFoundComponent
];

@NgModule({
  imports: [ MaterialModule ],
  declarations: PAGES,
  exports: PAGES
})
export class PagesModule { }