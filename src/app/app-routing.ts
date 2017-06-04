import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { ListDictionariesComponent } from './pages/list-dictionaries/list-dictionaries';
import { ViewDictionaryComponent } from './pages/view-dictionary/view-dictionary';
import { AddDictionaryComponent } from './pages/add-dictionary/add-dictionary'
import { EditDictionaryComponent } from './pages/edit-dictionary/edit-dictionary';
import { NotFoundComponent } from './pages/not-found/not-found';

@Component({ template: '<router-outlet></router-outlet>' })
export class RoutingRootComponent {}

const routes: Routes = [
  {
    path: '',
    component: RoutingRootComponent,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { breadcrumb: 'Index' },
      },
      {
        path: 'dictionaries',
        component: RoutingRootComponent,
        data: { breadcrumb: 'Dictionaries' },
        children: [
          {
            path: '',
            component: ListDictionariesComponent,
            data: { breadcrumb: 'Listing' },
          },
          {
            path: 'add',
            component: AddDictionaryComponent,
            data: { breadcrumb: 'Adding' }
          },
          {
            path: 'view/:id',
            component: ViewDictionaryComponent,
            data: { breadcrumb: 'Viewing' }
          },

          {
            path: 'edit/:id',
            component: EditDictionaryComponent,
            data: { breadcrumb: 'Editing' }
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { breadcrumb: 'Not Found' }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  declarations: [ RoutingRootComponent ]
})
export class AppRoutingModule { }