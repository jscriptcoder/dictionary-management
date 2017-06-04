
import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';

import { PagesModule } from './pages'

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';

import { DictionariesEffects } from './effects/list-dictionaries';

import { reducer } from './reducers';
import { schema } from './db';

@NgModule({
    declarations: [
        AppComponent,
        BreadcrumbComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        
        AppRoutingModule,
        PagesModule,

        /**
        * StoreModule.provideStore is imported once in the root module, accepting a reducer
        * function or object map of reducer functions. If passed an object of
        * reducers, combineReducers will be run creating your application
        * meta-reducer. This returns all providers for an @ngrx/store
        * based application.
        */
        StoreModule.provideStore(reducer),

        /**
        * @ngrx/router-store keeps router state up-to-date in the store and uses
        * the store as the single source of truth for the router's state.
        */
        RouterStoreModule.connectRouter(),

        /**
        * EffectsModule.run() sets up the effects class to be initialized
        * immediately when the application starts.
        *
        * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
        */
        EffectsModule.run(DictionariesEffects),
        // EffectsModule.run(DictionaryEffects),

        /**
        * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
        * service available.
        */
        DBModule.provideDB(schema)
    ],

    bootstrap: [ AppComponent ]
})
export class AppModule { }
