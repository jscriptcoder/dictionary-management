import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDictionariesComponent } from './pages/list-dictionaries/list-dictionaries';
import { ViewDictionaryComponent } from './pages/view-dictionary/view-dictionary';
import { AddDictionaryComponent } from './pages/add-dictionary/add-dictionary'
import { EditDictionaryComponent } from './pages/edit-dictionary/edit-dictionary';
import { NotFoundComponent } from './pages/not-found/not-found';

const routes: Routes = [
  {
    path: '',
    component: ListDictionariesComponent
  },
  {
    path: 'dictionary/view/:id',
    component: ViewDictionaryComponent
  },
  {
    path: 'dictionary/add',
    component: AddDictionaryComponent
  },
  {
    path: 'dictionary/edit/:id',
    component: EditDictionaryComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
