import { NgModule } from '@angular/core';

import { AddDictionaryComponent } from './add-dictionary/add-dictionary';
import { EditDictionaryComponent } from './edit-dictionary/edit-dictionary';
import { ListDictionariesComponent } from './list-dictionaries/list-dictionaries';
import { ViewDictionaryComponent } from './view-dictionary/view-dictionary';
import { NotFoundComponent } from './not-found/not-found';


export const PAGES = [
  AddDictionaryComponent,
  EditDictionaryComponent,
  ListDictionariesComponent,
  ViewDictionaryComponent,
  NotFoundComponent
];

@NgModule({
  imports: [],
  declarations: PAGES,
  exports: PAGES
})
export class PagesModule { }