import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { FormAddDictionaryComponent } from '../components/form-add-dictionary/form-add-dictionary';
import { NavDictionariesComponent } from '../components/nav-dictionaries/nav-dictionaries';
import { ConfirmDeleteDictionaryComponent } from '../components/nav-dictionaries/confirm-delete-dictionary';

import { HomeComponent } from './home/home';
import { AddDictionaryComponent } from './add-dictionary/add-dictionary';
import { EditDictionaryComponent } from './edit-dictionary/edit-dictionary';
import { ListDictionariesComponent } from './list-dictionaries/list-dictionaries';
import { ViewDictionaryComponent } from './view-dictionary/view-dictionary';
import { NotFoundComponent } from './not-found/not-found';

import { FocusInput } from '../directives/focus-input';
import { KeyablePipe } from '../pipes/keyable';

export const PAGES = [
  HomeComponent,
  AddDictionaryComponent,
  EditDictionaryComponent,
  ListDictionariesComponent,
  ViewDictionaryComponent,
  NotFoundComponent
];

@NgModule({
  declarations: [

    ConfirmDeleteDictionaryComponent,
    NavDictionariesComponent,
    FormAddDictionaryComponent,
    FocusInput,
    KeyablePipe,
    
    ...PAGES
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule, 
    MaterialModule,
    RouterModule
  ],
  entryComponents: [ ConfirmDeleteDictionaryComponent ]
})
export class PagesModule {}