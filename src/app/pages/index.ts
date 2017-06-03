import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { FormAddDictionaryComponent } from '../components/form-add-dictionary/form-add-dictionary';
import { NavDictionariesComponent } from '../components/nav-dictionaries/nav-dictionaries';

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
  declarations: [
    NavDictionariesComponent,
    FormAddDictionaryComponent, 
    ...PAGES
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    MaterialModule
  ],
  exports: [
    CommonModule, 
    MaterialModule
  ]
})
export class PagesModule {}